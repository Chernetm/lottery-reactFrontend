import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyTickets } from '../api/ticket';
import { Ticket, Search, Filter, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Tickets = () => {
    const { user } = useAuth();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const data = await getMyTickets();
                setTickets(data);
            } catch (error) {
                console.error('Failed to fetch tickets', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, []);

    const filteredTickets = tickets.filter(t =>
        t.lottery.item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-10">
                <h1 className="text-4xl font-bold mb-2">My Ticket History</h1>
                <p className="text-slate-400">View all your past and active lottery tickets.</p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search by lottery or ticket number..."
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-brand-primary transition"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="glass-effect rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-800/50 border-b border-slate-700">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Lottery</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Ticket #</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Price</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {filteredTickets.length > 0 ? (
                                    filteredTickets.map((ticket) => (
                                        <tr key={ticket.id} className="hover:bg-slate-800/30 transition">
                                            <td className="px-6 py-5">
                                                <div className="font-bold">{ticket.lottery.item.name}</div>
                                                <div className="text-xs text-slate-500">ID: #{ticket.lottery.id}</div>
                                            </td>
                                            <td className="px-6 py-5 font-mono text-slate-300">{ticket.ticketNumber}</td>
                                            <td className="px-6 py-5 font-bold">${ticket.purchasePrice}</td>
                                            <td className="px-6 py-5 text-sm text-slate-400">
                                                {new Date(ticket.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-5">
                                                {ticket.lottery.status === 'DRAWN' ? (
                                                    ticket.lottery.winnerId === user.id ? (
                                                        <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold">WINNER</span>
                                                    ) : (
                                                        <span className="bg-slate-700/50 text-slate-400 px-3 py-1 rounded-full text-xs font-bold">BETTER LUCK NEXT TIME</span>
                                                    )
                                                ) : (
                                                    <span className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold">ACTIVE</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-10 text-center text-slate-500">
                                            No tickets found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tickets;
