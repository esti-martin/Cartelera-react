import CardLg from "@components/commons/card/CardLg";

export default function FilmInfo() {
  return (
    <>
      <h2>Resultado de películas</h2>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        {/* 👇 Prueba con el ID de Fight Club (550) u otro */}
        <CardLg movieId={550} />
      </div>
    </>
  );
}
