import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import PersonajesTest from './componente/PersonajesTest'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PersonajesTest />
  </StrictMode>,
)
