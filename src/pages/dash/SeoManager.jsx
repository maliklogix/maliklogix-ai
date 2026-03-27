import React, { useState } from 'react';
import { 
    Search, 
    Link as LinkIcon, 
    ArrowRight, 
    Plus, 
    Settings, 
    Globe, 
    Shield, 
    Save, 
    Trash2,
    Eye,
    ChevronRight,
    Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SeoManager = () => {
    const [saving, setSaving] = useState(false);
    const [redirects, setRedirects] = useState([
        { from: '/old-blog', to: '/blog', type: '301', status: 'active' },
        { from: '/service-old', to: '/services', type: '301', status: 'active' }
    ]);

    const [globalMeta, setGlobalMeta] = useState({
        siteTitle: 'MalikLogix | AI Automation Agency',
        siteDesc: 'We build high-converting AI automation systems for modern businesses.',
        ogImage: 'https://maliklogix.com/og-default.jpg',
        googleAnalyticsId: 'G-XXXXXXXXXX',
        facebookPixelId: 'PX-XXXXXXXXXX'
    });

    const handleSaveGlobal = () => {
        setSaving(true);
        setTimeout(() => setSaving(false), 800);
    };

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-display font-bold text-gray-900">SEO & Site Configuration</h2>
                    <p className="text-xs text-gray-400 mt-1">Manage global meta tags, redirects, and tracking scripts.</p>
                </div>
                <button 
                    onClick={handleSaveGlobal}
                    className="flex items-center gap-2 px-8 py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 text-sm"
                >
                    {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save size={18} />} Save All Settings
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Global Meta */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                            <Globe className="text-accent" size={20} />
                            <h3 className="font-display font-bold text-lg">Global Meta Tags</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Site Title Pattern</label>
                                <input 
                                    type="text" 
                                    value={globalMeta.siteTitle} 
                                    onChange={(e) => setGlobalMeta(p => ({ ...p, siteTitle: e.target.value }))}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Description</label>
                                <textarea 
                                    value={globalMeta.siteDesc} 
                                    onChange={(e) => setGlobalMeta(p => ({ ...p, siteDesc: e.target.value }))}
                                    rows="3"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm resize-none"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Redirects Manager */}
                    <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                            <div className="flex items-center gap-3">
                                <LinkIcon className="text-accent" size={20} />
                                <h3 className="font-display font-bold text-lg">301 Redirects</h3>
                            </div>
                            <button className="flex items-center gap-1 text-[10px] font-bold text-accent uppercase tracking-widest hover:underline">
                                <Plus size={14} /> Add Redirect
                            </button>
                        </div>
                        <div className="space-y-3">
                            {redirects.map((r, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group">
                                    <div className="flex-1 flex items-center gap-3 font-mono text-xs">
                                        <span className="text-gray-400">FROM</span>
                                        <span className="font-bold text-gray-700">{r.from}</span>
                                        <ArrowRight size={14} className="text-gray-300" />
                                        <span className="text-gray-400">TO</span>
                                        <span className="font-bold text-accent">{r.to}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded text-[10px] font-bold">301</span>
                                        <button className="p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar Tracking & Tools */}
                <div className="space-y-8">
                    <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <h3 className="text-sm font-bold flex items-center gap-2">
                            <Shield size={16} className="text-accent" /> Tracking Scripts
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Google Analytics (G-ID)</label>
                                <input 
                                    type="text" 
                                    value={globalMeta.googleAnalyticsId} 
                                    placeholder="G-XXXXXXXXXX"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs font-mono"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Facebook Pixel ID</label>
                                <input 
                                    type="text" 
                                    value={globalMeta.facebookPixelId} 
                                    placeholder="PX-XXXXXXXXXX"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs font-mono"
                                />
                            </div>
                        </div>
                    </section>

                    <div className="p-8 bg-[#0f1117] rounded-3xl shadow-xl shadow-accent/20 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20"><Settings size={40} className="animate-spin-slow" /></div>
                        <h4 className="font-bold mb-2">Sitemap Status</h4>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <p className="text-[10px] text-green-500 font-bold uppercase">Healthy</p>
                        </div>
                        <p className="text-[10px] text-white/60 leading-relaxed mb-6">Last crawled by Search Console: Today at 04:22 AM</p>
                        <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all border border-white/10">
                            Regenerate Sitemap.xml
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeoManager;
