import { configureStore } from "@reduxjs/toolkit"
import countries from "./countries";
import others from "./others";
import activities from "./activities";

const store = configureStore({
    reducer: {
        countries,
        activities,
        others
    }
})

export default store;