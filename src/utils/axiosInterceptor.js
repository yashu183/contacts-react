import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:5555/api'
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
