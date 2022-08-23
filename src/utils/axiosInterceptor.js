import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'https://contacts-api.yashu.cf/api'
});

httpClient.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/json';
    if (!config.url.includes('addUser')) {
        const token = localStorage.getItem('token');
        config.headers['Authorization'] = token;
    }
    return config;
});

export default httpClient;
