import React, { useState } from 'react';
import {
    FileText, Save, Info, Shield,
    Image as ImageIcon, Upload, Globe,
    Plus, Trash2, Edit3, X, Check,
    Layout, History
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const ContentManagement = () => {
    const [activeTab, setActiveTab] = useState('about');
    const [isSaving, setIsSaving] = useState(false);

    // Initial Mock Content
    const [aboutContent, setAboutContent] = useState({
        heroTitle: 'About Us',
        heroSubtitle: 'Welcome to Sands Ornaments, where elegance meets timeless tradition. We are more than just a jewellery brand; we are curators of silver artistry designed to adorn your soul.',
        mainStory: 'Our journey began with a passion for bringing high-quality, handcrafted 925 Sterling Silver pieces to the modern woman. Every necklace, ring, and bracelet in our collection tells a story of skilled craftsmanship and attention to detail.',
        missionStatement: 'At Sands Ornaments, we are committed to sustainability and ethical sourcing, ensuring that beauty does not come at a cost to our planet.',
        images: [
            { id: 1, url: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?auto=format&fit=crop&q=80&w=600', label: 'Landscape' },
            { id: 2, url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600', label: 'Bracelet' },
            { id: 3, url: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=600', label: 'Necklace Wear' }
        ]
    });

    const [legalContent, setLegalContent] = useState({
        privacy: {
            title: 'Privacy Policy',
            lastUpdated: 'December 20, 2024',
            content: 'Your privacy is important to us. It is Sands Ornaments\' policy to respect your privacy regarding any information we may collect from you across our website...\n\nWe only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.'
        },
        terms: {
            title: 'Terms & Conditions',
            lastUpdated: 'December 22, 2024',
            content: 'By accessing the website at https://sandsornaments.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations...\n\nThe materials contained in this website are protected by applicable copyright and trademark law.'
        }
    });

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            // In a real app, send to API
        }, 1500);
    };

    const tabs = [
        { id: 'about', label: 'About Us', icon: <Info className="w-4 h-4" /> },
        { id: 'privacy', label: 'Privacy Policy', icon: <Shield className="w-4 h-4" /> },
        { id: 'terms', label: 'Terms & Conditions', icon: <FileText className="w-4 h-4" /> },
    ];

    return (
        <div className="max-w-[1200px] mx-auto space-y-4 md:space-y-8 animate-in fade-in duration-500 pb-20 font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-1">
                <PageHeader
                    title="Page Content"
                    subtitle="Manage static website text"
                />
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all shadow-sm active:scale-95 ${isSaving ? 'bg-green-100 text-green-600' : 'bg-[#3E2723] text-white hover:bg-[#5D4037]'
                        }`}
                >
                    {isSaving ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    <span>{isSaving ? 'Published' : 'Save & Publish'}</span>
                </button>
            </div>

            {/* Tabs Navigation */}
            <div className="flex gap-1.5 md:gap-2 bg-white p-1 md:p-1.5 rounded-xl md:rounded-2xl border border-gray-200 shadow-sm w-full md:w-fit overflow-x-auto scrollbar-hide">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === tab.id
                            ? 'bg-[#3E2723] text-white shadow-md'
                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl md:rounded-3xl border border-gray-200 shadow-sm overflow-hidden min-h-[400px] md:min-h-[600px]">
                {activeTab === 'about' && (
                    <div className="p-4 md:p-12 space-y-8 md:space-y-12 animate-in slide-in-from-left-4 duration-300">
                        {/* Text Sections */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                            <div className="space-y-4 md:space-y-6">
                                <h3 className="text-xs md:text-sm font-bold text-[#3E2723] uppercase tracking-widest border-l-4 border-[#3E2723] pl-3 md:pl-4">Header Content</h3>
                                <div className="space-y-3 md:space-y-4">
                                    <div className="space-y-1.5 md:space-y-2">
                                        <label className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hero Title</label>
                                        <input
                                            className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-base md:text-lg font-serif font-bold text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#3E2723]/10"
                                            value={aboutContent.heroTitle}
                                            onChange={(e) => setAboutContent({ ...aboutContent, heroTitle: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5 md:space-y-2">
                                        <label className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hero Subtitle</label>
                                        <textarea
                                            className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-xs md:text-sm font-bold text-gray-600 h-24 md:h-32 resize-none leading-relaxed"
                                            value={aboutContent.heroSubtitle}
                                            onChange={(e) => setAboutContent({ ...aboutContent, heroSubtitle: e.target.value })}
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
                                            className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-xs md:text-sm font-bold text-gray-600 h-24 md:h-32 resize-none leading-relaxed"
                                            value={aboutContent.mainStory}
                                            onChange={(e) => setAboutContent({ ...aboutContent, mainStory: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5 md:space-y-2">
                                        <label className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Final Statement</label>
                                        <input
                                            className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-xs md:text-sm font-bold text-[#3E2723]"
                                            value={aboutContent.missionStatement}
                                            onChange={(e) => setAboutContent({ ...aboutContent, missionStatement: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Image Grid Manager */}
                        <div className="space-y-4 md:space-y-6 pt-4 md:pt-6 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs md:text-sm font-bold text-[#3E2723] uppercase tracking-widest border-l-4 border-[#3E2723] pl-3 md:pl-4">Collage Images</h3>
                                <button className="text-[10px] md:text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                                    <Upload className="w-3 h-3" /> Change All
                                </button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                                {aboutContent.images.map((img) => (
                                    <div key={img.id} className="group relative rounded-lg md:rounded-2xl overflow-hidden border border-gray-200 shadow-sm aspect-video bg-gray-100">
                                        <img src={img.url} alt={img.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button className="p-2 md:p-3 bg-white rounded-full text-gray-900 shadow-xl hover:scale-110 transition-all">
                                                <Edit3 className="w-3 h-3 md:w-4 md:h-4" />
                                            </button>
                                            <button className="p-2 md:p-3 bg-red-500 rounded-full text-white shadow-xl hover:scale-110 transition-all">
                                                <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                                            </button>
                                        </div>
                                        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-white/90 backdrop-blur rounded-md text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-[#3E2723]">
                                            {img.label}
                                        </div>
                                    </div>
                                ))}
                                <button className="rounded-lg md:rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1.5 md:gap-2 hover:bg-gray-50 transition-all aspect-video">
                                    <Plus className="w-5 h-5 md:w-6 md:h-6 text-gray-300" />
                                    <span className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Add Image</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {(activeTab === 'privacy' || activeTab === 'terms') && (
                    <div className="p-4 md:p-12 space-y-6 md:space-y-8 animate-in slide-in-from-right-4 duration-300">
                        <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                                <h2 className="text-lg md:text-2xl font-serif font-bold text-[#3E2723] truncate">
                                    {activeTab === 'privacy' ? legalContent.privacy.title : legalContent.terms.title}
                                </h2>
                                <p className="text-[10px] md:text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">
                                    Updated: {activeTab === 'privacy' ? legalContent.privacy.lastUpdated : legalContent.terms.lastUpdated}
                                </p>
                            </div>
                            <div className="flex gap-1.5 md:gap-2 shrink-0">
                                <button className="p-2 md:p-2.5 bg-gray-50 border border-gray-100 rounded-lg md:rounded-xl text-gray-400 hover:text-gray-900 transition-all active:scale-95 shadow-sm">
                                    <History className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                                <button className="p-2 md:p-2.5 bg-gray-50 border border-gray-100 rounded-lg md:rounded-xl text-gray-400 hover:text-gray-900 transition-all active:scale-95 shadow-sm">
                                    <Globe className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4 md:space-y-6">
                            <div className="bg-[#FDFBF7] p-3 md:p-4 rounded-lg md:rounded-xl border border-[#EFEBE9] flex items-start gap-3 md:gap-4">
                                <div className="p-1.5 md:p-2 bg-amber-100 rounded-lg shrink-0">
                                    <Layout className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-700" />
                                </div>
                                <p className="text-[10px] md:text-xs font-bold text-amber-800 leading-relaxed uppercase tracking-tighter">
                                    Tip: Markdown enabled. Changes reflect immediately on customer pages.
                                </p>
                            </div>

                            <div className="relative group">
                                <textarea
                                    className="w-full p-4 md:p-8 bg-gray-50 border border-gray-200 rounded-xl md:rounded-3xl text-xs md:text-sm font-bold text-gray-700 h-[300px] md:h-[500px] resize-none leading-relaxed focus:outline-none focus:ring-4 focus:ring-[#3E2723]/5"
                                    value={activeTab === 'privacy' ? legalContent.privacy.content : legalContent.terms.content}
                                    onChange={(e) => {
                                        const newContent = e.target.value;
                                        if (activeTab === 'privacy') {
                                            setLegalContent({ ...legalContent, privacy: { ...legalContent.privacy, content: newContent } });
                                        } else {
                                            setLegalContent({ ...legalContent, terms: { ...legalContent.terms, content: newContent } });
                                        }
                                    }}
                                />
                                <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 flex items-center gap-2">
                                    <span className="text-[8px] md:text-[10px] font-bold text-gray-300 uppercase tracking-widest px-2 py-0.5 bg-white/80 rounded-full">Editor Active</span>
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentManagement;
