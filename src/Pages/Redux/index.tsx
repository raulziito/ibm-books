import { configureStore } from "@reduxjs/toolkit";

import Reducer from "./store";

const store = configureStore({
    reducer: {
        favorite: Reducer,
    },
});

export default store;
