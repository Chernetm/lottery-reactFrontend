import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { changePassword } from '../api/auth';
import { getMyTickets, revealTicket } from '../api/ticket';
import { Ticket, Trophy, Clock, ArrowUpRight, Plus, User as UserIcon, Lock, Shield, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DrawAnimation from '../components/DrawAnimation';

// User Components
import UserStatsCards from '../components/user/UserStatsCards';
import RecentTickets from '../components/user/RecentTickets';
import UserProfile from '../components/user/UserProfile';
import SecuritySettings from '../components/user/SecuritySettings';
import WinnersModal from '../components/user/WinnersModal';

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
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
                <AnimatePresence>
                    {showDrawAnimation && animatingTicket && (
                        <DrawAnimation
                            lottery={animatingTicket.lottery}
                            ticket={animatingTicket}
                            onFinish={handleAnimationFinish}
                        />
                    )}
                </AnimatePresence>
                <div className="mb-8 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-1 md:mb-2 text-slate-900">Hello, {user.fullName}!</h1>
                        <p className="text-slate-500 text-sm md:text-base">Track your lucky tickets and winnings here.</p>
                    </div>
                    <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 w-full md:w-auto shadow-sm overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-6 py-2 rounded-xl font-bold text-sm md:text-base transition whitespace-nowrap ${activeTab === 'overview' ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`px-6 py-2 rounded-xl font-bold text-sm md:text-base transition whitespace-nowrap ${activeTab === 'profile' ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20' : 'text-slate-500 hover:text-slate-900'}`}
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
                        <UserStatsCards stats={stats} setIsWinnersModalOpen={setIsWinnersModalOpen} />

                        <div className="grid grid-cols-1 gap-12">
                            <RecentTickets 
                                stats={stats} 
                                handleReveal={handleReveal} 
                                spinningId={spinningId} 
                            />
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
                        <UserProfile user={user} />
                        
                        <SecuritySettings 
                            passwordData={passwordData} 
                            setPasswordData={setPasswordData} 
                            handlePasswordChange={handlePasswordChange} 
                            message={message} 
                        />
                    </motion.div>
                )}
            </AnimatePresence>
                <WinnersModal
                    isOpen={isWinnersModalOpen}
                    onClose={() => setIsWinnersModalOpen(false)}
                    winnersList={stats.wonItems || []}
                />
            </div>
        </div>
    );
};

export default UserDashboard;
