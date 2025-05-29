// filepath: /cartelera-react/cartelera-react/src/components/commons/card/Gender.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useVisitedPage from "../../../hooks/useVisitedPage";
import EyeIcon from "../icons/EyeIcon";
import Heart from "../icons/heart";

const API_KEY = import.meta.env.VITE_API_KEY_SHORT;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const genresToShow = ["Acción", "Comedia", "Drama"];

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

interface GenreData {
  [key: string]: Movie[];
}

export default function Gender() {
  const [genreData, setGenreData] = useState<GenreData>({});
  const [loading, setLoading] = useState<boolean>(true);

  // Estado para favoritos y para saber si ya cargaron
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);

  const navigate = useNavigate();
  const { visited } = useVisitedPage();

  // Cargar favoritos desde localStorage al montar
  useEffect(() => {
    const stored = localStorage.getItem("favoriteMovies");
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    }
    setFavoritesLoaded(true);
  }, []);

  // Guardar favoritos en localStorage cuando cambian
  useEffect(() => {
    if (favoritesLoaded) {
      localStorage.setItem("favoriteMovies", JSON.stringify(favorites));
    }
  }, [favorites, favoritesLoaded]);

  // Alternar favorito (añadir o quitar)
  const toggleFavorite = (movieId: number) => {
    setFavorites((prev) => {
      if (prev.includes(movieId)) {
        return prev.filter((id) => id !== movieId);
      } else {
        return [...prev, movieId];
      }
    });
  };

  // Cargar películas por género
  useEffect(() => {
    const fetchGenresAndMovies = async () => {
      try {
        const genreRes = await axios.get(
          `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`
        );
        const genreList = genreRes.data.genres;
        const selectedGenres = genreList.filter((g: { name: string }) =>
          genresToShow.includes(g.name)
        );

        const data: GenreData = {};
        for (let genre of selectedGenres) {
          const moviesRes = await axios.get(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}&sort_by=popularity.desc`
          );
          data[genre.name] = moviesRes.data.results.slice(0, 5);
        }

        setGenreData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setLoading(false);
      }
    };

    fetchGenresAndMovies();
  }, []);

  if (loading || !favoritesLoaded) {
    return (
      <div className="text-center mt-10 text-[var(--text-color)]">
        Cargando películas...
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-5 flex-col">
        {Object.entries(genreData).map(([genreName, movies]) => (
          <div key={genreName} className="mb-20 text-center gap-5">
            <h2
              id={genreName}
              className="text-4xl mb-5 font-bold text-cyan-500 dark:text-cyan-300 capitalize text-center"
            >
              {genreName}
            </h2>

            <div className="flex flex-wrap justify-center gap-5">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="relative w-[180px] bg-slate-200 dark:bg-indigo-900 rounded-lg shadow-lg transform transition-transform duration-300 cursor-pointer hover:scale-105"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  {/* Icono del ojo si ha sido visitada */}
                  {visited.includes(movie.id) && (
                    <div className="absolute top-2 right-2 z-10">
                      <EyeIcon id={movie.id} onClick={() => {}} />
                    </div>
                  )}

                  {/* Icono de corazón para favoritos */}
                  <div className="absolute top-2 left-2 z-10">
                    <Heart
                      filled={favorites.includes(movie.id)}
                      onClick={(e) => {
                        e.stopPropagation(); // Evita navegación al hacer clic
                        toggleFavorite(movie.id);
                      }}
                    />
                  </div>

                  {/* Imagen de la película */}
                  <img
                    src={
                      movie.poster_path
                        ? `${IMAGE_BASE}${movie.poster_path}`
                        : "https://via.placeholder.com/180x270?text=No+Image"
                    }
                    alt={movie.title}
                    className="w-full h-[270px] object-cover rounded-t-lg bg-gray-300 dark:bg-black"
                  />

                  {/* Título */}
                  <div className="p-2 text-center bg-cyan-500 dark:bg-cyan-600 rounded-b-lg h-[50px] flex items-center justify-center">
                    <p className="text-sm text-white font-bold line-clamp-2 text-center">
                      {movie.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
