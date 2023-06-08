import React from "react";
import {
  getCountries,
  getActivity,
  filterCountries,
  sortCountriesName,
  sortCountriesPopulation,
  filterActivities,
  currentPage,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from "./Filters.module.css";

function Filters() {
  const dispatch = useDispatch();
  const { activities } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getActivity());
  }, [dispatch]);

  const continents = ["Asia", "Africa", "Americas", "Europe", "Oceania"];

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
    dispatch(filterCountries(""));
    dispatch(filterActivities(""));
  };

  return (
    <div className={style.filters}>
      <select onChange={handleFilterContinent} defaultValue="">
        <option value="" disabled="disabled" selected>
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
  );
}

export default Filters;
