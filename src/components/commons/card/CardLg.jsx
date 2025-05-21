import React, { useEffect, useState } from "react";
import "../../../styles/index.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342";
const PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w185";
const API_KEY = import.meta.env.VITE_API_KEY;

function CardLg() {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]); // Estado para actores
  const [error, setError] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + API_KEY,
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        const firstMovie = data.results?.[0];
        if (firstMovie) {
          setMovie(firstMovie);

          // Fetch del tráiler
          fetch(
            `https://api.themoviedb.org/3/movie/${firstMovie.id}/videos?language=es-ES`,
            options
          )
            .then((res) => res.json())
            .then((videoData) => {
              const trailer = videoData.results.find(
                (v) => v.type === "Trailer" && v.site === "YouTube"
              );
              if (trailer) setTrailerKey(trailer.key);
            })
            .catch((err) => {
              console.error("Error al obtener el tráiler", err);
            });

          // Fetch del elenco
          fetch(
            `https://api.themoviedb.org/3/movie/${firstMovie.id}/credits?language=es-ES`,
            options
          )
            .then((res) => res.json())
            .then((creditsData) => {
              setCast(creditsData.cast.slice(0, 100));
            })
            .catch((err) => {
              console.error("Error al obtener el elenco", err);
            });
        } else {
          setError("No se encontró ninguna película.");
        }
      })
      .catch((err) => {
        console.error("Error al cargar película", err);
        setError("Ocurrió un error al cargar la película.");
      });
  }, []);

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!movie) return <p className="p-4">Cargando...</p>;

  return (
    <div className="max-w-[1200px] mx-auto px-4 bg-[var(--background-color)]">
      <div className="flex flex-col p-4 w-full space-y-4">
        <article className="flex flex-col md:flex-row gap-6 items-start">
          <div className="md:w-1/3 w-full">
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-full max-w-[150px] md:max-w-full rounded shadow-lg"
            />
          </div>

          <div className="md:w-2/3 w-full">
            <h2 className="text-2xl font-extrabold mb-1 text-cyan-400">
              {movie.title}
            </h2>
            <p className="text-lg text-sky-300">
              Fecha de lanzamiento: {movie.release_date}
            </p>
            <p className="text-sm text-yellow-400 mb-2 font-semibold">
              ⭐ {movie.vote_average} / 10
            </p>
            <p className="text-sm text-gray-300 drop-shadow-sm">
              {movie.overview}
            </p>

            {/* Sección de actores */}
            {cast.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2 text-cyan-300">
                  Actores
                </h3>
                <div className="flex gap-4 overflow-x-auto">
                  {cast.map((actor) => (
                    <div
                      key={actor.id}
                      className="flex flex-col items-center min-w-[100px]"
                    >
                      {actor.profile_path ? (
                        <img
                          src={`${PROFILE_BASE_URL}${actor.profile_path}`}
                          alt={actor.name}
                          className="w-24 h-32 rounded-md object-cover mb-1 shadow-md"
                        />
                      ) : (
                        <div className="w-24 h-32 bg-gray-700 rounded-md flex items-center justify-center text-gray-400 mb-1">
                          Sin foto
                        </div>
                      )}
                      <p className="text-sm text-gray-300 text-center">
                        {actor.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {trailerKey && (
          <div className="aspect-video w-full rounded-md overflow-hidden shadow-lg border border-cyan-600">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Tráiler de la película"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardLg;
