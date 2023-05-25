import React from "react";
import { Link } from "react-router-dom";

function Card({
  id,
  name,
  flag,
  continent,
  capital,
  subregion,
  area,
  population,
  activities,
}) {
  return (
    <div>
      <div>
        <Link to={`/detail/${id}`}>
          <button>i</button>
        </Link>
      </div>
      <div className="img-container">
        <img src={flag} alt={name} />
      </div>
      <div className="text-container">
        <h3>Name: {name}</h3>
        <p>Capital: {capital}</p>
        <p>Continent: {continent}</p>
        <p>Subregion: {subregion}</p>
        <p>Area: {area}</p>
        <p>Population: {population}</p>
        <p>Activities: {activities}</p>
      </div>
    </div>
  );
}

export default Card;
