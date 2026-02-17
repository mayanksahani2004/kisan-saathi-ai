import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from './utils/i18n';
import Dashboard from './pages/Dashboard';
import WeatherPage from './pages/WeatherPage';
import CropHealthPage from './pages/CropHealthPage';
import MarketPage from './pages/MarketPage';
import AssistantPage from './pages/AssistantPage';
import SettingsPage from './pages/SettingsPage';
import LibraryPage from './pages/LibraryPage';
import './App.css';
import { useSettings } from './utils/SettingsContext';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const { t } = useLanguage();
  const { isOffline } = useSettings();

  const pageTitles = {
    '/': 'Kisan Saathi',
    '/weather': t('weather'),
    '/crop-health': t('crop_health'),
    '/market': t('market_prices'),
    '/assistant': t('voice_assistant'),
    '/library': t('library'),
    '/settings': t('settings'),
  };

  return (
    <>
      {/* Top Navigation */}
      <nav className="top-nav">
        {!isHome ? (
          <button className="top-nav__back" onClick={() => navigate('/')}>
            ← {t('home')}
          </button>
        ) : (
          <div className="top-nav__brand">
            <span className="top-nav__logo">🌾</span>
            <div>
              <div className="top-nav__title">Kisan Saathi</div>
              <div className="top-nav__subtitle">Smart Agriculture AI</div>
            </div>
          </div>
        )}
        {!isHome && (
          <div className="top-nav__brand">
            <span className="top-nav__logo" style={{ fontSize: '1.3rem' }}>
              {location.pathname === '/weather' && '🌦️'}
              {location.pathname === '/crop-health' && '🔬'}
              {location.pathname === '/market' && '📊'}
              {location.pathname === '/assistant' && '🤖'}
              {location.pathname === '/library' && '📚'}
              {location.pathname === '/settings' && '⚙️'}
            </span>
            <div>
              <div className="top-nav__title">
                {pageTitles[location.pathname] || 'Kisan Saathi'}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Offline Notice Banner */}
      {isOffline && (
        <div className="offline-banner">
          <span>⚠️ {t('offline_notice')}</span>
        </div>
      )}

      {/* Main Content */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/crop-health" element={<CropHealthPage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <Link
          to="/"
          className={`bottom-nav__item ${location.pathname === '/' ? 'active' : ''}`}
        >
          <span className="bottom-nav__icon">🏠</span>
          {t('home')}
        </Link>
        <Link
          to="/weather"
          className={`bottom-nav__item ${location.pathname === '/weather' ? 'active' : ''}`}
        >
          <span className="bottom-nav__icon">🌦️</span>
          {t('weather')}
        </Link>
        <Link
          to="/crop-health"
          className={`bottom-nav__item ${location.pathname === '/crop-health' ? 'active' : ''}`}
        >
          <span className="bottom-nav__icon">🔬</span>
          {t('crops')}
        </Link>
        <Link
          to="/market"
          className={`bottom-nav__item ${location.pathname === '/market' ? 'active' : ''}`}
        >
          <span className="bottom-nav__icon">📊</span>
          {t('market')}
        </Link>
        <Link
          to="/assistant"
          className={`bottom-nav__item ${location.pathname === '/assistant' ? 'active' : ''}`}
        >
          <span className="bottom-nav__icon">🤖</span>
          {t('chat')}
        </Link>
        <Link
          to="/library"
          className={`bottom-nav__item ${location.pathname === '/library' ? 'active' : ''}`}
        >
          <span className="bottom-nav__icon">📚</span>
          {t('library')}
        </Link>
        <Link
          to="/settings"
          className={`bottom-nav__item ${location.pathname === '/settings' ? 'active' : ''}`}
        >
          <span className="bottom-nav__icon">⚙️</span>
          {t('settings')}
        </Link>
      </nav>
    </>
  );
}
