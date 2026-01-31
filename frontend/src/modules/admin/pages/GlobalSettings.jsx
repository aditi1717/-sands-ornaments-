import React, { useState } from 'react';
import { Save, Truck, AlertTriangle, MapPin, Phone, Mail, Globe, Check, Edit3, RefreshCw, Repeat, CreditCard, Shield, Bell, Plus, Trash2, Tag, Gift, Star, Zap, Headset, Upload, X, ChevronDown } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const GlobalSettings = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Initial Mock Data
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('siteSettings');
        const initial = saved ? JSON.parse(saved) : {};

        return {
            // Defaults (merged with saved)
            productHeader: 'ESTIMATED DELIVERY DATE',
            returnPolicy: '2 Days Return',
            exchangePolicy: '10 Days Exchange',
            codPolicy: 'Cash On Delivery',
            warrantyText: 'Lifetime Warranty',
            safetyText: 'Skin Safe Jewellery',
            platingText: '18k Gold Tone Plated',
            announcementItems: [
                { id: 1, icon: 'Truck', text: 'Free Shipping' },
                { id: 2, icon: 'Shield', text: 'Secure Payments' },
                { id: 3, icon: 'RefreshCw', text: 'Easy Returns & Refunds' },
                { id: 4, icon: 'Headset', text: 'Dedicated Support Team' }
            ],
            fraudWarning: 'BEWARE OF FRAUD: Sands Ornaments never asks for confidential banking details over phone or email.',
            address: '123, Silver Street, Jewellery Market, Mumbai - 400002',
            phone: '+91 98765 43210',
            email: 'support@sandsornaments.com',
            website: 'www.sandsornaments.com',
            ...initial
        };
    });

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API Call & Local Storage
        setTimeout(() => {
            localStorage.setItem('siteSettings', JSON.stringify(settings));
            // Dispatch event for immediate update in other components if they listen
            window.dispatchEvent(new Event('storage'));
            setIsSaving(false);
            setIsEditing(false);
        }, 800);
    };

    const handleChange = (field, value) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleAnnouncementChange = (id, field, value) => {
        setSettings(prev => ({
            ...prev,
            announcementItems: prev.announcementItems.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const addAnnouncement = () => {
        const newId = Math.max(...settings.announcementItems.map(i => i.id), 0) + 1;
        setSettings(prev => ({
            ...prev,
            announcementItems: [...prev.announcementItems, { id: newId, icon: 'Tag', text: '' }]
        }));
    };

    const removeAnnouncement = (id) => {
        setSettings(prev => ({
            ...prev,
            announcementItems: prev.announcementItems.filter(item => item.id !== id)
        }));
    };

    return (
        <div className="max-w-[1200px] mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-20 font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
                <PageHeader
                    title="Global Settings"
                    subtitle="Manage store-wide text, alerts, and contact information"
                />

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
                            <span>Edit Settings</span>
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Product Highlights Section */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                    <div>
                        <h3 className="text-xl font-serif font-bold text-[#3E2723]">Product Page Policies</h3>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Manage delivery, return, and payment text</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                <Truck className="w-3 h-3" />
                                <span>Section Header Title</span>
                            </label>
                            <input
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3E2723]/10 disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                                value={settings.productHeader}
                                onChange={(e) => handleChange('productHeader', e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                <RefreshCw className="w-3 h-3" />
                                <span>Return Policy Text</span>
                            </label>
                            <input
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3E2723]/10 disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                                value={settings.returnPolicy}
                                onChange={(e) => handleChange('returnPolicy', e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                <Repeat className="w-3 h-3" />
                                <span>Exchange Policy Text</span>
                            </label>
                            <input
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3E2723]/10 disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                                value={settings.exchangePolicy}
                                onChange={(e) => handleChange('exchangePolicy', e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                <CreditCard className="w-3 h-3" />
                                <span>COD / Payment Text</span>
                            </label>
                            <input
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3E2723]/10 disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                                value={settings.codPolicy}
                                onChange={(e) => handleChange('codPolicy', e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                </div>

                {/* Value Propositions Section */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                    <div>
                        <h3 className="text-xl font-serif font-bold text-[#3E2723]">Value Propositions</h3>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Key benefits shown on pink banner</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                <Shield className="w-3 h-3" />
                                <span>Warranty Text</span>
                            </label>
                            <input
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3E2723]/10 disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                                value={settings.warrantyText}
                                onChange={(e) => handleChange('warrantyText', e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                <Check className="w-3 h-3" />
                                <span>Safety Feature (e.g. Skin Safe)</span>
                            </label>
                            <input
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3E2723]/10 disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                                value={settings.safetyText}
                                onChange={(e) => handleChange('safetyText', e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                <Check className="w-3 h-3" />
                                <span>Plating/Material Text</span>
                            </label>
                            <input
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3E2723]/10 disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                                value={settings.platingText}
                                onChange={(e) => handleChange('platingText', e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                </div>

                {/* Announcement Bar Section */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-serif font-bold text-[#3E2723]">Announcement Bar</h3>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Manage scrolling items in navbar</p>
                        </div>
                        {isEditing && (
                            <button
                                onClick={addAnnouncement}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-[#3E2723]/10 text-[#3E2723] hover:bg-[#3E2723]/20 transition-all"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Item</span>
                            </button>
                        )}
                    </div>

                    <div className="space-y-3">
                        {settings.announcementItems && settings.announcementItems.map((item, index) => (
                            <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-200 rounded-lg animate-in slide-in-from-left-2 duration-300">
                                {/* Leading: Icon Select OR Image Preview */}
                                <div className="shrink-0 flex items-center gap-2">
                                    {item.image ? (
                                        <div className="relative w-10 h-10 bg-white rounded-md border border-gray-200 flex items-center justify-center overflow-hidden group">
                                            <img src={item.image} alt="Icon" className="w-full h-full object-contain" />
                                            {isEditing && (
                                                <button
                                                    onClick={() => handleAnnouncementChange(item.id, 'image', null)}
                                                    className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Remove Image"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <div className="relative">
                                                <select
                                                    className="w-28 pl-9 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3E2723]/10 appearance-none cursor-pointer"
                                                    value={item.icon || 'Truck'}
                                                    onChange={(e) => handleAnnouncementChange(item.id, 'icon', e.target.value)}
                                                    disabled={!isEditing}
                                                >
                                                    <option value="Truck">Truck</option>
                                                    <option value="Shield">Secure</option>
                                                    <option value="RefreshCw">Return</option>
                                                    <option value="Headset">Support</option>
                                                    <option value="Tag">Offer</option>
                                                    <option value="Gift">Gift</option>
                                                    <option value="Star">Star</option>
                                                    <option value="Bell">Alert</option>
                                                    <option value="Zap">New</option>
                                                </select>
                                                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                    <Tag className="w-4 h-4" />
                                                </div>
                                                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                    <ChevronDown className="w-3 h-3" />
                                                </div>
                                            </div>

                                            {/* Upload Button */}
                                            <div className="relative w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#3E2723] hover:border-[#3E2723] transition-colors cursor-pointer overflow-hidden" title="Upload Custom Image">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                handleAnnouncementChange(item.id, 'image', reader.result);
                                                                handleAnnouncementChange(item.id, 'type', 'image');
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                    disabled={!isEditing}
                                                />
                                                <Upload className="w-4 h-4" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Text Input */}
                                <div className="flex-1">
                                    <input
                                        className="w-full px-3 py-2 bg-transparent text-sm font-bold text-gray-900 placeholder-gray-400 focus:outline-none border-b border-transparent focus:border-[#3E2723]/20 transition-colors"
                                        value={item.text}
                                        onChange={(e) => handleAnnouncementChange(item.id, 'text', e.target.value)}
                                        disabled={!isEditing}
                                        placeholder="Announcement text..."
                                    />
                                </div>

                                {/* Delete */}
                                {isEditing && (
                                    <button
                                        onClick={() => removeAnnouncement(item.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all shrink-0"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        {settings.announcementItems.length === 0 && (
                            <div className="text-center py-6 text-gray-400 text-sm italic bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                No items. Add one now.
                            </div>
                        )}
                    </div>
                </div>

                {/* Fraud Alert Section */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                    <div>
                        <h3 className="text-xl font-serif font-bold text-[#3E2723]">Fraud & Safety Alerts</h3>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Important warnings for customers</p>
                    </div>

                    <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                        <label className="flex items-center gap-2 text-[10px] font-bold text-red-400 uppercase tracking-widest mb-2">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Global Fraud Warning Text</span>
                        </label>
                        <textarea
                            className="w-full p-3 bg-white border border-red-200 rounded-xl text-sm font-bold text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500/10 disabled:bg-white disabled:text-gray-500 h-32 resize-none transition-all"
                            value={settings.fraudWarning}
                            onChange={(e) => handleChange('fraudWarning', e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                </div>

                {/* Contact Details Section - Full Width */}
                <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                    <div>
                        <h3 className="text-xl font-serif font-bold text-[#3E2723]">Company Contact Details</h3>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Displayed in Footer and Contact Page</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                <MapPin className="w-3 h-3" />
                                <span>Official Address</span>
                            </label>
                            <textarea
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3E2723]/10 disabled:bg-gray-50 disabled:text-gray-500 h-24 resize-none transition-all"
                                value={settings.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                    <Phone className="w-3 h-3" />
                                    <span>Support Phone</span>
                                </label>
                                <input
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3E2723]/10 disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                                    value={settings.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                    <Mail className="w-3 h-3" />
                                    <span>Support Email</span>
                                </label>
                                <input
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3E2723]/10 disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                                    value={settings.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalSettings;
