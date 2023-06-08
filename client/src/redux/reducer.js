import { GET_COUNTRIES, GET_COUNTRIES_BY_ID, GET_COUNTRIES_BY_NAME, FILTER_CONTINENT, FILTER_ACTIVITY, SORT_COUNTRIES_NAME, SORT_COUNTRIES_POPULATION, CREATE_ACTIVITY, GET_ACTIVITY, DELETE_ACTIVITY, UPDATE_ACTIVITY, NEXT_PAGE, PREVIOUS_PAGE, CURRENT_PAGE, LOADING } from './action-types'
const initialState = {
    countries: [],
    allCountries: [],
    country_detail: {},
    activities: [],
    page: 1,
    loading: false,
    filterContinent: "",
    filterActivity: "",
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload,
            }

        case GET_COUNTRIES_BY_NAME:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload,
            }

        case GET_COUNTRIES_BY_ID:
            return {
                ...state,
                country_detail: action.payload,
            }

        case FILTER_CONTINENT:
            const continentFilter = state.allCountries.filter((country) => country.continent === action.payload);
            const continentActivityFilter = continentFilter.filter((country) =>
                country.activities.find((activity) => activity.name === state.filterActivity)
            );
            return {
                ...state,
                countries: state.filterActivity.length === 0 ? continentFilter
                    : continentActivityFilter,
                filterContinent: action.payload
            }

        case FILTER_ACTIVITY:
            const activityFilter = state.allCountries.filter((country) =>
                country.activities.find((activity) => activity.name === action.payload)
            );
            const activityContinentFilter = activityFilter.filter((country) =>
                country.continent === state.filterContinent);
            return {
                ...state,
                countries: state.filterContinent.length === 0 ? activityFilter
                    : activityContinentFilter,
                filterActivity: action.payload
            };


        case SORT_COUNTRIES_NAME:
            return {
                ...state,
                countries: action.payload === "Alphabetical" ? state.countries.sort((a, b) => a.name.localeCompare(b.name))
                    : state.countries.sort(((a, b) => b.name.localeCompare(a.name)))
            }

        case SORT_COUNTRIES_POPULATION:
            return {
                ...state,
                countries: action.payload === "Lower" ? state.countries.sort((a, b) => a.population - b.population)
                    : state.countries.sort((a, b) => b.population - a.population)
            }

        case CREATE_ACTIVITY:
            const activity = {
                name: action.payload.name,
                difficulty: action.payload.difficulty,
                duration: action.payload.duration,
                season: action.payload.season,
                countries: action.payload.countries,
            }
            return {
                ...state,
                activities: [...state.activities, activity]
            }

        case UPDATE_ACTIVITY:
            const updatedActivities = state.activities.map((activity) => {
                if (activity.id === action.id) {
                    return {
                        ...activity,
                        name: action.payload.name,
                        difficulty: action.payload.difficulty,
                        duration: action.payload.duration,
                        season: action.payload.season,
                        countries: action.payload.countries,
                    };
                }
                return activity;
            });
            return {
                ...state,
                activities: updatedActivities,
            };

        case GET_ACTIVITY:
            return {
                ...state,
                activities: action.payload,
            };

        case DELETE_ACTIVITY:
            const filterDelete = state.activities.filter((activity) => activity.id !== action.payload)
            return {
                ...state,
                activities: filterDelete
            }


        case NEXT_PAGE:
            return {
                ...state,
                page: state.page + 1
            }

        case PREVIOUS_PAGE:
            return {
                ...state,
                page: state.page - 1
            }

        case CURRENT_PAGE:
            return {
                ...state,
                page: Number(action.payload)
            }

        case LOADING:
            return {
                ...state,
                loading: action.payload,
            }

        default:
            return { ...state };
    }
}

export default reducer;