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
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="glass-effect sticky top-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold premium-text-gradient flex items-center gap-2 tracking-tight">
                    <div className="bg-brand-primary/20 p-1.5 rounded-lg">
                        <Ticket className="text-brand-primary" size={24} />
                    </div>
                    <span>habeshaLottery</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-slate-300 hover:text-brand-primary transition-colors font-medium"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {user ? (
                        <div className="flex items-center gap-4">
                            {user.role === 'USER' && (
                                <Link
                                    to="/dashboard"
                                    className="text-slate-300 hover:text-brand-primary flex items-center gap-2"
                                >
                                    <Ticket size={18} />
                                    <span>Tickets</span>
                                </Link>
                            )}
                            <Link
                                to={user.role === 'ADMIN' ? '/admin' : '/dashboard'}
                                className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-700 transition"
                            >
                                {user.role === 'ADMIN' ? <Settings size={18} /> : <User size={18} />}
                                <span className="text-sm font-medium">{user.fullName}</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-slate-400 hover:text-red-400 transition"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-slate-300 hover:text-brand-primary font-medium">Login</Link>
                            <Link to="/register" className="premium-gradient px-5 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition">
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-slate-300" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 w-full glass-effect border-t border-slate-700 p-6 flex flex-col gap-4"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="text-slate-300 text-lg"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <hr className="border-slate-700" />
                        {user ? (
                            <button onClick={handleLogout} className="flex items-center gap-2 text-red-400">
                                <LogOut size={18} /> Logout
                            </button>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <Link to="/login" onClick={() => setIsOpen(false)} className="text-slate-300">Login</Link>
                                <Link to="/register" onClick={() => setIsOpen(false)} className="premium-gradient px-5 py-2 rounded-lg text-center text-white font-semibold">
                                    Register
                                </Link>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
