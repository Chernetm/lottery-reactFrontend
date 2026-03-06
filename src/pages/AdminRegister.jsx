import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminRegister } from '../api/auth';
import { Mail, Lock, User, UserPlus, ShieldAlert, Key, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminRegister = () => {
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
            await adminRegister(formData);
            navigate('/login?type=admin');
        } catch (err) {
            setError(err.response?.data?.error || 'Admin registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-primary/5 blur-[120px] rounded-full -z-0"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-effect w-full max-w-md p-8 md:p-10 rounded-3xl relative z-10 border border-brand-primary/20"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex p-3 bg-brand-primary/10 text-brand-primary rounded-2xl mb-4">
                        <Key size={32} />
                    </div>
                    <h2 className="text-3xl font-bold mb-2 text-white">Admin Registration</h2>
                    <p className="text-slate-400">Create a new administrator account</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 flex items-start gap-3">
                        <ShieldAlert className="shrink-0" size={20} />
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                            <input
                                type="text"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full bg-slate-800/50 border border-slate-700 focus:border-brand-primary rounded-xl py-3 pl-12 pr-4 outline-none transition text-white"
                                placeholder="Admin Name"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-slate-800/50 border border-slate-700 focus:border-brand-primary rounded-xl py-3 pl-12 pr-4 outline-none transition text-white"
                                placeholder="admin@megalotto.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                            <input
                                type="text"
                                name="phoneNumber"
                                required
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full bg-slate-800/50 border border-slate-700 focus:border-brand-primary rounded-xl py-3 pl-12 pr-4 outline-none transition text-white"
                                placeholder="0912345678"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-slate-800/50 border border-slate-700 focus:border-brand-primary rounded-xl py-3 pl-12 pr-4 outline-none transition text-white"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full premium-gradient py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-brand-primary/20 transition-all disabled:opacity-50 mt-4"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                Register Administrator <UserPlus size={20} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center text-slate-400 text-sm">
                    Already have an account?{' '}
                    <Link to="/login?type=admin" className="text-brand-primary font-bold hover:underline">
                        Admin Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminRegister;
