import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, ShieldAlert, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const type = searchParams.get('type') === 'admin' ? 'admin' : 'user';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password, type);
            navigate(type === 'admin' ? '/admin' : '/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-primary/5 blur-[120px] rounded-full -z-0"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-effect w-full max-w-md p-8 md:p-10 rounded-3xl relative z-10"
            >
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-2">
                        {type === 'admin' ? 'Admin Gateway' : 'Welcome Back'}
                    </h2>
                    <p className="text-slate-400">
                        {type === 'admin' ? 'Access the management control center' : 'Login to your account to continue winning'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 flex items-start gap-3">
                        <ShieldAlert className="shrink-0" size={20} />
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-700 focus:border-brand-primary rounded-xl py-3 pl-12 pr-4 outline-none transition"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-sm font-medium text-slate-300">Password</label>
                            <Link to="/forgot-password" size="sm" className="text-xs text-brand-primary hover:underline">Forgot password?</Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-700 focus:border-brand-primary rounded-xl py-3 pl-12 pr-4 outline-none transition"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full premium-gradient py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-brand-primary/20 transition-all disabled:opacity-50"
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
                    <div className="mt-8 text-center text-slate-400 text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-brand-primary font-bold hover:underline">
                            Create an account
                        </Link>
                    </div>
                ) : (
                    <div className="mt-8 text-center text-slate-400 text-sm">
                        Need an admin account?{' '}
                        <Link to="/admin/register" className="text-brand-primary font-bold hover:underline">
                            Register as Admin
                        </Link>
                    </div>
                )}

                {type === 'user' ? (
                    <div className="mt-6 pt-6 border-t border-slate-800 text-center">
                        <Link to="/login?type=admin" className="text-slate-500 hover:text-slate-300 text-xs flex items-center justify-center gap-1 group">
                            Admin Login <ArrowRight size={12} className="group-hover:translate-x-0.5 transition" />
                        </Link>
                    </div>
                ) : (
                    <div className="mt-6 pt-6 border-t border-slate-800 text-center">
                        <Link to="/login" className="text-slate-500 hover:text-slate-300 text-xs flex items-center justify-center gap-1 group">
                            Back to User Login <ArrowRight size={12} className="group-hover:translate-x-0.5 transition" />
                        </Link>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Login;
