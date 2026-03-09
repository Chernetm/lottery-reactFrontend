import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, ShieldCheck, Zap } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24 bg-white">
                <div className="text-center mb-16 md:mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black mb-4 md:mb-6 text-ethio-blue uppercase tracking-tighter"
                    >
                        Reinventing the <span className="text-ethio-gold underline decoration-4 underline-offset-8">Lottery Experience</span>
                    </motion.h1>
                    <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto px-4 md:px-0 font-medium">
                        EthioDigital Lottery was founded with one clear mission: to create the most transparent, fair, and rewarding lottery platform in the digital age.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24">
                    <div className="bg-ethio-light border border-slate-100 p-8 md:p-12 rounded-[2.5rem] transition-all hover:shadow-2xl hover:shadow-ethio-blue/5 group">
                        <div className="p-5 bg-white text-ethio-blue rounded-3xl w-fit mb-8 shadow-lg shadow-ethio-blue/5 group-hover:bg-ethio-blue group-hover:text-white transition-all">
                            <Target size={32} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-4 text-ethio-blue uppercase tracking-tight">Our Vision</h3>
                        <p className="text-slate-600 text-sm md:text-lg leading-relaxed font-medium">
                            We believe that everyone deserves a fair chance to participate and win. By combining state-of-the-art technology with provably fair algorithms, we've removed the opaque processes of traditional lotteries.
                        </p>
                    </div>

                    <div className="bg-ethio-light border border-slate-100 p-8 md:p-12 rounded-[2.5rem] transition-all hover:shadow-2xl hover:shadow-ethio-blue/5 group">
                        <div className="p-5 bg-white text-ethio-blue rounded-3xl w-fit mb-8 shadow-lg shadow-ethio-blue/5 group-hover:bg-ethio-blue group-hover:text-white transition-all">
                            <Zap size={32} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-4 text-ethio-blue uppercase tracking-tight">Our Technology</h3>
                        <p className="text-slate-600 text-sm md:text-lg leading-relaxed font-medium">
                            Our draw system uses HMAC-SHA256 hashing technology, ensuring that results are truly random and can be verified by any participant after the draw.
                        </p>
                    </div>
                </div>

                <div className="text-center bg-ethio-blue p-10 md:p-20 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-ethio-gold opacity-10 blur-[100px] -ml-32 -mt-32"></div>
                    <h2 className="text-2xl md:text-4xl font-black mb-12 flex items-center justify-center gap-4 uppercase tracking-tighter">
                        <ShieldCheck className="text-ethio-gold w-8 h-8 md:w-12 md:h-12" /> Trusted by Winners
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                        <div className="space-y-2">
                            <p className="text-4xl md:text-6xl font-black text-ethio-gold">$5M+</p>
                            <p className="text-white/40 font-black uppercase tracking-widest text-xs">Total Payout</p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-4xl md:text-6xl font-black text-ethio-gold">120K+</p>
                            <p className="text-white/40 font-black uppercase tracking-widest text-xs">Active Users</p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-4xl md:text-6xl font-black text-ethio-gold">No One</p>
                            <p className="text-white/40 font-black uppercase tracking-widest text-xs">Left Behind</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;