import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function mount() {
  const rootEl = document.getElementById('root')
  if (!rootEl) return // nothing to mount into (prevents crash)
  const root = createRoot(rootEl)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', mount, { once: true })
} else {
  mount()
}
