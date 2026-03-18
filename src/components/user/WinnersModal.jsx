import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';

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
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative glass-effect border border-slate-700 rounded-[2.5rem] p-6 md:p-10 max-w-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 md:p-6">
                            <button
                                onClick={onClose}
                                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="p-4 bg-brand-accent/20 text-brand-accent rounded-2xl mb-4 border border-brand-accent/20">
                                <Trophy size={40} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase tracking-tight">Victory History</h2>
                            <p className="text-slate-400 font-medium">Your collection of winning moments</p>
                        </div>

                        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                            {winnersList.length > 0 ? (
                                winnersList.map((win) => (
                                    <div key={win.id} className="bg-white/5 border border-white/10 p-4 rounded-3xl flex items-center gap-4 text-left hover:bg-white/10 hover:border-brand-primary/30 transition-all group">
                                        <div className="w-14 h-14 bg-brand-primary text-white rounded-2xl flex items-center justify-center font-black flex-shrink-0 shadow-lg shadow-brand-primary/20">
                                            #{win.ticketNumber}
                                        </div>
                                        <div className="min-w-0 flex-grow">
                                            <div className="font-extrabold text-white text-lg md:text-xl truncate group-hover:text-brand-primary transition-colors">
                                                {win.wonPrize?.item?.name || win.lottery.item.name}
                                            </div>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] font-black uppercase tracking-[0.1em] text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-full border border-brand-accent/20">
                                                    {win.wonPrize?.rank === 1 ? 'GOLD PRIZE' :
                                                        win.wonPrize?.rank === 2 ? 'SILVER PRIZE' :
                                                            win.wonPrize?.rank === 3 ? 'BRONZE PRIZE' :
                                                                `RANK ${win.wonPrize?.rank || 1} PRIZE`}
                                                </span>
                                            </div>
                                            <div className="text-xs font-bold text-slate-500 mt-2 flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/50" />
                                                Won {new Date(win.lottery.updatedAt || win.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 px-6 bg-white/5 rounded-3xl border border-dashed border-slate-700">
                                    <Trophy size={48} className="mx-auto text-slate-700 mb-4 opacity-30" />
                                    <p className="text-slate-500 font-bold">No winnings revealed yet.</p>
                                    <p className="text-slate-600 text-xs mt-1 uppercase tracking-widest">Keep playing to fill this gallery!</p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full mt-8 md:mt-10 premium-gradient py-4 rounded-2xl font-black text-white hover:shadow-2xl hover:shadow-brand-primary/40 active:scale-[0.98] transition-all shadow-xl shadow-brand-primary/20 tracking-widest text-sm"
                        >
                            ACKNOWLEDGE VICTORY
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default WinnersModal;

