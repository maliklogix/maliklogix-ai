import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const formRef = useRef(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const ctx = gsap.context(() => {
            gsap.from('.contact-animate', {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out'
            });
        });
        return () => ctx.revert();
    }, []);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.target);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
            console.log("Submitting to:", `${apiUrl}/api/leads`);
            console.log("Form Data:", Object.fromEntries(formData));

            const response = await fetch(`${apiUrl}/api/leads`, {
                method: "POST",
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setIsSubmitted(true);
                e.target.reset();
            } else {
                const data = await response.json().catch(() => ({}));
                console.error("Server Error Response:", data);
                if (Object.hasOwn(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else if (data.error) {
                    alert(`Submission failed: ${data.error}`);
                } else {
                    alert("Oops! There was a problem submitting your form. Please check if the server is running on port 3001.");
                }
            }
        } catch (error) {
            console.error("Submission Crash:", error);
            alert(`Oops! There was a problem submitting your form: ${error.message}. Please restart the server.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-32 pb-20 px-8 lg:px-20 min-h-screen bg-[var(--background)] transition-colors duration-500 overflow-visible">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="contact-animate text-5xl md:text-7xl font-display font-bold mb-6 text-[var(--foreground)]">
                        Ready to Automate <span className="text-accent underline decoration-accent/20 underline-offset-8">Your Business?</span>
                    </h1>
                    <p className="contact-animate text-[var(--secondary)] text-xl max-w-2xl mx-auto font-body">
                        Tell us what's slowing you down. We'll tell you exactly how to fix it.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-12">
                        {[
                            { icon: <Mail size={24} />, label: "Email Us", value: "hello@maliklogix.com" },
                            { icon: <Phone size={24} />, label: "Call Us", value: "+92 315 8304046" },
                            { icon: <MapPin size={24} />, label: "Office", value: "Lahore, Punjab, PK" }
                        ].map((item, i) => (
                            <div key={i} className="contact-animate group">
                                <div className="flex gap-6 items-center">
                                    <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-mono text-accent uppercase tracking-[0.2em] mb-1 font-bold">{item.label}</p>
                                        <p className="text-2xl font-display font-medium text-[var(--foreground)] tracking-tight">{item.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="contact-animate p-10 bg-[var(--foreground)]/[0.03] border border-[var(--border)] rounded-[2.5rem] backdrop-blur-sm relative">
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                                <Send size={20} />
                            </div>
                            <p className="text-xl italic text-[var(--foreground)]/70 font-body leading-relaxed">
                                "The best time to automate was yesterday. The second best time is now. Let's make it happen."
                            </p>
                            <div className="mt-8 flex items-center gap-4">
                                <div className="w-12 h-12 bg-accent rounded-full border-2 border-[var(--background)] shadow-xl flex items-center justify-center text-white font-bold">ML</div>
                                <div>
                                    <p className="text-[var(--foreground)] font-bold">Malik Logix</p>
                                    <p className="text-[10px] text-accent font-mono uppercase tracking-widest">Growth Architect</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-animate">
                        {isSubmitted ? (
                            <div className="p-12 md:p-20 bg-accent/10 border border-accent/40 rounded-[2.5rem] shadow-2xl backdrop-blur-xl text-center space-y-6">
                                <div className="w-20 h-20 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-accent/40">
                                    <CheckCircle size={40} />
                                </div>
                                <h2 className="text-3xl font-display font-bold text-[var(--foreground)]">Message Sent Successfully</h2>
                                <p className="text-[var(--secondary)] text-lg font-body leading-relaxed max-w-sm mx-auto">
                                    Thank you for reaching out! Your message has been sent directly to our team. We will get back to you within 24 hours.
                                </p>
                                <button onClick={() => setIsSubmitted(false)} className="text-accent font-mono text-xs uppercase tracking-widest font-bold hover:underline">
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 p-8 md:p-12 bg-[var(--foreground)]/[0.02] border border-[var(--border)] rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative z-10">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent ml-2 font-bold">Name</label>
                                        <input name="name" type="text" required placeholder="John Doe" className="w-full bg-[var(--background)] border border-[var(--border)] p-4 rounded-xl focus:border-accent outline-none text-[var(--foreground)] transition-all placeholder:text-[var(--secondary)]/40 hover:border-accent/30 shadow-sm" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent ml-2 font-bold">Email</label>
                                        <input name="email" type="email" required placeholder="john@company.com" className="w-full bg-[var(--background)] border border-[var(--border)] p-4 rounded-xl focus:border-accent outline-none text-[var(--foreground)] transition-all placeholder:text-[var(--secondary)]/40 hover:border-accent/30 shadow-sm" />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent ml-2 font-bold">Business Type</label>
                                        <select name="businessType" required className="w-full bg-[var(--background)] border border-[var(--border)] p-4 rounded-xl focus:border-accent outline-none text-[var(--foreground)] transition-all hover:border-accent/30 shadow-sm appearance-none cursor-pointer">
                                            <option value="">Select Business Type</option>
                                            <option value="e-commerce">E-Commerce</option>
                                            <option value="agency">Agency / Service</option>
                                            <option value="saas">SaaS / Tech</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent ml-2 font-bold">Monthly Budget</label>
                                        <select name="budget" required className="w-full bg-[var(--background)] border border-[var(--border)] p-4 rounded-xl focus:border-accent outline-none text-[var(--foreground)] transition-all hover:border-accent/30 shadow-sm appearance-none cursor-pointer">
                                            <option value="">Select Budget</option>
                                            <option value="< $1k">Less than $1,000</option>
                                            <option value="$1k - $5k">$1,000 - $5,000</option>
                                            <option value="$5k+">$5,000+</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent ml-2 font-bold">Message</label>
                                    <textarea name="message" rows="4" required placeholder="Tell us about your growth goals..." className="w-full bg-[var(--background)] border border-[var(--border)] p-4 rounded-xl focus:border-accent outline-none text-[var(--foreground)] transition-all resize-none placeholder:text-[var(--secondary)]/40 hover:border-accent/30 shadow-sm"></textarea>
                                </div>

                                <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-accent text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-accent/40 text-lg uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isSubmitting ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <Send size={20} />
                                    )}
                                    {isSubmitting ? 'Sending...' : 'Request My Free Automation Audit'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Decorative ambient lighting footer for contact page */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        </div>
    );
};

const CheckCircle = ({ size, className }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);

export default Contact;
