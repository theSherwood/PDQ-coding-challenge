import React from "react";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/home/Home";

import "./App.css";

export default function App() {
  return (
    <div
      className="App"
      style={{
        minHeight: "100vh",
        position: "relative",
        paddingBottom: "100px"
      }}
    >
      <Header />
      <Home />
      <Footer />
    </div>
  );
}
