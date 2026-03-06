import api from '../services/api';

export const purchaseTicket = async (ticketData) => {
    const response = await api.post('/tickets/purchase', ticketData);
    return response.data;
};

export const getMyTickets = async () => {
    const response = await api.get('/tickets/my');
    return response.data;
};

export const revealTicket = async (ticketId) => {
    const response = await api.post(`/tickets/${ticketId}/reveal`);
    return response.data;
};
