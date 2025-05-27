import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/commons/Button/Button";

// Puedes ajustar la interfaz según el contenido exacto de tu objeto movie
export interface MovieMd {
  id: number;
  title: string;
  poster_path?: string;
  vote_average?: number;
  overview?: string;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185";

interface CardMdProps {
  movie: MovieMd;
}

function CardMd({ movie }: CardMdProps): JSX.Element | null {
  const navigate = useNavigate();

  if (!movie) return null;

  const handleClick = (): void => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <article className="flex items-start gap-4 border-2 border-[var(--tertiary-color)] dark:border-gray-700 rounded-lg shadow-md p-4 w-full max-w-3xl mx-auto bg-[var(--background-color)] dark:bg-slate-800 text-[var(--text-color)]">
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
      <div className="flex flex-col w-full">
        <h2 className="text-xl font-semibold text-cyan-500 dark:text-cyan-400">
          {movie.title}
        </h2>
        <p className="text-yellow-500 dark:text-yellow-400 mt-1 font-medium">
          ⭐ {movie.vote_average?.toFixed(1) || "N/A"} / 10
        </p>
        <p className="text-sm mt-2 line-clamp-2">
          {movie.overview || "Sin descripción disponible."}
        </p>

        {/* Botón igual al del Slider */}
        <Button onClick={handleClick} className="mt-4 self-start">
          Ver Más
        </Button>
      </div>
    </article>
  );
}

export default CardMd;
