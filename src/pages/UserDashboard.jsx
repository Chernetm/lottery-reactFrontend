import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { changePassword } from '../api/auth';
import { getMyTickets, revealTicket } from '../api/ticket';
import { Ticket, Trophy, Clock, ArrowUpRight, Plus, User as UserIcon, Lock, Shield, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DrawAnimation from '../components/DrawAnimation';

const UserDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        ticketsBought: 0,
        lotteriesWon: 0,
        recentTickets: [],
    });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [spinningId, setSpinningId] = useState(null);
    const [isWinnersModalOpen, setIsWinnersModalOpen] = useState(false);

    const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showDrawAnimation, setShowDrawAnimation] = useState(false);
    const [animatingTicket, setAnimatingTicket] = useState(null);

    const fetchDashboardData = async () => {
        try {
            const [historyRes] = await Promise.all([
                getMyTickets(),
            ]);

            const wonTickets = historyRes.filter(t => t.status === 'WON');

            setStats({
                ticketsBought: historyRes.length,
                lotteriesWon: wonTickets.length,
                recentTickets: historyRes,
                wonItems: wonTickets
            });
        } catch (error) {
            console.error('Failed to fetch dashboard data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [user.id]);

    const handleReveal = async (ticket) => {
        setAnimatingTicket(ticket);
        setShowDrawAnimation(true);
    };

    const handleAnimationFinish = async () => {
        if (!animatingTicket) return;

        setSpinningId(animatingTicket.id);
        setShowDrawAnimation(false);
        try {
            await revealTicket(animatingTicket.id);
            await fetchDashboardData();
        } catch (error) {
            console.error('Failed to reveal ticket', error);
            setMessage({ type: 'error', text: 'Failed to reveal ticket' });
        } finally {
            setSpinningId(null);
            setAnimatingTicket(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const statCards = [
        { label: 'Buy Tickets', value: 'New Draw', icon: Plus, color: 'text-brand-primary', bg: 'bg-brand-primary/10', link: '/lotteries' },
        { label: 'Tickets Bought', value: stats.ticketsBought, icon: Ticket, color: 'text-brand-secondary', bg: 'bg-brand-secondary/10' },
        { label: 'Winning Draws', value: stats.lotteriesWon, icon: Trophy, color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
    ];

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


    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <AnimatePresence>
                {showDrawAnimation && animatingTicket && (
                    <DrawAnimation
                        lottery={animatingTicket.lottery}
                        ticket={animatingTicket}
                        onFinish={handleAnimationFinish}
                    />
                )}
            </AnimatePresence>
            <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Hello, {user.fullName}!</h1>
                    <p className="text-slate-400">Track your lucky tickets and winnings here.</p>
                </div>
                <div className="flex bg-slate-800/50 p-1 rounded-2xl border border-slate-700 w-full md:w-auto overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-6 py-2 rounded-xl font-bold transition whitespace-nowrap ${activeTab === 'overview' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-slate-400 hover:text-white'}`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`px-6 py-2 rounded-xl font-bold transition whitespace-nowrap ${activeTab === 'profile' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-slate-400 hover:text-white'}`}
                    >
                        Profile
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            {statCards.map((stat, i) => (
                                stat.link ? (
                                    <Link
                                        key={i}
                                        to={stat.link}
                                        className="glass-effect p-4 md:p-8 rounded-2xl md:rounded-3xl flex items-center justify-between hover:border-brand-primary/50 transition group"
                                    >
                                        <div>
                                            <p className="text-slate-500 text-[10px] md:text-sm font-medium mb-0.5 md:mb-1">{stat.label}</p>
                                            <h3 className="text-xl md:text-3xl font-bold group-hover:text-brand-primary transition">{stat.value}</h3>
                                        </div>
                                        <div className={`p-2.5 md:p-4 rounded-xl md:rounded-2xl ${stat.bg} ${stat.color} group-hover:bg-brand-primary group-hover:text-white transition`}>
                                            <stat.icon size={20} className="md:w-7 md:h-7" />
                                        </div>
                                    </Link>
                                ) : (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        onClick={() => stat.label === 'Winning Draws' && setIsWinnersModalOpen(true)}
                                        className={`glass-effect p-4 md:p-8 rounded-2xl md:rounded-3xl flex items-center justify-between ${stat.label === 'Winning Draws' ? 'cursor-pointer hover:border-brand-accent/50 transition' : ''}`}
                                    >
                                        <div>
                                            <p className="text-slate-500 text-[10px] md:text-sm font-medium mb-0.5 md:mb-1">{stat.label}</p>
                                            <h3 className="text-xl md:text-3xl font-bold">{stat.value}</h3>
                                            {stat.label === 'Winning Draws' && stats.lotteriesWon > 0 && (
                                                <p className="text-brand-accent text-[9px] md:text-xs font-bold mt-0.5 md:mt-1 uppercase tracking-wider">View items</p>
                                            )}
                                        </div>
                                        <div className={`p-2.5 md:p-4 rounded-xl md:rounded-2xl ${stat.bg} ${stat.color}`}>
                                            <stat.icon size={20} className="md:w-7 md:h-7" />
                                        </div>
                                    </motion.div>
                                )
                            ))}
                        </div>

                        <div className="grid grid-cols-1 gap-12">
                            {/* Recent Tickets Table */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold">Recent Tickets</h2>
                                    <Link to="/tickets" className="text-brand-primary font-semibold hover:underline flex items-center gap-1 text-sm">
                                        View all history <ArrowUpRight size={14} />
                                    </Link>
                                </div>

                                <div className="glass-effect rounded-3xl overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead className="bg-slate-800/50 border-b border-slate-700">
                                                <tr>
                                                    <th className="px-4 py-3 text-[10px] md:text-xs font-bold text-slate-500 uppercase">Lottery</th>
                                                    <th className="px-4 py-3 text-[10px] md:text-xs font-bold text-slate-500 uppercase text-center">Ticket #</th>
                                                    <th className="px-4 py-3 text-[10px] md:text-xs font-bold text-slate-500 uppercase text-right">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-700">
                                                {stats.recentTickets.length > 0 ? (
                                                    stats.recentTickets.map((ticket) => (
                                                        <tr key={ticket.id} className="hover:bg-slate-800/30 transition">
                                                            <td className="px-4 py-4">
                                                                <div className="font-bold text-xs md:text-sm">{ticket.lottery.item.name}</div>
                                                                <div className="text-[10px] text-slate-500">#{ticket.lottery.id}</div>
                                                            </td>
                                                            <td className="px-4 py-4 font-mono text-slate-300 text-xs md:text-sm text-center">{ticket.ticketNumber}</td>
                                                            <td className="px-4 py-4 text-right">
                                                                {ticket.lottery.status === 'DRAWN' ? (
                                                                    ticket.isRevealed ? (
                                                                        ticket.status === 'WON' ? (
                                                                            <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded-full text-[10px] font-bold uppercase whitespace-nowrap">
                                                                                WON
                                                                            </span>
                                                                        ) : (
                                                                            <span className="bg-slate-700/50 text-slate-400 px-2 py-1 rounded-full text-[10px] font-bold whitespace-nowrap">LOST</span>
                                                                        )
                                                                    ) : (
                                                                        <button
                                                                            onClick={() => handleReveal(ticket)}
                                                                            disabled={spinningId === ticket.id}
                                                                            className="inline-flex items-center gap-1.5 bg-brand-primary text-white px-3 py-1 rounded-full text-[10px] font-bold hover:bg-brand-primary/90 transition shadow-lg shadow-brand-primary/20 disabled:opacity-50 whitespace-nowrap"
                                                                        >
                                                                            {spinningId === ticket.id ? (
                                                                                <>
                                                                                    <Loader2 size={10} className="animate-spin" />
                                                                                    ...
                                                                                </>
                                                                            ) : (
                                                                                'REVEAL'
                                                                            )}
                                                                        </button>
                                                                    )
                                                                ) : (
                                                                    <span className="bg-brand-primary/10 text-brand-primary px-2 py-1 rounded-full text-[10px] font-bold uppercase">ACTIVE</span>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="3" className="px-4 py-8 text-center text-slate-500 text-sm">
                                                            No tickets purchased yet.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}


                {activeTab === 'profile' && (
                    <motion.div
                        key="profile"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                    >
                        <div className="space-y-6">
                            <div className="glass-effect p-8 rounded-3xl">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">
                                        <UserIcon size={40} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">{user.fullName}</h3>
                                        <p className="text-slate-400">{user.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700 flex justify-between items-center">
                                        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Account ID</span>
                                        <span className="font-mono text-xs text-brand-primary">{user.id}</span>
                                    </div>
                                    <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700 flex justify-between items-center">
                                        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Phone Number</span>
                                        <span className="font-medium">{user.phoneNumber}</span>
                                    </div>
                                    <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700 flex justify-between items-center">
                                        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Joined</span>
                                        <span className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="glass-effect p-8 rounded-3xl">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Shield size={20} className="text-brand-secondary" />
                                    Security Settings
                                </h3>
                                <form onSubmit={handlePasswordChange} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider text-xs">Current Password</label>
                                        <div className="relative">
                                            <Lock size={18} className="absolute left-4 top-3.5 text-slate-500" />
                                            <input
                                                type="password"
                                                value={passwordData.oldPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-brand-primary transition"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider text-xs">New Password</label>
                                        <div className="relative">
                                            <Lock size={18} className="absolute left-4 top-3.5 text-brand-primary" />
                                            <input
                                                type="password"
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-brand-primary transition"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider text-xs">Confirm New Password</label>
                                        <div className="relative">
                                            <Lock size={18} className="absolute left-4 top-3.5 text-brand-primary" />
                                            <input
                                                type="password"
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-brand-primary transition"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-slate-700 hover:bg-slate-600 py-3 rounded-xl font-bold text-white transition mt-2"
                                    >
                                        Update Password
                                    </button>
                                </form>
                                {message.text && (
                                    <p className={`mt-4 text-sm text-center font-medium ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                        {message.text}
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <WinnersModal
                isOpen={isWinnersModalOpen}
                onClose={() => setIsWinnersModalOpen(false)}
                winnersList={stats.wonItems || []}
            />
        </div>
    );
};

const WinnersModal = ({ isOpen, onClose, winnersList }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-brand-accent/10 text-brand-accent rounded-lg">
                                    <Trophy size={24} />
                                </div>
                                <h2 className="text-2xl font-bold">Your Winnings</h2>
                            </div>
                            <button onClick={onClose} className="text-slate-500 hover:text-white transition">
                                <ArrowUpRight size={24} className="rotate-45" />
                            </button>
                        </div>

                        <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                            {winnersList.length > 0 ? (
                                winnersList.map((win) => (
                                    <div key={win.id} className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl flex items-center gap-4 text-left">
                                        <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary font-bold flex-shrink-0">
                                            #{win.ticketNumber}
                                        </div>
                                        <div className="min-w-0 flex-grow">
                                            <div className="font-bold text-lg truncate">
                                                {win.wonPrize?.item?.name || win.lottery.item.name}
                                            </div>
                                            <div className="text-xs text-brand-primary font-bold uppercase tracking-wider mb-1">
                                                {win.wonPrize?.rank === 1 ? '🥇 1st Prize' :
                                                    win.wonPrize?.rank === 2 ? '🥈 2nd Prize' :
                                                        win.wonPrize?.rank === 3 ? '🥉 3rd Prize' :
                                                            `🎁 Rank ${win.wonPrize?.rank || 1} Prize`}
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                Won on {new Date(win.lottery.updatedAt || win.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-slate-500 italic">
                                    Reveal your tickets to see your items here!
                                </div>
                            )}
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full mt-8 bg-brand-primary py-3 rounded-xl font-bold text-white hover:bg-brand-primary/90 transition shadow-lg shadow-brand-primary/20"
                        >
                            Great!
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default UserDashboard;
