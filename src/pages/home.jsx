import React from "react";
import Navbar from "../components/Home/Navbar";
import Hero from "../components/Home/Hero";
import "./home.css";
import Desc from "../components/Home/Desc";

export function Home() {
  return (
    <>
      <div className="container-home">
        <Navbar />
        <Hero />
        <Desc />
      </div>
    </>
  );
}

export default Home;
