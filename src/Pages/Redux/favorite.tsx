import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../Services/api";
import { IFavoriteObjects, IFavoriteState } from "./types";

// Define a type for the slice state

const getFav: any = createAsyncThunk(
    "favorites/get",
    async (idUser: number, { dispatch, rejectWithValue }) =>
        api
            .get(`/favorites?user=${idUser}`)
            .then((res) => ({ data: res.data }))
            .catch((err: any) => {
                if (err.response.status === 404) {
                    return { data: [] };
                }
                return rejectWithValue({
                    error: true,
                });
            })
);

const postFav: any = createAsyncThunk(
    "favorites/post",
    async (payload: Record<string, unknown>, { dispatch, rejectWithValue }) =>
        api
            .post(`/favorites`, {
                user: payload.user,
                bookId: payload.bookId,
                bookName: payload.bookName,
            })
            .then((res: any) => {
                return res.data;
            })
            .catch((err) =>
                rejectWithValue({
                    error: true,
                })
            )
);
const deleteFav: any = createAsyncThunk(
    "favorites/delete",
    async (payload: Record<string, unknown>, { dispatch, rejectWithValue }) =>
        api
            .delete(`/favorites/${payload.id}`)
            .then((res: any) => {
                return payload.id;
            })
            .catch((err) =>
                rejectWithValue({
                    error: true,
                })
            )
);
// const array_emp: favoriteObjects[ ] = [
// { data1: “value1”, data2: “value2”, data3: “value3” },
// { data1: “value12”, data2: “value22”, data3: “value32” },
// { data1: “value13”, data2: “value23”, data3: “value33” },
// ]

// Define the initial state using that type
const initialState: IFavoriteState = {
    favorite: [],
    loading: true,
    error: false,
};

export const favoriteSlice = createSlice({
    name: "counter",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: {
        [getFav.pending]: (state, action) => {
            // console.log("pending", action);
            state.loading = true;
        },
        [getFav.fulfilled]: (state, action) => {
            // console.log("fulfilled", action);

            state.loading = false;
            state.favorite = action.payload.data;
        },
        [getFav.rejected]: (state, action) => {
            // console.log("rejected", action);

            state.loading = false;
        },
        [postFav.pending]: (state, action) => {
            console.log("pending", action);
            state.loading = true;
        },
        [postFav.fulfilled]: (state, action) => {
            console.log("fulfilled", action);

            state.loading = false;
            state.favorite = [...state.favorite, action.payload];
        },
        [postFav.rejected]: (state, action) => {
            console.log("rejected", action);

            state.loading = false;
        },
        [deleteFav.pending]: (state, action) => {
            console.log("pending", action);
            state.loading = true;
        },
        [deleteFav.fulfilled]: (state, action) => {
            console.log("fulfilled", action);

            state.loading = false;
            state.favorite = state.favorite.filter(
                (i: IFavoriteObjects) => i.id !== action.payload
            );
        },
        [deleteFav.rejected]: (state, action) => {
            console.log("rejected", action);

            state.loading = false;
        },
    },
});

const actions = { ...favoriteSlice.actions, getFav, postFav, deleteFav };
export { actions };
// Other code such as selectors can use the imported `RootState` type

export default favoriteSlice.reducer;
