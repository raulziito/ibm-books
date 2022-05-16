import { configureStore } from "@reduxjs/toolkit";
import React, { FC, Component } from "react";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { PersistGate } from "redux-persist/integration/react";
import storageSession from "redux-persist/lib/storage/session";

import BookReducer from "./books";
import FavoriteReducer from "./favorite";
import userReducer from "./user";

const reducers = combineReducers({
    books: BookReducer,
    favorite: FavoriteReducer,
    user: userReducer,
});

const persistConfig = {
    key: "root",
    storage: storageSession,

    transforms: [
        encryptTransform({
            secretKey: "senha12345678",
            onError(error) {
                console.log(
                    "----------------ERRO NA ENCRYPTOGRAFIA-------------------",
                    error
                );
            },
        }),
    ],
    blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);
interface IProps {
    children: any;
}
export default function Redux({ children }: IProps) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={<div>loading</div>}>
                {children}
            </PersistGate>
        </Provider>
    );
}
