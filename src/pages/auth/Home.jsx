import React from "react";
import Gender from "@components/commons/card/Gender";
import Slider from "@components/commons/card/slider/slider";

export default function Home() {
  return (
    <div
      style={{
        background: "#050522",
        minHeight: "100vh",
        color: "#d7e7ee",
      }}
    >
      <Slider />
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "24px",
          color: "#d7e7ee",
          fontWeight: "bold",
        }}
      >
     
      </h1>

      <Gender />
    </div>
  );
}
