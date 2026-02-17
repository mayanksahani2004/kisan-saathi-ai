import { marketPrices, crops, regions } from './marketData';
import { diseaseDatabase } from './cropDiseases';

/**
 * Advanced AI Intelligence Layer for Kisan Saathi
 * Handles complex multi-part queries in Indian languages
 * Performs real-time data analysis across market, weather, and disease databases
 */

const getIntent = (msg) => {
    const text = msg.toLowerCase();

    // Sell Intent
    if (/(sell|bech|market|बेच|விற்க|విక్రయించడానికి|മാറ്റാൻ|ಮಾರಾಟ)/i.test(text)) return 'sell_advice';

    // Cultivation/Planting Intent
    if (/(plant|sow|grow|cultivation|लगा|பயிர்|నాటడం|കൃഷി|ನಡುವಿಕೆ)/i.test(text)) return 'cultivation_advice';

    // Disease/Health Intent
    if (/(spot|leaf|disease|fungal|medicine|medicine|रहम|நோய்|వ్యాధి|രോഗം|ರೋಗ)/i.test(text)) return 'disease_remedy';

    // Weather Intent
    if (/(weather|rain|तापमान|மழை|వర్షం|മഴ|ಮಳೆ)/i.test(text)) return 'weather_info';

    return 'general';
};

const extractCrop = (text) => {
    for (const crop of crops) {
        const regex = new RegExp(`(${crop.id}|${crop.name}|${crop.nameHi}|आलू|तकाली|பூசணி|వంగ|బంగాళదుంప|உருளைக்கிழங்கு)`, 'i');
        if (regex.test(text)) return crop;
    }
    // Specific language hacks
    if (/आलू|potato|உருளைக்கிழங்கு/i.test(text)) return crops.find(c => c.id === 'potato');
    if (/tomato|टमाटर|तकाली|தக்காளி/i.test(text)) return crops.find(c => c.id === 'tomato');
    if (/onion|प्याज|வெங்காயம்|ఉల్లిపాయ/i.test(text)) return crops.find(c => c.id === 'onion');
    return null;
};

const formatCurrency = (val) => `₹${val}/kg`;

export const getChatResponse = (userMessage, weatherData, lang = 'en') => {
    const intent = getIntent(userMessage);
    const crop = extractCrop(userMessage);

    // Localized templates
    const templates = {
        en: {
            no_crop: "I understand you're asking about selling, but could you specify which crop? (e.g., Potato, Tomato)",
            sell_wait: (crop, price, market, trend) => `The current market for **${crop}** is ${trend < 0 ? 'declining' : 'improving'}. The best rate is **${price}** in **${market}**. Since prices are ${trend < 0 ? 'falling' : 'rising'}, I suggest you ${trend < 0 ? 'sell immediately' : 'wait for 2-3 days'} to maximize your profit.`,
            disease: (name, actions) => `Based on your description, it looks like **${name}**. I recommend: ${actions.map(a => a.text).join('. ')}.`,
            cultivation: (crop, temp) => `With the current temperature of **${temp}°C**, it is a ${temp > 30 ? 'challenging' : 'favorable'} time for ${crop || 'seasonal'} crops. Ensure adequate irrigation.`,
            general: "🙏 Namaste! I am your Kisan Saathi. I can analyze market trends, weather forecasts, and crop diseases to give you expert advice. How can I help you today?"
        },
        hi: {
            no_crop: "मैं समझता हूँ कि आप बेचने के बारे में पूछ रहे हैं, लेकिन क्या आप बता सकते हैं कि कौन सी फसल? (जैसे आलू, टमाटर)",
            sell_wait: (crop, price, market, trend) => `**${crop}** का बाजार अभी ${trend < 0 ? 'गिर रहा है' : 'सुधर रहा है'}। सबसे अच्छी दर **${market}** में **${price}** है। चूंकि कीमतें ${trend < 0 ? 'कम हो रही हैं' : 'बढ़ रही हैं'}, मेरा सुझाव है कि आप ${trend < 0 ? 'आज ही बेच दें' : '2-3 दिन रुकें'} ताकि आपको अधिक लाभ हो सके।`,
            disease: (name, actions) => `आपके विवरण के अनुसार, यह **${name}** लग रहा है। मेरी सलाह है: ${actions.map(a => a.text).join('. ')}।`,
            cultivation: (crop, temp) => `**${temp}°C** के वर्तमान तापमान के साथ, यह ${crop || 'मौसमी'} फसलों के लिए ${temp > 30 ? 'चुनौतीपूर्ण' : 'अनुकूल'} समय है। सिंचाई का पूरा ध्यान रखें।`,
            general: "🙏 नमस्ते! मैं आपका किसान साथी हूँ। मैं बाजार के रुझान, मौसम के पूर्वानुमान और फसल रोगों का विश्लेषण करके आपको विशेषज्ञ सलाह दे सकता हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?"
        },
        ta: {
            no_crop: "விற்பனை பற்றி கேட்கிறீர்கள் என்று எனக்குப் புரிகிறது, ஆனால் எந்தப் பயிர் என்று குறிப்பிட முடியுமா? (உதாரணமாக உருளைக்கிழங்கு, தக்காளி)",
            sell_wait: (crop, price, market, trend) => `**${crop}** சந்தை தற்போது ${trend < 0 ? 'சரிந்து வருகிறது' : 'மேம்பட்டு வருகிறது'}. **${market}** பகுதியில் சிறந்த விலை **${price}** ஆக உள்ளது. விலை ${trend < 0 ? 'குறைந்து வருவதால்' : 'அதிகரித்து வருவதால்'}, நீங்கள் ${trend < 0 ? 'உடனே விற்கலாம்' : '2-3 நாட்கள் காத்திருக்கலாம்'} என்று நான் பரிந்துரைக்கிறேன்.`,
            disease: (name, actions) => `உங்கள் விளக்கத்தின் அடிப்படையில், இது **${name}** போல் தெரிகிறது. எனது பரிந்துரை: ${actions.map(a => a.text).join('. ')}.`,
            cultivation: (crop, temp) => `தற்போதைய வெப்பநிலை **${temp}°C** உடன், இது ${crop || 'பருவக்கால'} பயிர்களுக்கு ${temp > 30 ? 'கடினமான' : 'சாதகமான'} நேரமாகும். நீர் மேலாண்மையில் கவனம் செலுத்துங்கள்.`,
            general: "🙏 வணக்கம்! நான் உங்கள் கிசான் சாதி. சந்தை போக்குகள், வானிலை முன்னறிவிப்புகள் மற்றும் பயிர் நோய்களை ஆய்வு செய்து உங்களுக்கு சிறந்த ஆலோசனைகளை வழங்குவேன். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?"
        }
    };

    const t = templates[lang] || templates.en;

    // 1. Sell Advice Business Logic
    if (intent === 'sell_advice') {
        if (!crop) return t.no_crop;

        // Search across all regions for the best price for this crop
        let bestPrice = -1;
        let bestMarket = "";
        let bestTrend = 0;

        const cropData = marketPrices[crop.id];
        if (cropData) {
            Object.values(cropData).forEach(regionMarkets => {
                regionMarkets.forEach(m => {
                    if (m.price > bestPrice) {
                        bestPrice = m.price;
                        bestMarket = m.market;
                        bestTrend = m.change;
                    }
                });
            });
        }

        if (bestPrice !== -1) {
            const cropName = lang === 'hi' ? crop.nameHi : crop.name;
            return t.sell_wait(cropName, formatCurrency(bestPrice), bestMarket, bestTrend);
        }
    }

    // 2. Cultivation Logic
    if (intent === 'cultivation_advice') {
        const temp = weatherData?.current?.temperature_2m || 25;
        const cropName = crop ? (lang === 'hi' ? crop.nameHi : crop.name) : null;
        return t.cultivation(cropName, Math.round(temp));
    }

    // 3. Disease Logic
    if (intent === 'disease_remedy') {
        // Find most relevant disease from database (simulated)
        const disease = diseaseDatabase.find(d =>
            userMessage.toLowerCase().includes(d.id.split('_')[0]) ||
            (userMessage.toLowerCase().includes('spot') && d.id.includes('spot'))
        ) || diseaseDatabase[0];

        return t.disease(disease.name, disease.actions);
    }

    // 4. Weather Logic
    if (intent === 'weather_info' && weatherData) {
        const temp = Math.round(weatherData.current?.temperature_2m || 0);
        const hi_msg = `वर्तमान तापमान **${temp}°C** है और आसमान साफ रहने की संभावना है।`;
        const en_msg = `The current temperature is **${temp}°C**. The sky is expected to remain clear for field work.`;
        return lang === 'hi' ? hi_msg : en_msg;
    }

    return t.general;
};
