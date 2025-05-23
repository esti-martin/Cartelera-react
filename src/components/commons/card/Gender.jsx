import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY_SHORT;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const genresToShow = ["Acción", "Comedia", "Drama"];

export default function Gender() {
  const [genreData, setGenreData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenresAndMovies = async () => {
      try {
        const genreRes = await axios.get(
          `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`
        );
        const genreList = genreRes.data.genres;
        const selectedGenres = genreList.filter((g) =>
          genresToShow.includes(g.name)
        );

        const data = {};
        for (let genre of selectedGenres) {
          const moviesRes = await axios.get(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}&sort_by=popularity.desc`
          );
          data[genre.name] = moviesRes.data.results.slice(0, 5);
        }

        setGenreData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setLoading(false);
      }
    };

    fetchGenresAndMovies();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-10 text-white">Cargando películas...</div>
    );

  return (
    <>
      <div className="flex flex-wrap justify-center gap-5 flex-col">
        {Object.entries(genreData).map(([genreName, movies]) => (
          <div key={genreName} className="mb-20 text-center gap-5">
            <h2
              id={genreName}
              className=" text-4xl mb-5 font-bold text-cyan-300 capitalize text-center"
            >
              {genreName}
            </h2>

            <div className="flex flex-wrap justify-center gap-5 ">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="w-[180px] bg-indigo-900 rounded-lg shadow-lg transform transition-transform duration-300 cursor-pointer hover:scale-105"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  <img
                    src={
                      movie.poster_path
                        ? `${IMAGE_BASE}${movie.poster_path}`
                        : "https://via.placeholder.com/180x270?text=No+Image"
                    }
                    alt={movie.title}
                    className="w-full h-[270px] object-cover rounded-t-lg bg-black"
                  />
                  <div className="p-2 text-center bg-cyan-600 rounded-b-lg h-[50px] flex items-center justify-center">
                    <p className="text-sm text-blue-100 font-bold line-clamp-2 text-center">
                      {movie.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
