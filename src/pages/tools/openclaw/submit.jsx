import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { 
  ArrowUpRight, CheckCircle2, ChevronRight, BarChart3, 
  Target, Zap, Upload, FileCode, Users, Trophy, Share2, Rocket
} from 'lucide-react';
import { pageContent } from '../../../data/solutionsData';

const NeuralNetwork = () => {
    const pointsRef = useRef();
    const count = 1400;
    
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 14;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
        }
        return pos;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        for (let i = 0; i < count; i++) {
            const x = positions[i * 3];
            const y = positions[i * 3 + 1];
            pointsRef.current.geometry.attributes.position.array[i * 3 + 1] = y + Math.sin(time + x * 1.1) * 0.03;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.rotation.y += 0.0008;
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#06B6D4"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
};

export default function SubmitPage() {
    const content = pageContent['submit'];
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
                            <span className="text-xs font-mono text-accent uppercase tracking-[0.3em] font-bold">Build · Contribute · Elevate</span>
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
                            <Link to="/contact" className="px-10 py-5 bg-accent text-white font-bold rounded-2xl flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-accent/20 text-lg uppercase tracking-widest font-display">
                                Submit Skill <ArrowUpRight size={20} />
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* 2. The Submission Logic */}
                <section className="px-8 lg:px-20 py-24 border-y border-border/50 bg-card-bg/5 backdrop-blur-xl">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_450px] gap-20 items-center">
                        <div className="glass-card p-12 md:p-16 border-l-4 border-l-accent relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Share2 size={150} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 italic">"Decentralized <span className="text-accent underline decoration-accent/20 underline-offset-8">Innovation</span>."</h2>
                            <div className="space-y-6 text-secondary text-lg leading-relaxed font-body">
                                <p>{content.whatItIs}</p>
                                <p>
                                    Your architecture deserves the spotlight. By submitting to OpenClaw, you're not just sharing code; you're contributing to a global standard of autonomous business intelligence. Our review process ensures only the most robust, high-impact skills make it to the main directory.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: <Upload />, title: "Upload", desc: "Easy schema submission." },
                                { icon: <FileCode />, title: "Documentation", desc: "Clear implementation guides." },
                                { icon: <Users />, title: "Community", desc: "Peer-to-peer validation." },
                                { icon: <Trophy />, title: "Rewards", desc: "Top contributors featured." }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-8 glass-card flex flex-col items-center text-center gap-4 group hover:border-accent/30 transition-all duration-500"
                                >
                                    <div className="text-accent group-hover:scale-110 transition-transform">{item.icon}</div>
                                    <h3 className="font-bold text-[10px] tracking-widest uppercase">{item.title}</h3>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. The Approval Pipeline (Process) */}
                <section className="px-8 lg:px-20 py-32 max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="section-title mb-6 font-display uppercase tracking-widest">Quality <span className="text-accent underline decoration-accent/10">Control</span></h2>
                        <p className="text-secondary max-w-xl mx-auto text-lg font-body">Our rigorous review process maintains the elite status of the SkillHub repository.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {content.howItWorks.map((step, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="glass-card p-12 group hover:shadow-2xl shadow-accent/5 transition-all relative overflow-hidden text-center"
                            >
                                <div className="text-5xl font-display font-bold text-accent/10 mb-8 group-hover:text-accent/20 transition-colors">
                                    0{i+1}
                                </div>
                                <h3 className="text-2xl font-bold mb-6 group-hover:text-accent transition-colors">{step.title}</h3>
                                <p className="text-secondary leading-relaxed font-body opacity-80 group-hover:opacity-100 transition-opacity">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. Impact Multipliers */}
                <section className="px-8 lg:px-20 py-24 bg-accent text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 blur-3xl pointer-events-none">
                        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white rounded-full" />
                        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-white rounded-full" />
                    </div>
                    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 text-center relative z-10">
                        {content.results.map((metric, i) => (
                            <div key={i} className="flex flex-col items-center p-8 border-r last:border-0 border-white/10 group">
                                <Rocket className="w-12 h-12 mb-8 opacity-40 group-hover:opacity-100 transition-opacity" />
                                <p className="text-2xl md:text-3xl font-display font-bold leading-tight tracking-tight uppercase italic">{metric}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Contributor Intelligence */}
                <section className="px-8 lg:px-20 py-32 border-b border-border/50">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">
                        <div className="space-y-16">
                            <div>
                                <h2 className="section-title !text-4xl text-left italic mb-8">Ecosystem <span className="text-accent underline decoration-accent/20">Growth</span></h2>
                                <p className="text-secondary text-lg mb-12 font-body max-w-xl">
                                    Becoming an OpenClaw contributor places you at the center of the next generation of business-led AI development.
                                </p>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-8">
                                {content.keyBenefits.map((benefit, i) => (
                                    <div key={i} className="flex gap-4 items-start group p-6 glass-card hover:bg-accent/5 transition-colors">
                                        <CheckCircle2 className="text-accent shrink-0 mt-1" size={18} />
                                        <p className="font-bold text-foreground text-[10px] uppercase tracking-[0.2em] leading-relaxed">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card !p-12 space-y-12 bg-card-bg/20 border-l border-border/50">
                            <div className="flex flex-col gap-10">
                                <h3 className="text-xs font-bold uppercase tracking-[0.5em] text-accent flex items-center gap-4">
                                    <Target size={20} /> Target Contributors
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
                                <h3 className="text-xs font-bold uppercase tracking-[0.5em] text-accent flex items-center gap-4">
                                    <Zap size={20} /> Content Isolation
                                </h3>
                                <ul className="space-y-6">
                                    {content.whoItsFor.right.map((item, i) => (
                                        <li key={i} className="flex items-center gap-5 text-secondary text-[13px] font-body bg-accent/5 p-5 rounded-2xl border border-border/40">
                                            <div className="w-1 h-5 bg-accent rounded-full" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. Strategic Submission CTA */}
                <section className="px-8 lg:px-20 py-24 text-center">
                    <div className="glass-card max-w-4xl mx-auto p-16 md:p-24 border-t-8 border-t-accent shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,_rgba(6,182,212,0.05)_0deg,_transparent_360deg)] pointer-events-none group-hover:rotate-180 transition-transform duration-[3s]" />
                        <h2 className="text-5xl md:text-7xl font-display font-bold mb-10 tracking-tighter">Enter the <span className="text-accent italic">Arena</span></h2>
                        <p className="text-xl text-secondary mb-12 max-w-xl mx-auto leading-relaxed font-body">
                            Ready to ship? Submit your skill today and let the world leverage your architectural brilliance.
                        </p>
                        <Link to="/contact" className="px-12 py-6 bg-accent text-white font-bold rounded-2xl text-xl hover:scale-105 transition-transform inline-flex items-center gap-4 shadow-2xl shadow-accent/20 font-display uppercase tracking-widest">
                            Upload Now <ArrowUpRight size={24} />
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
