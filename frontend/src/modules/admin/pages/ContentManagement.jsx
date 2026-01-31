import React, { useState } from 'react';
import {
    FileText, Save, Info, Shield,
    Image as ImageIcon, Upload, Globe,
    Plus, Trash2, Edit3, X, Check,
    Layout, History, BookOpen
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const ContentManagement = () => {
    const [activeTab, setActiveTab] = useState('about');
    const [isSaving, setIsSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Initial Mock Content - About Us
    const [aboutContent, setAboutContent] = useState({
        heroTitle: 'About Us',
        heroSubtitle: 'Welcome to Sands Ornaments, where elegance meets timeless tradition. We are more than just a jewellery brand; we are curators of silver artistry designed to adorn your soul.',
        mainStory: 'Our journey began with a passion for bringing high-quality, handcrafted 925 Sterling Silver pieces to the modern woman. Every necklace, ring, and bracelet in our collection tells a story of skilled craftsmanship and attention to detail.',
        missionStatement: 'At Sands Ornaments, we are committed to sustainability and ethical sourcing, ensuring that beauty does not come at a cost to our planet.',
        images: [
            { id: 1, url: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?auto=format&fit=crop&q=80&w=600', label: 'Landscape' },
            { id: 2, url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600', label: 'Bracelet' },
            { id: 3, url: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=600', label: 'Necklace Wear' }
        ],
        features: [
            { id: 1, title: 'Free Shipping', description: 'Enjoy free and fast delivery on all orders above ₹2000. We ensure your precious pieces reach you safely and on time, anywhere in the country.' },
            { id: 2, title: 'Premium Quality', description: 'Our jewellery is crafted with 100% authentic 925 Sterling Silver. Each piece undergoes varying quality checks to ensure lasting shine and durability.' },
            { id: 3, title: '100% Secure Checkout', description: 'Shop with confidence using our encrypted payment gateways. Your privacy and security are our top priority for a seamless shopping experience.' }
        ],
        instagramImages: [
            { id: 1, url: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=400' },
            { id: 2, url: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=400' },
            { id: 3, url: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&q=80&w=400' },
            { id: 4, url: 'https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?auto=format&fit=crop&q=80&w=400' }
        ]
    });

    // Blogs State
    const [blogs, setBlogs] = useState([
        {
            id: 1,
            title: 'The Art of Layering Silver Necklaces',
            image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=600',
            description: 'Discover how to create the perfect layered look with our guide to mixing and matching silver chains and pendants.',
            content: 'Full blog content goes here...',
            date: '2024-01-15'
        }
    ]);
    const [editingBlogId, setEditingBlogId] = useState(null);

    // Dynamic Pages State
    const [pages, setPages] = useState([]);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setIsEditing(false);
            setEditingBlogId(null);
            // In a real app, send to API
        }, 1500);
    };

    // About Us Handlers
    const handleFeatureChange = (id, field, value) => {
        const updatedFeatures = aboutContent.features.map(feature =>
            feature.id === id ? { ...feature, [field]: value } : feature
        );
        setAboutContent({ ...aboutContent, features: updatedFeatures });
    };

    const handleImageChange = (section, id, newUrl) => {
        const updatedImages = aboutContent[section].map(img =>
            img.id === id ? { ...img, url: newUrl } : img
        );
        setAboutContent({ ...aboutContent, [section]: updatedImages });
    };

    const addInstagramImage = () => {
        const newId = aboutContent.instagramImages.length + 1;
        setAboutContent({
            ...aboutContent,
            instagramImages: [...aboutContent.instagramImages, { id: newId, url: 'https://via.placeholder.com/400' }]
        });
    };

    const removeInstagramImage = (id) => {
        setAboutContent({
            ...aboutContent,
            instagramImages: aboutContent.instagramImages.filter(img => img.id !== id)
        });
    };

    // Blog Handlers
    const handleAddBlog = () => {
        const newBlog = {
            id: Date.now(),
            title: 'New Blog Post',
            image: 'https://via.placeholder.com/600x400',
            description: 'Short description of your blog post...',
            content: '',
            date: new Date().toISOString().split('T')[0]
        };
        setBlogs([newBlog, ...blogs]);
        setEditingBlogId(newBlog.id);
        setIsEditing(true);
    };

    const handleDeleteBlog = (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            setBlogs(blogs.filter(b => b.id !== id));
            if (editingBlogId === id) setEditingBlogId(null);
        }
    };

    const updateBlog = (id, field, value) => {
        setBlogs(blogs.map(b => b.id === id ? { ...b, [field]: value } : b));
    };

    const activeBlog = blogs.find(b => b.id === editingBlogId);

    // Dynamic Pages Handlers
    const handleAddPage = () => {
        const newPageId = `page-${Date.now()}`;
        const newPage = {
            id: newPageId,
            title: 'New Page',
            content: ''
        };
        setPages([...pages, newPage]);
        setActiveTab(newPageId);
        setIsEditing(true); // Automatically enter edit mode for new page
    };

    const handleDeletePage = (pageId) => {
        if (window.confirm('Are you sure you want to delete this page?')) {
            const newPages = pages.filter(p => p.id !== pageId);
            setPages(newPages);
            if (activeTab === pageId) {
                setActiveTab('about');
            }
        }
    };

    const updatePage = (id, field, value) => {
        setPages(pages.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const activePage = pages.find(p => p.id === activeTab);

    return (
        <div className="max-w-[1200px] mx-auto space-y-4 md:space-y-8 animate-in fade-in duration-500 pb-20 font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-1">
                <PageHeader
                    title="Page Content"
                    subtitle="Manage website content and pages"
                />
                <div className="hidden"></div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex gap-1.5 md:gap-2 bg-white p-1 md:p-1.5 rounded-xl md:rounded-2xl border border-gray-200 shadow-sm w-full md:w-fit overflow-x-auto scrollbar-hide">
                <button
                    onClick={() => setActiveTab('about')}
                    className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'about'
                        ? 'bg-[#3E2723] text-white shadow-md'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    <Info className="w-4 h-4" />
                    <span>About Us</span>
                </button>

                <button
                    onClick={() => setActiveTab('blogs')}
                    className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'blogs'
                        ? 'bg-[#3E2723] text-white shadow-md'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    <BookOpen className="w-4 h-4" />
                    <span>Blogs</span>
                </button>

                {pages.map(page => (
                    <button
                        key={page.id}
                        onClick={() => setActiveTab(page.id)}
                        className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === page.id
                            ? 'bg-[#3E2723] text-white shadow-md'
                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <FileText className="w-4 h-4" />
                        <span>{page.title || 'Untitled'}</span>
                    </button>
                ))}

                <button
                    onClick={handleAddPage}
                    className="flex items-center gap-2 px-3 py-2 md:py-2.5 rounded-lg md:rounded-xl text-gray-400 hover:text-[#3E2723] hover:bg-amber-50 transition-all active:scale-95"
                    title="Add New Page"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            <div className="bg-white rounded-xl md:rounded-3xl border border-gray-200 shadow-sm overflow-hidden min-h-[400px] md:min-h-[600px]">
                {activeTab === 'about' && (
                    <div className="p-4 md:p-12 space-y-8 md:space-y-12 animate-in slide-in-from-left-4 duration-300">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-[#3E2723]">About Us Configuration</h3>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Manage core company information</p>
                            </div>
                            <div className="flex items-center gap-3">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            disabled={isSaving}
                                            className="px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            disabled={isSaving}
                                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold bg-[#3E2723] text-white hover:bg-[#5D4037] transition-all shadow-sm active:scale-95"
                                        >
                                            {isSaving ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                                            <span>{isSaving ? 'Saved' : 'Save Changes'}</span>
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                        <span>Edit Section</span>
                                    </button>
                                )}
                            </div>
                        </div>
                        {/* Text Sections */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                            <div className="space-y-4 md:space-y-6">
                                <h3 className="text-xs md:text-sm font-bold text-[#3E2723] uppercase tracking-widest border-l-4 border-[#3E2723] pl-3 md:pl-4">Header Content</h3>
                                <div className="space-y-3 md:space-y-4">
                                    <div className="space-y-1.5 md:space-y-2">
                                        <label className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hero Title</label>
                                        <input
                                            className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-base md:text-lg font-serif font-bold text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#3E2723]/10 disabled:bg-gray-100 disabled:text-gray-500"
                                            value={aboutContent.heroTitle}
                                            onChange={(e) => setAboutContent({ ...aboutContent, heroTitle: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="space-y-1.5 md:space-y-2">
                                        <label className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hero Subtitle</label>
                                        <textarea
                                            className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-xs md:text-sm font-bold text-gray-600 h-24 md:h-32 resize-none leading-relaxed disabled:bg-gray-100 disabled:text-gray-400"
                                            value={aboutContent.heroSubtitle}
                                            onChange={(e) => setAboutContent({ ...aboutContent, heroSubtitle: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 md:space-y-6">
                                <h3 className="text-xs md:text-sm font-bold text-[#3E2723] uppercase tracking-widest border-l-4 border-[#3E2723] pl-3 md:pl-4">Mission & Story</h3>
                                <div className="space-y-3 md:space-y-4">
                                    <div className="space-y-1.5 md:space-y-2">
                                        <label className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Main Story</label>
                                        <textarea
                                            className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-xs md:text-sm font-bold text-gray-600 h-24 md:h-32 resize-none leading-relaxed disabled:bg-gray-100 disabled:text-gray-400"
                                            value={aboutContent.mainStory}
                                            onChange={(e) => setAboutContent({ ...aboutContent, mainStory: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="space-y-1.5 md:space-y-2">
                                        <label className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Final Statement</label>
                                        <input
                                            className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-xs md:text-sm font-bold text-[#3E2723] disabled:bg-gray-100 disabled:text-gray-500"
                                            value={aboutContent.missionStatement}
                                            onChange={(e) => setAboutContent({ ...aboutContent, missionStatement: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Core Features (Premium Quality, Free Shipping, etc.) */}
                        <div className="space-y-4 md:space-y-6 pt-4 md:pt-6 border-t border-gray-100">
                            <h3 className="text-xs md:text-sm font-bold text-[#3E2723] uppercase tracking-widest border-l-4 border-[#3E2723] pl-3 md:pl-4">Core Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {aboutContent.features.map((feature) => (
                                    <div key={feature.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Heading</label>
                                            <input
                                                className="w-full p-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-[#3E2723] disabled:bg-gray-100"
                                                value={feature.title}
                                                onChange={(e) => handleFeatureChange(feature.id, 'title', e.target.value)}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Description</label>
                                            <textarea
                                                className="w-full p-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 h-20 resize-none disabled:bg-gray-100"
                                                value={feature.description}
                                                onChange={(e) => handleFeatureChange(feature.id, 'description', e.target.value)}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Image Grid Manager - Strictly 3 Images */}
                        <div className="space-y-4 md:space-y-6 pt-4 md:pt-6 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs md:text-sm font-bold text-[#3E2723] uppercase tracking-widest border-l-4 border-[#3E2723] pl-3 md:pl-4">Collage Images (3 Only)</h3>
                            </div>
                            <div className="grid grid-cols-3 gap-3 md:gap-6">
                                {aboutContent.images.map((img) => (
                                    <div key={img.id} className="group relative rounded-lg md:rounded-2xl overflow-hidden border border-gray-200 shadow-sm aspect-video bg-gray-100">
                                        <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                                        {isEditing && (
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 animate-in fade-in">
                                                <button
                                                    onClick={() => {
                                                        const newUrl = prompt("Enter Image URL:", img.url);
                                                        if (newUrl) handleImageChange('images', img.id, newUrl);
                                                    }}
                                                    className="p-2 md:p-3 bg-white rounded-full text-gray-900 shadow-xl hover:scale-110 transition-all pointer-events-auto"
                                                >
                                                    <Edit3 className="w-3 h-3 md:w-4 md:h-4" />
                                                </button>
                                            </div>
                                        )}
                                        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-white/90 backdrop-blur rounded-md text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-[#3E2723]">
                                            {img.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Instagram Images Section */}
                        <div className="space-y-4 md:space-y-6 pt-4 md:pt-6 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs md:text-sm font-bold text-[#3E2723] uppercase tracking-widest border-l-4 border-[#3E2723] pl-3 md:pl-4">Instagram Section</h3>
                                {isEditing && (
                                    <button
                                        onClick={addInstagramImage}
                                        className="text-[10px] md:text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                                    >
                                        <Plus className="w-3 h-3" /> Add Photo
                                    </button>
                                )}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                {aboutContent.instagramImages.map((img) => (
                                    <div key={img.id} className="group relative rounded-lg md:rounded-2xl overflow-hidden border border-gray-200 shadow-sm aspect-square bg-gray-100">
                                        <img src={img.url} alt="Instagram" className="w-full h-full object-cover" />
                                        {isEditing && (
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 animate-in fade-in">
                                                <button
                                                    onClick={() => {
                                                        const newUrl = prompt("Enter Image URL:", img.url);
                                                        if (newUrl) handleImageChange('instagramImages', img.id, newUrl);
                                                    }}
                                                    className="p-2 md:p-2 bg-white rounded-full text-gray-900 shadow-xl hover:scale-110 transition-all"
                                                >
                                                    <Edit3 className="w-3 h-3 md:w-4 md:h-4" />
                                                </button>
                                                <button
                                                    onClick={() => removeInstagramImage(img.id)}
                                                    className="p-2 md:p-2 bg-red-500 rounded-full text-white shadow-xl hover:scale-110 transition-all"
                                                >
                                                    <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                )}

                {/* Blogs Section */}
                {activeTab === 'blogs' && (
                    <div className="p-4 md:p-12 space-y-8 animate-in slide-in-from-right-4 duration-300">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-[#3E2723]">Blog Management</h3>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Create and edit blog posts</p>
                            </div>
                            <div className="flex items-center gap-3">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            disabled={isSaving}
                                            className="px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            disabled={isSaving}
                                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold bg-[#3E2723] text-white hover:bg-[#5D4037] transition-all shadow-sm active:scale-95"
                                        >
                                            {isSaving ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                                            <span>{isSaving ? 'Saved' : 'Save Changes'}</span>
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                        <span>Manage Blogs</span>
                                    </button>
                                )}
                            </div>
                        </div>
                        {/* Blog List / Editor Mode */}
                        {editingBlogId ? (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg md:text-xl font-serif font-bold text-[#3E2723]">{editingBlogId === 'new' ? 'New Blog Post' : 'Edit Blog Post'}</h3>
                                    {isEditing && (
                                        <button
                                            onClick={() => setEditingBlogId(null)}
                                            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-200"
                                        >
                                            Done
                                        </button>
                                    )}
                                </div>
                                {activeBlog && (
                                    <div className="space-y-4 md:space-y-6 bg-gray-50 p-6 rounded-2xl border border-gray-200">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Blog Title</label>
                                                <input
                                                    className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-[#3E2723] disabled:bg-gray-50 disabled:text-gray-500"
                                                    value={activeBlog.title}
                                                    onChange={(e) => updateBlog(activeBlog.id, 'title', e.target.value)}
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Cover Image URL</label>
                                                <input
                                                    className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-600 disabled:bg-gray-50 disabled:text-gray-400"
                                                    value={activeBlog.image}
                                                    onChange={(e) => updateBlog(activeBlog.id, 'image', e.target.value)}
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Short Description</label>
                                            <textarea
                                                className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-600 h-20 resize-none disabled:bg-gray-50 disabled:text-gray-400"
                                                value={activeBlog.description}
                                                onChange={(e) => updateBlog(activeBlog.id, 'description', e.target.value)}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Full Content</label>
                                            <textarea
                                                className="w-full p-4 bg-white border border-gray-200 rounded-xl text-xs text-gray-600 h-64 resize-none disabled:bg-gray-50 disabled:text-gray-400"
                                                value={activeBlog.content}
                                                onChange={(e) => updateBlog(activeBlog.id, 'content', e.target.value)}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {isEditing && (
                                    <button
                                        onClick={handleAddBlog}
                                        className="w-full py-4 border-2 border-dashed border-[#3E2723]/20 rounded-2xl flex items-center justify-center gap-2 text-[#3E2723] font-bold hover:bg-[#3E2723]/5 transition-colors"
                                    >
                                        <Plus className="w-5 h-5" />
                                        <span>Create New Blog Post</span>
                                    </button>
                                )}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {blogs.map(blog => (
                                        <div key={blog.id} className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
                                            <div className="aspect-video bg-gray-100 relative">
                                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                                {isEditing && (
                                                    <div className="absolute top-2 right-2 flex gap-1">
                                                        <button
                                                            onClick={() => setEditingBlogId(blog.id)}
                                                            className="p-1.5 bg-white rounded-full text-gray-700 shadow-md hover:scale-110 transition-transform"
                                                        >
                                                            <Edit3 className="w-3 h-3" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteBlog(blog.id)}
                                                            className="p-1.5 bg-white rounded-full text-red-500 shadow-md hover:scale-110 transition-transform"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-3 flex-1 flex flex-col">
                                                <div className="text-[9px] uppercase font-bold text-gray-400 mb-1">{blog.date}</div>
                                                <h3 className="font-serif text-sm font-bold text-[#3E2723] mb-1 leading-tight line-clamp-1">{blog.title}</h3>
                                                <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed mb-2 flex-1">{blog.description}</p>
                                                {!isEditing && (
                                                    <button
                                                        onClick={() => {
                                                            setEditingBlogId(blog.id);
                                                            // In view mode, we just open it to view
                                                        }}
                                                        className="text-[10px] font-bold text-[#3E2723] hover:underline self-start"
                                                    >
                                                        View Details
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Custom Pages Editor */}
                {activePage && (
                    <div className="p-4 md:p-12 space-y-6 md:space-y-8 animate-in slide-in-from-bottom-4 duration-300">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-[#3E2723]">{activePage.title}</h3>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Custom Page Configuration</p>
                            </div>
                            <div className="flex items-center gap-3">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            disabled={isSaving}
                                            className="px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            disabled={isSaving}
                                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold bg-[#3E2723] text-white hover:bg-[#5D4037] transition-all shadow-sm active:scale-95"
                                        >
                                            {isSaving ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                                            <span>{isSaving ? 'Saved' : 'Save Changes'}</span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleDeletePage(activePage.id)}
                                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-all shadow-sm active:scale-95"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span>Delete Page</span>
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                            <span>Edit Page</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0 flex-1">
                                <label className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Page Title</label>
                                <input
                                    className="w-full text-lg md:text-2xl font-serif font-bold text-[#3E2723] bg-transparent border-b border-gray-200 focus:border-[#3E2723] focus:outline-none pb-1 placeholder:text-gray-300 disabled:text-gray-500 disabled:border-transparent"
                                    placeholder="Enter Page Title..."
                                    value={activePage.title}
                                    onChange={(e) => updatePage(activePage.id, 'title', e.target.value)}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>

                        <div className="space-y-4 md:space-y-6">
                            <div className="relative group">
                                <textarea
                                    className="w-full p-4 md:p-8 bg-gray-50 border border-gray-200 rounded-xl md:rounded-3xl text-xs md:text-sm font-bold text-gray-700 h-[300px] md:h-[500px] resize-none leading-relaxed focus:outline-none focus:ring-4 focus:ring-[#3E2723]/5 disabled:bg-gray-50"
                                    placeholder="# Write your page content here..."
                                    value={activePage.content}
                                    onChange={(e) => updatePage(activePage.id, 'content', e.target.value)}
                                    disabled={!isEditing}
                                />
                                {isEditing && (
                                    <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 flex items-center gap-2">
                                        <span className="text-[8px] md:text-[10px] font-bold text-gray-300 uppercase tracking-widest px-2 py-0.5 bg-white/80 rounded-full">Editor Active</span>
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ContentManagement;
