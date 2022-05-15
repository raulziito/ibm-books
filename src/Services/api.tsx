import axios from "axios";

const URL_API = process.env.REACT_APP_API_HOST_URL;

export const api = axios.create({
    baseURL: URL_API,
});
