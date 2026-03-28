import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { 
  ArrowUpRight, CheckCircle2, ChevronRight, BarChart3, 
  Target, Zap, Brain, Cpu, Pocket, Globe, Shield, Terminal
} from 'lucide-react';
import { pageContent } from '../../../data/solutionsData';

const NeuralNetwork = () => {
    const pointsRef = useRef();
    const count = 2000;
    
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return pos;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        for (let i = 0; i < count; i++) {
            const x = positions[i * 3];
            const y = positions[i * 3 + 1];
            pointsRef.current.geometry.attributes.position.array[i * 3 + 1] = y + Math.sin(time + x * 0.5) * 0.05;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.rotation.y += 0.0004;
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#22D3EE"
                size={0.045}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
};

export default function SkillhubPage() {
    const content = pageContent['skillhub'];
    const titleRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const ctx = gsap.context(() => {
            gsap.from('.line-inner', {
                y: 100,
                rotateX: -45,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power4.out'
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen bg-background transition-colors duration-500 overflow-hidden relative text-foreground font-body">
            {/* Platform Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                    <NeuralNetwork />
                </Canvas>
            </div>

            <main className="relative z-10 pt-32 pb-24">
                {/* 1. Hero Section */}
                <section className="px-8 lg:px-20 py-24 max-w-7xl mx-auto">
                    <div className="max-w-5xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <div className="h-px w-12 bg-accent" />
                            <span className="text-sm font-mono text-accent uppercase tracking-[0.4em] font-bold">OpenClaw Ecosystem</span>
                        </motion.div>
                        
                        <h1 ref={titleRef} className="text-7xl md:text-9xl font-display font-bold tracking-tighter mb-10 leading-[0.85]">
                            <span className="line overflow-hidden block pb-4">
                                <span className="line-inner block text-foreground">{content.title.split(' ')[0]}</span>
                            </span>
                            <span className="line overflow-hidden block">
                                <span className="line-inner block text-accent italic">{content.title.split(' ').slice(1).join(' ')}</span>
                            </span>
                        </h1>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-2xl md:text-3xl text-secondary max-w-3xl leading-relaxed mb-14 font-light"
                        >
                            {content.subtitle}
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-wrap gap-8"
                        >
                            <Link to="/contact" className="px-12 py-6 bg-accent text-white font-bold rounded-2xl flex items-center gap-4 hover:scale-105 transition-all shadow-2xl shadow-accent/30 text-xl font-display uppercase tracking-widest">
                                Enter SkillHub <ArrowUpRight size={24} />
                            </Link>
                            <div className="flex items-center gap-4 px-8 py-6 glass-card border-none bg-accent/5">
                                <Terminal size={20} className="text-accent" />
                                <span className="font-mono text-sm text-secondary/80">npm install @maliklogix/openclaw</span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 2. The Core Protocol */}
                <section className="px-8 lg:px-20 py-32 border-y border-border/50 bg-card-bg/5 backdrop-blur-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />
                    <div className="max-w-7xl mx-auto grid md:grid-cols-[1.4fr_1fr] gap-28 items-center">
                        <div className="glass-card p-16 md:p-20 border-t-4 border-t-accent relative overflow-hidden">
                            <div className="absolute -bottom-10 -right-10 p-8 opacity-5">
                                <Brain size={250} />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-10 tracking-tight leading-tight">"Where Intelligence Meets <span className="text-accent italic">Execution</span>."</h2>
                            <div className="space-y-8 text-secondary text-xl leading-relaxed font-body">
                                <p>{content.whatItIs}</p>
                                <p>
                                    OpenClaw isn't just another AI framework. It's an industrial-grade infrastructure designed for agents that DO work. SkillHub provides the high-performance modules that allow your agents to interact with the real world securely and at scale.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-8">
                            {[
                                { icon: <Cpu />, title: "Modular", desc: "Atomic skills, infinite combinations." },
                                { icon: <Globe />, title: "Edge Native", desc: "Deploy anywhere, run everywhere." },
                                { icon: <Shield />, title: "Hardened", desc: "Enterprise-grade security protocols." },
                                { icon: <Pocket />, title: "Versioned", desc: "Reliable, rollback-safe deployments." }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-8 glass-card flex items-center gap-8 group hover:translate-x-4 transition-all duration-700 hover:border-accent/40"
                                >
                                    <div className="text-accent group-hover:scale-125 transition-transform duration-500">{item.icon}</div>
                                    <div>
                                        <h3 className="font-bold text-lg tracking-tight">{item.title}</h3>
                                        <p className="text-sm text-secondary/60 font-body">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. The Deployment Pipeline (Process) */}
                <section className="px-8 lg:px-20 py-32 max-w-7xl mx-auto">
                    <div className="text-center mb-28">
                        <h2 className="section-title mb-8 font-display uppercase tracking-widest text-5xl md:text-6xl">Plugin <span className="text-accent">&</span> Play</h2>
                        <p className="text-secondary max-w-2xl mx-auto text-xl font-body font-light">The fastest path from AI concept to production-ready autonomous agent.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {content.howItWorks.map((step, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="glass-card p-14 group hover:shadow-2xl shadow-accent/10 transition-all duration-500 border-b-4 border-b-transparent hover:border-b-accent"
                            >
                                <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center text-accent mb-12 group-hover:bg-accent group-hover:text-white transition-all duration-700 text-3xl font-display font-bold rotate-3 group-hover:rotate-0">
                                    0{i+1}
                                </div>
                                <h3 className="text-3xl font-bold mb-8 group-hover:text-accent transition-colors tracking-tight">{step.title}</h3>
                                <p className="text-secondary leading-relaxed text-lg font-body opacity-80 group-hover:opacity-100 transition-opacity">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. Ecosystem Authority Metrics */}
                <section className="px-8 lg:px-20 py-24 bg-accent text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
                    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-20 text-center relative z-10">
                        {content.results.map((metric, i) => (
                            <div key={i} className="flex flex-col items-center p-8 border-x first:border-l-0 last:border-r-0 border-white/10 group">
                                <Activity className="w-14 h-14 mb-10 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                                <p className="text-3xl md:text-4xl font-display font-bold leading-tight tracking-tighter uppercase italic">{metric}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Capability Matrix & Deployment Fit */}
                <section className="px-8 lg:px-20 py-32 border-b border-border/50">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32">
                        <div className="space-y-20">
                            <div>
                                <h2 className="section-title !text-5xl text-left italic mb-10">Platform <span className="text-accent underline decoration-accent/20">Protocols</span></h2>
                                <p className="text-secondary text-xl mb-14 font-body leading-relaxed max-w-xl font-light">
                                    Our ecosystem is built on strict standards of interoperability, ensuring that every skill you install works perfectly with your existing agent configurations.
                                </p>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-10">
                                {content.keyBenefits.map((benefit, i) => (
                                    <div key={i} className="flex gap-6 items-start group p-0 transition-all">
                                        <div className="mt-1 w-6 h-6 rounded-full border border-accent/40 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all">
                                            <CheckCircle2 className="text-accent group-hover:text-white pb-[1px]" size={14} />
                                        </div>
                                        <p className="font-bold text-foreground text-xs uppercase tracking-[0.25em] leading-relaxed pt-1">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card !p-16 space-y-16 bg-card-bg/20 border-l border-border/50">
                            <div className="flex flex-col gap-10">
                                <h3 className="text-sm font-bold uppercase tracking-[0.6em] text-accent flex items-center gap-6">
                                    <Target size={24} /> Ecosystem Profile
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    {content.whoItsFor.left.map((item, i) => (
                                        <span key={i} className="px-8 py-4 bg-accent/5 border border-accent/20 rounded-2xl text-[11px] font-mono font-bold tracking-[0.3em] uppercase text-secondary/90 hover:text-accent hover:border-accent transition-all duration-500">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-10">
                                <h3 className="text-sm font-bold uppercase tracking-[0.6em] text-accent flex items-center gap-6">
                                    <Zap size={24} /> Latency Gaps
                                </h3>
                                <ul className="space-y-8">
                                    {content.whoItsFor.right.map((item, i) => (
                                        <li key={i} className="flex items-center gap-6 text-secondary text-sm font-body border-b border-border pb-6 last:border-0 group">
                                            <div className="w-3 h-3 bg-accent/20 border border-accent/40 rounded-sm group-hover:bg-accent transition-colors" />
                                            <span className="opacity-70 group-hover:opacity-100 tracking-wide">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. Strategic CTA */}
                <section className="px-8 lg:px-20 py-32 text-center">
                    <div className="glass-card max-w-5xl mx-auto p-20 md:p-32 border-t-[16px] border-t-accent shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <h2 className="text-6xl md:text-8xl font-display font-bold mb-12 tracking-tighter leading-[0.9]">Start Your <span className="text-accent italic">Automation</span> Journey</h2>
                        <p className="text-2xl text-secondary mb-16 max-w-2xl mx-auto leading-relaxed font-light">
                            The future of business is autonomous. Access the tools and skills you need to lead the shift.
                        </p>
                        <Link to="/contact" className="px-16 py-8 bg-accent text-white font-bold rounded-2xl text-2xl hover:scale-105 transition-transform inline-flex items-center gap-6 shadow-2xl shadow-accent/40 font-display uppercase tracking-widest">
                            Access skillHub Now <ArrowUpRight size={28} />
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
