import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, X, Link as LinkIcon, Image as ImageIcon, Ticket, Save, ChevronRight, Tags, Upload, Clock } from 'lucide-react';
import { useToast } from '../../../components/dash/Toast';

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

    if (!expiryDate) return null;
    if (timeLeft.expired) return <div className="text-[10px] font-bold text-red-500 uppercase flex items-center gap-1"><Clock size={12}/> Expired</div>;

    return (
        <div className="flex gap-1 font-mono text-xs font-bold items-center text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100">
            <Clock size={12} className="text-gray-400 mr-1" />
            <span className="bg-white px-1.5 py-0.5 rounded shadow-sm border border-gray-100 min-w-[28px] text-center">{timeLeft.h}</span> :
            <span className="bg-white px-1.5 py-0.5 rounded shadow-sm border border-gray-100 min-w-[28px] text-center">{timeLeft.m}</span> :
            <span className="bg-white px-1.5 py-0.5 rounded shadow-sm border border-gray-100 min-w-[28px] text-center text-red-500">{timeLeft.s}</span>
        </div>
    );
};

const StackManager = () => {
    const { addToast } = useToast();
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [coupons, setCoupons] = useState([]);
    
    // UI state
    const [loading, setLoading] = useState(false);
    const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
    const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
    
    // Form state
    const [companyForm, setCompanyForm] = useState({ id: '', name: '', description: '', logo_url: '', affiliate_url: '', status: 'active' });
    const [couponForm, setCouponForm] = useState({ id: '', company_id: '', title: '', description: '', type: 'deal', code: '', affiliate_url: '', status: 'active' });

    useEffect(() => {
        fetchCompanies();
    }, []);

    useEffect(() => {
        if (selectedCompany) {
            fetchCoupons(selectedCompany.id);
        } else {
            setCoupons([]);
        }
    }, [selectedCompany]);

    const fetchCompanies = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/stack/companies`);
            const data = await res.json();
            setCompanies(data);
        } catch (error) {
            addToast('Error fetching companies', 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchCoupons = async (companyId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/stack/companies/${companyId}/coupons`);
            const data = await res.json();
            setCoupons(data);
        } catch (error) {
            addToast('Error fetching coupons', 'error');
        }
    };

    // COMPANY ACTIONS
    const handleOpenCompanyModal = (company = null) => {
        if (company) {
            setCompanyForm(company);
        } else {
            setCompanyForm({ id: '', name: '', description: '', logo_url: '', affiliate_url: '', status: 'active' });
        }
        setIsCompanyModalOpen(true);
    };

    const handleSaveCompany = async (e) => {
        e.preventDefault();
        try {
            const isEdit = !!companyForm.id;
            const url = isEdit 
                ? `${import.meta.env.VITE_API_URL || ""}/api/admin/stack/companies/${companyForm.id}`
                : `${import.meta.env.VITE_API_URL || ""}/api/admin/stack/companies`;
                
            const res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(companyForm)
            });
            const data = await res.json();
            
            if (res.ok) {
                addToast(`Company ${isEdit ? 'updated' : 'added'} successfully`, 'success');
                setIsCompanyModalOpen(false);
                fetchCompanies();
                if (isEdit && selectedCompany && selectedCompany.id === companyForm.id) {
                    setSelectedCompany({ ...selectedCompany, ...companyForm });
                }
            } else {
                throw new Error(data.error || 'Failed to save');
            }
        } catch (error) {
            addToast(error.message, 'error');
        }
    };

    const handleDeleteCompany = async (id, e) => {
        e.stopPropagation();
        if (!window.confirm('Are you sure you want to delete this company and all its deals?')) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/stack/companies/${id}`, { method: 'DELETE' });
            if (res.ok) {
                addToast('Company deleted', 'success');
                if (selectedCompany && selectedCompany.id === id) setSelectedCompany(null);
                fetchCompanies();
            }
        } catch (error) {
            addToast('Error deleting company', 'error');
        }
    };

    // COUPON ACTIONS
    const handleOpenCouponModal = (coupon = null) => {
        if (coupon) {
            // When editing, format the datetime string for HTML input if it exists
            const formattedCoupon = { ...coupon };
            if (formattedCoupon.expiry_date) {
                // Ensure it's in YYYY-MM-DDThh:mm format for datetime-local
                formattedCoupon.expiry_date = new Date(formattedCoupon.expiry_date).toISOString().slice(0, 16);
            }
            setCouponForm(formattedCoupon);
        } else {
            setCouponForm({ id: '', company_id: selectedCompany.id, title: '', description: '', type: 'deal', code: '', affiliate_url: '', status: 'active', expiry_date: '' });
        }
        setIsCouponModalOpen(true);
    };

    const handleSaveCoupon = async (e) => {
        e.preventDefault();
        try {
            const isEdit = !!couponForm.id;
            const url = isEdit 
                ? `${import.meta.env.VITE_API_URL || ""}/api/admin/stack/coupons/${couponForm.id}`
                : `${import.meta.env.VITE_API_URL || ""}/api/admin/stack/coupons`;
                
            const res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...couponForm, company_id: selectedCompany.id })
            });
            const data = await res.json();
            
            if (res.ok) {
                addToast(`Item ${isEdit ? 'updated' : 'added'} successfully`, 'success');
                setIsCouponModalOpen(false);
                fetchCoupons(selectedCompany.id);
            } else {
                throw new Error(data.error || 'Failed to save');
            }
        } catch (error) {
            addToast(error.message, 'error');
        }
    };

    const handleDeleteCoupon = async (id) => {
        if (!window.confirm('Delete this item?')) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/admin/stack/coupons/${id}`, { method: 'DELETE' });
            if (res.ok) {
                addToast('Item deleted', 'success');
                fetchCoupons(selectedCompany.id);
            }
        } catch (error) {
            addToast('Error deleting item', 'error');
        }
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6">
            
            {/* LEFT COLUMN - COMPANIES LIST */}
            <div className="w-full lg:w-1/3 flex flex-col h-full bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex-shrink-0">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 font-display">Stack Companies</h2>
                        <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mt-1">Manage Partners</p>
                    </div>
                    <button 
                        onClick={() => handleOpenCompanyModal()}
                        className="p-2.5 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
                        title="Add New Company"
                    >
                        <Plus size={18} />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                    {loading ? (
                        <div className="animate-pulse space-y-3">
                            {[1,2,3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-2xl w-full"></div>)}
                        </div>
                    ) : companies.length === 0 ? (
                        <div className="text-center p-10 text-gray-400 text-sm italic border-2 border-dashed border-gray-100 rounded-2xl">
                            No companies added yet.
                        </div>
                    ) : (
                        companies.map(comp => (
                            <div 
                                key={comp.id}
                                onClick={() => setSelectedCompany(comp)}
                                className={`flex items-center p-3 rounded-2xl cursor-pointer transition-all border ${selectedCompany?.id === comp.id ? 'bg-accent/5 border-accent/20' : 'bg-white border-transparent hover:border-gray-100'} group`}
                            >
                                {comp.logo_url ? (
                                    <img src={comp.logo_url} alt={comp.name} className="w-10 h-10 rounded-xl object-contain bg-transparent border border-gray-100 shrink-0" />
                                ) : (
                                    <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-400 flex items-center justify-center shrink-0">
                                        <ImageIcon size={18} />
                                    </div>
                                )}
                                <div className="ml-3 flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-gray-900 truncate">{comp.name}</h4>
                                    <p className="text-xs text-gray-400 truncate">{comp.status}</p>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={(e) => { e.stopPropagation(); handleOpenCompanyModal(comp); }} className="p-1.5 text-gray-400 hover:text-accent rounded-lg">
                                        <Edit2 size={14} />
                                    </button>
                                    <button onClick={(e) => handleDeleteCompany(comp.id, e)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* RIGHT COLUMN - COMPANY DETAILS & COUPONS */}
            <div className="w-full lg:w-2/3 h-full flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative">
                {!selectedCompany ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                        <Tags size={48} className="mb-4 opacity-20" />
                        <h3 className="text-lg font-bold text-gray-600 mb-2 font-display">No Company Selected</h3>
                        <p className="text-sm max-w-sm">Select a company from the sidebar to manage their coupons, deals, and affiliate links.</p>
                    </div>
                ) : (
                    <>
                        <div className="p-6 md:p-8 border-b border-gray-100 bg-gradient-to-br from-gray-50/80 to-transparent">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div className="flex items-start gap-5">
                                    {selectedCompany.logo_url ? (
                                        <img src={selectedCompany.logo_url} alt={selectedCompany.name} className="w-20 h-20 rounded-2xl object-contain bg-transparent border border-gray-200 shadow-sm shrink-0 p-1" />
                                    ) : (
                                        <div className="w-20 h-20 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center shrink-0">
                                            <ImageIcon size={32} />
                                        </div>
                                    )}
                                    <div>
                                        <h2 className="text-2xl font-black font-display text-gray-900">{selectedCompany.name}</h2>
                                        <p className="text-sm text-gray-500 mt-1 max-w-lg">{selectedCompany.description || 'No description provided.'}</p>
                                        <div className="flex items-center gap-4 mt-3">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${selectedCompany.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {selectedCompany.status}
                                            </span>
                                            {selectedCompany.affiliate_url && (
                                                <a href={selectedCompany.affiliate_url} target="_blank" rel="noreferrer" className="text-xs font-bold text-accent hover:underline flex items-center gap-1">
                                                    <LinkIcon size={12} /> Default Affiliate Link
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleOpenCouponModal()}
                                    className="px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-colors flex items-center gap-2 shadow-lg shadow-gray-900/20 whitespace-nowrap"
                                >
                                    <Plus size={16} /> Add Offer
                                </button>
                            </div>
                        </div>

                        {/* List of Coupons */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-gray-50/30">
                            {coupons.length === 0 ? (
                                <div className="text-center p-12 bg-white rounded-3xl border border-dashed border-gray-200">
                                    <Ticket size={32} className="mx-auto text-gray-300 mb-3" />
                                    <p className="text-sm font-bold text-gray-600">No active offers</p>
                                    <p className="text-xs text-gray-400 mt-1">Add a coupon or deal to start displaying it on the public Stack page.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {coupons.map(coupon => (
                                        <div key={coupon.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative group hover:border-accent/30 transition-colors">
                                            <div className="flex items-start justify-between mb-3">
                                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${coupon.type === 'coupon' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                                                    {coupon.type}
                                                </span>
                                                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => handleOpenCouponModal(coupon)} className="p-1.5 bg-gray-50 text-gray-500 hover:text-accent rounded-lg"><Edit2 size={12} /></button>
                                                    <button onClick={() => handleDeleteCoupon(coupon.id)} className="p-1.5 bg-gray-50 text-gray-500 hover:text-red-500 rounded-lg"><Trash2 size={12} /></button>
                                                </div>
                                            </div>
                                            <h4 className="text-base font-bold text-gray-900 leading-tight mb-2">{coupon.title}</h4>
                                            {coupon.description && <p className="text-xs text-gray-500 mb-4 line-clamp-2">{coupon.description}</p>}
                                            
                                            <div className="mt-auto space-y-2">
                                                <CountdownTimer expiryDate={coupon.expiry_date} />
                                                {coupon.type === 'coupon' && coupon.code && (
                                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 flex items-center justify-between">
                                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Code</span>
                                                        <span className="text-xs font-mono font-bold text-gray-900">{coupon.code}</span>
                                                    </div>
                                                )}
                                                {coupon.affiliate_url && (
                                                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-accent">
                                                        <LinkIcon size={12} /> Custom Link Set
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* MODALS */}
            {isCompanyModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold font-display">{companyForm.id ? 'Edit Company' : 'Add New Company'}</h3>
                            <button onClick={() => setIsCompanyModalOpen(false)} className="text-gray-400 hover:text-gray-900"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSaveCompany} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Company Name <span className="text-red-500">*</span></label>
                                <input required type="text" value={companyForm.name} onChange={e => setCompanyForm({...companyForm, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Description (1-line)</label>
                                <input type="text" value={companyForm.description} onChange={e => setCompanyForm({...companyForm, description: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Company Logo</label>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input type="text" value={companyForm.logo_url} onChange={e => setCompanyForm({...companyForm, logo_url: e.target.value})} className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" placeholder="Paste image URL..." />
                                    
                                    <label className="shrink-0 cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 text-xs font-bold px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                                        <Upload size={14} /> Upload Image
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            className="hidden" 
                                            onChange={async (e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    const formData = new FormData();
                                                    formData.append('image', e.target.files[0]);
                                                    try {
                                                        const res = await fetch('/api/admin/upload', {
                                                            method: 'POST',
                                                            body: formData
                                                        });
                                                        const data = await res.json();
                                                        if (res.ok && data.url) {
                                                            setCompanyForm({...companyForm, logo_url: data.url});
                                                            addToast('Image uploaded', 'success');
                                                        } else {
                                                            addToast(data.error || 'Upload failed', 'error');
                                                        }
                                                    } catch (err) {
                                                        addToast('Network error during upload', 'error');
                                                    }
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                                {companyForm.logo_url && (
                                    <div className="mt-3 p-2 bg-gray-50 border border-gray-100 rounded-xl inline-block max-w-[120px]">
                                        <img src={companyForm.logo_url} alt="Logo preview" className="w-full h-auto object-contain" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Default Affiliate Link</label>
                                <input type="url" value={companyForm.affiliate_url} onChange={e => setCompanyForm({...companyForm, affiliate_url: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" placeholder="https://" />
                            </div>
                            <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsCompanyModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-accent hover:bg-accent/90 rounded-xl shadow-lg shadow-accent/20 transition-all">Save Company</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isCouponModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold font-display">{couponForm.id ? 'Edit Offer' : 'Add New Offer'}</h3>
                            <button onClick={() => setIsCouponModalOpen(false)} className="text-gray-400 hover:text-gray-900"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSaveCoupon} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Type <span className="text-red-500">*</span></label>
                                    <select value={couponForm.type} onChange={e => setCouponForm({...couponForm, type: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all">
                                        <option value="deal">Deal</option>
                                        <option value="coupon">Coupon</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Status</label>
                                    <select value={couponForm.status} onChange={e => setCouponForm({...couponForm, status: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all">
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Title <span className="text-red-500">*</span></label>
                                <input required type="text" value={couponForm.title} onChange={e => setCouponForm({...couponForm, title: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" placeholder="e.g. 50% Off Annual Plan" />
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Description</label>
                                <textarea value={couponForm.description} onChange={e => setCouponForm({...couponForm, description: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all min-h-[80px]" placeholder="Terms or extra details" />
                            </div>
                            
                            {couponForm.type === 'coupon' && (
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Coupon Code <span className="text-red-500">*</span></label>
                                    <input required type="text" value={couponForm.code} onChange={e => setCouponForm({...couponForm, code: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-mono" placeholder="e.g. SAVE50" />
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Custom Affiliate Link <span className="text-gray-400 font-normal normal-case">(Optional)</span></label>
                                <input type="url" value={couponForm.affiliate_url} onChange={e => setCouponForm({...couponForm, affiliate_url: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" placeholder="Overrides company default" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Expiry Date & Time <span className="text-gray-400 font-normal normal-case">(Optional for Live Timer)</span></label>
                                <input type="datetime-local" value={couponForm.expiry_date || ''} onChange={e => setCouponForm({...couponForm, expiry_date: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" />
                            </div>
                            
                            <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsCouponModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-accent hover:bg-accent/90 rounded-xl shadow-lg shadow-accent/20 transition-all">Save Offer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StackManager;
