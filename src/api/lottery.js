import api from '../services/api';

export const getAllLotteries = async (status = '') => {
    const response = await api.get('/lotteries', { params: { status } });
    return response.data;
};

export const getLotteryById = async (id) => {
    const response = await api.get(`/lotteries/${id}`);
    return response.data;
};

export const getLotteryItems = async () => {
    const response = await api.get('/lotteries/items');
    return response.data;
};

export const createLottery = async (lotteryData) => {
    const response = await api.post('/lotteries', lotteryData);
    return response.data;
};
