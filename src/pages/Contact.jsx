import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div>
                    <h1 className="text-5xl font-extrabold mb-8">Get in <span className="premium-text-gradient">Touch</span></h1>
                    <p className="text-slate-400 text-lg mb-12">
                        Have questions about a draw, your account, or how to buy tickets? Our support team is here to help you 24/7.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-brand-primary/10 text-brand-primary rounded-2xl">
                                <Mail size={24} />
                            </div>
                            <div>
                                <p className="text-slate-500 text-sm">Email Us</p>
                                <p className="text-xl font-bold">support@megalotto.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-brand-primary/10 text-brand-primary rounded-2xl">
                                <Phone size={24} />
                            </div>
                            <div>
                                <p className="text-slate-500 text-sm">Call Us</p>
                                <p className="text-xl font-bold">+1 (888) 123-MEGA</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-brand-primary/10 text-brand-primary rounded-2xl">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <p className="text-slate-500 text-sm">Visit Us</p>
                                <p className="text-xl font-bold">123 Fortune Ave, Vegas, NV</p>
                            </div>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-effect p-10 rounded-[2.5rem]"
                >
                    <h3 className="text-2xl font-bold mb-8">Send us a Message</h3>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 ml-1">First Name</label>
                                <input className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-brand-primary h-14" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 ml-1">Last Name</label>
                                <input className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-brand-primary h-14" placeholder="Doe" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Subject</label>
                            <input className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-brand-primary h-14" placeholder="I have a question about..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Message</label>
                            <textarea className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-brand-primary h-32" placeholder="Tell us more..." />
                        </div>
                        <button className="w-full premium-gradient py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-xl hover:scale-[1.01] transition-all">
                            Send Message <Send size={20} />
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
