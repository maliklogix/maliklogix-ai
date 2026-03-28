import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { 
  ArrowUpRight, CheckCircle2, ChevronRight, BarChart3, 
  Target, Zap, Workflow, Brain, Wrench, Puzzle, Share2, Layers
} from 'lucide-react';
import { pageContent } from '../../data/solutionsData';

const NeuralNetwork = () => {
    const pointsRef = useRef();
    const count = 1000;
    
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        for (let i = 0; i < count; i++) {
            const x = positions[i * 3];
            const y = positions[i * 3 + 1];
            pointsRef.current.geometry.attributes.position.array[i * 3 + 1] = y + Math.cos(time + x) * 0.02;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.rotation.y += 0.001;
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#06B6D4"
                size={0.03}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
};

export default function MakeIntegrationsPage() {
    const content = pageContent['make-integrations'];
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
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
                <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
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
                            <span className="text-xs font-mono text-accent uppercase tracking-[0.3em] font-bold">Systems · Visual Integration</span>
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
                                Build Your Stack <ArrowUpRight size={20} />
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* 2. The Visual Architecture */}
                <section className="px-8 lg:px-20 py-24 border-y border-border/50">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_450px] gap-20 items-center">
                        <div className="glass-card p-12 md:p-16 border-l-4 border-l-accent relative overflow-hidden">
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 italic">"Unified <span className="text-accent underline decoration-accent/20 underline-offset-8">Data Flow</span> Across 1,000+ Apps."</h2>
                            <div className="space-y-6 text-secondary text-lg leading-relaxed font-body">
                                <p>{content.whatItIs}</p>
                                <p>
                                    At MalikLogix, we leverage Make.com to create visual, yet immensely powerful scenario architectures. We don't just "link" apps; we build complex data transformation engines that ensure your CRM, Marketing, and Ops tools speak the same language in real-time.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: <Puzzle />, title: "Modular", desc: "Pluggable integration nodes." },
                                { icon: <Share2 />, title: "Real-time", desc: "Instant sync via Webhooks." },
                                { icon: <Layers />, title: "Complex", desc: "Multi-branch logic paths." },
                                { icon: <Wrench />, title: "Custom", desc: "JSON/API transformation." }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 glass-card flex flex-col items-center text-center gap-3 group hover:border-accent/30 transition-all duration-500"
                                >
                                    <div className="text-accent group-hover:rotate-12 transition-transform">{item.icon}</div>
                                    <h3 className="font-bold text-[10px] tracking-[0.2em] uppercase">{item.title}</h3>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. The Implementation (Process) */}
                <section className="px-8 lg:px-20 py-32 max-w-7xl mx-auto">
                    <h2 className="section-title mb-20 font-display uppercase tracking-tighter">Integration <span className="text-accent">Protocol</span></h2>
                    
                    <div className="grid md:grid-cols-3 gap-8 text-foreground">
                        {content.howItWorks.map((step, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="glass-card p-12 group hover:border-accent/30 transition-all"
                            >
                                <div className="text-5xl font-display font-bold text-accent/10 mb-8 group-hover:scale-110 transition-transform origin-left">0{i+1}</div>
                                <h3 className="text-2xl font-bold mb-6 group-hover:text-accent transition-colors">{step.title}</h3>
                                <p className="text-secondary leading-relaxed font-body opacity-80 group-hover:opacity-100 transition-opacity">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. Connectivity Metrics */}
                <section className="px-8 lg:px-20 py-20 bg-accent text-white">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center items-center">
                        {content.results.map((metric, i) => (
                            <div key={i} className="flex flex-col items-center p-6 border-r last:border-0 border-white/10 group">
                                <BarChart3 className="w-10 h-10 mb-6 opacity-60 group-hover:scale-125 transition-transform" />
                                <p className="text-xl md:text-2xl font-display font-bold leading-tight uppercase tracking-tight">{metric}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Capability Matrix */}
                <section className="px-8 lg:px-20 py-32 border-b border-border/50">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">
                        <div className="space-y-16">
                            <div>
                                <h2 className="section-title !text-4xl text-left italic mb-8">Ecosystem <span className="text-accent underline decoration-accent/20">Capabilities</span></h2>
                                <p className="text-secondary text-lg mb-12 font-body">
                                    Our Make.com scenarios are designed for extreme fault-tolerance, ensuring your business operations continue even during API outages.
                                </p>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-8">
                                {content.keyBenefits.map((benefit, i) => (
                                    <div key={i} className="flex gap-4 items-start group">
                                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                                            <CheckCircle2 size={16} />
                                        </div>
                                        <p className="font-bold text-foreground text-[10px] uppercase tracking-[0.2em] leading-relaxed pt-1.5">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card !p-12 space-y-12">
                            <div className="flex flex-col gap-8">
                                <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-accent flex items-center gap-4">
                                    <Target size={18} /> Optimization Profile
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {content.whoItsFor.left.map((item, i) => (
                                        <span key={i} className="px-5 py-2.5 bg-accent/5 border border-accent/20 rounded-xl text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-secondary/80">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-8">
                                <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-accent flex items-center gap-4">
                                    <Zap size={18} /> Complexity Gaps
                                </h3>
                                <ul className="space-y-6">
                                    {content.whoItsFor.right.map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-secondary text-xs uppercase tracking-widest font-mono">
                                            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. Strategic CTA */}
                <section className="px-8 lg:px-20 py-24 text-center">
                    <div className="glass-card max-w-4xl mx-auto p-16 md:p-24 border-t-8 border-t-accent shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 blur-[120px] rounded-full -mr-40 -mt-40" />
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-10 tracking-tighter">Scale Your <span className="text-accent">Ecosystem</span></h2>
                        <p className="text-xl text-secondary mb-12 max-w-xl mx-auto leading-relaxed font-body">
                            Stop letting disconnected silos slow your growth. Let's engineer a unified Make.com integration that powers your scale.
                        </p>
                        <Link to="/contact" className="px-12 py-6 bg-accent text-white font-bold rounded-2xl text-xl hover:scale-105 transition-transform inline-flex items-center gap-4 shadow-2xl shadow-accent/20">
                            Book Strategic Audit <ArrowUpRight size={24} />
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
