import React, { useState, useEffect } from 'react';
import { 
    Puzzle, 
    Layers, 
    Zap, 
    Plus, 
    Search, 
    Edit2, 
    ExternalLink, 
    ChevronRight,
    Loader2,
    ToggleLeft,
    ToggleRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ToolCard = ({ tool }) => {
    const Icon = tool.icon_name === 'Zap' ? Zap : tool.icon_name === 'Puzzle' ? Puzzle : tool.icon_name === 'Layers' ? Layers : Plus;

    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden">
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    tool.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}>
                    {tool.status}
                </span>
            </div>
            
            <div className="space-y-1">
                <h3 className="text-lg font-display font-bold text-gray-900 line-clamp-1">{tool.name}</h3>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{tool.category}</p>
            </div>

            <p className="text-xs text-gray-500 line-clamp-2 mt-4 leading-relaxed">
                {tool.description}
            </p>

            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                <Link 
                    to={`/dash/tools/${tool.id}/edit`}
                    className="flex items-center gap-1.5 text-[11px] font-bold text-accent hover:underline decoration-2 underline-offset-4"
                >
                    <Edit2 size={12} /> Edit Configuration
                </Link>
                <a 
                    href={tool.cta_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-1.5 text-gray-300 hover:text-blue-500 transition-colors"
                >
                    <ExternalLink size={16} />
                </a>
            </div>
        </div>
    );
};

const ToolsManager = () => {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/tools`)
            .then(res => res.json())
            .then(data => {
                setTools(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const filteredTools = tools.filter(t => 
        t.name.toLowerCase().includes(search.toLowerCase()) || 
        t.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative max-w-md w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text"
                        placeholder="Search tools or categories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm"
                    />
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array(4).fill(0).map((_, i) => (
                        <div key={i} className="h-64 bg-white rounded-3xl border border-gray-100 animate-pulse"></div>
                    ))}
                </div>
            ) : filteredTools.length === 0 ? (
                <div className="p-20 text-center bg-white rounded-3xl border border-dashed border-gray-200 text-gray-400 italic">
                    No tools found matching your search.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTools.map(tool => (
                        <ToolCard key={tool.id} tool={tool} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ToolsManager;
