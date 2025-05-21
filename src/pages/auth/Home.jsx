import React from "react";
import Gender from "@components/commons/Gender";

export default function Home() {
  return (
    <div
      style={{
        background: "#050522",
        minHeight: "100vh",
        padding: "20px",
        color: "#d7e7ee",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "24px",
          color: "#d7e7ee",
          fontWeight: "bold",
        }}
      >
        GÉNEROS
      </h1>
      <Gender />
    </div>
  );
}
