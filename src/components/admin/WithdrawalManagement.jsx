import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const WithdrawalManagement = ({ withdrawals, handleUpdateWithdrawalStatus }) => {
    return (
        <motion.div
            key="withdrawals"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <h2 className="text-2xl md:text-3xl font-bold">Withdrawal Requests</h2>
            <div className="glass-effect rounded-2xl md:rounded-3xl overflow-hidden border border-slate-700">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[700px] md:min-w-full">
                        <thead className="bg-slate-800/50 border-b border-slate-700">
                            <tr>
                                <th className="px-4 md:px-6 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase">User</th>
                                <th className="px-4 md:px-6 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase">Amount</th>
                                <th className="px-4 md:px-6 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase text-center">Date</th>
                                <th className="px-4 md:px-6 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {withdrawals.length > 0 ? (
                                withdrawals.map((w) => (
                                    <tr key={w.id} className="hover:bg-slate-800/30 transition">
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                                            <div className="font-bold text-xs md:text-sm">{w.user?.fullName}</div>
                                            <div className="text-[10px] text-slate-500 truncate max-w-[120px]">{w.user?.email}</div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5 font-bold text-sm md:text-lg">${w.amount.toFixed(2)}</td>
                                        <td className="px-4 md:px-6 py-4 md:py-5 text-slate-300 text-[10px] md:text-xs text-center">
                                            {new Date(w.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5 text-right">
                                            <div className="flex flex-col items-end gap-2">
                                                <span className={`px-2 md:px-3 py-1 rounded-full text-[9px] md:text-xs font-bold ${w.status === 'APPROVED' ? 'bg-green-500/10 text-green-400' :
                                                    w.status === 'REJECTED' ? 'bg-red-500/10 text-red-400' :
                                                        'bg-yellow-500/10 text-yellow-500'
                                                    }`}>
                                                    {w.status}
                                                </span>
                                                {w.status === 'PENDING' && (
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => handleUpdateWithdrawalStatus(w.id, 'APPROVED')}
                                                            className="p-1.5 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition"
                                                            title="Approve"
                                                        >
                                                            <Check size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleUpdateWithdrawalStatus(w.id, 'REJECTED')}
                                                            className="p-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                                                            title="Reject"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-10 text-center text-slate-500 text-sm">
                                        No withdrawal requests found.
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

export default WithdrawalManagement;
