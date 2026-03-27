import fs from 'fs';
import path from 'path';

// Parse solutionsData.jsx to extract the object since we can't easily import JSX into Node without transpiling.
const dataPath = path.resolve('src/data/solutionsData.jsx');
const content = fs.readFileSync(dataPath, 'utf-8');

// We will extract the pageContent object basically using eval or string matching.
// An easier way: transform SolutionPage into a string template.
const template = `import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle, ChevronRight, BarChart3, Target, Zap } from 'lucide-react';

export default function __COMPONENT_NAME__() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-28 pb-16">
            
            {/* 1. Hero Section */}
            <section className="px-6 lg:px-20 py-16 md:py-24 max-w-7xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">__TITLE__</h1>
                <p className="text-[var(--secondary)] text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-10">__SUBTITLE__</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/contact" className="px-8 py-4 bg-accent text-white font-bold rounded-full flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-accent/20">
                        Book a Free Strategy Call <ArrowUpRight size={18} />
                    </Link>
                    <a href="#case-studies" className="px-8 py-4 border border-[var(--border)] rounded-full font-bold hover:border-accent/50 transition-colors">
                        View Case Studies
                    </a>
                </div>
            </section>

            {/* 2. What It Is */}
            <section className="px-6 lg:px-20 py-16 md:py-24 border-y border-[var(--border)] bg-[var(--card-bg)]">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="text-accent font-mono text-xs uppercase tracking-widest font-bold mb-4">What It Is</div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">The System</h2>
                        <p className="text-[var(--secondary)] text-lg leading-relaxed">__WHAT_IT_IS__</p>
                    </div>
                    <div className="h-64 md:h-96 rounded-3xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center p-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
                        <Target className="w-24 h-24 text-accent/50" />
                        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-accent/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
                    </div>
                </div>
            </section>

            {/* 3. How It Works */}
            <section className="px-6 lg:px-20 py-16 md:py-24 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="text-accent font-mono text-xs uppercase tracking-widest font-bold mb-4">Process</div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">How It Works</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    __HOW_IT_WORKS__
                </div>
            </section>

            {/* 4. Key Benefits */}
            <section className="px-6 lg:px-20 py-16 md:py-24 border-y border-[var(--border)] bg-[var(--card-bg)]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="text-accent font-mono text-xs uppercase tracking-widest font-bold mb-4">Value</div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">Key Benefits</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        __KEY_BENEFITS__
                    </div>
                </div>
            </section>

            {/* 5. Who It's For */}
            <section className="px-6 lg:px-20 py-16 md:py-24 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="text-accent font-mono text-xs uppercase tracking-widest font-bold mb-4">Fit</div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">Who It’s For</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                    <div className="p-8 md:p-12 rounded-3xl bg-[var(--card-bg)] border border-[var(--border)]">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <Target className="text-accent" /> Ideal For
                        </h3>
                        <ul className="space-y-4">
                            __WHO_ITS_FOR_LEFT__
                        </ul>
                    </div>
                    <div className="p-8 md:p-12 rounded-3xl bg-[var(--card-bg)] border border-[var(--border)]">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <Zap className="text-accent" /> Problems Solved
                        </h3>
                        <ul className="space-y-4">
                            __WHO_ITS_FOR_RIGHT__
                        </ul>
                    </div>
                </div>
            </section>

            {/* 6. Results / Metrics */}
            <section className="px-6 lg:px-20 py-20 bg-[#002e3b]">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center text-white">
                    __RESULTS__
                </div>
            </section>

            {/* 7. CTA Section */}
            <section className="px-6 lg:px-20 py-24 max-w-7xl mx-auto text-center">
                <div className="bg-accent rounded-3xl p-12 md:p-20 relative overflow-hidden text-white shadow-2xl">
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to get started?</h2>
                        <p className="text-lg mb-10 text-white/90 max-w-xl mx-auto">
                            Let's map out exactly how __TITLE__ can drive growth for your business.
                        </p>
                        <Link to="/contact" className="inline-flex px-10 py-5 bg-white text-accent font-bold rounded-full text-lg items-center gap-2 hover:scale-105 transition-transform shadow-xl">
                            Book a Free AI Strategy Call <ArrowUpRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
`;

const lines = content.split('\n');
let insideObj = false;
let objStr = '';
for(let line of lines) {
    if(line.includes('export const pageContent = {')) {
        insideObj = true;
        objStr += '{';
        continue;
    }
    if(insideObj) {
        objStr += line + '\n';
        if(line.startsWith('};')) {
            break;
        }
    }
}

// remove trailing ';'
objStr = objStr.trim().replace(/;$/, '');

// using Function to parse safely
const getObj = new Function(`return ${objStr}`);
const pageContent = getObj();

const routes = {
    'ai-campaign-management': '/services/ai-campaign-management',
    'lead-generation-ai': '/services/lead-generation-ai',
    'conversion-optimization': '/services/conversion-optimization',
    'ai-ad-targeting': '/services/ai-ad-targeting',
    'funnel-automation': '/services/funnel-automation',
    'email-marketing-ai': '/services/email-marketing-ai',
    'seo-strategy': '/services/seo-strategy',
    'geo-ai-search': '/services/geo-ai-search',
    'ai-content-creation': '/services/ai-content-creation',
    'blog-writing': '/services/blog-writing',
    'keyword-clustering': '/services/keyword-clustering',
    'content-tracking': '/services/content-tracking',
    'n8n-automation': '/services/n8n-automation',
    'make-integrations': '/services/make-integrations',
    'ai-chatbots': '/services/ai-chatbots',
    'shopify-ai': '/services/shopify-ai',
    'crm-automation': '/services/crm-automation',
    'api-dashboards': '/services/api-dashboards',
    'skillhub': '/tools/openclaw/skillhub',
    'automation': '/tools/openclaw/automation',
    'ai-skills': '/tools/ai-skills',
    'extensions': '/tools/openclaw/extensions',
    'submit': '/tools/openclaw/submit',
};

// We will generate the files and save them.
const toKebab = (str) => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
const toPascal = (str) => str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');

let appImports = [];
let appRoutes = [];

for(let [key, route] of Object.entries(routes)) {
    const data = pageContent[key];
    if(!data) continue;
    
    // Some routes have subfolders, e.g. /services/..., /tools/openclaw/...
    // Let's reflect this in the src/pages structure.
    const fileRelPath = route; 
    const fullPath = path.join('src/pages', fileRelPath + '.jsx');
    const folderPath = path.dirname(fullPath);
    
    if(!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath, { recursive: true });
    }

    const compName = toPascal(key) + 'Page';
    let contentString = template.replace(/__COMPONENT_NAME__/g, compName);
    contentString = contentString.replace(/__TITLE__/g, data.title);
    contentString = contentString.replace(/__SUBTITLE__/g, data.subtitle);
    contentString = contentString.replace(/__WHAT_IT_IS__/g, data.whatItIs);

    // How it works
    const hiwStr = data.howItWorks.map((step, i) => `                        <div className="p-8 rounded-3xl border border-[var(--border)] bg-[var(--card-bg)] relative overflow-hidden hover:border-accent/30 transition-colors">
                            <div className="text-5xl font-display font-bold text-accent/10 absolute -top-4 -right-2">0${i + 1}</div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm">${i + 1}</span>
                                ${step.title.replace(/"/g, '&quot;')}
                            </h3>
                            <p className="text-[var(--secondary)] leading-relaxed">${step.desc.replace(/"/g, '&quot;')}</p>
                        </div>`).join('\n');
    contentString = contentString.replace('__HOW_IT_WORKS__', hiwStr);

    // Key benefits
    const kbStr = data.keyBenefits.map(benefit => `                        <div className="p-6 rounded-2xl border border-accent/20 bg-accent/5 flex flex-col items-start hover:-translate-y-1 transition-transform">
                                <CheckCircle className="w-6 h-6 text-accent mb-4" />
                                <p className="font-medium text-lg leading-snug">${benefit.replace(/"/g, '&quot;')}</p>
                            </div>`).join('\n');
    contentString = contentString.replace('__KEY_BENEFITS__', kbStr);

    // fit left
    const fitLeft = data.whoItsFor.left.map(item => `                            <li className="flex gap-3 text-[var(--secondary)] text-lg">
                                    <ChevronRight className="text-accent shrink-0 mt-1 w-5 h-5" />
                                    <span>${item.replace(/"/g, '&quot;')}</span>
                                </li>`).join('\n');
    contentString = contentString.replace('__WHO_ITS_FOR_LEFT__', fitLeft);

    const fitRight = data.whoItsFor.right.map(item => `                            <li className="flex gap-3 text-[var(--secondary)] text-lg">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0 mt-2.5" />
                                    <span>${item.replace(/"/g, '&quot;')}</span>
                                </li>`).join('\n');
    contentString = contentString.replace('__WHO_ITS_FOR_RIGHT__', fitRight);

    // results
    const resultsStr = data.results.map(res => `                        <div className="flex flex-col items-center p-6">
                            <BarChart3 className="w-12 h-12 text-[#00B4C8] mb-6" />
                            <p className="text-xl md:text-2xl font-display font-bold leading-tight max-w-xs">${res.replace(/"/g, '&quot;')}</p>
                        </div>`).join('\n');
    contentString = contentString.replace('__RESULTS__', resultsStr);

    fs.writeFileSync(fullPath, contentString);
    
    // Import path for App.jsx
    appImports.push(`import ${compName} from '.${fileRelPath}';`);
    let targetRoute = route; 
    appRoutes.push(`                    <Route path="${targetRoute}" element={<${compName} />} />`);
}

// Special case for AI skills with query param, App.js handles the path only
// wait, the 'ai-skills' route handles the ?view=integrations.
// we generated tools/ai-skills.jsx. It's covered above!

fs.writeFileSync('routes-config.txt', `IMPORTS:\n${appImports.join('\n')}\nROUTES:\n${appRoutes.join('\n')}`);
console.log('Pages generated successfully!');
