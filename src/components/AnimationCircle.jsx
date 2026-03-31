import React from 'react';
import { Cpu, ShoppingCart, Store, FileSpreadsheet, Workflow } from 'lucide-react';

const AnimationCircle = () => {
    return (
        <div className="relative w-72 h-72 lg:w-96 lg:h-96 flex-shrink-0 flex items-center justify-center">
            <style>
                {`
                    @keyframes spin-slow { 100% { transform: rotate(360deg); } }
                    @keyframes spin-slow-reverse { 100% { transform: rotate(-360deg); } }
                    .spin-container { 
                        animation: spin-slow 20s linear infinite; 
                        will-change: transform;
                    }
                    .spin-icon { 
                        animation: spin-slow-reverse 20s linear infinite; 
                        will-change: transform;
                    }
                `}
            </style>

            {/* Center Core */}
            <div className="absolute flex flex-col items-center gap-2 z-20">
                <div className="w-20 h-20 bg-[var(--card-bg)] border border-accent/40 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-transform hover:scale-110">
                    <Cpu className="text-accent w-10 h-10 animate-pulse" />
                </div>
                <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-[0.2em] bg-[var(--card-bg)]/80 px-2 py-0.5 rounded border border-accent/20">AI CORE</span>
            </div>

            {/* Orbiting Ring 1 */}
            <div className="absolute w-full h-full border border-[var(--border)] rounded-full spin-container" />
            {/* Orbiting Ring 2 */}
            <div className="absolute w-[130%] h-[130%] border border-[var(--border)] border-dashed rounded-full spin-icon opacity-40" />

            {/* Orbiting Icons */}
            <div className="absolute w-full h-full spin-container">
                {/* Top Node */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                    <div className="bg-[var(--card-bg)] shadow-xl p-3 rounded-full border border-accent/40 flex items-center justify-center spin-icon">
                        <ShoppingCart className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className="spin-icon text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-[var(--card-bg)]/90 px-2 py-0.5 rounded border border-cyan-400/20">Commerce</span>
                </div>

                {/* Bottom Node */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center gap-2">
                    <span className="spin-icon text-[9px] font-mono font-bold text-purple-400 uppercase tracking-widest bg-[var(--card-bg)]/90 px-2 py-0.5 rounded border border-purple-400/20">Retail</span>
                    <div className="bg-[var(--card-bg)] shadow-xl p-3 rounded-full border border-purple-500/40 flex items-center justify-center spin-icon">
                        <Store className="w-6 h-6 text-purple-400" />
                    </div>
                </div>

                {/* Left Node */}
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="spin-icon text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-[var(--card-bg)]/90 px-2 py-0.5 rounded border border-emerald-400/20">Data</span>
                    <div className="bg-[var(--card-bg)] shadow-xl p-3 rounded-full border border-emerald-500/40 flex items-center justify-center spin-icon">
                        <FileSpreadsheet className="w-6 h-6 text-emerald-400" />
                    </div>
                </div>

                {/* Right Node */}
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
                    <div className="bg-[var(--card-bg)] shadow-xl p-3 rounded-full border border-amber-500/40 flex items-center justify-center spin-icon">
                        <Workflow className="w-6 h-6 text-amber-400" />
                    </div>
                    <span className="spin-icon text-[9px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-[var(--card-bg)]/90 px-2 py-0.5 rounded border border-amber-400/20">Automation</span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(AnimationCircle);
