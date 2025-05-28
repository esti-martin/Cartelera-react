// Import necessary React hooks and components
import React, { useEffect, useState } from "react";

// Base URLs for TMDB image API
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; // Higher quality for backdrop
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original"; // For full backdrop
const PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w185"; // For actor profile pictures
const API_KEY = import.meta.env.VITE_API_KEY_SHORT;

// Type definitions
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  runtime: number;
  genres: Array<{ id: number; name: string }>;
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

// CardLg component that displays detailed movie information in Netflix style
function CardLg({ movieId }: CardLgProps) {
  // State management for movie data, trailer, cast, and error handling
  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  // Effect hook to fetch movie data when component mounts or movieId changes
  useEffect(() => {
    if (!movieId) return;

    const options: RequestInit = {
      method: "GET",
      headers: {
        accept: "application/json",
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
        setMovie(data);

        // Fetch movie trailer
        fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=es-ES`,
          options
        )
          .then((res) => res.json())
          .then((videoData: VideoResponse) => {
            const trailer = videoData.results.find(
              (v) => v.type === "Trailer" && v.site === "YouTube"
            );
            if (trailer) setTrailerKey(trailer.key);
          })
          .catch(() => {});

        // Fetch movie cast
        fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=es-ES`,
          options
        )
          .then((res) => res.json())
          .then((creditsData: CreditsResponse) => {
            setCast(creditsData.cast.slice(0, 8));
          })
          .catch(() => {});
      })
      .catch((err: Error) => {
        console.error(err);
        setError("No se pudo cargar la película.");
      });
  }, [movieId]);

  // Show error message if there's an error
  if (error)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );

  // Show loading message while data is being fetched
  if (!movie)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );

  // Format runtime
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Main component render - Netflix style
  return (
    <div className="w-full min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Hero Section */}
      <div className="relative h-screen">
        {/* Background Image with Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: movie.backdrop_path
              ? `url(${BACKDROP_BASE_URL}${movie.backdrop_path})`
              : `url(${IMAGE_BASE_URL}${movie.poster_path})`,
          }}
        >
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-2xl">
              {/* Movie Title */}
              <h1 className="text-5xl lg:text-7xl font-bold mb-4 leading-tight">
                {movie.title}
              </h1>

              {/* Movie Meta Info */}
              <div className="flex items-center space-x-4 mb-6 text-lg">
                <span className="bg-zinc-800 px-3 py-1 rounded text-sm font-semibold">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-300">
                  {new Date(movie.release_date).getFullYear()}
                </span>
                {movie.runtime && (
                  <span className="text-gray-300">
                    {formatRuntime(movie.runtime)}
                  </span>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-[var(--secondary-color)] px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Movie Overview */}
              <p className="text-lg lg:text-xl leading-relaxed mb-8 max-w-xl text-gray-200">
                {movie.overview}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {trailerKey && (
                  <button
                    onClick={() => setShowTrailer(!showTrailer)}
                    className="bg-white text-black px-8 py-3 rounded font-semibold text-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {showTrailer ? "Ocultar Tráiler" : "Ver Tráiler"}
                  </button>
                )}

                <button className="bg-gray-600/80 text-white px-8 py-3 rounded font-semibold text-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Mi Lista
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Overlay - Slides from right */}
      <div
        className={`fixed inset-0 z-50 bg-black transition-transform duration-700 ease-in-out transform ${
          showTrailer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowTrailer(false)}
          className="absolute top-6 right-6 z-60 text-white hover:text-gray-300 transition-colors"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Back Button */}
        <button
          onClick={() => setShowTrailer(false)}
          className="absolute top-6 left-6 z-60 text-white hover:text-gray-300 transition-colors flex items-center gap-2"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-lg font-medium">Volver</span>
        </button>

        {/* Trailer Content */}
        <div className="h-full flex flex-col items-center justify-center px-6">
          <div className="w-full max-w-6xl">
            <h2 className="text-4xl lg:text-5xl font-bold text-center mb-8 text-white">
              {movie?.title} - Tráiler
            </h2>

            {/* Video Container */}
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-2xl">
              {showTrailer && trailerKey && (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
                  title="Trailer"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                />
              )}
            </div>

            {/* Movie Info Below Video */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-4 text-lg text-gray-300">
                <span className="bg-gray-800/60 px-3 py-1 rounded">
                  ⭐ {movie?.vote_average.toFixed(1)}
                </span>
                <span>{new Date(movie?.release_date || "").getFullYear()}</span>
                {movie?.runtime && <span>{formatRuntime(movie.runtime)}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {cast.length > 0 && (
        <div className="bg-black py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8">Reparto</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {cast.map((actor) => (
                <div key={actor.id} className="text-center group">
                  <div className="relative overflow-hidden rounded-lg mb-3 aspect-[3/4]">
                    <img
                      src={
                        actor.profile_path
                          ? `${PROFILE_BASE_URL}${actor.profile_path}`
                          : "https://upload.wikimedia.org/wikipedia/commons/5/5a/No_image_available_500_x_500.svg"
                      }
                      alt={actor.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1 truncate">
                    {actor.name}
                  </h3>
                  <p className="text-center text-xs text-gray-400 truncate">
                    {actor.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Spacer */}
      <div className="h-20 bg-black"></div>
    </div>
  );
}

export default CardLg;
