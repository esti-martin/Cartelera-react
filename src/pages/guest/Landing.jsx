import NavbarGuest from "@components/navbar/guest/NavbarGuest";

export default function Landing() {
  return (
    <>
      <NavbarGuest />
      <div
        className="h-screen relative min-h-[80vh] bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center px-4 text-white"
        style={{ backgroundImage: "url('/src/assets/Best-Movies-List.webp')" }}
      >
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        {/* Contenido */}
        <div className="relative z-10 text-center bg-transparent">
          <h1 className="text-4xl font-bold bg-transparent">
            Descubre el cine que lo <br />
            <span className="text-primary-color bg-transparent">
              cambia todo
            </span>
          </h1>
          <p className="text-2xl mt-4 max-w-xl mx-auto bg-transparent">
            Encuentra la película que más te guste y descubre <br />
            <span className="flex justify-center bg-transparent text-center">
              la historia detrás de ella.
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
