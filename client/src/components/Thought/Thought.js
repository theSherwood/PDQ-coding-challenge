import React from "react";
import Image from "../Image/Image";
import "./Thought.css";

const Thought = ({
  thought: { name, currentBeer, currentThought, daydream }
}) => {
  return (
    <>
      <p>Name: {name}</p>
      <Image
        src={"./photos/company_" + name + ".png"}
        alt="thinker"
        width="200"
      />
      {currentBeer ? <p>Beer: {currentBeer}</p> : null}
      <p>Thought: {currentThought}</p>
      <span>Daydream:</span>
      <Image src={daydream} alt="daydream" />
    </>
  );
};

export default Thought;
