import React from "react";
import Card from "../Card/Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../redux/actions";
import style from "./Home.module.css";
import Pagination from "../Pagination/Pagination";
import { Link } from "react-router-dom";
import Filters from "../Filters/Filters";

function Home() {
  const dispatch = useDispatch();
  const { countries, page } = useSelector((state) => state);

  //Despacho las countries
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  //Paginación
  const numberCards = 10;
  const index = page * numberCards - numberCards;
  const numberPages = Math.ceil(countries.length / numberCards);
  const countriesSlice = countries.slice(index, index + numberCards);

  return (
    <div className={style.container}>
      <div className={style.containerFilters}>
        <Filters />
      </div>
      <div className={style.countries}>
        {countriesSlice.map(({ id, name, flag, continent }) => (
          <div key={id}>
            <Link className={style.link} to={`/detail/${id}`}>
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
