import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Calendar, User, Gift, ArrowRight } from 'lucide-react';
import { getAllLotteries } from '../api/lottery';

const Results = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await getAllLotteries('DRAWN');
                
                // Aggregate all winners from all prize tiers
                const allWinners = [];
                
                data.forEach(lottery => {
                    const lotteryDrawnAt = lottery.drawnAt || lottery.updatedAt; // Fallback for date
                    
                    if (lottery.prizes && lottery.prizes.length > 0) {
                        lottery.prizes.forEach(prize => {
                            if (prize.winnerId) {
                                allWinners.push({
                                    id: `${lottery.id}-${prize.id}`,
                                    lotteryId: lottery.id,
                                    winnerId: prize.winnerId,
                                    item: prize.item || lottery.item,
                                    rank: prize.rank || prize.Rank || 1, // Handle both cases and fallback
                                    drawnAt: lotteryDrawnAt,
                                    winner: prize.winner
                                });
                            }
                        });
                    } else if (lottery.winnerId) {
                        allWinners.push({
                            id: `${lottery.id}-main`,
                            lotteryId: lottery.id,
                            winnerId: lottery.winnerId,
                            item: lottery.item,
                            rank: 1,
                            drawnAt: lotteryDrawnAt,
                            winner: lottery.winner
                        });
                    }
                });

                // Sort by drawnAt descending
                allWinners.sort((a, b) => new Date(b.drawnAt) - new Date(a.drawnAt));
                
                setResults(allWinners);
            } catch (error) {
                console.error('Failed to fetch results', error);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, []);

    const featuredWinner = results[0];
    const recentWinners = results.slice(1);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-ethio-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Header */}
            <header className="bg-ethio-blue py-20 px-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-ethio-gold rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-10 right-10 w-64 h-64 bg-white rounded-full blur-[100px]"></div>
                </div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        <Trophy size={64} className="text-ethio-gold mx-auto mb-6" />
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                            Draw <span className="text-ethio-gold">Results</span>
                        </h1>
                        <p className="text-white/60 font-bold uppercase tracking-widest text-sm">Celebrating Our Winners</p>
                    </motion.div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
                {featuredWinner ? (
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 mb-20"
                    >
                        <div className="flex flex-col lg:flex-row">
                            <div className="lg:w-2/5 relative h-80 lg:h-auto overflow-hidden">
                                <img 
                                    src={featuredWinner.item.imageUrl || "https://images.unsplash.com/photo-1578262825741-f5bd347006c6?q=80&w=800&auto=format&fit=crop"} 
                                    className="w-full h-full object-cover" 
                                    alt="Grand Prize"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ethio-blue to-transparent md:bg-gradient-to-r"></div>
                                <div className="absolute bottom-10 left-10 text-white">
                                    < Medal size={48} className="text-ethio-gold mb-2" />
                                    <p className="font-black uppercase tracking-widest text-xs">Grand Prize Winner</p>
                                </div>
                            </div>
                            <div className="lg:w-3/5 p-10 md:p-16 flex flex-col justify-center">
                                <div className="inline-block bg-ethio-blue/5 text-ethio-blue px-6 py-2 rounded-full font-black uppercase text-[10px] tracking-widest mb-6">
                                    {featuredWinner.rank === 1 ? 'Magnificent Victory' : `${featuredWinner.rank === 2 ? 'Second' : featuredWinner.rank === 3 ? 'Third' : featuredWinner.rank} Prize Winner`}
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black text-ethio-blue uppercase tracking-tighter mb-6">
                                    {featuredWinner.item.name}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                    <div className="space-y-1">
                                        <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Winner ID</p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-ethio-blue rounded-full flex items-center justify-center text-white">
                                                <User size={18} />
                                            </div>
                                            <p className="text-xl font-black text-ethio-blue truncate max-w-[150px] md:max-w-none">
                                                {featuredWinner.winner?.name || `USR-${featuredWinner.winnerId.substring(0, 8)}...`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Draw Date</p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-ethio-gold/20 rounded-full flex items-center justify-center text-ethio-gold">
                                                <Calendar size={18} />
                                            </div>
                                            <p className="text-xl font-black text-ethio-blue">
                                                {featuredWinner.drawnAt ? new Date(featuredWinner.drawnAt).toLocaleDateString() : 'Recent'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-500 font-medium leading-relaxed italic border-l-4 border-ethio-gold pl-6">
                                    {featuredWinner.rank === 1 
                                        ? `"It's a dream come true! I never thought I would win the ${featuredWinner.item.name}. Thank you EthioDigital Lottery!"`
                                        : `"I am so happy to have won the ${featuredWinner.item.name}! This is a great platform for everyone to try their luck."`
                                    }
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-slate-400 font-bold uppercase tracking-widest">No results available yet.</p>
                    </div>
                )}

                {/* Recent Winners List */}
                {recentWinners.length > 0 && (
                    <div className="space-y-12">
                        <div className="flex items-center justify-between border-b-4 border-ethio-light pb-6">
                            <h3 className="text-2xl font-black text-ethio-blue uppercase tracking-tighter flex items-center gap-4">
                                <Medal className="text-ethio-gold" /> Recent Winners
                            </h3>
                            <div className="hidden md:flex gap-4">
                                <div className="flex items-center gap-2 text-xs font-black text-slate-400">
                                    <div className="w-2 h-2 bg-ethio-gold rounded-full"></div> 1st Prize
                                </div>
                                <div className="flex items-center gap-2 text-xs font-black text-slate-400">
                                    <div className="w-2 h-2 bg-slate-300 rounded-full"></div> 2nd Prize
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {recentWinners.map((winner, idx) => (
                                <motion.div
                                    key={winner.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-ethio-light rounded-[2.5rem] p-8 border border-white hover:border-ethio-gold/30 hover:shadow-2xl hover:shadow-ethio-blue/5 transition-all group"
                                >
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center text-ethio-blue group-hover:bg-ethio-blue group-hover:text-white transition-all">
                                            {winner.rank === 1 ? <Trophy size={24} /> : <Gift size={24} />}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Prize Order</p>
                                            <p className="text-lg font-black text-ethio-gold uppercase">
                                                {winner.rank === 1 ? '1st Prize' : winner.rank === 2 ? '2nd Prize' : winner.rank === 3 ? '3rd Prize' : `${winner.rank}th Prize`}
                                            </p>
                                        </div>
                                    </div>
                                    <h4 className="text-xl font-black text-ethio-blue uppercase tracking-tight mb-2 truncate">
                                        {winner.item.name}
                                    </h4>
                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-200">
                                        <div className="max-w-[150px]">
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Winner</p>
                                            <p className="font-black text-ethio-blue truncate">
                                                {winner.winner?.name || `USR-${winner.winnerId?.substring(0, 6)}...`}
                                            </p>
                                        </div>
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-ethio-blue shadow-sm">
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Results;
