import React, { useState } from "react";
import io from "socket.io-client";

export const socket = io.connect("http://localhost:5000");

export default function App() {
  const [thought, setThought] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  socket.on("error", err => {
    setError(err);
  });

  socket.on("loading", () => {
    setLoading(true);
  });

  socket.on("thought", thought => {
    setThought(thought);
    setLoading(false);
  });

  function handleClick() {
    socket.emit("get_thought");
  }

  return (
    <div>
      {thought.hasOwnProperty("currentThought") ? (
        <>
          <p>{thought.currentThought}</p>
          <p>{thought.name}</p>
          <p>{thought.currentBeer}</p>
          <img src={thought.daydream} alt="daydream" />
        </>
      ) : null}
      {loading ? <p>Loading...</p> : null}
      <button onClick={handleClick} disabled={loading}>
        Read a Mind
      </button>
    </div>
  );
}
