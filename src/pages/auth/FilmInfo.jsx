import CardLg from "@components/commons/card/CardLg";

export default function FilmInfo() {
  return (
    <>
      <div className="max-w-[1200px] mx-auto px-4 bg-[var(--background-color)]">
        <h2 className="text-2xl font-extrabold mb-1 text-cyan-400">
          Resultado de películas
        </h2>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          {/* 👇 Prueba con el ID de Fight Club (550) u otro */}
          <CardLg movieId={550} />
        </div>
      </div>
    </>
  );
}
