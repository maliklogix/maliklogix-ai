import React, { useEffect, useRef, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';
import { 
  Mail, Github, Twitter, Globe, 
  MapPin, ExternalLink, ArrowRight, CheckCircle2,
  Cpu, Database, ShoppingCart, Zap, 
  BarChart3, FlaskConical, TrendingUp, 
  Layers, Store, Share2, Network,
  Brain, Workflow, Link as LinkIcon,
  ChevronDown, ChevronUp, FileSpreadsheet
} from 'lucide-react';
import './Founder.css';

const NeuralNetwork = () => {
    const pointsRef = useRef();
    const { theme } = useTheme();

    const count = 2000;
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
        if (pointsRef.current) {
            pointsRef.current.rotation.y = time * 0.05;
            pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.1;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 6]}>
            <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color={theme === 'dark' ? "#06B6D4" : "#0891B2"}
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={theme === 'dark' ? THREE.AdditiveBlending : THREE.SubtractiveBlending}
                    opacity={theme === 'dark' ? 0.6 : 0.2}
                />
            </Points>
        </group>
    );
};

const ConnectivityAnimation = () => {
    return (
        <div className="absolute inset-[-150px] overflow-hidden pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-1000">
            <style>
                {`
                    @keyframes spin-slow { 100% { transform: rotate(360deg); } }
                    @keyframes spin-slow-reverse { 100% { transform: rotate(-360deg); } }
                    .orbit-container { animation: spin-slow 20s linear infinite; }
                    .orbit-icon { animation: spin-slow-reverse 20s linear inline infinite; }
                `}
            </style>
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Orbiting Rings */}
                <div className="absolute w-[350px] h-[350px] border border-accent/20 rounded-full orbit-container" />
                <div className="absolute w-[450px] h-[450px] border border-accent/10 border-dashed rounded-full orbit-container" style={{ animationDuration: '30s' }} />
                
                {/* Orbiting Hubs */}
                <div className="absolute w-full h-full orbit-container">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card-bg shadow-xl p-3 rounded-full border border-accent/30 flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-accent" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-card-bg shadow-xl p-3 rounded-full border border-purple-500/30 flex items-center justify-center">
                        <Database className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card-bg shadow-xl p-3 rounded-full border border-emerald-500/30 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-card-bg shadow-xl p-3 rounded-full border border-orange-500/30 flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-orange-400" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Founder = () => {
    const titleRef = useRef(null);
    const labelRef = useRef(null);
    const subTitleRef = useRef(null);
    const ctaRef = useRef(null);
    const { theme } = useTheme();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

            gsap.from([subTitleRef.current, ctaRef.current], {
                opacity: 0,
                y: 20,
                duration: 1,
                stagger: 0.2,
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.target);
        try {
            const response = await fetch("https://formspree.io/f/xpqjgpzj", {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                setIsSubmitted(true);
                e.target.reset();
            } else {
                alert("Oops! There was a problem submitting your form");
            }
        } catch (error) {
            alert("Oops! There was a problem submitting your form");
        } finally {
            setIsSubmitting(false);
        }
    };


    const expertise = [
        { icon: <Cpu />, title: "Agentic AI Systems", desc: "LLM orchestration, multi-agent architectures, autonomous pipelines." },
        { icon: <Database />, title: "RAG Pipelines", desc: "Retrieval-augmented generation — vector stores, semantic search, grounded AI." },
        { icon: <ShoppingCart />, title: "E-commerce AI", desc: "Lead scoring models, product recommendation engines, customer analytics." },
        { icon: <Zap />, title: "n8n & AI Automation", desc: "Workflow automation — APIs, triggers, and AI logic in production flows." },
        { icon: <BarChart3 />, title: "Predictive Analytics", desc: "ML pipelines for forecasting, conversion prediction, data-driven decisions." },
        { icon: <FlaskConical />, title: "Prompt Engineering & R&D", desc: "Advanced prompt design, evaluation frameworks, applied LLM research." },
        { icon: <TrendingUp />, title: "AI Digital Marketing", desc: "GEO, SEO, AI-powered content engines for organic growth and qualified leads." },
        { icon: <Layers />, title: "Data Engineering", desc: "Dashboard development, pipeline architecture, ETL for marketing analytics." },
        { icon: <Store />, title: "Shopify Development", desc: "AI-enhanced Shopify builds — automation, custom apps, growth engineering." }
    ];

    const currentProjects = [
        { tag: "BUILDING", title: "Agentic AI & E-commerce Automation", body: "Designing systems that autonomously handle order ops, customer workflows, and marketing decisions for online businesses.", color: "#0ABDE3" },
        { tag: "LEARNING", title: "Multi-agent & Multi-modal AI", body: "Exploring advanced architectures where multiple AI agents collaborate across text, data, and visual modalities.", color: "#10b981" },
        { tag: "OPEN TO", title: "Collaborations", body: "Looking to collaborate on AI, e-commerce automation, and agentic AI projects with founders and technical teams.", color: "#f59e0b" }
    ];

    const timeline = [
        { date: "Foundation", title: "BS Computer Science — University of Sargodha", body: "Built a strong foundation in CS, algorithms, and software engineering. First exposure to machine learning sparked a deep interest in applied AI." },
        { date: "Early Career", title: "Diving into AI & Automation", body: "Started building automation workflows and exploring LLMs in practical contexts. Realized most businesses had untapped potential AI could unlock." },
        { date: "Pivot", title: "Founding MalikLogix", body: "Launched MalikLogix as an AI-first digital agency at the intersection of agentic systems, e-commerce, and growth automation." },
        { date: "Today", title: "AI Specialist — Lahore, Pakistan", body: "Building RAG pipelines, agentic systems, and e-commerce AI solutions globally. 150+ published articles. Always shipping, always iterating." }
    ];

    const techStack = [
        "Python", "Next.js", "n8n", "LangChain", "OpenAI / Claude APIs", "Pinecone / Weaviate",
        "Prisma + MariaDB", "Shopify", "Make.com", "Tailwind CSS", "React", "Hugging Face",
        "Supabase", "Sanity.io", "Vercel / Hostinger"
    ];

    const contacts = [
        { icon: <Mail />, label: "Email", info: "hello@maliklogix.com", link: "mailto:hello@maliklogix.com" },
        { icon: <Github />, label: "GitHub", info: "github.com/maliklogix", link: "https://github.com/maliklogix" },
        { icon: <Twitter />, label: "Twitter/X", info: "@maliklogix", link: "https://twitter.com/maliklogix" },
        { icon: <Globe />, label: "Founder", info: "malikfarooq.com", link: "https://malikfarooq.com" }
    ];

    return (
        <div className="founder-page relative min-h-screen bg-background transition-colors duration-500 overflow-hidden">
            {/* Neural Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
                <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
                    <ambientLight intensity={0.5} />
                    <NeuralNetwork />
                </Canvas>
            </div>

            {/* Blurred Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[1]">
                <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[50%] bg-[#0070f3]/5 blur-[120px] rounded-full" />
            </div>

            <div className="founder-container relative z-10">
                {/* Section 1 - Hero */}
                <section className="min-h-[80vh] flex items-center pt-32 pb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
                        <div className="lg:col-span-7">
                            <div ref={labelRef} className="flex items-center gap-4 mb-6">
                                <div className="h-px w-8 bg-accent" />
                                <span className="text-sm font-mono text-accent uppercase tracking-[0.2em] font-bold">The Founder</span>
                            </div>
                            
                            <h1 ref={titleRef} className="text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-8">
                                <span className="line overflow-hidden block pb-2">
                                    <span className="line-inner block text-foreground">Malik</span>
                                </span>
                                <span className="line overflow-hidden block">
                                    <span className="line-inner block text-accent">Farooq</span>
                                </span>
                            </h1>

                            <p ref={subTitleRef} className="text-xl md:text-2xl text-secondary max-w-2xl mb-12 leading-relaxed font-body">
                                <span className="text-foreground font-bold">AI Specialist</span> — I build agentic automation systems that streamline growth for e-commerce and digital businesses globally.
                            </p>
                            
                            <div ref={ctaRef} className="flex flex-wrap gap-6 items-center">
                                <a 
                                    href="mailto:hello@maliklogix.com" 
                                    onMouseMove={handleMagnetic} 
                                    onMouseLeave={resetMagnetic}
                                    className="magnetic-btn px-10 py-5 bg-accent text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-xl shadow-accent/20 flex items-center justify-center text-lg"
                                >
                                    Work With Me &rarr;
                                </a>
                                <div className="flex gap-4">
                                    <a 
                                        href="https://malikfarooq.com" 
                                        target="_blank" rel="noopener noreferrer" 
                                        onMouseMove={handleMagnetic}
                                        onMouseLeave={resetMagnetic}
                                        className="magnetic-btn p-4 bg-foreground/[0.05] border border-border text-foreground rounded-full hover:bg-foreground/[0.1] transition-all"
                                    >
                                        <Globe size={20} />
                                    </a>
                                    <a 
                                        href="https://github.com/maliklogix" 
                                        target="_blank" rel="noopener noreferrer" 
                                        onMouseMove={handleMagnetic}
                                        onMouseLeave={resetMagnetic}
                                        className="magnetic-btn p-4 bg-foreground/[0.05] border border-border text-foreground rounded-full hover:bg-foreground/[0.1] transition-all"
                                    >
                                        <Github size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 flex justify-center lg:justify-end">
                            <div className="relative group">
                                <ConnectivityAnimation />
                                <div className="absolute -inset-2 bg-gradient-to-r from-accent to-purple-600 rounded-[42px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative w-[300px] md:w-[380px] aspect-square bg-card-bg/80 backdrop-blur-3xl rounded-[40px] p-4 border border-border shadow-2xl overflow-hidden">
                                    <div className="w-full h-full rounded-[30px] overflow-hidden relative">
                                        <img 
                                            src="/founder-photo.jpg" 
                                            alt="Malik Farooq" 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                        <div className="hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-accent to-[#0070f3] text-white text-7xl font-bold">MF</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2 - Expertise Grid */}
                <section className="py-20 relative">
                    <div className="text-center mb-16">
                        <span className="text-accent font-bold tracking-[0.2em] text-xs uppercase mb-3 block">CORE SKILLS</span>
                        <h2 className="section-title">Areas of <span className="text-accent">Expertise</span></h2>
                        <p className="mt-4 text-secondary max-w-xl mx-auto">
                            Strategically building at the intersection of agentic workflows 
                            and e-commerce scalability.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {expertise.map((item, i) => (
                            <motion.div 
                                key={i} 
                                className="glass-card group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                <p className="text-secondary leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Section 3 - Currently Working On */}
                <section className="py-24">
                    <div className="text-center mb-16">
                        <span className="text-emerald-500 font-bold tracking-[0.2em] text-xs uppercase mb-3 block">ACTIVE PIPELINE</span>
                        <h2 className="section-title">Current <span className="text-emerald-500">Focus</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {currentProjects.map((proj, i) => (
                            <motion.div 
                                key={i} 
                                className="glass-card relative overflow-hidden group"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Zap size={64} style={{color: proj.color}} />
                                </div>
                                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest mb-6" style={{backgroundColor: `${proj.color}20`, color: proj.color, border: `1px solid ${proj.color}40`}}>
                                    {proj.tag}
                                </span>
                                <h3 className="text-2xl font-bold mb-4">{proj.title}</h3>
                                <p className="text-secondary leading-relaxed">{proj.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Section 4 - Timeline */}
                <section className="py-24 relative overflow-hidden">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-20">
                            <span className="text-accent font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Background</span>
                            <h2 className="section-title">Journey to <span className="text-accent">MalikLogix</span></h2>
                        </div>
                        
                        <div className="timeline">
                            {timeline.map((item, i) => (
                                <motion.div 
                                    key={i} 
                                    className="timeline-item"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                >
                                    <div className="timeline-dot" />
                                    <span className="timeline-date">{item.date}</span>
                                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-secondary leading-relaxed glass-card !p-6">
                                        {item.body}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 6 - Contact Form */}
                <section className="py-24 relative overflow-visible">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="text-accent font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Let's Connect</span>
                            <h2 className="section-title">Request Your <span className="text-accent">Audit</span></h2>
                        </div>
                        
                        {isSubmitted ? (
                            <motion.div 
                                className="p-12 md:p-20 bg-accent/10 border border-accent/40 rounded-[2.5rem] shadow-2xl backdrop-blur-xl text-center space-y-6"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="w-20 h-20 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-accent/40">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h2 className="text-3xl font-display font-bold text-foreground">Message Sent Successfully</h2>
                                <p className="text-secondary text-lg font-body leading-relaxed max-w-sm mx-auto">
                                    Thank you for reaching out! Your message has been sent directly to our team. We will get back to you within 24 hours.
                                </p>
                                <button onClick={() => setIsSubmitted(false)} className="text-accent font-mono text-xs uppercase tracking-widest font-bold hover:underline">
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="glass-card !p-8 md:!p-16 space-y-8 relative z-10 border-t-2 border-accent">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent ml-2">Your Name</label>
                                        <input name="name" type="text" required placeholder="John Doe" className="w-full bg-background/50 border border-border p-5 rounded-2xl focus:border-accent outline-none text-foreground transition-all placeholder:text-secondary/30" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent ml-2">Business Email</label>
                                        <input name="email" type="email" required placeholder="john@company.com" className="w-full bg-background/50 border border-border p-5 rounded-2xl focus:border-accent outline-none text-foreground transition-all placeholder:text-secondary/30" />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent ml-2">Goal</label>
                                        <select name="goal" required className="w-full bg-background/50 border border-border p-5 rounded-2xl focus:border-accent outline-none text-foreground transition-all appearance-none cursor-pointer">
                                            <option value="">Select Objective</option>
                                            <option value="lead-gen">Lead Generation</option>
                                            <option value="e-comm-growth">E-commerce Growth</option>
                                            <option value="agentic-ai">Agentic AI Build</option>
                                            <option value="other">Other Collaboration</option>
                                        </select>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent ml-2">Budget Range</label>
                                        <select name="budget" required className="w-full bg-background/50 border border-border p-5 rounded-2xl focus:border-accent outline-none text-foreground transition-all appearance-none cursor-pointer">
                                            <option value="">Approx. Monthly Budget</option>
                                            <option value="starter">Less than $1,500</option>
                                            <option value="growth">$1,500 - $5,000</option>
                                            <option value="enterprise">$5,000+</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent ml-2">Brief Context</label>
                                    <textarea name="message" rows="4" required placeholder="Tell me about your project..." className="w-full bg-background/50 border border-border p-5 rounded-2xl focus:border-accent outline-none text-foreground transition-all resize-none placeholder:text-secondary/30"></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isSubmitting} 
                                    onMouseMove={handleMagnetic} 
                                    onMouseLeave={resetMagnetic}
                                    className="w-full py-6 bg-accent text-white font-bold rounded-2xl flex items-center justify-center gap-4 hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-accent/20 text-xl tracking-wide disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>Request Audit <ArrowRight size={24} /></>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </section>

                {/* Section 7 - Connect */}
                <section className="py-32">
                    <div className="glass-card max-w-5xl mx-auto text-center relative overflow-hidden border-t-8 border-t-accent shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full -mr-32 -mt-32" />
                        <h2 className="section-title mb-8">Ready to <span className="text-accent">Ship?</span></h2>
                        <p className="text-xl text-secondary mb-12 max-w-2xl mx-auto leading-relaxed font-body">
                            Whether you need to automate a complex e-commerce workflow or build an agentic AI system from scratch, I'm ready to collaborate.
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-8">
                            {contacts.map((contact, i) => (
                                <motion.a 
                                    key={i}
                                    href={contact.link}
                                    onMouseMove={handleMagnetic}
                                    onMouseLeave={resetMagnetic}
                                    className="flex flex-col items-center gap-4 group"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="w-16 h-16 bg-card-bg border border-border rounded-full flex items-center justify-center text-secondary group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-500 group-hover:scale-110 shadow-lg">
                                        {contact.icon}
                                    </div>
                                    <span className="text-xs font-bold tracking-[0.3em] text-secondary group-hover:text-foreground transition-colors uppercase">
                                        {contact.label}
                                    </span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Founder;
