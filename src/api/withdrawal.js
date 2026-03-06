import api from '../services/api';

export const requestWithdrawal = async (amount) => {
    const response = await api.post('/user/withdrawals', { amount });
    return response.data;
};

export const getMyWithdrawals = async () => {
    const response = await api.get('/user/withdrawals');
    return response.data;
};

export const getAllWithdrawals = async () => {
    const response = await api.get('/admin/withdrawals');
    return response.data;
};

export const updateWithdrawalStatus = async (id, status) => {
    const response = await api.patch(`/admin/withdrawals/${id}/status`, { status });
    return response.data;
};
