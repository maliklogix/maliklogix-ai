import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Menu, X, ChevronDown, ChevronUp, Tag, Handshake, Users, FileText, Link2, Video, Smartphone, Monitor, Mail, Mic } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import { megaMenuColumns } from '../data/solutionsData';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
    const [isMobileLearnOpen, setIsMobileLearnOpen] = useState(false);
    const [isMobileStackOpen, setIsMobileStackOpen] = useState(false);
    const navRef = useRef(null);
    const menuRef = useRef(null);
    const location = useLocation();

    // Close mobile sub-menus and menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
        setIsMobileSolutionsOpen(false);
        setIsMobileLearnOpen(false);
        setIsMobileStackOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsMenuOpen(false);
                // Desktop mega menu uses CSS hover, but if we had state it would go here
            }
        };
        window.addEventListener('keydown', handleEscape);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleEscape);
        };
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            gsap.to(menuRef.current, {
                clipPath: 'circle(150% at 100% 0%)',
                duration: 0.8,
                ease: 'power4.inOut'
            });
            gsap.fromTo('.menu-link',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, delay: 0.3, duration: 0.5 }
            );
        } else {
            gsap.to(menuRef.current, {
                clipPath: 'circle(0% at 100% 0%)',
                duration: 0.6,
                ease: 'power4.inOut'
            });
        }
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'Our Solutions', isMegaMenu: true },
        { 
            name: 'Learn', 
            dropdownItems: [
                { name: 'About Agency', href: '/about' },
                { name: 'The Founder', href: '/founder' },
                { name: 'How We Work', href: '/philosophy' },
                { name: 'Blog', href: '/blog' },
                { name: 'Docs', href: '/docs' },
                { name: 'Legal Policy', href: '/legal' }
            ] 
        },
        { name: 'Stack', isStackMenu: true },
        { name: 'Contact', href: '/contact' }
    ];

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-out flex justify-center items-center py-6 px-8 lg:px-20 ${isScrolled ? 'pt-4' : 'pt-8'
                    }`}
            >
                <div
                    className={`relative flex items-center justify-between w-full max-w-7xl transition-all duration-500 ease-out border ${isScrolled
                            ? 'bg-[var(--background)]/60 backdrop-blur-xl border-[var(--border)] py-3 px-6 rounded-full shadow-2xl scale-[0.98]'
                            : 'bg-transparent border-transparent py-0 px-0'
                        }`}
                >
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group cursor-pointer">
                        <div className="group-hover:rotate-[10deg] transition-all duration-500 ease-out">
                            <Logo size={42} />
                        </div>
                        <div className="flex flex-col -gap-1">
                            <span className="text-xl font-display font-bold tracking-tighter text-[var(--foreground)] leading-none">
                                Malik<span className="text-accent underline decoration-accent/20 underline-offset-4 decoration-2">Logix</span>
                            </span>
                            <span className="text-[9px] font-mono text-[var(--secondary)] uppercase tracking-[0.3em] font-bold opacity-60">
                                AI Digital Agency
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => {
                            if (link.isMegaMenu) {
                                return (
                                    <div key={link.name} className="group relative">
                                        <button
                                            className="text-sm font-mono transition-colors uppercase tracking-widest relative flex items-center gap-1 text-[var(--secondary)] hover:text-accent focus:outline-none"
                                            aria-expanded="false"
                                            aria-haspopup="true"
                                        >
                                            {link.name} <ChevronDown className="w-4 h-4" />
                                            <span className="absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 w-0 group-hover:w-full" />
                                        </button>
                                        
                                        {/* Mega Menu Dropdown */}
                                        <div 
                                            className="absolute top-full left-1/2 -translate-x-1/2 w-[100vw] mt-6 opacity-0 translate-y-[-6px] invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 ease-out z-[120]"
                                            role="menu"
                                        >
                                            {/* Bridge to prevent hover gap issues */}
                                            <div className="absolute top-[-24px] left-0 right-0 h-8 bg-transparent" />
                                            
                                            <div className="bg-[var(--card-bg)] border-t-[2px] border-accent shadow-[0_12px_40px_rgba(0,0,0,0.10)] rounded-b-2xl mx-auto w-full max-w-7xl relative" style={{ padding: '36px 60px 40px 60px' }}>
                                                <div className="grid grid-cols-4 gap-10">
                                                    {megaMenuColumns.map((col, i) => (
                                                        <div key={i} className="flex flex-col">
                                                            <div className="text-accent font-bold uppercase tracking-[1.5px] text-[11px] mb-5">{col.heading}</div>
                                                            <div className="flex flex-col space-y-2">
                                                                {col.items.map((item, j) => (
                                                                    <Link 
                                                                        key={j} 
                                                                        to={item.route} 
                                                                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-accent/10 transition-colors duration-200 outline-none focus-visible:bg-accent/10 focus-visible:ring-1 focus-visible:ring-accent"
                                                                        role="menuitem"
                                                                    >
                                                                        <item.icon className="w-[18px] h-[18px] text-accent shrink-0 mt-0.5" />
                                                                        <div className="flex flex-col">
                                                                            <span className="text-[var(--foreground)] text-[14px] font-medium leading-tight">{item.title}</span>
                                                                            <span className="text-gray-500 text-[12px] truncate max-w-[180px] mt-1 line-clamp-1 leading-tight">{item.description}</span>
                                                                        </div>
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            if (link.isStackMenu) {
                                return (
                                    <div key={link.name} className="group relative">
                                        <button
                                            className="text-sm font-mono transition-colors uppercase tracking-widest relative flex items-center gap-1 text-[var(--secondary)] hover:text-accent focus:outline-none"
                                            aria-expanded="false"
                                            aria-haspopup="true"
                                        >
                                            {link.name} <ChevronDown className="w-4 h-4" />
                                            <span className="absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 w-0 group-hover:w-full" />
                                        </button>
                                        
                                        <div 
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-6 opacity-0 translate-y-[-6px] invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 ease-out z-[120] min-w-[480px]"
                                            role="menu"
                                        >
                                            <div className="absolute top-[-24px] left-0 right-0 h-8 bg-transparent" />
                                            
                                            <div className="bg-[var(--card-bg)] border border-[var(--border)] border-t-[2px] border-t-accent shadow-[0_12px_40px_rgba(0,0,0,0.10)] rounded-b-2xl py-6 px-6 flex flex-col gap-4">
                                                <div className="grid grid-cols-2 gap-8">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[12px] font-bold uppercase tracking-[1.5px] text-[var(--secondary)] px-4 mb-2">Partner With Us</span>
                                                        {[
                                                            { title: 'Coupons & Deals', icon: Tag, route: '/stack/coupons' },
                                                            { title: 'Sponsorships', icon: Handshake, route: '#' },
                                                            { title: 'Collaborations', icon: Users, route: '#' },
                                                            { title: 'Resources', icon: FileText, route: '#' },
                                                            { title: 'Affiliate Program', icon: Link2, route: '#' }
                                                        ].map((item, j) => (
                                                            <Link key={j} to={item.route} className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-accent/10 transition-colors duration-200 outline-none focus-visible:bg-accent/10 focus-visible:ring-1 focus-visible:ring-accent" role="menuitem">
                                                                <item.icon className="w-[18px] h-[18px] text-accent shrink-0" />
                                                                <span className="text-[14px] font-medium text-[var(--foreground)] whitespace-nowrap">{item.title}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[12px] font-bold uppercase tracking-[1.5px] text-[var(--secondary)] px-4 mb-2">Media & Reach</span>
                                                        {[
                                                            { title: 'YouTube Collaborations', icon: Video, route: '#' },
                                                            { title: 'TikTok Features', icon: Smartphone, route: '#' },
                                                            { title: 'Site Sponsorship', icon: Monitor, route: '#' },
                                                            { title: 'Newsletter Features', icon: Mail, route: '#' },
                                                            { title: 'Podcast & Interviews', icon: Mic, route: '#' }
                                                        ].map((item, j) => (
                                                            <Link key={j} to={item.route} className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-accent/10 transition-colors duration-200 outline-none focus-visible:bg-accent/10 focus-visible:ring-1 focus-visible:ring-accent" role="menuitem">
                                                                <item.icon className="w-[18px] h-[18px] text-accent shrink-0" />
                                                                <span className="text-[14px] font-medium text-[var(--foreground)] whitespace-nowrap">{item.title}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="border-t border-[var(--border)] pt-4 mt-2 flex items-center justify-between px-4">
                                                    <span className="text-[14px] text-[var(--secondary)] font-medium">Want to partner with MalikLogix?</span>
                                                    <Link to="/stack/media-kit" className="text-[14px] font-bold text-accent hover:text-accent/80 transition-colors flex items-center gap-1 group/btn">
                                                        View Media Kit <span className="transition-transform group-hover/btn:translate-x-1" aria-hidden="true">&rarr;</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            if (link.dropdownItems) {
                                return (
                                    <div key={link.name} className="group relative">
                                        <button
                                            className="text-sm font-mono transition-colors uppercase tracking-widest relative flex items-center gap-1 text-[var(--secondary)] hover:text-accent focus:outline-none"
                                            aria-expanded="false"
                                            aria-haspopup="true"
                                        >
                                            {link.name} <ChevronDown className="w-4 h-4" />
                                            <span className="absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 w-0 group-hover:w-full" />
                                        </button>
                                        
                                        {/* Standard Dropdown */}
                                        <div 
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-6 opacity-0 translate-y-[-6px] invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 ease-out z-[120] min-w-[200px]"
                                            role="menu"
                                        >
                                            {/* Bridge to prevent hover gap issues */}
                                            <div className="absolute top-[-24px] left-0 right-0 h-8 bg-transparent" />
                                            
                                            <div className="bg-[var(--card-bg)] border border-[var(--border)] border-t-[2px] border-t-accent shadow-[0_12px_40px_rgba(0,0,0,0.10)] rounded-b-2xl py-4 px-3 flex flex-col gap-1">
                                                {link.dropdownItems.map((item, j) => (
                                                    <Link 
                                                        key={j} 
                                                        to={item.href} 
                                                        className="px-4 py-2.5 rounded-lg hover:bg-accent/10 transition-colors duration-200 text-[14px] font-medium text-[var(--foreground)] whitespace-nowrap outline-none focus-visible:bg-accent/10 focus-visible:ring-1 focus-visible:ring-accent"
                                                        role="menuitem"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className={`text-sm font-mono transition-colors uppercase tracking-widest relative group ${location.pathname === link.href ? 'text-accent' : 'text-[var(--secondary)] hover:text-accent'
                                        }`}
                                >
                                    {link.name}
                                    <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                                        }`} />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Action Button & Theme Toggle */}
                    <div className="flex items-center gap-6">
                        <ThemeToggle />

                        <Link to="/contact" className="hidden sm:block px-6 py-2 bg-accent text-white font-bold rounded-full text-sm hover:scale-105 transition-transform shadow-lg shadow-accent/20">
                            Free Audit &rarr;
                        </Link>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden w-10 h-10 flex items-center justify-center text-[var(--foreground)]"
                        >
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                ref={menuRef}
                className="fixed inset-0 z-[150] bg-[var(--background)] flex flex-col items-center justify-center pointer-events-none transition-colors duration-500"
                style={{ clipPath: 'circle(0% at 100% 0%)', pointerEvents: isMenuOpen ? 'auto' : 'none' }}
            >
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-10 right-10 text-[var(--secondary)] hover:text-accent transition-colors"
                >
                    <X size={32} />
                </button>

                <div className="flex flex-col items-center gap-6 w-full max-w-md px-6 overflow-y-auto max-h-[80vh] pb-24">
                    {navLinks.map((link) => {
                        if (link.isMegaMenu) {
                            return (
                                <div key={link.name} className="w-full flex flex-col items-center">
                                    <button 
                                        className={`menu-link flex items-center gap-2 text-3xl md:text-4xl font-display font-medium transition-colors ${isMobileSolutionsOpen ? 'text-accent' : 'text-[var(--foreground)] hover:text-accent'}`}
                                        onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                                    >
                                        {link.name} 
                                        {isMobileSolutionsOpen ? <ChevronUp className="w-8 h-8" /> : <ChevronDown className="w-8 h-8" />}
                                    </button>
                                    
                                    {/* Mobile Accordion Content */}
                                    <div className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${isMobileSolutionsOpen ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
                                        <div className="flex flex-col gap-6 w-full items-center">
                                            {megaMenuColumns.map((col, i) => (
                                                <div key={i} className="flex flex-col items-center w-full">
                                                    <div className="text-accent font-bold uppercase tracking-[1.5px] text-xs mb-4">{col.heading}</div>
                                                    <div className="flex flex-col gap-3 w-full items-center">
                                                        {col.items.map((item, j) => (
                                                            <Link 
                                                                key={j} 
                                                                to={item.route}
                                                                className="text-[var(--foreground)] hover:text-accent text-lg font-medium text-center"
                                                            >
                                                                {item.title}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        if (link.isStackMenu) {
                            return (
                                <div key={link.name} className="w-full flex flex-col items-center">
                                    <button 
                                        className={`menu-link flex items-center gap-2 text-3xl md:text-4xl font-display font-medium transition-colors ${isMobileStackOpen ? 'text-accent' : 'text-[var(--foreground)] hover:text-accent'}`}
                                        onClick={() => setIsMobileStackOpen(!isMobileStackOpen)}
                                    >
                                        {link.name} 
                                        {isMobileStackOpen ? <ChevronUp className="w-8 h-8" /> : <ChevronDown className="w-8 h-8" />}
                                    </button>
                                    
                                    {/* Mobile Accordion Content */}
                                    <div className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${isMobileStackOpen ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
                                        <div className="flex flex-col gap-8 w-full items-center">
                                            <div className="flex flex-col items-center w-full">
                                                <div className="text-[var(--secondary)] font-bold uppercase tracking-[1.5px] text-xs mb-4">Partner With Us</div>
                                                <div className="flex flex-col gap-3 w-full items-center">
                                                    {[
                                                        { title: 'Coupons & Deals', icon: Tag, route: '/stack/coupons' },
                                                        { title: 'Sponsorships', icon: Handshake, route: '#' },
                                                        { title: 'Collaborations', icon: Users, route: '#' },
                                                        { title: 'Resources', icon: FileText, route: '#' },
                                                        { title: 'Affiliate Program', icon: Link2, route: '#' }
                                                    ].map((item, j) => (
                                                        <Link key={j} to={item.route} className="flex items-center justify-center gap-3 w-full px-4 text-[var(--foreground)] hover:text-accent text-lg font-medium text-center">
                                                            <item.icon className="w-5 h-5 text-accent shrink-0" />
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center w-full">
                                                <div className="text-[var(--secondary)] font-bold uppercase tracking-[1.5px] text-xs mb-4">Media & Reach</div>
                                                <div className="flex flex-col gap-3 w-full items-center">
                                                    {[
                                                        { title: 'YouTube Collaborations', icon: Video, route: '#' },
                                                        { title: 'TikTok Features', icon: Smartphone, route: '#' },
                                                        { title: 'Site Sponsorship', icon: Monitor, route: '#' },
                                                        { title: 'Newsletter Features', icon: Mail, route: '#' },
                                                        { title: 'Podcast & Interviews', icon: Mic, route: '#' }
                                                    ].map((item, j) => (
                                                        <Link key={j} to={item.route} className="flex items-center justify-center gap-3 w-full px-4 text-[var(--foreground)] hover:text-accent text-lg font-medium text-center">
                                                            <item.icon className="w-5 h-5 text-accent shrink-0" />
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center mt-2 border-t border-[var(--border)] pt-6 w-full px-6">
                                                <span className="text-sm text-[var(--secondary)] mb-3 text-center">Want to partner with MalikLogix?</span>
                                                <Link to="/stack/media-kit" className="text-accent font-bold text-lg hover:text-accent/80 transition-colors">View Media Kit &rarr;</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        if (link.dropdownItems) {
                            return (
                                <div key={link.name} className="w-full flex flex-col items-center">
                                    <button 
                                        className={`menu-link flex items-center gap-2 text-3xl md:text-4xl font-display font-medium transition-colors ${isMobileLearnOpen ? 'text-accent' : 'text-[var(--foreground)] hover:text-accent'}`}
                                        onClick={() => setIsMobileLearnOpen(!isMobileLearnOpen)}
                                    >
                                        {link.name} 
                                        {isMobileLearnOpen ? <ChevronUp className="w-8 h-8" /> : <ChevronDown className="w-8 h-8" />}
                                    </button>
                                    
                                    {/* Mobile Accordion Content */}
                                    <div className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${isMobileLearnOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                                        <div className="flex flex-col gap-3 w-full items-center">
                                            {link.dropdownItems.map((item, j) => (
                                                <Link 
                                                    key={j} 
                                                    to={item.href}
                                                    className="text-[var(--foreground)] hover:text-accent text-lg font-medium text-center"
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        return (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`menu-link text-3xl md:text-4xl font-display font-medium hover:text-accent transition-colors ${location.pathname === link.href ? 'text-accent' : 'text-[var(--foreground)]'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="menu-link mt-8 px-10 py-4 bg-accent text-white font-bold rounded-full text-xl shadow-lg shadow-accent/20">
                        Free Audit &rarr;
                    </Link>
                </div>

                {/* Status in Mobile Menu */}
                <div className="absolute bottom-10 flex items-center gap-3">
                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <span className="font-mono text-xs text-[var(--secondary)] uppercase tracking-widest">Global Systems Active</span>
                </div>
            </div>
        </>
    );
};

export default Navbar;
