import React from 'react';
import {
    Target, Link, TrendingUp, Megaphone, Repeat, Mail,
    Search, Bot, Edit3, Edit, FolderTree, BarChart2,
    Zap, Wrench, MessageSquare, ShoppingCart, Users, LayoutDashboard,
    Brain, Cpu, FolderOpen, Puzzle, Upload, List
} from 'lucide-react';

export const megaMenuColumns = [
    {
        heading: 'AI MARKETING',
        items: [
            { icon: Target, title: 'AI Campaign Management', description: 'Campaigns that learn and optimize weekly', route: '/services/ai-campaign-management' },
            { icon: Link, title: 'Lead Generation AI', description: 'Capture and qualify leads automatically', route: '/services/lead-generation-ai' },
            { icon: TrendingUp, title: 'Conversion Optimization', description: 'Turn visitors into paying clients with AI', route: '/services/conversion-optimization' },
            { icon: Megaphone, title: 'AI Ad Targeting', description: 'Precision ad delivery across platforms', route: '/services/ai-ad-targeting' },
            { icon: Repeat, title: 'Funnel Automation', description: 'End-to-end sales funnel on autopilot', route: '/services/funnel-automation' },
            { icon: Mail, title: 'Email Marketing AI', description: 'Smart sequences that close deals', route: '/services/email-marketing-ai' },
        ]
    },
    {
        heading: 'SEO & CONTENT',
        items: [
            { icon: Search, title: 'SEO Strategy & Audits', description: 'Deep keyword research and gap analysis', route: '/services/seo-strategy' },
            { icon: Bot, title: 'GEO — AI Search Optimization', description: 'Rank inside ChatGPT and AI Overviews', route: '/services/geo-ai-search' },
            { icon: Edit3, title: 'AI Content Creation', description: 'High-velocity on-brand content at scale', route: '/services/ai-content-creation' },
            { icon: Edit, title: 'Blog & Article Writing', description: 'Authority content that drives organic traffic', route: '/services/blog-writing' },
            { icon: FolderTree, title: 'Keyword Clustering', description: 'Group intent-based keyword maps', route: '/services/keyword-clustering' },
            { icon: BarChart2, title: 'Content Performance Tracking', description: 'Weekly KPIs on what content converts', route: '/services/content-tracking' },
        ]
    },
    {
        heading: 'AUTOMATION & TOOLS',
        items: [
            { icon: Zap, title: 'n8n Workflow Automation', description: 'Build complex multi-step AI workflows', route: '/services/n8n-automation' },
            { icon: Wrench, title: 'Make.com Integrations', description: 'Visual automation across 1000+ apps', route: '/services/make-integrations' },
            { icon: MessageSquare, title: 'AI Chatbot Development', description: '24/7 chat trained on your business', route: '/services/ai-chatbots' },
            { icon: ShoppingCart, title: 'Shopify AI Systems', description: 'Upsell flows and AOV optimization', route: '/services/shopify-ai' },
            { icon: Users, title: 'CRM Automation', description: 'Auto-qualify, score, and route leads', route: '/services/crm-automation' },
            { icon: LayoutDashboard, title: 'Custom API Dashboards', description: 'Connect any tool to a live data view', route: '/services/api-dashboards' },
        ]
    },
    {
        heading: 'OPENCLAW PLATFORM',
        items: [
            { icon: Brain, title: 'OpenClaw SkillHub', description: 'Browse and install AI agent skills', route: '/tools/openclaw/skillhub' },
            { icon: Cpu, title: 'Automation Skills Library', description: 'Pre-built skills for n8n and Make', route: '/tools/openclaw/automation' },
            { icon: FolderOpen, title: 'AI Skills Directory', description: 'All skills by category and integration', route: '/tools/ai-skills' },
            { icon: Puzzle, title: 'Extensions & Plugins', description: 'Extend Claude and AI agents', route: '/tools/openclaw/extensions' },
            { icon: Upload, title: 'Submit a Skill', description: 'Contribute your own OpenClaw skill', route: '/tools/openclaw/submit' },
            { icon: List, title: 'Browse by Integration', description: 'Skills sorted by tool (Slack, HubSpot…)', route: '/tools/ai-skills?view=integrations' },
        ]
    }
];

export const pageContent = {
    'ai-campaign-management': {
        title: 'AI Campaign Management',
        subtitle: 'Campaigns that learn, adapt, and optimize every single week — without manual intervention.',
        whatItIs: 'We build AI-driven marketing campaigns that continuously analyze performance data, adjust targeting, and reallocate budgets in real time. Instead of weekly agency reports, your campaigns improve themselves. We connect your ad platforms, CRM, and analytics into one AI loop that gets smarter over time.',
        howItWorks: [
            { title: 'Audit & Setup', desc: 'We map your existing campaigns and identify performance gaps and wasted spend.' },
            { title: 'AI Integration', desc: 'We connect your ad accounts to our optimization layer using n8n and custom AI models.' },
            { title: 'Weekly KPI Loop', desc: 'Every week, the system reviews CAC, ROAS, and conversion data and auto-adjusts.' }
        ],
        keyBenefits: [
            'Reduce wasted ad spend by up to 35%',
            'Campaigns improve week-over-week without manual input',
            'Full transparency — live dashboard with every metric',
            'Works across Google, Meta, LinkedIn, and TikTok'
        ],
        whoItsFor: {
            left: [
                'DTC brands spending $5k+/month on ads',
                'SaaS companies with long sales cycles',
                'Agencies managing multiple client ad accounts'
            ],
            right: [
                'Wasted ad spend on poor targeting',
                'High cost per acquisition (CAC)',
                'Hours spent manually adjusting bids'
            ]
        },
        results: [
            '34% reduction in CAC within 60 days',
            '2.8x ROAS improvement in first quarter',
            '0 hours per week of manual optimization'
        ]
    },
    'lead-generation-ai': {
        title: 'Lead Generation AI',
        subtitle: 'Capture, qualify, and route high-intent leads automatically — 24/7.',
        whatItIs: 'Our AI lead generation system identifies your ideal customers online, captures their intent signals, and automatically qualifies them before they ever speak to your team. We build multi-channel funnels powered by AI forms, chatbots, and CRM automation that fill your pipeline while you sleep.',
        howItWorks: [
            { title: 'ICP Definition', desc: 'We define your ideal customer profile and build AI scoring criteria.' },
            { title: 'Funnel Build', desc: 'Landing pages, chatbots, and lead magnets are deployed and connected.' },
            { title: 'Auto-Qualify & Route', desc: 'Leads are scored, tagged, and routed to the right team member instantly.' }
        ],
        keyBenefits: [
            'Cut lead response time from hours to under 15 minutes',
            'Only speak to qualified, high-intent prospects',
            'Automatic follow-up sequences that never drop a lead',
            'CRM sync with HubSpot, Salesforce, or any tool'
        ],
        whoItsFor: {
            left: [
                'B2B companies with a defined sales process',
                'Agencies and consultancies',
                'Any business spending time manually qualifying leads'
            ],
            right: [
                'Low-quality pipeline holding sales back',
                'Slow response times losing deals',
                'Too much time qualifying cold prospects'
            ]
        },
        results: [
            '9-step nurture sequence, zero manual follow-up',
            '3x more qualified meetings booked per month',
            '2 enterprise deals closed that would have been lost'
        ]
    },
    'conversion-optimization': {
        title: 'Conversion Optimization',
        subtitle: 'Turn more of your existing visitors into paying clients using AI-driven testing.',
        whatItIs: 'Getting traffic is only half the battle. We use AI-powered A/B testing, heatmaps, and behavioral analytics to find exactly where visitors drop off and fix it. From landing page copy to checkout flow, every element is tested and optimized with data — not guesswork.',
        howItWorks: [
            { title: 'Audit', desc: 'Full funnel analysis: where are users leaving and why?' },
            { title: 'Hypothesis & Test', desc: 'AI generates and prioritizes test variants based on behavioral data.' },
            { title: 'Scale Winners', desc: 'Winning variants are deployed and the loop continues.' }
        ],
        keyBenefits: [
            'Increase conversion rate without increasing ad spend',
            'Data-backed decisions, not gut feelings',
            'Works on landing pages, product pages, and checkout flows',
            'Integrates with your existing analytics stack'
        ],
        whoItsFor: {
            left: [
                'E-commerce brands with traffic but poor conversion',
                'SaaS companies optimizing free-to-paid conversion',
                'Any business running paid traffic'
            ],
            right: [
                'High bounce rates on landing pages',
                'Abandoned carts and incomplete sign-ups',
                'Traffic that doesn’t turn into revenue'
            ]
        },
        results: [
            '28% increase in Shopify AOV after AI upsell flow',
            '2.1x conversion rate improvement in 90 days',
            'Setup completed in under 2 weeks'
        ]
    },
    'ai-ad-targeting': {
        title: 'AI Ad Targeting',
        subtitle: 'Reach the exact right people at the exact right time — powered by machine learning.',
        whatItIs: 'We build custom audience models using your first-party data, lookalike modeling, and AI-powered intent signals to deliver your ads to people most likely to convert. We manage targeting across Google, Meta, LinkedIn, and programmatic networks with one unified AI layer.',
        howItWorks: [
            { title: 'Data Audit', desc: 'We analyze your existing customer data to build predictive audience models.' },
            { title: 'Targeting Architecture', desc: 'Audiences are segmented by intent, stage, and lifetime value.' },
            { title: 'Continuous Refinement', desc: 'AI updates audiences weekly based on what’s converting.' }
        ],
        keyBenefits: [
            'Reduce wasted impressions by targeting only high-intent audiences',
            'Lookalike modeling finds new customers similar to your best ones',
            'Cross-platform audience sync — one model, all channels',
            'Weekly performance reporting with actionable insights'
        ],
        whoItsFor: {
            left: [
                'Brands with $10k+/month in ad spend',
                'Companies with existing customer data to train models on',
                'Businesses frustrated with platform-native targeting'
            ],
            right: [
                'Ads shown to irrelevant users',
                'Exhausted native platform audiences',
                'Inconsistent ROAS across platforms'
            ]
        },
        results: [
            '47% improvement in audience match rate',
            '3.2x return on ad spend improvement',
            '60% reduction in cost per qualified lead'
        ]
    },
    'funnel-automation': {
        title: 'Funnel Automation',
        subtitle: 'Build a sales funnel that runs itself — from first click to closed deal.',
        whatItIs: 'We design and automate your entire sales funnel using AI workflows, smart email sequences, and real-time lead scoring. Every touchpoint — from ad click to discovery call to onboarding — is mapped, automated, and optimized so your team only spends time on deals that are ready to close.',
        howItWorks: [
            { title: 'Funnel Mapping', desc: 'We document every stage and identify manual bottlenecks.' },
            { title: 'Automation Build', desc: 'n8n or Make.com workflows are built to handle every transition.' },
            { title: 'Optimization Loop', desc: 'Weekly data review identifies and fixes drop-off points.' }
        ],
        keyBenefits: [
            'Zero leads fall through the cracks',
            'Sales team only speaks to warm, qualified prospects',
            'Full funnel visibility in one live dashboard',
            'Works with any CRM or email platform'
        ],
        whoItsFor: {
            left: [
                'SaaS companies with multi-touch sales cycles',
                'Agencies and service businesses',
                'E-commerce brands with complex post-purchase flows'
            ],
            right: [
                'Leads getting lost in transition',
                'Sales teams chasing cold prospects',
                'Manual onboarding and follow-up'
            ]
        },
        results: [
            '9-step nurture fully automated, zero manual steps',
            '40% reduction in time-to-close',
            '2 enterprise deals closed that would have been missed'
        ]
    },
    'email-marketing-ai': {
        title: 'Email Marketing AI',
        subtitle: 'Smart email sequences that nurture, convert, and retain — without lifting a finger.',
        whatItIs: 'We build AI-powered email systems that send the right message to the right person at the right time. Using behavioral triggers, dynamic content, and AI-written copy, your email list becomes a revenue engine that runs automatically — whether you have 500 or 500,000 subscribers.',
        howItWorks: [
            { title: 'List Audit & Segmentation', desc: 'We clean and segment your list by behavior, intent, and lifecycle stage.' },
            { title: 'Sequence Build', desc: 'Welcome flows, nurture sequences, win-back campaigns, and transactional emails.' },
            { title: 'AI Optimization', desc: 'Subject lines, send times, and content are continuously A/B tested by AI.' }
        ],
        keyBenefits: [
            '3–5x higher open rates with AI-personalized subject lines',
            'Behavioral triggers that send emails based on what users do',
            'Automated revenue flows — abandoned cart, upsell, re-engagement',
            'Works with Klaviyo, ActiveCampaign, Mailchimp, or any ESP'
        ],
        whoItsFor: {
            left: [
                'E-commerce brands with an email list',
                'SaaS companies with free trial users to convert',
                'Coaches, consultants, and info-product businesses'
            ],
            right: [
                'Low open and click-through rates',
                'Dead or unresponsive email lists',
                'Time-consuming manual campaign creation'
            ]
        },
        results: [
            'Organic traffic tripled in under 3 months',
            'Email revenue increased 65% with no new subscribers',
            'Zero hours per week of manual email management'
        ]
    },
    'seo-strategy': {
        title: 'SEO Strategy & Audits',
        subtitle: 'Find exactly where your organic growth is hiding — and go get it.',
        whatItIs: 'We run deep technical and content SEO audits that identify exactly why you’re not ranking and what to do about it. From crawl errors and Core Web Vitals to content gaps and backlink opportunities, we build a prioritized action plan that delivers measurable results within 90 days.',
        howItWorks: [
            { title: 'Full Site Audit', desc: 'Technical, on-page, and off-page analysis across every ranking factor.' },
            { title: 'Opportunity Mapping', desc: 'We identify the 20% of fixes that will deliver 80% of the results.' },
            { title: '90-Day Sprint', desc: 'Prioritized implementation with weekly check-ins and live rank tracking.' }
        ],
        keyBenefits: [
            'Clear priority list — no overwhelm, just action',
            'Technical fixes that unlock ranking potential immediately',
            'Content gap analysis showing exactly what pages to build next',
            'Monthly reporting tied directly to revenue impact'
        ],
        whoItsFor: {
            left: [
                'Businesses with an existing site that isn’t ranking',
                'Companies switching from paid to organic traffic',
                'Agencies needing white-label SEO strategy'
            ],
            right: [
                'Stuck on page 2 of search results',
                'Technical website errors holding back growth',
                'Unclear on what content actually matters'
            ]
        },
        results: [
            '47 keyword clusters identified in week one',
            '12 quick-win pages prioritised and published',
            'First-page rankings achieved within 60 days'
        ]
    },
    'geo-ai-search': {
        title: 'GEO — AI Search Optimization',
        subtitle: 'Rank inside ChatGPT, Google AI Overviews, and Perplexity — not just traditional search.',
        whatItIs: 'Generative Engine Optimization (GEO) is the new frontier of search. We optimize your content and authority signals so your brand appears in AI-generated answers across ChatGPT, Google SGE, Perplexity, and Bing Copilot. This is the next evolution of SEO — and most of your competitors haven’t figured it out yet.',
        howItWorks: [
            { title: 'AI Citation Audit', desc: 'We test what AI tools currently say about your brand and industry.' },
            { title: 'Authority Building', desc: 'We create content that AI models are trained to cite as authoritative.' },
            { title: 'Monitoring & Iteration', desc: 'We track AI mentions and optimize for higher citation frequency.' }
        ],
        keyBenefits: [
            'Appear in AI-generated answers before competitors do',
            'Build brand authority that both humans and AI models trust',
            'Future-proof your organic strategy as search evolves',
            'Works alongside traditional SEO, not instead of it'
        ],
        whoItsFor: {
            left: [
                'Brands that want to stay ahead of search evolution',
                'B2B companies where trust and authority drive decisions',
                'Businesses already investing in content and SEO'
            ],
            right: [
                'Missing out on the AI search shift',
                'Brand not recognized by Language Models',
                'Competitors appearing in AI summaries instead of you'
            ]
        },
        results: [
            'Appearing in ChatGPT answers for 12 core keywords',
            'Featured in Google AI Overviews for target terms',
            '3x increase in branded search volume in 90 days'
        ]
    },
    'ai-content-creation': {
        title: 'AI Content Creation',
        subtitle: 'High-velocity, on-brand content at scale — without sacrificing quality.',
        whatItIs: 'We build custom AI content systems trained on your brand voice, target audience, and industry expertise. The result is a content engine that produces blog posts, social content, email copy, landing pages, and more — at 10x the speed of traditional content creation, with quality that reflects your expertise.',
        howItWorks: [
            { title: 'Brand Voice Training', desc: 'We train AI models on your existing content, tone, and style guides.' },
            { title: 'Content Architecture', desc: 'We build a content calendar and topic cluster strategy.' },
            { title: 'Production & QA', desc: 'Content is produced, reviewed, and published on your schedule.' }
        ],
        keyBenefits: [
            '10x content output without hiring more writers',
            'Consistent brand voice across every piece',
            'Built-in SEO optimization for every article',
            'Human review layer ensures quality and accuracy'
        ],
        whoItsFor: {
            left: [
                'Businesses that need consistent content but lack the team',
                'Agencies managing content for multiple clients',
                'Founders who know content matters but have no time'
            ],
            right: [
                'Inconsistent publishing schedule',
                'Low-quality generic AI content output',
                'High costs for freelance copywriters'
            ]
        },
        results: [
            'Organic traffic tripled in under 3 months',
            '30+ pieces of content published per month',
            'Content system set up and running in 2 weeks'
        ]
    },
    'blog-writing': {
        title: 'Blog & Article Writing',
        subtitle: 'Authority content that builds trust, drives organic traffic, and converts readers.',
        whatItIs: 'We produce long-form blog posts and articles that rank in search, establish your expertise, and move readers toward a buying decision. Every piece is researched, SEO-optimized, and written to reflect your brand’s authority — not generic AI fluff.',
        howItWorks: [
            { title: 'Topic Research', desc: 'We identify high-intent topics with real search volume and low competition.' },
            { title: 'Writing & Optimization', desc: 'Every article is written with target keywords, proper structure, and internal linking.' },
            { title: 'Publish & Track', desc: 'We handle publishing and track rankings and traffic for every piece.' }
        ],
        keyBenefits: [
            'Articles that rank on Google and drive consistent traffic',
            'Builds domain authority over time',
            'Converts readers into leads with strategic CTAs',
            'Full editorial calendar managed for you'
        ],
        whoItsFor: {
            left: [
                'Businesses investing in long-term organic growth',
                'SaaS companies building thought leadership',
                'Service businesses needing to educate before selling'
            ],
            right: [
                'Empty or outdated company blog',
                'Traffic that doesn’t match buyer intent',
                'Lack of in-house subject matter expertise'
            ]
        },
        results: [
            '12 blog posts in first month, 8 on page 1 within 90 days',
            '40% of inbound leads now come from organic blog traffic',
            'Newsletter audience grew 3x from blog-driven traffic'
        ]
    },
    'keyword-clustering': {
        title: 'Keyword Clustering',
        subtitle: 'Group search intent into content clusters that dominate entire topic areas.',
        whatItIs: 'Keyword clustering is the strategy of grouping related keywords by search intent to build content that ranks for dozens of related terms — not just one. We use AI tools to build comprehensive keyword maps that tell you exactly what to write, how to structure it, and which pages to build first for maximum impact.',
        howItWorks: [
            { title: 'Seed Keyword Research', desc: 'We start with your core topics and expand into hundreds of related terms.' },
            { title: 'Intent Clustering', desc: 'Keywords are grouped by user intent: informational, navigational, transactional.' },
            { title: 'Content Map Delivery', desc: 'You receive a prioritized spreadsheet of clusters and page recommendations.' }
        ],
        keyBenefits: [
            'Rank for entire topic categories, not just single keywords',
            'Clear content roadmap removes guesswork',
            'Identifies quick-win opportunities with existing content',
            'Foundation for a content strategy that compounds over time'
        ],
        whoItsFor: {
            left: [
                'Businesses starting a content strategy from scratch',
                'Companies with existing content that isn’t ranking',
                'Agencies building SEO strategies for clients'
            ],
            right: [
                'Writing content blindly without data',
                'Keyword cannibalization on existing site',
                'Missing the "long-tail" search opportunities'
            ]
        },
        results: [
            '47 keyword clusters identified in first week',
            '3x increase in organic keyword footprint in 6 months',
            'Quick-win pages ranking within 30 days'
        ]
    },
    'content-tracking': {
        title: 'Content Performance Tracking',
        subtitle: 'Know exactly which content is driving revenue — and scale what works.',
        whatItIs: 'Most businesses have no idea which blog posts or pages actually drive revenue. We build custom content analytics dashboards that track every piece of content from first click to closed deal — connecting Google Analytics, Search Console, and your CRM into one live performance view.',
        howItWorks: [
            { title: 'Analytics Audit', desc: 'We audit your current tracking setup and identify gaps.' },
            { title: 'Dashboard Build', desc: 'A custom live dashboard is built showing rankings, traffic, leads, and revenue by content piece.' },
            { title: 'Weekly Review', desc: 'We review performance every week and recommend what to update or create next.' }
        ],
        keyBenefits: [
            'Know exactly which content generates revenue',
            'Weekly insights delivered without you pulling reports',
            'Connects search data directly to CRM outcomes',
            'Stops wasted content spend on topics that don’t convert'
        ],
        whoItsFor: {
            left: [
                'Businesses investing in content and wanting proof of ROI',
                'Marketing teams reporting to a revenue-focused leadership',
                'Agencies needing client-facing content reporting'
            ],
            right: [
                'No visibility into content ROI',
                'Messy analytics setups',
                'Writing content without knowing what works'
            ]
        },
        results: [
            'Identified top 20% of pages driving 80% of leads',
            'Cut content production waste by 40%',
            'CAC reduced 34% by cutting underperforming channels'
        ]
    },
    'n8n-automation': {
        title: 'n8n Workflow Automation',
        subtitle: 'Build powerful, self-running workflows that replace hours of manual work every week.',
        whatItIs: 'n8n is the most powerful open-source workflow automation tool available. We use it to build custom workflows that connect your apps, automate repetitive tasks, and create intelligent multi-step AI processes. From lead routing to report generation, n8n handles it without code or ongoing maintenance.',
        howItWorks: [
            { title: 'Workflow Audit', desc: 'We map your current manual processes and identify automation opportunities.' },
            { title: 'Build & Test', desc: 'Custom n8n workflows are built, tested, and connected to your existing tools.' },
            { title: 'Deploy & Monitor', desc: 'Workflows go live with monitoring, error alerts, and documentation.' }
        ],
        keyBenefits: [
            'Replace 10–20 hours/week of manual work per employee',
            'Self-hosted option keeps your data private and secure',
            'Connect 400+ apps including Slack, HubSpot, Google Workspace',
            'Scales as your business grows without per-task fees'
        ],
        whoItsFor: {
            left: [
                'Operations teams drowning in manual, repetitive tasks',
                'Agencies automating client reporting and delivery',
                'SaaS companies with complex onboarding workflows'
            ],
            right: [
                'Data entry errors and missed steps',
                'High operational costs for simple tasks',
                'Expensive, rigid proprietary automation tools'
            ]
        },
        results: [
            'Lead response time cut from 4 hours to under 15 minutes',
            '9-step nurture sequence automated end-to-end',
            '2 enterprise deals closed that would have been lost'
        ]
    },
    'make-integrations': {
        title: 'Make.com Integrations',
        subtitle: 'Visual, drag-and-drop automation across 1,000+ apps — built for your exact workflow.',
        whatItIs: 'Make.com (formerly Integromat) is the leading visual automation platform. We design and build Make scenarios that connect your entire tech stack — from your CRM and email platform to AI models and custom APIs. Perfect for businesses that want powerful automation with a visual interface they can understand.',
        howItWorks: [
            { title: 'Stack Mapping', desc: 'We document all the tools you use and identify where data needs to flow between them.' },
            { title: 'Scenario Design', desc: 'Visual workflows are designed and built with error handling and data transformation.' },
            { title: 'Testing & Handover', desc: 'Every scenario is fully tested and documented so your team understands it.' }
        ],
        keyBenefits: [
            'Connect any combination of apps without code',
            'Visual interface makes automation easy to understand and edit',
            'Handles complex data transformation and conditional logic',
            '1,000+ integrations available out of the box'
        ],
        whoItsFor: {
            left: [
                'Businesses using multiple SaaS tools that don’t talk to each other',
                'Teams that want to maintain and edit automations themselves',
                'Companies needing rapid integration between new tools'
            ],
            right: [
                'Siloed data across disconnected apps',
                'Manual copy-pasting between software',
                'Slow execution of cross-platform tasks'
            ]
        },
        results: [
            '15 manual workflows automated in first month',
            'Reporting time reduced from 4 hours to 20 minutes weekly',
            'Zero integration costs for tools that already have Make connectors'
        ]
    },
    'ai-chatbots': {
        title: 'AI Chatbot Development',
        subtitle: 'A 24/7 AI assistant that knows your business, qualifies leads, and never takes a day off.',
        whatItIs: 'We build custom AI chatbots trained on your products, services, FAQs, and brand voice. Unlike generic chat widgets, our chatbots actually understand your business context — they qualify leads, answer complex questions, book meetings, and hand off to your team at exactly the right moment.',
        howItWorks: [
            { title: 'Knowledge Base Build', desc: 'We ingest your docs, FAQs, service pages, and case studies into the AI.' },
            { title: 'Flow Design', desc: 'Conversation flows are mapped for every scenario: lead capture, support, booking.' },
            { title: 'Deploy & Integrate', desc: 'The chatbot is deployed on your site and connected to your CRM and calendar.' }
        ],
        keyBenefits: [
            'Respond to every visitor instantly, 24/7',
            'Qualify and capture leads even outside business hours',
            'Hands off to a human at the perfect moment with full context',
            'Trained on your content — not generic scripts'
        ],
        whoItsFor: {
            left: [
                'Service businesses with high inbound inquiry volume',
                'SaaS companies with complex onboarding questions',
                'E-commerce brands with frequent product questions'
            ],
            right: [
                'Missed leads during off-hours',
                'Overwhelmed customer support teams',
                'High volume of repetitive FAQ inquiries'
            ]
        },
        results: [
            '45% of leads now captured outside business hours',
            'Support ticket volume reduced 30% by chatbot self-service',
            'Average response time: under 3 seconds, 24/7'
        ]
    },
    'shopify-ai': {
        title: 'Shopify AI Systems',
        subtitle: 'Increase average order value and repeat purchases with AI-powered Shopify automation.',
        whatItIs: 'We build AI-powered upsell flows, product recommendation engines, and post-purchase automation for Shopify stores. From the moment a customer lands on your site to 90 days after purchase, every touchpoint is optimized by AI to increase revenue per customer — automatically.',
        howItWorks: [
            { title: 'Store Audit', desc: 'We analyze your current conversion funnel, AOV, and post-purchase experience.' },
            { title: 'AI Flow Build', desc: 'Upsell sequences, bundle recommendations, and win-back campaigns are built and connected.' },
            { title: 'Launch & Optimize', desc: 'Flows go live and are optimized weekly based on performance data.' }
        ],
        keyBenefits: [
            'Increase AOV without increasing ad spend',
            'Post-purchase sequences that drive repeat orders',
            'AI product recommendations based on purchase history',
            'Integrates with Klaviyo, Recharge, and all major Shopify apps'
        ],
        whoItsFor: {
            left: [
                'Shopify stores doing $50k+/month in revenue',
                'E-commerce brands with repeat purchase potential',
                'DTC companies wanting to compete with big-brand personalization'
            ],
            right: [
                'Low Average Order Value (AOV)',
                'Poor customer retention and repeat purchase rates',
                'Generic shopping experiences'
            ]
        },
        results: [
            'Shopify AOV up 28% after AI upsell flow went live',
            'Setup completed in under 2 weeks',
            'Repeat purchase rate increased 35% in first quarter'
        ]
    },
    'crm-automation': {
        title: 'CRM Automation',
        subtitle: 'Automatically qualify, score, and route every lead so your team closes — not chases.',
        whatItIs: 'We build custom AI lead scoring and CRM automation systems that tell your sales team exactly which prospects to call first. Every lead is automatically enriched, scored based on intent signals, tagged by product interest, and routed to the right person — the moment they enter your pipeline.',
        howItWorks: [
            { title: 'CRM Audit', desc: 'We review your current CRM setup and identify where leads are falling through.' },
            { title: 'Scoring Model', desc: 'An AI lead scoring model is built using your historical conversion data.' },
            { title: 'Automation Build', desc: 'Triggers, sequences, and routing rules are deployed in your CRM.' }
        ],
        keyBenefits: [
            'Sales team only calls leads most likely to close',
            'No lead ever goes cold due to slow follow-up',
            'Automatic CRM enrichment from LinkedIn, Apollo, and more',
            'Works with HubSpot, Salesforce, Pipedrive, or any CRM'
        ],
        whoItsFor: {
            left: [
                'B2B companies with a dedicated sales team',
                'Agencies managing lead flow for multiple service lines',
                'SaaS companies with long sales cycles'
            ],
            right: [
                'Messy, unorganized CRM pipelines',
                'Sales reps cherry-picking leads',
                'Lack of visibility into lead quality'
            ]
        },
        results: [
            'Lead scoring system tells team exactly which prospects to call',
            'Pipeline velocity increased 50% in first 60 days',
            'Zero leads dropped in transition between stages'
        ]
    },
    'api-dashboards': {
        title: 'Custom API Dashboards',
        subtitle: 'Connect every tool you use into one live performance dashboard built for your business.',
        whatItIs: 'We build custom API-connected dashboards that pull data from your ad accounts, CRM, analytics, email platform, and more into a single real-time view. Instead of logging into 10 different tools every morning, your entire business performance is visible in one place — updated automatically.',
        howItWorks: [
            { title: 'Data Audit', desc: 'We map every tool and metric you currently track across different platforms.' },
            { title: 'Dashboard Architecture', desc: 'A custom dashboard is designed for your specific KPIs and team.' },
            { title: 'API Connections & Build', desc: 'Every data source is connected via API and visualized in real time.' }
        ],
        keyBenefits: [
            'Full business overview in one tab, updated in real time',
            'No more manual data exports or spreadsheet merging',
            'Custom alerts when key metrics drop below threshold',
            'Built to scale — add new data sources anytime'
        ],
        whoItsFor: {
            left: [
                'Marketing and ops teams spending hours on manual reporting',
                'Agencies managing multiple clients and channels',
                'Founders who want one source of truth for business performance'
            ],
            right: [
                'Data silos limiting business visibility',
                'Hours wasted building out weekly reports',
                'Reactive instead of proactive decision making'
            ]
        },
        results: [
            'Reporting time reduced from 6 hours to 15 minutes weekly',
            'Dashboard alone worth the retainer — client quote',
            'CAC, ROAS, and conversion tracked in one live view'
        ]
    },
    'skillhub': {
        title: 'OpenClaw SkillHub',
        subtitle: 'Browse, install, and deploy AI agent skills — built for real business automation.',
        whatItIs: 'SkillHub is MalikLogix’s curated library of AI agent skills for OpenClaw. Each skill is a pre-built, plug-and-play capability that extends what your AI agents can do — from web research and lead enrichment to CRM updates and content generation. Think of it as an app store for AI automation.',
        howItWorks: [
            { title: 'Browse the Library', desc: 'Filter skills by use case, integration, or category.' },
            { title: 'Install in One Click', desc: 'Skills are deployed directly into your OpenClaw environment.' },
            { title: 'Customize & Run', desc: 'Adjust parameters to match your workflow and let the agent do the rest.' }
        ],
        keyBenefits: [
            '100+ pre-built skills ready to deploy',
            'No code required — install and run in minutes',
            'Built by the MalikLogix team, tested in real client environments',
            'New skills added weekly based on community requests'
        ],
        whoItsFor: {
            left: [
                'Businesses already using AI agents for automation',
                'Developers building custom AI workflows',
                'Marketing and ops teams wanting to expand AI capability'
            ],
            right: [
                'Rebuilding basic AI tool connections from scratch',
                'Agents that lack real execution capabilities',
                'High cost of custom agent development'
            ]
        },
        results: [
            'Save 10+ hours per custom integration',
            'Instant access to enterprise-grade AI skills',
            'Rapid deployment of new agent workflows'
        ]
    },
    'automation': {
        title: 'Automation Skills Library',
        subtitle: 'Pre-built n8n and Make.com skills that automate your most repetitive workflows.',
        whatItIs: 'Our Automation Skills Library is a collection of ready-to-use workflow templates and AI-enhanced automation skills for n8n and Make.com. Each skill is documented, tested, and built to solve a specific business problem — from lead enrichment to invoice processing to social posting.',
        howItWorks: [
            { title: 'Browse by Workflow Type', desc: 'Find skills by category: marketing, operations, sales, reporting.' },
            { title: 'Download & Import', desc: 'Each skill comes with a ready-to-import n8n or Make.com template.' },
            { title: 'Configure & Deploy', desc: 'Update credentials and parameters, then activate your workflow.' }
        ],
        keyBenefits: [
            'Skip the build phase — deploy tested workflows in hours',
            'Each skill includes documentation and setup guide',
            'Compatible with n8n self-hosted and cloud, and Make.com',
            'Community ratings and usage stats help you pick the best skill'
        ],
        whoItsFor: {
            left: [
                'Automation engineers wanting a head start',
                'Operations managers solving specific bottlenecks',
                'Teams scaling their usage of n8n or Make.com'
            ],
            right: [
                'Starting every workflow from a blank canvas',
                'Error-prone, unoptimized custom workflows',
                'Lack of best practices in workflow design'
            ]
        },
        results: [
            'Reduce workflow build time by 80%',
            'Standardized, reliable automation templates',
            'Instant ROI on your integration platforms'
        ]
    },
    'ai-skills': {
        title: 'AI Skills Directory',
        subtitle: 'Every OpenClaw skill, organized by category, integration, and use case.',
        whatItIs: 'The AI Skills Directory is the complete, searchable index of all MalikLogix OpenClaw skills. Browse by category (Marketing, SEO, Automation, Sales), by integration (Slack, HubSpot, Airtable, Notion), or by use case (lead gen, content, reporting). Find exactly the skill you need in seconds.',
        howItWorks: [
            { title: 'Search or Browse', desc: 'Use the search bar or category filters to find relevant skills.' },
            { title: 'Read the Skill Brief', desc: 'Each skill page shows what it does, what tools it requires, and how to install it.' },
            { title: 'Install or Request', desc: 'Deploy directly or submit a request for a custom skill build.' }
        ],
        keyBenefits: [
            'Largest curated AI skills library for business automation',
            'Filter by tool, industry, or use case',
            'Community-contributed skills alongside official MalikLogix builds',
            'Free tier available — no subscription required to browse'
        ],
        whoItsFor: {
            left: [
                'Teams looking for specific integration capabilities',
                'AI enthusiasts discovering new use cases',
                'Builders seeking inspiration for custom workflows'
            ],
            right: [
                'Difficulty finding reliable AI agents for specific tools',
                'Fragmented directories with low-quality integrations',
                'Wasting time researching what is actually possible'
            ]
        },
        results: [
            'Find the exact right integration in seconds',
            'Comprehensive view of the AI automation landscape',
            'Continuous updates as new tools emerge'
        ]
    },
    'extensions': {
        title: 'Extensions & Plugins',
        subtitle: 'Extend the capabilities of Claude and other AI agents with purpose-built plugins.',
        whatItIs: 'OpenClaw Extensions are purpose-built plugins that add new capabilities to AI models like Claude. From real-time web access and CRM lookup to document analysis and calendar integration — extensions turn your AI assistant into a fully capable business operator.',
        howItWorks: [
            { title: 'Browse Extensions', desc: 'Find extensions by capability: search, data, communication, analysis.' },
            { title: 'Authorize & Connect', desc: 'Each extension connects to your tools via OAuth or API key.' },
            { title: 'Activate in Your Agent', desc: 'Enable the extension in your OpenClaw agent config and it’s ready.' }
        ],
        keyBenefits: [
            'Give your AI agent real-world capabilities beyond chat',
            'Works with Claude, GPT-4, and most major AI models',
            'Extensions are sandboxed and secure — no data stored',
            'New extensions built monthly based on user requests'
        ],
        whoItsFor: {
            left: [
                'Power users hitting the limits of default AI chat interfaces',
                'Developers orchestrating multi-agent systems',
                'Businesses wanting AI that can take action'
            ],
            right: [
                'AI agents that can talk but can’t execute',
                'Lack of real-time data access for language models',
                'Security concerns with giving AI broad system access'
            ]
        },
        results: [
            'Unlock dynamic execution on top of static AI models',
            'Securely hook AI into enterprise APIs',
            'Significantly expand the autonomous scope of agents'
        ]
    },
    'submit': {
        title: 'Submit a Skill',
        subtitle: 'Built something useful? Share it with the MalikLogix community and earn recognition.',
        whatItIs: 'The OpenClaw community grows through contributions. If you’ve built an AI skill, workflow template, or automation that others would benefit from, submit it to SkillHub. Our team reviews every submission, and the best ones are featured in the directory and promoted to our 10,000+ newsletter subscribers.',
        howItWorks: [
            { title: 'Package Your Skill', desc: 'Document what it does, what tools it requires, and how to set it up.' },
            { title: 'Submit via Form', desc: 'Fill in the submission form with your skill details and files.' },
            { title: 'Review & Publish', desc: 'Our team reviews within 5 business days and publishes approved skills.' }
        ],
        keyBenefits: [
            'Get your work in front of 10,000+ business owners and developers',
            'Featured submissions receive a dedicated newsletter mention',
            'Build a public portfolio of AI automation work',
            'Earn affiliate revenue if your skill is used by paid members'
        ],
        whoItsFor: {
            left: [
                'Freelance automation experts and developers',
                'Agencies showcasing their technical capability',
                'Community members giving back'
            ],
            right: [
                'Great workflows sitting unused on local machines',
                'Hard to monetize niche automation skills',
                'Lack of exposure for talented builders'
            ]
        },
        results: [
            'Reach over 10,000 potential users and clients',
            'Establish authority in the AI automation space',
            'Contribute to the fastest-growing open framework'
        ]
    }
};
