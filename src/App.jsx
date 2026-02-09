import { Routes, Route, Navigate } from "react-router-dom";
import Explore from "./pages/Explore";
// main.jsx
import "./css/app.css";
import Welcome from "./pages/Welcome";


function App() {


  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/404" element={<h1>404 - Not Found</h1>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  )
}

export default App
