import React, { useState, useEffect } from 'react';
import { 
    Users, 
    Send, 
    Calendar, 
    Mail, 
    TrendingUp, 
    Clock, 
    ChevronRight,
    Loader2,
    Plus,
    Search,
    CheckCircle,
    UserX
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
            <Icon size={24} />
        </div>
        <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</p>
            <p className="text-2xl font-display font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

const NewsletterList = () => {
    const [stats, setStats] = useState({ totalSubscribers: 0, campaignsSent: 0 });
    const [subscribers, setSubscribers] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('campaigns'); // 'campaigns' or 'subscribers'
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, subRes, campRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/stats/newsletters`),
                    fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/subscribers`),
                    fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/newsletters`)
                ]);
                
                setStats(await statsRes.json());
                setSubscribers(await subRes.json());
                setCampaigns(await campRes.json());
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredSubscribers = subscribers.filter(s => 
        s.email.toLowerCase().includes(search.toLowerCase()) || 
        (s.name && s.name.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="space-y-8 pb-10">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Total Subscribers" value={stats.totalSubscribers} icon={Users} color="bg-blue-50 text-blue-500" />
                <StatCard label="Campaigns Sent" value={stats.campaignsSent} icon={Send} color="bg-green-50 text-green-500" />
                <StatCard label="Monthly Growth" value="+12%" icon={TrendingUp} color="bg-accent/10 text-accent" />
            </div>

            {/* Content Sidebar/Tabs */}
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center bg-white p-1 rounded-2xl border border-gray-100 w-fit">
                        <button 
                            onClick={() => { setTab('campaigns'); setSearch(''); }}
                            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${tab === 'campaigns' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            Campaigns
                        </button>
                        <button 
                            onClick={() => { setTab('subscribers'); setSearch(''); }}
                            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${tab === 'subscribers' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            Subscribers
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input 
                                type="text"
                                placeholder={`Search ${tab}...`}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-xs w-64"
                            />
                        </div>
                        <Link to="/dash/newsletter/new" className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all text-xs">
                            <Plus size={16} /> New Campaign
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center min-h-[300px] bg-white rounded-3xl border border-gray-100"><Loader2 className="animate-spin text-accent" /></div>
                ) : tab === 'campaigns' ? (
                    /* Campaigns List */
                    <div className="grid grid-cols-1 gap-4">
                        {campaigns.length === 0 ? (
                            <div className="p-20 text-center bg-white rounded-3xl border border-dashed border-gray-200 text-gray-400 italic">No campaigns found.</div>
                        ) : campaigns.map(camp => (
                            <div key={camp.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-accent/30 transition-all group">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 group-hover:text-accent transition-colors">{camp.subject}</h3>
                                        <div className="flex items-center gap-4 mt-1">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                                camp.status === 'sent' ? 'bg-green-100 text-green-600' : camp.status === 'scheduled' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'
                                            }`}>
                                                {camp.status}
                                            </span>
                                            <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                                <Clock size={12} /> {camp.sent_at ? format(new Date(camp.sent_at), 'MMM dd, yyyy') : 'No date'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-gray-900">{camp.recipient_count || 0}</p>
                                        <p className="text-[10px] text-gray-400 uppercase font-mono">RECIPIENTS</p>
                                    </div>
                                    <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-accent rounded-xl transition-colors">
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Subscribers List */
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Subscriber</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Source</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Joined Date</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredSubscribers.map(sub => (
                                    <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-[10px] font-bold">
                                                    {sub.email.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{sub.name || 'Anonymous'}</p>
                                                    <p className="text-xs text-gray-400">{sub.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-black">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${sub.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                {sub.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-xs text-gray-500">{sub.source || 'Website'}</td>
                                        <td className="px-8 py-5 text-xs text-gray-400 font-mono">
                                            {format(new Date(sub.created_at), 'MMM dd, yyyy')}
                                        </td>
                                        <td className="px-8 py-5 text-black">
                                            {sub.status === 'active' ? (
                                                <button className="p-2 text-gray-300 hover:text-red-500 transition-colors" title="Unsubscribe">
                                                    <UserX size={16} />
                                                </button>
                                            ) : (
                                                <button className="p-2 text-gray-300 hover:text-green-500 transition-colors" title="Resubscribe">
                                                    <CheckCircle size={16} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsletterList;
