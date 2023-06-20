import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import mundo from "../../images/mundo.png";

function Landing() {
    return (
        <div className={style.container}>
            <div className={style.welcome}>
                <img src={mundo} alt="imagenMundo" />
                <p>Welcome to</p>
                <h1>WorldApp</h1>
                <Link to="/home">
                    <button>START!</button>
                </Link>
            </div>
        </div>
    );
}

export default Landing;
