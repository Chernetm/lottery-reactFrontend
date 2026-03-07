import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAdminProfile, changePassword } from '../api/auth';
import { createItem, updateLotteryStatus, getAdminStats, updateLottery, deleteItem, getAllTickets, updateTicketStatus, drawWinner, getAllUsers, giftFreeTicket } from '../api/admin';
import { getAllLotteries, getLotteryItems, createLottery } from '../api/lottery';
import { getAllWithdrawals, updateWithdrawalStatus } from '../api/withdrawal';
import {
    BarChart3,
    Package,
    Ticket,
    Trophy,
    Users,
    History,
    Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Admin Components
import StatsOverview from '../components/admin/StatsOverview';
import ItemManagement from '../components/admin/ItemManagement';
import LotteryManagement from '../components/admin/LotteryManagement';
import TicketManagement from '../components/admin/TicketManagement';
import WithdrawalManagement from '../components/admin/WithdrawalManagement';
import AdminProfile from '../components/admin/AdminProfile';
import GiftCouponModal from '../components/admin/GiftCouponModal';
import DrawSpinnerModal from '../components/admin/DrawSpinnerModal';
import EditLotteryModal from '../components/admin/EditLotteryModal';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ totalRevenue: 0, activeLotteries: 0, totalUsers: 0 });
    const [items, setItems] = useState([]);
    const [lotteries, setLotteries] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [withdrawals, setWithdrawals] = useState([]);
    const [users, setUsers] = useState([]);
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('stats');
    const [editingLottery, setEditingLottery] = useState(null);
    const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [drawingState, setDrawingState] = useState({
        isDrawing: false,
        candidates: [],
        winner: null,
        currentSelection: null,
        showResult: false,
    });
    const [giftModal, setGiftModal] = useState({
        isOpen: false,
        lotteryId: null,
        selectedUserId: '',
        generatedCoupon: '',
        loading: false
    });

    // Form states
    const [itemForm, setItemForm] = useState({ name: '', description: '', imageUrl: '', retailPrice: '' });
    const [lotteryForm, setLotteryForm] = useState({
        ticketPrice: '',
        minTickets: '',
        maxTickets: '',
        prizes: [{ itemId: '', rank: 1 }]
    });

    const addPrize = () => {
        setLotteryForm(prev => ({
            ...prev,
            prizes: [...prev.prizes, { itemId: '', rank: prev.prizes.length + 1 }]
        }));
    };

    const removePrize = (index) => {
        if (lotteryForm.prizes.length <= 1) return;
        const newPrizes = lotteryForm.prizes.filter((_, i) => i !== index)
            .map((p, i) => ({ ...p, rank: i + 1 }));
        setLotteryForm(prev => ({ ...prev, prizes: newPrizes }));
    };

    const updatePrizeItem = (index, itemId) => {
        const newPrizes = [...lotteryForm.prizes];
        newPrizes[index].itemId = itemId;
        setLotteryForm(prev => ({ ...prev, prizes: newPrizes }));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [statsRes, itemsRes, lotteriesRes, ticketsRes, profileRes, withdrawalsRes, usersRes] = await Promise.all([
                getAdminStats(),
                getLotteryItems(),
                getAllLotteries(),
                getAllTickets(),
                getAdminProfile(),
                getAllWithdrawals(),
                getAllUsers(),
            ]);
            setStats(statsRes);
            setItems(itemsRes);
            setLotteries(lotteriesRes);
            setTickets(ticketsRes);
            setAdmin(profileRes);
            setWithdrawals(withdrawalsRes);
            setUsers(usersRes);
        } catch (error) {
            console.error('Failed to fetch admin data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            await createItem({ ...itemForm, retailPrice: parseFloat(itemForm.retailPrice) });
            setItemForm({ name: '', description: '', imageUrl: '', retailPrice: '' });
            fetchData();
        } catch (error) {
            alert('Failed to add item');
        }
    };

    const handleDeleteItem = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            await deleteItem(id);
            fetchData();
        } catch (error) {
            alert(error.response?.data?.error || 'Failed to delete item');
        }
    };

    const handleCreateLottery = async (e) => {
        e.preventDefault();
        try {
            await createLottery({
                ticketPrice: parseFloat(lotteryForm.ticketPrice),
                minTickets: parseInt(lotteryForm.minTickets),
                maxTickets: lotteryForm.maxTickets ? parseInt(lotteryForm.maxTickets) : null,
                prizes: lotteryForm.prizes.map(p => ({
                    itemId: parseInt(p.itemId),
                    rank: p.rank
                })),
                itemId: parseInt(lotteryForm.prizes[0].itemId) // Legacy support
            });
            setLotteryForm({
                ticketPrice: '',
                minTickets: '',
                maxTickets: '',
                prizes: [{ itemId: '', rank: 1 }]
            });
            fetchData();
        } catch (error) {
            console.error(error);
            alert('Failed to create lottery');
        }
    };

    const handleUpdateLottery = async (e) => {
        e.preventDefault();
        try {
            await updateLottery(editingLottery.id, {
                ticketPrice: parseFloat(editingLottery.ticketPrice),
                minTickets: parseInt(editingLottery.minTickets),
                maxTickets: editingLottery.maxTickets ? parseInt(editingLottery.maxTickets) : null,
                status: editingLottery.status
            });
            setEditingLottery(null);
            fetchData();
            alert('Lottery updated successfully!');
        } catch (error) {
            alert('Failed to update lottery');
        }
    };

    const handleDrawWinner = async (lotteryId) => {
        const lottery = lotteries.find(l => l.id === lotteryId);
        if (!lottery) return;

        // Collect all ticket numbers for candidates
        const candidates = tickets
            .filter(t => t.lotteryId === lotteryId && t.status === 'ACTIVE')
            .map(t => t.ticketNumber);

        if (candidates.length === 0) {
            alert('No active tickets found for this lottery.');
            return;
        }

        // Start drawing state
        setDrawingState({
            isDrawing: true,
            candidates,
            winner: null,
            currentSelection: candidates[0],
            showResult: false,
        });

        // Visual shuffle interval
        const shuffleInterval = setInterval(() => {
            setDrawingState(prev => ({
                ...prev,
                currentSelection: prev.candidates[Math.floor(Math.random() * prev.candidates.length)]
            }));
        }, 100);

        try {
            const response = await drawWinner(lotteryId);
            const winners = response.winners;

            // Wait at least 3 seconds for effect
            setTimeout(() => {
                clearInterval(shuffleInterval);
                setDrawingState(prev => ({
                    ...prev,
                    winner: winners, // Store the array of winner prizes
                    currentSelection: winners[0].rank === 1 ? winners[0].winner?.id?.substring(0, 8) : winners[0].rank,
                    showResult: true,
                }));
                fetchData();
            }, 3000);
        } catch (error) {
            clearInterval(shuffleInterval);
            setDrawingState({ isDrawing: false, candidates: [], winner: null, currentSelection: null, showResult: false });
            alert(error.response?.data?.error || 'Failed to draw winner');
        }
    };

    const handleUpdateTicketStatus = async (id, status) => {
        try {
            await updateTicketStatus(id, status);
            const ticketsRes = await getAllTickets();
            setTickets(ticketsRes);
        } catch (error) {
            console.error('Failed to update ticket status', error);
        }
    };

    const handleUpdateWithdrawalStatus = async (id, status) => {
        try {
            await updateWithdrawalStatus(id, status);
            const withdrawalsRes = await getAllWithdrawals();
            setWithdrawals(withdrawalsRes);
        } catch (error) {
            console.error('Failed to update withdrawal status', error);
        }
    };

    const handleGiftCoupon = async (e) => {
        e.preventDefault();
        setGiftModal(prev => ({ ...prev, loading: true }));
        try {
            const response = await giftFreeTicket(giftModal.selectedUserId, giftModal.lotteryId);
            setGiftModal(prev => ({ ...prev, generatedCoupon: response.code, loading: false }));
        } catch (error) {
            alert(error.response?.data?.error || 'Failed to gift coupon');
            setGiftModal(prev => ({ ...prev, loading: false }));
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }
        try {
            await changePassword({ oldPassword: passwordData.oldPassword, newPassword: passwordData.newPassword });
            setMessage({ type: 'success', text: 'Password changed successfully' });
            setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.error || 'Failed to change password' });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const tabs = [
        { id: 'stats', label: 'Overview', icon: BarChart3 },
        { id: 'items', label: 'Items', icon: Package },
        { id: 'lotteries', label: 'Lotteries', icon: Trophy },
        { id: 'tickets', label: 'Tickets', icon: Ticket },
        { id: 'withdrawals', label: 'Withdrawals', icon: History },
        { id: 'profile', label: 'Profile', icon: Shield },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
                    <p className="text-slate-400 text-sm md:text-base">Manage items, lotteries, and view platform performance.</p>
                </div>

                <div className="flex bg-slate-800/50 p-1 rounded-2xl border border-slate-700 w-full lg:w-auto overflow-x-auto scrollbar-hide">
                    <div className="flex min-w-max">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-bold transition ${activeTab === tab.id
                                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                <tab.icon size={16} className="md:w-[18px] md:h-[18px]" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'stats' && <StatsOverview stats={stats} />}

                {activeTab === 'items' && (
                    <ItemManagement
                        items={items}
                        itemForm={itemForm}
                        setItemForm={setItemForm}
                        handleAddItem={handleAddItem}
                        handleDeleteItem={handleDeleteItem}
                    />
                )}

                {activeTab === 'lotteries' && (
                    <LotteryManagement
                        lotteries={lotteries}
                        lotteryForm={lotteryForm}
                        items={items}
                        handleCreateLottery={handleCreateLottery}
                        addPrize={addPrize}
                        removePrize={removePrize}
                        updatePrizeItem={updatePrizeItem}
                        setLotteryForm={setLotteryForm}
                        setEditingLottery={setEditingLottery}
                        handleDrawWinner={handleDrawWinner}
                        setGiftModal={setGiftModal}
                    />
                )}

                {activeTab === 'tickets' && <TicketManagement tickets={tickets} />}

                {activeTab === 'withdrawals' && (
                    <WithdrawalManagement
                        withdrawals={withdrawals}
                        handleUpdateWithdrawalStatus={handleUpdateWithdrawalStatus}
                    />
                )}

                {activeTab === 'profile' && (
                    <AdminProfile
                        admin={admin}
                        passwordData={passwordData}
                        setPasswordData={setPasswordData}
                        handlePasswordChange={handlePasswordChange}
                        message={message}
                    />
                )}
            </AnimatePresence>

            <GiftCouponModal
                giftModal={giftModal}
                setGiftModal={setGiftModal}
                handleGiftCoupon={handleGiftCoupon}
                users={users}
            />

            <DrawSpinnerModal
                drawingState={drawingState}
                setDrawingState={setDrawingState}
            />

            <EditLotteryModal
                editingLottery={editingLottery}
                setEditingLottery={setEditingLottery}
                handleUpdateLottery={handleUpdateLottery}
            />
        </div>
    );
};

export default AdminDashboard;
