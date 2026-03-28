import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
    Save, 
    ArrowLeft, 
    ChevronRight, 
    Loader2, 
    Globe, 
    Layout, 
    Wrench, 
    CheckCircle, 
    BarChart3,
    Eye,
    Plus,
    Trash2,
    List
} from 'lucide-react';
import { useToast } from '../../../components/dash/Toast';

const ServiceEditor = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        hero_title: '',
        hero_desc: '',
        process_steps: [],
        benefits: [],
        stats: [],
        meta_title: '',
        meta_desc: ''
    });

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/services/${slug}`)
            .then(res => res.json())
            .then(data => {
                setFormData({
                    ...data,
                    process_steps: typeof data.process_steps === 'string' ? JSON.parse(data.process_steps) : (data.process_steps || []),
                    benefits: typeof data.benefits === 'string' ? JSON.parse(data.benefits) : (data.benefits || []),
                    stats: typeof data.stats === 'string' ? JSON.parse(data.stats) : (data.stats || [])
                });
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [slug]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/services/${slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                showToast('Service updated successfully!');
                navigate('/dash/services');
            } else {
                showToast('Failed to update service', 'error');
            }
        } catch (err) {
            console.error(err);
            showToast('Server error', 'error');
        } finally {
            setSaving(false);
        }
    };

    const addListItem = (key, template) => {
        setFormData(p => ({ ...p, [key]: [...p[key], template] }));
    };

    const removeListItem = (key, index) => {
        setFormData(p => ({ ...p, [key]: p[key].filter((_, i) => i !== index) }));
    };

    const updateListItem = (key, index, field, value) => {
        const newList = [...formData[key]];
        newList[index] = { ...newList[index], [field]: value };
        setFormData(p => ({ ...p, [key]: newList }));
    };

    if (loading) return <div className="flex items-center justify-center min-h-[400px] text-black"><Loader2 className="animate-spin text-accent" size={32} /></div>;

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-black text-black">
                    <Link to="/dash/services" className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-display font-bold text-gray-900">Edit Service Page</h2>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                            <Link to="/dash" className="hover:text-accent">Dashboard</Link>
                            <ChevronRight size={12} />
                            <Link to="/dash/services" className="hover:text-accent">Services</Link>
                            <ChevronRight size={12} />
                            <span className="text-gray-600">{formData.title}</span>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-8 py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 text-sm disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save size={18} />} Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-black">
                {/* Editor Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Hero Section */}
                    <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                            <Layout className="text-accent" size={20} />
                            <h3 className="font-display font-bold text-lg">Hero & Main Content</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Page Title</label>
                                <input 
                                    type="text" 
                                    value={formData.title} 
                                    onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hero Heading</label>
                                <textarea 
                                    value={formData.hero_title} 
                                    onChange={(e) => setFormData(p => ({ ...p, hero_title: e.target.value }))}
                                    rows="2"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm resize-none font-display font-medium"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Process Steps */}
                    <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 text-black">
                        <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                            <div className="flex items-center gap-3">
                                <List className="text-accent" size={20} />
                                <h3 className="font-display font-bold text-lg">Service Process</h3>
                            </div>
                            <button 
                                onClick={() => addListItem('process_steps', { title: '', desc: '' })}
                                className="flex items-center gap-1 text-[10px] font-bold text-accent uppercase tracking-widest hover:underline"
                            >
                                <Plus size={14} /> Add Step
                            </button>
                        </div>
                        <div className="space-y-4">
                            {formData.process_steps.map((step, i) => (
                                <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3 relative group">
                                    <button 
                                        onClick={() => removeListItem('process_steps', i)}
                                        className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <input 
                                        type="text" 
                                        value={step.title}
                                        placeholder={`Step ${i+1} Title`}
                                        onChange={(e) => updateListItem('process_steps', i, 'title', e.target.value)}
                                        className="w-full bg-transparent border-none p-0 font-bold text-gray-800 placeholder:text-gray-300 focus:ring-0"
                                    />
                                    <textarea 
                                        value={step.desc}
                                        placeholder="Describe this step..."
                                        onChange={(e) => updateListItem('process_steps', i, 'desc', e.target.value)}
                                        rows="2"
                                        className="w-full bg-transparent border-none p-0 text-sm text-gray-500 placeholder:text-gray-300 focus:ring-0 resize-none"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-8">
                    <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <h3 className="text-sm font-bold flex items-center gap-2">
                            <Globe size={16} className="text-accent" /> SEO Configuration
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Meta Title</label>
                                <input 
                                    type="text" 
                                    value={formData.meta_title} 
                                    onChange={(e) => setFormData(p => ({ ...p, meta_title: e.target.value }))}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Meta Description</label>
                                <textarea 
                                    value={formData.meta_desc} 
                                    onChange={(e) => setFormData(p => ({ ...p, meta_desc: e.target.value }))}
                                    rows="4"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs resize-none"
                                />
                            </div>
                        </div>
                    </section>

                    <div className="p-8 bg-[#0f1117] rounded-3xl shadow-xl shadow-accent/20 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-125 transition-transform"><BarChart3 size={40} /></div>
                        <h4 className="font-bold mb-2">Page Metrics</h4>
                        <div className="space-y-3 mt-4">
                            <div className="flex justify-between items-center text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                <span>Views (30d)</span>
                                <span className="text-white">1.2k</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                <span>Conversion</span>
                                <span className="text-white">3.4%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceEditor;
