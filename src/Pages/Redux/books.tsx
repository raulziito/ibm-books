import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { start } from "repl";

import { api } from "../../Services/api";

// Define a type for the slice state
interface IBookState {
    data: Array<Record<string, unknown>>;
    total: number;
    current_page: number;
    per_page: number;
    keyword: string;
    description: Record<string, unknown>;
    loading: boolean;
    error: boolean;
}

interface IStores {
    books: IBookState;
}

const getBook: any = createAsyncThunk(
    "books/get",
    async (
        payload: Record<string, unknown>,
        { dispatch, rejectWithValue, getState, fulfillWithValue }
    ) => {
        const state: IStores = getState() as IStores;

        return api
            .get(
                `https://www.googleapis.com/books/v1/volumes?q='${state.books.keyword}&key=${process.env.REACT_APP_GOOGLE_KEY}&maxResults=8`
            )
            .then((res) => ({
                data: res.data.items ? res.data.items : [],
                total: res.data.totalItems,
            }))
            .catch((err: any) => {
                return rejectWithValue({
                    error: true,
                });
            });
    }
);

const paginate: any = createAsyncThunk(
    "books/paginate",
    async (
        payload: Record<string, unknown>,
        { dispatch, rejectWithValue, getState, fulfillWithValue }
    ) => {
        console.log("aquuuuuiii");
        let startIndex: number;
        let pagination: number;
        const state: IStores = getState() as IStores;
        if (payload.paginate === "UP") {
            startIndex = (state.books.current_page + 1) * state.books.per_page;
            pagination = +1;
        } else {
            startIndex = (state.books.current_page - 1) * state.books.per_page;
            pagination = -1;
        }
        return api
            .get(
                `https://www.googleapis.com/books/v1/volumes?q='${state.books.keyword}&startIndex=${startIndex}&key=${process.env.REACT_APP_GOOGLE_KEY}&maxResults=8`
            )
            .then((res) => ({
                data: res.data.items ? res.data.items : [],
                pagination,
                total: res.data.totalItems,
            }))
            .catch((err) => {
                return rejectWithValue({
                    error: true,
                });
            });
    }
);

const detailBook: any = createAsyncThunk(
    "books/detail",
    async (payload: Record<string, unknown>, { dispatch, rejectWithValue }) =>
        api
            .get(
                `https://www.googleapis.com/books/v1/volumes/${payload.id}?&key=${process.env.REACT_APP_GOOGLE_KEY}`
            )
            .then((res) => ({
                description: res.data.volumeInfo,
            }))
            .catch((err: any) => {
                return rejectWithValue({
                    error: true,
                });
            })
);

interface IBookState {
    data: Array<Record<string, unknown>>;
    total: number;
    current_page: number;
    per_page: number;
    keyword: string;
    description: Record<string, unknown>;
    loading: boolean;
    error: boolean;
}

// Define the initial state using that type
const initialState: IBookState = {
    data: [],
    total: 0,
    current_page: 0,
    per_page: 8,
    keyword: "bem vindo",
    loading: false,
    error: false,
    description: {},
};

export const counterSlice = createSlice({
    name: "counter",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.keyword = action.payload.keyword;
        },
    },
    extraReducers: {
        [getBook.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [getBook.fulfilled]: (state, action) => {
            state.error = false;
            state.loading = false;
            state.data = action.payload.data;
            state.current_page = 1;
            state.total = action.payload.total;
        },
        [getBook.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },

        [detailBook.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [detailBook.fulfilled]: (state, action) => {
            state.error = false;
            state.loading = false;
            state.description = action.payload.description;
        },
        [detailBook.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },
        [paginate.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [paginate.fulfilled]: (state, action) => {
            state.error = false;
            state.loading = false;
            state.data = action.payload.data;
            state.current_page += action.payload.pagination;
            state.total = action.payload.total;
        },
        [paginate.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },
    },
});

const actions = { ...counterSlice.actions, getBook, detailBook, paginate };
export { actions };

// Other code such as selectors can use the imported `RootState` type

export default counterSlice.reducer;
