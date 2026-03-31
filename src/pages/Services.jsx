import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import {
    Search, Rocket, Layers, Target, BarChart3, Globe, Mail,
    MessageSquare, Video, ShoppingCart, Code, Cpu, ArrowUpRight,
    CheckCircle, TrendingUp, Zap, Eye, Users, DollarSign, ChevronDown, Store, 
    FileSpreadsheet, Bot, Workflow, Github, Twitter, Instagram, Linkedin, Brain, CheckCircle2, Terminal, Mic
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CircuitDiagram from '../components/CircuitDiagram';
import ToolPhysicsEngine from '../components/ToolPhysicsEngine';

gsap.registerPlugin(ScrollTrigger);

// --- Neural Network Background Component for Bottom Section ---
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


/* ── Data ── */
const ALL_SERVICES = [
    {
        category: "n8n / Make",
        icon: <Workflow className="w-7 h-7" />,
        color: "from-blue-500 to-indigo-600",
        services: [
            {
                title: "Advanced API Orchestration",
                desc: "Time saved: avg. 20–50 hrs/week saved. Starting price: From $699/setup.",
                example: "Tools used: n8n, Make, Custom Webhooks, REST/GraphQL APIs",
                features: [
                    "Multi-branch logical workflows that handle complex decision-trees",
                    "Self-hosted n8n setups for maximum data privacy and cost control",
                    "Integrating 20+ legacy applications natively into a unified data hub",
                    "Built-in error-handling and auto-retry mechanisms for 99.9% uptime",
                    "Scheduled, high-volume database syncing and deep CRM integrations"
                ]
            }
        ]
    },
    {
        category: "OpenClaw",
        icon: <Terminal className="w-7 h-7" />,
        color: "from-cyan-500 to-teal-500",
        services: [
            {
                title: "Agentic Workspaces & Skillhub",
                desc: "Autonomous AI agents that use tools, search the web, and execute reasoning logic.",
                example: "Tools used: OpenClaw CLI, Skillhub APIs, Custom LangChain Agents",
                features: [
                    "Deploy autonomous agents capable of performing deep sequential reasoning",
                    "Connect custom backend tools directly to your AI reasoning loops",
                    "Completely automated code execution, dynamic web browsing, and research",
                    "Integration with our proprietary structural Skillhub for localized tasks"
                ]
            }
        ]
    },
    {
        category: "Shopify",
        icon: <ShoppingCart className="w-7 h-7" />,
        color: "from-cyan-500 to-blue-600",
        services: [
            {
                title: "Shopify Automation",
                desc: "Time saved: avg. 18–40 hrs/week saved. Starting price: From $499/setup.",
                example: "Tools used: Python, Node.js, Playwright, Make, REST APIs",
                features: ["Bulk product upload & AI description generation", "Auto inventory sync across multiple stores", "Dynamic pricing engine & price rule automation", "Abandoned cart recovery workflows", "Order fulfillment & tracking notification automation", "Shopify ↔ Excel / Google Sheets live sync"]
            }
        ]
    },
    {
        category: "Amazon",
        icon: <Store className="w-7 h-7" />,
        color: "from-violet-500 to-purple-700",
        services: [
            {
                title: "Amazon Automation (FBA & FBM)",
                desc: "Time saved: avg. 18–40 hrs/week saved. Starting price: From $499/setup.",
                example: "Tools used: Python, Node.js, Amazon Selling Partner API, Make",
                features: ["AI-powered listing creation & keyword optimization", "Inventory replenishment alerts & reorder triggers", "Automated review request sequences", "FBA profit calculator with live margin tracking", "Bulk ASIN processing via Excel file upload", "Amazon ↔ Slack / Email alert integrations"]
            }
        ]
    },
    {
        category: "Custom AI",
        icon: <Brain className="w-7 h-7" />,
        color: "from-rose-500 to-pink-600",
        services: [
            {
                title: "RAG & Custom LLM Infrastructures",
                desc: "Private knowledge bases trained on your proprietary company data.",
                example: "Tools used: OpenAI, Anthropic, Pinecone, LangChain, Flowise",
                features: [
                    "Vector DB implementation for semantic searching of thousands of documents",
                    "Fine-tuned models handling precise customer support for your niche",
                    "Internal company co-pilots that assist employees with instant answers",
                    "Data scrubbing pipelines ensuring PII is stripped before reaching the AI"
                ]
            }
        ]
    },
    {
        category: "Voice AI",
        icon: <Mic className="w-7 h-7" />,
        color: "from-emerald-500 to-teal-600",
        services: [
            {
                title: "Conversational Voice Agents",
                desc: "Human-like voice calling AI that performs inbound/outbound support & vetting.",
                example: "Tools used: Vapi, Bland AI, Twilio, OpenAI TTS/STT",
                features: [
                    "Deploy inbound receptionists that route calls automatically 24/7",
                    "Outbound cold-calling agents that pre-qualify leads and book meetings",
                    "Live, millisecond-latency human conversational interruption handling",
                    "Automated call transcription, sentiment analysis, and CRM logging"
                ]
            }
        ]
    },
    {
        category: "Excel",
        icon: <FileSpreadsheet className="w-7 h-7" />,
        color: "from-emerald-500 to-teal-600",
        services: [
            {
                title: "Excel & Data Processing Automation",
                desc: "Time saved: avg. 18–40 hrs/week saved. Starting price: From $499/setup.",
                example: "Tools used: Python, Node.js, SheetJS, Playwright",
                features: ["Upload Excel → AI cleans, validates & transforms data", "Bulk extraction from PDFs, CSVs, Excel sheets", "Auto-generate business reports from raw spreadsheet data", "Scheduled Excel processing (daily / weekly)", "Connect Excel data to Shopify, Amazon, or any CRM", "Live dashboards built from Excel uploads"]
            }
        ]
    },
    {
        category: "RPA",
        icon: <Bot className="w-7 h-7" />,
        color: "from-amber-500 to-orange-600",
        services: [
            {
                title: "Custom RPA Solutions",
                desc: "Time saved: avg. 18–40 hrs/week saved. Starting price: From $499/setup.",
                example: "Tools used: Python, Puppeteer, Playwright, Make",
                features: ["Browser automation (login, scrape, click, fill forms)", "Invoice & document processing automation", "Lead scraping & CRM auto-population", "Contract, PO & invoice generation bots", "Email inbox automation (auto-label, reply, extract)", "Zero-touch cross-platform workflow bots"]
            }
        ]
    }
];

const STATS = [
    { value: "340%", label: "Avg. Organic Traffic Growth", icon: <TrendingUp className="w-5 h-5" /> },
    { value: "62%", label: "Cost-per-Lead Reduction", icon: <DollarSign className="w-5 h-5" /> },
    { value: "8.4x", label: "Peak Meta ROAS Achieved", icon: <Zap className="w-5 h-5" /> },
    { value: "95%+", label: "Attribution Accuracy", icon: <Eye className="w-5 h-5" /> },
];

export default function Services() {
    const [activeCategory, setActiveCategory] = useState(0);
    const [expandedService, setExpandedService] = useState(null);

    // --- Added for About Sections Merge ---
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

    useEffect(() => {
        window.scrollTo(0, 0);
        const ctx = gsap.context(() => {
            gsap.from('.srv-hero-text > *', {
                y: 40, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out'
            });
            gsap.from('.srv-stat', {
                y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
                scrollTrigger: { trigger: '.srv-stats', start: 'top 80%' }
            });
            gsap.from('.srv-card', {
                y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
                scrollTrigger: { trigger: '.srv-grid', start: 'top 75%' }
            });
        });
        return () => { ctx.revert(); ScrollTrigger.getAll().forEach(t => t.kill()); };
    }, []);

    const currentCategory = ALL_SERVICES[activeCategory];

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

            {/* ── 3D Hero ── */}
            <section className="relative pt-28 pb-16 px-6 lg:px-20 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center min-h-[480px]">
                    <div className="srv-hero-text z-10 relative">
                        <span className="text-accent font-mono text-xs uppercase tracking-[0.4em] font-bold">Full-Service AI Automation Digital Agency</span>
                        <h1 className="text-5xl md:text-7xl font-display font-bold mt-4 mb-6 leading-[1.05] tracking-tight">
                            Every Channel. <br />
                            <span className="text-accent underline decoration-accent/20 underline-offset-8">One Intelligent</span> System.
                        </h1>
                        <p className="text-[var(--secondary)] text-xl leading-relaxed max-w-lg mb-8">
                            We build AI automation systems that eliminate manual work. Shopify, Amazon, RPA, and Excel — automated so you can scale.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/contact" className="px-8 py-4 bg-accent text-white font-bold rounded-2xl flex items-center gap-2 hover:scale-105 transition-transform shadow-xl shadow-accent/30">
                                Start Growing <ArrowUpRight size={18} />
                            </Link>
                            <a href="#services" className="px-8 py-4 border border-[var(--border)] rounded-2xl font-bold flex items-center gap-2 hover:border-accent/50 transition-colors">
                                Explore Services <ChevronDown size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Circuit Flow Diagram */}
                    <div className="h-[380px] lg:h-[480px] w-full flex items-center justify-center">
                        <CircuitDiagram className="w-full h-full" />
                    </div>


                </div>

                {/* Subtle static ambient — no blur ON content */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full pointer-events-none -z-10 translate-x-1/2 -translate-y-1/4" />
            </section>

            {/* ── Stats Bar ── */}
            <section className="srv-stats py-14 px-6 lg:px-20 border-y border-[var(--border)] bg-[var(--card-bg)]">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {STATS.map((s, i) => (
                        <div key={i} className="srv-stat text-center">
                            <div className="flex items-center justify-center gap-2 text-accent mb-2">{s.icon}</div>
                            <div className="text-4xl md:text-5xl font-display font-bold text-[var(--foreground)] tracking-tight">{s.value}</div>
                            <div className="text-xs font-mono text-[var(--secondary)] uppercase tracking-widest mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Services ── */}
            <section id="services" className="pt-24 pb-0 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--foreground)] tracking-tight mb-4">
                            Our Complete <span className="text-accent">Service Stack</span>
                        </h2>
                        <p className="text-[var(--secondary)] text-xl max-w-3xl mx-auto leading-relaxed">
                            Each service below is backed by real case examples and delivered through an AI-powered system, not guesswork.
                        </p>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-3 mb-8 justify-center">
                        {ALL_SERVICES.map((cat, i) => (
                            <button
                                key={i}
                                onClick={() => { setActiveCategory(i); setExpandedService(null); }}
                                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${activeCategory === i
                                    ? 'bg-accent text-white border-accent shadow-lg shadow-accent/30'
                                    : 'bg-[var(--card-bg)] text-[var(--foreground)] border-[var(--border)] hover:border-accent/40'
                                    }`}
                            >
                                {cat.icon}
                                <span className="hidden sm:inline">{cat.category}</span>
                            </button>
                        ))}
                    </div>

                    {/* Service Cards Grid - Dynamic Centering to remove empty grid columns */}
                    <div className={`srv-grid grid gap-6 ${currentCategory.services.length === 1 ? 'max-w-4xl mx-auto grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
                        {currentCategory.services.map((service, i) => (
                            <div
                                key={i}
                                className="srv-card flex flex-col bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl overflow-hidden hover:border-accent/40 hover:-translate-y-1 transition-all duration-400 shadow-lg"
                            >
                                {/* Card Top */}
                                <div className={`h-2 w-full bg-gradient-to-r ${currentCategory.color}`} />
                                <div className="p-8 flex flex-col flex-1">
                                    <h3 className="text-2xl font-display font-bold text-[var(--foreground)] mb-3">{service.title}</h3>
                                    <p className="text-[var(--secondary)] text-base leading-relaxed mb-6 flex-1">{service.desc}</p>

                                    {/* Example Block */}
                                    <div className="bg-accent/8 border border-accent/20 rounded-2xl p-4 mb-6">
                                        <div className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-[var(--foreground)] leading-relaxed font-body">{service.example}</p>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-2 pt-4 border-t border-[var(--border)]">
                                        {service.features.map((feat, j) => (
                                            <div key={j} className="flex items-center gap-3 text-sm text-[var(--foreground)]">
                                                <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Tool Physics Engine ── */}
            <section className="pt-4 pb-12 px-6 lg:px-20 relative bg-[var(--background)] overflow-hidden border-t border-[var(--border)]">
                <div className="max-w-7xl mx-auto text-center mb-10 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-[var(--foreground)] tracking-tight">
                        Built for <span className="text-accent underline decoration-accent/20 underline-offset-8">Every Ecosystem</span>
                    </h2>
                    <p className="text-[var(--secondary)] mt-3">We connect your favorite tools—throwing them together into one seamless automation loop.</p>
                </div>
                
                <div className="max-w-7xl mx-auto h-[500px] md:h-[600px] rounded-[2rem] border border-[var(--border)] bg-[var(--card-bg)] shadow-inner relative overflow-hidden group cursor-grab active:cursor-grabbing">
                    {/* Physics engine mount point */}
                    <ToolPhysicsEngine />
                </div>
            </section>

            {/* ── How We Automate: Step-by-Step ── */}
            <section className="py-24 px-6 lg:px-20 bg-[var(--card-bg)] border-t border-[var(--border)]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-accent font-mono text-xs uppercase tracking-[0.4em] font-bold">The System</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--foreground)] tracking-tight mt-4 mb-4">
                            How We <span className="text-accent">Automate</span>
                        </h2>
                        <p className="text-[var(--secondary)] text-xl max-w-3xl mx-auto">
                            No manual work. No repetitive tasks. Our proprietary automation process runs in 3 precision phases.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                phase: "Phase 01",
                                title: "Discovery",
                                desc: "We map your most painful manual processes and identify the biggest automation opportunities.",
                                example: "Identifying time-wasting spreadsheets and repetitive clicks.",
                                icon: <Search className="w-6 h-6" />
                            },
                            {
                                phase: "Phase 02",
                                title: "Build",
                                desc: "We engineer the automation, test it securely, and deploy it across your tech stack.",
                                example: "Building Python scripts and Make workflows to replace data entry.",
                                icon: <Code className="w-6 h-6" />
                            },
                            {
                                phase: "Phase 03",
                                title: "Monitor",
                                desc: "We watch it run and optimise over time to ensure 99.9% uptime and zero errors.",
                                example: "Slack alerts and logging for complete system transparency.",
                                icon: <Eye className="w-6 h-6" />
                            }
                        ].map((step, i) => (
                            <div key={i} className="bg-[var(--background)] border border-[var(--border)] rounded-3xl p-8 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 shadow-md">
                                <div className="text-xs font-mono text-accent uppercase tracking-widest font-bold mb-4">{step.phase}</div>
                                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-5">{step.icon}</div>
                                <h3 className="text-xl font-display font-bold text-[var(--foreground)] mb-3">{step.title}</h3>
                                <p className="text-[var(--secondary)] text-sm leading-relaxed mb-4">{step.desc}</p>
                                <div className="bg-accent/8 border border-accent/20 rounded-xl p-3 text-xs text-[var(--foreground)] italic leading-relaxed">
                                    {step.example}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-24 px-6 lg:px-20 relative z-20 bg-[var(--background)]">
                <div className="max-w-5xl mx-auto bg-accent rounded-[2.5rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl shadow-accent/30 relative overflow-hidden">
                    <div className="relative z-10 max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">
                            Ready to Build Your <br /><span className="italic underline underline-offset-8 decoration-white/20">Growth Engine?</span>
                        </h2>
                        <p className="text-white/90 text-lg leading-relaxed">
                            Schedule a free AI audit. We'll map exactly which services will move the needle fastest for your business.
                        </p>
                    </div>
                    <Link to="/contact" className="relative z-10 flex-shrink-0 px-10 py-5 bg-white text-accent font-bold rounded-2xl text-lg flex items-center gap-3 hover:scale-105 transition-transform shadow-xl">
                        Get Free AI Audit <ArrowUpRight size={22} />
                    </Link>
                    <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full" />
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full" />
                </div>
            </section>

            {/* ── ABOUT CONTENT WRAPPER ── */}
            <div className="relative bg-[var(--background)]">
                {/* Neural Background Localized to Bottom */}
                <div className="absolute top-0 left-0 right-0 bottom-0 z-0 pointer-events-none opacity-30">
                    <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
                        <ambientLight intensity={0.5} />
                        <NeuralNetwork />
                    </Canvas>
                </div>

                <div className="relative z-10 px-8 lg:px-20 pt-10">
                    {/* Strategy Section */}
                    <section className="py-24 border-t border-[var(--border)]">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <div className="bg-[var(--card-bg)] p-12 border-l-4 border-l-accent shadow-xl rounded-2xl">
                                <h2 className="text-3xl font-display font-bold mb-6 text-[var(--foreground)]">The Malik Logix <span className="text-accent">Edge</span></h2>
                                <p className="text-[var(--secondary)] leading-relaxed mb-6">
                                    In an era of rapid digital evolution, we don't just "add" AI to your business. We reconstruct your workflows from the ground up to be AI-native.
                                </p>
                                <p className="text-[var(--secondary)] leading-relaxed font-bold italic">
                                    "The goal isn't just to work faster—it's to work smarter by letting machines handle the repetition while humans focus on the innovation."
                                </p>
                            </div>
                            <div className="space-y-8">
                                <h3 className="text-4xl font-display font-bold text-[var(--foreground)] tracking-tight">Pioneering <span className="text-accent">Autonomous</span> Growth</h3>
                                <p className="text-[var(--secondary)] text-lg">
                                    Whether it's e-commerce automation, lead generation pipelines, or specialized digital marketing engines, we build systems that don't just function—they evolve.
                                </p>
                                <ul className="space-y-4">
                                    {['AI-Driven Workflow Architects', 'Agentic System Specialists', 'Premium Growth Partners'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <CheckCircle2 className="text-accent" size={20} />
                                            <span className="font-bold text-[var(--foreground)]">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Pillars Grid */}
                    <section className="py-24">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--foreground)] tracking-tight">Our Core <span className="text-accent">Pillars</span></h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {pillars.map((pillar, i) => (
                                    <motion.div 
                                        key={i} 
                                        className="bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl p-8 group hover:border-accent/40 shadow-md transition-colors"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                                            {pillar.icon}
                                        </div>
                                        <h3 className="text-xl font-display font-bold mb-4 text-[var(--foreground)]">{pillar.title}</h3>
                                        <p className="text-[var(--secondary)] leading-relaxed text-sm">{pillar.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Social Media Footer */}
                    <section className="py-32 border-t border-[var(--border)]">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-display font-bold mb-4 text-[var(--foreground)]">Join our <span className="text-accent">Ecosystem</span></h2>
                                <p className="text-[var(--secondary)] font-mono tracking-widest text-xs uppercase">Stay connected with the latest in AI Automation and Digital Growth.</p>
                            </div>
                            
                            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                                {socialLinks.map((social, i) => (
                                    <motion.a 
                                        key={i}
                                        href={social.href}
                                        onMouseMove={handleMagnetic}
                                        onMouseLeave={resetMagnetic}
                                        className="flex flex-col items-center gap-4 group cursor-pointer"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <div className="w-20 h-20 bg-[var(--card-bg)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--secondary)] group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-500 shadow-xl">
                                            {social.icon}
                                        </div>
                                        <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-[var(--secondary)] group-hover:text-[var(--foreground)] transition-colors">
                                            {social.label}
                                        </span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </div>
    );
}
