import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { 
  ArrowUpRight, CheckCircle2, ChevronRight, BarChart3, 
  Target, Zap, Workflow, Brain, Settings, Database, Cloud, ShieldCheck
} from 'lucide-react';
import { pageContent } from '../../data/solutionsData';

const NeuralNetwork = () => {
    const pointsRef = useRef();
    const count = 1200;
    
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 12;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
        }
        return pos;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        for (let i = 0; i < count; i++) {
            const x = positions[i * 3];
            const y = positions[i * 3 + 1];
            pointsRef.current.geometry.attributes.position.array[i * 3 + 1] = y + Math.sin(time + x) * 0.03;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.rotation.y += 0.0008;
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#06B6D4"
                size={0.035}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
};

export default function N8nAutomationPage() {
    const content = pageContent['n8n-automation'];
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
            {/* Neural Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-25">
                <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
                    <NeuralNetwork />
                </Canvas>
            </div>

            <main className="relative z-10 pt-32 pb-24">
                {/* 1. Hero Section */}
                <section className="px-8 lg:px-20 py-20 max-w-7xl mx-auto">
                    <div className="max-w-4xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 mb-6"
                        >
                            <div className="h-px w-8 bg-accent" />
                            <span className="text-xs font-mono text-accent uppercase tracking-[0.3em] font-bold">Protocol · Workflow Automation</span>
                        </motion.div>
                        
                        <h1 ref={titleRef} className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-8">
                            <span className="line overflow-hidden block pb-2">
                                <span className="line-inner block text-foreground leading-tight">{content.title.split(' ')[0]}</span>
                            </span>
                            <span className="line overflow-hidden block">
                                <span className="line-inner block text-accent leading-tight">{content.title.split(' ').slice(1).join(' ')}</span>
                            </span>
                        </h1>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-xl md:text-2xl text-secondary max-w-2xl leading-relaxed mb-10"
                        >
                            {content.subtitle}
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-wrap gap-6"
                        >
                            <Link to="/contact" className="px-10 py-5 bg-accent text-white font-bold rounded-2xl flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-accent/20 text-lg">
                                Engineer Your Workflow <ArrowUpRight size={20} />
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* 2. The System Engineering */}
                <section className="px-8 lg:px-20 py-24 border-y border-border/50 bg-card-bg/10 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-[1.2fr_1fr] gap-20 items-center">
                        <div className="glass-card p-12 md:p-16 border-l-4 border-l-accent relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Zap size={120} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 italic">"Decoupling <span className="text-accent underline decoration-accent/20 underline-offset-8">Human Hours</span> from Business Results."</h2>
                            <div className="space-y-6 text-secondary text-lg leading-relaxed font-body">
                                <p>{content.whatItIs}</p>
                                <p>
                                    At MalikLogix, we treat n8n not just as a tool, but as the central nervous system of your business. Our implementations go beyond simple triggers; we build state-aware, error-handling architectures that ensure your data flows securely and reliably across your entire ecosystem.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { icon: <Database />, title: "Data Agnostic", desc: "Connect any API or SQL DB." },
                                { icon: <Settings />, title: "Logic First", desc: "Complex branching & filtering." },
                                { icon: <Cloud />, title: "Self-Hosted", desc: "Full data sovereignty." },
                                { icon: <ShieldCheck />, title: "Enterprise QA", desc: "Built-in error handling." }
                            ].map((feature, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-8 glass-card flex flex-col items-center text-center gap-4 group hover:border-accent/30 transition-all duration-500"
                                >
                                    <div className="text-accent group-hover:scale-110 transition-transform duration-500">{feature.icon}</div>
                                    <h3 className="font-bold text-sm tracking-widest uppercase">{feature.title}</h3>
                                    <p className="text-[10px] text-secondary/60 leading-tight">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. The Architecture (Process) */}
                <section className="px-8 lg:px-20 py-32 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                        <div>
                            <h2 className="section-title text-left mb-6 font-display uppercase tracking-tighter">The <span className="text-accent">Architecture</span></h2>
                            <p className="text-secondary max-w-xl text-lg font-body">A methodical approach to industrial-grade automation deployment.</p>
                        </div>
                        <div className="glass-card px-8 py-4 border-l-2 border-l-accent flex items-center gap-4">
                            <Workflow className="text-accent" />
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-secondary">Operational Standard v4.2</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {content.howItWorks.map((step, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-10 group hover:border-accent/40 transition-all"
                            >
                                <div className="text-6xl font-display font-bold text-accent/5 mb-8 group-hover:text-accent/15 transition-colors">0{i+1}</div>
                                <h3 className="text-2xl font-bold mb-6 group-hover:text-accent transition-colors">{step.title}</h3>
                                <p className="text-secondary leading-relaxed text-base font-body opacity-80 group-hover:opacity-100 transition-opacity">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. Efficiency Metrics */}
                <section className="px-8 lg:px-20 py-24 bg-accent text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 blur-3xl pointer-events-none">
                        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white rounded-full" />
                        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-white rounded-full" />
                    </div>
                    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 text-center relative z-10">
                        {content.results.map((metric, i) => (
                            <div key={i} className="flex flex-col items-center p-8 border-r last:border-0 border-white/10 group">
                                <BarChart3 className="w-12 h-12 mb-8 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                                <p className="text-2xl md:text-3xl font-display font-bold leading-tight tracking-tight uppercase">{metric}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. System Capabilities & Target Matrices */}
                <section className="px-8 lg:px-20 py-32 border-b border-border/50">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">
                        <div className="space-y-16">
                            <div>
                                <h2 className="section-title !text-4xl text-left italic mb-8">System <span className="text-accent underline decoration-accent/20">Capabilities</span></h2>
                                <p className="text-secondary text-lg mb-12 font-body max-w-xl">
                                    Our n8n workflows are engineered for horizontal scalability, integrating deeply with your tech stack to eliminate silos.
                                </p>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-8">
                                {content.keyBenefits.map((benefit, i) => (
                                    <div key={i} className="flex gap-4 items-start group">
                                        <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500">
                                            <CheckCircle2 className="shrink-0" size={18} />
                                        </div>
                                        <p className="font-bold text-foreground text-[11px] uppercase tracking-[0.2em] leading-relaxed pt-2">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card !p-12 space-y-12 bg-card-bg/20">
                            <div className="flex flex-col gap-8">
                                <h3 className="text-xl font-bold font-display uppercase tracking-[0.3em] text-accent flex items-center gap-4">
                                    <Target size={20} /> Target Deployment
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {content.whoItsFor.left.map((item, i) => (
                                        <span key={i} className="px-5 py-2.5 bg-accent/5 border border-accent/20 rounded-xl text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-secondary/80 hover:text-accent hover:border-accent transition-all duration-300">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-8">
                                <h3 className="text-xl font-bold font-display uppercase tracking-[0.3em] text-accent flex items-center gap-4">
                                    <Zap size={20} /> Legacy Bottlenecks
                                </h3>
                                <ul className="space-y-6">
                                    {content.whoItsFor.right.map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-secondary text-[13px] font-body">
                                            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                                            <span className="opacity-80">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. Strategic Call to Action */}
                <section className="px-8 lg:px-20 py-24 text-center">
                    <div className="glass-card max-w-4xl mx-auto p-16 md:p-24 border-t-8 border-t-accent shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-[150px] rounded-full -mr-48 -mt-48 group-hover:bg-accent/10 transition-colors duration-700" />
                        <h2 className="text-5xl md:text-7xl font-display font-bold mb-10 tracking-tighter">Automate to <span className="text-accent italic">Lead</span></h2>
                        <p className="text-xl text-secondary mb-12 max-w-xl mx-auto leading-relaxed font-body">
                            Ready to replace expensive, rigid tooling with custom-engineered n8n architectures? Let's connect your vision to a self-running reality.
                        </p>
                        <Link to="/contact" className="px-12 py-6 bg-accent text-white font-bold rounded-2xl text-xl hover:scale-110 transition-transform inline-flex items-center gap-4 shadow-2xl shadow-accent/20">
                            Request Strategic Audit <ArrowUpRight size={24} />
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
