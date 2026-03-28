import React, { useState, useEffect } from 'react';
import { 
    Mail, 
    User, 
    Globe, 
    Wrench, 
    Clock, 
    ChevronRight, 
    Search,
    MessageSquare,
    Phone,
    ArrowUpRight,
    Loader2,
    MoreHorizontal,
    Star,
    Trash2,
    CheckCircle2,
    Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const StatusBadge = ({ status }) => {
    const colors = {
        new: 'bg-red-500',
        contacted: 'bg-yellow-500',
        qualified: 'bg-green-500',
        closed: 'bg-gray-400'
    };
    return <span className={`w-2 h-2 rounded-full ${colors[status] || 'bg-gray-300'}`} />;
};

const LeadList = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [selectedLeads, setSelectedLeads] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/leads`)
            .then(res => res.json())
            .then(data => {
                setLeads(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const filteredLeads = leads.filter(l => {
        const matchesFilter = filter === 'all' || l.status === filter;
        const matchesSearch = 
            l.name?.toLowerCase().includes(search.toLowerCase()) || 
            l.email?.toLowerCase().includes(search.toLowerCase()) ||
            l.message?.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const toggleSelect = (id) => {
        setSelectedLeads(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleDeleteSelected = async () => {
        if (!selectedLeads.length || !window.confirm(`Are you sure you want to delete ${selectedLeads.length} leads?`)) return;
        
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/leads/batch-delete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids: selectedLeads })
            });
            if (res.ok) {
                setLeads(prev => prev.filter(l => !selectedLeads.includes(l.id)));
                setSelectedLeads([]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleTogglePriority = async (id, currentPriority) => {
        const newPriority = currentPriority === 'high' ? 'medium' : 'high';
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/leads/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priority: newPriority })
            });
            if (res.ok) {
                setLeads(prev => prev.map(l => l.id === id ? { ...l, priority: newPriority } : l));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const tabs = [
        { id: 'all', label: 'All Leads', icon: <Mail size={16} /> },
        { id: 'new', label: 'New', icon: <Filter size={16} /> },
        { id: 'contacted', label: 'Contacted', icon: <MessageSquare size={16} /> },
        { id: 'qualified', label: 'Qualified', icon: <CheckCircle2 size={16} /> },
    ];

    return (
        <div className="flex flex-col h-full space-y-4">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="relative flex-grow max-w-xl w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text"
                        placeholder="Search in leads..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-accent/10 transition-all text-sm"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
                        <Star size={18} />
                    </button>
                    <button 
                        onClick={handleDeleteSelected}
                        disabled={!selectedLeads.length}
                        className={`p-2 rounded-lg transition-colors ${selectedLeads.length ? 'text-red-500 hover:bg-red-50' : 'text-gray-200 cursor-not-allowed'}`}
                    >
                        <Trash2 size={18} />
                    </button>
                    <div className="h-6 w-px bg-gray-100 mx-1"></div>
                    <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
                        <MoreHorizontal size={18} />
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[600px]">
                {/* Labels Sidebar */}
                <div className="w-full lg:w-64 shrink-0 space-y-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setFilter(tab.id)}
                            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-r-full text-sm font-medium transition-all ${
                                filter === tab.id 
                                ? 'bg-accent/10 text-accent font-bold' 
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                {tab.icon}
                                {tab.label}
                            </div>
                            <span className="text-[11px] font-mono opacity-60">
                                {leads.filter(l => tab.id === 'all' || l.status === tab.id).length}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Inbox List */}
                <div className="flex-grow bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-gray-50 flex items-center gap-4 text-gray-400">
                        <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-accent focus:ring-accent"
                            onChange={(e) => {
                                if (e.target.checked) setSelectedLeads(filteredLeads.map(l => l.id));
                                else setSelectedLeads([]);
                            }}
                        />
                        <span className="text-xs font-bold uppercase tracking-widest px-2">Messages</span>
                    </div>

                    <div className="flex-grow overflow-y-auto overflow-x-hidden">
                        {loading ? (
                            <div className="flex items-center justify-center p-20">
                                <Loader2 className="animate-spin text-accent" size={32} />
                            </div>
                        ) : filteredLeads.length === 0 ? (
                            <div className="p-20 text-center space-y-4">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                                    <Mail size={32} />
                                </div>
                                <p className="text-gray-400 italic text-sm">No conversations found here.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {filteredLeads.map((lead) => (
                                    <div 
                                        key={lead.id}
                                        className={`group flex items-center gap-4 px-4 py-3 hover:shadow-lg transition-all border-l-4 ${
                                            lead.status === 'new' ? 'border-accent bg-accent/[0.02]' : 'border-transparent hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4 shrink-0">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedLeads.includes(lead.id)}
                                                onChange={() => toggleSelect(lead.id)}
                                                className="rounded border-gray-300 text-accent focus:ring-accent"
                                            />
                                            <button 
                                                onClick={() => handleTogglePriority(lead.id, lead.priority)}
                                                className="text-gray-300 hover:text-yellow-400 transition-colors"
                                            >
                                                <Star size={18} fill={lead.priority === 'high' ? 'currentColor' : 'none'} className={lead.priority === 'high' ? 'text-yellow-400' : ''} />
                                            </button>
                                        </div>

                                        <Link to={`/dash/leads/${lead.id}`} className="flex-grow flex items-center gap-4 overflow-hidden">
                                            <div className={`w-48 shrink-0 text-sm truncate ${lead.status === 'new' ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                                                {lead.name}
                                            </div>

                                            <div className="flex-grow flex items-center gap-3 overflow-hidden">
                                                <span className={`text-sm truncate ${lead.status === 'new' ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                                                    {lead.message || '(No message)'}
                                                </span>
                                                <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <StatusBadge status={lead.status} />
                                                    <span className="text-[10px] text-gray-400 font-mono hidden md:block uppercase bg-gray-50 px-2 py-0.5 rounded">
                                                        {lead.service || 'Lead'}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>

                                        <div className="shrink-0 text-xs text-gray-400 font-medium px-4">
                                            {format(new Date(lead.created_at), 'MMM d')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-gray-50 text-[10px] text-gray-400 font-mono uppercase tracking-widest flex justify-between">
                        <span>{filteredLeads.length} total conversations</span>
                        <span>MalikLogix CRM v1.0</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadList;
