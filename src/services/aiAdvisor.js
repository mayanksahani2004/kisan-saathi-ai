import { marketPrices, crops } from '../data/marketData';
import { diseaseDatabase } from '../data/cropDiseases';

/**
 * Kisan Saathi AI Advisor Service
 * Integrates with LLMs (OpenRouter/GPT) to provide real-time agricultural intelligence.
 */

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || ''; // User should add this to .env

/**
 * Generates a prompt for the AI based on the current context
 */
const generateSystemPrompt = (weatherData, currentLang) => {
    const marketSummary = JSON.stringify(marketPrices).substring(0, 1000); // Truncated for token safety
    const weatherSummary = weatherData ? JSON.stringify(weatherData) : 'Current location weather data not available';

    return `
You are "Kisan Saathi", an expert AI Agriculture Assistant.
Your goal is to provide precise, data-backed advice to farmers in India.
Current User Language: ${currentLang}

### CONTEXT DATA:
- WEATHER: ${weatherSummary}
- MARKET PRICES (Sample): ${marketSummary}
- CROPS AVAILABLE: ${crops.map(c => c.name).join(', ')}

### YOUR RULES:
1. Speak in the user's language (Hindi, Tamil, etc.).
2. Use the provided context data. If asked about prices, look up the best market in the data.
3. Be practical and concise.
4. If asked about selling, compare prices across markets and give a "Sell" or "Wait" recommendation.
5. If asked about disease, refer to spots/symptoms and offer remedies from your knowledge.
6. NEVER hallucinate unsafe pesticide doses.
7. If data is missing for a specific crop/region, tell the farmer you are checking latest sources but provide general best practices.

User Question:
`;
};

/**
 * Intelligent Fallback Logic (Heuristic-based)
 * Used when API Key is missing or request fails.
 * Improved to handle crop extraction and data lookup correctly.
 */
const getFallbackIntelligence = (message, weatherData, langId) => {
    const text = message.toLowerCase();

    // Better Crop Extraction
    let detectedCrop = null;
    for (const crop of crops) {
        const keywords = [crop.id, crop.name.toLowerCase(), (crop.nameHi || '').toLowerCase()];
        if (keywords.some(k => text.includes(k))) {
            detectedCrop = crop;
            break;
        }
    }

    // Special handling for common synonyms in query
    if (!detectedCrop) {
        if (/potato|आलू|உருளைக்கிழங்கு/i.test(text)) detectedCrop = crops.find(c => c.id === 'potato');
        if (/tomato|टमाटर|தக்காளி/i.test(text)) detectedCrop = crops.find(c => c.id === 'tomato');
        if (/onion|प्याज|வெங்காயம்/i.test(text)) detectedCrop = crops.find(c => c.id === 'onion');
    }

    // Sell Intent (including Devanagari and phonetic keywords)
    if (/(sell|bech|market|price|rate|मंडी|भाव|बेच|விற்க|விலை)/i.test(text)) {
        if (!detectedCrop) {
            return langId === 'hi' ? "मैं समझता हूँ कि आप बेचने के बारे में पूछ रहे हैं, लेकिन कृपया फसल का नाम बताएं (जैसे आलू या टमाटर) ताकि मैं सही मंडी भाव बता सकूं।" : "I understand you want to sell. Please tell me which crop so I can give you the best market rates.";
        }

        const cropId = detectedCrop.id;
        const prices = marketPrices[cropId];
        let bestPrice = -1;
        let bestMarket = "";
        let trend = 0;

        if (prices) {
            Object.values(prices).forEach(mList => {
                mList.forEach(m => {
                    if (m.price > bestPrice) {
                        bestPrice = m.price;
                        bestMarket = m.market;
                        trend = m.change;
                    }
                });
            });
        }

        if (bestPrice !== -1) {
            const cropName = langId === 'hi' ? detectedCrop.nameHi : detectedCrop.name;
            if (langId === 'hi') {
                return `**${cropName}** के लिए सबसे अच्छी मंडी **${bestMarket}** है जहाँ भाव **₹${bestPrice}/kg** है। अभी कीमतें ${trend > 0 ? 'बढ़ रही हैं' : 'स्थिर हैं'}, इसलिए ${trend > 2 ? 'रुके रहना' : 'बेचना'} बेहतर हो सकता है।`;
            }
            return `The best market for **${detectedCrop.name}** is **${bestMarket}** at **₹${bestPrice}/kg**. Prices are ${trend > 0 ? 'up' : 'down'} by ${Math.abs(trend)}%. I suggest ${trend > 0 ? 'waiting' : 'selling'} today.`;
        }
    }

    // Default Fallback
    return langId === 'hi' ? "नमस्ते! मैं आपका किसान साथी हूँ। मैं आपके सवालों का जवाब देने के लिए तैयार हूँ। कृपया अपनी फसल या मौसम के बारे में पूछें।" : "Namaste! I am Kisan Saathi. I can help with market rates, weather, and crop health. How can I help you today?";
};

/**
 * Main AI Response Entry Point
 */
export const fetchAIResponse = async (userMessage, weatherData, langId, isOffline = false) => {
    // If Offline Mode is active, bypass API and use Smart Engine
    if (isOffline) {
        console.log("[Kisan Saathi] Offline Mode Active. Using Local Engine.");
        const localResponse = getFallbackIntelligence(userMessage, weatherData, langId);
        return `[Offline] ${localResponse}`;
    }

    // If no API Key, use the Smart Fallback immediately
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'YOUR_OPENROUTER_KEY_HERE') {
        console.warn("[Kisan Saathi] OpenRouter API Key missing. Using Smart Decision Engine.");
        await new Promise(r => setTimeout(r, 1000)); // Simulate thinking
        return getFallbackIntelligence(userMessage, weatherData, langId);
    }

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "openai/gpt-3.5-turbo", // Or any suitable model
                "messages": [
                    { "role": "system", "content": generateSystemPrompt(weatherData, langId) },
                    { "role": "user", "content": userMessage }
                ]
            })
        });

        if (!response.ok) throw new Error("AI API Request Failed");

        const data = await response.json();
        return data.choices[0].message.content;

    } catch (error) {
        console.error("[Kisan Saathi AI] Error:", error);
        return getFallbackIntelligence(userMessage, weatherData, langId);
    }
};
