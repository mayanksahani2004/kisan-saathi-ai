/**
 * Kisan Saathi Crop Health Analysis Service
 * Uses Multimodal AI (Vision) to identify crops and detect diseases.
 */

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';

// Fallback database for offline use
const FALLBACK_DISEASES = [
    {
        id: 'early_blight',
        name: 'Potato Early Blight (Alternaria solani)',
        severity: 'Moderate',
        confidence: 87,
        description: 'Circular dark brown spots with concentric rings found on lower leaves. This fungal infection typically appears during warm, humid conditions.',
        actions: [
            { icon: '🧴', text: 'Apply copper-based fungicide (like Mancozeb) every 7-10 days' },
            { icon: '✂️', text: 'Remove and destroy infected leaves immediately' },
            { icon: '💧', text: 'Avoid overhead watering — use drip irrigation instead' }
        ]
    },
    {
        id: 'healthy',
        name: 'Healthy Crop — No Disease Detected',
        severity: 'Low',
        confidence: 95,
        description: 'The leaf appears healthy with no visible signs of disease or pest damage. Continue with regular care and monitoring.',
        actions: [
            { icon: '✅', text: 'Your crop looks healthy! Keep up the good work' },
            { icon: '🌿', text: 'Continue monitoring weekly for any changes' }
        ]
    }
];

/**
 * Main analysis function that calls OpenRouter Vision
 */
export const analyzeCropImage = async (imageBase64, isOffline = false, langId = 'en') => {
    // 1. Handle Offline Mode
    if (isOffline) {
        console.log("[CropAnalyzer] Offline. Returning simulated diagnosis.");
        await new Promise(r => setTimeout(r, 2000));
        return FALLBACK_DISEASES[Math.floor(Math.random() * FALLBACK_DISEASES.length)];
    }

    // 2. Check for API Key
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY.includes('YOUR_OPENROUTER_KEY')) {
        return {
            name: "Configuration Error",
            healthStatus: "Error",
            severity: "High",
            confidence: 0,
            description: "OpenRouter API Key is missing or invalid. Please check your .env file.",
            actions: [{ icon: '🔑', text: 'Add VITE_OPENROUTER_API_KEY to your environment variables' }]
        };
    }

    try {
        const prompt = `
            Analyze this agricultural crop image in TWO steps:
            STEP 1: Identify the crop type (e.g., Tomato, Wheat, Potato, Rice, Apple, etc.).
            STEP 2: Scan for any infected spots, discoloration, or pests on the leaves or fruit.

            - If infected spots are found: Identify the disease, provide expert insights, and list practical remedies. Set healthStatus to "Infected".
            - If no issues are found: Confirm the crop is healthy. Set healthStatus to "Healthy".

            CRITICAL: Provide the response in this language: "${langId}".
            The values for "name", "description", and "text" inside "actions" MUST be in ${langId}.

            RETURN ONLY A JSON OBJECT with this structure:
            {
                "name": "Identified Crop - Status (In ${langId})",
                "healthStatus": "Healthy" | "Infected",
                "severity": "Low" | "Moderate" | "High",
                "confidence": number,
                "description": "Expert insights in ${langId}",
                "actions": [
                    {"icon": "emoji", "text": "Specific remedy or care tip in ${langId}"}
                ]
            }
        `;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": typeof window !== "undefined" ? window.location.origin : "",
                "X-Title": "Kisan Saathi AI"
            },
            body: JSON.stringify({
                "model": "openai/gpt-4o-mini",
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            { "type": "text", "text": prompt },
                            {
                                "type": "image_url",
                                "image_url": { "url": imageBase64 }
                            }
                        ]
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        const aiText = data.choices[0].message.content;

        // Extract JSON from response
        const jsonMatch = aiText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            try {
                const result = JSON.parse(jsonMatch[0].trim());
                // Structural Validation
                return {
                    name: result.name || "Identified Crop",
                    healthStatus: result.healthStatus || "Unknown",
                    severity: result.severity || "Low",
                    confidence: result.confidence || 0,
                    description: result.description || "Analysis provided by AI Vision.",
                    actions: Array.isArray(result.actions) ? result.actions : []
                };
            } catch (e) {
                console.error("JSON Parse Error", e);
            }
        }

        throw new Error("The AI provided a response but it wasn't in the correct format. This usually means the image was unclear.");

    } catch (error) {
        console.error("[CropAnalyzer] Error:", error);
        return {
            name: "Analysis Failed",
            healthStatus: "Error",
            severity: "High",
            confidence: 0,
            description: `I encountered an error while analyzing your crop: ${error.message}. Please try again with a clearer photo.`,
            actions: [
                { icon: '🔄', text: 'Retry with a clearer, well-lit photo' },
                { icon: '💡', text: 'Ensure the leaf or fruit is clearly visible' }
            ]
        };
    }
};
