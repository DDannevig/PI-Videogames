//import "./LandingPage.css"
import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGenres } from "../Redux/actions";
import "./styles/LandingPage.css";

const LandingPage = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getGenres());
  }, [dispatch]);
  
  return (
    <div className="landing">
      <NavLink to="/home">
        <h1 className="title" alt="to home">
          Henry Games
        </h1>
      </NavLink>
    </div>
  );
};

export default LandingPage;
