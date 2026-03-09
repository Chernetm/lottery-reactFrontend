import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Instagram, Youtube, Send, Mail, Phone, MapPin, Facebook, Linkedin, Twitter, MessageCircle } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-ethio-blue border-t border-white/5 py-8 md:py-12 px-6 mt-20 text-white/50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10">
                {/* Brand, Socials & Contact */}
                <div className="flex flex-col items-center md:items-start gap-4 md:gap-6 w-full md:w-auto">
                    <Link to="/" className="text-lg md:text-xl font-black text-white flex items-center gap-2 tracking-tight">
                        <div className="bg-white p-1 rounded-lg">
                            <Ticket className="text-ethio-blue" size={16} />
                        </div>
                        <span className="text-xs md:text-sm uppercase tracking-wider">EthioDigital Lottery</span>
                    </Link>
                    
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                        <div className="flex items-center gap-3">
                            <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-ethio-gold transition-all group">
                                <Send size={16} className="group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-ethio-gold transition-all group">
                                <Youtube size={16} className="group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-ethio-gold transition-all group">
                                <Instagram size={16} className="group-hover:scale-110 transition-transform" />
                            </a>
                        </div>
                        
                        <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                            <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                                <Phone size={12} className="text-ethio-gold" />
                                <span>+251 911 22 33 44</span>
                            </div>
                            <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                                <Mail size={12} className="text-ethio-gold" />
                                <span>support@ethiolotto.et</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Safety & Copyright */}
                <div className="flex flex-col items-center md:items-end gap-4 md:gap-6 text-center md:text-right w-full md:w-auto mt-4 md:mt-0">
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1 md:px-4 md:py-2 rounded-xl border border-white/10">
                        <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-red-500 rounded-full flex items-center justify-center text-red-500 font-black text-[8px] md:text-[10px]">18+</div>
                        <p className="text-[8px] md:text-[10px] uppercase font-bold tracking-[0.2em] leading-none">Play Responsibly</p>
                    </div>
                    
                    <div className="space-y-1">
                        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white/30">© 2026 ethiodigitallottery</p>
                        <div className="flex justify-center md:justify-end gap-3 md:gap-4">
                            <Link to="/" className="text-[8px] md:text-[9px] hover:text-white transition uppercase tracking-[0.2em] font-bold">Privacy</Link>
                            <Link to="/" className="text-[8px] md:text-[9px] hover:text-white transition uppercase tracking-[0.2em] font-bold">Terms</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
