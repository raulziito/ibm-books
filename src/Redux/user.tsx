import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { IProfileUser } from "./types";

const initialState: IProfileUser = {
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    name: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.googleId;
            state.email = action.payload.email;
            state.first_name = action.payload.givenName;
            state.last_name = action.payload.familyName;
            state.name = action.payload.name;
        },
        removeUser: (state, action) => {
            state.id = initialState.id;
            state.email = initialState.email;
            state.first_name = initialState.first_name;
            state.last_name = initialState.last_name;
            state.name = initialState.name;
        },
    },
});
const actions = { ...userSlice.actions };
export { actions };

export default userSlice.reducer;
