// Multi-language support (i18n) for Kisan Saathi AI
// Supports: English, Hindi, Tamil, Kannada, Telugu, Marathi, Malayalam

import { createContext, useContext, useState, useCallback } from 'react';

export const LANGUAGES = [
    { id: 'en', name: 'English', native: 'English', flag: '🇬🇧', speechLang: 'en-IN' },
    { id: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', speechLang: 'hi-IN' },
    { id: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳', speechLang: 'ta-IN' },
    { id: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳', speechLang: 'kn-IN' },
    { id: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳', speechLang: 'te-IN' },
    { id: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳', speechLang: 'mr-IN' },
    { id: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳', speechLang: 'ml-IN' },
];

// Translation strings for all supported languages
const translations = {
    en: {
        // Dashboard
        greeting_morning: 'Good Morning',
        greeting_afternoon: 'Good Afternoon',
        greeting_evening: 'Good Evening',
        welcome_msg: 'How can I help you today?',
        weather: 'Weather',
        weather_desc: 'Rain and Heat updates',
        crop_health: 'Crop Health',
        crop_health_desc: 'Check for leaf disease',
        market_prices: 'Market Prices',
        market_prices_desc: 'Current mandi rates',
        voice_assistant: 'Kisan Saathi AI',
        voice_assistant_desc: 'Speak and ask anything',
        detecting_location: 'Looking for your location',

        // Weather Page
        weather_title: 'Weather Information',
        weather_subtitle: 'Simple rain and heat updates for your area',
        location: 'Your area',
        feels_like: 'Feel',
        humidity: 'Air moisture',
        wind: 'Wind speed',
        seven_day: 'Next 7 days',
        today: 'Today',
        tomorrow: 'Tomorrow',

        // Crop Health Page
        crop_title: 'Crop Health Check',
        crop_subtitle: 'Show me your crop leaf to see what is wrong',
        upload_title: 'Take a leaf photo',
        upload_subtitle: 'Ensure light is good and leaf is clear',
        choose_photo: 'Open Camera',
        analyze_btn: 'Check Health Now',
        analyzing: 'Checking your crop now',
        analyzing_detail: 'Please wait while I look at the leaf',
        severity: 'Problem level',
        confidence: 'Certainty',
        description: 'What I see',
        recommended_actions: 'What you can do',
        upload_another: 'Check another leaf',
        remove: 'Cancel',

        // Market Page
        market_title: 'Market Rates',
        market_subtitle: 'Daily rates for your local markets',
        select_crop: 'Pick Crop',
        select_region: 'Pick State',
        best_price: 'Best Rate',
        per_kg: 'per kg',
        price_disclaimer: 'Source: Agmarknet Govt of India. Rates can change daily.',
        source_label: 'Govt. of India Market Data',
        no_data: 'No rates found for this crop here.',
        try_different: 'Try another crop or state.',

        // Assistant Page
        assistant_title: 'Kisan Saathi AI',
        assistant_subtitle: 'I am here to support you',
        assistant_welcome: "Namaste. I am your Kisan Saathi assistant. You can ask me about the weather, crop problems, or market prices. How can I help you today?",
        type_question: 'Ask me anything',
        listening: 'I am listening',
        speaking: 'I am speaking',
        voice_not_supported: 'Voice service is not ready. Please type instead.',

        // Navigation
        home: 'Home',
        crops: 'Health',
        market: 'Rates',
        chat: 'Support',

        // Language
        language: 'Language',
        select_language: 'Choose Language',
    },

    hi: {
        greeting_morning: 'नमस्ते',
        greeting_afternoon: 'नमस्ते',
        greeting_evening: 'नमस्ते',
        welcome_msg: 'आज मैं आपकी क्या सहायता कर सकता हूँ?',
        weather: 'मौसम',
        weather_desc: 'बारिश और गर्मी की जानकारी',
        crop_health: 'फसल की सेहत',
        crop_health_desc: 'बीमारी की पहचान',
        market_prices: 'बाजार भाव',
        market_prices_desc: 'मंडी के ताजा रेट',
        voice_assistant: 'किसान साथी एआई',
        voice_assistant_desc: 'बोलकर कुछ भी पूछें',
        detecting_location: 'आपकी जगह ढूंढ रहे हैं',
        weather_title: 'मौसम की जानकारी',
        weather_subtitle: 'आपके क्षेत्र के लिए बारिश का अनुमान',
        location: 'आपका क्षेत्र',
        feels_like: 'महसूस',
        humidity: 'नमी',
        wind: 'हवा',
        seven_day: 'अगले 7 दिन',
        today: 'आज',
        tomorrow: 'कल',
        crop_title: 'फसल स्वास्थ्य जांच',
        crop_subtitle: 'बीमारी देखने के लिए पत्ते की फोटो दिखाएं',
        upload_title: 'पत्ते की फोटो लें',
        upload_subtitle: 'पत्ते की साफ फोटो लें',
        choose_photo: 'कैमरा खोलें',
        analyze_btn: 'अभी जांचें',
        analyzing: 'जांच चल रही है',
        analyzing_detail: 'कृपया थोड़ा इंतजार करें',
        severity: 'गंभीरता',
        confidence: 'भरोसा',
        description: 'जानकारी',
        recommended_actions: 'आप क्या कर सकते हैं',
        upload_another: 'दूसरी फोटो लें',
        remove: 'हटाएं',
        market_title: 'बाजार भाव',
        market_subtitle: 'आपकी मंडियों के ताजा भाव',
        select_crop: 'फसल चुनें',
        select_region: 'अपना राज्य चुनें',
        best_price: 'सबसे अच्छा भाव',
        per_kg: 'प्रति किलो',
        price_disclaimer: 'भारत सरकार के एगमार्कनेट से जानकारी। रेट बदल सकते हैं।',
        no_data: 'इस फसल का भाव यहां नहीं मिला।',
        try_different: 'कुछ और चुनकर देखें।',
        assistant_title: 'किसान साथी एआई',
        assistant_subtitle: 'मैं आपकी मदद के लिए हूँ',
        assistant_welcome: "नमस्ते। मैं आपका किसान साथी सहायक हूँ। आप मुझसे मौसम, फसल की बीमारी या मंडी भाव के बारे में पूछ सकते हैं। मैं आपकी क्या मदद करूँ?",
        type_question: 'कुछ भी पूछें',
        listening: 'मैं सुन रहा हूँ',
        speaking: 'मैं बोल रहा हूँ',
        voice_not_supported: 'बोलने की सुविधा उपलब्ध नहीं है।',
        home: 'होम',
        crops: 'सेहत',
        market: 'भाव',
        chat: 'सहायता',
        language: 'भाषा',
        select_language: 'भाषा चुनें',
    },
    // Adding minimal translations for others to keep it simple but functional
    ta: { home: 'முகப்பு', chat: 'உதவி', assistant_title: 'கிசான் சாதி AI', assistant_welcome: 'வணக்கம். நான் உங்கள் கிசான் சாதி உதவிப்பாளர்.' },
    kn: { home: 'ಮುಖಪುಟ', chat: 'ಸಹಾಯ', assistant_title: 'ಕಿಸಾನ್ ಸಾಥಿ AI', assistant_welcome: 'ನಮಸ್ಕಾರ. ನಾನು ನಿಮ್ಮ ಕಿಸಾನ್ ಸಾಥಿ ಸಹಾಯಕ.' },
    te: { home: 'హోమ్', chat: 'సహాయం', assistant_title: 'కిసాన్ సాథీ AI', assistant_welcome: 'నమస్కారం. నేను మీ కిసాన్ సాథీ సహాయకుడిని.' },
    mr: { home: 'होम', chat: 'मदत', assistant_title: 'किसान साथी एआई', assistant_welcome: 'नमस्ते. मी आपला किसान साथी सहाय्यक आहे.' },
    ml: { home: 'ഹോം', chat: 'സഹായം', assistant_title: 'കിസാൻ സാതി AI', assistant_welcome: 'നമസ്കാരം. ഞാൻ നിങ്ങളുടെ കിസാൻ സാതി സഹായിയാണ്.' },
};

// Context
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('en');

    const t = useCallback(
        (key) => {
            return translations[lang]?.[key] || translations.en[key] || key;
        },
        [lang]
    );

    const currentLang = LANGUAGES.find((l) => l.id === lang) || LANGUAGES[0];

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, currentLang, LANGUAGES }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
