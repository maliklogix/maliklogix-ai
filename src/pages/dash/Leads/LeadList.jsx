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
    Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const StatusPill = ({ status }) => {
    const styles = {
        new: 'bg-red-100 text-red-600 border-red-200',
        contacted: 'bg-yellow-100 text-yellow-600 border-yellow-200',
        qualified: 'bg-green-100 text-green-600 border-green-200',
        closed: 'bg-gray-100 text-gray-600 border-gray-200'
    };

    return (
        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${styles[status]}`}>
            {status}
        </span>
    );
};

const PriorityPill = ({ priority }) => {
    const styles = {
        low: 'text-gray-400',
        medium: 'text-blue-500',
        high: 'text-orange-500',
        urgent: 'text-red-500 font-bold'
    };

    return (
        <span className={`text-[10px] uppercase font-bold tracking-widest ${styles[priority]}`}>
            {priority}
        </span>
    );
};

const LeadCard = ({ lead }) => (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold">
                    {lead.name.charAt(0)}
                </div>
                <div>
                    <h3 className="text-sm font-bold text-gray-900 leading-none">{lead.name}</h3>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase font-mono tracking-wider">{lead.source}</p>
                </div>
            </div>
            <StatusPill status={lead.status} />
        </div>

        <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-xs text-gray-500">
                <Mail size={12} className="text-gray-300" />
                {lead.email}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
                <Globe size={12} className="text-gray-300" />
                {lead.country}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
                <Wrench size={12} className="text-gray-300" />
                {lead.service}
            </div>
        </div>

        <div className="p-4 bg-gray-50/50 rounded-2xl mb-6">
            <p className="text-xs text-gray-600 line-clamp-2 italic leading-relaxed">
                "{lead.message}"
            </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
            <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
                <Clock size={12} />
                {formatDistanceToNow(new Date(lead.created_at))} ago
            </div>
            <Link 
                to={`/dash/leads/${lead.id}`}
                className="flex items-center gap-1 text-[11px] font-bold text-accent hover:underline decoration-2 underline-offset-4"
            >
                View Details <ArrowUpRight size={14} />
            </Link>
        </div>
    </div>
);

const LeadList = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/api/admin/leads')
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
        const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase()) || 
                              l.email.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const counts = {
        all: leads.length,
        new: leads.filter(l => l.status === 'new').length,
        contacted: leads.filter(l => l.status === 'contacted').length,
        qualified: leads.filter(l => l.status === 'qualified').length,
        closed: leads.filter(l => l.status === 'closed').length,
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Tabs */}
                <div className="flex items-center bg-white p-1.5 rounded-2xl border border-gray-100 w-fit overflow-x-auto whitespace-nowrap">
                    {Object.entries(counts).map(([key, count]) => (
                        <button
                            key={key}
                            onClick={() => setFilter(key)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all flex items-center gap-2 ${
                                filter === key ? 'bg-accent text-white shadow-lg shadow-accent/10' : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            {key}
                            <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${filter === key ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`}>
                                {count}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="relative max-w-md w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text"
                        placeholder="Search leads by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm"
                    />
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array(6).fill(0).map((_, i) => (
                        <div key={i} className="h-64 bg-white rounded-3xl border border-gray-100 animate-pulse"></div>
                    ))}
                </div>
            ) : filteredLeads.length === 0 ? (
                <div className="p-20 text-center bg-white rounded-3xl border border-dashed border-gray-200 text-gray-400 italic">
                    No leads found matching this criteria.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredLeads.map(lead => (
                        <LeadCard key={lead.id} lead={lead} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default LeadList;
