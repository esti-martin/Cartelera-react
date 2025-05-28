import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CardLg from "@components/commons/card/CardLg";

export default function FilmInfo() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  return (
    <>
      <div
        className="w-full bg-[var(--background-color)] min-h-screen flex items-center justify-center"
        style={{ color: "#d7e7ee" }}
      >
        <CardLg movieId={id!} />
      </div>
    </>
  );
}
