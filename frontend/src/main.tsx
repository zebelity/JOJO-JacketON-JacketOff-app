import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WeatherProvider } from 'contexts/WeatherContext.tsx'
import { LocationProvider } from 'contexts/LocationContext.tsx'

const root = document.getElementById('root')
const reactRoot = createRoot(root as HTMLElement)

const AllProviders = ({ children }) => {
  return (
    <WeatherProvider>
      <LocationProvider>
        {children}
      </LocationProvider>
    </WeatherProvider>
  );
};

reactRoot.render(
  <React.StrictMode>
    <AllProviders>
        <App />
    </AllProviders>
  </React.StrictMode>
)
