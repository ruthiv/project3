import axios from "axios";
import store from "../Redux/Store";


const tokenAxios = axios.create();

tokenAxios.interceptors.request.use((config)=> {
    config.headers['Authorization'] = "Bearer " + store.getState().authReducer.user.token;
    return config;
})

export default tokenAxios;