import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardMd from "@components/commons/card/CardMd"; // Ajusta el path si es necesario

const API_KEY = import.meta.env.VITE_API_KEY;

function Search() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = searchParams.get("q");

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&language=es-ES`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al buscar:", err);
        setLoading(false);
      });
  }, [query]);

  return (
    <section className="px-4 py-6 text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Resultados para: <span className="text-primary-color">{query}</span>
      </h1>

      {loading && <p className="text-center">Buscando...</p>}

      {!loading && results.length === 0 && (
        <p className="text-center">No se encontraron resultados.</p>
      )}

      <div className="flex flex-col gap-4">
        {results.map((movie) => (
          <CardMd key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default Search;
