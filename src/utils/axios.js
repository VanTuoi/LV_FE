import axios from 'axios';
require('dotenv').config();
import _ from 'lodash';

const instance = axios.create({
    baseURL: process.env.BACKEND_URL,
    // baseURL: 'http://localhost:8080',
    // withCredentials: true
});
// console.log('url connect be', process.env)

//  nhận cookie từ nodejs
instance.defaults.withCredentials = true;


instance.interceptors.response.use(
    (response) => {
        const { data } = response;
        return response.data;
    }
);

export default instance;
