import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { 
    Save, 
    Send, 
    ArrowLeft, 
    Image as ImageIcon, 
    Globe, 
    Eye, 
    ChevronRight,
    Loader2,
    X,
    Search,
    Upload
} from 'lucide-react';
import { useToast } from '../../../components/dash/Toast';

const CATEGORIES = [
    'AI Marketing',
    'SEO & Content',
    'Automation',
    'OpenClaw',
    'Case Studies',
    'Company News'
];

const BlogEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const fileInputRef = useRef(null);
    const isEdit = !!id;

    const [loading, setLoading] = useState(id ? true : false);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        slug: '',
        content_html: '',
        category: 'AI Marketing',
        status: 'draft',
        author_name: 'Malik Farooq',
        cover_image_url: '',
        tags: []
    });

    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        if (isEdit) {
            fetch(`http://localhost:3001/api/admin/posts/${id}`)
                .then(res => res.json())
                .then(data => {
                    const tags = typeof data.tags === 'string' ? JSON.parse(data.tags) : (data.tags || []);
                    setFormData({ ...data, tags });
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [id, isEdit]);

    const handleTitleChange = (e) => {
        const title = e.target.value;
        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
        setFormData(prev => ({
            ...prev,
            title,
            slug: isEdit ? prev.slug : slug
        }));
    };

    const handleAddTag = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!formData.tags.includes(tagInput.trim())) {
                setFormData(prev => ({
                    ...prev,
                    tags: [...prev.tags, tagInput.trim()]
                }));
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(t => t !== tagToRemove)
        }));
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formDataPayload = new FormData();
        formDataPayload.append('image', file);

        setUploading(true);
        try {
            const res = await fetch('http://localhost:3001/api/admin/upload', {
                method: 'POST',
                body: formDataPayload
            });
            const data = await res.json();
            if (data.url) {
                setFormData(prev => ({ ...prev, cover_image_url: data.url }));
                showToast('Image uploaded successfully');
            } else {
                throw new Error(data.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            showToast('Failed to upload image', 'error');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async (status = null) => {
        setSaving(true);
        const st = status || formData.status;
        const finalData = { 
            ...formData, 
            status: st,
            published_at: (st === 'published') ? new Date().toISOString() : null
        };

        const url = isEdit 
            ? `http://localhost:3001/api/admin/posts/${id}` 
            : `http://localhost:3001/api/admin/posts`;
        
        const method = isEdit ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalData)
            });
            if (res.ok) {
                showToast('Post saved successfully!');
                navigate('/dash/blog');
            } else {
                showToast('Failed to save post', 'error');
            }
        } catch (err) {
            console.error(err);
            showToast('Error connecting to server', 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="animate-spin text-accent" size={32} /></div>;

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-black">
                    <Link to="/dash/blog" className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-display font-bold text-gray-900">{isEdit ? 'Edit Post' : 'Create New Post'}</h2>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                            <Link to="/dash" className="hover:text-accent">Dashboard</Link>
                            <ChevronRight size={12} />
                            <Link to="/dash/blog" className="hover:text-accent">Blog</Link>
                            <ChevronRight size={12} />
                            <span className="text-gray-600">{isEdit ? 'Edit' : 'New'}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => handleSave('draft')}
                        disabled={saving}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all text-sm disabled:opacity-50"
                    >
                        <Save size={18} /> Save Draft
                    </button>
                    <button 
                        onClick={() => handleSave('published')}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 text-sm disabled:opacity-50"
                    >
                        <Send size={18} /> {isEdit && formData.status === 'published' ? 'Update Post' : 'Publish Now'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 text-black">Post Title</label>
                            <input 
                                type="text"
                                value={formData.title}
                                onChange={handleTitleChange}
                                placeholder="Enter a catchy title..."
                                className="w-full text-2xl font-display font-bold text-gray-900 border-none px-0 focus:ring-0 placeholder:text-gray-200"
                            />
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-400 bg-gray-50 p-3 rounded-xl border border-gray-100 italic">
                            <span>maliklogix.com/blog/</span>
                            <input 
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData(p => ({ ...p, slug: e.target.value }))}
                                className="bg-transparent border-none p-0 text-accent font-medium focus:ring-0 w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Article Content</label>
                            <div className="quill-container border border-gray-100 rounded-2xl overflow-hidden min-h-[500px]">
                                <ReactQuill 
                                    theme="snow" 
                                    value={formData.content_html}
                                    onChange={(content) => setFormData(p => ({ ...p, content_html: content }))}
                                    className="h-[450px]"
                                    modules={{
                                        toolbar: [
                                            [{ 'header': [1, 2, 3, false] }],
                                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                            [{'list': 'ordered'}, {'list': 'bullet'}],
                                            ['link', 'image', 'code-block'],
                                            ['clean']
                                        ],
                                    }}
                                />
                            </div>
                        </div>

                        <div className="space-y-2 pt-4">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Excerpt / Summary</label>
                            <textarea 
                                value={formData.subtitle}
                                onChange={(e) => setFormData(p => ({ ...p, subtitle: e.target.value }))}
                                placeholder="Write a short summary for the blog card and SEO..."
                                rows="3"
                                className="w-full bg-white border border-gray-100 rounded-xl p-4 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all resize-none text-black"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6 text-black">
                    {/* Status Card */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <Globe size={16} className="text-accent" /> Publishing Status
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Current Status:</span>
                                <span className={`font-bold capitalize ${formData.status === 'published' ? 'text-green-500' : 'text-yellow-500'}`}>
                                    {formData.status}
                                </span>
                            </div>
                            <select 
                                value={formData.status}
                                onChange={(e) => setFormData(p => ({ ...p, status: e.target.value }))}
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm font-medium"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                    </div>

                    {/* Taxonomy Card */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            Categories & Tags
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
                                <select 
                                    value={formData.category}
                                    onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm font-medium"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tags (Press Enter)</label>
                                <input 
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleAddTag}
                                    placeholder="Add tag..."
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm"
                                />
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.tags.map(tag => (
                                        <span key={tag} className="flex items-center gap-1.5 pl-2 pr-1 py-1 bg-accent/10 text-accent text-[10px] font-bold rounded-md uppercase tracking-wider">
                                            {tag}
                                            <button onClick={() => removeTag(tag)} className="p-0.5 hover:bg-accent/20 rounded">
                                                <X size={10} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <ImageIcon size={16} className="text-accent" /> Featured Image
                        </h3>
                        <div className="space-y-3">
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                className="hidden"
                                accept="image/*"
                            />
                            {formData.cover_image_url ? (
                                <div className="relative rounded-2xl overflow-hidden aspect-video border border-gray-100 group">
                                    <img src={formData.cover_image_url} alt="Cover Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button 
                                            onClick={() => fileInputRef.current.click()}
                                            className="p-2 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                                            title="Replace Image"
                                        >
                                            <Upload size={16} />
                                        </button>
                                        <button 
                                            onClick={() => setFormData(p => ({ ...p, cover_image_url: '' }))}
                                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                            title="Remove"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button 
                                    type="button"
                                    onClick={() => fileInputRef.current.click()}
                                    disabled={uploading}
                                    className="w-full aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 gap-2 hover:bg-gray-100 hover:border-accent transition-all group"
                                >
                                    {uploading ? (
                                        <Loader2 className="w-8 h-8 animate-spin text-accent" />
                                    ) : (
                                        <>
                                            <Upload className="group-hover:text-accent transition-colors" size={24} />
                                            <span className="text-xs font-medium">Click to upload from directory</span>
                                        </>
                                    )}
                                </button>
                            )}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-3" />
                                <input 
                                    type="text"
                                    value={formData.cover_image_url}
                                    onChange={(e) => setFormData(p => ({ ...p, cover_image_url: e.target.value }))}
                                    placeholder="Or paste URL here..."
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-9 pr-4 py-2.5 text-[10px] font-mono focus:ring-1 focus:ring-accent outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEO Preview */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <Eye size={16} className="text-accent" /> Search Engine Preview
                        </h3>
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                            <div className="text-blue-600 text-[15px] font-medium leading-tight truncate">
                                {formData.title || 'Untitled Post'}
                            </div>
                            <div className="text-green-700 text-xs truncate">
                                maliklogix.com/blog/{formData.slug || '...'}
                            </div>
                            <div className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
                                {formData.subtitle || 'Start writing your excerpt to see how it appears in search results...'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogEditor;
