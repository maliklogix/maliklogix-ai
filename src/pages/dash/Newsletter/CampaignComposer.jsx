import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { 
    Send, 
    ArrowLeft, 
    Layout, 
    Clock, 
    Save, 
    ChevronRight,
    Eye,
    Zap,
    Loader2
} from 'lucide-react';

const CampaignComposer = () => {
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        subject: '',
        content_html: '',
        status: 'draft',
        scheduled_for: ''
    });

    const handleSave = async (status = 'draft') => {
        setSaving(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/newsletters`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, status })
            });
            if (res.ok) {
                navigate('/dash/newsletter');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-black">
                    <Link to="/dash/newsletter" className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-display font-bold text-gray-900">New Campaign</h2>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                            <Link to="/dash" className="hover:text-accent">Dashboard</Link>
                            <ChevronRight size={12} />
                            <Link to="/dash/newsletter" className="hover:text-accent">Newsletter</Link>
                            <ChevronRight size={12} />
                            <span className="text-gray-600">New</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => handleSave('draft')}
                        className="px-6 py-2.5 bg-white border border-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all text-sm"
                    >
                        <Save size={18} className="inline mr-2" /> Save Draft
                    </button>
                    <button 
                        onClick={() => handleSave('sent')}
                        className="px-8 py-2.5 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 text-sm flex items-center gap-2"
                    >
                        <Send size={18} /> Send to All
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Editor Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Subject Line</label>
                            <input 
                                type="text"
                                placeholder="What's your weekly AI insight?"
                                value={formData.subject}
                                onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))}
                                className="w-full text-2xl font-display font-bold text-gray-900 border-none px-0 focus:ring-0 placeholder:text-gray-100"
                            />
                        </div>

                        <div className="space-y-4">
                             <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Content</label>
                             <div className="border border-gray-100 rounded-2xl overflow-hidden min-h-[500px] flex flex-col">
                                <ReactQuill 
                                    theme="snow" 
                                    value={formData.content_html}
                                    onChange={(content) => setFormData(p => ({ ...p, content_html: content }))}
                                    className="flex-grow flex flex-col"
                                    modules={{
                                        toolbar: [
                                            [{ 'header': [1, 2, false] }],
                                            ['bold', 'italic', 'underline', 'strike'],
                                            [{'list': 'ordered'}, {'list': 'bullet'}],
                                            ['link', 'image', 'code-block'],
                                            ['clean']
                                        ],
                                    }}
                                />
                             </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8 text-black">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <h3 className="text-sm font-bold flex items-center gap-2">
                            <Clock size={16} className="text-accent" /> Schedule & Options
                        </h3>
                        
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
                                <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm font-medium">
                                    <option>Weekly Digest</option>
                                    <option>Product Update</option>
                                    <option>Internal Announcement</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Schedule Send</label>
                                <input 
                                    type="datetime-local" 
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm font-medium"
                                />
                            </div>

                            <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl">
                                <p className="text-[10px] text-orange-600 font-bold uppercase mb-1">Warning</p>
                                <p className="text-[10px] text-orange-500 leading-relaxed font-medium">Sending to 152 active subscribers. This action cannot be undone once confirmed.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <h3 className="text-sm font-bold flex items-center gap-2">
                            <Eye size={16} className="text-accent" /> Preview
                        </h3>
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                            <div className="space-y-1">
                                <p className="text-[10px] text-gray-400 font-bold uppercase">From</p>
                                <p className="text-[11px] font-bold">MalikLogix AI Team &lt;malik@maliklogix.com&gt;</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Subject</p>
                                <p className="text-[11px] font-bold">{formData.subject || 'Draft Subject'}</p>
                            </div>
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold rounded-xl text-xs transition-all border border-gray-100">
                             Send Test Email
                        </button>
                    </div>

                    <div className="p-8 bg-accent rounded-3xl shadow-xl shadow-accent/20 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-125 transition-transform"><Zap size={40} /></div>
                        <h4 className="font-bold mb-2">AI Optimization</h4>
                        <p className="text-[10px] text-white/80 leading-relaxed">Let our AI optimize your subject line for better open rates before you send.</p>
                        <button className="mt-4 text-[10px] font-bold underline underline-offset-4 uppercase tracking-widest hover:text-white transition-colors">Analyze Subject</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignComposer;
