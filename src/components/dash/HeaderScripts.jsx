import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Play, Pause, AlertTriangle, ShieldCheck, HelpCircle, Code, Save, X, ChevronRight, GripVertical } from 'lucide-react';
import { useToast } from './Toast';

const STRATEGIES = [
    { value: 'afterInteractive', label: 'After Interactive', desc: 'Runs after page is fully loaded (Recommended)' },
    { value: 'lazyOnload', label: 'Lazy Load', desc: 'Runs when browser is idle (Best for chat/heatmaps)' },
    { value: 'beforeInteractive', label: 'Before Interactive', desc: 'Critical scripts only (May slow down site)' }
];

const CATEGORIES = ['Analytics', 'Advertising', 'Tag Manager', 'Heatmap', 'SEO', 'Chat', 'Custom'];

const TEMPLATES = [
    {
        id: 'ga4',
        name: 'Google Analytics 4',
        icon: 'G',
        category: 'Analytics',
        strategy: 'afterInteractive',
        code: `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id={{ID}}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '{{ID}}');
</script>`,
        placeholder: 'Measurement ID (G-XXXXXX)'
    },
    {
        id: 'gtm',
        name: 'Google Tag Manager',
        icon: 'T',
        category: 'Tag Manager',
        strategy: 'afterInteractive',
        code: `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','{{ID}}');</script>`,
        placeholder: 'Container ID (GTM-XXXXXX)'
    },
    {
        id: 'meta',
        name: 'Meta Pixel',
        icon: 'f',
        category: 'Advertising',
        strategy: 'afterInteractive',
        code: `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '{{ID}}');
fbq('track', 'PageView');
</script>`,
        placeholder: 'Pixel ID'
    }
];

const HeaderScripts = () => {
    const { showToast } = useToast();
    const [config, setConfig] = useState({ scripts: [], deferAll: true, testMode: false });
    const [loading, setLoading] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingScript, setEditingScript] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Custom',
        strategy: 'afterInteractive',
        code: '',
        enabled: true,
        injectOn: 'all',
        paths: []
    });

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/scripts`);
            const data = await res.json();
            setConfig(data);
        } catch (err) {
            showToast('Failed to load scripts config', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (updatedConfig) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/scripts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedConfig || config)
            });
            if (res.ok) {
                showToast('Scripts updated successfully');
                fetchConfig();
            }
        } catch (err) {
            showToast('Failed to save changes', 'error');
        }
    };

    const openDrawer = (script = null) => {
        if (script) {
            setEditingScript(script);
            setFormData(script);
        } else {
            setEditingScript(null);
            setFormData({
                name: '',
                category: 'Custom',
                strategy: 'afterInteractive',
                code: '',
                enabled: true,
                injectOn: 'all',
                paths: []
            });
        }
        setIsDrawerOpen(true);
    };

    const handleTemplateClick = (tpl) => {
        setFormData(prev => ({
            ...prev,
            name: tpl.name,
            category: tpl.category,
            strategy: tpl.strategy,
            code: tpl.code
        }));
    };

    const saveScript = () => {
        if (!formData.name || !formData.code) {
            showToast('Name and Code are required', 'error');
            return;
        }

        const newScript = {
            ...formData,
            id: editingScript ? editingScript.id : Math.random().toString(36).substr(2, 9),
            updatedAt: new Date().toISOString()
        };

        const updatedScripts = editingScript 
            ? config.scripts.map(s => s.id === editingScript.id ? newScript : s)
            : [...config.scripts, { ...newScript, order: config.scripts.length }];

        const newConfig = { ...config, scripts: updatedScripts };
        setConfig(newConfig);
        handleSave(newConfig);
        setIsDrawerOpen(false);
    };

    const toggleScript = (id) => {
        const updatedScripts = config.scripts.map(s => 
            s.id === id ? { ...s, enabled: !s.enabled } : s
        );
        const newConfig = { ...config, scripts: updatedScripts };
        setConfig(newConfig);
        handleSave(newConfig);
    };

    const deleteScript = (id) => {
        if (!window.confirm('Are you sure you want to delete this script?')) return;
        const updatedScripts = config.scripts.filter(s => s.id !== id);
        const newConfig = { ...config, scripts: updatedScripts };
        setConfig(newConfig);
        handleSave(newConfig);
    };

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Scripts</p>
                    <p className="text-2xl font-display font-bold">{config.scripts.length}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active</p>
                    <p className="text-2xl font-display font-bold text-green-500">{config.scripts.filter(s => s.enabled).length}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Deferred Mode</p>
                    <div className="flex items-center gap-2">
                        <p className="text-2xl font-display font-bold text-accent">ON</p>
                        <ShieldCheck size={18} className="text-accent" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Test Mode</p>
                        <p className={`text-sm font-bold ${config.testMode ? 'text-accent' : 'text-gray-400'}`}>
                            {config.testMode ? 'Active' : 'Inactive'}
                        </p>
                    </div>
                    <button 
                        onClick={() => handleSave({...config, testMode: !config.testMode})}
                        className={`w-10 h-5 rounded-full transition-colors relative ${config.testMode ? 'bg-accent' : 'bg-gray-200'}`}
                    >
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${config.testMode ? 'right-0.5' : 'left-0.5'}`} />
                    </button>
                </div>
            </div>

            {/* Main Action */}
            <div className="flex justify-between items-center">
                <h3 className="font-display font-bold text-lg text-gray-900">Installed Scripts</h3>
                <button 
                    onClick={() => openDrawer()}
                    className="flex items-center gap-2 px-5 py-2 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 text-sm"
                >
                    <Plus size={18} /> Add New Script
                </button>
            </div>

            {/* Script List */}
            <div className="space-y-4">
                {config.scripts.length === 0 ? (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
                        <Code className="mx-auto text-gray-300 mb-4" size={48} />
                        <p className="text-gray-500 font-medium">No scripts installed yet</p>
                        <p className="text-xs text-gray-400 mt-1">Paste tracking codes or pixel tags to get started</p>
                    </div>
                ) : (
                    config.scripts.sort((a,b) => a.order - b.order).map((script) => (
                        <div key={script.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm group hover:border-accent/20 transition-all">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div className="flex flex-col gap-1 items-center pt-1 pr-2 border-r border-gray-50 text-gray-300">
                                        <GripVertical size={16} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h4 className="font-bold text-gray-900">{script.name}</h4>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                script.enabled ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                                            }`}>
                                                {script.enabled ? 'Active' : 'Disabled'}
                                            </span>
                                            <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                                                {script.strategy}
                                            </span>
                                        </div>
                                        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 font-mono">
                                            <span>Category: {script.category}</span>
                                            <span>•</span>
                                            <span>Targeting: {script.injectOn}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button 
                                        onClick={() => toggleScript(script.id)}
                                        className={`p-2 rounded-lg transition-colors ${script.enabled ? 'text-orange-500 hover:bg-orange-50' : 'text-green-500 hover:bg-green-50'}`}
                                        title={script.enabled ? 'Disable' : 'Enable'}
                                    >
                                        {script.enabled ? <Pause size={18} /> : <Play size={18} />}
                                    </button>
                                    <button 
                                        onClick={() => openDrawer(script)}
                                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button 
                                        onClick={() => deleteScript(script.id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Performance Info */}
            <div className="bg-accent/5 border border-accent/10 rounded-3xl p-6 flex gap-4">
                <ShieldCheck className="text-accent shrink-0" size={24} />
                <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1">Performance Mode Active</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        All scripts are automatically deferred to run after the page is interactive. This ensures your **Google PageSpeed** score remains high while still collecting all necessary data.
                    </p>
                </div>
            </div>

            {/* Drawer Modal */}
            {isDrawerOpen && (
                <div className="fixed inset-0 z-[100] overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} />
                    <div className="absolute top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl flex flex-col animate-slide-left">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="font-display font-bold text-xl">{editingScript ? 'Edit Script' : 'Add Header Script'}</h3>
                            <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="flex-grow overflow-y-auto p-8 space-y-8">
                            {/* Templates */}
                            {!editingScript && (
                                <section className="space-y-4 text-black">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quick Templates</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {TEMPLATES.map(tpl => (
                                            <button 
                                                key={tpl.id}
                                                onClick={() => handleTemplateClick(tpl)}
                                                className="p-4 border border-gray-100 rounded-2xl hover:border-accent hover:bg-accent/5 transition-all text-left group"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center font-black text-accent mb-2 group-hover:bg-white">
                                                    {tpl.icon}
                                                </div>
                                                <p className="text-[10px] font-bold text-gray-900 leading-tight">{tpl.name}</p>
                                            </button>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Form */}
                            <div className="space-y-6 text-black">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Script Name</label>
                                    <input 
                                        type="text" 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        placeholder="e.g. Google Analytics 4"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-accent/20 outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
                                        <select 
                                            value={formData.category}
                                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none"
                                        >
                                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Load Strategy</label>
                                        <select 
                                            value={formData.strategy}
                                            onChange={(e) => setFormData({...formData, strategy: e.target.value})}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none"
                                        >
                                            {STRATEGIES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Inject On</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['all', 'homepage'].map(opt => (
                                            <button 
                                                key={opt}
                                                onClick={() => setFormData({...formData, injectOn: opt})}
                                                className={`px-4 py-2 rounded-xl border text-xs font-bold capitalize transition-all ${
                                                    formData.injectOn === opt ? 'bg-accent border-accent text-white' : 'bg-white border-gray-100 text-gray-500'
                                                }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Script Code</label>
                                        <div className="flex items-center gap-1 text-accent text-[10px] font-bold uppercase cursor-pointer hover:underline">
                                            <HelpCircle size={10} /> Syntax Guide
                                        </div>
                                    </div>
                                    <div className="relative group">
                                        <textarea 
                                            value={formData.code}
                                            onChange={(e) => setFormData({...formData, code: e.target.value})}
                                            placeholder="<script>...</script>"
                                            className="w-full bg-[#0f1117] text-accent border border-gray-800 rounded-2xl p-6 font-mono text-sm h-64 focus:ring-2 focus:ring-accent/20 outline-none scrollbar-thin"
                                        />
                                        <div className="absolute top-4 right-4 text-white/20 select-none pointer-events-none">
                                            <Code size={40} />
                                        </div>
                                    </div>
                                    <p className="text-[9px] text-gray-400 leading-relaxed bg-gray-50 p-3 rounded-xl">
                                        ℹ️ Ensure you include the full tag: &lt;script&gt;, &lt;noscript&gt;, or &lt;meta&gt;. MalikLogix will handle hydration and deferment automatically.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-4 bg-gray-50/50">
                            <button 
                                onClick={() => setIsDrawerOpen(false)}
                                className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={saveScript}
                                className="flex items-center gap-2 px-8 py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
                            >
                                <Save size={18} /> Save Config
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeaderScripts;
