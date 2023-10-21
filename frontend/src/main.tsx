import React from 'react'
import { createRoot } from 'react-dom/client'
import AllProviders from './AllProviders.tsx'
import App from './App.tsx'
import './index.css'

const root = document.getElementById('root')
const reactRoot = createRoot(root as HTMLElement)

reactRoot.render(
  <React.StrictMode>
    <AllProviders>
        <App />
    </AllProviders>
  </React.StrictMode>
)
