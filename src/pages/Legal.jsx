import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  ShieldCheck, FileText, Lock, Eye, 
  Scale, AlertCircle, ChevronRight, Globe
} from 'lucide-react';

const Legal = () => {
    const [activeTab, setActiveTab] = useState('privacy');
    const containerRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const ctx = gsap.context(() => {
            gsap.from('.legal-header', {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: 'power4.out'
            });
            gsap.from('.legal-nav', {
                opacity: 0,
                x: -30,
                duration: 0.8,
                delay: 0.4,
                ease: 'power3.out'
            });
        });
        return () => ctx.revert();
    }, []);

    const tabs = [
        { id: 'privacy', icon: <Lock size={18} />, label: 'Privacy Policy' },
        { id: 'terms', icon: <Scale size={18} />, label: 'Terms of Service' },
        { id: 'cookies', icon: <Eye size={18} />, label: 'Cookie Policy' },
        { id: 'ai', icon: <ShieldCheck size={18} />, label: 'AI Ethics' }
    ];

    const content = {
        privacy: {
            title: "Privacy Policy",
            lastUpdated: "March 28, 2026",
            sections: [
                {
                    heading: "1. Data Collection",
                    text: "Malik Logix AI Agency collects information that you provide directly to us when requesting an audit, subscribing to our newsletter, or contacting us for services. This includes names, email addresses, and business details necessary for AI workflow analysis."
                },
                {
                    heading: "2. How We Use Your Data",
                    text: "We use your data to improve our AI models' understanding of your business needs, to deliver requested services, and to provide updates on AI automation trends relevant to your industry."
                },
                {
                    heading: "3. AI Processing Disclosure",
                    text: "By using our services, you acknowledge that your business data may be processed using state-of-the-art Large Language Models (LLMs) and autonomous agent systems. We ensure all data is anonymized where necessary and processed securely."
                }
            ]
        },
        terms: {
            title: "Terms of Service",
            lastUpdated: "March 28, 2026",
            sections: [
                {
                    heading: "1. Service Agreement",
                    text: "Malik Logix provides AI automation, digital marketing, and consultancy services. All project timelines and deliverables are outlined in specific Statement of Work (SOW) documents provided upon engagement."
                },
                {
                    heading: "2. Intellectual Property",
                    text: "All AI-driven workflows, custom scripts, and marketing strategies developed for the client become the property of the client upon full payment, unless otherwise specified in the service contract."
                },
                {
                    heading: "3. Liability",
                    text: "While we strive for 100% accuracy in our AI systems, Malik Logix is not liable for indirect or consequential losses resulting from autonomous system outputs or algorithmic changes in third-party platforms."
                }
            ]
        },
        cookies: {
            title: "Cookie Policy",
            lastUpdated: "March 28, 2026",
            sections: [
                {
                    heading: "What are cookies?",
                    text: "Cookies are small text files stored on your device that help us analyze site traffic and remember your preferences (such as light/dark mode settings)."
                },
                {
                    heading: "How we use them",
                    text: "We use essential cookies for site functionality and analytical cookies (like Google Analytics) to understand how you interact with our AI automation insights."
                }
            ]
        },
        ai: {
            title: "AI Ethics & Transparency",
            lastUpdated: "March 28, 2026",
            sections: [
                {
                    heading: "Human-in-the-Loop",
                    text: "We believe in augmented intelligence. Every autonomous workflow we build for our clients includes a 'Human-in-the-Loop' verification stage to ensure brand alignment and ethical execution."
                },
                {
                    heading: "Bias Mitigation",
                    text: "We actively work to identify and mitigate biases in the AI models we deploy, ensuring that marketing and automation strategies are fair and inclusive."
                }
            ]
        }
    };

    return (
        <div className="pt-32 pb-20 px-8 lg:px-20 min-h-screen bg-background transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                <header className="legal-header mb-20 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
                        <Globe size={14} className="text-accent" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent">Legal Compliance & Transparency</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                        Malik Logix <span className="text-accent">Policy Hub</span>
                    </h1>
                    <p className="text-secondary text-xl max-w-2xl font-body leading-relaxed">
                        Clear, transparent, and ethical. Here's how we handle your data and our professional commitments at Malik Logix.
                    </p>
                </header>

                <div className="grid lg:grid-cols-[300px_1fr] gap-12 items-start">
                    <aside className="legal-nav sticky top-32 space-y-2 p-4 bg-card-bg/40 border border-border rounded-3xl backdrop-blur-xl">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                                    activeTab === tab.id 
                                    ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                                    : 'text-secondary hover:bg-accent/5 hover:text-accent'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    {tab.icon}
                                    <span className="font-bold text-sm">{tab.label}</span>
                                </div>
                                <ChevronRight size={16} className={`transition-transform duration-300 ${activeTab === tab.id ? 'translate-x-1' : ''}`} />
                            </button>
                        ))}
                    </aside>

                    <main className="min-h-[600px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="bg-card-bg/40 border border-border rounded-[40px] p-8 md:p-16 backdrop-blur-xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                                    <FileText size={200} />
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-12 border-b border-border pb-8">
                                        <h2 className="text-4xl font-bold">{content[activeTab].title}</h2>
                                        <div className="text-right">
                                            <p className="text-[10px] font-mono text-secondary uppercase tracking-[0.2em]">Last Updated</p>
                                            <p className="text-sm font-bold text-accent">{content[activeTab].lastUpdated}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-12">
                                        {content[activeTab].sections.map((section, idx) => (
                                            <div key={idx} className="space-y-4">
                                                <h3 className="text-xl font-bold flex items-center gap-3">
                                                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                                                    {section.heading}
                                                </h3>
                                                <p className="text-secondary leading-[1.8] text-lg font-body">
                                                    {section.text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-16 p-8 bg-accent/5 border border-accent/20 rounded-3xl flex items-start gap-4">
                                        <AlertCircle className="text-accent shrink-0 mt-1" size={20} />
                                        <p className="text-xs text-secondary leading-relaxed font-body italic">
                                            This document is for informational purposes only. For specific legal consultations regarding Malik Logix's services, please contact our legal team at legal@maliklogix.com.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>
            
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        </div>
    );
};

export default Legal;
