import React from 'react';
import { ShoppingCart, Store, FileSpreadsheet, Bot, Workflow } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: <ShoppingCart className="w-8 h-8" />,
            title: "Shopify Automation",
            desc: "Bulk product upload, inventory sync, pricing engine, and abandoned cart workflows."
        },
        {
            icon: <Store className="w-8 h-8" />,
            title: "Amazon Automation",
            desc: "AI listing creation, reorder triggers, review requests, and FBA profit tracking."
        },
        {
            icon: <FileSpreadsheet className="w-8 h-8" />,
            title: "Excel & Data",
            desc: "Clean, validate & transform data, auto-generate reports, and build live dashboards."
        },
        {
            icon: <Bot className="w-8 h-8" />,
            title: "Custom RPA",
            desc: "Browser automation, invoice processing, lead scraping, and zero-touch cross-platform workflows."
        },
        {
            icon: <Workflow className="w-8 h-8" />,
            title: "Workflow Integrations",
            desc: "Zapier/Make workflows, REST APIs, Notion sync, Slack bots, and auto-invoice pipelines."
        }
    ];

    return (
        <section className="py-16 px-8 lg:px-20 bg-[var(--background)] transition-colors duration-500 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((item, i) => (
                        <div key={i} className="group p-10 bg-[var(--foreground)]/[0.03] border border-[var(--border)] rounded-[2.5rem] hover:bg-accent/[0.04] hover:border-accent/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm">
                                {item.icon}
                            </div>
                            <h4 className="text-2xl font-display font-bold mb-4 text-[var(--foreground)]">{item.title}</h4>
                            <p className="text-[var(--secondary)] text-lg leading-relaxed font-body">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
};

export default Features;
