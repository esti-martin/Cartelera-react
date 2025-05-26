import React from "react";
import Gender from "@components/commons/card/Gender";
import Footer from "@components/footer/footer";
import Slider from "@components/commons/card/slider/slider";
import NavbarAuth from "@components/navbar/auth/NavbarAuth/NavbarAuth";

export default function Home() {
  return (
    <>
      <NavbarAuth />
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
          GÉNEROS
        </h1>
        <Gender />
        <Footer />
      </div>
    </>
  );
}
