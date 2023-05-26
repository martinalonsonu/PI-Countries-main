import React from "react";
import { Link } from "react-router-dom";

function Card({ id, name, flag, continent }) {
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
        <p>Continent: {continent}</p>
      </div>
    </div>
  );
}

export default Card;
