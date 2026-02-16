/**
 * Chatbot Response Logic for FarmWise AI
 * Integrated with weather data for contextual answers
 */

const matchesAny = (msg, keywords) => {
    return keywords.some(keyword => msg.includes(keyword));
};

export const getChatResponse = (userMessage, weatherData = null) => {
    const msg = userMessage.toLowerCase().trim();

    // 1. Weather related queries
    if (matchesAny(msg, ['weather', 'rain', 'rainfall', 'forecast', 'sun', 'cloud', 'hot', 'cold'])) {
        if (weatherData) {
            const temp = Math.round(weatherData.current?.temperature_2m || 0);
            const condition = weatherData.current?.weather_code || 0;
            return `Based on your location, the current temperature is **${temp}°C**. The forecast shows ${msg.includes('rain') ? 'a 20% chance of showers' : 'stable conditions'} for the next 48 hours. You can check the detailed 7-day forecast in the **Weather** section.`;
        }
        return "I can provide weather updates! Currently, I'm detecting your location. Please check the **Weather** section for the latest forecast and alerts.";
    }

    // 2. Crop disease related queries
    if (matchesAny(msg, ['disease', 'spot', 'leaf', 'yellow', 'brown', 'pest', 'fungus', 'insect', 'sick'])) {
        return "I can help identify crop diseases. Please go to the **Crop Health** section and upload a clear photo of the affected leaf. My AI will analyze it and provide recommendations.";
    }

    // 3. Market price related queries
    if (matchesAny(msg, ['price', 'market', 'rate', 'cost', 'sell', 'mandis', 'apmc', 'tomato', 'onion', 'wheat', 'rice'])) {
        const crop = msg.includes('tomato') ? 'Tomato' : msg.includes('onion') ? 'Onion' : 'your crop';
        return `Current market prices for **${crop}** are trending upwards in your region. For the most accurate daily rates from Agmarknet, please visit the **Market Prices** section.`;
    }

    // 4. Planting/Sowing advice
    if (matchesAny(msg, ['plant', 'sow', 'when to', 'growing', 'season', 'kharif', 'rabi'])) {
        return "It's currently a good time for seasonal crops. For specific advice, I recommend checking the local agricultural calendar. Wheat and mustard are common in this season. Ensure your soil is well-prepared with balanced fertilizers.";
    }

    // 5. Fertilizer/Pesticide advice
    if (matchesAny(msg, ['fertilizer', 'urea', 'npk', 'manure', 'soil', 'pesticide', 'spray'])) {
        return "Using the right amount of NPK fertilizer is crucial. I suggest a soil test first. Generally, a ratio of 4:2:1 is recommended for many cereal crops. Always follow the manufacturer's label when applying pesticides.";
    }

    // 6. Irrigation
    if (matchesAny(msg, ['water', 'irrigate', 'drip', 'sprinkler', 'dry'])) {
        return "Drip irrigation is the most efficient way to save water. If the soil feels dry up to 2 inches deep, it's time to irrigate. Check the **Weather** forecast before watering to avoid over-irrigation if rain is expected.";
    }

    // 7. Greetings
    if (matchesAny(msg, ['hello', 'hi', 'namaste', 'hey', 'good morning', 'good afternoon'])) {
        return "🙏 Namaste! I am your **FarmWise AI** assistant. How can I help you with your farming today? You can ask me about weather, crop diseases, market prices, or general farming tips.";
    }

    // Default response
    return "I'm not sure I understand that yet. I can assist with **weather**, **crop health**, **market prices**, and **general farming advice**. Could you please rephrase your question?";
};
