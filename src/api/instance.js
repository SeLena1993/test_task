import * as axios from "axios";

export const instance = axios.create({
    baseURL: 'https://work.vint-x.net/api'
});