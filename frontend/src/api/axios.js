import axios from 'axios';

// baseURL for the backend API
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4949/api' });

// Request interceptor to attach the JWT token to every request
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    
    // Only attach the token if it exists
    if (token) {
        // Correctly format the token as a Bearer token
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;