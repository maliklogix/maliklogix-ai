import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const questions = [
        { q: "How does AI actually save me time?", a: "Our AI systems identify manual bottlenecks across Shopify, Amazon, and internal tools, then execute those tasks autonomously 24/7 without human intervention." },
        { q: "Do you replace my current team?", a: "No. We replace the manual grunt work. Your team provides the operational vision; our AI handles the repetitive execution and data syncing." },
        { q: "What is 'Predictive Automation'?", a: "Unlike basic scripts, our AI systems can handle fuzzy logic, unstructured data (like raw PDFs or messy Excel files), and dynamic decision making." },
        { q: "How soon will I see results?", a: "Most businesses see an immediate efficiency lift (hours saved) within the first 14 days, with full system integration typically occurring by day 45." }
    ];

    return (
        <section className="py-16 px-8 lg:px-20 bg-[var(--background)] transition-colors duration-500 border-t border-[var(--border)]">
            <div className="max-w-4xl mx-auto">
                <div className="text-left mb-20">
                    <h2 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-4">Intelligence FAQ</h2>
                    <h3 className="text-4xl md:text-5xl font-display text-[var(--foreground)] font-bold">Common Inquiries</h3>
                </div>

                <div className="space-y-4">
                    {questions.map((item, i) => (
                        <div key={i} className="border border-[var(--border)] bg-[var(--foreground)]/[0.02] rounded-2xl overflow-hidden transition-all duration-500 hover:border-accent/40">
                            <button
                                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                className="w-full p-8 flex justify-between items-center text-left transition-colors duration-300 hover:bg-accent/[0.02]"
                            >
                                <span className={`text-xl font-display font-bold transition-colors ${activeIndex === i ? 'text-accent' : 'text-[var(--foreground)]'}`}>
                                    {item.q}
                                </span>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeIndex === i ? 'bg-accent text-white rotate-180' : 'bg-accent/10 text-accent'}`}>
                                    {activeIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                    >
                                        <div className="px-8 pb-8 text-[var(--secondary)] font-body text-lg leading-relaxed border-t border-[var(--border)] pt-6">
                                            {item.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
