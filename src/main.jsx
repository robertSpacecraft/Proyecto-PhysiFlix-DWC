import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/* 
** Test para probar conexión con la API **

import { testConnect } from "./test/wikiApi.test.js";
testConnect()
  .then(() => console.log("Test de conexión de la API finalizado"))
  .catch(err => console.error("Test de conexión de la API fallido: ", err));
*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
