import { createContext, useContext, useState, useEffect } from 'react';
import { fetchWeather, getMockWeatherData, getLocationList } from './weatherApi';
import { useSettings } from './SettingsContext';

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
    const { isOffline, updateSyncTime } = useSettings();
    const [selectedLocation, setSelectedLocation] = useState('pune');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setWeatherData(null); // Reset to avoid showing old city data while switching

        if (isOffline) {
            const cached = localStorage.getItem(`weather_${selectedLocation}`);
            if (cached) {
                setWeatherData(JSON.parse(cached));
            } else {
                // Find full name from the list
                const locationList = getLocationList();
                const locInfo = locationList.find(l => l.id === selectedLocation);
                const fullName = locInfo ? locInfo.name : selectedLocation;

                // Fallback for uncached locations in offline mode
                const mock = getMockWeatherData(fullName);
                setWeatherData({
                    ...mock,
                    isOfflineData: true
                });
            }
            return;
        }

        setLoading(true);
        fetchWeather(selectedLocation).then(data => {
            setWeatherData(data);
            localStorage.setItem(`weather_${selectedLocation}`, JSON.stringify(data));
            updateSyncTime();
            setLoading(false);
        });
    }, [selectedLocation, isOffline]);

    return (
        <WeatherContext.Provider value={{
            selectedLocation,
            setSelectedLocation,
            weatherData,
            loading
        }}>
            {children}
        </WeatherContext.Provider>
    );
}

export function useWeather() {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error('useWeather must be used within a WeatherProvider');
    }
    return context;
}
