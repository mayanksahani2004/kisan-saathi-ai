/**
 * Kisan Saathi AI Response Logic
 * Minimalist, human-advisor like, no markdown, no emojis.
 */

const matchesAny = (msg, keywords) => {
    return keywords.some(keyword => msg.includes(keyword));
};

export const getChatResponse = (userMessage, weatherData = null) => {
    const msg = userMessage.toLowerCase().trim();

    // 1. Weather related queries
    if (matchesAny(msg, ['weather', 'rain', 'forecast', 'sun', 'cloud', 'hot', 'cold'])) {
        if (weatherData) {
            const temp = Math.round(weatherData.current?.temperature_2m || 0);
            return `The temperature in your area is ${temp} degrees. Rain is expected tomorrow so please avoid irrigation today to save your efforts. Everything else looks stable for your crops.`;
        }
        return "I do not have that information right now. Please try again later while I check your local area details.";
    }

    // 2. Crop disease related queries
    if (matchesAny(msg, ['disease', 'spot', 'leaf', 'yellow', 'brown', 'pest', 'fungus', 'insect', 'sick'])) {
        return "I can help with that. Please upload a clear photo of the sick leaf in the health section so I can see what is wrong. Do not worry we will find a solution together.";
    }

    // 3. Market price related queries
    if (matchesAny(msg, ['price', 'market', 'rate', 'cost', 'sell', 'mandis', 'apmc', 'tomato', 'onion', 'wheat', 'rice'])) {
        const crop = msg.includes('tomato') ? 'Tomato' : msg.includes('onion') ? 'Onion' : 'your crop';
        return `Current market rates for ${crop} are stable near thirty rupees per kg in your state. Prices change daily so please check the rates section for the latest mandi updates.`;
    }

    // 4. Planting/Sowing advice
    if (matchesAny(msg, ['plant', 'sow', 'when to', 'growing', 'season', 'kharif', 'rabi'])) {
        return "Now is a good time to prepare your land for seasonal crops. Ensure the soil is moist and use organic manure for better growth. Consult your local expert for specific seed varieties.";
    }

    // 5. Fertilizer/Pesticide advice
    if (matchesAny(msg, ['fertilizer', 'urea', 'npk', 'manure', 'soil', 'pesticide', 'spray'])) {
        return "Try to use organic compost or neem based sprays first. They are safer for your soil and family. If the problem is large use fertilizers in small amounts after a soil test.";
    }

    // 6. Greetings
    if (matchesAny(msg, ['hello', 'hi', 'namaste', 'hey'])) {
        return "Namaste. I am Kisan Saathi AI. I can help you with weather market prices and crop health. How can I support your farming today?";
    }

    // Default response
    return "I could not understand that clearly. Please ask me about the weather crop diseases or today s market prices. I am here to help you.";
};

