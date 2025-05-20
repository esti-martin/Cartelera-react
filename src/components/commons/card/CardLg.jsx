import React, { useEffect, useState } from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342";
const API_KEY = import.meta.env.VITE_API_KEY;

function CardLg() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "bearer " + API_KEY,
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        const firstMovie = data.results?.[0];
        if (firstMovie) setMovie(firstMovie);
        else setError("No se encontró ninguna película.");
      })
      .catch((err) => {
        console.error("Error al cargar película", err);
        setError("Ocurrió un error al cargar la película.");
      });
  }, []);

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!movie) return <p className="p-4">Cargando...</p>;

  return (
    <div className="p-4 bg-white shadow-md rounded-md flex gap-4 items-center max-w-md mx-auto">
      <img
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        className="w-24 rounded"
      />
      <div>
        <h2 className="text-lg font-bold">{movie.title}</h2>
        <p className="text-sm text-gray-600">⭐ {movie.vote_average}</p>
      </div>
    </div>
  );
}

export default CardLg;
