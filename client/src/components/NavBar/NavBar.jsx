import React from "react";
import SearchBar from "../SearchBar/SeachBar";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import mundo from "../../images/mundo.png";

function NavBar() {
  const { pathname } = useLocation();
  return (
    <div className={style.container}>
      <div className={style.logo}>
        <Link to="/home">
          <img src={mundo} alt="imagenMundo" />
        </Link>
      </div>
      <div>{pathname === "/home" && <SearchBar />}</div>
      <div className={style.buttonPage}>
        <Link to="/home">
          <button>Home</button>
        </Link>
        <Link to="/createactivity">
          <button>Create Activity</button>
        </Link>
        <Link to="/activities">
          <button>Activity List</button>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
