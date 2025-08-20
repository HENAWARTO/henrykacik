import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function mount() {
  const el = document.getElementById('root')
  if (!el) return
  createRoot(el).render(
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
