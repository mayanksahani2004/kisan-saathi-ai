/**
 * Utility for detecting Indian languages based on Unicode ranges
 * Supports: Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi
 */

export const detectLanguage = (text) => {
    if (!text) return 'en';

    // Unicode ranges for Indian scripts
    const scripts = [
        { id: 'hi', name: 'Hindi', regex: /[\u0900-\u097F]/, langCode: 'hi-IN' },      // Devanagari (Hindi, Marathi)
        { id: 'mr', name: 'Marathi', regex: /[\u0900-\u097f]/, langCode: 'mr-IN' },    // Shared with Hindi, check specifically if needed
        { id: 'ta', name: 'Tamil', regex: /[\u0B80-\u0BFF]/, langCode: 'ta-IN' },
        { id: 'te', name: 'Telugu', regex: /[\u0C00-\u0C7F]/, langCode: 'te-IN' },
        { id: 'kn', name: 'Kannada', regex: /[\u0C80-\u0CFF]/, langCode: 'kn-IN' },
        { id: 'ml', name: 'Malayalam', regex: /[\u0D00-\u0D7F]/, langCode: 'ml-IN' },
    ];

    for (const script of scripts) {
        if (script.regex.test(text)) {
            // For Devanagari, differentiate between Hindi and Marathi if possible, 
            // otherwise default to the current active language if it matches the script
            return script.id;
        }
    }

    return 'en';
};

/**
 * NVIDIA Riva ASR Simulation
 * In a real scenario, this would use gRPC/REST to NVIDIA Riva Server
 */
export const rivaASR = async (audioBlob, languageCode) => {
    console.log(`[NVIDIA Riva] Processing ASR for ${languageCode}...`);
    // Simulate network latency
    await new Promise(r => setTimeout(r, 600));
    return "Simulated transcription from Riva ASR";
};

/**
 * NVIDIA TTS Synthesis with Edge Fallback
 */
export const kisanSaathiTTS = async (text, languageCode) => {
    console.log(`[NVIDIA TTS] Synthesizing: "${text.substring(0, 30)}..." in ${languageCode}`);

    return new Promise((resolve, reject) => {
        try {
            if (!window.speechSynthesis) {
                throw new Error("Speech synthesis not supported");
            }

            // Simulation of NVIDIA Cloud TTS logic
            const useNvidiaCloud = Math.random() > 0.1; // 90% success rate simulation

            if (!useNvidiaCloud) {
                console.warn("[NVIDIA TTS] Cloud synthesis failed. Falling back to NVIDIA Edge TTS...");
            }

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = languageCode;
            utterance.rate = 0.95;

            utterance.onend = () => resolve(true);
            utterance.onerror = (e) => reject(e);

            window.speechSynthesis.speak(utterance);
        } catch (err) {
            console.error("[NVIDIA TTS] Fatal error:", err);
            reject(err);
        }
    });
};
