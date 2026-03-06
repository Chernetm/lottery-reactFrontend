import api from '../services/api';

export const createItem = async (itemData) => {
    const response = await api.post('/admin/items', itemData);
    return response.data;
};

export const deleteItem = async (id) => {
    const response = await api.delete(`/admin/items/${id}`);
    return response.data;
};

export const updateLottery = async (id, data) => {
    const response = await api.put(`/admin/lotteries/${id}`, data);
    return response.data;
};

export const updateLotteryStatus = async (id, status) => {
    const response = await api.patch(`/admin/lotteries/${id}/status`, { status });
    return response.data;
};

export const drawWinner = async (id) => {
    const response = await api.post(`/admin/lotteries/${id}/draw`);
    return response.data;
};

export const getAllTickets = async () => {
    const response = await api.get('/admin/tickets');
    return response.data;
};

export const updateTicketStatus = async (id, status) => {
    const response = await api.patch(`/admin/tickets/${id}/status`, { status });
    return response.data;
};

export const getAdminStats = async () => {
    const response = await api.get('/admin/stats');
    return response.data;
};

export const getAllUsers = async () => {
    const response = await api.get('/admin/users');
    return response.data;
};

export const giftFreeTicket = async (userId, lotteryId) => {
    const response = await api.post('/admin/coupons/gift', { userId, lotteryId });
    return response.data;
};
