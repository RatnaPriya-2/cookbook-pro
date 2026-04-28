import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <div className="nav-bar flex">
        <p className="title">CookBook Pro</p>
        <div className="nav-cluster">
          <NavLink to="/">
            <span>Home</span>
          </NavLink>
          <NavLink to="/about">
            <span>About</span>
          </NavLink>
          <NavLink to="/recipes">
            <span>Recipes</span>
          </NavLink>
          <NavLink to="/tips">
            <span>Chef Tips</span>
          </NavLink>
          <NavLink to="/favorites">
            <span>Favorites</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Nav;
