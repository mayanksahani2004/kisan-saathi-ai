import { useState, useMemo } from 'react';
import { crops, regions, marketPrices } from '../data/marketData';
import { useLanguage } from '../utils/i18n';

export default function MarketPage() {
    const [selectedCrop, setSelectedCrop] = useState('tomato');
    const [selectedRegion, setSelectedRegion] = useState('maharashtra');
    const { t } = useLanguage();

    const prices = useMemo(() => {
        const data = marketPrices[selectedCrop]?.[selectedRegion] || [];
        return [...data].sort((a, b) => b.price - a.price);
    }, [selectedCrop, selectedRegion]);

    const bestPrice = prices.length > 0 ? prices[0] : null;
    const cropInfo = crops.find(c => c.id === selectedCrop);

    return (
        <div className="market-page page-wrapper">
            <div className="market-page__header">
                <h2>📊 {t('market_title')}</h2>
                <p>{t('market_subtitle')}</p>
            </div>

            {/* Government Source Badge */}
            <div className="govt-source-badge">
                <div className="govt-source-badge__icon">🏛️</div>
                <div className="govt-source-badge__text">
                    <strong>Agmarknet</strong> — {t('source_label')}
                </div>
            </div>

            {/* Filters */}
            <div className="market-filters">
                <div className="market-filters__group">
                    <label className="market-filters__label" htmlFor="crop-select">
                        🌾 {t('select_crop')}
                    </label>
                    <select
                        id="crop-select"
                        className="market-filters__select"
                        value={selectedCrop}
                        onChange={(e) => setSelectedCrop(e.target.value)}
                    >
                        {crops.map((crop) => (
                            <option key={crop.id} value={crop.id}>
                                {crop.emoji} {crop.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="market-filters__group">
                    <label className="market-filters__label" htmlFor="region-select">
                        📍 {t('select_region')}
                    </label>
                    <select
                        id="region-select"
                        className="market-filters__select"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                        {regions.map((region) => (
                            <option key={region.id} value={region.id}>
                                {region.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Best Price Alert */}
            {bestPrice && (
                <div className="alert-banner alert-banner--success">
                    <span className="alert-banner__icon">🏆</span>
                    <span>
                        {t('best_price')}: {cropInfo?.emoji} {cropInfo?.name} — <strong>₹{bestPrice.price}{t('per_kg')}</strong> @ {bestPrice.market}
                    </span>
                </div>
            )}

            {/* Price Cards */}
            <div className="market-cards">
                {prices.map((item, index) => {
                    const isBest = index === 0;
                    return (
                        <div
                            key={item.market}
                            className={`market-card ${isBest ? 'market-card--best' : ''}`}
                            id={`market-card-${index}`}
                        >
                            <div className="market-card__info">
                                <div className="market-card__name">{item.market}</div>
                                <div className="market-card__region">
                                    {regions.find(r => r.id === selectedRegion)?.name}
                                    {item.grade && <span className="market-card__grade"> · {item.grade}</span>}
                                </div>
                                {item.arrival && (
                                    <div className="market-card__arrival">📦 {item.arrival}</div>
                                )}
                            </div>
                            <div className="market-card__price-section">
                                <div className="market-card__price">₹{item.price}{t('per_kg')}</div>
                                {isBest && (
                                    <span className="market-card__badge">⭐ {t('best_price')}</span>
                                )}
                                <span
                                    className={`market-card__change ${item.change >= 0 ? 'market-card__change--up' : 'market-card__change--down'
                                        }`}
                                >
                                    {item.change >= 0 ? '▲' : '▼'} {Math.abs(item.change)}%
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {prices.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                    <span style={{ fontSize: '3rem', display: 'block', marginBottom: 12 }}>📭</span>
                    <p>{t('no_data')}</p>
                    <p style={{ fontSize: '0.85rem' }}>{t('try_different')}</p>
                </div>
            )}

            {/* Government Disclaimer */}
            <div className="govt-disclaimer">
                <p>💡 {t('price_disclaimer')}</p>
                <p className="govt-disclaimer__links">
                    🔗 <a href="https://agmarknet.gov.in" target="_blank" rel="noopener noreferrer">agmarknet.gov.in</a>
                    {' · '}
                    <a href="https://enam.gov.in" target="_blank" rel="noopener noreferrer">enam.gov.in</a>
                </p>
            </div>
        </div>
    );
}
