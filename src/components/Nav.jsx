import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <div className="nav-bar flex">
        <p className="title">CookBook Pro</p>
        <div className="nav-cluster">
          <Link to="/">
            <span>Home</span>
          </Link>
          <Link to="/about">
            <span>About</span>
          </Link>
          <Link to="/recipes">
            <span>Recipes</span>
          </Link>
          <Link to="/tips">
            <span>Chef Tips</span>
          </Link>
          <Link to="/favorites">
            <span>Favorites</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Nav;
