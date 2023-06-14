import React from "react";
import Card from "../Card/Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Home.module.css";
import Pagination from "../Pagination/Pagination";
import { Link } from "react-router-dom";
import Filters from "../Filters/Filters";
import Loading from "../Loading/Loading";
import NoResults from "../NoResults/NoResults";
import { getCountries } from "../../toolkit/countries";
import { loadingStatus } from "../../toolkit/others";

function Home() {
    const dispatch = useDispatch();
    const { countries } = useSelector((state) => state.countries);
    const { page, loading } = useSelector((state) => state.others);

    //Despacho las countries
    useEffect(() => {
        dispatch(loadingStatus(true));
        dispatch(getCountries());

        setTimeout(() => dispatch(loadingStatus(false)), 1500);
    }, [dispatch]);

    //Paginación
    const numberCards = 10;
    const index = page * numberCards - numberCards;
    const numberPages = Math.ceil(countries.length / numberCards);
    const countriesSlice = countries.slice(index, index + numberCards);

    if (loading === false && countries.length === 0) {
        return <NoResults />;
    }

    return loading ? (
        <Loading />
    ) : (
        <div className={style.container}>
            <div className={style.containerFilters}>
                <Filters />
            </div>
            <div className={style.countries}>
                {countriesSlice?.map(
                    ({ id, name, flag, continent, activities }) => (
                        <div key={id}>
                            <Link className={style.link} to={`/detail/${id}`}>
                                <Card
                                    id={id}
                                    name={name}
                                    flag={flag}
                                    continent={continent}
                                    activities={activities}
                                />
                            </Link>
                        </div>
                    )
                )}
            </div>

            <div className={style.containerPagination}>
                <Pagination numberPages={numberPages} />
            </div>
        </div>
    );
}

export default Home;
