import React from 'react';
import { Check, X } from 'lucide-react';

const Comparison = () => {
    const rows = [
        { feature: "Data Processing", ai: "Real-time AI Processing", trad: "Manual Excel Sheets", inhouse: "Basic Macros" },
        { feature: "Workflow Execution", ai: "Autonomous 24/7 Bots", trad: "Human Grunt Work", inhouse: "Ad-hoc Scripts" },
        { feature: "Error Rate", ai: "Near Zero (0.1%)", trad: "High Human Error", inhouse: "Moderate Bug Rate" },
        { feature: "Platform Sync", ai: "Instant API Webhooks", trad: "Daily CSV Exports", inhouse: "Fragile Zapier Flows" },
        { feature: "Growth Velocity", ai: "Exponential & Scalable", trad: "Linear & Talent-Capped", inhouse: "Stable & Maintenance" }
    ];

    return (
        <section className="py-16 px-8 lg:px-20 bg-[var(--background)] transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                <div className="text-left mb-16">
                    <h2 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-4">The Comparison</h2>
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-[var(--foreground)]">Traditional Agency vs. <br /><span className="text-accent underline decoration-accent/10 underline-offset-4">MalikLogix</span></h3>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-[var(--border)] shadow-2xl">
                    <table className="w-full border-collapse bg-[var(--foreground)]/[0.01]">
                        <thead>
                            <tr className="bg-[var(--foreground)]/[0.05] border-b border-[var(--border)]">
                                <th className="p-8 text-left font-mono text-xs uppercase tracking-widest text-[var(--secondary)]">Benchmark</th>
                                <th className="p-8 text-left font-display font-bold text-accent bg-accent/5">MalikLogix</th>
                                <th className="p-8 text-left font-mono text-xs uppercase tracking-widest text-[var(--secondary)]">Old Agency Model</th>
                                <th className="p-8 text-left font-mono text-xs uppercase tracking-widest text-[var(--secondary)]">In-House Teams</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)] font-body">
                            {rows.map((row, i) => (
                                <tr key={i} className="hover:bg-accent/[0.01] transition-colors group">
                                    <td className="p-8 text-[var(--foreground)] font-bold text-lg">{row.feature}</td>
                                    <td className="p-8 text-accent font-bold bg-accent/[0.02] text-lg">{row.ai}</td>
                                    <td className="p-8 text-[var(--secondary)] text-md">{row.trad}</td>
                                    <td className="p-8 text-[var(--secondary)] text-md">{row.inhouse}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Comparison;
