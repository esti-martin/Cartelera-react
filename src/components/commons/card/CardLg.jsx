import React, { useEffect, useState } from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342";
const PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w185";
const API_KEY = "d47b7a69abf720959fe4fefb4d956b2f"; // O usa import.meta.env.VITE_API_KEY si lo tienes configurado

function CardLg({ movieId }) {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        // Authorization: "Bearer " + API_KEY, // No es necesario para TMDB si usas api_key en url
      },
    };

    // Fetch película
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=es-ES`,
      options
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error cargando película");
        return res.json();
      })
      .then((data) => {
        setMovie(data);

        // Fetch tráiler
        fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=es-ES`,
          options
        )
          .then((res) => res.json())
          .then((videoData) => {
            const trailer = videoData.results.find(
              (v) => v.type === "Trailer" && v.site === "YouTube"
            );
            if (trailer) setTrailerKey(trailer.key);
          })
          .catch(() => {});

        // Fetch elenco
        fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=es-ES`,
          options
        )
          .then((res) => res.json())
          .then((creditsData) => {
            setCast(creditsData.cast.slice(0, 12));
          })
          .catch(() => {});
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudo cargar la película.");
      });
  }, [movieId]);

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!movie) return <p className="p-4">Cargando...</p>;

  return (
    <div className="max-w-[1200px] mx-auto px-4 bg-[var(--background-color)]">
      <div className="flex flex-col p-4 w-full justify-center space-y-4 text-[#d7e7ee]">
        <article className="flex flex-col md:flex-row gap-6 items-start bg-[#0f0f24] p-6 rounded-lg shadow-lg">
          <div className="md:w-1/3 w-full flex justify-center">
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-full max-w-[200px] rounded shadow-lg"
            />
          </div>

          <div className="md:w-2/3 w-full">
            <h2 className="text-3xl font-bold text-cyan-400">{movie.title}</h2>
            <p className="mt-2 text-lg">
              Fecha de lanzamiento: {movie.release_date}
            </p>
            <p className="text-yellow-400 mt-1 font-semibold">
              ⭐ {movie.vote_average} / 10
            </p>
            <p className="mt-3 text-sm">{movie.overview}</p>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Elenco principal</h3>
              <div className="flex flex-wrap gap-3">
                {cast.map((actor) => (
                  <div key={actor.id} className="w-[70px] text-center text-xs">
                    <img
                      src={
                        actor.profile_path
                          ? `${PROFILE_BASE_URL}${actor.profile_path}`
                          : "https://via.placeholder.com/70x105?text=No+Image"
                      }
                      alt={actor.name}
                      className="rounded"
                    />
                    <p>{actor.name}</p>
                    <p className="italic text-gray-400">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>

            {trailerKey && (
              <div className="mt-6">
                <iframe
                  className="w-full h-60 md:h-96 rounded"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="Trailer"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

export default CardLg;
