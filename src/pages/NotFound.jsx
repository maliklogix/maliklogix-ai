import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { AlertCircle, Home, ArrowRight, RotateCcw } from 'lucide-react';

const NeuralNetwork = () => {
    const pointsRef = useRef();
    const count = 2000;
    const positions = React.useMemo(() => {
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
            pointsRef.current.rotation.y = time * 0.05;
            pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.1;
        }
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#06B6D4"
                size={0.012}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.3}
            />
        </Points>
    );
};

export default function NotFound() {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(3);
    const containerRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/');
                }
                return prev - 1;
            });
        }, 1000);

        const ctx = gsap.context(() => {
            gsap.from('.notfound-content > *', {
                y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out'
            });
            gsap.to('.notfound-404', {
                y: -10, duration: 2, repeat: -1, yoyo: true, ease: 'power1.inOut'
            });
        }, containerRef);

        return () => {
            clearInterval(timer);
            ctx.revert();
        };
    }, [navigate]);

    return (
        <div ref={containerRef} className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center relative overflow-hidden px-6 pt-20">
            
            {/* ── Neural Background ── */}
            <div className="fixed inset-0 pointer-events-none opacity-40 z-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                    <NeuralNetwork />
                </Canvas>
            </div>

            <div className="notfound-content relative z-10 text-center max-w-2xl px-4 py-12 rounded-[3rem] bg-[var(--card-bg)]/30 backdrop-blur-3xl border border-accent/20 shadow-2xl">
                
                <div className="mb-8 flex justify-center">
                    <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center text-accent shadow-xl shadow-accent/10 border border-accent/20 animate-pulse">
                        <AlertCircle className="w-10 h-10" />
                    </div>
                </div>

                <div className="notfound-404 text-[8rem] md:text-[12rem] font-display font-bold leading-none tracking-tighter text-accent opacity-20 select-none mb-4">
                    404
                </div>

                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                    Quantum Data Layer <br />
                    <span className="text-accent underline decoration-accent/20 underline-offset-8">Not Found.</span>
                </h1>

                <p className="text-[var(--secondary)] text-lg md:text-xl leading-relaxed mb-12 max-w-lg mx-auto">
                    The intelligence node you requested does not exist or has been shifted in our autonomous network.
                </p>

                {/* Timer Indicator */}
                <div className="mb-12">
                    <div className="flex items-center justify-center gap-3 text-accent font-mono text-sm tracking-widest uppercase mb-4">
                        <RotateCcw className="w-4 h-4 animate-spin-slow" />
                        <span>Autonomous Redirection in {timeLeft}s</span>
                    </div>
                    <div className="w-48 h-1 bg-[var(--background)] mx-auto rounded-full overflow-hidden border border-[var(--border)]">
                        <div 
                            className="h-full bg-accent transition-all duration-1000 ease-linear shadow-[0_0_10px_#06B6D4]" 
                            style={{ width: `${(timeLeft / 3) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                        to="/" 
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-accent text-white font-bold rounded-2xl text-lg hover:scale-105 transition-transform shadow-xl shadow-accent/40"
                    >
                        Return Home
                        <Home size={22} />
                    </Link>
                    <button 
                        onClick={() => window.location.reload()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] font-bold rounded-2xl text-lg hover:border-accent/40 transition-all"
                    >
                        Try Again
                        <ArrowRight size={22} className="rotate-90 sm:rotate-0" />
                    </button>
                </div>
            </div>

            {/* Ambient glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        </div>
    );
}
