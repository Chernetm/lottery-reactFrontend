import React from 'react';
import { Shield, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const SecuritySettings = ({ passwordData, setPasswordData, handlePasswordChange, message }) => {
    return (
        <div className="space-y-6">
            <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-10 rounded-3xl">
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
                    <div className="p-2.5 bg-brand-secondary/10 text-brand-secondary rounded-xl">
                        <Shield size={24} />
                    </div>
                    Security Settings
                </h3>
                <form onSubmit={handlePasswordChange} className="space-y-5">
                    <div className="space-y-2">
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Current Password</label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="password"
                                value={passwordData.oldPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all text-slate-900 text-sm"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">New Password</label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary" />
                            <input
                                type="password"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all text-slate-900 text-sm"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Confirm New Password</label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary" />
                            <input
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all text-slate-900 text-sm"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-slate-800 py-4 rounded-2xl font-bold text-white transition-all shadow-lg shadow-slate-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 mt-4 text-sm"
                    >
                        Update Security Credentials
                    </button>
                </form>
                {message.text && (
                    <motion.p 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-6 text-xs md:text-sm text-center font-bold px-4 py-3 rounded-xl border ${message.type === 'success' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}
                    >
                        {message.text}
                    </motion.p>
                )}
            </div>
        </div>
    );
};

export default SecuritySettings;

