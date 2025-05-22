import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "@pages/guest/Landing";
import Home from "@pages/auth/Home";
import FilmInfo from "@pages/auth/FilmInfo";
import Search from "@pages/auth/Search";
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
        <Route path="/search" element={<Search />} /> {/* <-- nueva ruta */}
      </Routes>
    </Router>
  );
}
