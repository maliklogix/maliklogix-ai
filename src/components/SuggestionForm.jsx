import React, { useState } from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';

// apiEndpoint: 'youtube' (default) → posts to /api/youtube/suggest
//              'leads'           → posts to /api/leads (visible in /dash/leads)
const SuggestionForm = ({
    source = 'youtube',
    apiEndpoint = 'youtube',
    title = 'Request a Build',
    subtitle = "Got a topic or system you'd love me to disassemble? Drop your idea below.",
    successMessage = "Added to the roadmap."
}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            let res;
            if (apiEndpoint === 'leads') {
                res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/leads`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        email,
                        message,
                        businessType: `Social Suggestion — ${source}`,
                        budget: source,
                    })
                });
            } else {
                res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/youtube/suggest`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, suggestion: message, source })
                });
            }

            if (res.ok) {
                setStatus('success');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <section className="py-24 border-t border-border/50">
            <div className="max-w-xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black font-display tracking-tight mb-3">{title}</h2>
                    <p className="text-secondary text-sm font-medium">{subtitle}</p>
                </div>

                {status === 'success' ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Submitted Successfully</h3>
                        <p className="text-secondary text-sm mb-8">{successMessage}</p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="text-[10px] font-bold text-accent uppercase tracking-widest hover:underline"
                        >
                            Submit Another
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="space-y-8">
                            {/* Name field — only shown for leads endpoint */}
                            {apiEndpoint === 'leads' && (
                                <div className="relative group">
                                    <input
                                        required
                                        type="text"
                                        placeholder="Your name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="w-full px-0 py-3 bg-transparent border-b border-border focus:border-accent outline-none transition-all font-medium text-foreground placeholder:text-secondary/30 text-lg"
                                    />
                                    <label className="absolute left-0 -top-4 text-[9px] font-bold text-secondary uppercase tracking-widest opacity-0 group-focus-within:opacity-100 transition-all">Your Name</label>
                                </div>
                            )}
                            <div className="relative group">
                                <input
                                    required
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full px-0 py-3 bg-transparent border-b border-border focus:border-accent outline-none transition-all font-medium text-foreground placeholder:text-secondary/30 text-lg"
                                />
                                <label className="absolute left-0 -top-4 text-[9px] font-bold text-secondary uppercase tracking-widest opacity-0 group-focus-within:opacity-100 transition-all">Email</label>
                            </div>
                            <div className="relative group">
                                <textarea
                                    required
                                    placeholder="What should we build or cover next?"
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    className="w-full px-0 py-3 bg-transparent border-b border-border focus:border-accent outline-none transition-all font-medium min-h-[100px] resize-none text-foreground placeholder:text-secondary/30 text-lg"
                                />
                                <label className="absolute left-0 -top-4 text-[9px] font-bold text-secondary uppercase tracking-widest opacity-0 group-focus-within:opacity-100 transition-all">Message</label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-5 bg-foreground text-background font-bold rounded-2xl transition-all hover:bg-accent hover:text-white uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {status === 'loading' ? (
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>Submit Feedback <ChevronRight size={14} /></>
                            )}
                        </button>
                        {status === 'error' && (
                            <p className="text-red-500 text-[10px] font-bold text-center uppercase tracking-widest">Transmission error. Try again.</p>
                        )}
                    </form>
                )}
            </div>
        </section>
    );
};

export default SuggestionForm;
