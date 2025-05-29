import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const API_KEY = import.meta.env.VITE_API_KEY_SHORT;
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

export default function Favoritos() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("favoriteMovies");
    if (stored) {
      const ids: number[] = JSON.parse(stored);
      setFavoriteIds(ids);

      // Cargar información completa de cada película
      Promise.all(
        ids.map((id) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-ES`
          ).then((res) => res.json())
        )
      ).then((movies: Movie[]) => {
        setFavoriteMovies(movies);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const removeFavorite = (id: number) => {
    const updatedIds = favoriteIds.filter((movieId) => movieId !== id);
    setFavoriteIds(updatedIds);
    setFavoriteMovies((prev) => prev.filter((movie) => movie.id !== id));
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedIds));
  };

  if (loading) {
    return <p className="text-center text-white mt-10">Cargando favoritos...</p>;
  }

  if (favoriteMovies.length === 0) {
    return <p className="text-center text-white mt-10">No tienes favoritos aún.</p>;
  }

  return (
    <div className="p-4 text-center text-white">
      <h1 className="text-3xl mb-6 font-bold">Tus Favoritos</h1>
      <div className="flex flex-wrap justify-center gap-5">
        {favoriteMovies.map((movie) => (
          <div
            key={movie.id}
            className="relative w-[180px] bg-slate-200 dark:bg-indigo-900 rounded-lg shadow-lg"
          >
            <img
              src={
                movie.poster_path
                  ? `${IMAGE_BASE}${movie.poster_path}`
                  : "https://via.placeholder.com/180x270?text=No+Image"
              }
              alt={movie.title}
              className="w-full h-[270px] object-cover rounded-t-lg cursor-pointer"
              onClick={() => navigate(`/movie/${movie.id}`)}
            />
            <div
              className="p-2 text-center bg-cyan-500 dark:bg-cyan-600 rounded-b-lg h-[50px] flex items-center justify-center cursor-pointer"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <p className="text-sm text-white font-bold">{movie.title}</p>
            </div>
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={() => removeFavorite(movie.id)}
              title="Eliminar de favoritos"
            >
              <MdDelete size={24} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
