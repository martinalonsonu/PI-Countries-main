import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesById } from "../../redux/actions";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { country_detail } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountriesById(id));
  }, [dispatch, id]);

  const backPage = () => {
    navigate(-1);
  };

  return (
    <div>
      <h1>Detail Country: {country_detail.name}</h1>
      <div>
        <img
          src={country_detail.flag}
          alt={`Bandera de ${country_detail.name}`}
        />
      </div>
      <div>
        <p>Capital: {country_detail.capital}</p>
        <p>Continent: {country_detail.continent}</p>
        <p>Subregion: {country_detail.subregion}</p>
        <p>Area: {country_detail.area} m²</p>
        <p>Population: {country_detail.population}</p>
        <button onClick={backPage}>Return</button>
      </div>
    </div>
  );
}

export default Detail;
