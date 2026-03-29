import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, X, Video, BookOpen, Lightbulb, 
  Settings, BarChart2, Save, ExternalLink, Filter, 
  CheckCircle, Clock, AlertCircle, Trash, MoreVertical
} from 'lucide-react';
import { useToast } from '../../../components/dash/Toast';

const YoutubeManager = () => {
    const { addToast } = useToast();
    const [activeTab, setActiveTab] = useState('videos');
    const [loading, setLoading] = useState(false);

    // Data states
    const [videos, setVideos] = useState([]);
    const [resources, setResources] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [settings, setSettings] = useState({
        channelUrl: '',
        channelHandle: '',
        youtubeApiKey: '',
        youtubeChannelId: '',
        showLatest: 'true',
        showResources: 'true',
        showSuggest: 'true',
        resourcesPerPage: '10',
        successMessage: ''
    });
    const [isSyncing, setIsSyncing] = useState(false);


    // Modal states
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Form states
    const [videoForm, setVideoForm] = useState({
        title: '', youtubeUrl: '', thumbnailUrl: '', description: '', 
        publishedAt: new Date().toISOString().split('T')[0], 
        duration: '', views: 0, isFeatured: false
    });
    const [resourceForm, setResourceForm] = useState({
        title: '', type: 'doc', url: '', description: '', icon: '', tags: ''
    });

    useEffect(() => {
        fetchSettings();
        fetchVideos();
        fetchResources();
        fetchSuggestions();
    }, []);

    // --- API FETCHERS ---
    const fetchSettings = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/youtube/settings`);
            const data = await res.json();
            setSettings(data);
        } catch (error) {
            console.error("Error fetching settings:", error);
        }
    };

    const fetchVideos = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/youtube/videos`);
            const data = await res.json();
            setVideos(data);
        } catch (error) {
            addToast('Error fetching videos', 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchResources = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/youtube/resources`);
            const data = await res.json();
            setResources(data);
        } catch (error) {
            addToast('Error fetching resources', 'error');
        }
    };

    const fetchSuggestions = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/youtube/suggestions`);
            const data = await res.json();
            setSuggestions(data);
        } catch (error) {
            addToast('Error fetching suggestions', 'error');
        }
    };

    // --- VIDEO ACTIONS ---
    const handleSaveVideo = async (e) => {
        e.preventDefault();
        setLoading(true);
        const url = editingItem 
            ? `${import.meta.env.VITE_API_URL || ""}/api/admin/youtube/videos/${editingItem.id}`
            : `${import.meta.env.VITE_API_URL || ""}/api/admin/youtube/videos`;
        
        try {
            const res = await fetch(url, {
                method: editingItem ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(videoForm)
            });
            if (res.ok) {
                addToast(`Video ${editingItem ? 'updated' : 'added'} successfully`, 'success');
                setIsVideoModalOpen(false);
                setEditingItem(null);
                fetchVideos();
            }
        } catch (error) {
            addToast('Error saving video', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteVideo = async (id) => {
        if (!window.confirm('Are you sure you want to delete this video?')) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/youtube/videos/${id}`, { method: 'DELETE' });
            if (res.ok) {
                addToast('Video deleted', 'success');
                fetchVideos();
            }
        } catch (error) {
            addToast('Error deleting video', 'error');
        }
    };

    const handleSyncVideos = async () => {
        if (!settings.youtubeApiKey || !settings.youtubeChannelId) {
            addToast('Please provide YouTube API Key and Channel ID in Settings tab first', 'error');
            setActiveTab('settings');
            return;
        }

        setIsSyncing(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/youtube/sync`, { method: 'POST' });
            const data = await res.json();
            if (res.ok) {
                addToast(data.message || 'Videos synced successfully', 'success');
                fetchVideos();
            } else {
                addToast(data.error || 'Sync failed', 'error');
            }
        } catch (error) {
            addToast('Network error during sync', 'error');
        } finally {
            setIsSyncing(false);
        }
    };


    // --- RESOURCE ACTIONS ---
    const handleSaveResource = async (e) => {
        e.preventDefault();
        setLoading(true);
        const url = editingItem 
            ? `${import.meta.env.VITE_API_URL || ""}/api/admin/youtube/resources/${editingItem.id}`
            : `${import.meta.env.VITE_API_URL || ""}/api/admin/youtube/resources`;
        
        try {
            const res = await fetch(url, {
                method: editingItem ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resourceForm)
            });
            if (res.ok) {
                addToast(`Resource ${editingItem ? 'updated' : 'added'} successfully`, 'success');
                setIsResourceModalOpen(false);
                setEditingItem(null);
                fetchResources();
            }
        } catch (error) {
            addToast('Error saving resource', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteResource = async (id) => {
        if (!window.confirm('Are you sure you want to delete this resource?')) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/youtube/resources/${id}`, { method: 'DELETE' });
            if (res.ok) {
                addToast('Resource deleted', 'success');
                fetchResources();
            }
        } catch (error) {
            addToast('Error deleting resource', 'error');
        }
    };

    // --- SUGGESTION ACTIONS ---
    const handleUpdateSuggestionStatus = async (id, status) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/youtube/suggestions/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                addToast('Status updated', 'success');
                fetchSuggestions();
            }
        } catch (error) {
            addToast('Error updating status', 'error');
        }
    };

    const handleDeleteSuggestion = async (id) => {
        if (!window.confirm('Delete this suggestion?')) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/youtube/suggestions/${id}`, { method: 'DELETE' });
            if (res.ok) {
                addToast('Suggestion deleted', 'success');
                fetchSuggestions();
            }
        } catch (error) {
            addToast('Error deleting suggestion', 'error');
        }
    };

    // --- SETTINGS ACTIONS ---
    const handleSaveSettings = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/youtube/settings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            if (res.ok) {
                addToast('Settings saved successfully', 'success');
            }
        } catch (error) {
            addToast('Error saving settings', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Helper to extract Video ID from URL
    const parseYoutubeId = (url) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    };

    const updateVideoThumbnail = (url) => {
        const id = parseYoutubeId(url);
        if (id) {
            setVideoForm(prev => ({ 
                ...prev, 
                youtubeUrl: url,
                thumbnailUrl: `https://img.youtube.com/vi/${id}/maxresdefault.jpg` 
            }));
        } else {
            setVideoForm(prev => ({ ...prev, youtubeUrl: url }));
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold font-display text-gray-900">Video Catalog</h1>
                    <p className="text-gray-500 text-sm">Manage the latest tutorials and builds displayed on your website.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleSyncVideos}
                        disabled={isSyncing}
                        className="flex items-center gap-2 px-6 py-3 bg-cyan-100 text-cyan-700 font-bold rounded-2xl hover:bg-cyan-200 transition-all border border-cyan-200 disabled:opacity-50"
                    >
                        {isSyncing ? (
                            <div className="w-5 h-5 border-2 border-cyan-400 border-t-cyan-700 rounded-full animate-spin"></div>
                        ) : <Clock size={18} />}
                        Sync Now
                    </button>
                    <button 
                        onClick={() => { setEditingItem(null); setIsVideoModalOpen(true); }}
                        className="flex items-center gap-2 px-6 py-3 bg-[#4f46e5] text-white font-bold rounded-2xl hover:bg-[#4338ca] transition-all shadow-lg shadow-[#4f46e5]/20"
                    >
                        <Plus size={18} /> Add Video
                    </button>
                </div>
            </div>

            {/* TABS */}
            <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm mb-8 overflow-x-auto">
                {[
                    { id: 'videos', icon: <Video size={18}/>, label: 'Videos' },
                    { id: 'resources', icon: <BookOpen size={18}/>, label: 'Resources' },
                    { id: 'suggestions', icon: <Lightbulb size={18}/>, label: 'Suggestions' },
                    { id: 'analytics', icon: <BarChart2 size={18}/>, label: 'Analytics' },
                    { id: 'settings', icon: <Settings size={18}/>, label: 'Settings' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all text-sm whitespace-nowrap ${activeTab === tab.id ? 'bg-gray-100 text-[#4f46e5]' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* CONTENT AREA */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                
                {activeTab === 'videos' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Video</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Views</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Published</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Featured</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {videos.map(vid => (
                                    <tr key={vid.id} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-10 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                                                    <img src={vid.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="font-bold text-gray-900 truncate max-w-[200px]">{vid.title}</div>
                                                    <div className="text-[10px] text-gray-400 font-mono truncate max-w-[200px]">{vid.youtubeUrl}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-600">{vid.views.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{new Date(vid.publishedAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            {vid.isFeatured ? (
                                                <span className="px-2 py-1 bg-amber-50 text-amber-600 rounded-md text-[10px] font-bold uppercase tracking-widest border border-amber-200">Featured</span>
                                            ) : (
                                                <span className="text-gray-300">—</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => { setEditingItem(vid); setVideoForm({ ...vid, publishedAt: new Date(vid.publishedAt).toISOString().split('T')[0] }); setIsVideoModalOpen(true); }}
                                                    className="p-2 text-gray-400 hover:text-[#4f46e5] hover:bg-[#4f46e5]/5 rounded-lg transition-colors"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteVideo(vid.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {videos.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                            <Video size={48} className="mx-auto mb-4 opacity-20" />
                                            <p className="font-bold">No videos added yet.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'resources' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Resource</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Type</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Tags</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Created</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {resources.map(res => (
                                    <tr key={res.id} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-xl border border-gray-100">
                                                    {res.icon || <BookOpen size={16} className="text-gray-400" />}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="font-bold text-gray-900 truncate max-w-[200px]">{res.title}</div>
                                                    <a href={res.url} target="_blank" rel="noreferrer" className="text-[10px] text-[#4f46e5] font-mono flex items-center gap-1 hover:underline">
                                                        <ExternalLink size={10} /> Link
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-cyan-50 text-cyan-600 rounded-md text-[10px] font-bold uppercase tracking-widest border border-cyan-100">
                                                {res.type.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-1 flex-wrap max-w-[150px]">
                                                {res.tags?.split(',').map((tag, i) => (
                                                    <span key={i} className="text-[10px] text-gray-400 font-medium">#{tag.trim()}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{new Date(res.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => { setEditingItem(res); setResourceForm(res); setIsResourceModalOpen(true); }}
                                                    className="p-2 text-gray-400 hover:text-[#4f46e5] hover:bg-[#4f46e5]/5 rounded-lg transition-colors"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteResource(res.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
                )}

                {activeTab === 'suggestions' && (
                    <div className="p-0">
                        <div className="divide-y divide-gray-50">
                            {suggestions.map(sug => (
                                <div key={sug.id} className="p-6 flex flex-col md:flex-row gap-6 hover:bg-gray-50/30 transition-colors">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="font-bold text-gray-900">{sug.email}</span>
                                            <span className="text-xs text-secondary/60 flex items-center gap-1"><Clock size={12}/> {new Date(sug.createdAt).toLocaleString()}</span>
                                        </div>
                                        <p className="text-gray-600 bg-gray-50 p-4 rounded-2xl border border-gray-100 italic">
                                            "{sug.suggestion}"
                                        </p>
                                    </div>
                                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 shrink-0">
                                        <select 
                                            value={sug.status}
                                            onChange={(e) => handleUpdateSuggestionStatus(sug.id, e.target.value)}
                                            className={`text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-xl border appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-offset-0 transition-all
                                                ${sug.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-200 focus:ring-amber-100' : 
                                                  sug.status === 'reviewed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 focus:ring-emerald-100' : 
                                                  'bg-gray-50 text-gray-400 border-gray-200 focus:ring-gray-100'}`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="reviewed">Reviewed</option>
                                            <option value="ignored">Ignored</option>
                                        </select>
                                        <button 
                                            onClick={() => handleDeleteSuggestion(sug.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {suggestions.length === 0 && (
                                <div className="p-20 text-center text-gray-400">
                                    <Lightbulb size={48} className="mx-auto mb-4 opacity-20" />
                                    <p className="font-bold">No suggestions yet. Invite your audience to contribute!</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className="p-20 text-center text-gray-400">
                        <BarChart2 size={48} className="mx-auto mb-4 opacity-20" />
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Analytics Coming Soon</h3>
                        <p className="max-w-xs mx-auto">We are working on bringing deep insights into video performance and resource engagement.</p>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <form onSubmit={handleSaveSettings}>
                        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">YouTube API Key</label>
                                    <input 
                                        type="password" 
                                        placeholder="Enter your Google API Key"
                                        value={settings.youtubeApiKey}
                                        onChange={e => setSettings({...settings, youtubeApiKey: e.target.value})}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#4f46e5] focus:outline-none font-medium" 
                                    />
                                    <p className="mt-1 text-[10px] text-gray-400">Required for auto-syncing videos.</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">YouTube Channel ID</label>
                                    <input 
                                        type="text" 
                                        placeholder="UC-..."
                                        value={settings.youtubeChannelId}
                                        onChange={e => setSettings({...settings, youtubeChannelId: e.target.value})}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#4f46e5] focus:outline-none font-medium" 
                                    />
                                    <p className="mt-1 text-[10px] text-gray-400">e.g. UC-some-random-id</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">YouTube Channel URL</label>
                                    <input 
                                        type="text" 
                                        value={settings.channelUrl}
                                        onChange={e => setSettings({...settings, channelUrl: e.target.value})}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#4f46e5] focus:outline-none font-medium" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">YouTube Channel Handle</label>
                                    <input 
                                        type="text" 
                                        value={settings.channelHandle}
                                        onChange={e => setSettings({...settings, channelHandle: e.target.value})}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#4f46e5] focus:outline-none font-medium" 
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Section Visibility</label>
                                {[
                                    { key: 'showLatest', label: 'Show "Latest Videos" Section' },
                                    { key: 'showResources', label: 'Show "Resources" Section' },
                                    { key: 'showSuggest', label: 'Show "Suggest Video" Section' }
                                ].map(tog => (
                                    <div key={tog.key} className="flex items-center justify-between p-4 bg-gray-50/50 border border-gray-100 rounded-2xl">
                                        <span className="font-bold text-gray-700 text-sm">{tog.label}</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={settings[tog.key] === 'true'}
                                                onChange={e => setSettings({...settings, [tog.key]: e.target.checked ? 'true' : 'false'})}
                                                className="sr-only peer" 
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#4f46e5]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4f46e5]"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Resources Per Page</label>
                                <input 
                                    type="number" 
                                    value={settings.resourcesPerPage}
                                    onChange={e => setSettings({...settings, resourcesPerPage: e.target.value})}
                                    className="w-32 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#4f46e5] focus:outline-none font-medium" 
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Suggestion Success Message</label>
                                <textarea 
                                    value={settings.successMessage}
                                    onChange={e => setSettings({...settings, successMessage: e.target.value})}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#4f46e5] focus:outline-none font-medium min-h-[100px]" 
                                ></textarea>
                            </div>

                            <button type="submit" className="flex items-center gap-2 bg-[#4f46e5] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#4338ca] transition-all shadow-lg shadow-[#4f46e5]/20">
                                <Save size={18} /> Save Settings
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* VIDEO MODAL */}
            {isVideoModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsVideoModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h2 className="text-xl font-bold font-display text-gray-900">{editingItem ? 'Edit Video' : 'Add New Video'}</h2>
                            <button onClick={() => setIsVideoModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X/></button>
                        </div>
                        <form onSubmit={handleSaveVideo} className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Video Title</label>
                                    <input required type="text" value={videoForm.title} onChange={e => setVideoForm({...videoForm, title: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#4f46e5] focus:outline-none font-medium" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">YouTube URL</label>
                                    <input required type="text" placeholder="https://youtube.com/watch?v=..." value={videoForm.youtubeUrl} onChange={e => updateVideoThumbnail(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#4f46e5] focus:outline-none font-medium" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Thumbnail Preview</label>
                                    {videoForm.thumbnailUrl ? (
                                        <div className="w-full aspect-video rounded-3xl overflow-hidden border border-gray-100">
                                            <img src={videoForm.thumbnailUrl} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-full aspect-video bg-gray-50 rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-200 text-gray-300">
                                            Thumbnail will auto-load from URL
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Published Date</label>
                                    <input required type="date" value={videoForm.publishedAt} onChange={e => setVideoForm({...videoForm, publishedAt: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#4f46e5] focus:outline-none font-medium" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Duration (e.g. 12:45)</label>
                                    <input type="text" value={videoForm.duration} onChange={e => setVideoForm({...videoForm, duration: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#4f46e5] focus:outline-none font-medium" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 text-transparent">—</label>
                                    <div className="flex items-center gap-3 h-[52px]">
                                        <input type="checkbox" id="featured" checked={videoForm.isFeatured} onChange={e => setVideoForm({...videoForm, isFeatured: e.target.checked})} className="w-5 h-5 accent-[#4f46e5]" />
                                        <label htmlFor="featured" className="text-sm font-bold text-gray-700 cursor-pointer">Feature this video</label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setIsVideoModalOpen(false)} className="px-6 py-3 font-bold text-gray-500 hover:text-gray-900 transition-colors">Cancel</button>
                                <button type="submit" className="px-8 py-3 bg-[#4f46e5] text-white font-bold rounded-2xl hover:bg-[#4338ca] shadow-lg shadow-[#4f46e5]/20 transition-all flex items-center gap-2">
                                    <Save size={18} /> {editingItem ? 'Update Video' : 'Add Video'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* RESOURCE MODAL */}
            {isResourceModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsResourceModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h2 className="text-xl font-bold font-display text-gray-900">{editingItem ? 'Edit Resource' : 'Add New Resource'}</h2>
                            <button onClick={() => setIsResourceModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X/></button>
                        </div>
                        <form onSubmit={handleSaveResource} className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Title</label>
                                    <input required type="text" value={resourceForm.title} onChange={e => setResourceForm({...resourceForm, title: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#4f46e5] focus:outline-none font-medium" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Type</label>
                                    <select value={resourceForm.type} onChange={e => setResourceForm({...resourceForm, type: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#4f46e5] focus:outline-none font-bold text-sm">
                                        <option value="doc">Document / PDF</option>
                                        <option value="video_summary">Video Summary</option>
                                        <option value="ai_title">AI Title / Prompt</option>
                                        <option value="guide">Guide / Checklist</option>
                                        <option value="tool">Tool / Extension</option>
                                        <option value="link">Direct Link</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">URL</label>
                                    <input required type="text" value={resourceForm.url} onChange={e => setResourceForm({...resourceForm, url: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#4f46e5] focus:outline-none font-medium" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Description</label>
                                    <textarea value={resourceForm.description} onChange={e => setResourceForm({...resourceForm, description: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#4f46e5] focus:outline-none font-medium min-h-[80px]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Icon (Emoji or Icon name)</label>
                                    <input type="text" placeholder="🚀 or Lucide name" value={resourceForm.icon} onChange={e => setResourceForm({...resourceForm, icon: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#4f46e5] focus:outline-none font-medium text-center" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Tags (Comma separated)</label>
                                    <input type="text" placeholder="ai, automation, marketing" value={resourceForm.tags} onChange={e => setResourceForm({...resourceForm, tags: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#4f46e5] focus:outline-none font-medium" />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setIsResourceModalOpen(false)} className="px-6 py-3 font-bold text-gray-500 hover:text-gray-900 transition-colors">Cancel</button>
                                <button type="submit" className="px-8 py-3 bg-[#4f46e5] text-white font-bold rounded-2xl hover:bg-[#4338ca] shadow-lg shadow-[#4f46e5]/20 transition-all flex items-center gap-2">
                                    <Save size={18} /> {editingItem ? 'Update Resource' : 'Add Resource'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default YoutubeManager;
