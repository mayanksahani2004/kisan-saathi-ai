import { useEffect, useState } from 'react';
import {
    fetchWeather,
    getWeatherInfo,
    getWeatherAlerts,
    getDayName,
    getLocationList,
} from '../utils/weatherApi';
import { useLanguage } from '../utils/i18n';
import { useWeather } from '../utils/WeatherContext';

export default function WeatherPage() {
    const {
        selectedLocation,
        setSelectedLocation,
        weatherData: weather,
        loading
    } = useWeather();

    const locations = getLocationList();
    const { t } = useLanguage();

    const currentWeather = weather?.current;
    const dailyWeather = weather?.daily;
    const alerts = weather ? getWeatherAlerts(weather) : [];
    const currentInfo = currentWeather ? getWeatherInfo(currentWeather.weather_code) : null;

    return (
        <div className="weather-page page-wrapper">
            <div className="weather-page__header">
                <h2>🌦️ {t('weather_title')}</h2>
                <p>{t('weather_subtitle')}</p>
            </div>

            {/* Location Selector */}
            <div className="location-selector">
                <label htmlFor="location-select">📍 {t('location')}</label>
                <select
                    id="location-select"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                >
                    {locations.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                            {loc.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Alert Banners */}
            {alerts.map((alert, i) => (
                <div key={i} className={`alert-banner alert-banner--${alert.type}`}>
                    <span className="alert-banner__icon">{alert.icon}</span>
                    <span>{alert.message}</span>
                </div>
            ))}

            {/* Current Weather Card */}
            {loading ? (
                <div className="weather-current">
                    <div className="skeleton" style={{ width: 60, height: 60, margin: '0 auto 16px', borderRadius: '50%' }}>&nbsp;</div>
                    <div className="skeleton" style={{ width: 100, height: 40, margin: '0 auto 8px' }}>&nbsp;</div>
                    <div className="skeleton" style={{ width: 150, height: 20, margin: '0 auto' }}>&nbsp;</div>
                </div>
            ) : (
                currentWeather && (
                    <div className="weather-current">
                        <div className="weather-current__icon">{currentInfo?.emoji}</div>
                        <div className="weather-current__temp">
                            {Math.round(currentWeather.temperature_2m)}°C
                        </div>
                        <div className="weather-current__desc">{currentInfo?.desc}</div>
                        <div className="weather-current__location">
                            📍 {weather.locationName}
                        </div>
                        <div className="weather-current__details">
                            <div className="weather-current__detail">
                                <div className="weather-current__detail-label">{t('feels_like')}</div>
                                <div className="weather-current__detail-value">
                                    {Math.round(currentWeather.apparent_temperature)}°C
                                </div>
                            </div>
                            <div className="weather-current__detail">
                                <div className="weather-current__detail-label">{t('humidity')}</div>
                                <div className="weather-current__detail-value">
                                    {currentWeather.relative_humidity_2m}%
                                </div>
                            </div>
                            <div className="weather-current__detail">
                                <div className="weather-current__detail-label">{t('wind')}</div>
                                <div className="weather-current__detail-value">
                                    {Math.round(currentWeather.wind_speed_10m)} km/h
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}

            {/* 7-Day Forecast */}
            {dailyWeather && (
                <div className="weather-forecast">
                    <h3>📅 {t('seven_day')}</h3>
                    <div className="weather-forecast__grid hide-scrollbar">
                        {dailyWeather.time.map((date, index) => {
                            const dayInfo = getWeatherInfo(dailyWeather.weather_code[index]);
                            const rain = dailyWeather.precipitation_probability_max?.[index];
                            return (
                                <div key={date} className="weather-forecast__card">
                                    <div className="weather-forecast__card-day">
                                        {index === 0 ? t('today') : index === 1 ? t('tomorrow') : getDayName(date, index)}
                                    </div>
                                    <div className="weather-forecast__card-icon">{dayInfo.emoji}</div>
                                    <div className="weather-forecast__card-temps">
                                        <span className="weather-forecast__card-high">
                                            {Math.round(dailyWeather.temperature_2m_max[index])}°
                                        </span>
                                        <span className="weather-forecast__card-low">
                                            {Math.round(dailyWeather.temperature_2m_min[index])}°
                                        </span>
                                    </div>
                                    {rain !== undefined && (
                                        <div className="weather-forecast__card-rain">
                                            💧 {rain}%
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
