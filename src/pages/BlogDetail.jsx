import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Clock, Calendar, CheckCircle, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

const Callout = ({ title, children, type }) => (
    <div className={`my-8 p-6 rounded-2xl border ${type === 'info' ? 'border-accent/30 bg-accent/5' : 'border-purple-500/30 bg-purple-500/5'}`}>
        <div className="flex items-center gap-3 mb-2 font-bold text-lg">
            <CheckCircle className={`w-5 h-5 ${type === 'info' ? 'text-accent' : 'text-purple-500'}`} />
            {title}
        </div>
        <div className="text-[var(--secondary)] leading-relaxed">{children}</div>
    </div>
);

const Stat = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center p-6 border border-[var(--border)] rounded-2xl bg-[var(--card-bg)]">
        <span className="text-3xl font-display font-bold text-accent mb-2">{value}</span>
        <span className="text-sm text-[var(--secondary)] text-center">{label}</span>
    </div>
);

const customComponents = {
    h2: ({node, ...props}) => <h2 className="text-3xl md:text-4xl font-display font-bold mt-16 mb-6 text-[var(--foreground)]" {...props} />,
    h3: ({node, ...props}) => <h3 className="text-2xl md:text-3xl font-display font-bold mt-12 mb-4 text-[var(--foreground)]" {...props} />,
    p: ({node, ...props}) => <p className="text-lg text-[var(--secondary)] leading-loose mb-6" {...props} />,
    ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-8 text-lg text-[var(--secondary)] space-y-3 marker:text-accent" {...props} />,
    ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-8 text-lg text-[var(--secondary)] space-y-3 marker:text-accent font-bold" {...props} />,
    li: ({node, ...props}) => <li className="pl-2" {...props} />,
    a: ({node, ...props}) => <a className="text-accent underline underline-offset-4 hover:text-accent/80 transition-colors" {...props} />,
    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-accent pl-6 py-2 my-8 italic text-xl text-[var(--foreground)] bg-accent/5 rounded-r-xl" {...props} />,
    hr: ({node, ...props}) => <hr className="my-12 border-[var(--border)]" {...props} />,
    img: ({node, ...props}) => <img className="w-full h-auto rounded-3xl border border-[var(--border)] my-12 object-cover shadow-2xl" loading="lazy" {...props} />,
    code: ({node, inline, ...props}) => inline 
        ? <code className="bg-accent/10 text-accent px-1.5 py-0.5 rounded font-mono text-sm" {...props} />
        : <pre className="bg-[var(--card-bg)] border border-[var(--border)] p-6 rounded-2xl my-8 overflow-x-auto"><code className="font-mono text-sm leading-relaxed text-[var(--foreground)]" {...props} /></pre>,
    table: ({node, ...props}) => (
        <div className="my-10 overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="w-full text-left border-collapse" {...props} />
        </div>
    ),
    thead: ({node, ...props}) => <thead className="bg-accent/5 border-b border-[var(--border)]" {...props} />,
    th: ({node, ...props}) => <th className="p-4 font-display font-bold text-accent uppercase tracking-wider text-xs" {...props} />,
    td: ({node, ...props}) => <td className="p-4 border-b border-[var(--border)] text-[var(--secondary)] text-sm leading-relaxed" {...props} />,
    tr: ({node, ...props}) => <tr className="hover:bg-accent/[0.02] transition-colors" {...props} />,
    div: ({node, className, ...props}) => {
        if (className && (className.includes('stat-row') || className.includes('statrow'))) {
            return <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10" {...props} />
        }
        return <div className={className} {...props} />;
    },
    callout: ({node, title, type, children, ...props}) => <Callout title={title} type={type}>{children}</Callout>,
    stat: ({node, value, label, ...props}) => <Stat value={value} label={label} />,
    figure: ({node, ...props}) => <figure className="my-10 w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6" {...props} />,
    figcaption: ({node, ...props}) => <figcaption className="text-center text-sm text-[var(--secondary)] mt-4 font-mono" {...props} />
};

export default function BlogDetail() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/posts/${slug}`)
            .then(res => {
                if (!res.ok) throw new Error('Not found');
                return res.json();
            })
            .then(data => {
                setPost(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 pb-24 flex justify-center items-center bg-[var(--background)]">
                <div className="animate-spin w-12 h-12 border-4 border-accent border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen pt-32 pb-24 text-center bg-[var(--background)] flex flex-col items-center justify-center">
                <h1 className="text-5xl font-display font-bold mb-6">Post Not Found</h1>
                <Link to="/blog" className="text-accent underline underline-offset-4">Return to Blog</Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-32 pb-24">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
                
                <Link to="/blog" className="inline-flex items-center gap-2 text-[var(--secondary)] hover:text-accent transition-colors font-mono uppercase tracking-widest text-sm mb-12">
                    <ArrowLeft size={16} /> Back to Blog
                </Link>

                <div className="mb-12">
                    <div className="flex items-center gap-4 text-sm text-[var(--secondary)] mb-6 font-mono uppercase tracking-widest">
                        <span className="px-3 py-1 bg-accent/10 text-accent font-bold rounded-full">{post.category || 'MalikLogix Insight'}</span>
                        <span className="flex items-center gap-1">
                            <Calendar size={14} /> 
                            {post.published_at ? format(new Date(post.published_at), 'MMM dd, yyyy') : 'Recently Published'}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-accent/50 hidden md:block" />
                        <span className="flex items-center gap-1 hidden md:flex"><Clock size={14} /> {post.read_time_mins || 5} min read</span>

                    </div>

                    <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6 leading-[1.1]">
                        {post.title}
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-[var(--secondary)] leading-relaxed mb-10">
                        {post.subtitle}
                    </p>

                    <div className="flex items-center gap-4 py-8 border-y border-[var(--border)]">
                        {post.author_avatar ? (
                            <img src={post.author_avatar} alt={post.author_name} className="w-12 h-12 rounded-full border border-[var(--border)]" />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold border border-accent/20 text-lg">
                                {post.author_name ? post.author_name.charAt(0) : 'M'}
                            </div>
                        )}
                        <div>
                            <div className="font-bold">{post.author_name || 'Malik Logix'}</div>
                            {post.author_twitter && <a href={`https://twitter.com/${post.author_twitter}`} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">@{post.author_twitter}</a>}
                        </div>

                    </div>
                </div>

                {post.cover_image_url && (
                    <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-16 border border-[var(--border)] shadow-2xl">
                        <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                )}

                <div className="max-w-none pb-20">
                    <ReactMarkdown 
                        rehypePlugins={[rehypeRaw]}
                        remarkPlugins={[remarkGfm]}
                        components={customComponents}
                    >
                        {post.content_html}
                    </ReactMarkdown>
                </div>

                {/* Engagement Footer */}
                <div className="mt-20 p-10 rounded-3xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-display font-bold mb-2">Want to automate your business?</h3>
                        <p className="text-[var(--secondary)]">Book a free audit and discover how AI can scale your operations.</p>
                    </div>
                    <Link to="/contact" className="px-8 py-3 bg-accent text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-accent/20 whitespace-nowrap">
                        Book Free Audit &rarr;
                    </Link>
                </div>

            </div>
        </article>
    );
}
