import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Torus } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    TrendingUp, CheckCircle2, Cpu, Rocket,
    Target, Eye, DollarSign, ShieldCheck, Zap,
    ArrowRight, Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

/* ── 3D Torus / Ring ── */
function AnimatedRing() {
    const meshRef = useRef();
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
        }
    });
    return (
        <Float speed={1.5} floatIntensity={1}>
            <mesh ref={meshRef}>
                <torusGeometry args={[1.6, 0.4, 64, 200]} />
                <meshStandardMaterial
                    color="#06B6D4"
                    roughness={0.1}
                    metalness={0.9}
                    wireframe={false}
                />
            </mesh>
        </Float>
    );
}

/* ── Core Beliefs Data ── */
const BELIEFS = [
    {
        icon: <Cpu className="w-7 h-7" />,
        title: "Systems Beat Instincts",
        headline: "We kill opinions with data.",
        desc: "The most dangerous phrase in business is 'I think.' Every operational decision at Malik Logix is driven by an algorithm, a test, or a statistical model — not intuition, trends, or gut feel.",
        example: "Real-world application: When one client's team argued that automation wouldn't work for their B2B product, our AI testing system proved otherwise — automated outreach drove a 4.1x higher conversion rate versus manual efforts."
    },
    {
        icon: <DollarSign className="w-7 h-7" />,
        title: "Profit is the Only Vanity Metric",
        headline: "Impressions don't pay invoices.",
        desc: "We refuse to celebrate vanity metrics. Reach, impressions, and followers mean nothing if they don't compound into revenue. Every KPI we track is mapped to a direct dollar outcome.",
        example: "Real-world application: A brand came to us with 3 full-time data entry reps. We deployed automated bots and turned manual data entry into autonomous workflows, saving 60 hours/week and generating immediate profit."
    },
    {
        icon: <Zap className="w-7 h-7" />,
        title: "Speed × Precision = Compounding Advantage",
        headline: "Slow is the new dead.",
        desc: "In algorithmic markets, a 48-hour delay in reacting to a performance signal is a competitive loss. Our AI systems respond to data in real-time, so your workflows never run stale.",
        example: "Real-world application: Our automation detected a cost-per-click spike at 2:14AM and automatically paused underperforming ad sets — saving $8,400 for a client before their team woke up."
    },
    {
        icon: <Eye className="w-7 h-7" />,
        title: "Radical Transparency",
        headline: "You own everything. We hide nothing.",
        desc: "No black-box reporting. No agency jargon designed to obscure bad results. Every dashboard we build shows you the exact revenue impact of every dollar you spend.",
        example: "Real-world application: We onboarded a client whose previous agency had been reporting 'engagement growth' while actual revenue was flat for 6 months. Our audit uncovered the disconnect within 72 hours."
    },
    {
        icon: <Target className="w-7 h-7" />,
        title: "Micro-Intent Precision",
        headline: "We don't find audiences. We find buyers.",
        desc: "Mass manual work is dead. We use behavioural micro-signals — scroll patterns, purchase timing, content consumption — to identify the precise moment a prospect is ready to convert.",
        example: "Real-world application: By layering in-market audiences with first-party purchase-history data, we reduced a DTC brand's cost-per-acquisition by 73% while increasing order volume."
    },
    {
        icon: <ShieldCheck className="w-7 h-7" />,
        title: "Long-Term > Short-Term",
        headline: "We build systems, not quick fixes.",
        desc: "Tactics produce spikes. Systems produce compounding growth. We design every engagement to build long-term operational equity that continues to generate returns after the bots are deployed.",
        example: "Real-world application: An organic content programme we built for a SaaS client in Year 1 now generates 8,200 qualified monthly visitors — at zero incremental cost in Year 3."
    }
];

const MANDATES = [
    { value: "100%", label: "Transparency" },
    { value: "0%", label: "Vanity KPIs" },
    { value: "24/7", label: "AI Optimisation" },
    { value: "∞", label: "Compounding Returns" },
];

export default function Philosophy() {
    useEffect(() => {
        window.scrollTo(0, 0);
        const ctx = gsap.context(() => {
            gsap.from('.phi-hero > *', {
                y: 40, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out'
            });
            gsap.from('.phi-belief', {
                y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: '#beliefs-section', start: 'top 75%' }
            });
            gsap.from('.phi-mandate', {
                y: 30, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
                scrollTrigger: { trigger: '#mandate-section', start: 'top 80%' }
            });
        });
        return () => { ctx.revert(); ScrollTrigger.getAll().forEach(t => t.kill()); };
    }, []);

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

            {/* ── 3D Hero ── */}
            <section className="relative pt-28 pb-16 px-6 lg:px-20 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Side */}
                    <div className="phi-hero z-10 relative">
                        <span className="text-accent font-mono text-xs uppercase tracking-[0.4em] font-bold">Our Ethos</span>
                        <h1 className="text-5xl md:text-8xl font-display font-bold mt-4 mb-6 leading-[1.05] tracking-tighter">
                            Manual is the enemy <br />
                            <span className="text-accent italic underline underline-offset-8 decoration-accent/20">of scale.</span>
                        </h1>
                        <p className="text-[var(--secondary)] text-xl leading-relaxed max-w-lg mb-10">
                            We don't sell software. We sell time back. Automation isn't just for enterprises. We make it accessible for lean teams.
                        </p>

                        {/* Founder Quote Card */}
                        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl p-8 relative shadow-xl">
                            <Quote className="absolute -top-5 -left-5 w-12 h-12 text-accent/25" />
                            <p className="text-lg italic text-[var(--foreground)] font-body leading-relaxed mb-6">
                                "Every workflow we touch gets 10x faster — or we rebuild it free."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-accent/30 flex-shrink-0">ML</div>
                                <div>
                                    <p className="font-bold text-[var(--foreground)]">Malik Logix</p>
                                    <p className="text-xs font-mono text-accent uppercase tracking-widest">Founder & Growth Architect</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3D Canvas */}
                    <div className="h-[380px] lg:h-[500px] w-full">
                        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                            <ambientLight intensity={0.6} />
                            <pointLight position={[5, 5, 5]} intensity={1.5} color="#06B6D4" />
                            <pointLight position={[-4, -4, 2]} intensity={0.8} color="#7C3AED" />
                            <Stars radius={80} depth={50} count={4000} factor={3} fade />
                            <AnimatedRing />
                        </Canvas>
                    </div>
                </div>

                {/* Static ambient — safely behind content */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full pointer-events-none -z-10 -translate-x-1/3 -translate-y-1/4" />
            </section>

            {/* ── Core Beliefs ── */}
            <section id="beliefs-section" className="py-24 px-6 lg:px-20 bg-[var(--card-bg)] border-t border-[var(--border)]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-accent font-mono text-xs uppercase tracking-[0.4em] font-bold">The Process</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--foreground)] tracking-tight mt-4 mb-4">
                            How We <span className="text-accent">Work</span>
                        </h2>
                        <p className="text-[var(--secondary)] text-xl max-w-3xl mx-auto leading-relaxed">
                            These aren't buzzwords. They're operating principles with real examples of how they play out in every client engagement.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {BELIEFS.map((belief, i) => (
                            <div key={i} className="phi-belief bg-[var(--background)] border border-[var(--border)] rounded-3xl p-8 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 shadow-lg flex flex-col">
                                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 flex-shrink-0">
                                    {belief.icon}
                                </div>
                                <div className="text-xs font-mono text-accent uppercase tracking-widest font-bold mb-2">{belief.title}</div>
                                <h3 className="text-2xl font-display font-bold text-[var(--foreground)] mb-4">{belief.headline}</h3>
                                <p className="text-[var(--secondary)] text-base leading-relaxed mb-6 flex-1">{belief.desc}</p>
                                <div className="bg-accent/8 border border-accent/20 rounded-2xl p-4">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                        <p className="text-sm text-[var(--foreground)] leading-relaxed italic">{belief.example}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── The Zero-Waste Mandate ── */}
            <section id="mandate-section" className="py-24 px-6 lg:px-20">
                <div className="max-w-5xl mx-auto text-center">
                    <span className="text-accent font-mono text-xs uppercase tracking-[0.4em] font-bold">Our Mandate</span>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--foreground)] tracking-tight mt-4 mb-6">
                        The Zero-Waste Mandate
                    </h2>
                    <p className="text-[var(--secondary)] text-xl leading-relaxed mb-16 max-w-3xl mx-auto">
                        Most agencies celebrate "spend." We celebrate "efficiency." Our mandate is to eliminate every dollar of ad waste by identifying high-yield pockets using predictive modelling. If an ad isn't winning, it simply isn't running.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                        {MANDATES.map((m, i) => (
                            <div key={i} className="phi-mandate bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl p-8 shadow-lg hover:border-accent/40 transition-all duration-300">
                                <div className="text-5xl md:text-6xl font-display font-bold text-accent mb-3 tracking-tighter">{m.value}</div>
                                <div className="text-xs font-mono text-[var(--secondary)] uppercase tracking-[0.2em] font-bold">{m.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* The Process: How It Works */}
                    <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl p-10 md:p-16 shadow-xl text-left">
                        <h3 className="text-3xl md:text-4xl font-display font-bold text-[var(--foreground)] mb-6">How We Apply This Philosophy to Real Campaigns</h3>
                        <div className="space-y-6">
                            {[
                                {
                                    step: "01", title: "Discovery",
                                    desc: "We analyze your operations to find manual bottlenecks taking up your team's time.",
                                },
                                {
                                    step: "02", title: "Build",
                                    desc: "We engineer autonomous solutions using Zapier, Code, and AI without disrupting operations.",
                                },
                                {
                                    step: "03", title: "Monitor",
                                    desc: "We continually test, patch, and monitor the automated system to guarantee 99.9% uptime and zero friction.",
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 items-start border-b border-[var(--border)] pb-6 last:border-0 last:pb-0">
                                    <div className="text-4xl font-display font-bold text-accent/30 flex-shrink-0 w-12 leading-none">{item.step}</div>
                                    <div>
                                        <h4 className="text-xl font-display font-bold text-[var(--foreground)] mb-2">{item.title}</h4>
                                        <p className="text-[var(--secondary)] leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-24 px-6 lg:px-20">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--foreground)] tracking-tight mb-6">
                        Aligned with this philosophy?
                    </h2>
                    <p className="text-[var(--secondary)] text-xl mb-10 leading-relaxed">
                        Let's talk. We work with founders and operations leaders who are done with guessing — and ready to win with systems.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-accent text-white font-bold rounded-2xl text-lg hover:scale-105 transition-transform shadow-xl shadow-accent/30"
                    >
                        Schedule a Strategic Deep-Dive
                        <ArrowRight size={22} />
                    </Link>
                </div>
            </section>

        </div>
    );
}
