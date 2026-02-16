import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from './utils/i18n';
import Dashboard from './pages/Dashboard';
import WeatherPage from './pages/WeatherPage';
import CropHealthPage from './pages/CropHealthPage';
import MarketPage from './pages/MarketPage';
import AssistantPage from './pages/AssistantPage';
import './App.css';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const { t } = useLanguage();

  const pageTitles = {
    '/': 'Kisan Saathi AI',
    '/weather': t('weather'),
    '/crop-health': t('crop_health'),
    '/market': t('market_prices'),
    '/assistant': t('voice_assistant'),
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
              <div className="top-nav__title">Kisan Saathi AI</div>
              <div className="top-nav__subtitle">Aapka Apna Kheti Assistant</div>
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
            </span>
            <div>
              <div className="top-nav__title">
                {pageTitles[location.pathname] || 'Kisan Saathi AI'}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/crop-health" element={<CropHealthPage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/assistant" element={<AssistantPage />} />
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
      </nav>
    </>
  );
}
