import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";

function Landing() {
  return (
    <div className={style.container}>
      <Link to="/home">
        <button>INICIAR</button>
      </Link>
    </div>
  );
}

export default Landing;
