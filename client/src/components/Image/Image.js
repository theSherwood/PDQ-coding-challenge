import React, { useState, useEffect } from "react";
import "./Image.css";

const Image = ({ src, alt, width }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [src]);

  const handleImageLoad = () => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  return (
    <div className="image-container">
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        style={{ width: width + "px" }}
      />
      {loading ? (
        <div className="image-overlay">
          <p>loading...</p>
        </div>
      ) : null}
    </div>
  );
};

export default Image;
