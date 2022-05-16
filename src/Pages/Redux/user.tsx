import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { IProfileUser } from "./types";
// Define a type for the slice state
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
            console.log("passei aqui", action.payload.googleId);
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
// Other code such as selectors can use the imported `RootState` type

export default userSlice.reducer;
