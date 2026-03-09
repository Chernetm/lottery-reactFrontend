import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, LogOut, Ticket, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { name: 'Buy Lotteries', path: '/lotteries' },
        { name: 'About', path: '/about' },
        { name: 'Winners', path: '/winners' },
    ];

    return (
        <nav className="bg-ethio-blue sticky top-0 z-50 px-6 py-3 shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl md:text-2xl font-black text-white flex items-center gap-2 tracking-tight">
                    <div className="bg-white p-1.5 rounded-lg">
                        <Ticket className="text-ethio-blue" size={24} />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-[10px] uppercase font-bold text-ethio-gold opacity-80">Ethiopian</span>
                        <span className="text-sm md:text-lg">Digital Lottery</span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-10">
                    <div className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-white/90 hover:text-ethio-gold transition-colors font-bold text-sm uppercase tracking-wide"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="h-6 w-px bg-white/20 mx-2"></div>

                    {user ? (
                        <div className="flex items-center gap-6">
                            <Link
                                to={user.role === 'ADMIN' ? '/admin' : '/dashboard'}
                                className="flex items-center gap-2 text-white hover:text-ethio-gold transition"
                            >
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                    {user.role === 'ADMIN' ? <Settings size={16} /> : <User size={16} />}
                                </div>
                                <span className="text-sm font-bold truncate max-w-[100px]">{user.fullName}</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                title="Sign Out"
                                className="w-8 h-8 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500 transition border border-red-500/20 hover:text-white"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/register" className="text-white border-2 border-white/20 px-6 py-2 rounded-full text-sm font-black hover:bg-white hover:text-ethio-blue transition-all uppercase tracking-widest">
                                Register
                            </Link>
                            <Link to="/login" className="bg-white text-ethio-blue px-6 py-2 rounded-full text-sm font-black hover:bg-ethio-gold hover:text-white transition-all shadow-lg uppercase tracking-widest">
                                Login
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="lg:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden absolute top-full left-0 w-full bg-ethio-blue border-t border-white/10 overflow-hidden"
                    >
                        <div className="p-6 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-white text-lg font-bold uppercase tracking-wide border-b border-white/5 pb-2"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            
                            {user ? (
                                <div className="flex flex-col gap-5 pt-2">
                                    <Link 
                                        to={user.role === 'ADMIN' ? '/admin' : '/dashboard'} 
                                        onClick={() => setIsOpen(false)} 
                                        className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 text-white"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-ethio-gold/20 flex items-center justify-center text-ethio-gold">
                                            {user.role === 'ADMIN' ? <Settings size={20} /> : <User size={20} />}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-white/50 uppercase font-black tracking-widest">Dashboard</span>
                                            <span className="text-lg font-black truncate max-w-[200px]">{user.fullName}</span>
                                        </div>
                                    </Link>
                                    <button 
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }} 
                                        className="flex items-center justify-center gap-2 bg-red-500/10 text-red-400 py-4 rounded-2xl font-black uppercase text-xs tracking-widest border border-red-500/20"
                                    >
                                        <LogOut size={18} /> Sign Out
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3 pt-2">
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="bg-white text-ethio-blue py-3 rounded-full text-center font-black uppercase tracking-widest">Login</Link>
                                    <Link to="/register" onClick={() => setIsOpen(false)} className="border-2 border-white/20 text-white py-3 rounded-full text-center font-black uppercase tracking-widest">Register</Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
