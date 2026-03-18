import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Phone, Lock, LogIn, ShieldAlert, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const type = searchParams.get('type') === 'admin' ? 'admin' : 'user';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Phone number validation (if it starts with 0)
        if (identifier.startsWith('0')) {
            const phoneRegex = /^0\d{9}$/;
            if (!phoneRegex.test(identifier)) {
                setError('Phone number must be exactly 10 digits (e.g., 0912345678)');
                return;
            }
        }

        try {
            await login(identifier, password, type);
            const redirectPath = searchParams.get('redirect') || (location.state?.from) || (type === 'admin' ? '/admin' : '/dashboard');
            navigate(redirectPath);
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
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
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-slate-900">
                        {type === 'admin' ? 'Admin Gateway' : 'Welcome Back'}
                    </h2>
                    <p className="text-slate-500 text-sm md:text-base">
                        {type === 'admin' ? 'Access the management control center' : 'Login to your account to continue winning'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl mb-6 flex items-start gap-3">
                        <ShieldAlert className="shrink-0 text-red-500" size={20} />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-xs md:text-sm font-semibold text-slate-600 ml-1">Phone Number / Email</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                required
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 rounded-xl py-3 pl-12 pr-4 outline-none transition text-slate-900 placeholder:text-slate-400 text-sm md:text-base"
                                placeholder="0911223344 or email@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5 md:space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-xs md:text-sm font-semibold text-slate-600">Password</label>
                            <Link to="/forgot-password" size="sm" className="text-xs font-medium text-brand-primary hover:text-brand-primary/80 transition-colors">Forgot password?</Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 rounded-xl py-3 pl-12 pr-4 outline-none transition text-slate-900 placeholder:text-slate-400 text-sm md:text-base"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full premium-gradient py-3.5 md:py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-md shadow-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 text-sm md:text-base"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                Sign In <LogIn size={20} />
                            </>
                        )}
                    </button>
                </form>

                {type !== 'admin' ? (
                    <div className="mt-6 md:mt-8 text-center text-slate-500 text-xs md:text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-brand-primary font-bold hover:text-brand-primary/80 transition-colors">
                            Create an account
                        </Link>
                    </div>
                ) : (
                    <div className="mt-6 md:mt-8 text-center text-slate-500 text-xs md:text-sm">
                        Need an admin account?{' '}
                        <Link to="/admin/register" className="text-brand-primary font-bold hover:text-brand-primary/80 transition-colors">
                            Register as Admin
                        </Link>
                    </div>
                )}

                {type === 'user' ? (
                    <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                        <Link to="/login?type=admin" className="text-slate-400 hover:text-slate-600 font-medium text-xs flex items-center justify-center gap-1.5 group transition-colors">
                            Admin Login <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                ) : (
                    <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                        <Link to="/login" className="text-slate-400 hover:text-slate-600 font-medium text-xs flex items-center justify-center gap-1.5 group transition-colors">
                            Back to User Login <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Login;
