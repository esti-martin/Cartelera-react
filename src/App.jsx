import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@pages/auth/Home";
import FilmInfo from "@pages/auth/FilmInfo";
import "@styles/index.css";
import NavbarGuest from "@components/navbar/guest/NavbarGuest";

export default function App() {
  return (
    <Router>
      <NavbarGuest />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<FilmInfo />} />
      </Routes>
    </Router>
  );
}
