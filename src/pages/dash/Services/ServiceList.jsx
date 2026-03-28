import React, { useState, useEffect } from 'react';
import { 
    Wrench, 
    Edit2, 
    ExternalLink, 
    Clock, 
    CheckCircle, 
    AlertCircle,
    LayoutGrid,
    Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StatusBadge = ({ status }) => (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
        status === 'published' ? 'bg-green-100 text-green-600 border-green-200' : 'bg-yellow-100 text-yellow-600 border-yellow-200'
    }`}>
        {status === 'published' ? <CheckCircle size={10} /> : <AlertCircle size={10} />}
        {status}
    </span>
);

const ServiceCard = ({ service }) => (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
        <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                <Wrench size={24} />
            </div>
            <StatusBadge status={service.status} />
        </div>
        
        <div className="space-y-1">
            <h3 className="text-lg font-display font-bold text-gray-900 line-clamp-1">{service.title}</h3>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{service.group_name}</p>
        </div>

        <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium italic">
                <Clock size={12} />
                Last edit: {new Date(service.updated_at).toLocaleDateString()}
            </div>
            <div className="flex gap-2">
                <Link 
                    to={`/dash/services/${service.slug}/edit`}
                    className="p-2 bg-gray-50 text-gray-400 hover:text-accent hover:bg-accent/5 rounded-xl transition-colors"
                    title="Edit Service"
                >
                    <Edit2 size={16} />
                </Link>
                <a 
                    href={`/services/${service.slug}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 bg-gray-50 text-gray-400 hover:text-blue-500 hover:bg-blue-500/5 rounded-xl transition-colors"
                    title="Preview Page"
                >
                    <ExternalLink size={16} />
                </a>
            </div>
        </div>
    </div>
);

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/services`)
            .then(res => res.json())
            .then(data => {
                setServices(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const filteredServices = services.filter(s => 
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.group_name.toLowerCase().includes(search.toLowerCase())
    );

    const grouped = filteredServices.reduce((acc, curr) => {
        if (!acc[curr.group_name]) acc[curr.group_name] = [];
        acc[curr.group_name].push(curr);
        return acc;
    }, {});

    return (
        <div className="space-y-10">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative max-w-md w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text"
                        placeholder="Search services or categories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm"
                    />
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                    {Array(6).fill(0).map((_, i) => (
                        <div key={i} className="h-48 bg-white rounded-3xl border border-gray-100"></div>
                    ))}
                </div>
            ) : Object.keys(grouped).length === 0 ? (
                <div className="p-20 text-center bg-white rounded-3xl border border-dashed border-gray-200 text-gray-400 italic">
                    No service pages found.
                </div>
            ) : (
                Object.entries(grouped).map(([group, items]) => (
                    <section key={group} className="space-y-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-[0.2em]">{group}</h2>
                            <div className="h-px flex-grow bg-gray-100"></div>
                            <span className="text-[10px] font-mono font-bold text-gray-400">{items.length} PAGES</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.map(service => (
                                <ServiceCard key={service.slug} service={service} />
                            ))}
                        </div>
                    </section>
                ))
            )}
        </div>
    );
};

export default ServiceList;
