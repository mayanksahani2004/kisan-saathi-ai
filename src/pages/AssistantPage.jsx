import { useState, useRef, useEffect, useCallback } from 'react';
import { getChatResponse } from '../data/chatResponses';
import { fetchWeather } from '../utils/weatherApi';
import { useLanguage } from '../utils/i18n';

// Rural friendly common queries
const SUGGESTIONS = [
    'Will it rain tomorrow',
    'My crop leaf has yellow spots',
    'Price of tomatoes today',
    'When should I sow wheat',
    'Tell me a way to save water',
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

    // Identity: Kisan Saathi AI
    useEffect(() => {
        setMessages([
            {
                role: 'assistant',
                text: t('assistant_welcome'),
            },
        ]);
    }, [currentLang.id]);

    useEffect(() => {
        // Mock fetch based on general location for demo
        fetchWeather('pune').then((data) => setWeatherData(data));
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    /**
     * VOIE INPUT PIPELINE (NVIDIA Riva Simulation)
     */
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = currentLang.speechLang;

            recognition.onresult = (event) => {
                const result = event.results[0][0];
                const transcript = result.transcript;
                const confidence = result.confidence || 0.9; // Browser confidence

                // CORE RULE: If transcription confidence < 0.75: Ask user to repeat slowly
                if (confidence < 0.75) {
                    const fallbackMsg = "I could not hear you clearly. Please speak slowly.";
                    setMessages(prev => [...prev, { role: 'user', text: transcript }, { role: 'assistant', text: fallbackMsg }]);
                    speakResponse(fallbackMsg);
                    return;
                }

                setInput(transcript);
                setIsListening(false);
                handleSendMessage(transcript);
            };

            recognition.onerror = (event) => {
                console.error('ASR Error:', event.error);
                setIsListening(false);
            };

            recognition.onend = () => setIsListening(false);
            recognitionRef.current = recognition;
        }

        return () => {
            if (recognitionRef.current) {
                try { recognitionRef.current.stop(); } catch (e) { /* ignore */ }
            }
        };
    }, [currentLang.speechLang]);

    /**
     * TEXT TO SPEECH PIPELINE (NVIDIA TTS / Edge Fallback Simulation)
     */
    const speakResponse = useCallback((text) => {
        if (!window.speechSynthesis) return;

        window.speechSynthesis.cancel();

        // PRIMARY TTS: NVIDIA TTS Simulation
        // We use Web Speech API as the engine, simulated as NVIDIA pipelines
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = currentLang.speechLang;
        utterance.rate = 0.85; // Rural-friendly slow speed
        utterance.pitch = 1.0;

        // Fallback Logic: Detect long delay or failure
        let ttsStartTime = Date.now();

        utterance.onstart = () => {
            setIsSpeaking(true);
            const latency = (Date.now() - ttsStartTime) / 1000;
            if (latency > 2) {
                console.log("Latency > 2s: Automatically switched to NVIDIA Edge TTS (simulated)");
            }
        };

        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (event) => {
            console.warn('Primary TTS failed, using Fallback NVIDIA Edge TTS...');
            // In a real app, logic would switch here. For demo, we just log and proceed.
            setIsSpeaking(false);
        };

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

            setMessages((prev) => [...prev, { role: 'user', text: messageText }]);
            setInput('');
            setIsTyping(true);

            // Simulation of AI thinking
            await new Promise((r) => setTimeout(r, 1000));

            const response = getChatResponse(messageText, weatherData);
            setMessages((prev) => [...prev, { role: 'assistant', text: response }]);
            setIsTyping(false);

            setTimeout(() => speakResponse(response), 200);
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
        } else {
            stopSpeaking();
            try {
                recognitionRef.current.lang = currentLang.speechLang;
                recognitionRef.current.start();
                setIsListening(true);
            } catch (e) {
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

    return (
        <div className="chat-page">
            <div className="chat-page__header">
                <h2>{t('assistant_title')}</h2>
                <p>{t('assistant_subtitle')}</p>
                {isSpeaking && (
                    <div className="speaking-indicator" onClick={stopSpeaking}>
                        <span className="speaking-indicator__waves">
                            <span></span><span></span><span></span><span></span><span></span>
                        </span>
                        <span className="speaking-indicator__text">{t('speaking')}</span>
                    </div>
                )}
            </div>

            <div className="chat-messages">
                {messages.map((msg, i) => (
                    <div key={i} className={`chat-message chat-message--${msg.role}`}>
                        <div className="chat-message__content">
                            <div className="chat-message__bubble">
                                {msg.text}
                            </div>
                            {msg.role === 'assistant' && i > 0 && (
                                <button
                                    className="chat-message__speak-btn"
                                    onClick={() => speakResponse(msg.text)}
                                >
                                    🔊
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="chat-message chat-message--assistant">
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

            {messages.length <= 2 && (
                <div className="chat-suggestions">
                    {SUGGESTIONS.map((s, i) => (
                        <button
                            key={i}
                            className="chat-suggestion-chip"
                            onClick={() => {
                                setInput(s);
                                handleSendMessage(s);
                            }}
                        >
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
                    {isListening ? 'Stop' : 'Speak'}
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
                    Send
                </button>
            </div>
        </div>
    );
}

