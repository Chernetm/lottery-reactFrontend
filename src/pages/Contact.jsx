import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <div className="bg-slate-50 min-h-[80vh] text-slate-900">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-8"><span className="premium-text-gradient">ያግኙን</span></h1>
                        <p className="text-slate-600 text-base md:text-lg">
                            Have questions about a draw, your account, or how to buy tickets? Our support team is here to help you 24/7.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                        <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-8 rounded-3xl text-center flex flex-col items-center gap-3 md:gap-4 transition-transform hover:-translate-y-1">
                            <div className="p-4 bg-brand-primary/10 text-brand-primary rounded-2xl">
                                <Mail size={24} />
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs md:text-sm font-medium mb-1">Email Us</p>
                                <p className="text-base md:text-lg font-bold text-slate-900">ethiodigitallottory@gmail.com</p>
                            </div>
                        </div>

                        <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-8 rounded-3xl text-center flex flex-col items-center gap-3 md:gap-4 transition-transform hover:-translate-y-1">
                            <div className="p-4 bg-brand-primary/10 text-brand-primary rounded-2xl">
                                <Phone size={24} />
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs md:text-sm font-medium mb-1">Call Us</p>
                                <p className="text-base md:text-lg font-bold text-slate-900">+251 96 931 2020</p>
                            </div>
                        </div>

                        <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-8 rounded-3xl text-center flex flex-col items-center gap-3 md:gap-4 transition-transform hover:-translate-y-1 sm:col-span-2 md:col-span-1">
                            <div className="p-4 bg-brand-primary/10 text-brand-primary rounded-2xl">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs md:text-sm font-medium mb-1">Visit Us</p>
                                <p className="text-base md:text-lg font-bold text-slate-900">Addis Ababa, Ethiopia</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
