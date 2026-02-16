// Simulated crop disease detection responses
// Rule-based AI logic for realistic demo output

const diseaseDatabase = [
    {
        id: 'early_blight',
        name: 'Early Blight (Alternaria solani)',
        severity: 'Moderate',
        confidence: 87,
        description: 'Circular dark brown spots with concentric rings found on lower leaves. This fungal infection typically appears during warm, humid conditions.',
        actions: [
            { icon: '🧴', text: 'Apply copper-based fungicide (like Mancozeb) every 7-10 days' },
            { icon: '✂️', text: 'Remove and destroy infected leaves immediately' },
            { icon: '💧', text: 'Avoid overhead watering — use drip irrigation instead' },
            { icon: '🌱', text: 'Ensure proper spacing between plants for air circulation' },
        ],
    },
    {
        id: 'late_blight',
        name: 'Late Blight (Phytophthora infestans)',
        severity: 'High',
        confidence: 92,
        description: 'Water-soaked lesions on leaves that rapidly turn brown/black. White fuzzy growth may be visible underneath. This is a serious disease that can spread quickly.',
        actions: [
            { icon: '🚨', text: 'Act immediately — remove all infected plants and discard' },
            { icon: '🧴', text: 'Apply systemic fungicide (Metalaxyl or Ridomil) urgently' },
            { icon: '🌾', text: 'Consider harvesting remaining healthy crops early' },
            { icon: '📞', text: 'Contact your local agricultural extension officer' },
        ],
    },
    {
        id: 'leaf_spot',
        name: 'Bacterial Leaf Spot',
        severity: 'Low',
        confidence: 78,
        description: 'Small, dark spots on leaf surface with yellowish halo. Common in warm and wet conditions. Generally manageable with proper care.',
        actions: [
            { icon: '💧', text: 'Reduce humidity around plants — improve drainage' },
            { icon: '🧴', text: 'Apply copper hydroxide spray as preventive measure' },
            { icon: '🌿', text: 'Maintain good field hygiene — remove fallen leaves' },
            { icon: '🔄', text: 'Practice crop rotation next season' },
        ],
    },
    {
        id: 'powdery_mildew',
        name: 'Powdery Mildew',
        severity: 'Moderate',
        confidence: 85,
        description: 'White powdery coating on leaf surfaces. Affects photosynthesis and can reduce crop yield if left untreated.',
        actions: [
            { icon: '🧴', text: 'Spray sulfur-based fungicide or neem oil solution' },
            { icon: '☀️', text: 'Ensure plants receive adequate sunlight' },
            { icon: '✂️', text: 'Prune overcrowded areas to improve airflow' },
            { icon: '💧', text: 'Water at the base of plants, not on leaves' },
        ],
    },
    {
        id: 'rust',
        name: 'Leaf Rust (Puccinia)',
        severity: 'Moderate',
        confidence: 83,
        description: 'Orange to reddish-brown pustules on the underside of leaves. Can significantly reduce crop yield if not managed.',
        actions: [
            { icon: '🧴', text: 'Apply propiconazole-based fungicide' },
            { icon: '✂️', text: 'Remove severely infected leaves and burn them' },
            { icon: '🌱', text: 'Use resistant varieties in next planting season' },
            { icon: '🔄', text: 'Rotate crops with non-host plants' },
        ],
    },
    {
        id: 'healthy',
        name: 'Healthy Leaf — No Disease Detected',
        severity: 'Low',
        confidence: 95,
        description: 'The leaf appears healthy with no visible signs of disease or pest damage. Continue with regular care and monitoring.',
        actions: [
            { icon: '✅', text: 'Your crop looks healthy! Keep up the good work' },
            { icon: '💧', text: 'Maintain regular watering schedule' },
            { icon: '🌿', text: 'Continue monitoring weekly for any changes' },
            { icon: '🧪', text: 'Consider soil testing for optimal nutrition' },
        ],
    },
];

/**
 * Simulates AI-based crop disease detection
 * Returns a random disease result with realistic data
 */
export const analyzeCropImage = () => {
    return new Promise((resolve) => {
        // Simulate AI processing time (2-4 seconds)
        const delay = 2000 + Math.random() * 2000;
        setTimeout(() => {
            // Pick a random disease (weighted towards actual diseases for demo)
            const weights = [0.2, 0.15, 0.2, 0.2, 0.15, 0.1];
            let random = Math.random();
            let index = 0;
            for (let i = 0; i < weights.length; i++) {
                random -= weights[i];
                if (random <= 0) {
                    index = i;
                    break;
                }
            }
            resolve(diseaseDatabase[index]);
        }, delay);
    });
};

export default diseaseDatabase;
