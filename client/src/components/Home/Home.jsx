import React from "react";
import Card from "../Card/Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  filterCountries,
  sortCountriesName,
  sortCountriesPopulation,
  currentPage,
} from "../../redux/actions";
import style from "./Home.module.css";
import Pagination from "../Pagination/Pagination";

function Home() {
  const dispatch = useDispatch();
  const { countries, page } = useSelector((state) => state);

  //Paginación
  const index = page - 1;
  const pagSize = 10;
  const numPages = Math.ceil(countries.length / pagSize);
  const countriesSlice = countries.slice(index, index + pagSize);

  const continents = ["All", "Asia", "Africa", "Americas", "Europe", "Oceania"];

  //Despacho las countries
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handleFilter = (event) => {
    dispatch(filterCountries(event.target.value));
    dispatch(currentPage(1));
  };

  const handleOrderName = (event) => {
    dispatch(sortCountriesName(event.target.value));
    dispatch(currentPage(1));
  };

  const handleOrderPopulation = (event) => {
    dispatch(sortCountriesPopulation(event.target.value));
    dispatch(currentPage(1));
  };

  return (
    <div className={style.container}>
      <div className={style.filters}>
        <select onChange={handleFilter}>
          <option value="filter" disabled="disabled" selected>
            Filter by continent
          </option>
          {continents.map((continent) => (
            <option value={continent}>{continent}</option>
          ))}
        </select>
        <select onChange={handleOrderName}>
          <option value="orderName" disabled="disabled" selected>
            Order by name
          </option>
          <option value="Alfabetico">A-Z</option>
          <option value="Inverso">Z-A</option>
        </select>
        <select onChange={handleOrderPopulation}>
          <option value="orderPopulation" disabled="disabled" selected>
            Order by population
          </option>
          <option value="MenorMayor">Descending population</option>
          <option value="MayorMenor">Ascending population</option>
        </select>
      </div>
      <div className={style.countries}>
        {countriesSlice.map(({ id, name, flag, continent }) => (
          <div key={id}>
            <Card id={id} name={name} flag={flag} continent={continent} />
          </div>
        ))}
      </div>

      <div className={style.containerPagination}>
        <Pagination numPages={numPages} />
      </div>
    </div>
  );
}

export default Home;
