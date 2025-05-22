import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "@pages/guest/Landing";
import Home from "@pages/auth/Home";
import FilmInfo from "@pages/auth/FilmInfo";
import "@styles/index.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Página pública */}
        <Route path="/" element={<Landing />} />

        {/* Páginas protegidas (logueado) */}
        <Route path="/home" element={<Home />} />
        <Route path="/movie/:id" element={<FilmInfo />} />
      </Routes>
    </Router>
  );
}
