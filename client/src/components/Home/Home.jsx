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

function Home() {
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state);

  //Despacho las countries
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  //Paginación
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);
  const pagSize = 10;
  const numPages = Math.ceil(countries.length / pagSize);
  const countriesSlice = countries.slice(index, index + pagSize);

  const btnNext = () => {
    if (index + pagSize < countries.length) {
      setIndex(index + pagSize);
      setPage(page + 1);
    }
  };
  const btnPrevious = () => {
    if (index > 0) {
      setIndex(index - pagSize);
      setPage(page - 1);
    }
  };

  const handleChange = (event) => {
    const page = event.target.value;
    setPage(page);
  };

  const handleKey = (event) => {
    const page = event.target.value;
    if (event.key === "Enter") {
      if (page > numPages) {
        alert("El número ingresado se excede al total de páginas");
        setIndex(0);
        setPage(1);
      } else if (page < 1) {
        setIndex(0);
        setPage(1);
      } else {
        setIndex(page * pagSize - pagSize);
        setPage(page);
      }
    }
  };

  const handleFilter = (event) => {
    dispatch(filterCountries(event.target.value));
    setIndex(0);
    setPage(1);
  };

  const handleOrderName = (event) => {
    dispatch(sortCountriesName(event.target.value));
    setIndex(0);
    setPage(1);
  };

  const handleOrderPopulation = (event) => {
    dispatch(sortCountriesPopulation(event.target.value));
    setIndex(0);
    setPage(1);
  };

  return (
    <div>
      <div>
        <select onChange={handleFilter}>
          <option value="filter" disabled="disabled" selected>
            Filter by continent
          </option>
          <option value="All">Todos</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
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
      <div>
        {countriesSlice.map(({ id, name, flag, continent }) => (
          <div key={id}>
            <Card id={id} name={name} flag={flag} continent={continent} />
          </div>
        ))}
      </div>
      <div>
        <button onClick={btnPrevious}>Anterior</button>
        <input
          type="text"
          onChange={handleChange}
          value={page}
          onKeyUp={handleKey}
        />
        <p>de: {numPages}</p>
        <button onClick={btnNext}>Siguiente</button>
      </div>
    </div>
  );
}

export default Home;
