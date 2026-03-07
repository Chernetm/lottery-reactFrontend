import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';

const EditLotteryModal = ({ editingLottery, setEditingLottery, handleUpdateLottery }) => {
    return (
        <AnimatePresence>
            {editingLottery && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[120] flex items-center justify-center p-4 md:p-6"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="glass-effect p-6 md:p-10 rounded-2xl md:rounded-3xl w-full max-w-lg shadow-2xl border border-slate-700/50 max-h-[90vh] overflow-y-auto custom-scrollbar"
                    >
                        <div className="flex justify-between items-center mb-6 md:mb-8">
                            <h3 className="text-xl md:text-2xl font-bold">Edit Lottery</h3>
                            <button
                                onClick={() => setEditingLottery(null)}
                                className="p-2 hover:bg-slate-800 rounded-xl transition text-slate-400"
                            >
                                <X size={20} className="md:w-6 md:h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateLottery} className="space-y-4 md:space-y-6">
                            <div>
                                <label className="block text-[10px] md:text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Ticket Price ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 md:py-4 px-4 md:px-5 outline-none focus:border-brand-primary transition text-base md:text-lg"
                                    value={editingLottery.ticketPrice}
                                    onChange={(e) => setEditingLottery({ ...editingLottery, ticketPrice: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] md:text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Min Tickets to Draw</label>
                                <input
                                    type="number"
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 md:py-4 px-4 md:px-5 outline-none focus:border-brand-primary transition text-base md:text-lg"
                                    value={editingLottery.minTickets}
                                    onChange={(e) => setEditingLottery({ ...editingLottery, minTickets: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] md:text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Max Tickets (Optional)</label>
                                <input
                                    type="number"
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 md:py-4 px-4 md:px-5 outline-none focus:border-brand-primary transition text-base md:text-lg"
                                    value={editingLottery.maxTickets || ''}
                                    onChange={(e) => setEditingLottery({ ...editingLottery, maxTickets: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] md:text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Status</label>
                                <select
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 md:py-4 px-4 md:px-5 outline-none focus:border-brand-primary transition text-sm md:text-lg appearance-none"
                                    value={editingLottery.status}
                                    onChange={(e) => setEditingLottery({ ...editingLottery, status: e.target.value })}
                                    required
                                >
                                    <option value="DRAFT">DRAFT</option>
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="LOCKED">LOCKED</option>
                                    <option value="DRAWN">DRAWN</option>
                                    <option value="CANCELLED">CANCELLED</option>
                                    <option value="COMPLETED">COMPLETED</option>
                                </select>
                            </div>

                            <div className="flex gap-3 md:gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setEditingLottery(null)}
                                    className="flex-grow bg-slate-800 text-white py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold hover:bg-slate-700 transition text-sm md:text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-grow premium-gradient text-white py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 text-sm md:text-base"
                                >
                                    Save <span className="hidden xs:inline">Changes</span> <Save size={18} className="md:w-5 md:h-5" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EditLotteryModal;
