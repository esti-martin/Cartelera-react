import React, { useState } from "react";
import { useMyListStore, MovieListItem } from "@store/useMyListStore";

// Base URLs for TMDB image API
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

interface MyListProps {
  onMovieSelect?: (movieId: number) => void;
}

function MyList({ onMovieSelect }: MyListProps) {
  const { movies, removeMovie, clearList } = useMyListStore();
  const [selectedMovie, setSelectedMovie] = useState<MovieListItem | null>(
    null
  );

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleMovieClick = (movie: MovieListItem) => {
    setSelectedMovie(movie);
    if (onMovieSelect) {
      onMovieSelect(movie.id);
    }
  };

  const handleRemoveMovie = (movieId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    removeMovie(movieId);
    if (selectedMovie?.id === movieId) {
      setSelectedMovie(null);
    }
  };

  if (movies.length === 0) {
    return (
      <div className="min-h-screen dark:bg-[var(--background-color)] bg-white text-black">
        {/* Header */}
        <div className="m-10 dark:bg-[var(--background-color)] bg-white">
          <div className="container mx-auto dark:bg-transparent bg-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 dark:bg-transparent bg-white dark:text-white text-black">
              Mi Lista
            </h1>
            <p className="text-xl dark:text-gray-300 text-black">
              Tus películas guardadas aparecerán aquí
            </p>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20 bg-[var(--background-color)]">
          <div className="text-gray-500 mb-6">
            <svg
              className="w-24 h-24 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-400 mb-2">
            Tu lista está vacía
          </h2>
          <p className="text-gray-500 text-center max-w-md">
            Explora películas y agrega las que te interesen a tu lista personal
            haciendo clic en "Mi Lista"
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-black bg-white text-white">
      {/* Header */}
      <div className="bg-gradient-to-b dark:from-gray-900 dark:to-black from-white to-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4 dark:bg-transparent bg-white dark:text-white text-black">
                Mi Lista
              </h1>
              <p className="text-xl dark:text-gray-300 text-black">
                {movies.length} película{movies.length !== 1 ? "s" : ""}{" "}
                guardada{movies.length !== 1 ? "s" : ""}
              </p>
            </div>

            {movies.length > 0 && (
              <button
                onClick={clearList}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors"
              >
                Limpiar Lista
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group"
              onClick={() => handleMovieClick(movie)}
            >
              {/* Movie Poster */}
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  src={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}${movie.poster_path}`
                      : "https://upload.wikimedia.org/wikipedia/commons/5/5a/No_image_available_500_x_500.svg"
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Remove Button */}
                <button
                  onClick={(e) => handleRemoveMovie(movie.id, e)}
                  className="absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  title="Eliminar de Mi Lista"
                >
                  <svg
                    className="w-4 h-4"
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

                {/* Rating Badge */}
                <div className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-1 rounded text-sm font-semibold">
                  ⭐ {movie.vote_average.toFixed(1)}
                </div>
              </div>

              {/* Movie Info */}
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 line-clamp-2 leading-tight">
                  {movie.title}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                  {movie.runtime && <span>{formatRuntime(movie.runtime)}</span>}
                </div>

                {/* Genres */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {movie.genres.slice(0, 5).map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Added Date */}
                <p className="text-xs text-gray-500">
                  Agregada el {formatDate(movie.addedAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Movie Modal/Detail View */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Movie Detail Content */}
            <div className="relative">
              {/* Backdrop */}
              {selectedMovie.backdrop_path && (
                <div
                  className="h-64 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url(${BACKDROP_BASE_URL}${selectedMovie.backdrop_path})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <h2 className="text-3xl font-bold mb-4">
                  {selectedMovie.title}
                </h2>

                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-yellow-600 text-black px-3 py-1 rounded font-semibold">
                    ⭐ {selectedMovie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-gray-300">
                    {new Date(selectedMovie.release_date).getFullYear()}
                  </span>
                  {selectedMovie.runtime && (
                    <span className="text-gray-300">
                      {formatRuntime(selectedMovie.runtime)}
                    </span>
                  )}
                </div>

                {/* Genres */}
                {selectedMovie.genres && selectedMovie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedMovie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-gray-300 leading-relaxed mb-4">
                  {selectedMovie.overview}
                </p>

                <p className="text-sm text-gray-500">
                  Agregada a Mi Lista el {formatDate(selectedMovie.addedAt)}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={(e) => handleRemoveMovie(selectedMovie.id, e)}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors"
                  >
                    Eliminar de Mi Lista
                  </button>
                  <button
                    onClick={() => setSelectedMovie(null)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyList;
