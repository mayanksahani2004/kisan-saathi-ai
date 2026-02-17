import { useState } from 'react';
import { useLanguage } from '../utils/i18n';
import { useSettings } from '../utils/SettingsContext';

export default function SettingsPage() {
    const { t, lang, setLang, LANGUAGES } = useLanguage();
    const { isOffline, setIsOffline, lastUpdated, clearCache } = useSettings();
    const [cacheMessage, setCacheMessage] = useState('');

    const handleClearCache = () => {
        clearCache();
        setCacheMessage(t('cache_cleared'));
        setTimeout(() => setCacheMessage(''), 3000);
    };

    return (
        <div className="settings-page page-wrapper">
            <div className="settings-section">
                <h3>🌐 {t('language')}</h3>
                <div className="settings-card">
                    <div className="lang-grid">
                        {LANGUAGES.map((l) => (
                            <button
                                key={l.id}
                                className={`lang-option ${lang === l.id ? 'active' : ''}`}
                                onClick={() => setLang(l.id)}
                            >
                                <span className="lang-flag">{l.flag}</span>
                                <div className="lang-info">
                                    <span className="lang-native">{l.native}</span>
                                    <span className="lang-name">{l.name}</span>
                                </div>
                                {lang === l.id && <span className="check-mark">✓</span>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h3>📡 {t('service_status')}</h3>
                <div className="settings-card">
                    <div className="status-toggle-group">
                        <button
                            className={`status-btn ${!isOffline ? 'active-online' : ''}`}
                            onClick={() => setIsOffline(false)}
                        >
                            <span className="status-icon">🟢</span>
                            <div className="status-text">
                                <strong>{t('online_mode')}</strong>
                                <span>{t('online_desc')}</span>
                            </div>
                        </button>
                        <button
                            className={`status-btn ${isOffline ? 'active-offline' : ''}`}
                            onClick={() => setIsOffline(true)}
                        >
                            <span className="status-icon">🟡</span>
                            <div className="status-text">
                                <strong>{t('offline_mode')}</strong>
                                <span>{t('offline_desc')}</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h3>🧹 {t('storage_usage')}</h3>
                <div className="settings-card">
                    <div className="cache-info">
                        <div className="last-sync">
                            <span>{t('data_updated')}:</span>
                            <strong>{lastUpdated}</strong>
                        </div>
                        <button className="clear-cache-btn" onClick={handleClearCache}>
                            {t('clear_cache')}
                        </button>
                        {cacheMessage && <p className="cache-success">{cacheMessage}</p>}
                    </div>
                </div>
            </div>

            <div className="settings-footer">
                <p>Kisan Saathi v1.2.0-Alpha</p>
                <p>© 2026 Smart Agriculture AI</p>
            </div>

            <style>{`
                .settings-page {
                    padding: 20px;
                    padding-bottom: 100px;
                    animation: fadeIn 0.4s ease-out;
                }
                .settings-section {
                    margin-bottom: 30px;
                }
                .settings-section h3 {
                    margin-bottom: 15px;
                    color: var(--green-800);
                    font-size: 1.1rem;
                }
                .settings-card {
                    background: white;
                    border-radius: 16px;
                    padding: 15px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                }
                .lang-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 10px;
                }
                .lang-option {
                    display: flex;
                    align-items: center;
                    padding: 12px;
                    border: 2px solid #f0f0f0;
                    border-radius: 12px;
                    background: none;
                    text-align: left;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .lang-option.active {
                    border-color: var(--green-500);
                    background: var(--green-50);
                }
                .lang-flag {
                    font-size: 1.5rem;
                    margin-right: 15px;
                }
                .lang-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                .lang-native {
                    font-weight: bold;
                    font-size: 1rem;
                    color: #333;
                }
                .lang-name {
                    font-size: 0.8rem;
                    color: #666;
                }
                .check-mark {
                    color: var(--green-600);
                    font-weight: bold;
                }
                .status-toggle-group {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .status-btn {
                    display: flex;
                    align-items: center;
                    padding: 15px;
                    border-radius: 12px;
                    border: 2px solid #f0f0f0;
                    background: #fcfcfc;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-align: left;
                }
                .status-icon {
                    font-size: 1.2rem;
                    margin-right: 15px;
                }
                .status-text {
                    display: flex;
                    flex-direction: column;
                }
                .status-text strong {
                    font-size: 1rem;
                    color: #333;
                }
                .status-text span {
                    font-size: 0.8rem;
                    color: #777;
                }
                .active-online {
                    border-color: #4caf50 !important;
                    background: #e8f5e9 !important;
                }
                .active-offline {
                    border-color: #ff9800 !important;
                    background: #fff3e0 !important;
                }
                .cache-info {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                .last-sync {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.9rem;
                    color: #666;
                }
                .clear-cache-btn {
                    padding: 12px;
                    background: #f5f5f5;
                    border: none;
                    border-radius: 8px;
                    color: #d32f2f;
                    font-weight: bold;
                    cursor: pointer;
                }
                .cache-success {
                    color: #2e7d32;
                    font-size: 0.85rem;
                    text-align: center;
                    margin: 0;
                }
                .settings-footer {
                    text-align: center;
                    margin-top: 40px;
                    opacity: 0.5;
                    font-size: 0.8rem;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
