// Import necessary React hooks and components
import React, { useEffect, useState } from "react";

// Base URLs for TMDB image API
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342"; // For movie posters
const PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w185"; // For actor profile pictures
const API_KEY = import.meta.env.VITE_API_KEY_SHORT;

// Type definitions
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

interface Video {
  key: string;
  type: string;
  site: string;
}

interface VideoResponse {
  results: Video[];
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface CreditsResponse {
  cast: CastMember[];
}

interface CardLgProps {
  movieId: number | string;
}

// CardLg component that displays detailed movie information
function CardLg({ movieId }: CardLgProps) {
  // State management for movie data, trailer, cast, and error handling
  const [movie, setMovie] = useState<Movie | null>(null); // Stores the movie details
  const [trailerKey, setTrailerKey] = useState<string | null>(null); // Stores the YouTube trailer key
  const [cast, setCast] = useState<CastMember[]>([]); // Stores the movie cast information
  const [error, setError] = useState<string | null>(null); // Stores any error messages

  // Effect hook to fetch movie data when component mounts or movieId changes
  useEffect(() => {
    // Return early if no movieId is provided
    if (!movieId) return;

    // Configure fetch options
    const options: RequestInit = {
      method: "GET",
      headers: {
        accept: "application/json",
        // Authorization header commented out as we're using api_key in URL
      },
    };

    // Fetch movie details
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=es-ES`,
      options
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error cargando película");
        return res.json();
      })
      .then((data: Movie) => {
        setMovie(data); // Store movie data in state

        // Fetch movie trailer
        fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=es-ES`,
          options
        )
          .then((res) => res.json())
          .then((videoData: VideoResponse) => {
            // Find the first YouTube trailer in the results
            const trailer = videoData.results.find(
              (v) => v.type === "Trailer" && v.site === "YouTube"
            );
            if (trailer) setTrailerKey(trailer.key);
          })
          .catch(() => {}); // Silently handle trailer fetch errors

        // Fetch movie cast
        fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=es-ES`,
          options
        )
          .then((res) => res.json())
          .then((creditsData: CreditsResponse) => {
            // Store first 12 cast members
            setCast(creditsData.cast.slice(0, 12));
          })
          .catch(() => {}); // Silently handle cast fetch errors
      })
      .catch((err: Error) => {
        console.error(err);
        setError("No se pudo cargar la película.");
      });
  }, [movieId]); // Re-run effect when movieId changes

  // Show error message if there's an error
  if (error) return <p className="text-red-500 p-4">{error}</p>;
  // Show loading message while data is being fetched
  if (!movie) return <p className="p-4">Cargando...</p>;

  // Main component render
  return (
    <div className="max-w-[1200px] mx-auto px-4 bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="flex flex-col p-4 w-full justify-center space-y-4">
        {/* Movie details container */}
        <article className="flex flex-col md:flex-row gap-6 items-start border-2 border-[var(--tertiary-color)] dark:border-gray-700 rounded-lg shadow-md p-6 bg-[var(--background-color)] dark:bg-slate-800">
          {/* Movie poster section */}
          <div className="md:w-1/3 w-full flex justify-center">
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-full max-w-[200px] rounded shadow-lg"
            />
          </div>

          {/* Movie information section */}
          <div className="md:w-2/3 w-full">
            {/* Movie title */}
            <h2 className="text-3xl font-bold text-cyan-500 dark:text-cyan-400">
              {movie.title}
            </h2>
            {/* Release date */}
            <p className="mt-2 text-lg dark:text-white text-black">
              Fecha de lanzamiento: {movie.release_date}
            </p>
            {/* Rating */}
            <p className="text-yellow-500 dark:text-yellow-400 mt-1 font-semibold">
              ⭐ {movie.vote_average.toFixed(1)} / 10
            </p>
            {/* Movie overview/description */}
            <p className="mt-3 text-sm dark:text-white text-black">
              {movie.overview}
            </p>

            {/* Cast section */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2 text-cyan-500 dark:text-cyan-400">
                Elenco principal
              </h3>
              <div className="flex flex-wrap gap-6">
                {/* Map through cast members */}
                {cast.length > 0 ? (
                  cast.map((actor) => (
                    <div
                      key={actor.id}
                      className="w-[70px] text-center text-sm"
                    >
                      {/* Actor profile image with fallback */}
                      <img
                        src={
                          actor.profile_path
                            ? `${PROFILE_BASE_URL}${actor.profile_path}`
                            : "https://upload.wikimedia.org/wikipedia/commons/5/5a/No_image_available_500_x_500.svg"
                        }
                        alt={actor.name}
                        className="rounded"
                      />
                      {/* Actor name and character */}
                      <p className="dark:text-white text-black">{actor.name}</p>
                      <p className="italic text-gray-500 dark:text-gray-400">
                        {actor.character}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    No hay actores disponibles
                  </div>
                )}
              </div>
            </div>

            {/* Trailer section - only shown if trailer is available */}
            {trailerKey ? (
              <div className="mt-6">
                <iframe
                  className="w-full h-60 md:h-96 rounded"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="Trailer"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                No hay trailer disponible
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

export default CardLg;
