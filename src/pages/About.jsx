import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, ShieldCheck, Zap } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-slate-50 min-h-screen text-slate-900">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24">
                <div className="text-center mb-16 md:mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6"
                    >
                        የ <span className="premium-text-gradient">ሎተሪ ተሞክሮን</span> እንደገና እንቀይራለን
                    </motion.h1>
                    <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto px-4 md:px-0">
                        EthioDigital Lottery በአንድ ግልፅ ዓላማ ተመስርቷል፤ በዲጂታል ዘመን ውስጥ በጣም ግልፅ፣ ፍትሃዊ እና ተጠቃሚ የሆነ የሎተሪ መድረክ ለመፍጠር።
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24">
                    <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 md:p-10 rounded-3xl transition-transform hover:-translate-y-1">
                        <div className="p-4 bg-brand-primary/10 text-brand-primary rounded-2xl w-fit mb-6">
                            <Target size={32} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">የእኛ ራዕይ</h3>
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                            ሁሉም ሰው ለመካፈል እና ለማሸነፍ ፍትሃዊ እድል እንዲኖረው እናምናለን። ዘመናዊ ቴክኖሎጂን ከተረጋገጠ ፍትሃዊ አልጎርይዝም ጋር በመዋሃድ የባህላዊ ሎተሪዎችን የማይገለጽ ሂደት አስወግደናል።
                        </p>
                    </div>

                    <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 md:p-10 rounded-3xl transition-transform hover:-translate-y-1">
                        <div className="p-4 bg-brand-secondary/10 text-brand-secondary rounded-2xl w-fit mb-6">
                            <Zap size={32} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">ቴክኖሎጂያችን</h3>
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                            የእኛ የዕጣ ስርዓት HMAC-SHA256 ሃሽ ቴክኖሎጂ ይጠቀማል፣ ይህም ውጤቶቹ በእውነት የተዘፈቀዱ እና ከዕጣው በኋላ በማንኛውም ተሳታፊ ሊረጋገጡ የሚችሉ እንዲሆኑ ያረጋግጣል።
                        </p>
                    </div>
                </div>

                <div className="text-center bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-16 rounded-[2rem] md:rounded-[3rem]">
                    <h2 className="text-lg md:text-3xl font-bold mb-6 md:mb-8 flex items-center justify-center gap-2 md:gap-3">
                        <ShieldCheck className="text-brand-primary w-6 h-6 md:w-9 md:h-9" /> በአሸናፊዎች የታመነ
                    </h2>

                    <div className="grid grid-cols-3 gap-2 md:gap-12">
                        <div>
                            <p className="text-xl md:text-4xl font-black mb-1 md:mb-2 text-slate-900">$5M+</p>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-[8px] md:text-xs">ጠቅላላ ክፍያ</p>
                        </div>

                        <div>
                            <p className="text-xl md:text-4xl font-black mb-1 md:mb-2 text-slate-900">120K+</p>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-[8px] md:text-xs">ንቁ ተጠቃሚዎች</p>
                        </div>

                        <div>
                            <p className="text-xl md:text-4xl font-black mb-1 md:mb-2 text-slate-900">0</p>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-[8px] md:text-xs">የደህንነት ጥሰቶች</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;