// Weather API utility using Open-Meteo (free, no API key needed)

const LOCATIONS = {
    mumbai: { lat: 19.0760, lon: 72.8777, name: 'Mumbai, Maharashtra' },
    delhi: { lat: 28.6139, lon: 77.2090, name: 'New Delhi' },
    bangalore: { lat: 12.9716, lon: 77.5946, name: 'Bengaluru, Karnataka' },
    chennai: { lat: 13.0827, lon: 80.2707, name: 'Chennai, Tamil Nadu' },
    lucknow: { lat: 26.8467, lon: 80.9462, name: 'Lucknow, UP' },
    jaipur: { lat: 26.9124, lon: 75.7873, name: 'Jaipur, Rajasthan' },
    pune: { lat: 18.5204, lon: 73.8567, name: 'Pune, Maharashtra' },
    ahmedabad: { lat: 23.0225, lon: 72.5714, name: 'Ahmedabad, Gujarat' },
    bhopal: { lat: 23.2599, lon: 77.4126, name: 'Bhopal, MP' },
    ludhiana: { lat: 30.901, lon: 75.8573, name: 'Ludhiana, Punjab' },
};

export const getLocationList = () => {
    return Object.entries(LOCATIONS).map(([id, loc]) => ({
        id,
        name: loc.name,
    }));
};

/**
 * Fetch weather data from Open-Meteo API
 * @param {string} locationId - Key from LOCATIONS object
 * @returns {Promise<Object>} Weather data including current, hourly, and daily forecasts
 */
export const fetchWeather = async (locationId = 'pune') => {
    const location = LOCATIONS[locationId] || LOCATIONS.pune;

    const params = new URLSearchParams({
        latitude: location.lat,
        longitude: location.lon,
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
        daily: 'temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max,precipitation_sum,sunrise,sunset',
        timezone: 'Asia/Kolkata',
        forecast_days: '7',
    });

    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
        if (!response.ok) throw new Error('Weather API error');

        const data = await response.json();
        return {
            ...data,
            locationName: location.name,
        };
    } catch (error) {
        console.error('Failed to fetch weather:', error);
        // Return mock data as fallback
        return getMockWeatherData(location.name);
    }
};

/**
 * Get weather description and emoji from WMO weather code
 */
export const getWeatherInfo = (code) => {
    const weatherCodes = {
        0: { desc: 'Clear Sky', emoji: '☀️', icon: '☀️' },
        1: { desc: 'Mostly Clear', emoji: '🌤️', icon: '🌤️' },
        2: { desc: 'Partly Cloudy', emoji: '⛅', icon: '⛅' },
        3: { desc: 'Overcast', emoji: '☁️', icon: '☁️' },
        45: { desc: 'Foggy', emoji: '🌫️', icon: '🌫️' },
        48: { desc: 'Rime Fog', emoji: '🌫️', icon: '🌫️' },
        51: { desc: 'Light Drizzle', emoji: '🌦️', icon: '🌦️' },
        53: { desc: 'Moderate Drizzle', emoji: '🌦️', icon: '🌦️' },
        55: { desc: 'Dense Drizzle', emoji: '🌧️', icon: '🌧️' },
        61: { desc: 'Slight Rain', emoji: '🌧️', icon: '🌧️' },
        63: { desc: 'Moderate Rain', emoji: '🌧️', icon: '🌧️' },
        65: { desc: 'Heavy Rain', emoji: '🌧️', icon: '🌧️' },
        71: { desc: 'Light Snow', emoji: '🌨️', icon: '🌨️' },
        73: { desc: 'Moderate Snow', emoji: '🌨️', icon: '🌨️' },
        75: { desc: 'Heavy Snow', emoji: '❄️', icon: '❄️' },
        80: { desc: 'Rain Showers', emoji: '🌦️', icon: '🌦️' },
        81: { desc: 'Moderate Showers', emoji: '🌧️', icon: '🌧️' },
        82: { desc: 'Heavy Showers', emoji: '⛈️', icon: '⛈️' },
        95: { desc: 'Thunderstorm', emoji: '⛈️', icon: '⛈️' },
        96: { desc: 'Thunderstorm + Hail', emoji: '⛈️', icon: '⛈️' },
        99: { desc: 'Heavy Thunderstorm', emoji: '⛈️', icon: '⛈️' },
    };
    return weatherCodes[code] || { desc: 'Unknown', emoji: '🌡️', icon: '🌡️' };
};

/**
 * Generate smart weather alerts for farming
 */
export const getWeatherAlerts = (weatherData) => {
    const alerts = [];
    if (!weatherData?.daily) return alerts;

    const { daily } = weatherData;

    // Check tomorrow's rain probability
    const tomorrowRain = daily.precipitation_probability_max?.[1];
    if (tomorrowRain && tomorrowRain > 70) {
        alerts.push({
            type: 'warning',
            icon: '🌧️',
            message: `Rain expected tomorrow (${tomorrowRain}% chance) – avoid irrigation and protect open fertilizers`,
        });
    } else if (tomorrowRain && tomorrowRain > 40) {
        alerts.push({
            type: 'info',
            icon: '🌤️',
            message: `Possible light rain tomorrow (${tomorrowRain}% chance) – plan outdoor activities accordingly`,
        });
    }

    // Check high temperature
    const todayMax = daily.temperature_2m_max?.[0];
    if (todayMax && todayMax > 40) {
        alerts.push({
            type: 'danger',
            icon: '🔥',
            message: `Extreme heat today (${todayMax}°C) – water crops early morning, provide shade to livestock`,
        });
    } else if (todayMax && todayMax > 35) {
        alerts.push({
            type: 'warning',
            icon: '🌡️',
            message: `High temperature expected (${todayMax}°C) – ensure adequate watering for your crops`,
        });
    }

    // Good weather alert
    if (alerts.length === 0) {
        const rainToday = daily.precipitation_probability_max?.[0];
        if (!rainToday || rainToday < 20) {
            alerts.push({
                type: 'success',
                icon: '☀️',
                message: 'Clear skies ahead — great day for field work and crop inspection!',
            });
        }
    }

    return alerts;
};

/**
 * Get day name from date string
 */
export const getDayName = (dateStr, index) => {
    if (index === 0) return 'Today';
    if (index === 1) return 'Tomorrow';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
};

// Fallback mock data
function getMockWeatherData(locationName) {
    return {
        locationName,
        current: {
            temperature_2m: 28,
            relative_humidity_2m: 65,
            apparent_temperature: 30,
            weather_code: 2,
            wind_speed_10m: 12,
        },
        daily: {
            time: Array.from({ length: 7 }, (_, i) => {
                const d = new Date();
                d.setDate(d.getDate() + i);
                return d.toISOString().split('T')[0];
            }),
            temperature_2m_max: [32, 31, 30, 33, 34, 32, 30],
            temperature_2m_min: [22, 21, 20, 23, 24, 22, 21],
            weather_code: [2, 3, 61, 1, 0, 2, 80],
            precipitation_probability_max: [15, 35, 75, 10, 5, 20, 60],
            precipitation_sum: [0, 0, 12, 0, 0, 0, 8],
        },
    };
}
