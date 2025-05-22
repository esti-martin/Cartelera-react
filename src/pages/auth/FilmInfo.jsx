import React from "react";
import { useParams } from "react-router-dom";
import CardLg from "@components/commons/card/CardLg";

export default function FilmInfo() {
  const { id } = useParams();

  return (
    <>
      <div
        className="max-w-[1200px] mx-auto px-4 bg-[var(--background-color)] min-h-screen flex items-center justify-center py-10"
        style={{ color: "#d7e7ee" }}
      >
        <CardLg movieId={id} />
      </div>
    </>
  );
}
