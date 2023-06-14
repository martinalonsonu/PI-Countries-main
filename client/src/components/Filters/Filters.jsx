import React from "react";
import {
    getCountries,
    filterCountries,
    filterActivity,
    sortCountriesName,
    sortCountriesPopulation,
} from "../../toolkit/countries";
import { loadingStatus } from "../../toolkit/others";
import { getActivity } from "../../toolkit/activities";
import { currentPageBtn } from "../../toolkit/others";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from "./Filters.module.css";

function Filters() {
    const dispatch = useDispatch();
    const { activities } = useSelector((state) => state.activities);

    useEffect(() => {
        dispatch(getActivity());
    }, [dispatch]);

    const continents = ["Asia", "Africa", "Americas", "Europe", "Oceania"];

    //Filters
    const handleFilterContinent = (event) => {
        dispatch(filterCountries(event.target.value));
        dispatch(currentPageBtn(1));
    };

    const handleFilterActivity = (event) => {
        dispatch(filterActivity(event.target.value));
        dispatch(currentPageBtn(1));
    };

    //Orders
    const handleOrder = (event) => {
        const { value } = event.target;
        if (value === "Alphabetical" || value === "Reverse-Alphabetical") {
            dispatch(sortCountriesName(value));
            dispatch(currentPageBtn(1));
        } else if (value === "Highest" || value === "Lower") {
            dispatch(sortCountriesPopulation(value));
            dispatch(currentPageBtn(1));
        }
    };

    //Remove
    const handleRemove = () => {
        dispatch(loadingStatus(true));
        dispatch(getCountries());
        dispatch(getActivity());
        dispatch(currentPageBtn(1));
        dispatch(filterCountries(""));
        dispatch(filterActivity(""));
        setTimeout(() => dispatch(loadingStatus(false)), 500);
    };

    return (
        <div className={style.filters}>
            <select onChange={handleFilterContinent} defaultValue="">
                <option value="" disabled="disabled" selected>
                    Filter by continent
                </option>
                {continents?.map((continent, index) => (
                    <option key={index} value={continent}>
                        {continent}
                    </option>
                ))}
            </select>
            <select onChange={handleFilterActivity}>
                <option value="filter" disabled="disabled" selected>
                    Filter by activity
                </option>
                {activities?.map((activity, index) => (
                    <option key={index} value={activity.name}>
                        {activity.name}
                    </option>
                ))}
            </select>
            <select onChange={handleOrder}>
                <option value="orderName" disabled="disabled" selected>
                    Order by:
                </option>
                <option value="Alphabetical">A-Z</option>
                <option value="Reverse-Alphabetical">Z-A</option>
                <option value="Highest">Highest population</option>
                <option value="Lower">Lower population</option>
            </select>
            <button onClick={handleRemove}>Remove Filters</button>
        </div>
    );
}

export default Filters;
