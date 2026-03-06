import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold mb-8">Get in <span className="premium-text-gradient">Touch</span></h1>
                    <p className="text-slate-400 text-lg">
                        Have questions about a draw, your account, or how to buy tickets? Our support team is here to help you 24/7.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="glass-effect p-8 rounded-3xl text-center flex flex-col items-center gap-4">
                        <div className="p-4 bg-brand-primary/10 text-brand-primary rounded-2xl">
                            <Mail size={24} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm">Email Us</p>
                            <p className="text-lg font-bold">habeshalottery@gmail.com</p>
                        </div>
                    </div>

                    <div className="glass-effect p-8 rounded-3xl text-center flex flex-col items-center gap-4">
                        <div className="p-4 bg-brand-primary/10 text-brand-primary rounded-2xl">
                            <Phone size={24} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm">Call Us</p>
                            <p className="text-lg font-bold">+251 96 931 2020</p>
                        </div>
                    </div>

                    <div className="glass-effect p-8 rounded-3xl text-center flex flex-col items-center gap-4">
                        <div className="p-4 bg-brand-primary/10 text-brand-primary rounded-2xl">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm">Visit Us</p>
                            <p className="text-lg font-bold">Addis Ababa, Ethiopia</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
