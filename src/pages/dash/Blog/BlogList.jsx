import React, { useState, useEffect } from 'react';
import { 
    Search, 
    Plus, 
    Filter, 
    MoreHorizontal, 
    ExternalLink, 
    Edit3, 
    Trash2,
    CheckCircle,
    FileEdit,
    Archive
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import { useToast } from '../../../components/dash/Toast';

const StatusBadge = ({ status }) => {
    const styles = {
        published: 'bg-green-100 text-green-600 border-green-200',
        draft: 'bg-yellow-100 text-yellow-600 border-yellow-200',
        archived: 'bg-gray-100 text-gray-600 border-gray-200'
    };
    
    const icons = {
        published: <CheckCircle size={12} />,
        draft: <FileEdit size={12} />,
        archived: <Archive size={12} />
    };

    return (
        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${styles[status] || styles.draft}`}>
            {icons[status] || icons.draft}
            {status}
        </span>
    );
};

const BlogList = () => {
    const { showToast } = useToast();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = () => {
        setLoading(true);
        fetch('http://localhost:3001/api/admin/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                showToast('Failed to load posts', 'error');
                setLoading(false);
            });
    };

    const handleDelete = async (id, title) => {
        if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

        try {
            const res = await fetch(`http://localhost:3001/api/admin/posts/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                showToast('Post deleted successfully');
                loadPosts();
            } else {
                throw new Error('Failed to delete');
            }
        } catch (error) {
            showToast('Error deleting post', 'error');
        }
    };

    const sortedPosts = [...posts].sort((a, b) => {
        const dateA = new Date(a.published_at || a.created_at);
        const dateB = new Date(b.published_at || b.created_at);
        return dateB - dateA; // Newest first
    });

    const filteredPosts = sortedPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' || post.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            {/* Header / Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-grow max-w-xl">
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search posts..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm"
                        />
                    </div>
                    <div className="relative">
                        <select 
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm font-medium text-gray-600 cursor-pointer"
                        >
                            <option value="all">All Posts</option>
                            <option value="published">Published</option>
                            <option value="draft">Drafts</option>
                            <option value="archived">Archived</option>
                        </select>
                        <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                    </div>
                </div>
                
                <Link to="/dash/blog/new" className="flex items-center justify-center gap-2 px-6 py-2.5 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 text-sm whitespace-nowrap">
                    <Plus size={18} /> New Post
                </Link>
            </div>

            {/* Table Area */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Author</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="6" className="px-8 py-6 h-20 bg-gray-50/30"></td>
                                    </tr>
                                ))
                            ) : filteredPosts.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-20 text-center text-gray-400 italic">No posts found matching your criteria.</td>
                                </tr>
                            ) : filteredPosts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-gray-900 group-hover:text-accent transition-colors line-clamp-1">{post.title}</span>
                                            <span className="text-xs text-gray-400 mt-1 font-mono">/blog/{post.slug}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-xs font-medium text-gray-600 px-2 py-1 bg-gray-100 rounded-md">
                                            {post.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <StatusBadge status={post.status} />
                                    </td>
                                    <td className="px-6 py-5 text-sm text-gray-600">{post.author_name}</td>
                                    <td className="px-6 py-5 text-sm text-gray-500 whitespace-nowrap">
                                        {post.published_at ? format(new Date(post.published_at), 'MMM dd, yyyy') : format(new Date(post.created_at), 'MMM dd, yyyy')}
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link 
                                                to={`/dash/blog/${post.id}/edit`} 
                                                className="p-2 text-gray-400 hover:text-accent hover:bg-accent/5 rounded-lg transition-all"
                                                title="Edit Post"
                                            >
                                                <Edit3 size={16} />
                                            </Link>
                                            <a 
                                                href={`/blog/${post.slug}`} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-500/5 rounded-lg transition-all"
                                                title="View Live"
                                            >
                                                <ExternalLink size={16} />
                                            </a>
                                            <button 
                                                onClick={() => handleDelete(post.id, post.title)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50/5 rounded-lg transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination Placeholder */}
                <div className="px-8 py-5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-medium bg-gray-50/30">
                    <div>Showing {filteredPosts.length} of {posts.length} posts</div>
                    <div className="flex gap-2">
                        <button disabled className="px-3 py-1 bg-white border border-gray-200 rounded-md opacity-50">Prev</button>
                        <button disabled className="px-3 py-1 bg-white border border-gray-200 rounded-md opacity-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogList;
