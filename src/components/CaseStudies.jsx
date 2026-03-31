import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const CaseStudies = () => {
    const cases = [
        {
            client: "Shopify Plus Partner",
            challenge: "Uploading 500+ products with unique descriptions took up to 3 weeks.",
            result: "4 Hours",
            metric: "for 800 Product Uploads",
            tags: ["Shopify", "AI Generation"]
        },
        {
            client: "Amazon FBA Seller",
            challenge: "Manual PO processing causing delays and taking full 2 days.",
            result: "11 Mins",
            metric: "Complete PO Processing",
            tags: ["Amazon", "Inventory Management"]
        },
        {
            client: "Home Goods Retailer",
            challenge: "Manually building Excel profit trackers for Shopify took 22 hrs/week.",
            result: "22 Hrs",
            metric: "Saved Per Week via Auto-Sync",
            tags: ["Excel", "Shopify API"]
        },
        {
            client: "Logistics Company",
            challenge: "3 full-time roles dedicated completely to manual data entry.",
            result: "0 Errors",
            metric: "3 Roles Replaced by RPA Bot",
            tags: ["RPA", "Data Entry"]
        }
    ];

    return (
        <section className="py-16 px-8 lg:px-20 bg-[var(--background)] transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-4">Case Studies</h2>
                        <h3 className="text-4xl md:text-6xl font-display font-bold text-[var(--foreground)]">Proof in the <span className="text-accent underline decoration-accent/20 underline-offset-8">Data</span></h3>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {cases.map((item, i) => (
                        <div key={i} className="group relative bg-[var(--foreground)]/[0.03] border border-[var(--border)] rounded-[3rem] overflow-hidden hover:border-accent/40 transition-all duration-700 hover:shadow-2xl">
                            <div className="p-10 md:p-14">
                                <div className="flex justify-between items-start mb-12">
                                    <div className="space-y-4">
                                        <h4 className="text-3xl font-display font-bold text-[var(--foreground)]">{item.client}</h4>
                                        <div className="flex gap-2">
                                            {item.tags.map(tag => (
                                                <span key={tag} className="text-[10px] font-mono text-accent uppercase tracking-widest border border-accent/20 px-2 py-1 rounded-md bg-accent/5">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-500 hover:rotate-45">
                                        <ArrowUpRight size={24} />
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <p className="text-[10px] font-mono text-accent uppercase tracking-[0.2em] mb-3 font-bold">The Challenge</p>
                                        <p className="text-lg text-[var(--foreground)]/70 font-body leading-relaxed">{item.challenge}</p>
                                    </div>
                                    <div className="pt-8 border-t border-[var(--border)] flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] font-mono text-accent uppercase tracking-[0.2em] mb-2 font-bold">The Result</p>
                                            <div className="text-5xl font-display font-bold text-accent tracking-tighter">{item.result}</div>
                                        </div>
                                        <div className="text-right max-w-[150px]">
                                            <p className="text-sm font-body text-[var(--secondary)] leading-tight font-medium">{item.metric}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CaseStudies;
