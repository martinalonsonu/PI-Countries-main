import axios from 'axios'
import { GET_COUNTRIES, GET_COUNTRIES_BY_ID, GET_COUNTRIES_BY_NAME, FILTER_CONTINENT, SORT_COUNTRIES_NAME, SORT_COUNTRIES_POPULATION, CREATE_ACTIVITY } from './action-types'

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
        const endpoint = 'http://localhost:3001/activities'
        await axios.post(endpoint, activity).then((result) => {
            return dispatch({
                type: CREATE_ACTIVITY,
                payload: result,
            })
        })
    }
}