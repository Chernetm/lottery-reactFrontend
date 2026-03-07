import FloatingParticles3D from "../components/FloatingParticles3D";
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Trophy, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { getAllLotteries } from '../api/lottery';
import { Link } from 'react-router-dom';
const Home = () => {
    const [activeLotteries, setActiveLotteries] = useState([]);
    const [loading, setLoading] = useState(true);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

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
        <div className="flex flex-col gap-12 md:gap-24 pb-16 md:pb-24 overflow-hidden bg-white text-slate-900">
            {/* Hero Section */}
            <section className="relative pt-12 md:pt-20 pb-8 md:pb-12 px-4 md:px-6 min-h-[70vh] flex items-center bg-white">
                {/* Antigravity Background Animation */}
                <div className="absolute inset-0 -z-10 overflow-hidden bg-white">
                    
                    <motion.div 
                        style={{ y: y1 }}
                        animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                        }}
                        transition={{ 
                            duration: 30, 
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-brand-primary/10 blur-[130px] rounded-full"
                    />
                    <motion.div 
                        style={{ y: y2 }}
                        animate={{ 
                            scale: [1.2, 1, 1.2],
                            rotate: [0, -90, 0],
                        }}
                        transition={{ 
                            duration: 35, 
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute top-1/4 -right-1/4 w-[700px] h-[700px] bg-indigo-100 blur-[130px] rounded-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/40 to-white"></div>
                </div>

                <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 bg-slate-100 border border-brand-primary/30 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-brand-primary text-xs md:text-sm font-medium mb-6 md:mb-8 shadow-sm"
                    >
                        <Sparkles size={14} className="md:w-4 md:h-4 text-brand-primary" />
                        <span>Experience the Future of Lottery</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-7xl font-extrabold mb-4 md:mb-6 leading-tight text-slate-900"
                    >
                      ወደ <span className="premium-text-gradient">የፋይናንስ ነፃነት</span> ጉዞዎን ከዚህ ይጀምሩ 
                     </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-slate-600 text-base md:text-xl max-w-2xl mb-8 md:mb-12 px-4 md:px-0"
                    >
                      በዓለም ላይ በጣም ግልፅ የሆነውን የሎተሪ መድረክ በመጠቀም የዕጣውን ደስታ ይለማመዱ። የተረጋገጠ ፍትሃዊነት፣ ፈጣን ክፍያዎች እና ሕይወትን የሚቀይሩ ሽልማቶች።  
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto px-6 sm:px-0"
                    >
                        <Link to="/login" className="premium-gradient px-6 py-3.5 md:px-8 md:py-4 rounded-xl text-white font-bold text-base md:text-lg hover:shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center justify-center gap-2">
                            አሁን ይጀምሩ <ArrowRight size={18} className="md:w-5 md:h-5" />
                        </Link>
                        <Link to="/how-it-works" className="bg-white border border-slate-200 px-6 py-3.5 md:px-8 md:py-4 rounded-xl text-slate-800 font-bold text-base md:text-lg hover:bg-slate-50 transition flex items-center justify-center shadow-sm">
                            How it Works
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="px-4 md:px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
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
                            className="bg-white p-4 md:p-6 rounded-2xl flex flex-col items-center text-center border border-slate-100 shadow-sm"
                        >
                            <stat.icon className="text-brand-primary mb-3 md:mb-4 w-6 h-6 md:w-8 md:h-8" />
                            <h3 className="text-xl md:text-3xl font-bold mb-0.5 md:mb-1 text-slate-900">{stat.value}</h3>
                            <p className="text-slate-500 text-[10px] md:text-sm uppercase tracking-wider">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Active Lotteries */}
            <section className="px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0 mb-8 md:mb-12">
                        <div>
                            <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-slate-900">ገበያ ላይ ያለ ዕጣ</h2>
                            <p className="text-slate-600 text-sm md:text-base">Join a draw and win amazing tech and gadgets.</p>
                        </div>
                        <Link to="/lotteries" className="text-brand-primary font-semibold hover:underline flex items-center gap-1 text-sm md:text-base">
                            View all <ArrowRight size={14} className="md:w-4 md:h-4" />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white h-[350px] md:h-[400px] rounded-2xl animate-pulse border border-slate-100 shadow-sm"></div>
                            ))}
                        </div>
                    ) : activeLotteries.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                            {activeLotteries.map((lottery) => (
                                <motion.div
                                    key={lottery.id}
                                    whileHover={{ y: -5 }}
                                    className="bg-white rounded-2xl overflow-hidden group border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="h-40 md:h-48 overflow-hidden relative">
                                        <img
                                            src={lottery.item.imageUrl || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop'}
                                            alt={lottery.item.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                        />
                                        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                                            <div className="bg-brand-primary px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-bold text-white shadow-lg">
                                                LIVE
                                            </div>
                                            {lottery.prizes && lottery.prizes.length > 1 && (
                                                <div className="bg-white/90 backdrop-blur-sm border border-brand-primary/30 px-2.5 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold text-brand-primary shadow-lg flex items-center gap-1">
                                                    <Trophy size={10} /> {lottery.prizes.length} PRIZES
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-4 md:p-6">
                                        <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-slate-900 group-hover:text-brand-primary transition-colors">{lottery.item.name}</h3>
                                        <p className="text-slate-600 text-xs md:text-sm mb-4 md:mb-6 line-clamp-2">{lottery.item.description}</p>

                                        <div className="flex justify-between items-center mb-4 md:mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                            <div>
                                                <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Ticket Price</p>
                                                <p className="text-xl md:text-2xl font-bold text-brand-primary">${lottery.ticketPrice}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Tickets</p>
                                                <p className="text-base md:text-lg font-semibold text-slate-800">{lottery.maxTickets ? `${lottery.totalTickets}/${lottery.maxTickets}` : lottery.totalTickets}</p>
                                            </div>
                                        </div>

                                        <Link
                                            to={`/lottery/${lottery.id}`}
                                            className="block w-full text-center py-2.5 md:py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary/90 transition-all text-sm md:text-base shadow-sm shadow-brand-primary/20"
                                        >
                                            Buy Ticket
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-12 md:p-20 rounded-2xl text-center border border-dashed border-slate-200">
                            <p className="text-slate-600 text-base md:text-lg">No active lotteries at the moment. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>

        </div>
    );
};

export default Home;
