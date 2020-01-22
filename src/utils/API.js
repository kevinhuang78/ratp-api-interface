import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

instance.interceptors.request.use(
    config => config,
    error => Promise.reject(error)
);
instance.defaults.headers['Content-Type'] = 'application/ld+json';
instance.defaults.timeout = 3000;

export default instance;
