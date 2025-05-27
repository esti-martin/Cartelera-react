import { JSX, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardMd, { MovieMd } from "@components/commons/card/CardMd"; // MovieMd type imported from CardMd

const API_KEY: string | undefined = import.meta.env.VITE_API_KEY;

// Local Movie interface removed, using imported one now.

interface ApiResponse {
  results: MovieMd[];
}

function Search(): JSX.Element {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<MovieMd[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const query = searchParams.get("q");

  useEffect(() => {
    if (!API_KEY) { 
      console.error("API key no definida en Search.tsx");
      setLoading(false);
      return;
    }
    if (!query) {
      setResults([]); // Limpiar resultados si no hay query
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&language=es-ES`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta");
        return res.json();
      })
      .then((data: ApiResponse) => {
        setResults(data.results || []);
        setLoading(false);
      })
      .catch((err: Error) => {
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

      <div className="flex flex-col gap-6">
        {results.map((movie) => (
          <CardMd key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default Search;
