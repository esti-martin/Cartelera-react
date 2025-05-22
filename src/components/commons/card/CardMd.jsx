import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/commons/Button/Button";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185";

function CardMd({ movie }) {
  const navigate = useNavigate();

  if (!movie) return null;

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <article className="flex items-start gap-4 border-2 border-white rounded-lg shadow-md p-4 w-full max-w-3xl mx-auto">
      {/* Movie poster */}
      <img
        src={
          movie.poster_path
            ? `${IMAGE_BASE_URL}${movie.poster_path}`
            : "https://via.placeholder.com/92x138?text=No+Image"
        }
        alt={movie.title}
        className="w-[92px] h-auto rounded-md object-cover"
      />

      {/* Movie info */}
      <div className="flex flex-col text-slate-100 w-full">
        <h2 className="text-xl font-semibold text-cyan-400">{movie.title}</h2>
        <p className="text-yellow-400 mt-1 font-medium">
          ⭐ {movie.vote_average?.toFixed(1) || "N/A"} / 10
        </p>
        <p className="text-sm mt-2 line-clamp-4">
          {movie.overview || "Sin descripción disponible."}
        </p>

        {/* Botón igual al del Slider */}
        <Button
          children="Ver Más"
          onClick={handleClick}
          className="mt-4 self-start"
        />
      </div>
    </article>
  );
}

export default CardMd;
