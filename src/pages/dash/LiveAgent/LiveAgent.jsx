import React, { useState, useEffect, useRef } from 'react';
import { 
    MessageSquare, 
    History, 
    User, 
    Bot, 
    Clock, 
    Trash2, 
    CheckCircle,
    ChevronRight,
    Search,
    RefreshCw,
    MoreHorizontal,
    Inbox,
    Eye,
    Mail,
    Send
} from 'lucide-react';
import { format, isValid } from 'date-fns';
import { useToast } from '../../../components/dash/Toast';
import { motion, AnimatePresence } from 'framer-motion';

const safeFormat = (date, formatStr) => {
    const d = new Date(date);
    return isValid(d) ? format(d, formatStr) : '--';
};

const LiveAgent = () => {
    const { showToast } = useToast();
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [search, setSearch] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        loadSessions();
    }, []);

    useEffect(() => {
        if (selectedSession) {
            loadMessages(selectedSession.id);
        }
    }, [selectedSession]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const loadSessions = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/chat/sessions`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setSessions(data);
                if (data.length > 0 && !selectedSession) {
                    setSelectedSession(data[0]);
                }
            }
        } catch (error) {
            showToast('Failed to load chat sessions', 'error');
        } finally {
            setLoading(false);
        }
    };

    const loadMessages = async (id) => {
        if (!id) return;
        setMessagesLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/chat/sessions/${encodeURIComponent(id)}`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setMessages(data);
            }
        } catch (error) {
            console.error('History load error:', error);
            showToast(`Failed to load chat history: ${error.message}`, 'error');
        } finally {
            setMessagesLoading(false);
        }
    };

    const handleDeleteSession = async (id) => {
        if (!window.confirm('Delete this conversation forever?')) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/chat/sessions/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                showToast('Conversation deleted');
                const updated = sessions.filter(s => s.id !== id);
                setSessions(updated);
                if (selectedSession?.id === id) {
                    setSelectedSession(updated[0] || null);
                }
            }
        } catch (error) {
            showToast('Error deleting session', 'error');
        }
    };

    const filteredSessions = sessions.filter(s => 
        (s.user_name || '').toLowerCase().includes(search.toLowerCase()) || 
        (s.user_email || '').toLowerCase().includes(search.toLowerCase()) ||
        (s.last_message || '').toLowerCase().includes(search.toLowerCase())
    );

    const activeSessions = filteredSessions.filter(s => s.status === 'active');
    const completeSessions = filteredSessions.filter(s => s.status === 'completed');

    return (
        <div className="flex bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-black/5 overflow-hidden h-[calc(100vh-160px)] min-h-[600px]">
            
            {/* Session Sidebar */}
            <div className="w-80 md:w-96 border-r border-gray-50 flex flex-col bg-gray-50/30">
                <div className="p-6 border-b border-gray-50 bg-white/50 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-display font-black text-gray-900 tracking-tight flex items-center gap-2">
                            <MessageSquare className="text-accent" size={24} />
                            Live Agent
                        </h2>
                        <button onClick={loadSessions} className="p-2 text-gray-400 hover:text-accent transition-colors"><RefreshCw size={16} /></button>
                    </div>
                    
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search talks..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-xs focus:ring-4 focus:ring-accent/5 focus:border-accent outline-none transition-all shadow-sm" 
                        />
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto p-4 space-y-6 custom-scrollbar">
                    {/* Live Section */}
                    {activeSessions.length > 0 && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 px-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Live Conversions</h3>
                            </div>
                            {activeSessions.map(session => (
                                <SessionCard 
                                    key={session.id} 
                                    session={session} 
                                    isActive={selectedSession?.id === session.id}
                                    onClick={() => setSelectedSession(session)}
                                />
                            ))}
                        </div>
                    )}

                    {/* History Section */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 px-2">
                            <History size={12} className="text-gray-400" />
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Old Sessions</h3>
                        </div>
                        {completeSessions.length === 0 && activeSessions.length === 0 && !loading && (
                            <div className="py-20 text-center">
                                <Inbox className="mx-auto text-gray-200 mb-2" size={32} />
                                <p className="text-xs text-gray-400">No conversations found</p>
                            </div>
                        )}
                        {completeSessions.map(session => (
                            <SessionCard 
                                key={session.id} 
                                session={session} 
                                isActive={selectedSession?.id === session.id}
                                onClick={() => setSelectedSession(session)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Chat Content */}
            <div className="flex-grow flex flex-col bg-white">
                {selectedSession ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between shadow-sm shadow-black/[0.02]">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-accent ring-1 ring-gray-100">
                                    <User size={24} />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-gray-900 truncate">{selectedSession.user_name}</h3>
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-gray-400 font-mono">
                                        <div className="flex items-center gap-1">
                                            <Mail size={10} className="text-accent" />
                                            <span className="text-gray-600">{selectedSession.user_email || 'No email provided'}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={10} />
                                            {safeFormat(selectedSession.created_at, 'MMM d, h:mm a')}
                                        </div>
                                        <span className={`px-1.5 py-0.5 rounded-md uppercase tracking-tighter font-bold ${
                                            selectedSession.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                            {selectedSession.status}
                                        </span>
                                        <button 
                                            onClick={async () => {
                                                const newStatus = !selectedSession.is_ai_enabled;
                                                try {
                                                    const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/chat/sessions/${selectedSession.id}/toggle-ai`, {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({ enabled: newStatus })
                                                    });
                                                    if (res.ok) {
                                                        setSelectedSession({...selectedSession, is_ai_enabled: newStatus});
                                                        showToast(newStatus ? 'AI Advisor Enabled' : 'Support Takeover Active');
                                                        loadSessions(); // Refresh list to update all states
                                                    }
                                                } catch (err) {
                                                    showToast('Failed to toggle AI status', 'error');
                                                }
                                            }}
                                            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md uppercase tracking-tighter font-bold transition-all ${
                                                selectedSession.is_ai_enabled 
                                                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
                                                : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                                            }`}
                                        >
                                            <Bot size={10} />
                                            {selectedSession.is_ai_enabled ? 'AI Mode' : 'Live Takeover'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => handleDeleteSession(selectedSession.id)}
                                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    title="Delete Session"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Viewer */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-gray-50/20">
                            {messagesLoading ? (
                                <div className="flex flex-col gap-6">
                                    {Array(4).fill(0).map((_, i) => (
                                        <div key={i} className={`h-16 w-1/2 bg-gray-50 rounded-2xl animate-pulse ${i % 2 === 0 ? '' : 'ml-auto'}`} />
                                    ))}
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                    <MessageSquare size={40} className="mb-4 text-gray-300" />
                                    <p className="text-sm font-medium">No messages recorded for this session.</p>
                                </div>
                            ) : (
                                messages.map((msg, i) => (
                                    <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className="flex items-center gap-2 mb-1 px-1">
                                            {msg.role === 'assistant' ? <Bot size={12} className="text-accent" /> : <User size={12} className="text-gray-400" />}
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                                                {msg.sender_name || msg.role}
                                            </span>
                                        </div>
                                        <div className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                            msg.role === 'user' 
                                            ? 'bg-accent text-white rounded-tr-none' 
                                            : msg.sender_name === 'Support Team'
                                            ? 'bg-indigo-600 text-white rounded-tl-none'
                                            : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none'
                                        }`}>
                                            {msg.content}
                                        </div>
                                        <span className="text-[8px] text-gray-300 mt-1 font-mono">{safeFormat(msg.created_at, 'h:mm:ss a')}</span>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Admin Reply Area */}
                        <div className="p-6 bg-white border-t border-gray-50">
                            <form 
                                className="relative flex gap-3"
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    const content = e.target.reply.value;
                                    if (!content.trim()) return;

                                    try {
                                        const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/chat/message`, {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ 
                                                session_id: selectedSession.id, 
                                                role: 'assistant', 
                                                content, 
                                                sender_name: 'Support Team' 
                                            })
                                        });
                                        if (res.ok) {
                                            e.target.reply.value = '';
                                            loadMessages(selectedSession.id);
                                        }
                                    } catch (err) {
                                        showToast('Failed to send reply', 'error');
                                    }
                                }}
                            >
                                <input 
                                    name="reply"
                                    type="text" 
                                    placeholder="Type your reply as Support Team..."
                                    className="flex-grow bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all text-sm"
                                />
                                <button 
                                    type="submit"
                                    className="bg-accent text-white px-6 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/20"
                                >
                                    <Send size={18} />
                                    Reply
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-200">
                            <Bot size={48} />
                        </div>
                        <h2 className="text-2xl font-display font-black text-gray-900 mb-2">Select a Conversation</h2>
                        <p className="text-gray-400 max-w-sm">Choose a live or archived chat from the left sidebar to view the full talk history.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const SessionCard = ({ session, isActive, onClick }) => (
    <button 
        onClick={onClick}
        className={`w-full text-left p-4 rounded-2xl transition-all group ${
            isActive 
            ? 'bg-white shadow-xl shadow-black/[0.04] border border-gray-100 scale-[1.02]' 
            : 'hover:bg-white hover:shadow-lg hover:shadow-black/[0.02]'
        }`}
    >
        <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-accent uppercase tracking-tighter">ID: {session.id?.slice(0, 8) || 'Unknown'}</span>
            <span className="text-[9px] text-gray-400 font-mono">{safeFormat(session.updated_at, 'h:mm a')}</span>
        </div>
        <p className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-accent transition-colors">
            {session.last_message || "No messages yet"}
        </p>
        <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-50 rounded-md">
                <Clock size={10} className="text-gray-400" />
                <span className="text-[9px] font-bold text-gray-400">{safeFormat(session.created_at, 'MMM d')}</span>
            </div>
            {isActive && <Eye size={14} className="text-accent" />}
        </div>
    </button>
);

export default LiveAgent;
