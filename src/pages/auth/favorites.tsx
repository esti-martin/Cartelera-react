import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md"; // ícono de eliminar

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

export default function Favoritos() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("favoriteMoviesData");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const removeFavorite = (id: number) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteMoviesData", JSON.stringify(updatedFavorites));
  };

  if (favorites.length === 0) {
    return <p className="text-center text-white mt-10">No tienes favoritos aún.</p>;
  }

  return (
    <div className="p-4 text-center text-white">
      <h1 className="text-3xl mb-6 font-bold">Tus Favoritos</h1>
      <div className="flex flex-wrap justify-center gap-5">
        {favorites.map((movie) => (
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
