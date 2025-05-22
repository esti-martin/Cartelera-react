import { useState, useEffect } from "react";
import "@components/commons/card/slider/slider.css";
import { useNavigate } from "react-router-dom";
import Button from "@components/commons/Button/Button";

function Slider() {
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(0);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate(); // 👈🏼 Hook de navegación

  useEffect(() => {
    if (!API_KEY) {
      console.error("API key no definida");
      return;
    }

    const url =
      "https://api.themoviedb.org/3/trending/movie/day?language=es-ES";

    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setMovies(data.results.slice(0, 3));
        }
      })
      .catch((e) => console.error("Error en fetch:", e));
  }, [API_KEY]);

  if (movies.length === 0) return <p>Cargando...</p>;

  const movie = movies[current];
  const imageUrl = `https://image.tmdb.org/t/p/original${
    movie.backdrop_path || movie.poster_path
  }`;

  return (
    <div className="slider-container">
      <div
        className="slider-background cursor-pointer"
        style={{ backgroundImage: `url(${imageUrl})` }}
        onClick={() => navigate(`/movie/${movie.id}`)}
      >
        <div className="slider-content">
          <h4 className="text-2xl font-bold bg-transparent">{movie.title}</h4>
          <p>
            <strong>Año:</strong> {new Date(movie.release_date).getFullYear()}
          </p>
          <p>
            <strong>Valoración:</strong> ⭐ {movie.vote_average.toFixed(1)} / 10
          </p>
          <p>{movie.overview}</p>
          <Button
            children="Ver Más"
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="bg-blue-500 hover:bg-blue-600 mt-12"
          />
        </div>

        <button
          className="nav-button left"
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((current - 1 + movies.length) % movies.length);
          }}
        >
          ◀
        </button>

        <button
          className="nav-button right"
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((current + 1) % movies.length);
          }}
        >
          ▶
        </button>

        <div className="dots">
          {movies.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === current ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrent(i);
              }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Slider;
