import React from 'react';
import { Loader2 } from 'lucide-react';

const RecentTickets = ({ stats, handleReveal, spinningId }) => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl text-white font-bold">Recent Tickets</h2>
            </div>

            <div className="glass-effect rounded-3xl overflow-hidden border border-slate-700">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-800/50 border-b border-slate-700">
                            <tr>
                                <th className="px-6 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Lottery</th>
                                <th className="px-6 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Ticket #</th>
                                <th className="px-6 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {stats.recentTickets.length > 0 ? (
                                stats.recentTickets.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="font-bold text-white text-sm md:text-base group-hover:text-brand-primary transition-colors">{ticket.lottery.item.name}</div>
                                            <div className="text-[10px] font-medium text-slate-500">ID: #{ticket.lottery.id}</div>
                                        </td>
                                        <td className="px-6 py-5 font-mono text-slate-300 text-xs md:text-sm text-center bg-slate-800/10 font-semibold">{ticket.ticketNumber}</td>
                                        <td className="px-6 py-5 text-right">
                                            {ticket.lottery.status === 'DRAWN' ? (
                                                ticket.isRevealed ? (
                                                    ticket.status === 'WON' ? (
                                                        <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap border border-green-500/20">
                                                            WON
                                                        </span>
                                                    ) : (
                                                        <span className="bg-slate-800 text-slate-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase whitespace-nowrap border border-slate-700">LOST</span>
                                                    )
                                                ) : (
                                                    <button
                                                        onClick={() => handleReveal(ticket)}
                                                        disabled={spinningId === ticket.id}
                                                        className="inline-flex items-center gap-1.5 premium-gradient text-white px-4 py-1.5 rounded-full text-[10px] font-bold hover:shadow-lg hover:shadow-brand-primary/20 transition-all disabled:opacity-50 whitespace-nowrap"
                                                    >
                                                        {spinningId === ticket.id ? (
                                                            <>
                                                                <Loader2 size={12} className="animate-spin" />
                                                                ...
                                                            </>
                                                        ) : (
                                                            'REVEAL RESULT'
                                                        )}
                                                    </button>
                                                )
                                            ) : (
                                                <span className="bg-brand-primary/5 text-brand-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-primary/10">ACTIVE</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-4 py-8 text-center text-slate-500 text-sm">
                                        No tickets purchased yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RecentTickets;
