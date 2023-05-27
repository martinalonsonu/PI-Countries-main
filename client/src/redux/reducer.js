import { GET_COUNTRIES, GET_COUNTRIES_BY_ID, GET_COUNTRIES_BY_NAME } from './action-types'
const initialState = {
    countries: [],
    country_detail: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
            }

        case GET_COUNTRIES_BY_NAME:
            return {
                ...state,
                countries: action.payload,
            }

        case GET_COUNTRIES_BY_ID:
            return {
                ...state,
                country_detail: action.payload,
            }
        default:
            return { ...state };
    }
}

export default reducer;