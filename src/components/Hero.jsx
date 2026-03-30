import React, { useRef, useMemo } from 'react';
// Three.js background disabled for performance
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';
import { Cpu, ShoppingCart, Store, FileSpreadsheet, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimationCircle from './AnimationCircle';


// NeuralNetwork component removed for performance optimization
const Hero = () => {
    const containerRef = useRef(null);
    const labelRef = useRef(null);
    const titleRef = useRef(null);
    const subTitleRef = useRef(null);
    const ctaRef = useRef(null);
    const statsRef = useRef(null);

    React.useEffect(() => {
        const ctx = gsap.context(() => {
            const titleLines = titleRef.current.querySelectorAll('.line-inner');
            const statItems = statsRef.current ? statsRef.current.children : [];

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
                duration: 0.8,
                stagger: 0.1,
                ease: 'power4.out',
                delay: 0.1
            });

            gsap.from([subTitleRef.current, ctaRef.current], {
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.1,
                delay: 0.3,
                ease: 'power3.out',
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const xTo = useRef(null);
    const yTo = useRef(null);
    const boundsRef = useRef(null);

    const initMagnetic = (e) => {
        boundsRef.current = e.currentTarget.getBoundingClientRect();
        if (!xTo.current || !yTo.current) {
            xTo.current = gsap.quickTo(e.currentTarget, "x", { duration: 0.4, ease: "power2.out" });
            yTo.current = gsap.quickTo(e.currentTarget, "y", { duration: 0.4, ease: "power2.out" });
        }
    };

    const handleMagnetic = (e) => {
        if (!boundsRef.current) return;
        const rect = boundsRef.current;
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        xTo.current(x * 0.3);
        yTo.current(y * 0.3);
    };

    const resetMagnetic = (e) => {
        boundsRef.current = null;
        if (xTo.current && yTo.current) {
            xTo.current(0);
            yTo.current(0);
        }
        gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    };

    return (
        <section ref={containerRef} className="relative min-h-[90vh] w-full px-8 lg:px-20 overflow-hidden bg-[var(--background)] pt-32 pb-20 transition-colors duration-500 flex items-center">
            {/* 3D background wrapper removed for performance */}

            <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-32 relative z-10">
                <div className="max-w-2xl text-left">
                    <div ref={labelRef} className="flex items-center gap-4 mb-6">
                        <div className="h-px w-8 bg-accent" />
                        <span className="text-sm font-mono text-accent uppercase tracking-widest font-bold">AI Automation Digital Agency</span>
                    </div>
                    <h1 ref={titleRef} className="text-5xl md:text-6xl lg:text-7xl mb-8 flex flex-col gap-2 font-display font-bold tracking-tight">
                        <span className="line overflow-hidden block pb-2">
                            <span className="line-inner block text-[var(--foreground)]">We Build AI</span>
                        </span>
                        <span className="line overflow-hidden block">
                            <span className="line-inner block text-accent">Automation Systems</span>
                        </span>
                    </h1>

                    <p ref={subTitleRef} className="text-lg md:text-xl text-[var(--secondary)] max-w-xl mb-12 leading-relaxed font-body">
                        We combine <span className="text-[var(--foreground)] font-bold">Shopify, Amazon, RPA, and Excel</span>.
                        Stop guessing—leverage an intelligence stack that automates your most time-consuming workflows — so your team focuses on growth.
                    </p>

                    <div ref={ctaRef} className="flex flex-wrap gap-6 items-center">
                        <Link
                            to="/contact"
                            onMouseEnter={initMagnetic}
                            onMouseMove={handleMagnetic}
                            onMouseLeave={resetMagnetic}
                            className="magnetic-btn px-5 py-3 md:px-8 md:py-4 bg-accent text-[var(--background)] text-xs sm:text-sm md:text-base font-bold rounded-lg hover:brightness-110 transition-all shadow-lg shadow-accent/20 flex items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--background)] leading-tight"
                        >
                            Get Your Free Automation Audit &rarr;
                        </Link>


                        <Link
                            to="/philosophy"
                            onMouseEnter={initMagnetic}
                            onMouseMove={handleMagnetic}
                            onMouseLeave={resetMagnetic}
                            className="magnetic-btn px-6 py-3 md:px-8 md:py-4 bg-[var(--foreground)]/[0.05] border border-[var(--border)] text-[var(--foreground)] text-xs sm:text-sm md:text-base font-bold rounded-lg hover:bg-[var(--foreground)]/[0.1] transition-all shadow-lg whitespace-nowrap flex items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--foreground)]/20 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--background)]"
                        >
                            See Our Work
                        </Link>
                    </div>
                </div>

                {/* Diagram shifted shifted 40px left from previous position */}
                <div className="flex-1 flex justify-end lg:translate-x-2">
                    <AnimationCircle />
                </div>
            </div>
        </section>
    );
};

export default Hero;
