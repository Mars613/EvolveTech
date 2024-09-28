import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-description">
          EvolveTech Medical Institute is a state-of-the-art facility dedicated to providing comprehensive healthcare services with compassion and
          expertise. Our team of skilled professionals is committed to delivering personalized care tailored to each patient's needs. At
          EvolveTech, we prioritize your well-being, ensuring a harmonious journey towards optimal health and wellness.
        </p>
      </div>
      <div className="banner">
      </div>
    </div>
  );
};

export default Hero;