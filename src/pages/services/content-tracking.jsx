import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { 
  ArrowUpRight, CheckCircle2, ChevronRight, BarChart3, 
  Target, Zap, LineChart, PieChart, Activity, Shield
} from 'lucide-react';
import { pageContent } from '../../data/solutionsData';

const NeuralNetwork = () => {
    const pointsRef = useRef();
    const count = 1000;
    
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let j = 0; j < count; j++) {
            pos[j * 3] = (Math.random() - 0.5) * 10;
            pos[j * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[j * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        for (let j = 0; j < count; j++) {
            const x = positions[j * 3];
            const y = positions[j * 3 + 1];
            pointsRef.current.geometry.attributes.position.array[j * 3 + 1] = y + Math.sin(time + x) * 0.02;
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

export default function ContentTrackingPage() {
    const content = pageContent['content-tracking'];
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
        <div className="min-h-screen bg-background transition-colors duration-500 overflow-hidden relative">
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
                            <span className="text-xs font-mono text-accent uppercase tracking-[0.3em] font-bold">Solutions · Performance Intelligence</span>
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
                            className="text-xl md:text-2xl text-secondary max-w-2xl leading-relaxed mb-10 font-body"
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
                                Access Your Metrics <ArrowUpRight size={20} />
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* 2. The System */}
                <section className="px-8 lg:px-20 py-24 border-y border-border/50">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_400px] gap-16 items-center">
                        <div className="glass-card p-12 md:p-16 border-l-4 border-l-accent">
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 italic">"Data is the <span className="text-accent underline decoration-accent/20 underline-offset-8">only</span> source of truth."</h2>
                            <p className="text-secondary text-lg leading-relaxed font-body">
                                {content.whatItIs}
                            </p>
                        </div>
                        <div className="relative aspect-square flex items-center justify-center">
                            <div className="absolute inset-0 bg-accent/5 blur-[80px] rounded-full animate-pulse" />
                            <LineChart size={180} className="w-48 h-48 text-accent/20 relative z-10" />
                            <motion.div 
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-0 border-[2px] border-accent/20 rounded-full"
                            />
                        </div>
                    </div>
                </section>

                {/* 3. Process */}
                <section className="px-8 lg:px-20 py-24 max-w-7xl mx-auto">
                    <h2 className="section-title mb-16">The Intelligence <span className="text-accent">Protocol</span></h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {content.howItWorks.map((step, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-10 hover:border-accent/30 transition-all group"
                            >
                                <div className="text-5xl font-display font-bold text-accent/10 mb-6 group-hover:text-accent/20 transition-colors">0{i+1}</div>
                                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                                <p className="text-secondary leading-relaxed text-sm font-body">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. Results Section */}
                <section className="px-8 lg:px-20 py-20 bg-accent text-white">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
                        {content.results.map((metric, i) => (
                            <div key={i} className="flex flex-col items-center p-6 border-r last:border-0 border-white/10">
                                <Activity className="w-10 h-10 mb-6 opacity-60" />
                                <p className="text-2xl font-display font-bold leading-tight">{metric}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Key Benefits & Who It's For */}
                <section className="px-8 lg:px-20 py-32 border-b border-border/50">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
                        <div className="space-y-12">
                            <h2 className="section-title !text-4xl text-left italic">Intelligence <span className="text-accent underline decoration-accent/20">Scaling</span></h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {content.keyBenefits.map((benefit, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <CheckCircle2 className="text-accent shrink-0 mt-1" size={20} />
                                        <p className="font-bold text-foreground text-sm uppercase tracking-wider">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card !p-12 space-y-12">
                            <div className="flex flex-col gap-6">
                                <h3 className="text-xl font-bold uppercase tracking-widest text-accent flex items-center gap-3">
                                    <Target size={20} /> Target Profile
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {content.whoItsFor.left.map((item, i) => (
                                        <span key={i} className="px-4 py-2 bg-accent/5 border border-accent/20 rounded-full text-xs font-mono font-bold tracking-widest text-secondary">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-6">
                                <h3 className="text-xl font-bold uppercase tracking-widest text-accent flex items-center gap-3">
                                    <Zap size={20} /> Inefficiency Gap
                                </h3>
                                <ul className="space-y-4">
                                    {content.whoItsFor.right.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-secondary text-sm">
                                            <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="px-8 lg:px-20 py-24 text-center">
                    <div className="glass-card max-w-4xl mx-auto p-16 md:p-24 border-t-8 border-t-accent shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[120px] rounded-full -mr-32 -mt-32" />
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Deploy Intelligence <span className="text-accent">Now</span></h2>
                        <p className="text-xl text-secondary mb-12 max-w-xl mx-auto leading-relaxed">
                            Let's map out exactly how {content.title} can drive a systemized revenue architecture for your business.
                        </p>
                        <Link to="/contact" className="px-12 py-6 bg-accent text-white font-bold rounded-2xl text-xl hover:scale-110 transition-transform inline-flex items-center gap-4 shadow-2xl shadow-accent/20">
                            Book Your Audit <ArrowUpRight size={24} />
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
