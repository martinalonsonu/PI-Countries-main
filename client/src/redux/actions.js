import axios from 'axios'
import { GET_COUNTRIES, GET_COUNTRIES_BY_ID, GET_COUNTRIES_BY_NAME, FILTER_CONTINENT, SORT_COUNTRIES_NAME, SORT_COUNTRIES_POPULATION, CREATE_ACTIVITY, GET_ACTIVITY, NEXT_PAGE, PREVIOUS_PAGE, CURRENT_PAGE } from './action-types'

export const getCountries = () => {
    const endpoint = 'http://localhost:3001/countries';
    return async (dispatch) => {
        try {
            const { data } = await axios(endpoint)
            return dispatch({
                type: GET_COUNTRIES,
                payload: data,
            })
        } catch (error) {
            return { error: error.message }
        }
    }
}

export const getCountriesByName = (name) => {
    const endpoint = `http://localhost:3001/countries?name=${name}`
    return async (dispatch) => {
        try {
            const { data } = await axios(endpoint)
            return dispatch({
                type: GET_COUNTRIES_BY_NAME,
                payload: data,
            })
        } catch (error) {
            return { error: error.message }
        }
    }
}

export const getCountriesById = (id) => {
    const endpoint = `http://localhost:3001/countries/${id}`
    return async (dispatch) => {
        try {
            const { data } = await axios(endpoint)
            return dispatch({
                type: GET_COUNTRIES_BY_ID,
                payload: data,
            })
        } catch (error) {
            return { error: error.message }
        }
    }
}

export const filterCountries = (continent) => {
    return (dispatch) => {
        return dispatch({
            type: FILTER_CONTINENT,
            payload: continent,
        })
    }
}

export const sortCountriesName = (order) => {
    return (dispatch) => {
        return dispatch({
            type: SORT_COUNTRIES_NAME,
            payload: order,
        })
    }
}

export const sortCountriesPopulation = (order) => {
    return (dispatch) => {
        return dispatch({
            type: SORT_COUNTRIES_POPULATION,
            payload: order,
        })
    }
}

export const createActivity = (activity) => {
    return async (dispatch) => {
        const endpoint = 'http://localhost:3001/activities';
        try {
            const result = await axios.post(endpoint, activity);
            dispatch({
                type: CREATE_ACTIVITY,
                payload: result.data,
            });

        } catch (error) {
            return { error: error.message };
        }
    };
};


export const getActivity = () => {
    const endpoint = 'http://localhost:3001/activities';
    return async (dispatch) => {
        try {
            const { data } = await axios(endpoint);
            return dispatch({
                type: GET_ACTIVITY,
                payload: data,
            });
        } catch (error) {
            return { error: error.message };
        }
    };
};

export const nextPage = () => {
    return (dispatch) => {
        return dispatch({
            type: NEXT_PAGE
        })
    }
}

export const previousPage = () => {
    return (dispatch) => {
        return dispatch({
            type: PREVIOUS_PAGE
        })
    }
}

export const currentPage = (page) => {
    return (dispatch) => {
        return dispatch({
            type: CURRENT_PAGE,
            payload: page,
        })
    }
}