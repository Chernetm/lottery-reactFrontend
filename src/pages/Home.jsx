import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { getAllLotteries } from '../api/lottery';
import { Link } from 'react-router-dom';
const Home = () => {
    const [activeLotteries, setActiveLotteries] = useState(() => {
        const cached = localStorage.getItem('active_lotteries');
        return cached ? JSON.parse(cached) : [];
    });
    const [loading, setLoading] = useState(!activeLotteries.length);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: "Winning Starts Here!",
            subtitle: "Register and Get Your Bonus!",
            cta1: "Buy Lottery",
            cta1Path: "/lotteries",
            cta2: "About Us",
            image: "/men.jpg"
        },
        {
            title: "Life-Changing Prizes!",
            subtitle: "Try your luck with our daily draws.",
            cta1: "Join Now",
            cta1Path: "/register",
            cta2: "About Us",
            image: "/women.jpg"
        },
        {
            title: "Dream Big, Win Big!",
            subtitle: "Your journey to wealth begins today.",
            cta1: "Explore Games",
            cta1Path: "/lotteries",
            cta2: "About Us",
            image: "/car.jpg"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchLotteries = async () => {
            try {
                const data = await getAllLotteries('ACTIVE');
                setActiveLotteries(data);
                localStorage.setItem('active_lotteries', JSON.stringify(data));
            } catch (error) {
                console.error('Failed to fetch lotteries', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLotteries();
    }, []);



    return (
        <div className="flex flex-col gap-0 overflow-hidden bg-white text-slate-900 relative">
            {/* Hero Section - White Background */}
            <section className="relative py-12 md:py-20 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    {/* 16:9 Presentation Slide Container - More responsive on mobile */}
                    <div className="relative aspect-[4/5] sm:aspect-video w-full rounded-[1.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,34,68,0.2)] bg-ethio-blue group">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={currentSlide}
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                className="absolute inset-0"
                            >
                                {/* Background Image */}
                                <img 
                                    src={slides[currentSlide].image} 
                                    className="w-full h-full object-cover" 
                                    alt="Slide Background"
                                />
                                {/* Overlay/Gradient for text legibility - adjusted for mobile centeredness */}
                                <div className="absolute inset-0 bg-gradient-to-b from-ethio-blue/60 via-ethio-blue/40 to-ethio-blue/90 md:bg-gradient-to-r md:from-ethio-blue/90 md:via-ethio-blue/40 md:to-transparent z-10"></div>
                                
                                {/* Slide Content Layer */}
                                <div className="absolute inset-0 z-20 flex items-center px-6 md:px-24 text-center md:text-left">
                                    <div className="max-w-xl mx-auto md:mx-0">
                                        <motion.div 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="inline-block bg-ethio-gold text-ethio-blue px-4 py-1.5 md:px-6 md:py-2 rounded-full font-black uppercase text-[8px] md:text-[10px] tracking-widest mb-4 md:mb-6"
                                        >
                                            Featured Reward
                                        </motion.div>
                                        <motion.h1 
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6 }}
                                            className="text-2xl md:text-6xl font-black text-white mb-4 md:mb-6 leading-tight uppercase tracking-tighter"
                                        >
                                            {slides[currentSlide].title}
                                        </motion.h1>
                                        <motion.p 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.8 }}
                                            className="text-sm md:text-2xl text-white/80 font-bold mb-8 md:mb-10 leading-relaxed max-w-lg"
                                        >
                                            {slides[currentSlide].subtitle}
                                        </motion.p>
                                        <motion.div 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1 }}
                                            className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 md:gap-6"
                                        >
                                            <Link to={slides[currentSlide].cta1Path} className="bg-white text-ethio-blue px-8 py-3.5 md:px-10 md:py-4 rounded-xl md:rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest hover:bg-ethio-gold transition-all shadow-xl">
                                                {slides[currentSlide].cta1}
                                            </Link>
                                            <Link to="/about" className="bg-ethio-blue/30 backdrop-blur-md text-white border-2 border-white/20 px-8 py-3.5 md:px-10 md:py-4 rounded-xl md:rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest hover:bg-white hover:text-ethio-blue transition-all">
                                                {slides[currentSlide].cta2}
                                            </Link>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Slide Progress Dots - centered on mobile */}
                        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:translate-x-0 z-30 flex gap-2 md:gap-3">
                            {slides.map((_, i) => (
                                <button 
                                    key={i}
                                    onClick={() => setCurrentSlide(i)}
                                    className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${currentSlide === i ? 'bg-white w-8 md:w-12' : 'bg-white/30 w-3 md:w-4 hover:bg-white/50'}`}
                                />
                            ))}
                        </div>

                        {/* Decorative Icon - Top right, smaller on mobile */}
                        <div className="absolute top-6 right-6 md:top-10 md:right-10 bg-white/10 backdrop-blur-lg p-3 md:p-5 rounded-2xl md:rounded-3xl border border-white/20 z-30">
                            <Trophy className="text-ethio-gold w-5 h-5 md:w-8 md:h-8" />
                        </div>
                    </div>
                </div>

                {/* Subtle Background Accents */}
                <div className="absolute top-0 right-0 w-1/4 h-full bg-slate-50 -skew-x-12 translate-x-1/2 z-0"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-ethio-gold/5 blur-[120px] rounded-full z-0"></div>
            </section>

            {/* About Section */}
            <section className="py-16 md:py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left"
                    >
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-ethio-blue uppercase tracking-tighter leading-tight md:leading-none">
                            About Our <br className="hidden md:block" />
                            <span className="text-ethio-gold underline decoration-8 underline-offset-[12px]">Digital Lottery</span>
                        </h2>
                        <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            EthioDigital Lottery is the official online platform for national draws and instant games. We bring you the excitement of winning from the comfort of your home with guaranteed transparency and instant payouts.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-lg mx-auto lg:mx-0">
                            <div className="bg-ethio-light p-6 rounded-[2rem] border border-white hover:border-ethio-gold/20 transition-all shadow-sm">
                                <h4 className="font-black text-ethio-blue uppercase text-[10px] tracking-widest mb-2">Fair Play</h4>
                                <p className="text-sm text-slate-500 font-bold">100% Transparent Draws</p>
                            </div>
                            <div className="bg-ethio-light p-6 rounded-[2rem] border border-white hover:border-ethio-gold/20 transition-all shadow-sm">
                                <h4 className="font-black text-ethio-blue uppercase text-[10px] tracking-widest mb-2">Secure</h4>
                                <p className="text-sm text-slate-500 font-bold">Safe & Encrypted Payments</p>
                            </div>
                        </div>
                        <div className="pt-4">
                            <Link to="/about" className="inline-flex items-center justify-center bg-ethio-blue text-white px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-ethio-gold transition-all shadow-xl hover:shadow-ethio-gold/20 active:scale-95 transform">
                                Learn More
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex-1 w-full max-w-2xl mx-auto lg:max-w-none"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-ethio-gold/10 rounded-[3.5rem] blur-2xl group-hover:bg-ethio-gold/20 transition-all duration-500"></div>
                            <img 
                                src="/about.jpg" 
                                className="relative w-full aspect-square md:aspect-video lg:aspect-square object-cover rounded-[3rem] shadow-2xl border-4 md:border-8 border-white" 
                                alt="About EthioDigital Lottery"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Active Lotteries */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12 border-b-4 border-ethio-light pb-8">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-ethio-blue uppercase tracking-tighter">Our Lotteries</h2>
                            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-2">Current Active Draws</p>
                        </div>
                        <Link to="/lotteries" className="hidden md:flex items-center gap-2 bg-ethio-blue/5 text-ethio-blue px-6 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:bg-ethio-blue hover:text-white transition-all">
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-[500px] bg-slate-50 animate-pulse rounded-[2.5rem]"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
                            {activeLotteries.map((lottery) => (
                                <motion.div
                                    key={lottery.id}
                                    className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl shadow-ethio-blue/5 flex flex-col group h-full"
                                >
                                    <div className="relative h-56 lg:h-64">
                                        <img
                                            src={lottery.item.imageUrl || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop'}
                                            className="w-full h-full object-cover"
                                            alt={lottery.item.name}
                                        />
                                        <div className="absolute top-6 right-6">
                                            <div className="bg-ethio-gold text-ethio-blue px-5 py-2 rounded-full font-black text-[10px] uppercase shadow-xl border border-white/20">
                                                Active Now
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-1">
                                        <h3 className="text-2xl font-black text-ethio-blue mb-4 uppercase tracking-tight leading-tight">{lottery.item.name}</h3>
                                        <div className="space-y-4 mb-10 flex-1">
                                            <div className="bg-ethio-light p-4 rounded-2xl border border-slate-100 flex justify-between items-center group-hover:border-ethio-gold transition-colors">
                                                <span className="text-[10px] font-black uppercase text-slate-400">Ticket Price</span>
                                                <span className="text-2xl font-black text-ethio-blue">${lottery.ticketPrice}</span>
                                            </div>
                                            <div className="bg-ethio-light p-4 rounded-2xl border border-slate-100 flex justify-between items-center group-hover:border-ethio-gold transition-colors">
                                                <span className="text-[10px] font-black uppercase text-slate-400">Available</span>
                                                <span className="text-sm font-black text-ethio-blue">{lottery.maxTickets ? `${lottery.totalTickets}/${lottery.maxTickets} Sold` : lottery.totalTickets}</span>
                                            </div>
                                        </div>
                                        <Link
                                            to={`/lottery/${lottery.id}`}
                                            className="bg-ethio-blue text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest text-center shadow-xl hover:shadow-ethio-blue/20 hover:-translate-y-1 transition-all"
                                        >
                                            Buy Tickets Now
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

        </div>
    );
};

export default Home;
