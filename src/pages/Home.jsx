import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Users, ShieldCheck, ArrowRight, Star, Zap, Shield, Gift } from 'lucide-react';
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

    const features = [
        {
            icon: Shield,
            title: "Provably Fair",
            description: "Advanced blockchain-inspired algorithms ensure every draw is 100% transparent and untamperable.",
            color: "text-blue-400",
            bg: "bg-blue-500/10"
        },
        {
            icon: Zap,
            title: "Instant Wins",
            description: "No waiting around. Prizes are credited to your wallet immediately after the winning spin.",
            color: "text-yellow-400",
            bg: "bg-yellow-500/10"
        },
        {
            icon: Gift,
            title: "Daily Rewards",
            description: "Active players get exclusive access to free coupons and specialized jackpot draws.",
            color: "text-emerald-400",
            bg: "bg-emerald-500/10"
        }
    ];

    return (
        <div className="flex flex-col gap-32 pb-32 overflow-hidden">
            {/* Magnificent Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 px-6 overflow-hidden">
                {/* Dynamic Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full -z-10">
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-brand-primary/20 blur-[150px] rounded-full"
                    />
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.3, 1],
                            rotate: [0, -90, 0],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-brand-secondary/20 blur-[150px] rounded-full"
                    />
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
                    <div className="text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 bg-slate-900/50 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full text-brand-primary text-sm font-bold mb-8 shadow-2xl"
                        >
                            <Sparkles size={16} className="animate-pulse" />
                            <span className="uppercase tracking-widest text-[10px] md:text-xs">The Future of Luck is Here</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter"
                        >
                            Dream <span className="premium-text-gradient">Big</span>,<br />
                            Win <span className="text-white border-b-8 border-brand-primary/30">Bigger</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-slate-400 text-lg md:text-xl max-w-xl mb-12 leading-relaxed"
                        >
                            Welcome to <span className="text-white font-bold">habeshaLottery</span>. Join thousands of winners on the most transparent and rewarding lottery experience ever built.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
                        >
                            <Link to="/register" className="premium-gradient px-10 py-5 rounded-2xl text-white font-black text-lg hover:shadow-[0_0_50px_rgba(251,191,36,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                                Start Winning <ArrowRight size={24} />
                            </Link>
                            <Link to="/lotteries" className="bg-slate-900/50 backdrop-blur-md border border-white/10 px-10 py-5 rounded-2xl text-white font-black text-lg hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-3">
                                Browse Draws
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="hidden lg:block relative"
                    >
                        <div className="relative z-10 animate-float">
                            <div className="glass-effect p-8 rounded-[3rem] border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-800">
                                     <img 
                                        src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800&auto=format&fit=crop" 
                                        alt="Lifestyle" 
                                        className="w-full h-full object-cover"
                                     />
                                </div>
                                <div className="mt-8 flex justify-between items-center">
                                    <div>
                                        <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-1">Weekly Jackpot</p>
                                        <h4 className="text-4xl font-black text-white">$1,250,000</h4>
                                    </div>
                                    <div className="w-16 h-16 rounded-2xl premium-gradient flex items-center justify-center shadow-lg shadow-brand-primary/20">
                                        <Star className="text-white" size={32} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-primary rounded-full blur-[80px] opacity-30"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-secondary rounded-full blur-[80px] opacity-30"></div>
                    </motion.div>
                </div>
            </section>

            {/* High-Impact Features */}
            <section className="px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-effect p-10 rounded-[2.5rem] group hover:bg-white/5 transition-colors"
                            >
                                <div className={`w-16 h-16 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                    <feature.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="px-6">
                <div className="max-w-7xl mx-auto glass-effect rounded-[3rem] p-12 border-white/5 bg-gradient-to-r from-slate-900/80 to-slate-800/80">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                        {[
                            { label: 'Lucky Winners', value: '12,450+', icon: Trophy },
                            { label: 'Community Strength', value: '85K+', icon: Users },
                            { label: 'Security Score', value: '100%', icon: ShieldCheck },
                            { label: 'Uptime', value: '99.9%', icon: Zap },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-center mb-4">
                                     <stat.icon className="text-brand-primary/50" size={24} />
                                </div>
                                <h4 className="text-4xl font-black text-white tracking-tighter">{stat.value}</h4>
                                <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Active Lotteries Grid */}
            <section className="px-6 relative">
                 <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 blur-[100px] -z-10 rounded-full"></div>
                
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                        <div className="text-center md:text-left">
                            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Live Opportunities</h2>
                            <p className="text-slate-400 text-lg max-w-xl">Don't miss your chance. Every ticket is a step closer to your next magnificent win.</p>
                        </div>
                        <Link to="/lotteries" className="premium-text-gradient font-black text-lg flex items-center gap-2 group">
                            Explore All Draws <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="glass-effect h-[500px] rounded-[2.5rem] animate-pulse"></div>
                            ))}
                        </div>
                    ) : activeLotteries.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {activeLotteries.map((lottery) => (
                                <motion.div
                                    key={lottery.id}
                                    whileHover={{ y: -15, scale: 1.02 }}
                                    className="glass-effect rounded-[2.5rem] overflow-hidden group border-white/5 hover:border-brand-primary/30 transition-all duration-500 shadow-2xl"
                                >
                                    <div className="h-64 overflow-hidden relative">
                                        <img
                                            src={lottery.item.imageUrl || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop'}
                                            alt={lottery.item.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60"></div>
                                        <div className="absolute top-6 left-6">
                                             <div className="bg-brand-primary text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                                                Active Now
                                            </div>
                                        </div>
                                        <div className="absolute bottom-6 right-6 flex flex-col gap-2 items-end">
                                            {lottery.prizes && lottery.prizes.length > 1 && (
                                                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-black text-white shadow-lg flex items-center gap-2 uppercase tracking-widest">
                                                    <Trophy size={12} className="text-brand-primary" /> {lottery.prizes.length} Big Prizes
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-10">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-2xl font-black group-hover:text-brand-primary transition-colors">{lottery.item.name}</h3>
                                            <span className="text-slate-500 font-mono text-sm">#{lottery.id}</span>
                                        </div>
                                        <p className="text-slate-400 text-sm mb-8 line-clamp-2 leading-relaxed">{lottery.item.description}</p>

                                        <div className="grid grid-cols-2 gap-6 mb-10">
                                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:border-brand-primary/20 transition-colors text-center">
                                                <p className="text-slate-500 text-[10px] uppercase tracking-widest font-black mb-1">Ticket Price</p>
                                                <p className="text-2xl font-black text-white">${lottery.ticketPrice}</p>
                                            </div>
                                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:border-brand-primary/20 transition-colors text-center">
                                                <p className="text-slate-500 text-[10px] uppercase tracking-widest font-black mb-1">Items Left</p>
                                                <p className="text-2xl font-black text-white">{lottery.maxTickets ? `${lottery.totalTickets}/${lottery.maxTickets}` : lottery.totalTickets}</p>
                                            </div>
                                        </div>

                                        <Link
                                            to={`/lottery/${lottery.id}`}
                                            className="block w-full text-center py-5 premium-gradient rounded-2xl font-black text-white hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 transform active:scale-95"
                                        >
                                            Enter Draw Now
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="glass-effect p-24 rounded-[3rem] text-center border-white/5">
                            <Sparkles className="mx-auto text-brand-primary/20 mb-6" size={64} />
                            <h3 className="text-3xl font-black mb-4 uppercase">Next Draw Coming Soon</h3>
                            <p className="text-slate-500 text-lg max-w-md mx-auto">We're preparing something magnificent. Stay tuned for our next big giveaway.</p>
                        </div>
                    )}
                </div>
            </section>

             {/* Mega Call to Action */}
             <section className="px-6 py-20">
                <div className="max-w-7xl mx-auto relative overflow-hidden glass-effect p-16 md:p-24 rounded-[4rem] border-brand-primary/20 text-center">
                    <div className="absolute top-0 left-0 w-full h-full premium-gradient opacity-10 -z-10"></div>
                    <motion.div
                         initial={{ opacity: 0, scale: 0.9 }}
                         whileInView={{ opacity: 1, scale: 1 }}
                         viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">Your <span className="premium-text-gradient italic">Fortune</span> Awaits</h2>
                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
                            Stop waiting for luck to find you. Take the first step towards a life-changing win today at habeshaLottery.
                        </p>
                        <Link to="/register" className="inline-block premium-gradient px-12 py-6 rounded-3xl text-white font-black text-2xl hover:shadow-[0_0_60px_rgba(251,191,36,0.5)] hover:scale-105 transition-all duration-300">
                             Join the Elite Winners
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
