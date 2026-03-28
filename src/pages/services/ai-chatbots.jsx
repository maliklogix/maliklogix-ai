import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { 
  ArrowUpRight, CheckCircle2, ChevronRight, BarChart3, 
  Target, Zap, MessageSquare, Bot, Cpu, Sparkles, Languages, Globe
} from 'lucide-react';
import { pageContent } from '../../data/solutionsData';

const NeuralNetwork = () => {
    const pointsRef = useRef();
    const count = 1500;
    
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        return pos;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        for (let i = 0; i < count; i++) {
            const x = positions[i * 3];
            const y = positions[i * 3 + 1];
            pointsRef.current.geometry.attributes.position.array[i * 3 + 1] = y + Math.sin(time + x) * 0.04;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.rotation.y += 0.0005;
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#06B6D4"
                size={0.04}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
};

export default function AiChatbotsPage() {
    const content = pageContent['ai-chatbots'];
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
            <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
                <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
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
                            <span className="text-xs font-mono text-accent uppercase tracking-[0.3em] font-bold">Agents · Conversational AI</span>
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
                                Build Your Assistant <ArrowUpRight size={20} />
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* 2. The Cognitive System */}
                <section className="px-8 lg:px-20 py-24 border-y border-border/50 bg-card-bg/5 backdrop-blur-md">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-[1.5fr_1fr] gap-24 items-center">
                        <div className="glass-card p-12 md:p-16 border-l-4 border-l-accent relative overflow-hidden">
                            <div className="absolute top-0 left-0 p-8 opacity-5">
                                <Bot size={150} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 italic">"Intelligence that <span className="text-accent underline decoration-accent/20 underline-offset-8">Converses</span>, Not Just Responds."</h2>
                            <div className="space-y-6 text-secondary text-lg leading-relaxed font-body">
                                <p>{content.whatItIs}</p>
                                <p>
                                    Our chatbots are built on a proprietary RAG (Retrieval-Augmented Generation) framework, ensuring they only pull from your verified data sources. They don't just chat; they perform. They are trained to navigate the thin line between helpful assistant and high-performance sales agent.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            {[
                                { icon: <Sparkles />, title: "Brand Aligned", desc: "Matches your unique tone and authority." },
                                { icon: <Languages />, title: "Multilingual", desc: "Support in 50+ languages natively." },
                                { icon: <Cpu />, title: "Omnichannel", desc: "Deploy to Web, WhatsApp, or Slack." },
                                { icon: <Globe />, title: "24/7 Global", desc: "Consistent performance across all timezones." }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 glass-card flex items-center gap-6 group hover:translate-x-2 transition-all duration-500"
                                >
                                    <div className="text-accent group-hover:scale-110 transition-transform">{item.icon}</div>
                                    <div>
                                        <h3 className="font-bold text-sm tracking-widest uppercase">{item.title}</h3>
                                        <p className="text-xs text-secondary/60">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. The Deployment Lifecycle (Process) */}
                <section className="px-8 lg:px-20 py-32 max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="section-title mb-6 font-display uppercase tracking-widest">The Development <span className="text-accent">Sprint</span></h2>
                        <p className="text-secondary max-w-xl mx-auto text-lg font-body">From knowledge ingestion to live autonomous operation in under 21 days.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {content.howItWorks.map((step, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="glass-card p-12 group hover:shadow-2xl shadow-accent/5 transition-all text-center"
                            >
                                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent mx-auto mb-8 group-hover:bg-accent group-hover:text-white transition-all duration-500 text-2xl font-display font-bold">
                                    {i+1}
                                </div>
                                <h3 className="text-2xl font-bold mb-6">{step.title}</h3>
                                <p className="text-secondary leading-relaxed font-body opacity-80 group-hover:opacity-100 transition-opacity">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. Engagement Metrics */}
                <section className="px-8 lg:px-20 py-24 bg-accent text-white overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
                    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 text-center relative z-10">
                        {content.results.map((metric, i) => (
                            <div key={i} className="flex flex-col items-center p-8 border-r last:border-0 border-white/10 group">
                                <MessageSquare className="w-12 h-12 mb-8 opacity-40 group-hover:scale-110 group-hover:opacity-100 transition-all" />
                                <p className="text-2xl md:text-3xl font-display font-bold leading-tight tracking-tight uppercase">{metric}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Capability Matrix */}
                <section className="px-8 lg:px-20 py-32 border-b border-border/50">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">
                        <div className="space-y-16">
                            <div>
                                <h2 className="section-title !text-4xl text-left italic mb-8">Agent <span className="text-accent underline decoration-accent/20">Protocols</span></h2>
                                <p className="text-secondary text-lg mb-12 font-body max-w-xl">
                                    Our AI agents are governed by strict safety and identity protocols, ensuring every interaction remains professional and compliant.
                                </p>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-8">
                                {content.keyBenefits.map((benefit, i) => (
                                    <div key={i} className="flex gap-4 items-start group p-4 glass-card hover:bg-accent/5 transition-colors">
                                        <CheckCircle2 className="text-accent shrink-0 mt-1" size={18} />
                                        <p className="font-bold text-foreground text-[10px] uppercase tracking-[0.2em] leading-relaxed">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card !p-12 space-y-12 bg-card-bg/20">
                            <div className="flex flex-col gap-10">
                                <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-accent flex items-center gap-4">
                                    <Target size={20} /> Deployment Fit
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    {content.whoItsFor.left.map((item, i) => (
                                        <span key={i} className="px-6 py-3 bg-accent/5 border border-accent/20 rounded-2xl text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-secondary/80 flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-10">
                                <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-accent flex items-center gap-4">
                                    <Zap size={20} /> Conversion Frictions
                                </h3>
                                <ul className="space-y-6">
                                    {content.whoItsFor.right.map((item, i) => (
                                        <li key={i} className="flex items-center justify-between text-secondary text-[13px] font-body bg-accent/5 p-4 rounded-xl border border-border/40">
                                            <span>{item}</span>
                                            <ChevronRight size={14} className="text-accent/40" />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. Elite CTA */}
                <section className="px-8 lg:px-20 py-24 text-center">
                    <div className="glass-card max-w-4xl mx-auto p-16 md:p-24 border-t-[12px] border-t-accent shadow-2xl relative overflow-hidden group">
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none" />
                        <h2 className="text-5xl md:text-7xl font-display font-bold mb-10 tracking-tighter">Never Miss a <span className="text-accent italic">Lead</span></h2>
                        <p className="text-xl text-secondary mb-12 max-w-xl mx-auto leading-relaxed font-body">
                            Your business doesn't sleep; neither should your interaction engine. Let's deploy an AI assistant that works while you lead.
                        </p>
                        <Link to="/contact" className="px-12 py-6 bg-accent text-white font-bold rounded-2xl text-xl hover:scale-105 transition-transform inline-flex items-center gap-4 shadow-2xl shadow-accent/20">
                            Deploy Your Agent <ArrowUpRight size={24} />
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
