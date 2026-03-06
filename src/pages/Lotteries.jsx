import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight, Search, Filter } from 'lucide-react';
import { getAllLotteries } from '../api/lottery';
import { Link } from 'react-router-dom';

const Lotteries = () => {
    const [activeLotteries, setActiveLotteries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchLotteries = async () => {
            try {
                const data = await getAllLotteries('ACTIVE');
                setActiveLotteries(data);
            } catch (error) {
                console.error('Failed to fetch lotteries', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLotteries();
    }, []);

    const filteredLotteries = activeLotteries.filter(lottery => 
        lottery.item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">Available Lotteries</h1>
                <p className="text-slate-400">Choose your lucky draw and win high-end tech, gadgets, and more.</p>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-12">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search lotteries..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 focus:border-brand-primary outline-none transition"
                    />
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="glass-effect h-[450px] rounded-3xl animate-pulse bg-slate-800/50"></div>
                    ))}
                </div>
            ) : filteredLotteries.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredLotteries.map((lottery) => (
                        <motion.div
                            key={lottery.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -10 }}
                            className="glass-effect rounded-3xl overflow-hidden group border border-slate-800 hover:border-brand-primary/30 transition-all duration-300"
                        >
                            <div className="h-56 overflow-hidden relative">
                                <img
                                    src={lottery.item.imageUrl || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop'}
                                    alt={lottery.item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                />
                                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                                    <div className="bg-brand-primary px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-lg uppercase tracking-wider">
                                        Active
                                    </div>
                                    {lottery.prizes && lottery.prizes.length > 0 && (
                                        <div className="bg-slate-900/80 backdrop-blur-sm border border-brand-primary/30 px-3 py-1 rounded-full text-[10px] font-bold text-brand-primary shadow-lg flex items-center gap-1">
                                            <Trophy size={10} /> {lottery.prizes.length} prizes
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-brand-primary transition-colors">{lottery.item.name}</h3>
                                <p className="text-slate-400 text-sm mb-8 line-clamp-2">{lottery.item.description}</p>

                                <div className="flex justify-between items-center mb-8 bg-slate-800/30 p-4 rounded-2xl border border-slate-700/50">
                                    <div>
                                        <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Price</p>
                                        <p className="text-2xl font-bold text-brand-primary">${lottery.ticketPrice}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Sold</p>
                                        <p className="text-lg font-bold">{lottery.totalTickets}{lottery.maxTickets ? ` / ${lottery.maxTickets}` : ''}</p>
                                    </div>
                                </div>

                                <Link
                                    to={`/lottery/${lottery.id}`}
                                    className="block w-full text-center py-4 bg-brand-primary text-white rounded-2xl font-bold hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2"
                                >
                                    Participate Now <ArrowRight size={18} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="glass-effect p-20 rounded-3xl text-center border border-dashed border-slate-700">
                    <p className="text-slate-400 text-lg">No lotteries found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default Lotteries;
