import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MISTRAL_API_KEY = import.meta.env.VITE_MISTRAL_API_KEY;
const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";

const SYSTEM_PROMPT = `You are MalikBot, the human-like advisor for MalikLogix.
Your job:
1. Understand manual business processes
2. Identify time-wasting tasks
3. Suggest specific automations
4. Mention that MalikLogix builds these custom solutions
5. Encourage a free audit at maliklogix.com

CRITICAL RULES:
- Always keep your total reply under 2-3 short lines.
- Use a natural, professional human tone.
- If giving multiple points, use exactly 3 simple bullet points.
- NEVER use bolding (**), italics (_), or any Markdown formatting.
- NEVER use emojis, hashtags (#), or any special symbols/icons.
- Provide answers "line-wise"—using simple line breaks instead of complex formatting.
- If asked about pricing: "Projects start at $499. We do a free audit first."
- If asked who built this: "MalikLogix was built by Malik, a developer based in Pakistan."`;

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState(() => localStorage.getItem('ml_chat_email') || '');
    const [sessionId, setSessionId] = useState(null);
    const [isAiEnabled, setIsAiEnabled] = useState(true);
    const [showEmailPrompt, setShowEmailPrompt] = useState(!localStorage.getItem('ml_chat_email'));
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I'm MalikBot. Before we begin, please share your email so I can securely save our conversation history." }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Initialize session once email is set
    useEffect(() => {
        if (email && !sessionId) {
            handleEmailSubmit(email);
        }
    }, [email]);

    // Polling for new messages from admin (every 4s when open)
    useEffect(() => {
        if (!isOpen || !sessionId) return;
        const interval = setInterval(() => {
            loadHistory(sessionId);
        }, 4000);
        return () => clearInterval(interval);
    }, [isOpen, sessionId]);

    const handleEmailSubmit = async (submittedEmail) => {
        if (!submittedEmail || !submittedEmail.includes('@')) return;
        
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/chat/session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_email: submittedEmail, user_name: submittedEmail.split('@')[0] })
            });
            const data = await res.json();
            if (data.id) {
                setSessionId(data.id);
                setIsAiEnabled(!!data.is_ai_enabled);
                localStorage.setItem('ml_chat_email', submittedEmail);
                setShowEmailPrompt(false);
                loadHistory(data.id);
            }
        } catch (err) { console.error("Session init error:", err); }
    };

    const loadHistory = async (id) => {
        try {
            // 1. Sync messages
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/chat/sessions/${id}`);
            if (res.ok) {
                const history = await res.json();
                if (history.length > 0) {
                    setMessages(history.map(m => ({ 
                        role: m.role, 
                        content: m.content,
                        sender_name: m.sender_name 
                    })));
                }
            }
            // 2. Sync AI Status
            const statusRes = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/chat/session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            const statusData = await statusRes.json();
            if (statusData.success) {
                setIsAiEnabled(!!statusData.is_ai_enabled);
            }
        } catch (err) { console.error("Sync error:", err); }
    };

    const saveMessage = async (msg) => {
        if (!sessionId) return;
        try {
            await fetch(`${import.meta.env.VITE_API_URL || ""}/api/chat/message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    session_id: sessionId, 
                    ...msg,
                    sender_name: msg.role === 'user' ? 'Client' : 'MalikBot'
                })
            });
        } catch (err) { console.error("Message save error:", err); }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !sessionId) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        saveMessage(userMessage);

        // If AI is disabled by admin, stop here
        if (!isAiEnabled) {
            setIsLoading(false);
            return;
        }

        try {
            // Clean up messages to only send role and content (Mistral API requirement)
            const cleanHistory = messages.map(({ role, content }) => ({ role, content }));
            
            const response = await fetch(MISTRAL_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${MISTRAL_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'mistral-tiny',
                    messages: [
                        { role: 'system', content: SYSTEM_PROMPT },
                        ...cleanHistory,
                        userMessage
                    ],
                    max_tokens: 500,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `API error: ${response.status}`);
            }

            const data = await response.json();
            const aiMessage = { role: 'assistant', content: data.choices[0].message.content };
            setMessages(prev => [...prev, aiMessage]);
            saveMessage(aiMessage);
        } catch (error) {
            console.error("Mistral API Failure:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "We will get in touch shortly or email us on hello@maliklogix.com" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-28 right-8 z-[100] font-body">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        className="mb-6 w-[380px] md:w-[420px] h-[400px] md:h-[500px] bg-[var(--background)] border border-[var(--border)] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl relative"
                    >
                        {/* Header */}
                        <div className="p-6 bg-accent/10 border-b border-[var(--border)] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white ring-4 ring-accent/10">
                                    <Bot size={22} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-display font-bold text-[var(--foreground)]">MalikBot</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] uppercase font-mono text-accent tracking-widest font-bold">AI Automation Advisor</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-[var(--secondary)] hover:text-[var(--foreground)] transition-colors p-2 hover:bg-[var(--foreground)]/[0.05] rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area / Onboarding */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                            {showEmailPrompt ? (
                                <div className="space-y-6 py-4">
                                    <div className="space-y-4">
                                        <div className="bg-accent/5 p-4 rounded-2xl border border-accent/10">
                                            <h4 className="text-sm font-bold text-accent mb-3 flex items-center gap-2">
                                                <Sparkles size={16} /> Welcome to MalikLogix
                                            </h4>
                                            <ul className="space-y-2.5 text-xs text-[var(--foreground)]/80">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-accent mt-0.5">•</span>
                                                    <span>Premium AI Digital Automation Agency</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-accent mt-0.5">•</span>
                                                    <span>Shopify & Amazon Seller Automation Experts</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-accent mt-0.5">•</span>
                                                    <span>AI Digital Marketing</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <p className="text-xs text-[var(--secondary)] px-1">Please enter your email to continue and save your progress.</p>
                                    </div>

                                    <div className="space-y-3">
                                        <input 
                                            type="email" 
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-[var(--background)] border border-[var(--border)] p-4 rounded-2xl focus:border-accent outline-none text-sm"
                                        />
                                        <button 
                                            onClick={() => handleEmailSubmit(email)}
                                            disabled={!email.includes('@')}
                                            className="w-full py-3.5 bg-accent text-white font-bold rounded-2xl shadow-xl shadow-accent/20 disabled:opacity-50 transition-all text-sm"
                                        >
                                            Start Chatting
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {messages.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                                        >
                                            <span className="text-[9px] font-bold text-gray-400 mb-1 px-1 uppercase tracking-tighter">
                                                {msg.role === 'user' ? 'You' : (msg.sender_name || 'MalikBot')}
                                            </span>
                                            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                                ? 'bg-accent text-white rounded-br-none shadow-lg shadow-accent/20'
                                                : 'bg-[var(--foreground)]/[0.05] text-[var(--foreground)] border border-[var(--border)] rounded-bl-none backdrop-blur-sm'
                                                }`}>
                                                {msg.content}
                                            </div>
                                        </motion.div>
                                    ))}
                                </>
                            )}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-[var(--foreground)]/[0.05] p-4 rounded-2xl rounded-bl-none flex items-center gap-2 border border-[var(--border)]">
                                        <Loader2 className="w-4 h-4 animate-spin text-accent" />
                                        <span className="text-xs text-[var(--secondary)] font-mono animate-pulse uppercase tracking-widest">Processing...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-6 bg-[var(--foreground)]/[0.02] border-t border-[var(--border)]">
                            <div className="relative group">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything about AI automation..."
                                    className="w-full bg-[var(--background)] border border-[var(--border)] p-4 pr-14 rounded-2xl focus:border-accent outline-none text-[var(--foreground)] transition-all placeholder:text-[var(--secondary)]/40 hover:border-accent/30 shadow-sm"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-2 top-2 w-10 h-10 bg-accent text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/20"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <div className="mt-2 text-center">
                                <p className="text-[8px] font-mono text-[var(--secondary)]/40 uppercase tracking-widest flex items-center justify-center gap-1.5">
                                    <Sparkles size={10} /> Powered by MalikLogix
                                </p>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                initial={false}
                animate={!isOpen ? {
                    y: [0, -20, 0]
                } : { y: 0 }}
                transition={!isOpen ? {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                } : { duration: 0.3 }}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 relative z-10 ${isOpen ? 'bg-[var(--foreground)] text-[var(--background)] rotate-180' : 'bg-accent text-white'
                    }`}
            >
                {isOpen ? <X size={24} /> : (
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative flex items-center justify-center"
                    >
                        <Bot size={26} />
                        {/* Simulated Talking Animation with a mini chat bubble */}
                        <motion.div
                            animate={{ opacity: [0, 1, 0, 1, 0], y: [0, -5, 0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 -right-4"
                        >
                            <MessageSquare size={14} fill="currentColor" stroke="none" className="text-[var(--background)] dark:text-white" />
                        </motion.div>
                    </motion.div>
                )}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-accent border-2 border-[var(--background)]"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
};

export default Chatbot;
