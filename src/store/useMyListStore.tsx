import { create } from "zustand";
import { persist } from "zustand/middleware";

// Type definition for movie in the list
export interface MovieListItem {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  runtime: number;
  genres: Array<{ id: number; name: string }>;
  addedAt: string; // When it was added to the list
}

interface MyListStore {
  movies: MovieListItem[];
  addMovie: (movie: Omit<MovieListItem, "addedAt">) => void;
  removeMovie: (movieId: number) => void;
  isInList: (movieId: number) => boolean;
  clearList: () => void;
}

export const useMyListStore = create<MyListStore>()(
  persist(
    (set, get) => ({
      movies: [],

      addMovie: (movie) => {
        const { movies } = get();
        const isAlreadyAdded = movies.some((m) => m.id === movie.id);

        if (!isAlreadyAdded) {
          const movieWithTimestamp: MovieListItem = {
            ...movie,
            addedAt: new Date().toISOString(),
          };

          set({
            movies: [movieWithTimestamp, ...movies], // Add to beginning
          });
        }
      },

      removeMovie: (movieId) => {
        set((state) => ({
          movies: state.movies.filter((movie) => movie.id !== movieId),
        }));
      },

      isInList: (movieId) => {
        const { movies } = get();
        return movies.some((movie) => movie.id === movieId);
      },

      clearList: () => {
        set({ movies: [] });
      },
    }),
    {
      name: "my-movie-list", // localStorage key
      partialize: (state) => ({ movies: state.movies }),
    }
  )
);
