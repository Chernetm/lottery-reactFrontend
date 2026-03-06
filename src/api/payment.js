import api from '../services/api';

export const verifyPayment = async (txRef) => {
    const response = await api.get(`/payments/verify/${txRef}`);
    return response.data;
};
