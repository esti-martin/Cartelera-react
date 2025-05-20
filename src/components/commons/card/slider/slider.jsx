import { useState, useEffect } from "react";

function Slider() {
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(0);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      console.error("API key no definida");
      return;
    }

    const url = "https://api.themoviedb.org/3/trending/movie/day?language=es-ES";

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + API_KEY,
      },
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error("Error al conectar con TMDB");
        return res.json();
      })
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setMovies(data.results.slice(0, 3));
        }
      })
      .catch((e) => console.error("Error en fetch:", e));
  }, [API_KEY]);

  if (movies.length === 0) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Trending</h2>

      <div style={{ textAlign: "center" }}>
        <button onClick={() => setCurrent((current + 2) % 3)}>◀</button>
        <div>
          <h3>{movies[current].title}</h3>
          <img
            src={`https://image.tmdb.org/t/p/w500${movies[current].poster_path}`}
            alt={movies[current].title}
            style={{ width: "200px", borderRadius: "10px" }}
          />
        </div>
        <button onClick={() => setCurrent((current + 1) % 3)}>▶</button>
      </div>

      <div>
        {movies.map((_, i) => (
          <span
            key={i}
            style={{
              margin: "0 5px",
              cursor: "pointer",
              color: current === i ? "red" : "gray",
            }}
            onClick={() => setCurrent(i)}
          >
            ●
          </span>
        ))}
      </div>
    </div>
  );
}

export default Slider;
