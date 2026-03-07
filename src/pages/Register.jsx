import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Mail, Lock, User, Phone, UserPlus, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Phone number validation
        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(formData.phoneNumber)) {
            setError('Phone number must start with 0 and be exactly 10 digits (e.g., 0912345678)');
            return;
        }

        setLoading(true);
        try {
            await api.post('/auth/register', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-8 md:py-12 bg-slate-50 text-slate-900">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] md:w-full h-[300px] md:h-[500px] bg-brand-primary/10 blur-[80px] md:blur-[120px] rounded-full -z-0"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 w-full max-w-md p-6 md:p-10 rounded-3xl relative z-10"
            >
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-slate-900">Create Account</h2>
                    <p className="text-slate-500 text-sm md:text-base">Join EthioDigital Lottery and start winning today</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl mb-6 flex items-start gap-3">
                        <ShieldAlert className="shrink-0 text-red-500" size={20} />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-xs md:text-sm font-semibold text-slate-600 ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 rounded-xl py-3 pl-12 pr-4 outline-none transition text-slate-900 placeholder:text-slate-400 text-sm md:text-base"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-xs md:text-sm font-semibold text-slate-600 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 rounded-xl py-3 pl-12 pr-4 outline-none transition text-slate-900 placeholder:text-slate-400 text-sm md:text-base"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-xs md:text-sm font-semibold text-slate-600 ml-1">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                name="phoneNumber"
                                required
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 rounded-xl py-3 pl-12 pr-4 outline-none transition text-slate-900 placeholder:text-slate-400 text-sm md:text-base"
                                placeholder="0912345678"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-xs md:text-sm font-semibold text-slate-600 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 rounded-xl py-3 pl-12 pr-4 outline-none transition text-slate-900 placeholder:text-slate-400 text-sm md:text-base"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full premium-gradient py-3.5 md:py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-md shadow-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 mt-4 md:mt-6 text-sm md:text-base"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                Create Account <UserPlus size={20} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 md:mt-8 text-center text-slate-500 text-xs md:text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-brand-primary font-bold hover:text-brand-primary/80 transition-colors">
                        Sign In
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
