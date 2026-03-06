import axios from 'axios';
// https://lottery-gobackend.onrender.com/api
//http://localhost:5000/api
const api = axios.create({
    baseURL: 'https://lottery-gobackend.onrender.com/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear local storage
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            
            // Redirect to login
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
