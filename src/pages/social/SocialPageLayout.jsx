import React, { useEffect } from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';
import SuggestionForm from '../../components/SuggestionForm';

const SocialPageLayout = ({ 
    platform = '', 
    icon: Icon, 
    handle = '', 
    url = '#', 
    heroTitle = '', 
    heroSubtitle = '', 
    stats = [], 
    content = [], 
    source = '' 
}) => {
    useEffect(() => {
        document.title = `${platform} | MalikLogix`;
        window.scrollTo(0, 0);
    }, [platform]);

    return (
        <div className="bg-background min-h-screen text-foreground font-body pb-24 transition-colors duration-500 overflow-hidden selection:bg-accent/30 selection:text-foreground">
            {/* Minimal Hero */}
            <div className="relative pt-40 pb-20 px-6 lg:px-20 max-w-7xl mx-auto border-b border-border/50">
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-px w-8 bg-accent" />
                    <span className="text-xs font-mono text-accent uppercase tracking-[0.2em] font-bold">{platform} Presence</span>
                </div>
                
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-8xl font-black font-display tracking-tight mb-8">
                            {heroTitle || platform}
                        </h1>
                        <p className="text-xl text-secondary leading-relaxed font-body">
                            {heroSubtitle}
                        </p>
                    </div>
                    
                    <a 
                        href={url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="group flex flex-col items-center justify-center p-8 bg-card-bg border border-border rounded-[2.5rem] hover:border-accent/40 transition-all gap-4 min-w-[200px]"
                    >
                        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/20 group-hover:scale-110 transition-transform">
                            {Icon && <Icon size={32} className="text-accent" />}
                        </div>
                        <div className="text-center">
                            <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">Follow {handle}</div>
                            <div className="flex items-center gap-2 text-accent font-bold text-sm">
                                Visit Profile <ExternalLink size={14} />
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="max-w-7xl mx-auto px-6 lg:px-20 -mt-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-card-bg border border-border p-6 rounded-2xl">
                            <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">{stat.label}</div>
                            <div className="text-2xl font-black font-display text-foreground">{stat.value}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-20 py-24">
                {/* Long Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-12">
                        {content.map((section, i) => (
                            <div key={i}>
                                <h2 className="text-3xl font-black font-display tracking-tight mb-6">{section.title}</h2>
                                <div className="text-secondary leading-relaxed space-y-6 text-lg">
                                    {section.paragraphs.map((p, j) => (
                                        <p key={j}>{p}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar / CTA */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-8">
                            <div className="bg-accent/5 border border-accent/20 rounded-3xl p-8">
                                <h3 className="text-xl font-bold mb-4">Partner on {platform}</h3>
                                <p className="text-sm text-secondary mb-6 leading-relaxed">
                                    Interested in collaborating or sponsoring our content specifically on this platform? 
                                </p>
                                <a 
                                    href="/contact" 
                                    className="block w-full py-4 bg-accent text-white text-center font-bold rounded-xl text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                                >
                                    Get in Touch
                                </a>
                            </div>
                            
                            <div className="border border-border rounded-3xl p-8">
                                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                                <ul className="space-y-4">
                                    {['Official Group', 'Daily Updates', 'Resource Hub'].map((link, j) => (
                                        <li key={j}>
                                            <a href="#" className="flex items-center justify-between text-sm text-secondary hover:text-accent font-medium transition-colors group">
                                                {link} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Centralized Suggestion Form */}
            <div className="max-w-7xl mx-auto px-6 lg:px-20">
                <SuggestionForm 
                    source={source || platform.toLowerCase()} 
                    apiEndpoint="leads"
                    title={`Request for ${platform}`}
                    subtitle={`What should we share or build specifically for our ${platform} community?`}
                />
            </div>
        </div>
    );
};

export default SocialPageLayout;
