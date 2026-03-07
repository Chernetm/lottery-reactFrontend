import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Plus, X, Edit2, Play, Send, AlertCircle } from 'lucide-react';

const LotteryManagement = ({
    lotteries,
    lotteryForm,
    items,
    handleCreateLottery,
    addPrize,
    removePrize,
    updatePrizeItem,
    setLotteryForm,
    setEditingLottery,
    handleDrawWinner,
    setGiftModal
}) => {
    return (
        <motion.div
            key="lotteries"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
            {/* Create Lottery Form */}
            <div className="lg:col-span-1">
                <div className="glass-effect p-8 rounded-3xl sticky top-28">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Ticket className="text-brand-primary" /> Create New Lottery
                    </h3>
                    <form onSubmit={handleCreateLottery} className="space-y-4">
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Lottery Prizes</label>
                            {lotteryForm.prizes.map((prize, index) => (
                                <div key={index} className="flex gap-2">
                                    <div className="flex-grow relative">
                                        <span className="absolute left-3 top-3.5 text-xs font-bold text-brand-primary bg-brand-primary/10 w-6 h-6 flex items-center justify-center rounded-full">
                                            {prize.rank}
                                        </span>
                                        <select
                                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-brand-primary transition appearance-none"
                                            value={prize.itemId}
                                            onChange={(e) => updatePrizeItem(index, e.target.value)}
                                            required
                                        >
                                            <option value="">Select Item</option>
                                            {items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                                        </select>
                                    </div>
                                    {lotteryForm.prizes.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removePrize(index)}
                                            className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition"
                                        >
                                            <X size={18} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addPrize}
                                className="w-full py-2 border border-dashed border-slate-700 rounded-xl text-sm text-slate-400 hover:text-brand-primary hover:border-brand-primary transition flex items-center justify-center gap-2"
                            >
                                <Plus size={16} /> Add Rank {lotteryForm.prizes.length + 1} Prize
                            </button>
                        </div>

                        <div className="pt-4 border-t border-slate-700/50 space-y-4">
                            <input
                                placeholder="Ticket Price ($)"
                                type="number"
                                step="0.01"
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-brand-primary transition"
                                value={lotteryForm.ticketPrice}
                                onChange={(e) => setLotteryForm({ ...lotteryForm, ticketPrice: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Min Tickets to Draw"
                                type="number"
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-brand-primary transition"
                                value={lotteryForm.minTickets}
                                onChange={(e) => setLotteryForm({ ...lotteryForm, minTickets: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Max Tickets (Optional)"
                                type="number"
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-brand-primary transition"
                                value={lotteryForm.maxTickets}
                                onChange={(e) => setLotteryForm({ ...lotteryForm, maxTickets: e.target.value })}
                            />
                            <button type="submit" className="w-full premium-gradient py-4 rounded-xl font-bold mt-2">
                                Launch Lottery
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Active Lotteries Management */}
            <div className="lg:col-span-2 space-y-6">
                {lotteries.map((lottery) => (
                    <div key={lottery.id} className="glass-effect p-6 md:p-8 rounded-2xl md:rounded-3xl">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                            <div>
                                <span className="text-brand-primary text-[10px] font-bold uppercase tracking-widest border border-brand-primary/30 px-3 py-1 rounded-full">
                                    {lottery.status}
                                </span>
                                <h4 className="text-xl md:text-2xl font-bold mt-3">{lottery.item.name}</h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {lottery.prizes?.map((p, i) => (
                                        <span key={i} className="text-[9px] font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                                            Rank {p.rank}: {p.item?.name}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-slate-500 text-xs mt-2">ID: #{lottery.id}</p>
                            </div>
                            <div className="sm:text-right">
                                <p className="text-slate-500 text-[10px] md:text-sm mb-1 uppercase tracking-wider">Price</p>
                                <p className="text-2xl md:text-3xl font-black text-brand-primary">${lottery.ticketPrice}</p>
                            </div>
                        </div>

                        <div className="bg-slate-800/50 rounded-xl md:rounded-2xl p-4 md:p-6 grid grid-cols-2 md:flex md:flex-wrap gap-4 md:gap-8 mb-8">
                            <div>
                                <p className="text-slate-500 text-[10px] uppercase mb-1">Progress</p>
                                <p className="text-lg md:text-xl font-bold">{lottery.totalTickets} / {lottery.minTickets}</p>
                            </div>
                            <div className="border-l border-slate-700/50 pl-4 md:pl-0 md:border-l-0">
                                <p className="text-slate-500 text-[10px] uppercase mb-1">Sold</p>
                                <p className="text-lg md:text-xl font-bold">{lottery.totalTickets}</p>
                            </div>
                            <div className="border-t border-slate-700/50 pt-4 md:border-t-0 md:pt-0 md:border-l md:pl-8 col-span-2 md:col-span-1">
                                <p className="text-brand-primary text-[10px] uppercase mb-1">Revenue</p>
                                <p className="text-lg md:text-xl font-black text-brand-primary">${(lottery.totalTickets * lottery.ticketPrice).toFixed(2)}</p>
                            </div>
                            <button
                                onClick={() => setEditingLottery(lottery)}
                                className="ml-auto p-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg md:rounded-xl transition text-slate-300 hover:text-white shrink-0 hidden md:block"
                            >
                                <Edit2 size={18} />
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            {lottery.status === 'ACTIVE' && (
                                <button
                                    onClick={() => handleDrawWinner(lottery.id)}
                                    disabled={lottery.totalTickets < lottery.minTickets}
                                    className="flex-grow bg-brand-secondary text-white py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-base flex items-center justify-center gap-2 hover:bg-brand-secondary/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Play size={18} className="md:w-5 md:h-5" /> Trigger Draw
                                </button>
                            )}
                            {lottery.status === 'ACTIVE' && (
                                <div className="flex gap-3 w-full sm:w-auto">
                                    <button
                                        onClick={() => setGiftModal({ isOpen: true, lotteryId: lottery.id, selectedUserId: '', generatedCoupon: '', loading: false })}
                                        className="flex-grow sm:flex-none sm:px-6 bg-brand-primary/10 text-brand-primary py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-base flex items-center justify-center gap-2 hover:bg-brand-primary/20 transition"
                                        title="Gift Free Ticket"
                                    >
                                        <Send size={18} className="md:w-5 md:h-5" /> Gift
                                    </button>
                                    <button
                                        onClick={() => setEditingLottery(lottery)}
                                        className="flex sm:hidden p-3.5 bg-slate-700 text-slate-300 rounded-xl items-center justify-center"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                </div>
                            )}
                            {lottery.totalTickets < lottery.minTickets && (
                                <div className="flex items-center gap-2 text-brand-accent text-[10px] md:text-sm font-medium bg-brand-accent/5 p-3 rounded-lg border border-brand-accent/20 w-full sm:w-auto">
                                    <AlertCircle size={14} className="md:w-[18px] md:h-[18px]" /> {lottery.minTickets - lottery.totalTickets} more tickets needed
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default LotteryManagement;
