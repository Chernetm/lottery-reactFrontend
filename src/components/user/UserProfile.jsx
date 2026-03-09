import React from 'react';
import { User as UserIcon } from 'lucide-react';

const UserProfile = ({ user }) => {
    return (
        <div className="space-y-6">
            <div className="glass-effect p-6 md:p-10 rounded-3xl border border-slate-700">
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 border-b border-slate-700 pb-8">
                    <div className="w-20 h-20 bg-slate-800/50 rounded-2xl flex items-center justify-center text-brand-primary shrink-0 shadow-sm border border-slate-700">
                        <UserIcon size={40} />
                    </div>
                    <div className="text-center sm:text-left">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white">{user.fullName}</h3>
                        <p className="text-slate-400 font-medium">{user.email}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-4 md:p-5 bg-slate-800/30 rounded-2xl border border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 group hover:bg-slate-800/50 hover:border-brand-primary/20 transition-all">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Account ID</span>
                        <span className="font-mono text-xs text-brand-primary font-bold bg-slate-900 px-3 py-1 rounded-lg border border-slate-700 shadow-sm">{user.id}</span>
                    </div>
                    <div className="p-4 md:p-5 bg-slate-800/30 rounded-2xl border border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 group hover:bg-slate-800/50 hover:border-brand-primary/20 transition-all">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number</span>
                        <span className="font-bold text-white">{user.phoneNumber}</span>
                    </div>
                    <div className="p-4 md:p-5 bg-slate-800/30 rounded-2xl border border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 group hover:bg-slate-800/50 hover:border-brand-primary/20 transition-all">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Member Since</span>
                        <span className="font-bold text-white">{new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

