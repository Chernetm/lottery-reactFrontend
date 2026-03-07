import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

const DrawSpinnerModal = ({ drawingState, setDrawingState }) => {
    return (
        <AnimatePresence>
            {drawingState.isDrawing && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-[110] flex items-center justify-center p-4 md:p-6"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="text-center max-w-2xl w-full"
                    >
                        <Trophy className={`mx-auto mb-6 md:mb-8 ${drawingState.showResult ? 'text-yellow-400 animate-bounce' : 'text-slate-600'}`} size={drawingState.showResult ? 60 : 40} />

                        <h2 className="text-2xl md:text-4xl font-black mb-8 md:mb-12 uppercase tracking-tighter">
                            {drawingState.showResult ? 'We Have a Winner!' : 'Selecting Winner...'}
                        </h2>

                        <div className="relative h-32 md:h-48 flex items-center justify-center overflow-hidden mb-8 md:mb-12">
                            <motion.div
                                key={drawingState.currentSelection}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -50, opacity: 0 }}
                                className="text-5xl md:text-8xl font-black font-mono text-brand-primary"
                            >
                                #{drawingState.currentSelection}
                            </motion.div>
                        </div>

                        {drawingState.showResult && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4 md:space-y-6"
                            >
                                <div className="grid grid-cols-1 gap-3 md:gap-4 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {drawingState.winner?.map((prize, idx) => (
                                        <div key={idx} className="glass-effect p-4 md:p-6 rounded-2xl md:rounded-3xl border border-yellow-400/30 bg-yellow-400/5 flex items-center gap-4 md:gap-6 text-left">
                                            <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 text-slate-900 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-lg md:text-xl shrink-0">
                                                {prize.rank}
                                            </div>
                                            <div className="flex-grow">
                                                <p className="text-slate-400 uppercase tracking-widest text-[8px] md:text-[10px] font-bold mb-1">Winner of {prize.item?.name}</p>
                                                <h3 className="text-base md:text-xl font-bold truncate max-w-[150px] md:max-w-none">{prize.winner?.fullName || prize.winnerId}</h3>
                                                {prize.winnerTicketNumber && (
                                                    <div className="text-[10px] md:text-sm font-bold text-brand-primary">Ticket #{prize.winnerTicketNumber}</div>
                                                )}
                                            </div>
                                            <div className="text-right hidden xs:block">
                                                <p className="text-brand-primary font-mono text-[8px] md:text-sm font-bold">LUCKY DRAW</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setDrawingState({ isDrawing: false, candidates: [], winner: null, currentSelection: null, showResult: false })}
                                    className="premium-gradient px-8 md:px-12 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg shadow-xl shadow-brand-primary/20 mt-4"
                                >
                                    Back to Dashboard
                                </button>
                            </motion.div>
                        )}

                        {!drawingState.showResult && (
                            <div className="flex justify-center gap-2">
                                {[0, 1, 2].map(i => (
                                    <motion.div
                                        key={i}
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
                                        className="w-2 md:w-3 h-2 md:h-3 bg-brand-primary rounded-full"
                                    />
                                ))}
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DrawSpinnerModal;
