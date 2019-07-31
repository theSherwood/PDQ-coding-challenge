import React, { useState } from "react";
import Particles from "react-particles-js";
import io from "socket.io-client";
import Thought from "./components/Thought/Thought";
import "./App.css";

export const socket = io.connect("http://localhost:5000");

const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

export default function App() {
  const [thought, setThought] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  socket.on("error", err => {
    setError(err);
  });

  socket.on("loading", () => {
    setLoading(true);
    setError("");
  });

  socket.on("thought", thought => {
    setThought(thought);
    setLoading(false);
    setError("");
  });

  function handleClick() {
    socket.emit("get_thought");
  }

  return (
    <div className="app">
      <Particles className="particles" params={particlesOptions} />
      <main>
        <div className="container">
          {error ? (
            <p>the mind-reading api is unresponsive</p>
          ) : (
            <div className="scrolling-container">
              {thought.hasOwnProperty("currentThought") ? (
                <Thought thought={thought} />
              ) : null}
            </div>
          )}
          {loading ? (
            <div className="overlay">
              <p>loading...</p>
            </div>
          ) : null}
        </div>
        <button onClick={handleClick} disabled={loading}>
          <h2>read a mind</h2>
        </button>
      </main>
    </div>
  );
}
