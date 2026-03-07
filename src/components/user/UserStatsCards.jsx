import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ticket, Trophy, Plus } from 'lucide-react';

const UserStatsCards = ({ stats, setIsWinnersModalOpen }) => {
    const statCards = [
        { label: 'Buy Tickets', value: 'New Draw', icon: Plus, color: 'text-brand-primary', bg: 'bg-brand-primary/10', link: '/lotteries' },
        { label: 'Tickets Bought', value: stats.ticketsBought, icon: Ticket, color: 'text-brand-secondary', bg: 'bg-brand-secondary/10' },
        { label: 'Winning Draws', value: stats.lotteriesWon, icon: Trophy, color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {statCards.map((stat, i) => (
                stat.link ? (
                    <Link
                        key={i}
                        to={stat.link}
                        className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-5 md:p-8 rounded-2xl md:rounded-3xl flex items-center justify-between hover:border-brand-primary/50 hover:-translate-y-1 transition-all group"
                    >
                        <div>
                            <p className="text-slate-500 text-[10px] md:text-sm font-semibold mb-0.5 md:mb-1 uppercase tracking-wider">{stat.label}</p>
                            <h3 className="text-xl md:text-3xl font-extrabold text-slate-900 group-hover:text-brand-primary transition">{stat.value}</h3>
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
                        className={`bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-5 md:p-8 rounded-2xl md:rounded-3xl flex items-center justify-between hover:-translate-y-1 transition-all ${stat.label === 'Winning Draws' ? 'cursor-pointer hover:border-brand-accent/50' : ''}`}
                    >
                        <div>
                            <p className="text-slate-500 text-[10px] md:text-sm font-semibold mb-0.5 md:mb-1 uppercase tracking-wider">{stat.label}</p>
                            <h3 className="text-xl md:text-3xl font-extrabold text-slate-900">{stat.value}</h3>
                            {stat.label === 'Winning Draws' && stats.lotteriesWon > 0 && (
                                <p className="text-brand-accent text-[8px] md:text-xs font-black mt-1 md:mt-2 uppercase tracking-widest bg-brand-accent/5 px-2 py-0.5 rounded-full w-fit">View items</p>
                            )}
                        </div>
                        <div className={`p-2.5 md:p-4 rounded-xl md:rounded-2xl ${stat.bg} ${stat.color}`}>
                            <stat.icon size={20} className="md:w-7 md:h-7" />
                        </div>
                    </motion.div>
                )
            ))}
        </div>
    );
};

export default UserStatsCards;
