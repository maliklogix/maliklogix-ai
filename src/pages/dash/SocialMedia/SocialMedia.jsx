import React, { useState } from 'react';
import { 
    Send, 
    Save, 
    Calendar, 
    Clock, 
    Image as ImageIcon, 
    Video as VideoIcon, 
    Settings, 
    X as CloseIcon,
    Plus,
    CheckCircle,
    Facebook,
    Twitter,
    Linkedin,
    Youtube,
    Instagram,
    FileText,
    History,
    Layers,
    ChevronRight,
    Search,
    Filter,
    Trash2,
    ExternalLink,
    Eye,
    Globe,
    Lock,
    Users,
    MessageCircle,
    Type,
    MapPin,
    AlertCircle
} from 'lucide-react';
import { useToast } from '../../../components/dash/Toast';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

const SocialMedia = () => {
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState('tiktok');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    
    // Form States
    const [caption, setCaption] = useState('');
    const [isScheduling, setIsScheduling] = useState(false);
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    
    // Platform Specific States
    const [tiktokPrivacy, setTiktokPrivacy] = useState('Public');
    const [allowComments, setAllowComments] = useState(true);
    const [linkedinPostType, setLinkedinPostType] = useState('Personal');
    const [youtubeVisibility, setYoutubeVisibility] = useState('Public');
    const [charCount, setCharCount] = useState(0);

    const tabs = [
        { id: 'tiktok', label: 'TikTok', icon: <VideoIcon size={16} /> },
        { id: 'linkedin', label: 'LinkedIn', icon: <Linkedin size={16} /> },
        { id: 'youtube', label: 'YouTube', icon: <Youtube size={16} /> },
        { id: 'blog', label: 'Blog', icon: <FileText size={16} /> },
        { id: 'x', label: 'X (Twitter)', icon: <Twitter size={16} /> },
        { id: 'facebook', label: 'Facebook', icon: <Facebook size={16} /> },
        { id: 'instagram', label: 'Instagram', icon: <Instagram size={16} /> },
        { id: 'auto', label: 'Auto Post', icon: <Layers size={16} /> },
        { id: 'recent', label: 'Recent Posts', icon: <History size={16} /> },
    ];

    const handlePost = () => {
        showToast(`Post ${isScheduling ? 'scheduled' : 'published'} successfully!`);
    };

    const handleSaveDraft = () => {
        showToast('Post saved as draft');
    };

    return (
        <div className="space-y-8 pb-20 text-black min-h-screen relative overflow-x-hidden">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-display font-bold text-gray-900">Social Media Manager</h2>
                    <p className="text-sm text-gray-500 mt-1">Compose and schedule content across all platforms</p>
                </div>
            </div>

            {/* Horizontal Tabs Area */}
            <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar gap-8">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
                            activeTab === tab.id ? 'text-accent' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        {tab.icon}
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div 
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full" 
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="animate-in fade-in duration-500">
                {activeTab === 'auto' ? (
                    <AutoPostTab showToast={showToast} />
                ) : activeTab === 'recent' ? (
                    <RecentPostsTab />
                ) : (
                    <PlatformComposer 
                        platform={activeTab}
                        isSettingsOpen={isSettingsOpen}
                        setIsSettingsOpen={setIsSettingsOpen}
                        handlePost={handlePost}
                        handleSaveDraft={handleSaveDraft}
                        charCount={charCount}
                        setCharCount={setCharCount}
                        isScheduling={isScheduling}
                        setIsScheduling={setIsScheduling}
                    />
                )}
            </div>

            {/* Settings Side Drawer */}
            <AnimatePresence>
                {isSettingsOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSettingsOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
                        />
                        <motion.div 
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-screen w-[380px] bg-white shadow-2xl z-[101] border-l border-gray-100 p-8 overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-lg font-display font-bold text-gray-900 flex items-center gap-2">
                                    <Settings size={20} className="text-accent" />
                                    {tabs.find(t => t.id === activeTab)?.label} Settings
                                </h3>
                                <button onClick={() => setIsSettingsOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                                    <CloseIcon size={20} className="text-gray-400" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Connected Account</label>
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-accent shadow-sm">
                                            {tabs.find(t => t.id === activeTab)?.icon}
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-sm font-bold text-gray-900">MalikLogix Official</p>
                                            <p className="text-[10px] text-gray-500">Connected since Oct 2023</p>
                                        </div>
                                        <CheckCircle size={16} className="text-green-500" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">API Key / Client ID</label>
                                        <input type="password" placeholder="••••••••••••••••" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-accent/20 outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Access Token</label>
                                        <textarea placeholder="Paste your token here..." className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-accent/20 outline-none h-32 resize-none" />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-50 space-y-3">
                                    <button className="w-full py-3 bg-accent text-white font-bold rounded-xl shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                        Save Settings
                                    </button>
                                    <button className="w-full py-3 bg-red-50 text-red-500 font-bold rounded-xl hover:bg-red-100 transition-all">
                                        Disconnect Account
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Sub-components ---

const PlatformComposer = ({ platform, setIsSettingsOpen, handlePost, handleSaveDraft, charCount, setCharCount, isScheduling, setIsScheduling }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
            <div className="lg:col-span-2 space-y-8">
                {/* Header Row */}
                <div className="flex items-center justify-between bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center text-accent ring-1 ring-accent/10">
                            {getPlatformIcon(platform)}
                        </div>
                        <div>
                            <h3 className="font-display font-bold text-gray-900 capitalize">{platform} Post</h3>
                            <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                <Users size={10} /> Connected: @maliklogix
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsSettingsOpen(true)}
                        className="p-3 text-gray-400 hover:text-accent hover:bg-accent/5 rounded-2xl transition-all"
                    >
                        <Settings size={20} />
                    </button>
                </div>

                {/* Media Upload Area */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                        <ImageIcon className="text-accent" size={20} />
                        <h3 className="font-display font-bold text-lg">Media Content</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-2 border-dashed border-gray-100 rounded-3xl p-10 flex flex-col items-center justify-center gap-3 hover:border-accent/40 transition-colors cursor-pointer group bg-gray-50/50">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-accent shadow-sm transition-colors">
                                <ImageIcon size={24} />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold text-gray-900">Upload Images</p>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Drag & Drop or click</p>
                            </div>
                        </div>
                        <div className="border-2 border-dashed border-gray-100 rounded-3xl p-10 flex flex-col items-center justify-center gap-3 hover:border-accent/40 transition-colors cursor-pointer group bg-gray-50/50">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-accent shadow-sm transition-colors">
                                <VideoIcon size={24} />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold text-gray-900">Upload Video</p>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Drag & Drop or click</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Text Content Area */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                        <div className="flex items-center gap-3">
                            <Type className="text-accent" size={20} />
                            <h3 className="font-display font-bold text-lg">Caption & Text</h3>
                        </div>
                        {platform === 'x' && (
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${charCount > 280 ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-500'}`}>
                                {charCount}/280
                            </span>
                        )}
                    </div>
                    
                    <textarea 
                        onChange={(e) => {
                            if (platform === 'x') setCharCount(e.target.value.length);
                        }}
                        placeholder="Write something engaging..." 
                        className="w-full bg-gray-50 border border-gray-100 rounded-3xl px-6 py-5 text-sm focus:ring-4 focus:ring-accent/5 focus:border-accent outline-none min-h-[160px] resize-none leading-relaxed"
                    />

                    {/* Platform Specific Extras */}
                    <div className="pt-4 border-t border-gray-50 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {renderPlatformFields(platform)}
                    </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="sticky bottom-8 bg-white/80 backdrop-blur-xl p-4 rounded-[2rem] border border-gray-100 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 z-50">
                    <div className="flex items-center gap-6 px-4">
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-gray-900 uppercase tracking-tight">Schedule Post</span>
                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Post at specific time</span>
                            </div>
                            <button 
                                onClick={() => setIsScheduling(!isScheduling)}
                                className={`w-12 h-6 rounded-full transition-colors relative ${isScheduling ? 'bg-accent' : 'bg-gray-200'}`}
                            >
                                <motion.div 
                                    animate={{ left: isScheduling ? '28px' : '4px' }}
                                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" 
                                />
                            </button>
                        </div>

                        {isScheduling && (
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2"
                            >
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" size={14} />
                                    <input type="date" className="bg-gray-50 border border-gray-100 pl-9 pr-3 py-2 rounded-xl text-[10px] font-bold outline-none focus:ring-2 focus:ring-accent/20" />
                                </div>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" size={14} />
                                    <input type="time" className="bg-gray-50 border border-gray-100 pl-9 pr-3 py-2 rounded-xl text-[10px] font-bold outline-none focus:ring-2 focus:ring-accent/20" />
                                </div>
                            </motion.div>
                        )}
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button 
                            onClick={handleSaveDraft}
                            className="flex-grow md:flex-grow-0 px-8 py-3.5 border border-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all text-sm"
                        >
                            Save Draft
                        </button>
                        <button 
                            onClick={handlePost}
                            className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-10 py-3.5 bg-accent text-white font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent/20 text-sm whitespace-nowrap"
                        >
                            {isScheduling ? <Calendar size={18} /> : <Send size={18} />}
                            {isScheduling ? 'Schedule Post' : 'Post Now'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                {/* Visual Guidelines */}
                <div className="bg-[#0f1117] p-8 rounded-[2.5rem] text-white relative overflow-hidden group">
                    <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-accent/20 blur-[100px] rounded-full" />
                    <h4 className="font-display font-bold text-lg mb-4 flex items-center gap-2 relative z-10">
                        <AlertCircle size={20} className="text-accent" /> Platform Specs
                    </h4>
                    <ul className="space-y-4 relative z-10">
                        {getPlatformSpecs(platform).map((spec, i) => (
                            <li key={i} className="flex gap-3">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                                <div>
                                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{spec.label}</p>
                                    <p className="text-xs text-gray-300 font-medium leading-relaxed">{spec.value}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Dynamic Preview */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm border-dashed">
                    <div className="flex items-center gap-3 mb-6">
                        <Eye className="text-accent" size={20} />
                        <h3 className="font-display font-bold text-lg">Social Preview</h3>
                    </div>
                    <div className="aspect-[4/5] bg-gray-50 rounded-3xl flex items-center justify-center border border-gray-100 p-6">
                        <div className="text-center">
                            <ImageIcon size={32} className="mx-auto text-gray-200 mb-3" />
                            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest leading-loose">
                                Live preview will generate<br/>as you add media
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AutoPostTab = ({ showToast }) => {
    const platforms = [
        { id: 'tiktok', label: 'TikTok', icon: <VideoIcon size={14} /> },
        { id: 'linkedin', label: 'LinkedIn', icon: <Linkedin size={14} /> },
        { id: 'youtube', label: 'YouTube', icon: <Youtube size={14} /> },
        { id: 'blog', label: 'Blog', icon: <FileText size={14} /> },
        { id: 'x', label: 'X (Twitter)', icon: <Twitter size={14} /> },
        { id: 'facebook', label: 'Facebook', icon: <Facebook size={14} /> },
        { id: 'instagram', label: 'Instagram', icon: <Instagram size={14} /> },
    ];
    
    const [selected, setSelected] = useState([]);

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-in slide-up duration-500">
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-10">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-accent rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-accent/20">
                        <Layers size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-display font-black text-gray-900">Bulk Auto-Post</h2>
                        <p className="text-sm text-gray-500 italic mt-0.5">Distribute content across multiples channels at once</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <ImageIcon size={14} /> Step 1: Content
                            </label>
                            <div className="border-2 border-dashed border-gray-100 rounded-3xl p-8 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-all cursor-pointer bg-gray-50/30">
                                <Plus size={24} className="text-accent" />
                                <span className="text-xs font-bold text-gray-500">Add Media Bundles</span>
                            </div>
                            <textarea 
                                placeholder="Write a universal caption..."
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm outline-none focus:ring-4 focus:ring-accent/5 h-40 resize-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Globe size={14} /> Step 2: Channels
                                </label>
                                <button className="text-[10px] font-bold text-accent hover:underline uppercase tracking-tighter">Select All</button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {platforms.map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => {
                                            if (selected.includes(p.id)) setSelected(selected.filter(i => i !== p.id));
                                            else setSelected([...selected, p.id]);
                                        }}
                                        className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                                            selected.includes(p.id) 
                                            ? 'bg-accent/5 border-accent text-accent shadow-sm' 
                                            : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                                        }`}
                                    >
                                        {p.icon}
                                        <span className="text-xs font-bold">{p.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-50">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-xs font-bold text-gray-500">Posting to <span className="text-accent">{selected.length}</span> platforms</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Schedule All</span>
                                    <div className="w-8 h-4 bg-gray-200 rounded-full relative"><div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full" /></div>
                                </div>
                            </div>
                            <button 
                                onClick={() => showToast('Bulk campaign initialized!')}
                                className="w-full py-4 bg-[#0f1117] text-white font-black rounded-2xl shadow-2xl hover:bg-black transition-all group overflow-hidden relative"
                            >
                                <div className="absolute -left-1/2 top-0 w-full h-[300%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 group-hover:left-[150%] transition-all duration-1000" />
                                <span className="relative z-10">POST TO ALL SELECTED</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RecentPostsTab = () => {
    const mockPosts = [
        { platform: 'TikTok', content: 'Transforming manual workflows with RPA—check out our latest integration!', status: 'Published', date: 'Oct 24, 2023 10:30 AM', thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4628c7144?q=80&w=200&auto=format&fit=crop' },
        { platform: 'LinkedIn', content: 'How AI-driven SEO is changing the game for e-commerce stores in Pakistan.', status: 'Scheduled', date: 'Oct 26, 2023 09:00 AM', thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=200&auto=format&fit=crop' },
        { platform: 'X', content: 'Our Shopify Automation project just hit a new milestone! #RPA #Shopify', status: 'Published', date: 'Oct 22, 2023 02:45 PM', thumbnail: '' },
        { platform: 'Instagram', content: 'Behind the scenes at MalikLogix: Innovation and pure focus.', status: 'Draft', date: 'Draft - Last edited 2h ago', thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=200&auto=format&fit=crop' }
    ];

    return (
        <div className="space-y-8 pb-20 max-w-6xl mx-auto">
            {/* Filter Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm items-center">
                <div className="relative col-span-1 md:col-span-2">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input type="text" placeholder="Search posts..." className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-50 rounded-2xl text-xs outline-none focus:ring-4 focus:ring-accent/5" />
                </div>
                <div className="flex gap-2">
                    <Filter className="text-gray-400" size={16} />
                    <select className="bg-transparent text-xs font-bold text-gray-600 outline-none w-full">
                        <option>All Platforms</option>
                        <option>TikTok</option>
                        <option>X</option>
                        <option>LinkedIn</option>
                    </select>
                </div>
                <div className="flex justify-end">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-all">
                         <History size={14} /> Clear History
                    </button>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockPosts.map((post, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white group rounded-[2.5rem] p-6 border border-gray-100 hover:border-accent/20 hover:shadow-xl hover:shadow-black/5 transition-all shadow-sm flex gap-6"
                    >
                        <div className="w-24 h-24 bg-gray-50 rounded-[1.5rem] flex items-center justify-center text-gray-200 overflow-hidden relative shrink-0">
                            {post.thumbnail ? (
                                <img src={post.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="post" />
                            ) : (
                                <ImageIcon size={24} />
                            )}
                            <div className="absolute top-2 left-2 p-1.5 bg-white/90 backdrop-blur-md rounded-lg shadow-sm">
                                {getPlatformIcon(post.platform.toLowerCase())}
                            </div>
                        </div>

                        <div className="flex-grow min-w-0 flex flex-col justify-between py-1">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                                        post.status === 'Published' ? 'bg-green-50 text-green-500' : 
                                        post.status === 'Scheduled' ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-400'
                                    }`}>
                                        {post.status}
                                    </span>
                                    <span className="text-[8px] font-mono text-gray-400">{post.date}</span>
                                </div>
                                <p className="text-xs text-gray-700 font-medium line-clamp-2 leading-relaxed">
                                    {post.content}
                                </p>
                            </div>
                            
                            <div className="flex items-center gap-2 pt-4">
                                <button className="p-2 text-gray-400 hover:text-accent hover:bg-accent/5 rounded-lg transition-all"><Eye size={14}/></button>
                                <button className="p-2 text-gray-400 hover:text-accent hover:bg-accent/5 rounded-lg transition-all"><ExternalLink size={14}/></button>
                                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all ml-auto"><Trash2 size={14}/></button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// --- Helper Functions ---

const getPlatformIcon = (platform) => {
    switch(platform) {
        case 'tiktok': return <VideoIcon size={18} />;
        case 'linkedin': return <Linkedin size={18} />;
        case 'youtube': return <Youtube size={18} />;
        case 'facebook': return <Facebook size={18} />;
        case 'instagram': return <Instagram size={18} />;
        case 'x': return <Twitter size={18} />;
        case 'blog': return <FileText size={18} />;
        default: return <Globe size={18} />;
    }
};

const getPlatformSpecs = (platform) => {
    const specs = {
        tiktok: [
            { label: 'Video Aspect', value: '9:16 vertical only' },
            { label: 'Max Length', value: '10 minutes' },
            { label: 'Format', value: 'MP4, MOV, WebM' }
        ],
        instagram: [
            { label: 'Image', value: '1:1 or 4:5 recommended' },
            { label: 'Video', value: '9:16 Reels only' },
            { label: 'Alt Text', value: 'Required for SEO' }
        ],
        youtube: [
            { label: 'Aspect', value: '16:9 standard' },
            { label: 'Thumbnails', value: '1280x720 (max 2MB)' },
            { label: 'Tags', value: 'Limit: 500 characters' }
        ],
        x: [
            { label: 'Character', value: '280 chars total' },
            { label: 'Media', value: 'Up to 4 images or 1 video' },
            { label: 'Threads', value: 'Manual only via dashboard' }
        ]
    };
    return specs[platform] || [{ label: 'Optimization', value: 'High quality images & tags' }, { label: 'Engagement', value: 'Reply to comments within 1h' }];
};

const renderPlatformFields = (platform) => {
    switch(platform) {
        case 'tiktok': return (
            <>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Privacy Setting</label>
                    <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs outline-none">
                        <option>Public</option>
                        <option>Friends Only</option>
                        <option>Private</option>
                    </select>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-[10px] font-bold text-gray-600 uppercase">Allow Comments</span>
                    <input type="checkbox" defaultChecked className="accent-accent" />
                </div>
            </>
        );
        case 'youtube': return (
            <>
                <div className="space-y-2 col-span-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Video Title</label>
                    <input type="text" placeholder="Enter awesome title..." className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs outline-none" />
                </div>
                <div className="space-y-2 col-span-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Search Tags (comma separated)</label>
                    <input type="text" placeholder="ai, automation, shopify..." className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs outline-none" />
                </div>
            </>
        );
        case 'linkedin': return (
            <>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Post As</label>
                    <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs outline-none">
                        <option>Personal Profile</option>
                        <option>MalikLogix Company Page</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Article Header (Optional)</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs outline-none" />
                </div>
            </>
        );
        case 'blog': return (
            <>
                <div className="space-y-2 col-span-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Post Title</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-accent/20" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
                    <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs outline-none">
                        <option>AI Automation</option>
                        <option>Shopify Insights</option>
                        <option>Case Studies</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Slug</label>
                    <input type="text" placeholder="auto-generated-slug" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs outline-none" />
                </div>
            </>
        );
        case 'facebook': return (
            <>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Page</label>
                    <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs outline-none">
                        <option>MalikLogix Global</option>
                        <option>Personal Profile</option>
                    </select>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-[10px] font-bold text-gray-600 uppercase">Link Preview</span>
                    <input type="checkbox" defaultChecked className="accent-accent" />
                </div>
            </>
        );
        case 'instagram': return (
            <>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Accessibility Alt Text</label>
                    <input type="text" placeholder="Describe your image..." className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs outline-none" />
                </div>
                <div className="space-y-2 relative">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location Tag</label>
                    <MapPin className="absolute left-3 bottom-2.5 text-gray-300" size={14} />
                    <input type="text" placeholder="Add location..." className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-9 pr-4 py-2 text-xs outline-none" />
                </div>
            </>
        );
        default: return (
           <div className="col-span-2 p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-3">
               <AlertCircle className="text-orange-500 shrink-0" size={16} />
               <p className="text-[10px] text-orange-600 font-medium leading-relaxed uppercase tracking-tight">
                   Optimization: Generic posts work best with 3-5 high-traffic hashtags and a clear call to action in the first line of the caption.
               </p>
           </div>
        );
    }
};

export default SocialMedia;
