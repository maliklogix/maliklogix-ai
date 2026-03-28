import React, { useState, useEffect, useRef } from 'react';
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
    Archive,
    ChevronLeft,
    ChevronRight,
    Tally5
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
    const [currentPage, setCurrentPage] = useState(1);
    const POSTS_PER_PAGE = 30;
    const topRef = useRef(null);

    useEffect(() => {
        loadPosts();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        topRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const loadPosts = () => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/posts`)
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
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/posts/${id}`, {
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
        const titleMatch = post.title?.toLowerCase().includes(search.toLowerCase());
        const categoryMatch = post.category?.toLowerCase().includes(search.toLowerCase());
        const authorMatch = post.author_name?.toLowerCase().includes(search.toLowerCase());
        const matchesSearch = titleMatch || categoryMatch || authorMatch;
        const matchesFilter = filter === 'all' || post.status === filter;
        return matchesSearch && matchesFilter;
    });

    // Pagination Calculation
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

    const tabs = [
        { id: 'all', label: 'All Posts' },
        { id: 'published', label: 'Published' },
        { id: 'draft', label: 'Drafts' },
        { id: 'archived', label: 'Archived' },
    ];

    const counts = {
        all: posts.length,
        published: posts.filter(p => p.status === 'published').length,
        draft: posts.filter(p => p.status === 'draft').length,
        archived: posts.filter(p => p.status === 'archived').length,
    };

    return (
        <div className="space-y-8 pb-10">
            <div ref={topRef} className="scroll-mt-40" />
            
            {/* Header / Actions Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm shadow-black/5">
                <div className="space-y-1">
                    <h2 className="text-2xl font-display font-black text-gray-900 tracking-tight">Blog Repository</h2>
                    <p className="text-xs text-gray-400 font-medium">Manage your articles, drafts and archives</p>
                </div>
                
                <Link to="/dash/blog/new" className="flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-white font-bold rounded-2xl hover:bg-accent/90 transition-all shadow-xl shadow-accent/20 text-sm whitespace-nowrap">
                    <Plus size={20} />
                    Create New Article
                </Link>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center bg-gray-50/50 p-1.5 rounded-2xl border border-gray-100 w-fit overflow-x-auto whitespace-nowrap scrollbar-hide shadow-inner">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setFilter(tab.id); setCurrentPage(1); }}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                                filter === tab.id 
                                ? 'bg-white text-accent shadow-lg shadow-black/5 ring-1 ring-gray-100' 
                                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100/50'
                            }`}
                        >
                            {tab.label}
                            <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                                filter === tab.id ? 'bg-accent/10 text-accent' : 'bg-gray-200/50 text-gray-500'
                            }`}>
                                {counts[tab.id]}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="relative flex-grow max-w-xl">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search articles by title, category, author..." 
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-14 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all text-sm shadow-sm shadow-black/5"
                    />
                </div>
            </div>

            {/* Content Table Area */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-black/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-gray-50/40 border-b border-gray-50">
                                <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-10">Article Detail</th>
                                <th className="px-6 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">In Category</th>
                                <th className="px-6 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-6 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Author</th>
                                <th className="px-6 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Posted Date</th>
                                <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right pr-10">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50/60">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="6" className="px-8 py-7"><div className="h-6 bg-gray-50 rounded-lg w-3/4"></div></td>
                                    </tr>
                                ))
                            ) : filteredPosts.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-24 text-center">
                                        <div className="max-w-xs mx-auto space-y-3">
                                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                                                <Tally5 size={32} />
                                            </div>
                                            <p className="text-gray-400 italic text-sm">No blog posts match your criteria.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : currentPosts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50/40 transition-colors group">
                                    <td className="px-8 py-5 pl-10">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-bold text-gray-900 group-hover:text-accent transition-colors truncate max-w-md">{post.title}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-gray-400 font-mono">/blog/{post.slug}</span>
                                                <Link to={`/blog/${post.slug}`} target="_blank" className="opacity-0 group-hover:opacity-100 transition-opacity"><ExternalLink size={10} className="text-accent" /></Link>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="text-[10px] font-bold text-gray-500 px-3 py-1 bg-gray-100/60 rounded-lg border border-gray-100 uppercase tracking-wider">
                                            {post.category || 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-center flex justify-center mt-1.5">
                                        <StatusBadge status={post.status} />
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-400">
                                                {post.author_name?.charAt(0) || 'A'}
                                            </div>
                                            <span className="text-xs font-medium text-gray-600">{post.author_name || 'Admin'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center text-[11px] font-mono text-gray-400">
                                        {post.published_at ? format(new Date(post.published_at), 'MM/dd/yyyy') : format(new Date(post.created_at), 'MM/dd/yyyy')}
                                    </td>
                                    <td className="px-8 py-5 text-right pr-10">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link 
                                                to={`/dash/blog/${post.id}/edit`} 
                                                className="p-2 text-gray-400 hover:text-accent hover:bg-accent/5 rounded-xl transition-all"
                                                title="Edit Entry"
                                            >
                                                <Edit3 size={16} />
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(post.id, post.title)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50/5 rounded-xl transition-all"
                                                title="Delete Post"
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
                
                {/* Pagination Controls */}
                {!loading && filteredPosts.length > 0 && (
                    <div className="px-10 py-6 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 font-medium bg-gray-50/10">
                        <div className="flex items-center gap-4">
                            <span>Showing <b>{indexOfFirstPost + 1}</b> to <b>{Math.min(indexOfLastPost, filteredPosts.length)}</b> of {filteredPosts.length} posts</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-100 rounded-lg hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-gray-100 disabled:hover:text-gray-400 transition-all font-bold shadow-sm"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-8 h-8 rounded-lg font-bold transition-all shadow-sm ${
                                        currentPage === page 
                                        ? 'bg-accent text-white border border-accent shadow-accent/20' 
                                        : 'bg-white border border-gray-100 text-gray-400 hover:border-accent hover:text-accent'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button 
                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-100 rounded-lg hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-gray-100 disabled:hover:text-gray-400 transition-all font-bold shadow-sm"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogList;
