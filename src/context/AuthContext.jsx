import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as userLoginService, adminLogin as adminLoginService, getProfile, getAdminProfile } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (token && role) {
            fetchProfile(role);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchProfile = async (role) => {
        try {
            const data = role === 'ADMIN' ? await getAdminProfile() : await getProfile();
            setUser({ ...data, role });
        } catch (error) {
            console.error('Fetch profile failed', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (identifier, password, type = 'user') => {
        const data = type === 'admin'
            ? await adminLoginService({ email: identifier, password })
            : await userLoginService({ email: identifier, password });

        localStorage.setItem('token', data.token);
        const role = data.admin ? 'ADMIN' : 'USER';
        localStorage.setItem('role', role);
        setUser({ ...(data.user || data.admin), role });
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
