import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
    const [isOffline, setIsOffline] = useState(() => {
        const saved = localStorage.getItem('kisan_saathi_offline');
        return saved === 'true';
    });

    const [lastUpdated, setLastUpdated] = useState(() => {
        return localStorage.getItem('kisan_saathi_last_updated') || new Date().toLocaleString();
    });

    useEffect(() => {
        localStorage.setItem('kisan_saathi_offline', isOffline);
    }, [isOffline]);

    const clearCache = () => {
        // Clear specific app keys but keep settings
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && !key.includes('offline') && !key.includes('last_updated')) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
        return true;
    };

    const updateSyncTime = () => {
        const now = new Date().toLocaleString();
        setLastUpdated(now);
        localStorage.setItem('kisan_saathi_last_updated', now);
    };

    return (
        <SettingsContext.Provider value={{
            isOffline,
            setIsOffline,
            lastUpdated,
            clearCache,
            updateSyncTime
        }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
