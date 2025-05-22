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
      <div style={{ textAlign: "center", marginTop: "50px", color: "#d7e7ee" }}>
        Cargando películas...
      </div>
    );

  return (
    <>
      {Object.entries(genreData).map(([genreName, movies]) => (
        <div
          key={genreName}
          style={{ marginBottom: "40px", textAlign: "center" }}
        >
          <h2 id={genreName} style={{ fontSize: "24px", marginBottom: "20px" }}>
            {genreName}
          </h2>
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                style={{
                  width: "180px",
                  background: "#150578",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                  transition: "transform 0.3s",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/movie/${movie.id}`)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={
                    movie.poster_path
                      ? `${IMAGE_BASE}${movie.poster_path}`
                      : "https://via.placeholder.com/180x270?text=No+Image"
                  }
                  alt={movie.title}
                  style={{
                    width: "100%",
                    height: "270px",
                    objectFit: "cover",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    backgroundColor: "#000",
                  }}
                />
                <div
                  style={{
                    padding: "10px",
                    textAlign: "center",
                    backgroundColor: "#150578",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#d7e7ee",
                      margin: 0,
                      whiteSpace: "normal",
                      overflow: "hidden",
                      lineHeight: "1.2",
                      maxHeight: "2.4em",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      textDecoration: "none",
                      textShadow: "none",
                      background: "transparent",
                    }}
                  >
                    {movie.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
