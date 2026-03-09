import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <div className="min-h-[80vh]">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-20">
                        <h1 className="text-3xl md:text-6xl font-black mb-6 text-ethio-blue uppercase tracking-tighter">Contact <span className="text-ethio-gold underline decoration-4 underline-offset-8">Support</span></h1>
                        <p className="text-slate-500 text-lg md:text-xl font-bold uppercase text-xs tracking-widest">
                            We're here to help you 24/7.
                        </p>
                    </div>
 
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        <div className="bg-ethio-light border border-slate-100 p-10 rounded-[2.5rem] text-center flex flex-col items-center gap-6 shadow-xl shadow-ethio-blue/5 group hover:-translate-y-2 transition-all">
                            <div className="p-6 bg-white text-ethio-blue rounded-[2rem] shadow-lg group-hover:bg-ethio-blue group-hover:text-white transition-all">
                                <Mail size={32} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Email Support</p>
                                <p className="text-lg font-black text-ethio-blue truncate w-full max-w-[200px]">support@ethiodigitallotto.com</p>
                            </div>
                        </div>
 
                        <div className="bg-ethio-light border border-slate-100 p-10 rounded-[2.5rem] text-center flex flex-col items-center gap-6 shadow-xl shadow-ethio-blue/5 group hover:-translate-y-2 transition-all">
                            <div className="p-6 bg-white text-ethio-blue rounded-[2rem] shadow-lg group-hover:bg-ethio-blue group-hover:text-white transition-all">
                                <Phone size={32} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Call Center</p>
                                <p className="text-xl font-black text-ethio-blue">+251 111 22 33 44</p>
                            </div>
                        </div>
 
                        <div className="bg-ethio-light border border-slate-100 p-10 rounded-[2.5rem] text-center flex flex-col items-center gap-6 shadow-xl shadow-ethio-blue/5 group hover:-translate-y-2 transition-all">
                            <div className="p-6 bg-white text-ethio-blue rounded-[2rem] shadow-lg group-hover:bg-ethio-blue group-hover:text-white transition-all">
                                <MapPin size={32} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Office Location</p>
                                <p className="text-xl font-black text-ethio-blue">Addis Ababa, Ethiopia</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
