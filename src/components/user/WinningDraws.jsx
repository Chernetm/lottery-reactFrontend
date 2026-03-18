import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Calendar, User, Gift, ArrowRight, Loader2 } from 'lucide-react';
import { getAllLotteries } from '../../api/lottery';

const WinningDraws = () => {
    const [winners, setWinners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWinners = async () => {
            try {
                const data = await getAllLotteries('DRAWN');
                
                // Aggregate all winners from all prize tiers
                const allWinners = [];
                
                data.forEach(lottery => {
                    const lotteryDrawnAt = lottery.drawnAt || lottery.updatedAt;
                    
                    if (lottery.prizes && lottery.prizes.length > 0) {
                        lottery.prizes.forEach(prize => {
                            if (prize.winnerId) {
                                allWinners.push({
                                    id: `${lottery.id}-${prize.id}`,
                                    lotteryName: lottery.item?.name || 'Grand Prize',
                                    winnerName: prize.winner?.fullName || prize.winner?.name || `USR-${prize.winnerId.substring(0, 6)}...`,
                                    rank: prize.rank || 1,
                                    drawnAt: lotteryDrawnAt,
                                    imageUrl: prize.item?.imageUrl || lottery.item?.imageUrl
                                });
                            }
                        });
                    } else if (lottery.winnerId) {
                        allWinners.push({
                            id: `${lottery.id}-main`,
                            lotteryName: lottery.item?.name || 'Grand Prize',
                            winnerName: lottery.winner?.fullName || lottery.winner?.name || `USR-${lottery.winnerId.substring(0, 6)}...`,
                            rank: 1,
                            drawnAt: lotteryDrawnAt,
                            imageUrl: lottery.item?.imageUrl
                        });
                    }
                });

                // Sort by drawnAt descending, limit to 6 for the dashboard
                allWinners.sort((a, b) => new Date(b.drawnAt) - new Date(a.drawnAt));
                setWinners(allWinners.slice(0, 6));
            } catch (error) {
                console.error('Failed to fetch winners', error);
            } finally {
                setLoading(false);
            }
        };
        fetchWinners();
    }, []);

    if (loading) {
        return (
            <div className="glass-effect rounded-[2rem] p-12 flex flex-col items-center justify-center border border-slate-700 min-h-[300px]">
                <Loader2 className="w-8 h-8 text-brand-primary animate-spin mb-4" />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Recent Wins...</p>
            </div>
        );
    }

    if (winners.length === 0) {
        return (
            <div className="glass-effect rounded-[2rem] p-12 text-center border border-slate-700">
                <Trophy size={48} className="text-slate-600 mx-auto mb-4 opacity-20" />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No winners recorded yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                    <Trophy className="text-brand-primary" size={24} /> Recent Winners
                </h2>
                <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
                        <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse"></div> Live Updates
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {winners.map((winner, idx) => (
                    <motion.div
                        key={winner.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-effect rounded-3xl p-6 border border-slate-700 hover:border-brand-primary/30 hover:-translate-y-1 transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Star className="text-brand-primary" size={60} />
                        </div>
                        
                        <div className="flex items-start justify-between mb-6 relative z-10">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-primary border border-white/10 group-hover:bg-brand-primary group-hover:text-white transition-all">
                                {winner.rank === 1 ? <Trophy size={22} /> : <Gift size={22} />}
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Prize Rank</p>
                                <p className="text-sm font-black text-brand-primary uppercase">
                                    {winner.rank === 1 ? '1st Place' : winner.rank === 2 ? '2nd Place' : winner.rank === 3 ? '3rd Place' : `${winner.rank}th Place`}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-1 mb-6 relative z-10">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Prize Won</p>
                            <h4 className="text-lg font-black text-white uppercase tracking-tight truncate">
                                {winner.lotteryName}
                            </h4>
                        </div>
                        
                        <div className="flex items-center justify-between pt-5 border-t border-slate-700/50 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-brand-primary border border-slate-700">
                                    <User size={14} />
                                </div>
                                <div className="max-w-[120px]">
                                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Winner</p>
                                    <p className="text-xs font-black text-white truncate">{winner.winnerName}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Drawn</p>
                                <p className="text-[10px] font-bold text-slate-300">
                                    {new Date(winner.drawnAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default WinningDraws;
