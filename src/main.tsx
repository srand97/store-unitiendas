import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//IMPORTADOS
import './index.css'
import App from './App.tsx'
import Alerts from './services/alerts/Alerts.tsx';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Alerts />
  </StrictMode>
);
