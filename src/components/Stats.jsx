import React from 'react';

const Stats = () => {
    const stats = [
        { value: '3,200+', label: 'Hours Saved' },
        { value: '47', label: 'Clients Automated' },
        { value: '99.2%', label: 'Process Accuracy' },
        { value: '12', label: 'Platforms Connected' }
    ];

    return (
        <section className="py-16 bg-[var(--background)] border-y border-[var(--border)] transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-8 lg:px-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-left">
                    {stats.map((stat, i) => (
                        <div key={i} className="space-y-3 group">
                            <div className="text-5xl md:text-6xl font-display font-bold text-accent tracking-tighter group-hover:scale-110 transition-transform duration-500">
                                {stat.value}
                            </div>
                            <div className="text-[10px] md:text-xs font-mono text-[var(--secondary)] uppercase tracking-[0.3em] font-bold">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
