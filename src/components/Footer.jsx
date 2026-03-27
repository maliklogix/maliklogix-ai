import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const { theme } = useTheme();

    return (
        <footer className="py-20 px-8 lg:px-20 bg-[var(--background)] border-t border-[var(--border)] transition-colors duration-500 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-accent rounded-md" />
                            <span className="text-xl font-display font-bold tracking-tighter text-[var(--foreground)]">MalikLogix</span>
                        </div>
                        <p className="text-[var(--secondary)] max-w-md font-body leading-relaxed">
                            MalikLogix — AI Automation Agency <br />
                            Built by Malik | Shopify · Amazon · RPA · Excel Automation
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-mono text-accent uppercase tracking-widest mb-6">Services</h4>
                        <ul className="space-y-3 text-[var(--secondary)] font-body">
                            <li><Link to="/services" className="hover:text-accent transition-colors">Shopify Automation</Link></li>
                            <li><Link to="/services" className="hover:text-accent transition-colors">Amazon Automation</Link></li>
                            <li><Link to="/services" className="hover:text-accent transition-colors">RPA Solutions</Link></li>
                            <li><Link to="/services" className="hover:text-accent transition-colors">Excel Processing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-mono text-accent uppercase tracking-widest mb-6">Company</h4>
                        <ul className="space-y-3 text-[var(--secondary)] font-body">
                            <li><Link to="/philosophy" className="hover:text-accent transition-colors">How We Work</Link></li>
                            <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[var(--border)] gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--secondary)]">
                    <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                        AI Stack Operational
                    </div>
                    <div>
                        © 2025 MalikLogix. All rights reserved.
                    </div>
                    <div className="flex gap-8">
                        <a href="https://github.com/maliklogix" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">GitHub</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
