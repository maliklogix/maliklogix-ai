import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Search, Rocket, Layers, Target, BarChart3, Globe, Mail,
    MessageSquare, Video, ShoppingCart, Code, Cpu, ArrowUpRight,
    CheckCircle, TrendingUp, Zap, Eye, Users, DollarSign, ChevronDown, Store, FileSpreadsheet, Bot, Workflow
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CircuitDiagram from '../components/CircuitDiagram';



gsap.registerPlugin(ScrollTrigger);




/* ── Data ── */
const ALL_SERVICES = [
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
        color: "from-pink-500 to-rose-600",
        services: [
            {
                title: "Custom RPA Solutions",
                desc: "Time saved: avg. 18–40 hrs/week saved. Starting price: From $499/setup.",
                example: "Tools used: Python, Puppeteer, Playwright, Make",
                features: ["Browser automation (login, scrape, click, fill forms)", "Invoice & document processing automation", "Lead scraping & CRM auto-population", "Contract, PO & invoice generation bots", "Email inbox automation (auto-label, reply, extract)", "Zero-touch cross-platform workflow bots"]
            }
        ]
    },
    {
        category: "Workflows",
        icon: <Workflow className="w-7 h-7" />,
        color: "from-amber-500 to-orange-600",
        services: [
            {
                title: "Workflow & Integration Automation",
                desc: "Time saved: avg. 18–40 hrs/week saved. Starting price: From $499/setup.",
                example: "Tools used: Zapier, Make, Node.js, Webhooks, REST APIs",
                features: ["Advanced Zapier / Make multi-step workflows", "Webhooks, REST APIs & custom middleware", "Notion, Airtable, Google Sheets sync", "Slack bots for business operations", "Auto-invoice & payment tracking pipelines"]
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
            <section id="services" className="py-24 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--foreground)] tracking-tight mb-4">
                            Our Complete <span className="text-accent">Service Stack</span>
                        </h2>
                        <p className="text-[var(--secondary)] text-xl max-w-3xl mx-auto leading-relaxed">
                            Each service below is backed by real case examples and delivered through an AI-powered system, not guesswork.
                        </p>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-3 mb-12 justify-center">
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

                    {/* Service Cards Grid */}
                    <div className="srv-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <section className="py-24 px-6 lg:px-20">
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

        </div>
    );
}
