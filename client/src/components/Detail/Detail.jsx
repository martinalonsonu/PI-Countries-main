import React, { useEffect } from "react";
import Loading from "../Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesById } from "../../toolkit/countries";
import { loadingStatus } from "../../toolkit/others";

import style from "./Detail.module.css";

function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { country_detail } = useSelector((state) => state.countries);
    const { loading } = useSelector((state) => state.others);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadingStatus(true));
        dispatch(getCountriesById(id));
        setTimeout(() => dispatch(loadingStatus(false)), 1000);
    }, [dispatch, id]);

    const backPage = () => {
        navigate(-1);
    };

    return loading ? (
        <Loading />
    ) : (
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
                                {country_detail.activities?.map(
                                    (activity, index) => (
                                        <span key={activity.id}>
                                            {" "}
                                            {activity.name}
                                            {index !==
                                                country_detail.activities
                                                    .length -
                                                    1 && ","}{" "}
                                        </span>
                                    )
                                )}
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
