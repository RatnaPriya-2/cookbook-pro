import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="main-body">
        <div className="content">
          <p className="content-text">
            Master the kitchen with ease.
            <br />
            <span>
              Discover recipes helping you to find the easiest way to cook
            </span>
          </p>

          <Link to="/recipes" className="btn-primary">
            Browse Recipes
          </Link>
        </div>
      </div>

      {/* Mirror bar — same height & style as navbar, purely decorative */}
      <div className="hero-footer-bar" />
    </>
  );
};

export default Hero;
