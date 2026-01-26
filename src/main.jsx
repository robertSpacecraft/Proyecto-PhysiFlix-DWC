import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';




/** 
* Test para probar conexión con la API

* import { testConnect } from "./test/wikiApi.test.js";
* testConnect()
  .then(() => console.log("Test de conexión de la API finalizado"))
  .catch(err => console.error("Test de conexión de la API fallido: ", err));
*/

/**
 * Test para probar la búsqueda filtrada de hitos

 * import { testSearchMilestones } from "./test/wikiService.test.js";
 * testSearchMilestones()
  .then(() => console.log("Milestones test finished"))
  .catch((e) => console.error("Milestones test error:", e));
 */


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
