import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "@pages/guest/Landing";
import Home from "@pages/auth/Home";
import FilmInfo from "@pages/auth/FilmInfo";
import Search from "@pages/auth/Search";
import Footer from "@components/footer/footer";
import "@styles/index.css";
import NavbarAuth from "@components/navbar/auth/NavbarAuth/NavbarAuth";

export default function App() {
  return (
    <Router>
      <NavbarAuth />
      <Routes>
        {/* Página pública */}
        <Route path="/" element={<Landing />} />
        {/* Páginas protegidas (logueado) */}
        <Route path="/home" element={<Home />} />
        <Route path="/movie/:id" element={<FilmInfo />} />
        <Route path="/search" element={<Search />} /> {/* <-- nueva ruta */}
      </Routes>
      <Footer />
    </Router>
  );
}
