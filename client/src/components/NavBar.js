import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar.js";
import Create from "./Create.js";
import AdvancedSearch from "./AdvancedSearch.js";
import "./styles/NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <h4 className="navbaritem navbartitle">Henry Games</h4>
      <NavLink className="navbaritem" to="/home">
        Home
      </NavLink>
      <NavLink className="navbaritem" to="/list">
        Lista
      </NavLink>
      <Create />
      <AdvancedSearch />
      <SearchBar />
    </div>
  );
};

export default NavBar;
