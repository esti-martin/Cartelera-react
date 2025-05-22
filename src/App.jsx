import {  Routes, Route, useNavigate } from "react-router-dom";
import Landing from "@pages/guest/Landing";
import Home from "@pages/auth/Home";
import FilmInfo from "@pages/auth/FilmInfo";
import { useAuth0 } from '@auth0/auth0-react';
import NavbarGuest from "./components/navbar/guest/NavbarGuest.jsx";
import NavbarAuth from "./components/navbar/auth/NavbarAuth/NavbarAuth.jsx";
import { useEffect } from "react";
import ProtectedRoute from "./components/Auth0/ProtectedRoute.jsx";
import "@styles/index.css";


  export default function App() {
    const { isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
      if (isAuthenticated) {
        navigate("/home");
      }
    }, [isAuthenticated, navigate]);

  if (isLoading) return null;

    return (
      <>
        {/* Navbar siempre visible, cambia según autenticación */}
        {isAuthenticated ? <NavbarAuth /> : <NavbarGuest />}

          <Routes>
            {/* Página pública */}
            <Route path="/" element={<Landing />} />

            {/* Páginas protegidas (logueado) */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <ProtectedRoute>
                  <FilmInfo />
                </ProtectedRoute>
              }
            />
          </Routes>
        </>
    );
  }
