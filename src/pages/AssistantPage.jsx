import { useState, useRef, useEffect, useCallback } from 'react';
import { getChatResponse } from '../data/chatResponses';
import { fetchWeather } from '../utils/weatherApi';
import { useLanguage } from '../utils/i18n';

const SUGGESTIONS = [
    'Will it rain tomorrow?',
    'My crop has brown spots',
    'Price of tomatoes',
    'When to plant wheat?',
    'How to save water?',
];

export default function AssistantPage() {
    const { t, currentLang } = useLanguage();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);

    // Set initial welcome message based on language
    useEffect(() => {
        setMessages([
            {
                role: 'assistant',
                text: t('assistant_welcome'),
            },
        ]);
    }, [currentLang.id]);

    // Fetch weather data for contextual responses
    useEffect(() => {
        fetchWeather('pune').then((data) => setWeatherData(data));
    }, []);

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Initialize speech recognition with language support
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = currentLang.speechLang;

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsListening(false);
                // Auto-send after voice input
                handleSendMessage(transcript);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        }

        return () => {
            if (recognitionRef.current) {
                try { recognitionRef.current.stop(); } catch (e) { /* ignore */ }
            }
        };
    }, [currentLang.speechLang]);

    /**
     * Speak the response using Web Speech API TTS
     * Supports multiple Indian languages
     */
    const speakResponse = useCallback((text) => {
        if (!window.speechSynthesis) return;

        // Stop any ongoing speech
        window.speechSynthesis.cancel();

        // Strip markdown formatting for speech
        const cleanText = text
            .replace(/\*\*/g, '')
            .replace(/\*/g, '')
            .replace(/#{1,6}\s/g, '')
            .replace(/[•\-]\s/g, '')
            .replace(/\n+/g, '. ')
            .replace(/\d+\.\s/g, '')
            .replace(/\[.*?\]\(.*?\)/g, '');

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = currentLang.speechLang;
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Try to find a voice matching the language
        const voices = window.speechSynthesis.getVoices();
        const matchingVoice = voices.find(v => v.lang.startsWith(currentLang.id));
        if (matchingVoice) {
            utterance.voice = matchingVoice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    }, [currentLang]);

    const stopSpeaking = useCallback(() => {
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }, []);

    const handleSendMessage = useCallback(
        async (text) => {
            const messageText = text || input.trim();
            if (!messageText) return;

            // Add user message
            const userMsg = { role: 'user', text: messageText };
            setMessages((prev) => [...prev, userMsg]);
            setInput('');
            setIsTyping(true);

            // Simulate typing delay
            await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));

            // Get AI response
            const response = getChatResponse(messageText, weatherData);
            const assistantMsg = { role: 'assistant', text: response };
            setMessages((prev) => [...prev, assistantMsg]);
            setIsTyping(false);

            // ALWAYS speak the response using TTS
            // Small delay to let the UI update first
            setTimeout(() => {
                speakResponse(response);
            }, 300);
        },
        [input, weatherData, speakResponse]
    );

    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert(t('voice_not_supported'));
            return;
        }
        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            // Stop any ongoing speech when starting to listen
            stopSpeaking();
            try {
                recognitionRef.current.lang = currentLang.speechLang;
                recognitionRef.current.start();
                setIsListening(true);
            } catch (e) {
                console.error('Failed to start recognition:', e);
                setIsListening(false);
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
        handleSendMessage(suggestion);
    };

    // Simple markdown-to-HTML for bold text
    const formatMessage = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br/>');
    };

    return (
        <div className="chat-page">
            <div className="chat-page__header">
                <h2>🤖 {t('assistant_title')}</h2>
                <p>{t('assistant_subtitle')}</p>
                {isSpeaking && (
                    <div className="speaking-indicator" onClick={stopSpeaking}>
                        <span className="speaking-indicator__waves">
                            <span></span><span></span><span></span><span></span><span></span>
                        </span>
                        <span className="speaking-indicator__text">{t('speaking')} (tap to stop)</span>
                    </div>
                )}
            </div>

            {/* Messages */}
            <div className="chat-messages">
                {messages.map((msg, i) => (
                    <div key={i} className={`chat-message chat-message--${msg.role}`}>
                        <div className="chat-message__avatar">
                            {msg.role === 'user' ? '👨‍🌾' : '🌱'}
                        </div>
                        <div className="chat-message__content">
                            <div
                                className="chat-message__bubble"
                                dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                            />
                            {/* Re-play voice button for assistant messages */}
                            {msg.role === 'assistant' && i > 0 && (
                                <button
                                    className="chat-message__speak-btn"
                                    onClick={() => speakResponse(msg.text)}
                                    title="Listen to this response"
                                >
                                    🔊
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                    <div className="chat-message chat-message--assistant">
                        <div className="chat-message__avatar">🌱</div>
                        <div className="chat-message__content">
                            <div className="chat-message__bubble">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 2 && (
                <div className="chat-suggestions">
                    {SUGGESTIONS.map((s, i) => (
                        <button
                            key={i}
                            className="chat-suggestion-chip"
                            onClick={() => handleSuggestionClick(s)}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            )}

            {/* Input Area */}
            <div className="chat-input-area">
                <button
                    className={`chat-mic-btn ${isListening ? 'chat-mic-btn--active' : ''}`}
                    onClick={toggleListening}
                    title={isListening ? 'Stop listening' : 'Speak your question'}
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
