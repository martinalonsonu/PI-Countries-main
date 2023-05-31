import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

function Card({ id, name, flag, continent }) {
  return (
    <div className={style.card}>
      <div className={style.buttonDetail}>
        <Link to={`/detail/${id}`}>
          <button>Detail</button>
        </Link>
      </div>
      <div className={style.imgContainer}>
        <img src={flag} alt={name} className={style.image} />
      </div>
      <div className={style.textContainer}>
        <h3>Name: {name}</h3>
        <p>Continent: {continent}</p>
      </div>
    </div>
  );
}

export default Card;
