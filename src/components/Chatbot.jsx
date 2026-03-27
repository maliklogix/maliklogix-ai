import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MISTRAL_API_KEY = "09FDtUBBcCpIy3rqkt0dsyIUyTuXsInw";
const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";

const SYSTEM_PROMPT = `You are MalikBot, the AI automation advisor for MalikLogix — a premium automation agency specializing in Shopify automation, Amazon seller automation, Excel & data processing, RPA (robotic process automation), and business workflow integrations.

Your job:
1. Understand what the visitor currently does manually in their business
2. Identify their biggest time-wasting processes
3. Suggest specific automations that would save them the most time
4. Explain how MalikLogix builds those automations
5. Encourage them to book a free automation audit at maliklogix.com

Rules:
- Be concise, confident, and outcome-focused
- Always use numbers: "This saves approx. 15 hours/week"
- Never be vague or generic
- If asked about pricing: "Projects start at $499 for simple automations. We do a free audit first — no commitment."
- If asked who built this: "MalikLogix was built by Malik, a full-stack automation engineer and Shopify developer based in Pakistan."`;

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I'm MalikBot. How can I help you automate your business and eliminate manual work today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
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
                        ...messages,
                        userMessage
                    ],
                    max_tokens: 500,
                    temperature: 0.7
                })
            });

            const data = await response.json();
            const aiMessage = { role: 'assistant', content: data.choices[0].message.content };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Chatbot Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "I encountered a minor calculation error. Please try again or reach out directly to Malik Logix." }]);
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
                        className="mb-6 w-[380px] md:w-[420px] h-[400px] md:h-[450px] bg-[var(--background)] border border-[var(--border)] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl relative"
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

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                        ? 'bg-accent text-white rounded-br-none shadow-lg shadow-accent/20'
                                        : 'bg-[var(--foreground)]/[0.05] text-[var(--foreground)] border border-[var(--border)] rounded-bl-none backdrop-blur-sm'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
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
