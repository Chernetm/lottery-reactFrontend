import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, ShieldCheck, Zap } from 'lucide-react';

const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="text-center mb-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-extrabold mb-6"
                >
                    Redefining the <span className="premium-text-gradient">Lottery Experience</span>
                </motion.h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    MegaLotto was founded with a single mission: to create the most transparent, fair, and rewarding lottery platform in the digital age.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                <div className="glass-effect p-10 rounded-3xl">
                    <div className="p-4 bg-brand-primary/10 text-brand-primary rounded-2xl w-fit mb-6">
                        <Target size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                    <p className="text-slate-400">
                        We believe that everyone deserves a fair shot at winning. By combining cutting-edge technology with provably fair algorithms, we've removed the "black box" of traditional lotteries.
                    </p>
                </div>
                <div className="glass-effect p-10 rounded-3xl">
                    <div className="p-4 bg-brand-secondary/10 text-brand-secondary rounded-2xl w-fit mb-6">
                        <Zap size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Our Technology</h3>
                    <p className="text-slate-400">
                        Our draw engine uses HMAC-SHA256 hashing to ensure that results are truly random and verifiable by any participant after the draw is complete.
                    </p>
                </div>
            </div>

            <div className="text-center bg-slate-800/30 border border-slate-700 p-16 rounded-[3rem]">
                <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-3">
                    <ShieldCheck className="text-brand-primary" size={36} /> Trusted by Winners
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                    <div>
                        <p className="text-4xl font-black mb-2">$5M+</p>
                        <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">Total Payouts</p>
                    </div>
                    <div>
                        <p className="text-4xl font-black mb-2">120K+</p>
                        <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">Active Users</p>
                    </div>
                    <div>
                        <p className="text-4xl font-black mb-2">0</p>
                        <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">Security Breaches</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
