import React, { useState, useEffect } from 'react';
import { Play, Calendar, ChevronRight, ChevronLeft, FileText, Bot, Lightbulb, Wrench, Link2, Folder, ExternalLink, CheckCircle2 } from 'lucide-react';
import SuggestionForm from '../../components/SuggestionForm';
import { useTheme } from '../../context/ThemeContext';

const YoutubePage = () => {
    const [settings, setSettings] = useState(null);
    const [videos, setVideos] = useState([]);
    
    // Resources state
    const [resources, setResources] = useState([]);
    const [resourceType, setResourceType] = useState('all');
    const [resourcePage, setResourcePage] = useState(1);
    const [resourceTotalPages, setResourceTotalPages] = useState(1);
    const [loadingResources, setLoadingResources] = useState(false);

    const { theme } = useTheme();

    useEffect(() => {
        document.title = "YouTube Academy | MalikLogix";
        window.scrollTo(0, 0);
        
        // Fetch Settings & Videos
        Promise.all([
            fetch(`${import.meta.env.VITE_API_URL || ""}/api/youtube/settings`).then(res => res.json()),
            fetch(`${import.meta.env.VITE_API_URL || ""}/api/youtube/videos`).then(res => res.json())
        ]).then(([settingsData, videosData]) => {
            setSettings(settingsData);
            setVideos(videosData);
        }).catch(err => console.error("Error loading youtube base data:", err));
    }, []);

    useEffect(() => {
        // Fetch Resources
        setLoadingResources(true);
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/youtube/resources?page=${resourcePage}&type=${resourceType}`)
            .then(res => res.json())
            .then(data => {
                setResources(data.data || []);
                setResourceTotalPages(data.totalPages || 1);
                setLoadingResources(false);
            })
            .catch(err => {
                console.error("Error loading resources:", err);
                setLoadingResources(false);
            });
    }, [resourcePage, resourceType]);

    const getTypeIcon = (type) => {
        switch(type) {
            case 'doc': return <FileText size={18} className="text-cyan-600" />;
            case 'video_summary': return <Play size={18} className="text-cyan-600" />;
            case 'ai_title': return <Bot size={18} className="text-cyan-600" />;
            case 'guide': return <Lightbulb size={18} className="text-cyan-600" />;
            case 'tool': return <Wrench size={18} className="text-cyan-600" />;
            case 'link': return <Link2 size={18} className="text-cyan-600" />;
            default: return <Folder size={18} className="text-cyan-600" />;
        }
    };

    const formatType = (type) => {
        return type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    };

    if (!settings) return <div className="min-h-screen bg-background flex items-center justify-center pt-24"><div className="w-8 h-8 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div></div>;

    const btnClasses = "px-6 py-4 bg-accent text-white font-bold rounded-2xl shadow-lg shadow-accent/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 uppercase tracking-widest text-xs";

    return (
        <div className="bg-background min-h-screen text-foreground font-body pb-24 transition-colors duration-500 selection:bg-accent/30 selection:text-foreground">
            {/* Simple Clean Header */}
            <div className="pt-40 pb-20 px-6 lg:px-20 max-w-7xl mx-auto border-b border-border/50">
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-px w-8 bg-accent" />
                    <span className="text-xs font-mono text-accent uppercase tracking-[0.2em] font-bold">YouTube Media Hub</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black font-display tracking-tight mb-8">
                    Master Complex <br />
                    <span className="text-accent leading-tight">Autonomous Systems.</span>
                </h1>
                <p className="max-w-2xl text-xl text-secondary leading-relaxed font-body">
                    Deep-dives into AI automation, marketing systems, and digital infrastructure. Watch our builds, download resources, or suggest what we build next.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-20">
                
                {/* LATEST VIDEOS (LIMIT 3) */}
                {settings.showLatest === 'true' && (
                    <section className="py-24 border-b border-border/50">
                        <div className="mb-16">
                            <h2 className="text-4xl font-black font-display tracking-tight mb-2">Latest Tutorials</h2>
                            <p className="text-secondary font-medium">Step-by-step guides on AI automation and digital growth.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
                            {videos.slice(0, 3).map((vid, i) => (
                                <a 
                                    href={vid.youtubeUrl || settings.channelUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    key={vid.id || i}
                                    className="group flex flex-col bg-card-bg border border-border/50 rounded-3xl overflow-hidden hover:border-accent/40 transition-all duration-300"
                                >
                                    <div className="relative aspect-video overflow-hidden bg-background">
                                        <img src={vid.thumbnailUrl} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        {vid.duration && (
                                            <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-md text-foreground text-xs font-bold font-mono px-2 py-1 rounded-md flex items-center gap-1 border border-border/50">
                                                <Play size={10} fill="currentColor" /> {vid.duration}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-8 flex flex-col flex-1">
                                        <div className="flex items-center gap-4 text-xs font-bold text-secondary uppercase tracking-widest mb-4">
                                            <span className="flex items-center gap-1.5 min-w-0"><Calendar size={12}/> {new Date(vid.publishedAt).toLocaleDateString()}</span>
                                        </div>
                                        <h3 className="text-xl font-bold font-display leading-tight mb-4 line-clamp-2">
                                            {vid.title}
                                        </h3>
                                        <p className="text-secondary text-sm line-clamp-2 mb-8 font-medium">
                                            {vid.description}
                                        </p>
                                        <div className="mt-auto flex items-center font-bold text-xs text-accent uppercase tracking-[0.2em] gap-1 group-hover:gap-3 transition-all">
                                            Watch Build <ChevronRight size={16}/>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                        
                        <div className="flex justify-center">
                            <a href={settings.channelUrl} target="_blank" rel="noreferrer" className={btnClasses}>
                                <Play size={16} fill="currentColor" /> Browse Channel
                            </a>
                        </div>
                    </section>
                )}


                {/* RESOURCES */}
                {settings.showResources === 'true' && (
                    <section className="py-24 border-b border-border/50">
                        <div className="mb-16">
                            <h2 className="text-4xl font-black font-display tracking-tight mb-4">Ecosystem Resources</h2>
                            <p className="text-secondary font-medium max-w-2xl">Docs, video summaries, AI tools, and templates to accelerate your implementation.</p>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap items-center gap-3 mb-10">
                            {['all', 'doc', 'video_summary', 'ai_title', 'guide', 'tool', 'link', 'other'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => { setResourceType(type); setResourcePage(1); }}
                                    className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all border
                                        ${resourceType === type 
                                            ? 'bg-accent/10 text-accent border-accent/30 shadow-lg shadow-accent/5' 
                                            : 'bg-card-bg border-border text-secondary hover:border-accent/40 hover:text-foreground'
                                        }`}
                                >
                                    {type === 'all' ? 'All Resources' : formatType(type)}
                                </button>
                            ))}
                        </div>

                        {/* List */}
                        <div className="bg-card-bg/50 border border-border/50 rounded-[2.5rem] p-4 md:p-10 mb-10 min-h-[400px]">
                            {loadingResources ? (
                                <div className="flex items-center justify-center h-64">
                                    <div className="w-10 h-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
                                </div>
                            ) : resources.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-64 text-secondary/40">
                                    <Folder size={48} className="mb-4 opacity-50" />
                                    <p className="font-bold uppercase tracking-widest text-xs">No resources found</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {resources.map(res => (
                                        <a 
                                            href={res.url} 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            key={res.id}
                                            className="group flex flex-col md:flex-row md:items-center p-6 bg-card-bg border border-border/50 rounded-2xl hover:border-accent/40 transition-all gap-6"
                                        >
                                            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center shrink-0 border border-accent/20 group-hover:scale-110 transition-transform">
                                                {res.icon && res.icon.length < 5 ? (
                                                    <span className="text-2xl">{res.icon}</span>
                                                ) : (
                                                    getTypeIcon(res.type)
                                                )}
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                    <h4 className="text-lg font-bold text-foreground truncate">{res.title}</h4>
                                                    <span className="px-2.5 py-1 bg-secondary/10 text-secondary rounded-lg text-[10px] font-bold uppercase tracking-widest border border-border/50">
                                                        {formatType(res.type)}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-secondary truncate mb-3">{res.description}</p>
                                                
                                                {res.tags && (
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        {res.tags.split(',').map((t, tid) => (
                                                            <span key={tid} className="text-[10px] font-bold text-accent bg-accent/5 px-2.5 py-1 rounded-md uppercase tracking-[0.1em] border border-accent/10">
                                                                {t.trim()}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="md:ml-auto flex items-center text-xs font-bold text-accent group-hover:gap-3 transition-all uppercase tracking-[0.2em] shrink-0 gap-2">
                                                Access <ExternalLink size={14} />
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {resourceTotalPages > 1 && (
                            <div className="flex items-center justify-between border border-border/50 bg-card-bg/50 backdrop-blur-md rounded-2xl p-2 max-w-sm mx-auto shadow-sm">
                                <button 
                                    onClick={() => setResourcePage(p => Math.max(1, p - 1))}
                                    disabled={resourcePage === 1}
                                    className="p-2 text-secondary hover:text-foreground hover:bg-background/80 rounded-xl disabled:opacity-30 transition-all"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <span className="text-xs font-bold text-secondary uppercase tracking-[0.2em]">
                                    Page <span className="text-foreground">{resourcePage}</span> / {resourceTotalPages}
                                </span>
                                <button 
                                    onClick={() => setResourcePage(p => Math.min(resourceTotalPages, p + 1))}
                                    disabled={resourcePage === resourceTotalPages}
                                    className="p-2 text-secondary hover:text-foreground hover:bg-background/80 rounded-xl disabled:opacity-30 transition-all"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </section>
                )}


                {/* SUGGEST NEXT VIDEO */}
                {settings.showSuggest === 'true' && (
                    <SuggestionForm source="youtube" successMessage={settings.successMessage} />
                )}


            </div>
        </div>
    );
};

export default YoutubePage;
