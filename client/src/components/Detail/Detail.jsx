import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesById } from "../../redux/actions";
import style from "./Detail.module.css";

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

  console.log(country_detail);
  return (
    <div className={style.principal}>
      <div className={style.detailContainer}>
        <img
          src={country_detail.flag}
          alt={`Bandera de ${country_detail.name}`}
        />
        <div className={style.detailContent}>
          <h1>Country: {country_detail.name}</h1>
          <div>
            <p>Capital: {country_detail.capital}</p>
            <p>Continent: {country_detail.continent}</p>
            <p>Subregion: {country_detail.subregion}</p>
            <p>Area: {country_detail.area} m²</p>
            <p>Population: {country_detail.population}</p>
            {country_detail.activities?.length > 0 && (
              <p>
                Activities:{" "}
                {country_detail.activities?.map((activity, index) => (
                  <span key={activity.id}>
                    {" "}
                    {activity.name}
                    {index !== country_detail.activities.length - 1 && ","}{" "}
                  </span>
                ))}
              </p>
            )}

            <button onClick={backPage}>Return</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
