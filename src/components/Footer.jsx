import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Github, Twitter, Instagram, Youtube, MessageCircle } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
    const { theme } = useTheme();

    return (
        <footer className="py-20 px-8 lg:px-20 bg-[var(--background)] border-t border-[var(--border)] transition-colors duration-500 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-6 pointer-events-none">
                            <Logo size={32} />
                            <span className="text-xl font-display font-bold tracking-tighter text-[var(--foreground)]">
                                Malik<span className="text-accent underline decoration-accent/20 underline-offset-4 decoration-2">Logix</span>
                            </span>
                        </div>
                        <p className="text-[var(--secondary)] max-w-md font-body leading-relaxed mb-8">
                            MalikLogix — AI Automation Digital Agency <br />
                            Built by Malik | Shopify · Amazon · RPA · Data
                        </p>
                        
                        <a href="https://maps.google.com/?q=Lahore,Pakistan" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card-bg)] text-[var(--secondary)] hover:text-accent hover:border-accent/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all font-mono text-xs uppercase tracking-widest group leading-none">
                            <MapPin size={14} width={14} height={14} className="text-accent shrink-0" />
                            <span className="inline-block pt-0.5">Lahore, Pakistan</span>
                            <ArrowUpRight size={14} width={14} height={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                        </a>
                    </div>

                    <div className="col-span-1">
                        <h2 className="text-sm font-mono text-accent uppercase tracking-widest mb-6">Solutions</h2>
                        <ul className="space-y-3 text-[var(--secondary)] font-body text-sm">
                            <li><Link to="/services" className="hover:text-accent transition-colors block">All Services</Link></li>
                            <li><Link to="/services/shopify-ai" className="hover:text-accent transition-colors block">Shopify AI</Link></li>
                            <li><Link to="/services/crm-automation" className="hover:text-accent transition-colors block">CRM Automation</Link></li>
                            <li><Link to="/services/lead-generation-ai" className="hover:text-accent transition-colors block">Lead Generation</Link></li>
                            <li><Link to="/tools/openclaw/automation" className="hover:text-accent transition-colors block">RPA Operations</Link></li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h2 className="text-sm font-mono text-accent uppercase tracking-widest mb-6">Insights</h2>
                        <ul className="space-y-3 text-[var(--secondary)] font-body text-sm">
                            <li><Link to="/about" className="hover:text-accent transition-colors block">About Agency</Link></li>
                            <li><Link to="/founder" className="hover:text-accent transition-colors block">The Founder</Link></li>
                            <li><Link to="/philosophy" className="hover:text-accent transition-colors block">Philosophy</Link></li>
                            <li><Link to="/blog" className="hover:text-accent transition-colors block">Tech Blog</Link></li>
                            <li><Link to="/legal" className="hover:text-accent transition-colors block">Legal Policy</Link></li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h2 className="text-sm font-mono text-accent uppercase tracking-widest mb-6">Hub</h2>
                        <ul className="space-y-3 text-[var(--secondary)] font-body text-sm">
                            <li><Link to="/contact" className="hover:text-accent transition-colors block">Contact Us</Link></li>
                            <li><Link to="/stack/coupons" className="hover:text-accent transition-colors block">Stack & Deals</Link></li>
                            <li><Link to="/stack/media-kit" className="hover:text-accent transition-colors block">Media Kit</Link></li>
                            <li><Link to="/docs" className="hover:text-accent transition-colors block">System Docs</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row justify-between items-center pt-8 border-t border-[var(--border)] gap-6">
                    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--secondary)]">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                        AI Stack Operational
                    </div>
                    
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--secondary)]">
                        © 2026 MalikLogix. All rights reserved.
                    </div>
                    
                    <div className="flex gap-4 items-center">
                        <Link to="/github" className="p-2.5 bg-[var(--card-bg)] border border-[var(--border)] text-[var(--secondary)] rounded-full hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all group" aria-label="GitHub">
                            <Github size={16} className="group-hover:scale-110 transition-transform" />
                        </Link>
                        <Link to="/x" className="p-2.5 bg-[var(--card-bg)] border border-[var(--border)] text-[var(--secondary)] rounded-full hover:border-[var(--foreground)] hover:text-[var(--foreground)] transition-all group" aria-label="X (Twitter)">
                            <Twitter size={16} className="group-hover:scale-110 transition-transform" />
                        </Link>
                        <Link to="/instagram" className="p-2.5 bg-[var(--card-bg)] border border-[var(--border)] text-[var(--secondary)] rounded-full hover:border-pink-500 hover:text-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.2)] transition-all group" aria-label="Instagram">
                            <Instagram size={16} className="group-hover:scale-110 transition-transform" />
                        </Link>
                        <Link to="/youtube" className="p-2.5 bg-[var(--card-bg)] border border-[var(--border)] text-[var(--secondary)] rounded-full hover:border-red-500 hover:text-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all group" aria-label="YouTube">
                            <Youtube size={16} className="group-hover:scale-110 transition-transform" />
                        </Link>
                        <Link to="/whatsapp" className="p-2.5 bg-[var(--card-bg)] border border-[var(--border)] text-[var(--secondary)] rounded-full hover:border-emerald-500 hover:text-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all group" aria-label="WhatsApp">
                            <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
