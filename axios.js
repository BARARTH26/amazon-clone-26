//this is very popular fetching library

import axios from "axios";

const instance = axios.create({
    baseURL : '...'  //The API(Clouud Function) URL
});

export default instance;