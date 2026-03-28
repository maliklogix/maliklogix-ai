import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, 
    ChevronRight, 
    Mail, 
    Globe, 
    Wrench, 
    Clock, 
    Send,
    MessageSquare,
    CheckSquare,
    Trash2,
    Loader2,
    Star,
    ExternalLink
} from 'lucide-react';
import { format } from 'date-fns';

const LeadDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [reply, setReply] = useState('');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/leads/${id}`)
            .then(res => res.json())
            .then(data => {
                setLead(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleUpdateStatus = async (newStatus) => {
        setUpdating(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/leads/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...lead, status: newStatus })
            });
            if (res.ok) {
                setLead(prev => ({ ...prev, status: newStatus }));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="animate-spin text-accent" size={32} /></div>;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-black">
                    <Link to="/dash/leads" className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-display font-bold text-gray-900">{lead?.name}</h2>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                            <Link to="/dash" className="hover:text-accent">Dashboard</Link>
                            <ChevronRight size={12} />
                            <Link to="/dash/leads" className="hover:text-accent">Leads</Link>
                            <ChevronRight size={12} />
                            <span className="text-gray-600">Details</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => handleUpdateStatus('qualified')}
                        className="px-5 py-2.5 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all text-xs flex items-center gap-2"
                    >
                        <CheckSquare size={16} /> Mark Qualified
                    </button>
                    <button 
                        className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100"
                        title="Delete Lead"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Lead Data */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full" />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Contact Details</label>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400"><Mail size={18} /></div>
                                            <span className="text-sm font-bold text-gray-900">{lead?.email}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400"><Globe size={18} /></div>
                                            <span className="text-sm font-bold text-gray-900">{lead?.country}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Interest & Source</label>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400"><Wrench size={18} /></div>
                                            <span className="text-sm font-bold text-gray-900">{lead?.service}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400"><ArrowUpRight size={18} /></div>
                                            <span className="text-sm font-bold text-gray-900">{lead?.source}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] block mb-4">Original Message</label>
                                <p className="text-gray-600 text-sm italic leading-relaxed">
                                    "{lead?.message}"
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Timeline & Reply */}
                    <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm space-y-8 text-black">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-display font-bold flex items-center gap-2">
                                <MessageSquare className="text-accent" size={20} /> Communication History
                            </h3>
                            <span className="text-[10px] font-mono font-bold text-gray-300">SYSTEM LOG</span>
                        </div>

                        <div className="space-y-6 pt-4">
                            <div className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 bg-accent/10 text-accent rounded-full flex items-center justify-center"><Star size={14} /></div>
                                <div>
                                    <div className="text-sm font-bold">Inquiry received</div>
                                    <div className="text-xs text-gray-400">{format(new Date(lead?.created_at), 'MMM dd, yyyy HH:mm')}</div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-50 space-y-4">
                            <label className="text-sm font-bold text-gray-900">Send Quick Reply</label>
                            <textarea 
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                placeholder="Type your reply to send via email..."
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-6 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                                rows="4"
                            />
                            <div className="flex justify-end">
                                <button className="flex items-center gap-2 px-8 py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 text-sm">
                                    <Send size={18} /> Send Email
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Sidebar Info */}
                <div className="space-y-8 text-black">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Lead Status</h3>
                        
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase">Status</label>
                                <select 
                                    value={lead?.status}
                                    onChange={(e) => handleUpdateStatus(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm font-bold"
                                >
                                    <option value="new">New Inquiry</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="qualified">Qualified</option>
                                    <option value="closed">Closed / Won</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase">Priority</label>
                                <select 
                                    value={lead?.priority}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm font-bold"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase">Owner</label>
                                <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium flex items-center gap-2">
                                    <div className="w-6 h-6 bg-accent rounded-full text-[10px] font-bold text-white flex items-center justify-center">MF</div>
                                    Malik Farooq
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link to="/contact" className="flex items-center justify-between p-6 bg-[#0f1117] text-white rounded-3xl shadow-xl shadow-accent/10 group">
                        <div className="space-y-1">
                            <p className="text-[10px] text-accent font-bold uppercase tracking-[0.2em]">Public Preview</p>
                            <p className="text-sm font-bold">Contact Page</p>
                        </div>
                        <ExternalLink size={20} className="text-gray-500 group-hover:text-accent transition-colors" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LeadDetail;
