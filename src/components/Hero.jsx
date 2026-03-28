import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';
import { Cpu, ShoppingCart, Store, FileSpreadsheet, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimationCircle from './AnimationCircle';




const NeuralNetwork = () => {
    const pointsRef = useRef();
    const { theme } = useTheme();

    const count = 2500;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 12;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
        }
        return pos;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (pointsRef.current) {
            pointsRef.current.rotation.y = time * 0.04;
            pointsRef.current.rotation.x = Math.sin(time * 0.06) * 0.1;

            const s = 1 + Math.sin(time * 0.4) * 0.04;
            pointsRef.current.scale.set(s, s, s);
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 6]}>
            <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color={theme === 'dark' ? "#06B6D4" : "#0891B2"}
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={theme === 'dark' ? THREE.AdditiveBlending : THREE.SubtractiveBlending}
                    opacity={theme === 'dark' ? 0.7 : 0.3}
                />
            </Points>
        </group>
    );
};

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
                duration: 1.2,
                stagger: 0.1,
                ease: 'power4.out',
                delay: 0.2
            });

            gsap.from([subTitleRef.current, ctaRef.current], {
                opacity: 0,
                y: 20,
                duration: 1,
                stagger: 0.2,
                delay: 0.8,
                ease: 'power3.out',
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

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

    return (
        <section ref={containerRef} className="relative min-h-[90vh] w-full px-8 lg:px-20 overflow-hidden bg-[var(--background)] pt-32 pb-20 transition-colors duration-500 flex items-center">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
                    <ambientLight intensity={0.5} />
                    <NeuralNetwork />
                </Canvas>
            </div>

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
                            onMouseMove={handleMagnetic}
                            onMouseLeave={resetMagnetic}
                            className="magnetic-btn px-5 py-3 md:px-8 md:py-4 bg-accent text-white text-sm md:text-base font-bold rounded-lg hover:brightness-110 transition-all shadow-lg shadow-accent/20 flex items-center justify-center"
                        >
                            Get Your Free Automation Audit &rarr;
                        </Link>


                        <Link
                            to="/philosophy"
                            onMouseMove={handleMagnetic}
                            onMouseLeave={resetMagnetic}
                            className="magnetic-btn px-8 py-4 bg-[var(--foreground)]/[0.05] border border-[var(--border)] text-[var(--foreground)] font-bold rounded-lg hover:bg-[var(--foreground)]/[0.1] transition-all shadow-lg whitespace-nowrap flex items-center justify-center"
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
