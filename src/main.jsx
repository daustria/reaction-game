import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App, Overlay } from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Overlay />
    <App />
  </StrictMode>,
)
