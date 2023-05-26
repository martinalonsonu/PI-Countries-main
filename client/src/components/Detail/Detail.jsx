import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState({});

  useEffect(() => {
    const detailCountry = async () => {
      const url = `http://localhost:3001/countries/${id}`;
      try {
        const { data } = await axios.get(url);
        setCountry(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    detailCountry();
  }, [id]);

  const backPage = () => {
    navigate(-1);
  };

  return (
    <div>
      <h1>Detail Country: {country.name}</h1>
      <div>
        <img src={country.flag} alt={`Bandera de ${country.name}`} />
      </div>
      <div>
        <p>Capital: {country.capital}</p>
        <p>Continent: {country.continent}</p>
        <p>Subregion: {country.subregion}</p>
        <p>Area: {country.area} m²</p>
        <p>Population: {country.population}</p>
        <button onClick={backPage}>Return</button>
      </div>
    </div>
  );
}

export default Detail;
