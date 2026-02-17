import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './utils/i18n'
import { WeatherProvider } from './utils/WeatherContext'
import { SettingsProvider } from './utils/SettingsContext'
import { LibraryProvider } from './utils/LibraryContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <SettingsProvider>
          <WeatherProvider>
            <LibraryProvider>
              <App />
            </LibraryProvider>
          </WeatherProvider>
        </SettingsProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
