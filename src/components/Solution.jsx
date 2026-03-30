import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CircuitDiagram from './CircuitDiagram';


const Solution = () => {
    const sectionRef = useRef(null);
    const diagramRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            const layers = diagramRef.current.querySelectorAll('.layer');
            const lines = diagramRef.current.querySelectorAll('.connector');

            gsap.from(layers, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
                x: -50,
                opacity: 0,
                stagger: 0.3,
                duration: 1,
                ease: 'power3.out',
            });

            gsap.from(lines, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
                scaleX: 0,
                transformOrigin: 'left center',
                stagger: 0.3,
                delay: 0.5,
                duration: 1,
                ease: 'power2.inOut',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-16 px-8 lg:px-20 bg-[var(--background)] overflow-hidden transition-colors duration-500 relative">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">
                <div className="lg:w-1/2">
                    <h2 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-4">The Solution</h2>
                    <h3 className="text-4xl md:text-6xl mb-8 font-display font-bold text-[var(--foreground)] leading-tight">
                        The Intelligence <br />
                        <span className="text-accent underline decoration-accent/20 underline-offset-8">Stack™</span>
                    </h3>
                    <p className="text-[var(--secondary)] text-xl leading-relaxed mb-10 font-body">
                        We don't just "write scripts." We deploy a multi-layered automation environment that bridges the gap between raw data and high-yield execution.
                    </p>
                    <div className="space-y-8">
                        {[
                            { step: "01", text: "Data extraction APIs pulling raw inputs from Shopify, Amazon, and Excel in real-time." },
                            { step: "02", text: "AI-driven cognitive layer processing text, mapping entities, and structuring outputs." },
                            { step: "03", text: "Automated execution layer completing tasks in your CMS, ERP, or CRM with zero manual touch." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 items-start group">
                                <span className="text-accent font-mono font-bold text-sm bg-accent/20 px-3 py-1 rounded-md shadow-sm">{item.step}</span>
                                <p className="text-[var(--foreground)] text-lg leading-relaxed font-body group-hover:text-accent transition-colors duration-300">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div ref={diagramRef} className="lg:w-1/2 relative min-h-[420px]">
                    {/* Circuit diagram as background visual */}
                    <div className="absolute inset-0 opacity-60 pointer-events-none">
                        <CircuitDiagram className="w-full h-full" />
                    </div>

                    <div className="space-y-12 relative z-10">
                        {[
                            { label: "1. Data & Triggers", color: "bg-[var(--card-bg)] border-[var(--border)] text-[var(--foreground)]" },
                            { label: "2. AI Logic Core", color: "bg-accent/20 border-accent/40 text-accent font-bold" },
                            { label: "3. Automated Execution", color: "bg-accent text-[var(--background)] font-bold shadow-2xl shadow-accent/40" }
                        ].map((layer, i) => (
                            <div key={i} className="flex items-center gap-8 group">
                                <div className={`layer px-10 py-8 rounded-[2rem] border ${layer.color} min-w-[320px] text-center shadow-xl backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-2`}>
                                    <span className="text-xl font-display uppercase tracking-widest">{layer.label}</span>
                                </div>
                                {i < 2 && (
                                    <div className="connector h-[3.5px] w-12 bg-accent/40 hidden md:block rounded-full" />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Background Accent Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
                </div>
            </div>

            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        </section>

    );
};

export default Solution;
