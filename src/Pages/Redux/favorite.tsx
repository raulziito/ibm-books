import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../Services/api";

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

interface IFavoriteObjects {
    id: number;
    user: number;
    bookId: number;
}
// const array_emp: favoriteObjects[ ] = [
// { data1: “value1”, data2: “value2”, data3: “value3” },
// { data1: “value12”, data2: “value22”, data3: “value32” },
// { data1: “value13”, data2: “value23”, data3: “value33” },
// ]

interface IFavoriteState {
    favorite: Array<IFavoriteObjects>;
    loading: boolean;
    error: boolean;
}

// Define the initial state using that type
const initialState: IFavoriteState = {
    favorite: [],
    loading: true,
    error: false,
};

export const counterSlice = createSlice({
    name: "counter",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: {
        [getFav.pending]: (state, action) => {
            console.log("pending", action);
            state.loading = true;
        },
        [getFav.fulfilled]: (state, action) => {
            console.log("fulfilled", action);

            state.loading = false;
            state.favorite = action.payload.data;
        },
        [getFav.rejected]: (state, action) => {
            console.log("rejected", action);

            state.loading = false;
            state.error = true;
        },
    },
});

export { getFav };

// Other code such as selectors can use the imported `RootState` type

export default counterSlice.reducer;
