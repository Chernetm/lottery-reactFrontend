import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { getAllLotteries } from '../api/lottery';
import { Link } from 'react-router-dom';

const Home = () => {
    const [activeLotteries, setActiveLotteries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLotteries = async () => {
            try {
                const data = await getAllLotteries('ACTIVE');
                setActiveLotteries(data);
            } catch (error) {
                console.error('Failed to fetch lotteries', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLotteries();
    }, []);

    return (
        <div className="flex flex-col gap-24 pb-24">
            {/* Hero Section */}
            <section className="relative pt-20 pb-12 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 bg-slate-800/50 border border-brand-primary/30 px-4 py-2 rounded-full text-brand-primary text-sm font-medium mb-8"
                    >
                        <Sparkles size={16} />
                        <span>Over $1M in prizes won this month</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
                    >
                        Your Path to <span className="premium-text-gradient">Financial Freedom</span> Starts Here
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-slate-400 text-lg md:text-xl max-w-2xl mb-12"
                    >
                        Experience the thrill of the draw with the world's most transparent lottery platform. Provably fair, instant payouts, and life-changing prizes.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link to="/register" className="premium-gradient px-8 py-4 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center gap-2">
                            Get Started Now <ArrowRight size={20} />
                        </Link>
                        <Link to="/how-it-works" className="bg-slate-800 border border-slate-700 px-8 py-4 rounded-xl text-white font-bold text-lg hover:bg-slate-700 transition">
                            How it Works
                        </Link>
                    </motion.div>
                </div>

                {/* Background blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-primary/10 blur-[120px] rounded-full -z-0"></div>
            </section>

            {/* Stats Section */}
            <section className="px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: 'Active Users', value: '50K+', icon: Users },
                        { label: 'Total Prizes', value: '$2.5M', icon: Trophy },
                        { label: 'Fair Plays', value: '100%', icon: ShieldCheck },
                        { label: 'Draws Daily', value: '24/7', icon: Sparkles },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="glass-effect p-6 rounded-2xl flex flex-col items-center text-center"
                        >
                            <stat.icon className="text-brand-primary mb-4" size={32} />
                            <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                            <p className="text-slate-500 text-sm">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Active Lotteries */}
            <section className="px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Lotteries</h2>
                            <p className="text-slate-400">Join a draw and win amazing tech and gadgets.</p>
                        </div>
                        <Link to="/active-lotteries" className="text-brand-primary font-semibold hover:underline flex items-center gap-1">
                            View all <ArrowRight size={16} />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="glass-effect h-[400px] rounded-2xl animate-pulse bg-slate-800/50"></div>
                            ))}
                        </div>
                    ) : activeLotteries.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {activeLotteries.map((lottery) => (
                                <motion.div
                                    key={lottery.id}
                                    whileHover={{ y: -10 }}
                                    className="glass-effect rounded-2xl overflow-hidden group"
                                >
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={lottery.item.imageUrl || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop'}
                                            alt={lottery.item.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                        />
                                        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                                            <div className="bg-brand-primary px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                                                LIVE
                                            </div>
                                            {lottery.prizes && lottery.prizes.length > 1 && (
                                                <div className="bg-slate-900/80 backdrop-blur-sm border border-brand-primary/30 px-3 py-1 rounded-full text-[10px] font-bold text-brand-primary shadow-lg flex items-center gap-1">
                                                    <Trophy size={10} /> {lottery.prizes.length} PRIZES
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2">{lottery.item.name}</h3>
                                        <p className="text-slate-400 text-sm mb-6 line-clamp-2">{lottery.item.description}</p>

                                        <div className="flex justify-between items-center mb-6">
                                            <div>
                                                <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Ticket Price</p>
                                                <p className="text-2xl font-bold text-brand-primary">${lottery.ticketPrice}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Items in stock</p>
                                                <p className="text-lg font-semibold">{lottery.maxTickets ? `${lottery.totalTickets}/${lottery.maxTickets}` : lottery.totalTickets}</p>
                                            </div>
                                        </div>

                                        <Link
                                            to={`/lottery/${lottery.id}`}
                                            className="block w-full text-center py-3 bg-slate-800 border border-slate-700 rounded-xl font-bold hover:bg-brand-primary hover:border-brand-primary transition-all"
                                        >
                                            Buy Ticket
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="glass-effect p-20 rounded-2xl text-center">
                            <p className="text-slate-400 text-lg">No active lotteries at the moment. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
