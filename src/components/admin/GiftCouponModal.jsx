import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Plus } from 'lucide-react';

const GiftCouponModal = ({ giftModal, setGiftModal, handleGiftCoupon, users }) => {
    return (
        <AnimatePresence>
            {giftModal.isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setGiftModal({ ...giftModal, isOpen: false })}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg glass-effect p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-700 shadow-2xl"
                    >
                        <button
                            onClick={() => setGiftModal({ ...giftModal, isOpen: false })}
                            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-slate-400 hover:text-white transition"
                        >
                            <X size={20} className="md:w-6 md:h-6" />
                        </button>

                        <div className="text-center mb-6 md:mb-8">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-primary/10 text-brand-primary rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Send size={24} className="md:w-8 md:h-8" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold">Gift Free Ticket</h3>
                            <p className="text-slate-500 text-xs md:text-sm">Generate a free ticket coupon for a specific user</p>
                        </div>

                        {giftModal.generatedCoupon ? (
                            <div className="space-y-4 md:space-y-6">
                                <div className="bg-green-500/10 border border-green-500/30 p-4 md:p-6 rounded-xl md:rounded-2xl text-center">
                                    <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mb-2">Coupon Generated!</p>
                                    <p className="text-2xl md:text-3xl font-mono font-black text-white tracking-wider">
                                        {giftModal.generatedCoupon}
                                    </p>
                                </div>
                                <p className="text-slate-400 text-xs text-center">
                                    Send this code to the user. They can redeem it on the lottery checkout page.
                                </p>
                                <button
                                    onClick={() => setGiftModal({ ...giftModal, isOpen: false })}
                                    className="w-full py-3.5 md:py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition text-sm md:text-base"
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleGiftCoupon} className="space-y-4 md:space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs md:text-sm font-bold text-slate-400 ml-1">Select User</label>
                                    <select
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3.5 md:py-4 px-4 outline-none focus:border-brand-primary transition text-white appearance-none text-sm md:text-base"
                                        value={giftModal.selectedUserId}
                                        onChange={(e) => setGiftModal({ ...giftModal, selectedUserId: e.target.value })}
                                        required
                                    >
                                        <option value="">-- Choose a user --</option>
                                        {users.map(u => (
                                            <option key={u.id} value={u.id}>
                                                {u.fullName || 'No Name'} ({u.email || u.phoneNumber})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    disabled={giftModal.loading || !giftModal.selectedUserId}
                                    className="w-full premium-gradient py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold text-white shadow-xl shadow-brand-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm md:text-base"
                                >
                                    {giftModal.loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <Plus size={18} className="md:w-5 md:h-5" /> Generate Free Coupon
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default GiftCouponModal;
