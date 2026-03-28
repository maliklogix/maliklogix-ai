import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
    BookOpen, Zap, Brain, Cpu, Database, 
    Lock, Search, Share2, Terminal, ArrowRight,
    CheckCircle2, FileText, Play
} from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const NeuralNetwork = () => {
    const pointsRef = useRef();
    const count = 1500;
    const positions = React.useMemo(() => {
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
        if (pointsRef.current) {
            pointsRef.current.rotation.y = time * 0.05;
            pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.1;
        }
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#06B6D4"
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.4}
            />
        </Points>
    );
};

const DOC_MODULES = [
    {
        id: 'fundamentals',
        title: 'AI Marketing Fundamentals',
        icon: <Brain className="w-6 h-6" />,
        lessons: [
            {
                title: 'Natural Language Marketing (NLM)',
                duration: '12 min',
                desc: 'Why traditional copy is dying and how LLMs interact with semantic brand signals.',
                highlights: ['Semantic density', 'Contextual relevance', 'AI brand voice training']
            },
            {
                title: 'Prompt Engineering for Performance Ads',
                duration: '15 min',
                desc: 'Iterative prompt design for Google, Meta, and LinkedIn ad creative that actually converts.',
                highlights: ['Few-shot learning', 'Negative constraints', 'Dynamic variant generation']
            }
        ]
    },
    {
        id: 'automation',
        title: 'Automation Architecture',
        icon: <Zap className="w-6 h-6" />,
        lessons: [
            {
                title: 'Building Resilient n8n Workflows',
                duration: '20 min',
                desc: 'Technical deep dive into error handling, retry loops, and visual workflow logic.',
                highlights: ['Wait nodes', 'Error handling triggers', 'API authentication flows']
            },
            {
                title: 'The Make.com Intelligence Stack',
                duration: '18 min',
                desc: 'Connecting 1,000+ apps with AI-driven routing and data transformation logic.',
                highlights: ['Iterator vs Aggregator', 'Data normalization', 'Webhook listeners']
            }
        ]
    },
    {
        id: 'openclaw',
        title: 'OpenClaw Advanced Usage',
        icon: <Cpu className="w-6 h-6" />,
        lessons: [
            {
                title: 'Developing Custom Agent Skills',
                duration: '25 min',
                desc: 'A step-by-step guide to coding and submitting skills to the OpenClaw SkillHub.',
                highlights: ['JSON definitions', 'Tool orchestration', 'Secure credential management']
            },
            {
                title: 'Extensions vs. Plugins',
                duration: '10 min',
                desc: 'Understanding when to extend an LLM and when to use a platform plugin.',
                highlights: ['Claude project extensions', 'ChatGPT custom GPTs', 'API sandboxing']
            }
        ]
    }
];

export default function Docs() {
    const containerRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const ctx = gsap.context(() => {
            gsap.from('.docs-hero > *', {
                y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
            });

            DOC_MODULES.forEach((_, i) => {
                gsap.from(`.module-card-${i}`, {
                    y: 40, opacity: 0, duration: 0.8,
                    scrollTrigger: {
                        trigger: `.module-card-${i}`,
                        start: 'top 85%'
                    }
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-32 pb-24 selection:bg-accent/30 selection:text-white">
            
            {/* ── Neural Background ── */}
            <div className="fixed inset-0 pointer-events-none opacity-30 z-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                    <NeuralNetwork />
                </Canvas>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10">
                
                {/* ── Hero ── */}
                <div className="docs-hero mb-24 max-w-4xl">
                    <div className="flex items-center gap-3 mb-6 text-accent font-mono text-sm tracking-[0.3em] uppercase">
                        <BookOpen className="w-5 h-5" />
                        <span>The Knowledge Base — MalikLogix Ops</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 leading-[1.05] tracking-tighter">
                        Mastering the <br />
                        <span className="text-accent underline decoration-accent/20 underline-offset-[12px]">Intelligence Stack.</span>
                    </h1>
                    <p className="text-[var(--secondary)] text-xl leading-relaxed max-w-2xl mb-12">
                        Welcome to the official MalikLogix documentation. This isnt just marketing fluff — its a technical repository of lessons on how we build, scale, and automate global operations.
                    </p>
                    
                    {/* Status Indicator */}
                    <div className="inline-flex items-center gap-4 py-3 px-6 bg-[var(--card-bg)] border border-accent/20 rounded-2xl shadow-xl shadow-accent/5 backdrop-blur-xl">
                        <div className="relative w-3 h-3">
                            <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-60" />
                            <div className="relative w-3 h-3 bg-accent rounded-full shadow-[0_0_10px_#06B6D4]" />
                        </div>
                        <span className="font-mono text-xs text-[var(--foreground)] uppercase tracking-widest font-bold">Global Knowledge Base Active</span>
                    </div>
                </div>

                {/* ── Documentation Modules ── */}
                <div className="space-y-32">
                    {DOC_MODULES.map((module, i) => (
                        <div key={i} className={`module-card-${i}`}>
                            <div className="flex flex-col lg:flex-row gap-12 items-start">
                                {/* Sidebar Module Title */}
                                <div className="lg:w-1/3 lg:sticky lg:top-40">
                                    <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 shadow-xl shadow-accent/5 border border-accent/20 transition-transform hover:scale-105">
                                        {module.icon}
                                    </div>
                                    <h2 className="text-3xl font-display font-bold text-[var(--foreground)] mb-4">{module.title}</h2>
                                    <p className="text-[var(--secondary)] text-base mb-8">
                                        Advanced technical concepts and operational guides for scaling with {module.title.toLowerCase()}.
                                    </p>
                                    <Link to="/contact" className="text-accent text-sm font-bold uppercase tracking-widest hover:underline underline-offset-8 flex items-center gap-2 transition-all hover:gap-3">
                                        Request Custom Training <ArrowRight size={16} />
                                    </Link>
                                </div>

                                {/* Lessons List */}
                                <div className="lg:w-2/3 grid gap-8">
                                    {module.lessons.map((lesson, j) => (
                                        <div key={j} className="group p-8 bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl hover:border-accent/40 transition-all duration-500 shadow-xl border-t-2 border-t-transparent hover:border-t-accent hover:-translate-y-2">
                                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-10 h-10 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-xs font-mono font-bold text-accent">0{j+1}</span>
                                                    <h3 className="text-2xl font-display font-bold text-[var(--foreground)] group-hover:text-accent transition-colors">
                                                        {lesson.title}
                                                    </h3>
                                                </div>
                                                <span className="px-4 py-1.5 bg-accent/10 text-accent font-bold rounded-full text-xs font-mono uppercase tracking-widest">
                                                    {lesson.duration}
                                                </span>
                                            </div>
                                            <p className="text-[var(--secondary)] text-lg mb-8 leading-relaxed">
                                                {lesson.desc}
                                            </p>
                                            <div className="grid md:grid-cols-3 gap-4 mb-8">
                                                {lesson.highlights.map((h, k) => (
                                                    <div key={k} className="flex items-center gap-2 text-sm text-[var(--foreground)] bg-[var(--background)] p-3 rounded-xl border border-[var(--border)] group-hover:border-accent/20 transition-colors">
                                                        <CheckCircle2 className="w-4 h-4 text-accent" />
                                                        {h}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <button className="flex items-center gap-2 py-3 px-6 bg-accent text-white font-bold rounded-xl text-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/30 shadow-md">
                                                    <Play size={16} fill="white" /> Start Lesson
                                                </button>
                                                <button className="flex items-center gap-2 text-[var(--secondary)] hover:text-accent font-bold text-sm transition-colors pt-1">
                                                    <FileText size={18} /> View Docs
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Learning Path Section ── */}
                <div className="mt-40 p-12 md:p-20 bg-gradient-to-br from-accent/10 via-[var(--card-bg)] to-transparent border border-accent/20 rounded-[4rem] relative overflow-hidden text-center md:text-left shadow-2xl">
                    <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                        <Share2 className="w-96 h-96 text-accent" />
                    </div>
                    
                    <div className="max-w-4xl relative z-10 flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1">
                            <span className="text-accent font-mono text-xs uppercase tracking-[0.4em] font-bold mb-4 block">Future Readiness</span>
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--foreground)] tracking-tight mb-8">
                                Stay Current in the <br />
                                <span className="text-accent italic underline underline-offset-8 decoration-accent/20">AI Shift.</span>
                            </h2>
                            <p className="text-xl text-[var(--secondary)] leading-relaxed mb-10">
                                MalikLogix publishes new technical documentation, workflow templates, and agent orchestration skills every Sunday. Join our technical briefing to never miss a shift.
                            </p>
                            <Link 
                                to="/contact" 
                                className="inline-flex items-center gap-4 px-10 py-5 bg-accent text-white font-bold rounded-2xl text-lg hover:scale-105 transition-transform shadow-2xl shadow-accent/40"
                            >
                                Get Weekly Briefings
                                <Terminal size={24} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-4 flex-shrink-0 w-full md:w-auto">
                            {[
                                { icon: <Cpu />, label: "RPA Guides" },
                                { icon: <Database />, label: "Data Ops" },
                                { icon: <Lock />, label: "Security" },
                                { icon: <Search />, label: "GEO" }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center justify-center p-6 bg-[var(--background)] border border-[var(--border)] rounded-3xl shadow-lg border-b-4 border-b-accent/30 hover:border-b-accent transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="text-accent mb-3 w-8 h-8 flex items-center justify-center">{item.icon}</div>
                                    <div className="text-xs font-bold uppercase tracking-widest">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
