import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
    Save, 
    ArrowLeft, 
    ChevronRight, 
    Loader2, 
    Zap, 
    Puzzle, 
    Layers, 
    Plus,
    Layout,
    Globe,
    ToggleRight
} from 'lucide-react';
import { useToast } from '../../../components/dash/Toast';

const ToolEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'OpenClaw',
        status: 'active',
        cta_text: '',
        cta_url: '',
        icon_name: 'Zap'
    });

    useEffect(() => {
        fetch(`http://localhost:3001/api/admin/tools/${id}`)
            .then(res => res.json())
            .then(data => {
                setFormData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`http://localhost:3001/api/admin/tools/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                showToast('Tool configuration updated!');
                navigate('/dash/tools');
            } else {
                showToast('Failed to update tool', 'error');
            }
        } catch (err) {
            console.error(err);
            showToast('Connection error', 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="animate-spin text-accent" size={32} /></div>;

    const Icon = formData.icon_name === 'Zap' ? Zap : formData.icon_name === 'Puzzle' ? Puzzle : formData.icon_name === 'Layers' ? Layers : Plus;

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-black">
                    <Link to="/dash/tools" className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-display font-bold text-gray-900">Edit Tool Configuration</h2>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                            <Link to="/dash" className="hover:text-accent">Dashboard</Link>
                            <ChevronRight size={12} />
                            <Link to="/dash/tools" className="hover:text-accent">Tools</Link>
                            <ChevronRight size={12} />
                            <span className="text-gray-600">{formData.name}</span>
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
                {/* Main Content Form */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                            <Layout className="text-accent" size={20} />
                            <h3 className="font-display font-bold text-lg">Tool Attributes</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tool Name</label>
                                <input 
                                    type="text" 
                                    value={formData.name} 
                                    onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
                                <select 
                                    value={formData.category}
                                    onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold"
                                >
                                    <option value="OpenClaw">OpenClaw Ecosystem</option>
                                    <option value="Calculators">AI Calculators</option>
                                    <option value="Generators">Content Generators</option>
                                    <option value="Analysis">Industry Analysis</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Short Description</label>
                            <textarea 
                                value={formData.description} 
                                onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                                rows="3"
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm resize-none leading-relaxed"
                            />
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                            <Globe className="text-accent" size={20} />
                            <h3 className="font-display font-bold text-lg">Action & Routing</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">CTA Button Text</label>
                                <input 
                                    type="text" 
                                    value={formData.cta_text} 
                                    onChange={(e) => setFormData(p => ({ ...p, cta_text: e.target.value }))}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Redirect URL (internal or external)</label>
                                <input 
                                    type="text" 
                                    value={formData.cta_url} 
                                    onChange={(e) => setFormData(p => ({ ...p, cta_url: e.target.value }))}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-mono text-xs"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
                        <h3 className="text-sm font-bold flex items-center gap-2">
                            <ToggleRight size={16} className="text-accent" /> Status & Branding
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Visual Icon</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {['Zap', 'Puzzle', 'Layers', 'Plus'].map(icon => (
                                        <button 
                                            key={icon}
                                            onClick={() => setFormData(p => ({ ...p, icon_name: icon }))}
                                            className={`p-3 rounded-xl border flex items-center justify-center transition-all ${
                                                formData.icon_name === icon ? 'bg-accent/10 border-accent text-accent' : 'bg-gray-50 border-gray-100 text-gray-400 hover:border-accent/30'
                                            }`}
                                        >
                                            {icon === 'Zap' ? <Zap size={18} /> : icon === 'Puzzle' ? <Puzzle size={18} /> : icon === 'Layers' ? <Layers size={18} /> : <Plus size={18} />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Status</label>
                                <select 
                                    value={formData.status}
                                    onChange={(e) => setFormData(p => ({ ...p, status: e.target.value }))}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold"
                                >
                                    <option value="active">Active (Visible)</option>
                                    <option value="inactive">Inactive (Hidden)</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    <div className="bg-[#0f1117] p-8 rounded-3xl shadow-xl shadow-accent/10 relative overflow-hidden flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-4">
                            <Icon size={32} />
                        </div>
                        <h4 className="text-white font-bold mb-1">{formData.name || 'Tool Name'}</h4>
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em] mb-4">{formData.category}</p>
                        <button className="w-full py-2.5 bg-accent text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                            {formData.cta_text || 'Action'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolEditor;
