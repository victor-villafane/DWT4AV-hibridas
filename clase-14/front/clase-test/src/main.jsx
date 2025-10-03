import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import ComidasTest from './componente/ComidasTest'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ComidasTest />
  </StrictMode>,
)
