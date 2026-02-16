import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchWeather, getWeatherInfo } from '../utils/weatherApi';
import { useLanguage } from '../utils/i18n';
import FarmerLogo from '../components/FarmerLogo';

export default function Dashboard() {
    const [weather, setWeather] = useState(null);
    const { t, lang, setLang, LANGUAGES, currentLang } = useLanguage();
    const [showLangPicker, setShowLangPicker] = useState(false);

    useEffect(() => {
        fetchWeather('pune').then(data => setWeather(data));
    }, []);

    const currentTemp = weather?.current?.temperature_2m;
    const weatherCode = weather?.current?.weather_code;
    const weatherInfo = weatherCode !== undefined ? getWeatherInfo(weatherCode) : null;

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return t('greeting_morning');
        if (hour < 17) return t('greeting_afternoon');
        return t('greeting_evening');
    };

    return (
        <div className="dashboard page-wrapper">
            {/* Language Selector */}
            <div className="lang-selector-container">
                <button
                    className="lang-selector-btn"
                    onClick={() => setShowLangPicker(!showLangPicker)}
                    id="lang-selector"
                >
                    🌐 {currentLang.native}
                    <span className="lang-selector-arrow">{showLangPicker ? '▲' : '▼'}</span>
                </button>

                {showLangPicker && (
                    <div className="lang-picker-dropdown">
                        {LANGUAGES.map((language) => (
                            <button
                                key={language.id}
                                className={`lang-picker-option ${lang === language.id ? 'lang-picker-option--active' : ''}`}
                                onClick={() => {
                                    setLang(language.id);
                                    setShowLangPicker(false);
                                }}
                            >
                                <span>{language.flag}</span>
                                <span className="lang-picker-name">{language.native}</span>
                                <span className="lang-picker-eng">{language.name}</span>
                                {lang === language.id && <span className="lang-picker-check">✓</span>}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Welcome Section with Farmer Logo */}
            <div className="dashboard__welcome">
                <FarmerLogo size={100} />
                <h1 style={{ marginTop: 16 }}>{getGreeting()}</h1>
                <p>{t('welcome_msg')}</p>
            </div>

            {/* Quick Weather Summary */}
            {weather && (
                <Link to="/weather" style={{ textDecoration: 'none' }}>
                    <div className="dashboard__weather-summary">
                        <span className="dashboard__weather-summary-icon">
                            {weatherInfo?.emoji || '🌤️'}
                        </span>
                        <div className="dashboard__weather-summary-info">
                            <h3>{currentTemp ? `${Math.round(currentTemp)}°C` : '--'} · {weatherInfo?.desc || 'Loading...'}</h3>
                            <p>{weather.locationName || t('detecting_location')}</p>
                        </div>
                    </div>
                </Link>
            )}

            {!weather && (
                <div className="dashboard__weather-summary">
                    <span className="dashboard__weather-summary-icon">🌤️</span>
                    <div className="dashboard__weather-summary-info">
                        <h3 className="skeleton" style={{ width: 120, height: 20 }}>&nbsp;</h3>
                        <p className="skeleton" style={{ width: 160, height: 14, marginTop: 6 }}>&nbsp;</p>
                    </div>
                </div>
            )}

            {/* Feature Cards Grid */}
            <div className="dashboard__grid">
                <Link to="/weather" className="dashboard__card dashboard__card--weather" id="card-weather">
                    <span className="dashboard__card-icon">🌦️</span>
                    <div className="dashboard__card-title">{t('weather')}</div>
                    <div className="dashboard__card-desc">{t('weather_desc')}</div>
                </Link>

                <Link to="/crop-health" className="dashboard__card dashboard__card--crop" id="card-crop-health">
                    <span className="dashboard__card-icon">🔬</span>
                    <div className="dashboard__card-title">{t('crop_health')}</div>
                    <div className="dashboard__card-desc">{t('crop_health_desc')}</div>
                </Link>

                <Link to="/market" className="dashboard__card dashboard__card--market" id="card-market">
                    <span className="dashboard__card-icon">📊</span>
                    <div className="dashboard__card-title">{t('market_prices')}</div>
                    <div className="dashboard__card-desc">{t('market_prices_desc')}</div>
                </Link>

                <Link to="/assistant" className="dashboard__card dashboard__card--chat" id="card-assistant">
                    <span className="dashboard__card-icon">🤖</span>
                    <div className="dashboard__card-title">{t('voice_assistant')}</div>
                    <div className="dashboard__card-desc">{t('voice_assistant_desc')}</div>
                </Link>
            </div>
        </div>
    );
}
