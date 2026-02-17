import { useState, useRef, useEffect, useCallback } from 'react';
import { fetchAIResponse } from '../services/aiAdvisor';
import { useLanguage } from '../utils/i18n';
import { detectLanguage, kisanSaathiTTS } from '../services/voiceEngine';
import { useWeather } from '../utils/WeatherContext';
import { useSettings } from '../utils/SettingsContext';
import { useLibrary } from '../utils/LibraryContext';

const SUGGESTIONS = [
    'मेरे पास 10kg आलू है, क्या मैं आज बेच सकता हूँ?',
    'Will it rain tomorrow in my area?',
    'मेरे टमाटर के पौधे पर काले धब्बे हैं, क्या करूँ?',
    'வெங்காயம் விற்க சிறந்த விலை எங்கே கிடைக்கும்?',
    'When is the best time to sow Wheat?',
];

export default function AssistantPage() {
    const { t, currentLang } = useLanguage();
    const { weatherData } = useWeather();
    const { isOffline } = useSettings();
    const { addToChatHistory } = useLibrary();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [activeLangCode, setActiveLangCode] = useState(currentLang.speechLang);
    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);

    // Set initial welcome message
    useEffect(() => {
        setMessages([
            {
                role: 'assistant',
                text: t('assistant_welcome'),
            },
        ]);
        setActiveLangCode(currentLang.speechLang);
    }, [currentLang.id]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Initialize Speech Recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = activeLangCode;

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsListening(false);
                handleSendMessage(transcript);
            };

            recognition.onerror = () => setIsListening(false);
            recognition.onend = () => setIsListening(false);
            recognitionRef.current = recognition;
        }

        return () => {
            if (recognitionRef.current) {
                try { recognitionRef.current.stop(); } catch (e) { /* ignore */ }
            }
        };
    }, [activeLangCode]);

    /**
     * Kisan Saathi Voice Engine (Powered by NVIDIA)
     */
    const speakResponse = useCallback(async (text, langCode) => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
        }

        // Clean text for TTS
        const cleanText = text
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/\n/g, ' ')
            .replace(/#/g, '');

        setIsSpeaking(true);
        try {
            await kisanSaathiTTS(cleanText, langCode || activeLangCode);
        } catch (e) {
            console.error("TTS Output Failed", e);
        } finally {
            setIsSpeaking(false);
        }
    }, [activeLangCode, isSpeaking]);

    const stopSpeaking = useCallback(() => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    }, []);

    const handleSendMessage = useCallback(
        async (text) => {
            const messageText = text || input.trim();
            if (!messageText) return;

            // 1. Detect Language Automatically
            const detectedLangId = detectLanguage(messageText);
            const languageMap = {
                'en': 'en-IN',
                'hi': 'hi-IN',
                'ta': 'ta-IN',
                'te': 'te-IN',
                'kn': 'kn-IN',
                'ml': 'ml-IN',
                'mr': 'hi-IN' // Falling back to hi-IN for Marathi if strict voice not available
            };
            const responseLangCode = languageMap[detectedLangId] || activeLangCode;
            setActiveLangCode(responseLangCode);

            // Add user message
            setMessages((prev) => [...prev, { role: 'user', text: messageText }]);
            setInput('');
            setIsTyping(true);

            // 2. REAL-TIME AI ADVISOR PROCESSING
            try {
                const response = await fetchAIResponse(messageText, weatherData, detectedLangId, isOffline);

                // Save to Library
                addToChatHistory(messageText, response, detectedLangId);

                setMessages((prev) => [...prev, { role: 'assistant', text: response, langCode: responseLangCode }]);
                setIsTyping(false);

                // 3. Voice Output (NVIDIA Engine)
                setTimeout(() => {
                    speakResponse(response, responseLangCode);
                }, 200);
            } catch (err) {
                console.error("AI Assistant Error:", err);
                setIsTyping(false);
            }
        },
        [input, weatherData, activeLangCode, speakResponse, isOffline, addToChatHistory]
    );

    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert(t('voice_not_supported'));
            return;
        }
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            stopSpeaking();
            recognitionRef.current.lang = activeLangCode;
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatMessage = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br/>');
    };

    return (
        <div className="chat-page">
            <div className="chat-page__header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '2rem' }}>🌾</span>
                    <div style={{ textAlign: 'left' }}>
                        <h2 style={{ margin: 0 }}>{t('assistant_title')}</h2>
                        <p style={{ margin: 0, opacity: 0.8 }}>{t('assistant_subtitle')}</p>
                    </div>
                </div>

                <div style={{ marginTop: '10px', fontSize: '0.7rem', color: 'var(--green-600)', fontWeight: 'bold' }}>
                    POWERED BY NVIDIA RIVA & TTS
                </div>

                {isSpeaking && (
                    <div className="speaking-indicator" onClick={stopSpeaking} style={{ margin: '15px auto 0' }}>
                        <span className="speaking-indicator__waves">
                            <span></span><span></span><span></span><span></span><span></span>
                        </span>
                        <span className="speaking-indicator__text">Kisan Saathi is Speaking...</span>
                    </div>
                )}
            </div>

            <div className="chat-messages">
                {messages.map((msg, i) => (
                    <div key={i} className={`chat-message chat-message--${msg.role}`}>
                        <div className="chat-message__avatar">
                            {msg.role === 'user' ? '👨‍🌾' : '🌾'}
                        </div>
                        <div className="chat-message__content">
                            <div
                                className="chat-message__bubble"
                                dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                            />
                            {msg.role === 'assistant' && i > 0 && (
                                <button
                                    className="chat-message__speak-btn"
                                    onClick={() => speakResponse(msg.text, msg.langCode)}
                                >
                                    🔊 {t('listen_again') || 'Listen'}
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="chat-message chat-message--assistant">
                        <div className="chat-message__avatar">🌾</div>
                        <div className="chat-message__content">
                            <div className="chat-message__bubble">
                                <div className="typing-indicator">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {messages.length <= 1 && (
                <div className="chat-suggestions">
                    {SUGGESTIONS.map((s, i) => (
                        <button key={i} className="chat-suggestion-chip" onClick={() => handleSendMessage(s)}>
                            {s}
                        </button>
                    ))}
                </div>
            )}

            <div className="chat-input-area">
                <button
                    className={`chat-mic-btn ${isListening ? 'chat-mic-btn--active' : ''}`}
                    onClick={toggleListening}
                    id="mic-btn"
                >
                    {isListening ? '⏹️' : '🎤'}
                </button>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isListening ? t('listening') : t('type_question')}
                    id="chat-input"
                />
                <button
                    className="chat-send-btn"
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim() && !isListening}
                    id="send-btn"
                >
                    ➤
                </button>
            </div>
        </div>
    );
}
