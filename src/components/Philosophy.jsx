import React from 'react';
import { Quote } from 'lucide-react';

const Philosophy = () => {
    return (
        <section className="py-24 px-8 lg:px-20 bg-[var(--background)] transition-colors duration-500">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-start">
                <div className="md:w-1/2">
                    <div className="relative">
                        <Quote className="absolute -top-10 -left-10 w-20 h-20 text-accent/10" />
                        <h2 className="text-4xl md:text-6xl font-display text-[var(--foreground)] leading-tight mb-8">
                            We believe that <span className="text-accent underline decoration-accent/20 underline-offset-8">Growth is a Math Problem</span>, not a guessing game.
                        </h2>
                        <p className="text-[var(--secondary)] text-xl font-body leading-relaxed">
                            In an era of generative AI and algorithmic dominance, the competitive advantage shifts from "who has the best idea" to "who has the best system." We build the system.
                        </p>
                    </div>

                    <div className="mt-12 flex items-center gap-6 p-6 border border-accent/10 bg-accent/5 rounded-2xl backdrop-blur-sm">
                        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-[var(--background)] text-2xl font-display font-medium shadow-lg shadow-accent/20">
                            ML
                        </div>
                        <div>
                            <p className="text-[var(--foreground)] font-bold">Malik Logix</p>
                            <p className="text-xs text-accent font-mono uppercase tracking-widest">Growth Architect & Founder</p>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2 grid grid-cols-2 gap-4">
                    {[
                        { label: 'Data Integrity', value: '100%' },
                        { label: 'AI Sync', value: '24/7' },
                        { label: 'Transparency', value: 'Full' },
                        { label: 'Philosophy', value: 'Results' }
                    ].map((item, i) => (
                        <div key={i} className="p-8 bg-[var(--foreground)]/[0.02] border border-[var(--foreground)]/5 rounded-3xl group hover:border-accent/40 transition-all duration-500">
                            <div className="text-sm font-mono text-[var(--secondary)] uppercase tracking-tighter mb-2 group-hover:text-accent font-bold">
                                {item.label}
                            </div>
                            <div className="text-3xl font-display font-bold text-[var(--foreground)] group-hover:scale-110 transition-transform origin-left">
                                {item.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Philosophy;
