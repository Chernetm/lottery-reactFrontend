import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Ticket, Users } from 'lucide-react';

const StatsOverview = ({ stats }) => {
    return (
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
    );
};

export default StatsOverview;
