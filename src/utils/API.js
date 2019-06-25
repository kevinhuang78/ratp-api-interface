import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

instance.interceptors.request.use(
    config => {
        /*

        Example on how we can pass a token inside each API call (in this API no need of being connected)

        const token = localStorage.getItem('userToken');
        const user = parseJwt(token);

        // If no user, then disconnect
        user || store.dispatch(tryLogout());

        // Check token
        config.headers['Authorization'] = token ? `Bearer ${token}` : null;
        */
        return config;
    },
    error => (Promise.reject(error))
);
instance.defaults.headers['Content-Type'] = 'application/ld+json';
instance.defaults.timeout = 3000;

export default instance;