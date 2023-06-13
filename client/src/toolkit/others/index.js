import { createSlice } from "@reduxjs/toolkit";

export const othersSlice = createSlice({
    name: "others",
    initialState: {
        page: 1,
        loading: false,
    },
    reducers: {
        nextPage: (state, action) => {
            state.page = state.page + 1;
        },
        previousPage: (state, action) => {
            state.page = state.page - 1;
        },
        currentPage: (state, action) => {
            state.page = Number(action.payload);
        },
        loading: (state, action) => {
            state.loading = action.payload;
        }
    }
})

export const { nextPage, previousPage, currentPage, loading } = othersSlice.actions;

export default othersSlice.reducer;

export const nextPageBtn = () => (dispatch) => {
    dispatch(nextPage());
}

export const previousPageBtn = () => (dispatch) => {
    dispatch(previousPage());
}

export const currentPageBtn = (page) => (dispatch) => {
    dispatch(currentPage(page));
}

export const loadingStatus = (boolean) => (dispatch) => {
    dispatch(loading(boolean))
}