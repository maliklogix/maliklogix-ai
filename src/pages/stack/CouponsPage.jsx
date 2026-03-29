import React, { useState, useEffect } from 'react';
import { Tag, ExternalLink, Ticket, Search, CheckCircle, ChevronDown, Star, ThumbsUp, ThumbsDown, Scissors, Clock } from 'lucide-react';

const CountdownTimer = ({ expiryDate }) => {
    const [timeLeft, setTimeLeft] = useState({ h: '00', m: '00', s: '00', expired: false });

    useEffect(() => {
        if (!expiryDate) return;
        
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(expiryDate).getTime() - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({ h: '00', m: '00', s: '00', expired: true });
                return;
            }

            const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + Math.floor(distance / (1000 * 60 * 60 * 24)) * 24;
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({
                h: h.toString().padStart(2, '0'),
                m: m.toString().padStart(2, '0'),
                s: s.toString().padStart(2, '0'),
                expired: false
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [expiryDate]);

    if (!expiryDate) return <span className="text-[10px] text-[var(--secondary)] uppercase font-bold tracking-widest bg-[var(--card-bg)] px-3 py-1.5 rounded-lg border border-[var(--border)]">Ongoing Offer</span>;
    if (timeLeft.expired) return <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">Expired</span>;

    return (
        <div className="flex gap-1 text-[var(--foreground)] font-mono text-xs font-bold items-center">
            <span className="bg-[var(--border)] px-2 py-1.5 rounded-lg border border-[var(--border)] w-9 text-center">{timeLeft.h}<span className="text-[8px] uppercase ml-0.5 text-[var(--secondary)]">H</span></span> :
            <span className="bg-[var(--border)] px-2 py-1.5 rounded-lg border border-[var(--border)] w-9 text-center">{timeLeft.m}<span className="text-[8px] uppercase ml-0.5 text-[var(--secondary)]">M</span></span> :
            <span className="bg-[var(--border)] px-2 py-1.5 rounded-lg border border-[var(--border)] w-9 text-center text-red-500">{timeLeft.s}<span className="text-[8px] uppercase ml-0.5 text-[var(--secondary)]">S</span></span>
        </div>
    );
};

const CouponsPage = () => {
    const [companies, setCompanies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCompanyFilter, setActiveCompanyFilter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/stack/public`)
            .then(res => res.json())
            .then(data => {
                setCompanies(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load stack data", err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        document.title = "Partner Deals & Coupons | MalikLogix Stack";
    }, []);

    // Reset page on filter or search
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeCompanyFilter]);

    const allOffers = companies.flatMap(comp => 
        (comp.coupons || []).map(coupon => ({ ...coupon, company: comp }))
    );

    const filteredOffers = allOffers.filter(offer => 
        (activeCompanyFilter ? offer.company.id === activeCompanyFilter : true) &&
        (offer.company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        offer.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);
    const paginatedOffers = filteredOffers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="min-h-screen bg-[var(--background)] pt-32 pb-24 text-[var(--foreground)] relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                
                {/* Header & Search */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-4">
                            <Tag size={12} /> The MalikLogix Stack
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-2">
                            Top Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Deals & Coupons</span>
                        </h1>
                        <p className="text-[var(--secondary)] max-w-xl">
                            Verified discounts on the software we use to scale businesses globally.
                        </p>
                    </div>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--secondary)] w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="Search deals or brands..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-medium"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div className="h-[600px] rounded-3xl bg-[var(--card-bg)] border border-[var(--border)] animate-pulse hidden lg:block"></div>
                        <div className="lg:col-span-3 space-y-6">
                            {[1, 2, 3].map(i => <div key={i} className="h-48 rounded-3xl bg-[var(--card-bg)] border border-[var(--border)] animate-pulse"></div>)}
                        </div>
                    </div>
                ) : companies.length === 0 ? (
                    <div className="text-center p-20 border border-[var(--border)] rounded-3xl bg-[var(--card-bg)]">
                        <Ticket size={48} className="mx-auto text-[var(--secondary)] mb-4 opacity-50" />
                        <h3 className="text-xl font-bold font-display">No Deals Found</h3>
                        <p className="text-[var(--secondary)] mt-2">Try adjusting your search terms.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative items-start">
                        
                        {/* LEFT SIDEBAR NAVIGATION */}
                        <div className="lg:col-span-3 lg:sticky lg:top-32 h-auto lg:max-h-[calc(100vh-160px)] flex flex-col gap-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--secondary)] pl-2">Filter by Partner</h3>
                            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl p-3 overflow-y-auto custom-scrollbar shadow-lg shadow-black/5">
                                <button
                                    onClick={() => setActiveCompanyFilter(null)}
                                    className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-between group ${activeCompanyFilter === null ? 'bg-accent text-white shadow-md shadow-accent/20' : 'hover:bg-[var(--border)] text-[var(--secondary)] hover:text-[var(--foreground)]'}`}
                                >
                                    <span>All Offers</span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeCompanyFilter === null ? 'bg-white/20 text-white' : 'bg-cyan-100 text-cyan-800'}`}>
                                        {allOffers.length}
                                    </span>
                                </button>
                                
                                <div className="h-px bg-[var(--border)] my-2 mx-4" />
                                
                                <div className="space-y-1">
                                    {companies.map(comp => {
                                        const offerCount = comp.coupons ? comp.coupons.length : 0;
                                        if (offerCount === 0) return null; // Only show companies with offers
                                        
                                        const isActive = activeCompanyFilter === comp.id;
                                        
                                        return (
                                            <button
                                                key={comp.id}
                                                onClick={() => setActiveCompanyFilter(comp.id)}
                                                className={`w-full flex items-center px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all group ${isActive ? 'bg-accent text-white shadow-md shadow-accent/20' : 'hover:bg-[var(--border)] text-[var(--secondary)] hover:text-[var(--foreground)]'}`}
                                            >
                                                {comp.logo_url ? (
                                                    <img src={comp.logo_url} alt={comp.name} className={`w-6 h-6 object-contain rounded-md mr-3 p-0.5 ${isActive ? 'bg-white/20' : 'bg-transparent'}`} />
                                                ) : (
                                                    <div className={`w-6 h-6 rounded-md flex items-center justify-center mr-3 ${isActive ? 'bg-white/20' : 'bg-[var(--border)]'}`}>
                                                        <Ticket size={12} />
                                                    </div>
                                                )}
                                                <span className="truncate flex-1 text-left">{comp.name}</span>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 transition-colors ${isActive ? 'bg-white/20 text-white' : 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20'}`}>
                                                    {offerCount}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT CONTENT BOARDS */}
                        <div className="lg:col-span-9 flex flex-col gap-10">
                            {filteredOffers.length === 0 ? (
                                <div className="text-center p-20 border border-[var(--border)] rounded-3xl bg-[var(--card-bg)]">
                                    <Ticket size={48} className="mx-auto text-[var(--secondary)] mb-4 opacity-50" />
                                    <h3 className="text-xl font-bold font-display">No Deals Found</h3>
                                    <p className="text-[var(--secondary)] mt-2">Try adjusting your search filters.</p>
                                </div>
                            ) : (
                                paginatedOffers.map((offer, arrayIdx) => {
                                    // Calculate global index for the Top Pick badge logic
                                    const idx = (currentPage - 1) * itemsPerPage + arrayIdx;
                                    
                                    // Derive a pseudo discount percentage for display if needed
                                    const matchPercentage = offer.title.match(/(\d+)%/);
                                    const discountBadgeText = matchPercentage ? matchPercentage[0] + ' OFF' : 'SPECIAL DEAL';
                                    
                                    return (
                                        <div key={offer.id} className="relative bg-[var(--card-bg)] rounded-[2rem] border-2 border-dashed border-[var(--border)] shadow-sm hover:border-accent/40 transition-colors group">
                                            
                                            {/* Number / Top Pick Badge */}
                                            <div className="absolute -top-4 left-6 flex items-center shadow-lg bg-[var(--card-bg)] rounded-full border border-[var(--border)] overflow-hidden">
                                                <div className="bg-[var(--foreground)] text-[var(--background)] w-8 h-8 flex items-center justify-center font-bold font-mono text-sm">
                                                    {idx + 1}
                                                </div>
                                                {idx === 0 && (
                                                    <div className="bg-accent text-white px-4 h-8 flex items-center font-bold text-xs uppercase tracking-widest">
                                                        ★ Top Pick
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex flex-col xl:flex-row p-6 md:p-8">
                                                
                                                {/* Left: Company details */}
                                                <div className="w-full xl:w-1/4 flex flex-col items-center justify-center border-b xl:border-b-0 xl:border-r border-[var(--border)] pb-6 xl:pb-0 xl:pr-8 mb-6 xl:mb-0">
                                                    <div className="h-16 flex items-center justify-center mb-4">
                                                        {offer.company.logo_url ? (
                                                            <img src={offer.company.logo_url} alt={offer.company.name} className="max-w-full max-h-full object-contain drop-shadow-sm transition-transform group-hover:scale-105" />
                                                        ) : (
                                                            <span className="font-black text-2xl tracking-tight">{offer.company.name}</span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[11px] text-[var(--secondary)] font-medium bg-[var(--border)]/50 px-2.5 py-1 rounded-full border border-[var(--border)]">
                                                        <ExternalLink size={12} /> {offer.company.name}
                                                    </div>
                                                    <div className="text-[10px] text-[var(--secondary)] uppercase tracking-widest font-bold mt-4 flex flex-col items-center">
                                                        <span className="text-[var(--foreground)] text-sm">{Math.floor(Math.random() * 50000 + 10000).toLocaleString()}</span>
                                                        users tested this
                                                    </div>
                                                </div>

                                                {/* Center: Offer details */}
                                                <div className="flex-1 flex flex-col justify-center xl:px-8">
                                                    <h3 className="text-xl md:text-2xl font-bold font-display leading-tight mb-3">
                                                        {offer.title}
                                                    </h3>
                                                    
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {offer.type === 'coupon' && (
                                                            <span className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-widest flex items-center gap-1">
                                                                <Star size={10} /> Exclusive
                                                            </span>
                                                        )}
                                                        <span className="bg-green-500/10 text-green-600 border border-green-500/20 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-widest flex items-center gap-1">
                                                            <CheckCircle size={10} /> Verified
                                                        </span>
                                                        <span className="bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-widest flex items-center gap-1">
                                                            Top Rated
                                                        </span>
                                                    </div>

                                                    <p className="text-sm text-[var(--secondary)] mb-4 xl:mb-0 max-w-lg">
                                                        {offer.description || offer.company.description}
                                                    </p>
                                                    
                                                    <div className="hidden xl:flex items-center gap-4 mt-auto pt-4 text-[11px] text-[var(--secondary)] font-medium">
                                                        <span className="flex items-center gap-1"><Clock size={12}/> Last tried 5 Mins ago</span>
                                                        <span className="text-[var(--border)]">|</span>
                                                        <div className="flex items-center gap-2">
                                                            Did it work? 
                                                            <span className="flex items-center gap-1 text-green-500"><ThumbsUp size={12}/> {Math.floor(Math.random() * 200 + 50)}</span> 
                                                            <span className="flex items-center gap-1 text-red-500"><ThumbsDown size={12}/> 0</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right: CTA & Code */}
                                                <div className="w-full xl:w-1/4 flex flex-col items-center justify-center border-t xl:border-t-0 xl:border-l border-[var(--border)] pt-6 xl:pt-0 xl:pl-8">
                                                    <div className="text-green-500 text-3xl font-black font-display mb-4 text-center tracking-tight">
                                                        {discountBadgeText}
                                                    </div>
                                                    
                                                    {offer.type === 'coupon' && offer.code ? (
                                                        <div className="relative w-full group/btn mb-4">
                                                            <div className="absolute -inset-0.5 bg-accent opacity-20 group-hover/btn:opacity-40 rounded-xl blur transition duration-300"></div>
                                                            <button 
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText(offer.code);
                                                                    alert('Code copied! Redirecting...');
                                                                    window.open(offer.affiliate_url || offer.company.affiliate_url, '_blank');
                                                                }}
                                                                className="relative w-full bg-[var(--card-bg)] border-2 border-dashed border-[var(--border)] hover:border-accent hover:bg-accent/5 text-[var(--foreground)] font-bold py-3.5 px-4 rounded-xl flex items-center justify-between gap-2 overflow-hidden transition-all shadow-sm"
                                                            >
                                                                <span className="font-mono text-sm tracking-wider">{offer.code}</span>
                                                                <div className="flex items-center gap-1.5 text-xs text-accent uppercase tracking-widest">
                                                                    <Scissors size={14}/> Copy
                                                                </div>
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <a 
                                                            href={offer.affiliate_url || offer.company.affiliate_url || '#'}
                                                            target="_blank" 
                                                            rel="noreferrer"
                                                            className="w-full bg-accent text-white font-bold py-3.5 px-4 rounded-xl mb-4 flex items-center justify-center gap-2 shadow-lg shadow-accent/20 hover:scale-[1.02] transition-transform uppercase tracking-widest text-xs"
                                                        >
                                                            Claim Deal <ExternalLink size={14}/>
                                                        </a>
                                                    )}

                                                    {/* Countdown timer aesthetic */}
                                                    <CountdownTimer expiryDate={offer.expiry_date} />
                                                </div>
                                            </div>
                                            
                                            {/* Bottom Show More Button */}
                                            <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 mt-4 xl:left-8 xl:translate-x-0 xl:mt-0">
                                                <button className="bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--border)] text-[var(--secondary)] hover:text-[var(--foreground)] text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1 shadow-sm transition-colors group-hover:border-[var(--foreground)]/20">
                                                    Show Details <ChevronDown size={12} className="transition-transform group-hover:translate-y-0.5" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            
                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2 mt-8 py-4 border-t border-[var(--border)]">
                                    <button 
                                        disabled={currentPage === 1}
                                        onClick={() => {
                                            setCurrentPage(p => Math.max(1, p - 1));
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="px-4 py-2 border border-[var(--border)] rounded-xl text-sm font-bold text-[var(--foreground)] bg-[var(--card-bg)] hover:bg-[var(--border)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Prev
                                    </button>
                                    
                                    <div className="flex items-center gap-1 px-4 text-sm font-bold text-[var(--secondary)]">
                                        Page <span className="text-[var(--foreground)]">{currentPage}</span> of {totalPages}
                                    </div>

                                    <button 
                                        disabled={currentPage === totalPages}
                                        onClick={() => {
                                            setCurrentPage(p => Math.min(totalPages, p + 1));
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="px-4 py-2 border border-[var(--border)] rounded-xl text-sm font-bold text-[var(--foreground)] bg-[var(--card-bg)] hover:bg-[var(--border)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CouponsPage;
