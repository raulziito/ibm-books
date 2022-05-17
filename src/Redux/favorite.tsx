import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../Microservice/api";
import { IFavoriteObjects, IFavoriteState } from "./types";

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

const initialState: IFavoriteState = {
    favorite: [],
    loading: true,
    error: false,
};

export const favoriteSlice = createSlice({
    name: "counter",
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

export default favoriteSlice.reducer;
