import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WeatherProvider } from 'WeatherContext.tsx'
// import { BrowserRouter } from 'react-router-dom';

const root = document.getElementById('root')
const reactRoot = createRoot(root as HTMLElement)

reactRoot.render(
  <React.StrictMode>
    <WeatherProvider>

        <App />

    </WeatherProvider>
  </React.StrictMode>
)
