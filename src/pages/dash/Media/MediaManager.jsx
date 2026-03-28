import React, { useState, useEffect } from 'react';
import { 
    Image as ImageIcon, 
    Upload, 
    Trash2, 
    Link as LinkIcon, 
    ExternalLink, 
    Check, 
    Search,
    AlertCircle,
    FileIcon,
    X,
    FolderOpen,
    Clipboard
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '../../../components/dash/Toast';

const MediaManager = () => {
    const { showToast } = useToast();
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState('');
    const [view, setView] = useState('grid'); // or 'list'
    const [copyId, setCopyId] = useState(null);

    useEffect(() => {
        loadMedia();
    }, []);

    const loadMedia = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/media`);
            const data = await res.json();
            setMedia(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (error) {
            console.error('Failed to load media:', error);
            showToast('Failed to load media libary', 'error');
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/upload`, {
                method: 'POST',
                body: formData
            });
            if (res.ok) {
                showToast('Media uploaded successfully!');
                loadMedia();
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            showToast('Failed to upload media', 'error');
        } finally {
            setUploading(false);
            e.target.value = null; // Reset input
        }
    };

    const handleDelete = async (filename) => {
        if (!window.confirm('Are you sure you want to delete this file? This cannot be undone.')) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/media/${filename}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                showToast('File deleted successfully');
                loadMedia();
            } else {
                throw new Error('Delete failed');
            }
        } catch (error) {
            showToast('Failed to delete file', 'error');
        }
    };

    const copyToClipboard = (url, name) => {
        navigator.clipboard.writeText(url);
        setCopyId(name);
        showToast('Link copied to clipboard!');
        setTimeout(() => setCopyId(null), 2000);
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const filteredMedia = media.filter(m => 
        m.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm shadow-black/5">
                <div className="space-y-1">
                    <h2 className="text-2xl font-display font-black text-gray-900 tracking-tight">Media Library</h2>
                    <p className="text-xs text-gray-400 font-medium font-mono">Manage all your uploaded assets</p>
                </div>
                
                <label className={`
                    flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-white font-bold rounded-2xl 
                    hover:bg-accent/90 transition-all cursor-pointer shadow-xl shadow-accent/20 text-sm whitespace-nowrap
                    ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
                `}>
                    <Upload size={20} className={uploading ? 'animate-bounce' : ''} />
                    {uploading ? 'Uploading...' : 'Upload New Media'}
                    <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} accept="image/*" />
                </label>
            </div>

            {/* Controls Row */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search media by filename..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-14 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all text-sm shadow-sm"
                    />
                </div>
                
                <div className="flex items-center gap-2 bg-gray-50/50 p-1 rounded-2xl border border-gray-100 w-fit">
                    <button 
                        onClick={() => setView('grid')}
                        className={`p-2.5 rounded-xl transition-all ${view === 'grid' ? 'bg-white text-accent shadow-sm' : 'text-gray-400'}`}
                    >
                        <ImageIcon size={20} />
                    </button>
                    <button 
                        onClick={() => setView('list')}
                        className={`p-2.5 rounded-xl transition-all ${view === 'list' ? 'bg-white text-accent shadow-sm' : 'text-gray-400'}`}
                    >
                        <FolderOpen size={20} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {Array(10).fill(0).map((_, i) => (
                        <div key={i} className="aspect-square bg-gray-50 rounded-3xl animate-pulse" />
                    ))}
                </div>
            ) : filteredMedia.length === 0 ? (
                <div className="bg-white rounded-[2rem] border border-gray-100 border-dashed p-20 text-center">
                    <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ImageIcon size={32} className="text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No media found</h3>
                    <p className="text-gray-400 text-sm max-w-xs mx-auto">
                        {search ? "No files match your search criteria." : "You haven't uploaded any media yet. Start by uploading your first image!"}
                    </p>
                </div>
            ) : view === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {filteredMedia.map((item) => (
                        <div key={item.name} className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 hover:-translate-y-1">
                            {/* Actions Overlay */}
                            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 flex items-center justify-between gap-2">
                                <button 
                                    onClick={() => copyToClipboard(item.url, item.name)}
                                    className="p-2 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 text-white transition-all overflow-hidden relative"
                                    title="Copy URL"
                                >
                                    {copyId === item.name ? <Check size={16} className="text-green-400" /> : <Clipboard size={16} />}
                                </button>
                                <a 
                                    href={item.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="p-2 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 text-white transition-all"
                                    title="View Original"
                                >
                                    <ExternalLink size={16} />
                                </a>
                                <button 
                                    onClick={() => handleDelete(item.name)}
                                    className="p-2 bg-red-500/80 backdrop-blur-md rounded-xl hover:bg-red-500 text-white transition-all ml-auto"
                                    title="Delete Permanently"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            {/* Preview */}
                            <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                                {item.isImage ? (
                                    <img 
                                        src={item.url} 
                                        alt={item.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    />
                                ) : (
                                    <FileIcon size={40} className="text-gray-300" />
                                )}
                            </div>

                            {/* Label */}
                            <div className="p-3 border-t border-gray-50">
                                <p className="text-[10px] font-bold text-gray-800 truncate mb-0.5">{item.name}</p>
                                <div className="flex justify-between items-center text-[9px] text-gray-400 font-mono">
                                    <span>{formatSize(item.size)}</span>
                                    <span>{format(new Date(item.time), 'MMM d')}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-black/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-gray-50/40 border-b border-gray-50">
                                    <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Asset</th>
                                    <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Size</th>
                                    <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Type</th>
                                    <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Uploaded</th>
                                    <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50/60">
                                {filteredMedia.map((item) => (
                                    <tr key={item.name} className="hover:bg-gray-50/40 transition-colors group">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gray-50 overflow-hidden border border-gray-100 flex items-center justify-center shrink-0">
                                                    {item.isImage ? (
                                                        <img src={item.url} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <FileIcon size={20} className="text-gray-300" />
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold text-gray-900 truncate max-w-md">{item.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-mono truncate">{item.url}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center text-xs font-medium text-gray-500">{formatSize(item.size)}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-[10px] font-bold text-gray-400 px-2.5 py-1 bg-gray-100/60 rounded-lg uppercase">
                                                {item.name.split('.').pop()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center text-[11px] font-mono text-gray-400">
                                            {format(new Date(item.time), 'MM/dd/yyyy')}
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={() => copyToClipboard(item.url, item.name)}
                                                    className={`p-2 rounded-xl transition-all ${copyId === item.name ? 'text-green-500 bg-green-50' : 'text-gray-400 hover:text-accent hover:bg-accent/5'}`}
                                                >
                                                    {copyId === item.name ? <Check size={16} /> : <Clipboard size={16} />}
                                                </button>
                                                <a href={item.url} target="_blank" className="p-2 text-gray-400 hover:text-accent hover:bg-accent/5 rounded-xl transition-all">
                                                    <ExternalLink size={16} />
                                                </a>
                                                <button 
                                                    onClick={() => handleDelete(item.name)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50/5 rounded-xl transition-all"
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
                </div>
            )}
        </div>
    );
};

export default MediaManager;
