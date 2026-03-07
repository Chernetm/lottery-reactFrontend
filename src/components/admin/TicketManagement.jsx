import React from 'react';
import { motion } from 'framer-motion';

const TicketManagement = ({ tickets }) => {
    return (
        <motion.div
            key="tickets"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">Ticket Management</h2>
                <p className="text-slate-400 text-sm">{tickets.length} total tickets</p>
            </div>

            <div className="glass-effect rounded-2xl md:rounded-3xl overflow-hidden border border-slate-700">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px] md:min-w-full">
                        <thead className="bg-slate-800/50 border-b border-slate-700">
                            <tr>
                                <th className="px-4 md:px-6 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase">User</th>
                                <th className="px-4 md:px-6 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase">Lottery</th>
                                <th className="px-4 md:px-6 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase">Ticket #</th>
                                <th className="px-4 md:px-6 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase">Price</th>
                                <th className="px-4 md:px-6 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {tickets.map((ticket) => (
                                <tr key={ticket.id} className="hover:bg-slate-800/30 transition">
                                    <td className="px-4 md:px-6 py-4 md:py-5">
                                        <div className="font-bold text-xs md:text-sm">{ticket.user.fullName}</div>
                                        <div className="text-[10px] text-slate-500 truncate max-w-[120px]">{ticket.user.email}</div>
                                    </td>
                                    <td className="px-4 md:px-6 py-4 md:py-5">
                                        <div className="font-medium text-xs md:text-sm">{ticket.lottery.item.name}</div>
                                    </td>
                                    <td className="px-4 md:px-6 py-4 md:py-5 font-mono text-slate-300 text-[10px] md:text-xs">{ticket.ticketNumber}</td>
                                    <td className="px-4 md:px-6 py-4 md:py-5 font-bold text-xs md:text-sm">${ticket.purchasePrice}</td>
                                    <td className="px-4 md:px-6 py-4 md:py-5 text-right">
                                        <div className="flex flex-col items-end gap-2">
                                            <span className={`px-2 md:px-3 py-1 rounded-full text-[9px] md:text-xs font-bold ${ticket.status === 'REFUNDED' ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
                                                }`}>
                                                {ticket.status}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {tickets.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-slate-500 text-sm">
                                        No tickets found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default TicketManagement;
