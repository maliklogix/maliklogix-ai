import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Tag, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

const LatestPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/posts`)
            .then(res => res.json())
            .then(data => {
                // Get only the latest 3 posts
                setPosts(data.slice(0, 3));
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!loading && posts.length > 0) {
            gsap.registerPlugin(ScrollTrigger);
            const ctx = gsap.context(() => {
                gsap.from(cardsRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                    y: 40,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: 'power2.out',
                });
            }, sectionRef);

            return () => ctx.revert();
        }
    }, [loading, posts]);

    return (
        <section ref={sectionRef} className="py-24 px-8 lg:px-20 bg-[var(--background)] transition-colors duration-500 border-t border-[var(--border)]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="max-w-3xl">
                        <h2 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-4">Inside our Studio</h2>
                        <h3 className="text-4xl md:text-6xl font-display font-bold text-[var(--foreground)] leading-tight mb-6">
                            Latest from <span className="text-accent">Us</span>
                        </h3>
                        <p className="text-[var(--secondary)] text-xl leading-relaxed font-body">
                            Deep dives into AI strategy, automation workflows, and the future of digital operations. 
                            We share what we learn from building systems for high-growth agencies.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <Link to="/blog" className="flex items-center gap-2 text-accent font-bold hover:gap-3 transition-all duration-300">
                            Our Full Journal <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-[450px] bg-[var(--foreground)]/[0.02] rounded-[2.5rem] animate-pulse border border-[var(--border)]" />
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, i) => (
                            <Link 
                                key={post.id} 
                                to={`/blog/${post.slug}`}
                                ref={el => cardsRef.current[i] = el}
                                className="group h-full bg-[var(--foreground)]/[0.02] border border-[var(--border)] rounded-[2.5rem] overflow-hidden hover:border-accent/40 transition-all duration-300 flex flex-col hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/5"
                            >
                                <div className="h-56 bg-[var(--background)] relative overflow-hidden">
                                    {post.cover_image_url ? (
                                        <img 
                                            src={post.cover_image_url} 
                                            alt={post.title} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/5 to-transparent flex flex-col items-center justify-center p-6">
                                            <Tag size={32} className="text-accent mb-2 opacity-40" />
                                        </div>
                                    )}
                                    <div className="absolute top-6 left-6">
                                        <span className="px-4 py-1.5 bg-accent/90 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-10 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-[10px] text-[var(--secondary)] mb-6 font-mono uppercase tracking-widest">
                                        <span>{post.published_at ? format(new Date(post.published_at), 'MMM dd, yyyy') : 'Recently'}</span>
                                        <span className="w-1 h-1 rounded-full bg-accent/50" />
                                        <span className="flex items-center gap-1"><Clock size={12} /> {post.read_time_mins} min</span>
                                    </div>
                                    <h2 className="text-2xl font-display font-bold mb-4 group-hover:text-accent transition-colors line-clamp-2 leading-tight">
                                        {post.title || 'Untitled Post'}
                                    </h2>
                                    <p className="text-[var(--secondary)] line-clamp-3 text-base leading-relaxed mb-8 flex-grow">
                                        {post.subtitle || post.content_html?.replace(/<[^>]*>/g, '').substring(0, 150) || 'Read our latest insights...'}
                                    </p>
                                    <div className="flex items-center gap-3 mt-auto pt-6 border-t border-[var(--border)]">
                                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">
                                            {post.author_name ? post.author_name.charAt(0) : 'M'}
                                        </div>
                                        <span className="font-medium text-sm text-[var(--foreground)]">{post.author_name}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                <div className="mt-12 md:hidden flex justify-start">
                    <Link to="/blog" className="flex items-center gap-2 text-accent font-bold">
                        Our Full Journal <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestPosts;
