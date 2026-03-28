import React, { useState, useEffect } from 'react';
import { 
    Users, 
    FileText, 
    TrendingUp, 
    TrendingDown, 
    Plus, 
    Mail, 
    ArrowRight,
    Search,
    Wrench,
    Settings,
    Inbox,
    Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, subtext, trend, trendValue, icon: Icon }) => (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                <Icon size={24} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {trendValue}
            </div>
        </div>
        <div>
            <span className="text-sm font-medium text-gray-500">{title}</span>
            <div className="text-3xl font-display font-bold text-gray-900 mt-1">{value}</div>
            <p className="text-xs text-gray-400 mt-2">{subtext}</p>
        </div>
    </div>
);

const ActivityItem = ({ title, time, icon: Icon, color }) => (
    <div className="flex items-center gap-4 py-4 first:pt-0 last:pb-0 border-b last:border-0 border-gray-50 group">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${color} group-hover:scale-110 transition-transform`}>
            <Icon size={18} />
        </div>
        <div className="flex-grow">
            <div className="text-sm font-bold text-gray-900 leading-none">{title}</div>
            <div className="text-xs text-gray-500 mt-1">{time}</div>
        </div>
        <button className="text-gray-300 hover:text-accent transition-colors">
            <ArrowRight size={16} />
        </button>
    </div>
);

const DashOverview = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/stats`)
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="animate-spin text-accent" size={32} /></div>;

    return (
        <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Blog Posts" 
                    value={stats?.posts || 0} 
                    subtext="Published articles" 
                    trend="up" 
                    trendValue="12.5%" 
                    icon={FileText} 
                />
                <StatCard 
                    title="Subscribers" 
                    value={stats?.subscribers || 0} 
                    subtext="Active emails" 
                    trend="up" 
                    trendValue="8.2%" 
                    icon={Users} 
                />
                <StatCard 
                    title="Open Leads" 
                    value={stats?.openLeads || 0} 
                    subtext="Pending follow-up" 
                    trend="down" 
                    trendValue="4.5%" 
                    icon={Inbox} 
                />
                <StatCard 
                    title="Services" 
                    value={stats?.services || 0} 
                    subtext="Managed pages" 
                    trend="up" 
                    trendValue="0%" 
                    icon={Wrench} 
                />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/dash/blog/new" className="flex items-center justify-center gap-3 p-4 border-2 border-dashed border-accent/20 rounded-2xl text-accent font-bold hover:bg-accent hover:text-white hover:border-accent transition-all duration-300">
                    <Plus size={20} /> New Blog Post
                </Link>
                <Link to="/dash/newsletter/new" className="flex items-center justify-center gap-3 p-4 border-2 border-dashed border-accent/20 rounded-2xl text-accent font-bold hover:bg-accent hover:text-white hover:border-accent transition-all duration-300">
                    <Mail size={20} /> Send Newsletter
                </Link>
                <Link to="/dash/leads" className="flex items-center justify-center gap-3 p-4 border-2 border-dashed border-accent/20 rounded-2xl text-accent font-bold hover:bg-accent hover:text-white hover:border-accent transition-all duration-300">
                    <Inbox size={20} /> View New Leads
                </Link>
                <Link to="/dash/seo" className="flex items-center justify-center gap-3 p-4 border-2 border-dashed border-accent/20 rounded-2xl text-accent font-bold hover:bg-accent hover:text-white hover:border-accent transition-all duration-300">
                    <Settings size={20} /> SEO Settings
                </Link>
            </div>

            {/* Activity Feed */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h2 className="text-xl font-display font-bold text-gray-900 mb-8 flex items-center gap-3">
                    Recent Activity
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full uppercase tracking-wider">LIVE FEED</span>
                </h2>
                <div className="space-y-2">
                    <ActivityItem 
                        title="Blog post published: AI Campaign Management Guide" 
                        time="2 hours ago" 
                        icon={FileText} 
                        color="bg-blue-500" 
                    />
                    <ActivityItem 
                        title="New lead from contact form: Sarah K., USA" 
                        time="5 hours ago" 
                        icon={Inbox} 
                        color="bg-teal-500" 
                    />
                    <ActivityItem 
                        title="Newsletter sent to active subscribers" 
                        time="Yesterday" 
                        icon={Mail} 
                        color="bg-purple-500" 
                    />
                    <ActivityItem 
                        title="Service page updated: n8n Automation" 
                        time="2 days ago" 
                        icon={Wrench} 
                        color="bg-orange-500" 
                    />
                </div>
                <button className="w-full text-center mt-10 text-sm font-bold text-gray-300 cursor-not-allowed">
                    View Full Activity Log &rarr;
                </button>
            </div>
        </div>
    );
};

export default DashOverview;
