import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        countries: [],
        allCountries: [],
        country_detail: {},
        filterContinent: "",
        filterActivity: "",
    },
    reducers: {
        setCountries: (state, action) => {
            state.countries = action.payload;
            state.allCountries = action.payload;
        },
        setCountriesByName: (state, action) => {
            state.countries = action.payload;
            state.allCountries = action.payload
        },
        setCountriesById: (state, action) => {
            state.country_detail = action.payload;
        },
        filterContinent: (state, action) => {
            const continentFilter = state.allCountries.filter((country) => country.continent === action.payload);

            const continentActivityFilter = continentFilter.filter((country) =>
                country.activities.find((activity) => activity.name === state.filterActivity)
            );
            state.filterActivity.length === 0 ? state.countries = continentFilter : state.countries = continentActivityFilter
            state.filterContinent = action.payload;
        },
        filterActivities: (state, action) => {
            const activityFilter = state.allCountries.filter((country) =>
                country.activities.find((activity) => activity.name === action.payload)
            );
            const activityContinentFilter = activityFilter.filter((country) =>
                country.continent === state.filterContinent);
            state.filterContinent.length === 0 ? state.countries = activityFilter : state.countries = activityContinentFilter;
            state.filterActivity = action.payload;
        },
        sortCountriesByName: (state, action) => {
            action.payload === "Alphabetical" ? state.countries = state.countries.sort((a, b) => a.name.localeCompare(b.name))
                : state.countries = state.countries.sort(((a, b) => b.name.localeCompare(a.name)))
        },
        sortCountriesByPopulation: (state, action) => {
            action.payload === "Lower" ? state.countries = state.countries.sort((a, b) => a.population - b.population)
                : state.countries = state.countries.sort((a, b) => b.population - a.population)
        }
    }
})

export const { setCountries, setCountriesByName, setCountriesById, filterContinent, filterActivities, sortCountriesByName, sortCountriesByPopulation } = countriesSlice.actions

export default countriesSlice.reducer;

// actions 
export const getCountries = () => (dispatch) => {
    const endpoint = 'http://localhost:3001/countries';
    axios.get(endpoint)
        .then((res) => {
            dispatch(setCountries(res.data))
        })
        .catch((error) => console.log(error))
}

export const getCountriesByName = (name) => (dispatch) => {
    const endpoint = `http://localhost:3001/countries?name=${name}`;
    axios.get(endpoint)
        .then((res) => {
            dispatch(setCountriesByName(res.data))
        })
        .catch((error) => console.log(error))
}

export const getCountriesById = (id) => (dispatch) => {
    const endpoint = `http://localhost:3001/countries/${id}`;
    axios.get(endpoint)
        .then((res) => {
            dispatch(setCountriesById(res.data))
        })
        .catch((error) => console.log(error))
}

export const filterCountries = (continent) => (dispatch) => {
    dispatch(filterContinent(continent));
}

export const filterActivity = (activity) => (dispatch) => {
    dispatch(filterActivities(activity));
}

export const sortCountriesName = (sort) => (dispatch) => {
    dispatch(sortCountriesByName(sort));
}

export const sortCountriesPopulation = (sort) => (dispatch) => {
    dispatch(sortCountriesByPopulation(sort))
}