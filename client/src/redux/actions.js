import axios from 'axios'
import { GET_COUNTRIES, GET_COUNTRIES_BY_ID, GET_COUNTRIES_BY_NAME } from './action-types'

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