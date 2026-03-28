import React, { useEffect, useRef, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';
import { 
  Mail, Github, Twitter, Globe, Instagram, Linkedin,
  Cpu, Zap, BarChart3, TrendingUp, Layers, CheckCircle2,
  ArrowRight, Workflow, Brain, Target, Rocket
} from 'lucide-react';
import './About.css';

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
        for (let j = 0; j < count; j++) {
            const x = positions[j * 3];
            const y = positions[j * 3 + 1];
            pointsRef.current.geometry.attributes.position.array[j * 3 + 1] = y + Math.sin(time + x) * 0.05;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.rotation.y += 0.001;
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

const About = () => {
    const titleRef = useRef(null);
    const subTitleRef = useRef(null);
    const labelRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const ctx = gsap.context(() => {
            const titleLines = titleRef.current.querySelectorAll('.line-inner');

            gsap.from(labelRef.current, {
                opacity: 0,
                x: -20,
                duration: 0.8,
                ease: 'power3.out'
            });

            gsap.from(titleLines, {
                y: 100,
                rotateX: -45,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power4.out',
                delay: 0.2
            });

            gsap.from(subTitleRef.current, {
                opacity: 0,
                y: 20,
                duration: 1,
                delay: 0.8,
                ease: 'power3.out',
            });
        });

        return () => ctx.revert();
    }, []);

    const handleMagnetic = (e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
    };

    const resetMagnetic = (e) => {
        const el = e.currentTarget;
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    };

    const pillars = [
        { 
            icon: <Workflow />, 
            title: "Workflow Optimization", 
            desc: "We analyze bottlenecks and deploy tailored automation to eliminate repetitive tasks, allowing your team to focus on high-impact strategy." 
        },
        { 
            icon: <Brain />, 
            title: "AI Automation", 
            desc: "Implementing state-of-the-art agentic AI systems that handle complex decision-making and data processing autonomously." 
        },
        { 
            icon: <Target />, 
            title: "Digital Marketing", 
            desc: "Data-driven marketing strategies powered by AI to maximize ROI, refine targeting, and dominate your market niche." 
        },
        { 
            icon: <Rocket />, 
            title: "Growth Scaling", 
            desc: "Building the infrastructure necessary for rapid, sustainable growth through integrated technology and marketing ecosystems." 
        }
    ];

    const socialLinks = [
        { icon: <Linkedin />, label: "LinkedIn", href: "https://linkedin.com/company/maliklogix" },
        { icon: <Twitter />, label: "Twitter", href: "https://twitter.com/maliklogix" },
        { icon: <Instagram />, label: "Instagram", href: "https://instagram.com/maliklogix" },
        { icon: <Github />, label: "GitHub", href: "https://github.com/maliklogix" }
    ];

    return (
        <div className="about-page relative min-h-screen bg-background transition-colors duration-500 overflow-hidden">
            {/* Neural Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
                <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
                    <ambientLight intensity={0.5} />
                    <NeuralNetwork />
                </Canvas>
            </div>

            <div className="about-container relative z-10 px-8 lg:px-20">
                {/* Hero Section */}
                <section className="min-h-[80vh] flex items-center pt-32 pb-20">
                    <div className="max-w-5xl mx-auto">
                        <div ref={labelRef} className="flex items-center gap-4 mb-6">
                            <div className="h-px w-8 bg-accent" />
                            <span className="text-sm font-mono text-accent uppercase tracking-[0.2em] font-bold">About the Agency</span>
                        </div>
                        
                        <h1 ref={titleRef} className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-8">
                            <span className="line overflow-hidden block pb-2">
                                <span className="line-inner block text-foreground leading-tight">Optimizing workflows,</span>
                            </span>
                            <span className="line overflow-hidden block">
                                <span className="line-inner block text-accent leading-tight">Organizing Business.</span>
                            </span>
                        </h1>

                        <div ref={subTitleRef} className="space-y-8">
                            <p className="text-2xl md:text-3xl text-secondary max-w-3xl leading-relaxed font-body">
                                <span className="text-foreground font-bold">Malik Logix</span> is an AI-first Digital Agency dedicated to transforming how modern businesses operate and grow.
                            </p>
                            <p className="text-lg md:text-xl text-secondary/80 max-w-2xl leading-relaxed font-body">
                                We bridge the gap between complex AI technology and practical business growth, building autonomous systems that free you from the mundane and empower you to lead.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Strategy Section */}
                <section className="py-24 border-t border-border/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="glass-card p-12 border-l-4 border-l-accent">
                            <h2 className="text-3xl font-bold mb-6">The Malik Logix <span className="text-accent">Edge</span></h2>
                            <p className="text-secondary leading-relaxed mb-6">
                                In an era of rapid digital evolution, we don't just "add" AI to your business. We reconstruct your workflows from the ground up to be AI-native.
                            </p>
                            <p className="text-secondary leading-relaxed font-bold italic">
                                "The goal isn't just to work faster—it's to work smarter by letting machines handle the repetition while humans focus on the innovation."
                            </p>
                        </div>
                        <div className="space-y-8">
                            <h3 className="section-title !text-4xl">Pioneering <span className="text-accent">Autonomous</span> Growth</h3>
                            <p className="text-secondary text-lg">
                                Whether it's e-commerce automation, lead generation pipelines, or specialized digital marketing engines, we build systems that don't just function—they evolve.
                            </p>
                            <ul className="space-y-4">
                                {['AI-Driven Workflow Architects', 'Agentic System Specialists', 'Premium Growth Partners'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="text-accent" size={20} />
                                        <span className="font-bold text-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Pillars Grid */}
                <section className="py-24">
                    <div className="text-center mb-16">
                        <h2 className="section-title">Our Core <span className="text-accent">Pillars</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {pillars.map((pillar, i) => (
                            <motion.div 
                                key={i} 
                                className="glass-card group hover:border-accent/40"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{pillar.title}</h3>
                                <p className="text-secondary leading-relaxed text-sm">{pillar.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Social Media Footer */}
                <section className="py-32 border-t border-border/50">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Join our <span className="text-accent">Ecosystem</span></h2>
                        <p className="text-secondary font-mono tracking-widest text-xs uppercase">Stay connected with the latest in AI Automation and Digital Growth.</p>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        {socialLinks.map((social, i) => (
                            <motion.a 
                                key={i}
                                href={social.href}
                                onMouseMove={handleMagnetic}
                                onMouseLeave={resetMagnetic}
                                className="flex flex-col items-center gap-4 group"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="w-20 h-20 bg-card-bg border border-border rounded-full flex items-center justify-center text-secondary group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-500 shadow-xl">
                                    {social.icon}
                                </div>
                                <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-secondary group-hover:text-foreground transition-colors">
                                    {social.label}
                                </span>
                            </motion.a>
                        ))}
                    </div>
                </section>

                <section className="pb-32 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-accent/5 border border-accent/20 rounded-full">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold">Malik Logix Agency · Established 2025</span>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
