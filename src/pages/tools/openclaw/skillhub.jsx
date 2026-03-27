import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle, ChevronRight, BarChart3, Target, Zap } from 'lucide-react';

export default function SkillhubPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-28 pb-16">
            
            {/* 1. Hero Section */}
            <section className="px-6 lg:px-20 py-16 md:py-24 max-w-7xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">OpenClaw SkillHub</h1>
                <p className="text-[var(--secondary)] text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-10">Browse, install, and deploy AI agent skills — built for real business automation.</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/contact" className="px-8 py-4 bg-accent text-white font-bold rounded-full flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-accent/20">
                        Book a Free Strategy Call <ArrowUpRight size={18} />
                    </Link>
                    <a href="#case-studies" className="px-8 py-4 border border-[var(--border)] rounded-full font-bold hover:border-accent/50 transition-colors">
                        View Case Studies
                    </a>
                </div>
            </section>

            {/* 2. What It Is */}
            <section className="px-6 lg:px-20 py-16 md:py-24 border-y border-[var(--border)] bg-[var(--card-bg)]">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="text-accent font-mono text-xs uppercase tracking-widest font-bold mb-4">What It Is</div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">The System</h2>
                        <p className="text-[var(--secondary)] text-lg leading-relaxed">SkillHub is MalikLogix’s curated library of AI agent skills for OpenClaw. Each skill is a pre-built, plug-and-play capability that extends what your AI agents can do — from web research and lead enrichment to CRM updates and content generation. Think of it as an app store for AI automation.</p>
                    </div>
                    <div className="h-64 md:h-96 rounded-3xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center p-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
                        <Target className="w-24 h-24 text-accent/50" />
                        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-accent/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
                    </div>
                </div>
            </section>

            {/* 3. How It Works */}
            <section className="px-6 lg:px-20 py-16 md:py-24 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="text-accent font-mono text-xs uppercase tracking-widest font-bold mb-4">Process</div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">How It Works</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                                            <div className="p-8 rounded-3xl border border-[var(--border)] bg-[var(--card-bg)] relative overflow-hidden hover:border-accent/30 transition-colors">
                            <div className="text-5xl font-display font-bold text-accent/10 absolute -top-4 -right-2">01</div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm">1</span>
                                Browse the Library
                            </h3>
                            <p className="text-[var(--secondary)] leading-relaxed">Filter skills by use case, integration, or category.</p>
                        </div>
                        <div className="p-8 rounded-3xl border border-[var(--border)] bg-[var(--card-bg)] relative overflow-hidden hover:border-accent/30 transition-colors">
                            <div className="text-5xl font-display font-bold text-accent/10 absolute -top-4 -right-2">02</div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm">2</span>
                                Install in One Click
                            </h3>
                            <p className="text-[var(--secondary)] leading-relaxed">Skills are deployed directly into your OpenClaw environment.</p>
                        </div>
                        <div className="p-8 rounded-3xl border border-[var(--border)] bg-[var(--card-bg)] relative overflow-hidden hover:border-accent/30 transition-colors">
                            <div className="text-5xl font-display font-bold text-accent/10 absolute -top-4 -right-2">03</div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm">3</span>
                                Customize & Run
                            </h3>
                            <p className="text-[var(--secondary)] leading-relaxed">Adjust parameters to match your workflow and let the agent do the rest.</p>
                        </div>
                </div>
            </section>

            {/* 4. Key Benefits */}
            <section className="px-6 lg:px-20 py-16 md:py-24 border-y border-[var(--border)] bg-[var(--card-bg)]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="text-accent font-mono text-xs uppercase tracking-widest font-bold mb-4">Value</div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">Key Benefits</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                                <div className="p-6 rounded-2xl border border-accent/20 bg-accent/5 flex flex-col items-start hover:-translate-y-1 transition-transform">
                                <CheckCircle className="w-6 h-6 text-accent mb-4" />
                                <p className="font-medium text-lg leading-snug">100+ pre-built skills ready to deploy</p>
                            </div>
                        <div className="p-6 rounded-2xl border border-accent/20 bg-accent/5 flex flex-col items-start hover:-translate-y-1 transition-transform">
                                <CheckCircle className="w-6 h-6 text-accent mb-4" />
                                <p className="font-medium text-lg leading-snug">No code required — install and run in minutes</p>
                            </div>
                        <div className="p-6 rounded-2xl border border-accent/20 bg-accent/5 flex flex-col items-start hover:-translate-y-1 transition-transform">
                                <CheckCircle className="w-6 h-6 text-accent mb-4" />
                                <p className="font-medium text-lg leading-snug">Built by the MalikLogix team, tested in real client environments</p>
                            </div>
                        <div className="p-6 rounded-2xl border border-accent/20 bg-accent/5 flex flex-col items-start hover:-translate-y-1 transition-transform">
                                <CheckCircle className="w-6 h-6 text-accent mb-4" />
                                <p className="font-medium text-lg leading-snug">New skills added weekly based on community requests</p>
                            </div>
                    </div>
                </div>
            </section>

            {/* 5. Who It's For */}
            <section className="px-6 lg:px-20 py-16 md:py-24 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="text-accent font-mono text-xs uppercase tracking-widest font-bold mb-4">Fit</div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">Who It’s For</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                    <div className="p-8 md:p-12 rounded-3xl bg-[var(--card-bg)] border border-[var(--border)]">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <Target className="text-accent" /> Ideal For
                        </h3>
                        <ul className="space-y-4">
                                                        <li className="flex gap-3 text-[var(--secondary)] text-lg">
                                    <ChevronRight className="text-accent shrink-0 mt-1 w-5 h-5" />
                                    <span>Businesses already using AI agents for automation</span>
                                </li>
                            <li className="flex gap-3 text-[var(--secondary)] text-lg">
                                    <ChevronRight className="text-accent shrink-0 mt-1 w-5 h-5" />
                                    <span>Developers building custom AI workflows</span>
                                </li>
                            <li className="flex gap-3 text-[var(--secondary)] text-lg">
                                    <ChevronRight className="text-accent shrink-0 mt-1 w-5 h-5" />
                                    <span>Marketing and ops teams wanting to expand AI capability</span>
                                </li>
                        </ul>
                    </div>
                    <div className="p-8 md:p-12 rounded-3xl bg-[var(--card-bg)] border border-[var(--border)]">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <Zap className="text-accent" /> Problems Solved
                        </h3>
                        <ul className="space-y-4">
                                                        <li className="flex gap-3 text-[var(--secondary)] text-lg">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0 mt-2.5" />
                                    <span>Rebuilding basic AI tool connections from scratch</span>
                                </li>
                            <li className="flex gap-3 text-[var(--secondary)] text-lg">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0 mt-2.5" />
                                    <span>Agents that lack real execution capabilities</span>
                                </li>
                            <li className="flex gap-3 text-[var(--secondary)] text-lg">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0 mt-2.5" />
                                    <span>High cost of custom agent development</span>
                                </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 6. Results / Metrics */}
            <section className="px-6 lg:px-20 py-20 bg-[#002e3b]">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center text-white">
                                            <div className="flex flex-col items-center p-6">
                            <BarChart3 className="w-12 h-12 text-[#00B4C8] mb-6" />
                            <p className="text-xl md:text-2xl font-display font-bold leading-tight max-w-xs">Save 10+ hours per custom integration</p>
                        </div>
                        <div className="flex flex-col items-center p-6">
                            <BarChart3 className="w-12 h-12 text-[#00B4C8] mb-6" />
                            <p className="text-xl md:text-2xl font-display font-bold leading-tight max-w-xs">Instant access to enterprise-grade AI skills</p>
                        </div>
                        <div className="flex flex-col items-center p-6">
                            <BarChart3 className="w-12 h-12 text-[#00B4C8] mb-6" />
                            <p className="text-xl md:text-2xl font-display font-bold leading-tight max-w-xs">Rapid deployment of new agent workflows</p>
                        </div>
                </div>
            </section>

            {/* 7. CTA Section */}
            <section className="px-6 lg:px-20 py-24 max-w-7xl mx-auto text-center">
                <div className="bg-accent rounded-3xl p-12 md:p-20 relative overflow-hidden text-white shadow-2xl">
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to get started?</h2>
                        <p className="text-lg mb-10 text-white/90 max-w-xl mx-auto">
                            Let's map out exactly how OpenClaw SkillHub can drive growth for your business.
                        </p>
                        <Link to="/contact" className="inline-flex px-10 py-5 bg-white text-accent font-bold rounded-full text-lg items-center gap-2 hover:scale-105 transition-transform shadow-xl">
                            Book a Free AI Strategy Call <ArrowUpRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
