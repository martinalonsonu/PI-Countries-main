import React, { useState } from "react";
import Card from "../Card/Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  filterCountries,
  sortCountriesName,
  sortCountriesPopulation,
} from "../../redux/actions";
import style from "./Home.module.css";

function Home() {
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state);

  //Paginación
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [clicked, setClicked] = useState(1);
  const pagSize = 10;
  const numPages = Math.ceil(countries.length / pagSize);
  const countriesSlice = countries.slice(index, index + pagSize);

  const continents = ["All", "Asia", "Africa", "Americas", "Europe", "Oceania"];
  let numberButtons = [];
  for (let i = 1; i <= numPages; i++) {
    numberButtons.push(i);
  }

  //Despacho las countries
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const buttonNext = () => {
    if (index + pagSize < countries.length) {
      setIndex(index + pagSize);
      setPage(Number(page) + 1);
      setClicked(Number(page) + 1);
    }
  };

  const buttonPrevious = () => {
    if (index > 0) {
      setIndex(index - pagSize);
      setPage(Number(page) - 1);
      setClicked(Number(page) - 1);
    }
  };

  const handlePage = (event) => {
    const { value } = event.target;
    setIndex(value * pagSize - pagSize);
    setPage(value);
    setClicked(Number(value));
  };

  const handleFilter = (event) => {
    dispatch(filterCountries(event.target.value));
    setIndex(0);
    setPage(1);
    setClicked(1);
  };

  const handleOrderName = (event) => {
    dispatch(sortCountriesName(event.target.value));
    setIndex(0);
    setPage(1);
    setClicked(1);
  };

  const handleOrderPopulation = (event) => {
    dispatch(sortCountriesPopulation(event.target.value));
    setIndex(0);
    setPage(1);
    setClicked(1);
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

      <div className={style.pagination}>
        <button onClick={buttonPrevious}>Anterior</button>
        {numberButtons.map((number) => (
          <button
            className={clicked === number ? style.buttonNumber : ""}
            key={number}
            value={number}
            onClick={handlePage}
          >
            {number}
          </button>
        ))}
        <button onClick={buttonNext}>Siguiente</button>
      </div>
    </div>
  );
}

export default Home;
