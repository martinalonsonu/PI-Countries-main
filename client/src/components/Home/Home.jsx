import React from "react";
import Card from "../Card/Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getActivity,
  filterCountries,
  sortCountriesName,
  sortCountriesPopulation,
  filterActivities,
  currentPage,
} from "../../redux/actions";
import style from "./Home.module.css";
import Pagination from "../Pagination/Pagination";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const { countries, page, activities } = useSelector((state) => state);

  //Paginación
  const numberCards = 10;
  const index = page * numberCards - numberCards;
  const numberPages = Math.ceil(countries.length / numberCards);
  const countriesSlice = countries.slice(index, index + numberCards);

  const continents = ["Asia", "Africa", "Americas", "Europe", "Oceania"];

  //Despacho las countries
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivity());
  }, [dispatch]);

  //Filtros
  const handleFilterContinent = (event) => {
    dispatch(filterCountries(event.target.value));
    dispatch(currentPage(1));
  };

  const handleFilterActivity = (event) => {
    dispatch(filterActivities(event.target.value));
    dispatch(currentPage(1));
  };

  //Ordenamientos
  const handleOrderName = (event) => {
    dispatch(sortCountriesName(event.target.value));
    dispatch(currentPage(1));
  };

  const handleOrderPopulation = (event) => {
    dispatch(sortCountriesPopulation(event.target.value));
    dispatch(currentPage(1));
  };

  const handleRemove = () => {
    dispatch(getCountries());
    dispatch(getActivity());
    dispatch(currentPage(1));
  };

  return (
    <div className={style.container}>
      <div className={style.filters}>
        <select onChange={handleFilterContinent}>
          <option value="filter" disabled="disabled" selected>
            Filter by continent
          </option>
          {continents.map((continent, index) => (
            <option key={index} value={continent}>
              {continent}
            </option>
          ))}
        </select>
        <select onChange={handleFilterActivity}>
          <option value="filter" disabled="disabled" selected>
            Filter by activity
          </option>
          {activities.map((activity, index) => (
            <option key={index} value={activity.name}>
              {activity.name}
            </option>
          ))}
        </select>
        <select onChange={handleOrderName}>
          <option value="orderName" disabled="disabled" selected>
            Order by name
          </option>
          <option value="Alphabetical">A-Z</option>
          <option value="Reverse-Alphabetical">Z-A</option>
        </select>
        <select onChange={handleOrderPopulation}>
          <option value="orderPopulation" disabled="disabled" selected>
            Order by population
          </option>
          <option value="Highest">Highest to lowest population</option>
          <option value="Lower">Lower to higher population</option>
        </select>
        <button onClick={handleRemove}>Remove Filters</button>
      </div>
      <div className={style.countries}>
        {countriesSlice.map(({ id, name, flag, continent }) => (
          <div key={id}>
            <Link to={`/detail/${id}`}>
              <Card id={id} name={name} flag={flag} continent={continent} />
            </Link>
          </div>
        ))}
      </div>

      <div className={style.containerPagination}>
        <Pagination numberPages={numberPages} />
      </div>
    </div>
  );
}

export default Home;
