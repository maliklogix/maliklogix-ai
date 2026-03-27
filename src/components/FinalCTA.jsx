import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FinalCTA = () => {
    return (
        <section className="py-24 px-8 lg:px-20 bg-[var(--background)] transition-colors duration-500 overflow-hidden relative border-t border-[var(--border)]">
            <div className="max-w-7xl mx-auto bg-accent rounded-[3.5rem] p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 text-white relative z-10 shadow-3xl shadow-accent/40 overflow-hidden">
                <div className="max-w-xl">
                    <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-[1.1] tracking-tight">
                        Ready to <br /><span className="italic underline underline-offset-8 decoration-white/30">Automate</span> Your Business?
                    </h2>
                    <p className="text-xl text-white/80 font-body mb-0 leading-relaxed max-w-md">
                        Tell us what's slowing you down. We'll tell you exactly how to fix it.
                    </p>
                </div>

                <div className="flex flex-col gap-6 w-full md:w-auto items-center">
                    <Link to="/contact" className="px-12 py-7 bg-white text-accent font-bold rounded-[1.5rem] text-2xl flex items-center justify-center gap-4 hover:scale-105 transition-all active:scale-95 shadow-2xl shadow-black/10 hover:shadow-white/20">
                        Book a Free Automation Strategy Call
                        <ArrowUpRight size={28} />
                    </Link>
                    <div className="flex items-center gap-3 opacity-60">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white">Free Audit Available Today</span>
                    </div>
                </div>

                {/* Decorative BG element */}
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-[80px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            </div>

            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-accent/20 blur-xl" />
        </section>
    );
};

export default FinalCTA;
