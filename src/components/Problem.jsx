import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Upload, ClipboardList, RefreshCw, FileSpreadsheet, Package } from 'lucide-react';

const Problem = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(cardsRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: 60,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const problems = [
        {
            icon: <Upload className="w-10 h-10" />,
            title: "Product Uploads",
            desc: "Uploading 500+ products one by one, writing descriptions manually."
        },
        {
            icon: <ClipboardList className="w-10 h-10" />,
            title: "Order Transfer",
            desc: "Copy-pasting orders into spreadsheets causing endless data entry errors."
        },
        {
            icon: <RefreshCw className="w-10 h-10" />,
            title: "Price Sychronization",
            desc: "Manually updating prices across platforms and tracking changes."
        },
        {
            icon: <FileSpreadsheet className="w-10 h-10" />,
            title: "Reporting",
            desc: "Building Excel reports every Monday morning taking hours of valuable time."
        },
        {
            icon: <Package className="w-10 h-10" />,
            title: "Inventory Tracking",
            desc: "Tracking Amazon inventory in your head and missing restock dates."
        }
    ];

    return (
        <section ref={sectionRef} className="py-16 px-8 lg:px-20 bg-[var(--background)] transition-colors duration-500 border-t border-[var(--border)]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="max-w-3xl">
                        <h2 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-4">The Friction</h2>
                        <h3 className="text-4xl md:text-6xl font-display font-bold text-[var(--foreground)] leading-tight mb-6">
                            Still Doing This <span className="text-accent">Manually?</span>
                        </h3>
                        <p className="text-[var(--secondary)] text-xl leading-relaxed font-body">
                            If your team is spending hours copy-pasting data, managing spreadsheets, or clicking through repetitive software interfaces, you are burning cash on tasks a machine can do instantly. We eliminate these manual bottlenecks so you can scale without hiring more headcount.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {problems.map((item, i) => (
                        <div
                            key={i}
                            ref={el => cardsRef.current[i] = el}
                            className="p-10 border border-[var(--border)] bg-[var(--foreground)]/[0.02] rounded-[2.5rem] group hover:border-accent/40 transition-all duration-500 hover:shadow-xl"
                        >
                            <div className="mb-8 w-16 h-16 bg-accent/5 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 origin-left">
                                {item.icon}
                            </div>
                            <h4 className="text-2xl mb-4 font-display font-bold text-[var(--foreground)]">{item.title}</h4>
                            <p className="text-[var(--secondary)] text-lg leading-relaxed font-body">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Problem;
