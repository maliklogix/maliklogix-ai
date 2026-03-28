import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag } from 'lucide-react';
import { format } from 'date-fns';

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/posts`)
            .then(res => res.json())
            .then(data => {
                setPosts(Array.isArray(data) ? data : []);
                setLoading(false);
            })

            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-20">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">Our <span className="text-accent">Blog</span></h1>
                    <p className="text-[var(--secondary)] text-xl max-w-2xl mx-auto">
                        Insights on AI automation, digital marketing, and the future of business operations.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin w-12 h-12 border-4 border-accent border-t-transparent rounded-full" />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map(post => (
                            <Link key={post.id} to={`/blog/${post.slug}`} className="group block h-full">
                                <article className="h-full bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl overflow-hidden hover:border-accent/40 transition-all duration-300 flex flex-col hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5">
                                    <div className="h-48 bg-[var(--background)] relative overflow-hidden border-b border-[var(--border)]">
                                        {post.cover_image_url ? (
                                            <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/5 to-transparent flex flex-col items-center justify-center p-6 text-center">
                                                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent mb-3 group-hover:scale-110 transition-transform duration-300">
                                                    <Tag size={24} />
                                                </div>
                                                <span className="text-sm font-mono text-[var(--secondary)] uppercase tracking-wider opacity-60">MalikLogix Insight</span>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-accent/90 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-wider">{post.category}</span>
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 text-xs text-[var(--secondary)] mb-4 font-mono uppercase tracking-widest">
                                            <span>
                                                {post.published_at && !isNaN(new Date(post.published_at).getTime())
                                                    ? format(new Date(post.published_at), 'MMM dd, yyyy')
                                                    : 'Recently Published'
                                                }
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-accent/50" />
                                            <span className="flex items-center gap-1"><Clock size={14} /> {post.read_time_mins || 5} min</span>
                                        </div>

                                        <h2 className="text-2xl font-display font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2">{post.title}</h2>
                                        <p className="text-[var(--secondary)] line-clamp-3 mb-6 flex-grow">{post.subtitle}</p>
                                        <div className="flex items-center gap-3 mt-auto">
                                            {post.author_avatar ? (
                                                <img src={post.author_avatar} alt={post.author_name} className="w-10 h-10 rounded-full border border-[var(--border)]" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold border border-accent/20">
                                                    {post.author_name ? post.author_name.charAt(0) : 'M'}
                                                </div>
                                            )}
                                            <span className="font-medium text-sm">{post.author_name || 'Malik Logix'}</span>
                                        </div>

                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
