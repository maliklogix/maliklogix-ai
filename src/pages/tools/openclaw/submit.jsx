import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle, ChevronRight, BarChart3, Target, Zap } from 'lucide-react';

export default function SubmitPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-28 pb-16">
            
            {/* 1. Hero Section */}
            <section className="px-6 lg:px-20 py-16 md:py-24 max-w-7xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">Submit a Skill</h1>
                <p className="text-[var(--secondary)] text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-10">Built something useful? Share it with the MalikLogix community and earn recognition.</p>
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
                        <p className="text-[var(--secondary)] text-lg leading-relaxed">The OpenClaw community grows through contributions. If you’ve built an AI skill, workflow template, or automation that others would benefit from, submit it to SkillHub. Our team reviews every submission, and the best ones are featured in the directory and promoted to our 10,000+ newsletter subscribers.</p>
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
                                Package Your Skill
                            </h3>
                            <p className="text-[var(--secondary)] leading-relaxed">Document what it does, what tools it requires, and how to set it up.</p>
                        </div>
                        <div className="p-8 rounded-3xl border border-[var(--border)] bg-[var(--card-bg)] relative overflow-hidden hover:border-accent/30 transition-colors">
                            <div className="text-5xl font-display font-bold text-accent/10 absolute -top-4 -right-2">02</div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm">2</span>
                                Submit via Form
                            </h3>
                            <p className="text-[var(--secondary)] leading-relaxed">Fill in the submission form with your skill details and files.</p>
                        </div>
                        <div className="p-8 rounded-3xl border border-[var(--border)] bg-[var(--card-bg)] relative overflow-hidden hover:border-accent/30 transition-colors">
                            <div className="text-5xl font-display font-bold text-accent/10 absolute -top-4 -right-2">03</div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm">3</span>
                                Review & Publish
                            </h3>
                            <p className="text-[var(--secondary)] leading-relaxed">Our team reviews within 5 business days and publishes approved skills.</p>
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
                                <p className="font-medium text-lg leading-snug">Get your work in front of 10,000+ business owners and developers</p>
                            </div>
                        <div className="p-6 rounded-2xl border border-accent/20 bg-accent/5 flex flex-col items-start hover:-translate-y-1 transition-transform">
                                <CheckCircle className="w-6 h-6 text-accent mb-4" />
                                <p className="font-medium text-lg leading-snug">Featured submissions receive a dedicated newsletter mention</p>
                            </div>
                        <div className="p-6 rounded-2xl border border-accent/20 bg-accent/5 flex flex-col items-start hover:-translate-y-1 transition-transform">
                                <CheckCircle className="w-6 h-6 text-accent mb-4" />
                                <p className="font-medium text-lg leading-snug">Build a public portfolio of AI automation work</p>
                            </div>
                        <div className="p-6 rounded-2xl border border-accent/20 bg-accent/5 flex flex-col items-start hover:-translate-y-1 transition-transform">
                                <CheckCircle className="w-6 h-6 text-accent mb-4" />
                                <p className="font-medium text-lg leading-snug">Earn affiliate revenue if your skill is used by paid members</p>
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
                                    <span>Freelance automation experts and developers</span>
                                </li>
                            <li className="flex gap-3 text-[var(--secondary)] text-lg">
                                    <ChevronRight className="text-accent shrink-0 mt-1 w-5 h-5" />
                                    <span>Agencies showcasing their technical capability</span>
                                </li>
                            <li className="flex gap-3 text-[var(--secondary)] text-lg">
                                    <ChevronRight className="text-accent shrink-0 mt-1 w-5 h-5" />
                                    <span>Community members giving back</span>
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
                                    <span>Great workflows sitting unused on local machines</span>
                                </li>
                            <li className="flex gap-3 text-[var(--secondary)] text-lg">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0 mt-2.5" />
                                    <span>Hard to monetize niche automation skills</span>
                                </li>
                            <li className="flex gap-3 text-[var(--secondary)] text-lg">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0 mt-2.5" />
                                    <span>Lack of exposure for talented builders</span>
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
                            <p className="text-xl md:text-2xl font-display font-bold leading-tight max-w-xs">Reach over 10,000 potential users and clients</p>
                        </div>
                        <div className="flex flex-col items-center p-6">
                            <BarChart3 className="w-12 h-12 text-[#00B4C8] mb-6" />
                            <p className="text-xl md:text-2xl font-display font-bold leading-tight max-w-xs">Establish authority in the AI automation space</p>
                        </div>
                        <div className="flex flex-col items-center p-6">
                            <BarChart3 className="w-12 h-12 text-[#00B4C8] mb-6" />
                            <p className="text-xl md:text-2xl font-display font-bold leading-tight max-w-xs">Contribute to the fastest-growing open framework</p>
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
                            Let's map out exactly how Submit a Skill can drive growth for your business.
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
