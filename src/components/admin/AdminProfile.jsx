import React from 'react';
import { motion } from 'framer-motion';
import { User as UserIcon, Shield, Lock } from 'lucide-react';

const AdminProfile = ({ 
    admin, 
    passwordData, 
    setPasswordData, 
    handlePasswordChange, 
    message 
}) => {
    return (
        <motion.div
            key="profile"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
        >
            <div className="space-y-6">
                <div className="glass-effect p-6 md:p-8 rounded-2xl md:rounded-3xl">
                    <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">
                            <UserIcon size={32} className="md:w-10 md:h-10" />
                        </div>
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold">{admin?.fullName}</h3>
                            <p className="text-slate-400 text-sm">{admin?.email}</p>
                        </div>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        <div className="p-3 md:p-4 bg-slate-800/50 rounded-xl md:rounded-2xl border border-slate-700 flex justify-between items-center">
                            <span className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-widest">Admin ID</span>
                            <span className="font-mono text-[10px] md:text-xs text-brand-primary">{admin?.id}</span>
                        </div>
                        <div className="p-3 md:p-4 bg-slate-800/50 rounded-xl md:rounded-2xl border border-slate-700 flex justify-between items-center">
                            <span className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-widest">Role</span>
                            <span className="font-bold text-[10px] md:text-xs bg-brand-primary/10 text-brand-primary px-2.5 py-1 rounded-full">{admin?.role}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="glass-effect p-6 md:p-8 rounded-2xl md:rounded-3xl">
                    <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2">
                        <Shield size={20} className="text-brand-secondary" />
                        Security Settings
                    </h3>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider text-[10px] md:text-xs">Current Password</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-4 top-3.5 text-slate-500 md:w-[18px] md:h-[18px]" />
                                <input
                                    type="password"
                                    value={passwordData.oldPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-11 md:pl-12 pr-4 outline-none focus:border-brand-primary transition text-sm md:text-base"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider text-[10px] md:text-xs">New Password</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-4 top-3.5 text-brand-primary md:w-[18px] md:h-[18px]" />
                                <input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-11 md:pl-12 pr-4 outline-none focus:border-brand-primary transition text-sm md:text-base"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider text-[10px] md:text-xs">Confirm New Password</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-4 top-3.5 text-brand-primary md:w-[18px] md:h-[18px]" />
                                <input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-11 md:pl-12 pr-4 outline-none focus:border-brand-primary transition text-sm md:text-base"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-slate-700 hover:bg-slate-600 py-3.5 md:py-3 rounded-xl font-bold text-white transition mt-2 text-sm md:text-base"
                        >
                            Update Password
                        </button>
                    </form>
                    {message.text && (
                        <p className={`mt-4 text-xs md:text-sm text-center font-medium ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                            {message.text}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default AdminProfile;
