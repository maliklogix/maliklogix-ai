import mysql from 'mysql2/promise';

const DB_URL = 'mysql://u373901266_maliklogix:Maliklog786555@srv1562.hstgr.io:3306/u373901266_maliklogix';

const services = [
    // AI Marketing
    { slug: 'ai-campaign-management', title: 'AI Campaign Management', group: 'AI Marketing' },
    { slug: 'ai-ad-targeting', title: 'AI Ad Targeting', group: 'AI Marketing' },
    { slug: 'conversion-optimization', title: 'Conversion Optimization', group: 'AI Marketing' },
    { slug: 'lead-generation-ai', title: 'Lead Generation AI', group: 'AI Marketing' },
    { slug: 'email-marketing-ai', title: 'Email Marketing AI', group: 'AI Marketing' },
    { slug: 'shopify-ai', title: 'Shopify AI Automation', group: 'AI Marketing' },

    // SEO & Content
    { slug: 'geo-ai-search', title: 'GEO & AI Search', group: 'SEO & Content' },
    { slug: 'seo-strategy', title: 'AI SEO Strategy', group: 'SEO & Content' },
    { slug: 'keyword-clustering', title: 'Keyword Clustering', group: 'SEO & Content' },
    { slug: 'blog-writing', title: 'AI Blog Writing', group: 'SEO & Content' },
    { slug: 'content-tracking', title: 'Content Tracking', group: 'SEO & Content' },
    { slug: 'ai-content-creation', title: 'AI Content Creation', group: 'SEO & Content' },

    // Automation & Tools
    { slug: 'n8n-automation', title: 'n8n Automation', group: 'Automation & Tools' },
    { slug: 'make-integrations', title: 'Make.com Integrations', group: 'Automation & Tools' },
    { slug: 'crm-automation', title: 'CRM Automation', group: 'Automation & Tools' },
    { slug: 'ai-chatbots', title: 'AI Chatbots', group: 'Automation & Tools' },
    { slug: 'api-dashboards', title: 'API Dashboards', group: 'Automation & Tools' },
    { slug: 'funnel-automation', title: 'Funnel Automation', group: 'Automation & Tools' },
];

async function seed() {
    const connection = await mysql.createConnection(DB_URL);
    console.log('Connected for seeding');

    for (const s of services) {
        const benefits = [
            "Reduce operational costs by 40%",
            "Scale results without adding headcount",
            "Real-time performance monitoring",
            "Custom AI models trained on your data"
        ];
        const steps = [
            { title: "Audit & Analysis", body: "We analyze your current processes and data." },
            { title: "AI Integration", body: "We connect our AI layer to your existing tools." },
            { title: "Continuous Optimization", body: "The system learns and improves every week." }
        ];
        const stats = [
            { number: "35%", label: "Average Efficiency Gain" },
            { number: "2.5x", label: "Better ROAS / Results" },
            { number: "0 hrs", label: "Manual maintenance" }
        ];

        try {
            await connection.query(
                "INSERT INTO services (slug, title, group_name, subtitle, hero_description, benefits, steps, stats, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title=VALUES(title), group_name=VALUES(group_name)",
                [
                    s.slug, 
                    s.title, 
                    s.group, 
                    "AI-Powered systems that drive results.", 
                    "We build custom AI loops that automate your marketing and operations.",
                    JSON.stringify(benefits),
                    JSON.stringify(steps),
                    JSON.stringify(stats),
                    'published'
                ]
            );
            console.log(`Seeded: ${s.slug}`);
        } catch (err) {
            console.error(`Error seeding ${s.slug}:`, err);
        }
    }

    await connection.end();
}

seed();
