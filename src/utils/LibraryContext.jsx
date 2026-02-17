import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const LibraryContext = createContext();

// Safe LocalStorage wrapper to prevent quota crashes
const safeLocalStorage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error("LocalStorage Error:", e);
            // If quota exceeded, we might want to clear old items or just ignore
            if (e.name === 'QuotaExceededError') {
                console.warn("Storage quota exceeded. Old items might not be saved.");
            }
        }
    },
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            return null;
        }
    }
};

/**
 * Utility to create a tiny thumbnail for history storage
 */
const createThumbnail = (base64Str, maxWidth = 150) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64Str;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ratio = maxWidth / img.width;
            canvas.width = maxWidth;
            canvas.height = img.height * ratio;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/jpeg', 0.6)); // Low quality tiny JPG
        };
        img.onerror = () => resolve(base64Str); // Fallback to original
    });
};

export function LibraryProvider({ children }) {
    const [chatHistory, setChatHistory] = useState(() => safeLocalStorage.get('kisan_saathi_chat_history') || []);
    const [detectionHistory, setDetectionHistory] = useState(() => safeLocalStorage.get('kisan_saathi_detection_history') || []);

    // Persist to localStorage safely
    useEffect(() => {
        safeLocalStorage.set('kisan_saathi_chat_history', chatHistory);
    }, [chatHistory]);

    useEffect(() => {
        safeLocalStorage.set('kisan_saathi_detection_history', detectionHistory);
    }, [detectionHistory]);

    const addToChatHistory = useCallback((query, response, lang) => {
        const newItem = {
            id: Date.now(),
            timestamp: new Date().toLocaleString(),
            query,
            response,
            lang
        };
        setChatHistory(prev => [newItem, ...prev].slice(0, 50));
    }, []);

    const addToDetectionHistory = useCallback(async (image, result) => {
        // Create a tiny thumbnail for the history list to save space
        const thumbnail = await createThumbnail(image);

        const newItem = {
            id: Date.now(),
            timestamp: new Date().toLocaleString(),
            image: thumbnail, // Store thumbnail instead of full crop
            result
        };
        setDetectionHistory(prev => [newItem, ...prev].slice(0, 15)); // Keep last 15
    }, []);

    const clearLibrary = useCallback(() => {
        setChatHistory([]);
        setDetectionHistory([]);
        localStorage.removeItem('kisan_saathi_chat_history');
        localStorage.removeItem('kisan_saathi_detection_history');
    }, []);

    return (
        <LibraryContext.Provider value={{
            chatHistory,
            detectionHistory,
            addToChatHistory,
            addToDetectionHistory,
            clearLibrary
        }}>
            {children}
        </LibraryContext.Provider>
    );
}

export function useLibrary() {
    const context = useContext(LibraryContext);
    if (!context) {
        throw new Error('useLibrary must be used within a LibraryProvider');
    }
    return context;
}
