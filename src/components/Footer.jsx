import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Instagram, Youtube, Send, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 py-6 px-6 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <Link to="/" className="text-xl font-bold premium-text-gradient flex items-center gap-2">
                        <Ticket className="text-brand-primary" size={20} />
                        <span>EthioDigital Lottery</span>
                    </Link>
                    <p className="hidden md:block text-slate-500 text-sm border-l border-slate-800 pl-6">
                        © 2026 All rights reserved.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <a href="#" title="Instagram" className="text-slate-400 hover:text-brand-primary transition-colors">
                        <Instagram size={18} />
                    </a>
                    <a href="#" title="Telegram" className="text-slate-400 hover:text-brand-primary transition-colors">
                        <Send size={18} />
                    </a>
                    <a href="#" title="Youtube" className="text-slate-400 hover:text-brand-primary transition-colors">
                        <Youtube size={18} />
                    </a>
                    <a href="mailto:support@ethiodigitallotto.com" title="Email" className="text-slate-400 hover:text-brand-primary transition-colors">
                        <Mail size={18} />
                    </a>
                </div>

                <p className="md:hidden text-slate-500 text-sm">
                    © 2026 EthioDigital Lottery. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
