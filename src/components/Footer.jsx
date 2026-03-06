import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 px-6 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-2">
                    <Link to="/" className="text-2xl font-bold premium-text-gradient flex items-center gap-2 mb-4">
                        <Ticket className="text-brand-primary" />
                        <span>MegaLotto</span>
                    </Link>
                    <p className="text-slate-400 max-w-sm mb-6">
                        The world's most transparent and provably fair lottery platform. Join thousands of winners and try your luck today!
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-brand-primary transition-colors">
                            <Github size={20} />
                        </a>
                        <a href="#" className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-brand-primary transition-colors">
                            <Twitter size={20} />
                        </a>
                        <a href="#" className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-brand-primary transition-colors">
                            <Instagram size={20} />
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6">Quick Links</h4>
                    <ul className="flex flex-col gap-4 text-slate-400">
                        <li><Link to="/" className="hover:text-brand-primary transition">Home</Link></li>
                        <li><Link to="/active-lotteries" className="hover:text-brand-primary transition">Active Lotteries</Link></li>
                        <li><Link to="/winners" className="hover:text-brand-primary transition">All Winners</Link></li>
                        <li><Link to="/about" className="hover:text-brand-primary transition">About Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6">Support</h4>
                    <ul className="flex flex-col gap-4 text-slate-400">
                        <li><Link to="/contact" className="hover:text-brand-primary transition">Contact Us</Link></li>
                        <li><Link to="/faq" className="hover:text-brand-primary transition">FAQ</Link></li>
                        <li><Link to="/terms" className="hover:text-brand-primary transition">Terms of Service</Link></li>
                        <li><Link to="/privacy" className="hover:text-brand-primary transition">Privacy Policy</Link></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:row justify-between items-center gap-4 text-slate-500 text-sm">
                <p>© 2026 MegaLotto. All rights reserved.</p>
                <p>Made with ❤️ for winners everywhere.</p>
            </div>
        </footer>
    );
};

export default Footer;
