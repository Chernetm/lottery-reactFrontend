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
    Users,
    Plus,
    Trash2,
    Play,
    Trophy,
    AlertCircle,
    Edit2,
    X,
    Save,
    LayoutDashboard,
    Settings,
    Shield,
    User as UserIcon,
    Lock,
    Check,
    History,
    Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        { id: 'tickets', label: 'Tickets', icon: Users },
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
                {activeTab === 'stats' && (
                    <motion.div
                        key="stats"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                    >
                        {[
                            { label: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: BarChart3, color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
                            { label: 'Active Lotteries', value: stats.activeLotteries, icon: Ticket, color: 'text-brand-secondary', bg: 'bg-brand-secondary/10' },
                            { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
                        ].map((stat, i) => (
                            <div key={i} className="glass-effect p-6 md:p-10 rounded-2xl md:rounded-3xl flex flex-col items-center">
                                <div className={`p-3.5 md:p-5 rounded-xl md:rounded-2xl mb-4 md:mb-6 ${stat.bg} ${stat.color}`}>
                                    <stat.icon size={24} className="md:w-8 md:h-8" />
                                </div>
                                <h3 className="text-2xl md:text-4xl font-black mb-1">{stat.value}</h3>
                                <p className="text-slate-500 font-medium uppercase tracking-wider text-[10px] md:text-xs">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                )}

                {activeTab === 'items' && (
                    <motion.div
                        key="items"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-12"
                    >
                        {/* Add Item Form */}
                        <div className="lg:col-span-1">
                            <div className="glass-effect p-8 rounded-3xl sticky top-28">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Plus className="text-brand-primary" /> Register New Item
                                </h3>
                                <form onSubmit={handleAddItem} className="space-y-4">
                                    <input
                                        placeholder="Item Name"
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-brand-primary transition"
                                        value={itemForm.name}
                                        onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                                        required
                                    />
                                    <textarea
                                        placeholder="Description"
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-brand-primary transition h-32"
                                        value={itemForm.description}
                                        onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                                    />
                                    <input
                                        placeholder="Retail Price ($)"
                                        type="number"
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-brand-primary transition"
                                        value={itemForm.retailPrice}
                                        onChange={(e) => setItemForm({ ...itemForm, retailPrice: e.target.value })}
                                        required
                                    />
                                    <input
                                        placeholder="Image URL"
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-brand-primary transition"
                                        value={itemForm.imageUrl}
                                        onChange={(e) => setItemForm({ ...itemForm, imageUrl: e.target.value })}
                                    />
                                    <button type="submit" className="w-full premium-gradient py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                                        Add Item <Plus size={18} />
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="glass-effect p-4 md:p-6 rounded-2xl flex items-center gap-4 md:gap-6 group">
                                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg md:rounded-xl overflow-hidden shrink-0">
                                        <img src={item.imageUrl || 'https://via.placeholder.com/150'} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <h4 className="font-bold text-base md:text-lg truncate">{item.name}</h4>
                                        <p className="text-slate-500 text-xs md:text-sm line-clamp-1">{item.description}</p>
                                        <p className="text-brand-primary font-bold mt-1 text-sm md:text-base">${item.retailPrice}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteItem(item.id)}
                                        className="text-red-500 p-2 bg-red-500/10 rounded-lg hover:bg-red-500 hover:text-white transition md:opacity-0 md:group-hover:opacity-100 shrink-0"
                                    >
                                        <Trash2 size={18} className="md:w-5 md:h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'lotteries' && (
                    <motion.div
                        key="lotteries"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-12"
                    >
                        {/* Create Lottery Form */}
                        <div className="lg:col-span-1">
                            <div className="glass-effect p-8 rounded-3xl sticky top-28">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Ticket className="text-brand-primary" /> Create New Lottery
                                </h3>
                                <form onSubmit={handleCreateLottery} className="space-y-4">
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Lottery Prizes</label>
                                        {lotteryForm.prizes.map((prize, index) => (
                                            <div key={index} className="flex gap-2">
                                                <div className="flex-grow relative">
                                                    <span className="absolute left-3 top-3.5 text-xs font-bold text-brand-primary bg-brand-primary/10 w-6 h-6 flex items-center justify-center rounded-full">
                                                        {prize.rank}
                                                    </span>
                                                    <select
                                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-brand-primary transition appearance-none"
                                                        value={prize.itemId}
                                                        onChange={(e) => updatePrizeItem(index, e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select Item</option>
                                                        {items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                                                    </select>
                                                </div>
                                                {lotteryForm.prizes.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removePrize(index)}
                                                        className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition"
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={addPrize}
                                            className="w-full py-2 border border-dashed border-slate-700 rounded-xl text-sm text-slate-400 hover:text-brand-primary hover:border-brand-primary transition flex items-center justify-center gap-2"
                                        >
                                            <Plus size={16} /> Add Rank {lotteryForm.prizes.length + 1} Prize
                                        </button>
                                    </div>

                                    <div className="pt-4 border-t border-slate-700/50 space-y-4">
                                        <input
                                            placeholder="Ticket Price ($)"
                                            type="number"
                                            step="0.01"
                                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-brand-primary transition"
                                            value={lotteryForm.ticketPrice}
                                            onChange={(e) => setLotteryForm({ ...lotteryForm, ticketPrice: e.target.value })}
                                            required
                                        />
                                        <input
                                            placeholder="Min Tickets to Draw"
                                            type="number"
                                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-brand-primary transition"
                                            value={lotteryForm.minTickets}
                                            onChange={(e) => setLotteryForm({ ...lotteryForm, minTickets: e.target.value })}
                                            required
                                        />
                                        <input
                                            placeholder="Max Tickets (Optional)"
                                            type="number"
                                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-brand-primary transition"
                                            value={lotteryForm.maxTickets}
                                            onChange={(e) => setLotteryForm({ ...lotteryForm, maxTickets: e.target.value })}
                                        />
                                        <button type="submit" className="w-full premium-gradient py-4 rounded-xl font-bold mt-2">
                                            Launch Lottery
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Active Lotteries Management */}
                        <div className="lg:col-span-2 space-y-6">
                            {lotteries.map((lottery) => (
                                <div key={lottery.id} className="glass-effect p-6 md:p-8 rounded-2xl md:rounded-3xl">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                                        <div>
                                            <span className="text-brand-primary text-[10px] font-bold uppercase tracking-widest border border-brand-primary/30 px-3 py-1 rounded-full">
                                                {lottery.status}
                                            </span>
                                            <h4 className="text-xl md:text-2xl font-bold mt-3">{lottery.item.name}</h4>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {lottery.prizes?.map((p, i) => (
                                                    <span key={i} className="text-[9px] font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                                                        Rank {p.rank}: {p.item?.name}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="text-slate-500 text-xs mt-2">ID: #{lottery.id}</p>
                                        </div>
                                        <div className="sm:text-right">
                                            <p className="text-slate-500 text-[10px] md:text-sm mb-1 uppercase tracking-wider">Price</p>
                                            <p className="text-2xl md:text-3xl font-black text-brand-primary">${lottery.ticketPrice}</p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-800/50 rounded-xl md:rounded-2xl p-4 md:p-6 grid grid-cols-2 md:flex md:flex-wrap gap-4 md:gap-8 mb-8">
                                        <div>
                                            <p className="text-slate-500 text-[10px] uppercase mb-1">Progress</p>
                                            <p className="text-lg md:text-xl font-bold">{lottery.totalTickets} / {lottery.minTickets}</p>
                                        </div>
                                        <div className="border-l border-slate-700/50 pl-4 md:pl-0 md:border-l-0">
                                            <p className="text-slate-500 text-[10px] uppercase mb-1">Sold</p>
                                            <p className="text-lg md:text-xl font-bold">{lottery.totalTickets}</p>
                                        </div>
                                        <div className="border-t border-slate-700/50 pt-4 md:border-t-0 md:pt-0 md:border-l md:pl-8 col-span-2 md:col-span-1">
                                            <p className="text-brand-primary text-[10px] uppercase mb-1">Revenue</p>
                                            <p className="text-lg md:text-xl font-black text-brand-primary">${(lottery.totalTickets * lottery.ticketPrice).toFixed(2)}</p>
                                        </div>
                                        <button
                                            onClick={() => setEditingLottery(lottery)}
                                            className="ml-auto p-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg md:rounded-xl transition text-slate-300 hover:text-white shrink-0 hidden md:block"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        {lottery.status === 'ACTIVE' && (
                                            <button
                                                onClick={() => handleDrawWinner(lottery.id)}
                                                disabled={lottery.totalTickets < lottery.minTickets}
                                                className="flex-grow bg-brand-secondary text-white py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-base flex items-center justify-center gap-2 hover:bg-brand-secondary/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <Play size={18} className="md:w-5 md:h-5" /> Trigger Draw
                                            </button>
                                        )}
                                        {lottery.status === 'ACTIVE' && (
                                            <div className="flex gap-3 w-full sm:w-auto">
                                                <button
                                                    onClick={() => setGiftModal({ isOpen: true, lotteryId: lottery.id, selectedUserId: '', generatedCoupon: '', loading: false })}
                                                    className="flex-grow sm:flex-none sm:px-6 bg-brand-primary/10 text-brand-primary py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-base flex items-center justify-center gap-2 hover:bg-brand-primary/20 transition"
                                                    title="Gift Free Ticket"
                                                >
                                                    <Send size={18} className="md:w-5 md:h-5" /> Gift
                                                </button>
                                                <button
                                                    onClick={() => setEditingLottery(lottery)}
                                                    className="flex sm:hidden p-3.5 bg-slate-700 text-slate-300 rounded-xl items-center justify-center"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                            </div>
                                        )}
                                        {lottery.totalTickets < lottery.minTickets && (
                                            <div className="flex items-center gap-2 text-brand-accent text-[10px] md:text-sm font-medium bg-brand-accent/5 p-3 rounded-lg border border-brand-accent/20 w-full sm:w-auto">
                                                <AlertCircle size={14} className="md:w-[18px] md:h-[18px]" /> {lottery.minTickets - lottery.totalTickets} more tickets needed
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'tickets' && (
                    <motion.div
                        key="tickets"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold">Ticket Management</h2>
                            <p className="text-slate-400 text-sm">{tickets.length} total tickets</p>
                        </div>

                        <div className="glass-effect rounded-2xl md:rounded-3xl overflow-hidden border border-slate-700">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left min-w-[800px] md:min-w-full">
                                    <thead className="bg-slate-800/50 border-b border-slate-700">
                                        <tr>
                                            <th className="px-4 md:px-6 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase">User</th>
                                            <th className="px-4 md:px-6 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase">Lottery</th>
                                            <th className="px-4 md:px-6 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase">Ticket #</th>
                                            <th className="px-4 md:px-6 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase">Price</th>
                                            <th className="px-4 md:px-6 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700">
                                        {tickets.map((ticket) => (
                                            <tr key={ticket.id} className="hover:bg-slate-800/30 transition">
                                                <td className="px-4 md:px-6 py-4 md:py-5">
                                                    <div className="font-bold text-xs md:text-sm">{ticket.user.fullName}</div>
                                                    <div className="text-[10px] text-slate-500 truncate max-w-[120px]">{ticket.user.email}</div>
                                                </td>
                                                <td className="px-4 md:px-6 py-4 md:py-5">
                                                    <div className="font-medium text-xs md:text-sm">{ticket.lottery.item.name}</div>
                                                </td>
                                                <td className="px-4 md:px-6 py-4 md:py-5 font-mono text-slate-300 text-[10px] md:text-xs">{ticket.ticketNumber}</td>
                                                <td className="px-4 md:px-6 py-4 md:py-5 font-bold text-xs md:text-sm">${ticket.purchasePrice}</td>
                                                <td className="px-4 md:px-6 py-4 md:py-5 text-right">
                                                    <div className="flex flex-col items-end gap-2">
                                                        <span className={`px-2 md:px-3 py-1 rounded-full text-[9px] md:text-xs font-bold ${ticket.status === 'REFUNDED' ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
                                                            }`}>
                                                            {ticket.status}
                                                        </span>
                                                        
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {tickets.length === 0 && (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-10 text-center text-slate-500 text-sm">
                                                    No tickets found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'withdrawals' && (
                    <motion.div
                        key="withdrawals"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold">Withdrawal Requests</h2>
                        <div className="glass-effect rounded-2xl md:rounded-3xl overflow-hidden border border-slate-700">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left min-w-[700px] md:min-w-full">
                                    <thead className="bg-slate-800/50 border-b border-slate-700">
                                        <tr>
                                            <th className="px-4 md:px-6 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase">User</th>
                                            <th className="px-4 md:px-6 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase">Amount</th>
                                            <th className="px-4 md:px-6 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase text-center">Date</th>
                                            <th className="px-4 md:px-6 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700">
                                        {withdrawals.length > 0 ? (
                                            withdrawals.map((w) => (
                                                <tr key={w.id} className="hover:bg-slate-800/30 transition">
                                                    <td className="px-4 md:px-6 py-4 md:py-5">
                                                        <div className="font-bold text-xs md:text-sm">{w.user?.fullName}</div>
                                                        <div className="text-[10px] text-slate-500 truncate max-w-[120px]">{w.user?.email}</div>
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 md:py-5 font-bold text-sm md:text-lg">${w.amount.toFixed(2)}</td>
                                                    <td className="px-4 md:px-6 py-4 md:py-5 text-slate-300 text-[10px] md:text-xs text-center">
                                                        {new Date(w.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 md:py-5 text-right">
                                                        <div className="flex flex-col items-end gap-2">
                                                            <span className={`px-2 md:px-3 py-1 rounded-full text-[9px] md:text-xs font-bold ${w.status === 'APPROVED' ? 'bg-green-500/10 text-green-400' :
                                                                w.status === 'REJECTED' ? 'bg-red-500/10 text-red-400' :
                                                                    'bg-yellow-500/10 text-yellow-500'
                                                                }`}>
                                                                {w.status}
                                                            </span>
                                                            {w.status === 'PENDING' && (
                                                                <div className="flex justify-end gap-2">
                                                                    <button
                                                                        onClick={() => handleUpdateWithdrawalStatus(w.id, 'APPROVED')}
                                                                        className="p-1.5 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition"
                                                                        title="Approve"
                                                                    >
                                                                        <Check size={14} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleUpdateWithdrawalStatus(w.id, 'REJECTED')}
                                                                        className="p-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                                                                        title="Reject"
                                                                    >
                                                                        <X size={14} />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-10 text-center text-slate-500 text-sm">
                                                    No withdrawal requests found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'profile' && (
                    <motion.div
                        key="profile"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
                    >
                        <div className="space-y-6">
                            <div className="glass-effect p-6 md:p-8 rounded-2xl md:rounded-3xl">
                                <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">
                                        <UserIcon size={32} className="md:w-10 md:h-10" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold">{admin?.fullName}</h3>
                                        <p className="text-slate-400 text-sm">{admin?.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 md:space-y-4">
                                    <div className="p-3 md:p-4 bg-slate-800/50 rounded-xl md:rounded-2xl border border-slate-700 flex justify-between items-center">
                                        <span className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-widest">Admin ID</span>
                                        <span className="font-mono text-[10px] md:text-xs text-brand-primary">{admin?.id}</span>
                                    </div>
                                    <div className="p-3 md:p-4 bg-slate-800/50 rounded-xl md:rounded-2xl border border-slate-700 flex justify-between items-center">
                                        <span className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-widest">Role</span>
                                        <span className="font-bold text-[10px] md:text-xs bg-brand-primary/10 text-brand-primary px-2.5 py-1 rounded-full">{admin?.role}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="glass-effect p-6 md:p-8 rounded-2xl md:rounded-3xl">
                                <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2">
                                    <Shield size={20} className="text-brand-secondary" />
                                    Security Settings
                                </h3>
                                <form onSubmit={handlePasswordChange} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider text-[10px] md:text-xs">Current Password</label>
                                        <div className="relative">
                                            <Lock size={16} className="absolute left-4 top-3.5 text-slate-500 md:w-[18px] md:h-[18px]" />
                                            <input
                                                type="password"
                                                value={passwordData.oldPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-11 md:pl-12 pr-4 outline-none focus:border-brand-primary transition text-sm md:text-base"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider text-[10px] md:text-xs">New Password</label>
                                        <div className="relative">
                                            <Lock size={16} className="absolute left-4 top-3.5 text-brand-primary md:w-[18px] md:h-[18px]" />
                                            <input
                                                type="password"
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-11 md:pl-12 pr-4 outline-none focus:border-brand-primary transition text-sm md:text-base"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider text-[10px] md:text-xs">Confirm New Password</label>
                                        <div className="relative">
                                            <Lock size={16} className="absolute left-4 top-3.5 text-brand-primary md:w-[18px] md:h-[18px]" />
                                            <input
                                                type="password"
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-11 md:pl-12 pr-4 outline-none focus:border-brand-primary transition text-sm md:text-base"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-slate-700 hover:bg-slate-600 py-3.5 md:py-3 rounded-xl font-bold text-white transition mt-2 text-sm md:text-base"
                                    >
                                        Update Password
                                    </button>
                                </form>
                                {message.text && (
                                    <p className={`mt-4 text-xs md:text-sm text-center font-medium ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                        {message.text}
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Gift Coupon Modal */}
            <AnimatePresence>
                {giftModal.isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setGiftModal({ ...giftModal, isOpen: false })}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg glass-effect p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-700 shadow-2xl"
                        >
                            <button
                                onClick={() => setGiftModal({ ...giftModal, isOpen: false })}
                                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-slate-400 hover:text-white transition"
                            >
                                <X size={20} className="md:w-6 md:h-6" />
                            </button>

                            <div className="text-center mb-6 md:mb-8">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-primary/10 text-brand-primary rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Send size={24} className="md:w-8 md:h-8" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold">Gift Free Ticket</h3>
                                <p className="text-slate-500 text-xs md:text-sm">Generate a free ticket coupon for a specific user</p>
                            </div>

                            {giftModal.generatedCoupon ? (
                                <div className="space-y-4 md:space-y-6">
                                    <div className="bg-green-500/10 border border-green-500/30 p-4 md:p-6 rounded-xl md:rounded-2xl text-center">
                                        <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mb-2">Coupon Generated!</p>
                                        <p className="text-2xl md:text-3xl font-mono font-black text-white tracking-wider">
                                            {giftModal.generatedCoupon}
                                        </p>
                                    </div>
                                    <p className="text-slate-400 text-xs text-center">
                                        Send this code to the user. They can redeem it on the lottery checkout page.
                                    </p>
                                    <button
                                        onClick={() => setGiftModal({ ...giftModal, isOpen: false })}
                                        className="w-full py-3.5 md:py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition text-sm md:text-base"
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleGiftCoupon} className="space-y-4 md:space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs md:text-sm font-bold text-slate-400 ml-1">Select User</label>
                                        <select
                                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3.5 md:py-4 px-4 outline-none focus:border-brand-primary transition text-white appearance-none text-sm md:text-base"
                                            value={giftModal.selectedUserId}
                                            onChange={(e) => setGiftModal({ ...giftModal, selectedUserId: e.target.value })}
                                            required
                                        >
                                            <option value="">-- Choose a user --</option>
                                            {users.map(u => (
                                                <option key={u.id} value={u.id}>
                                                    {u.fullName || 'No Name'} ({u.email || u.phoneNumber})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={giftModal.loading || !giftModal.selectedUserId}
                                        className="w-full premium-gradient py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold text-white shadow-xl shadow-brand-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm md:text-base"
                                    >
                                        {giftModal.loading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <Plus size={18} className="md:w-5 md:h-5" /> Generate Free Coupon
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Draw Spinner Modal */}
            <AnimatePresence>
                {drawingState.isDrawing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-[110] flex items-center justify-center p-4 md:p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="text-center max-w-2xl w-full"
                        >
                            <Trophy className={`mx-auto mb-6 md:mb-8 ${drawingState.showResult ? 'text-yellow-400 animate-bounce' : 'text-slate-600'}`} size={drawingState.showResult ? 60 : 40} />

                            <h2 className="text-2xl md:text-4xl font-black mb-8 md:mb-12 uppercase tracking-tighter">
                                {drawingState.showResult ? 'We Have a Winner!' : 'Selecting Winner...'}
                            </h2>

                            <div className="relative h-32 md:h-48 flex items-center justify-center overflow-hidden mb-8 md:mb-12">
                                <motion.div
                                    key={drawingState.currentSelection}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -50, opacity: 0 }}
                                    className="text-5xl md:text-8xl font-black font-mono text-brand-primary"
                                >
                                    #{drawingState.currentSelection}
                                </motion.div>
                            </div>

                            {drawingState.showResult && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4 md:space-y-6"
                                >
                                    <div className="grid grid-cols-1 gap-3 md:gap-4 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                        {drawingState.winner?.map((prize, idx) => (
                                            <div key={idx} className="glass-effect p-4 md:p-6 rounded-2xl md:rounded-3xl border border-yellow-400/30 bg-yellow-400/5 flex items-center gap-4 md:gap-6 text-left">
                                                <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 text-slate-900 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-lg md:text-xl shrink-0">
                                                    {prize.rank}
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="text-slate-400 uppercase tracking-widest text-[8px] md:text-[10px] font-bold mb-1">Winner of {prize.item?.name}</p>
                                                    <h3 className="text-base md:text-xl font-bold truncate max-w-[150px] md:max-w-none">{prize.winner?.fullName || prize.winnerId}</h3>
                                                    {prize.winnerTicketNumber && (
                                                        <div className="text-[10px] md:text-sm font-bold text-brand-primary">Ticket #{prize.winnerTicketNumber}</div>
                                                    )}
                                                </div>
                                                <div className="text-right hidden xs:block">
                                                    <p className="text-brand-primary font-mono text-[8px] md:text-sm font-bold">LUCKY DRAW</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setDrawingState({ isDrawing: false, candidates: [], winner: null, currentSelection: null, showResult: false })}
                                        className="premium-gradient px-8 md:px-12 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg shadow-xl shadow-brand-primary/20 mt-4"
                                    >
                                        Back to Dashboard
                                    </button>
                                </motion.div>
                            )}

                            {!drawingState.showResult && (
                                <div className="flex justify-center gap-2">
                                    {[0, 1, 2].map(i => (
                                        <motion.div
                                            key={i}
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                            transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
                                            className="w-2 md:w-3 h-2 md:h-3 bg-brand-primary rounded-full"
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Edit Lottery Modal-like Overlay */}
            <AnimatePresence>
                {editingLottery && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[120] flex items-center justify-center p-4 md:p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-effect p-6 md:p-10 rounded-2xl md:rounded-3xl w-full max-w-lg shadow-2xl border border-slate-700/50 max-h-[90vh] overflow-y-auto custom-scrollbar"
                        >
                            <div className="flex justify-between items-center mb-6 md:mb-8">
                                <h3 className="text-xl md:text-2xl font-bold">Edit Lottery</h3>
                                <button
                                    onClick={() => setEditingLottery(null)}
                                    className="p-2 hover:bg-slate-800 rounded-xl transition text-slate-400"
                                >
                                    <X size={20} className="md:w-6 md:h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleUpdateLottery} className="space-y-4 md:space-y-6">
                                <div>
                                    <label className="block text-[10px] md:text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Ticket Price ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 md:py-4 px-4 md:px-5 outline-none focus:border-brand-primary transition text-base md:text-lg"
                                        value={editingLottery.ticketPrice}
                                        onChange={(e) => setEditingLottery({ ...editingLottery, ticketPrice: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] md:text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Min Tickets to Draw</label>
                                    <input
                                        type="number"
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 md:py-4 px-4 md:px-5 outline-none focus:border-brand-primary transition text-base md:text-lg"
                                        value={editingLottery.minTickets}
                                        onChange={(e) => setEditingLottery({ ...editingLottery, minTickets: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] md:text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Max Tickets (Optional)</label>
                                    <input
                                        type="number"
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 md:py-4 px-4 md:px-5 outline-none focus:border-brand-primary transition text-base md:text-lg"
                                        value={editingLottery.maxTickets || ''}
                                        onChange={(e) => setEditingLottery({ ...editingLottery, maxTickets: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] md:text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Status</label>
                                    <select
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 md:py-4 px-4 md:px-5 outline-none focus:border-brand-primary transition text-sm md:text-lg appearance-none"
                                        value={editingLottery.status}
                                        onChange={(e) => setEditingLottery({ ...editingLottery, status: e.target.value })}
                                        required
                                    >
                                        <option value="DRAFT">DRAFT</option>
                                        <option value="ACTIVE">ACTIVE</option>
                                        <option value="LOCKED">LOCKED</option>
                                        <option value="DRAWN">DRAWN</option>
                                        <option value="CANCELLED">CANCELLED</option>
                                        <option value="COMPLETED">COMPLETED</option>
                                    </select>
                                </div>

                                <div className="flex gap-3 md:gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setEditingLottery(null)}
                                        className="flex-grow bg-slate-800 text-white py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold hover:bg-slate-700 transition text-sm md:text-base"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-grow premium-gradient text-white py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 text-sm md:text-base"
                                    >
                                        Save <span className="hidden xs:inline">Changes</span> <Save size={18} className="md:w-5 md:h-5" />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
