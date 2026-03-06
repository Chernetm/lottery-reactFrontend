import api from '../services/api';

export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const adminRegister = async (adminData) => {
    const response = await api.post('/auth/admin/register', adminData);
    return response.data;
};

export const adminLogin = async (credentials) => {
    const response = await api.post('/auth/admin/login', credentials);
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get('/auth/profile');
    return response.data;
};

export const getAdminProfile = async () => {
    const response = await api.get('/admin/profile');
    return response.data;
};

export const changePassword = async (passwords) => {
    const response = await api.post('/auth/change-password', passwords);
    return response.data;
};
