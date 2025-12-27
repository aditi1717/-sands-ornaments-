import React, { useState } from 'react';
import {
    Bell, Settings, Send, Tag, ShoppingBag,
    Eye, EyeOff, Trash2, Filter, AlertCircle,
    CheckCircle2, Clock, Smartphone, Globe, Shield,
    Layout, ChevronRight, X
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const GlobalNotificationManager = () => {
    // Mock for System-wide notifications (Announcements/Offers)
    const [systemNotifications, setSystemNotifications] = useState([
        {
            id: 'SN-001',
            type: 'Offer',
            title: 'Flat 20% Off - Weekend Special',
            message: 'Use code WEEKEND20 on all silver jewelry. Valid till Sunday midnight!',
            status: 'Enabled',
            target: 'All Platforms',
            timestamp: 'Created: Oct 24, 2024'
        },
        {
            id: 'SN-002',
            type: 'System',
            title: 'New Collection Live',
            message: 'Our "Heritage Series" is now available. Explore 50+ new designs.',
            status: 'Disabled',
            target: 'App Only',
            timestamp: 'Created: Oct 20, 2024'
        }
    ]);

    // Global Settings State
    const [globalSettings, setGlobalSettings] = useState({
        pushEnabled: true,
        emailEnabled: true,
        webEnabled: true,
        autoOrderUpdates: true,
        marketingAlerts: true
    });

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newNotif, setNewNotif] = useState({
        type: 'Offer',
        title: '',
        message: '',
        target: 'All Platforms'
    });

    const toggleGlobalSetting = (key) => {
        setGlobalSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleNotifStatus = (id) => {
        setSystemNotifications(prev => prev.map(n =>
            n.id === id ? { ...n, status: n.status === 'Enabled' ? 'Disabled' : 'Enabled' } : n
        ));
    };

    const deleteNotif = (id) => {
        if (window.confirm('Delete this system notification?')) {
            setSystemNotifications(prev => prev.filter(n => n.id !== id));
        }
    };

    const handleCreate = (e) => {
        e.preventDefault();
        const created = {
            ...newNotif,
            id: `SN-00${systemNotifications.length + 1}`,
            status: 'Enabled',
            timestamp: `Created: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
        };
        setSystemNotifications([created, ...systemNotifications]);
        setIsCreateModalOpen(false);
        setNewNotif({ type: 'Offer', title: '', message: '', target: 'All Platforms' });
    };

    return (
        <div className="max-w-[1200px] mx-auto space-y-4 md:space-y-10 animate-in fade-in duration-500 pb-20 font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <PageHeader
                    title="System Notifications"
                    subtitle="Manage global alerts and visibility"
                />
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#3E2723] text-white rounded-xl text-xs md:text-sm font-bold shadow-sm hover:bg-[#5D4037] transition-all active:scale-95"
                >
                    <Send className="w-4 h-4" />
                    <span>Create Alert</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Left: Global Controls & Templates */}
                <div className="lg:col-span-1 space-y-4 md:space-y-6">
                    {/* Master Controls */}
                    <div className="bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-4 md:p-5 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-xs md:text-sm font-bold text-gray-900 flex items-center gap-2">
                                <Settings className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                                <span>Master Controls</span>
                            </h3>
                        </div>
                        <div className="p-4 md:p-5 space-y-4 md:space-y-5">
                            <div className="space-y-2.5 md:space-y-3">
                                <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Channels</p>
                                {[
                                    { key: 'pushEnabled', label: 'Mobile Push', icon: <Smartphone className="w-3.5 h-3.5" /> },
                                    { key: 'webEnabled', label: 'Web Notifications', icon: <Globe className="w-3.5 h-3.5" /> },
                                    { key: 'emailEnabled', label: 'Email Alerts', icon: <Send className="w-3.5 h-3.5" /> }
                                ].map(item => (
                                    <div key={item.key} className="flex items-center justify-between p-2.5 md:p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-2.5 md:gap-3">
                                            <div className="w-7 h-7 md:w-8 md:h-8 bg-white rounded-lg border border-gray-100 flex items-center justify-center text-[#3E2723]">
                                                {item.icon}
                                            </div>
                                            <span className="text-[11px] md:text-xs font-bold text-gray-700">{item.label}</span>
                                        </div>
                                        <button
                                            onClick={() => toggleGlobalSetting(item.key)}
                                            className={`w-8 md:w-9 h-4 md:h-5 rounded-full transition-all relative ${globalSettings[item.key] ? 'bg-green-500' : 'bg-gray-300'}`}
                                        >
                                            <div className={`absolute top-0.5 md:top-1 w-3 h-3 bg-white rounded-full transition-all ${globalSettings[item.key] ? 'left-4.5 md:left-5' : 'left-0.5 md:left-1'}`} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 md:space-y-3 pt-2">
                                <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Auto-Triggers</p>
                                <div className="flex items-center justify-between p-2 md:p-3 border-b border-gray-50">
                                    <div className="space-y-0.5">
                                        <p className="text-[11px] md:text-xs font-bold text-gray-700">Order Updates</p>
                                        <p className="text-[9px] md:text-[10px] text-gray-400 font-bold">Shipment & delivery</p>
                                    </div>
                                    <button
                                        onClick={() => toggleGlobalSetting('autoOrderUpdates')}
                                        className={`w-7 md:w-8 h-3.5 md:h-4 rounded-full transition-all relative ${globalSettings.autoOrderUpdates ? 'bg-[#3E2723]' : 'bg-gray-200'}`}
                                    >
                                        <div className={`absolute top-0.5 w-2.5 md:w-3 h-2.5 md:h-3 bg-white rounded-full transition-all ${globalSettings.autoOrderUpdates ? 'left-4 md:left-4.5' : 'left-0.5'}`} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between p-2 md:p-3">
                                    <div className="space-y-0.5">
                                        <p className="text-[11px] md:text-xs font-bold text-gray-700">Marketing Offers</p>
                                        <p className="text-[9px] md:text-[10px] text-gray-400 font-bold">Automatic promos</p>
                                    </div>
                                    <button
                                        onClick={() => toggleGlobalSetting('marketingAlerts')}
                                        className={`w-7 md:w-8 h-3.5 md:h-4 rounded-full transition-all relative ${globalSettings.marketingAlerts ? 'bg-[#3E2723]' : 'bg-gray-200'}`}
                                    >
                                        <div className={`absolute top-0.5 w-2.5 md:w-3 h-2.5 md:h-3 bg-white rounded-full transition-all ${globalSettings.marketingAlerts ? 'left-4 md:left-4.5' : 'left-0.5'}`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Alert Templates */}
                    <div className="bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-4 md:p-5 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-xs md:text-sm font-bold text-gray-900 flex items-center gap-2">
                                <Layout className="w-4 h-4 text-gray-400" />
                                <span>Alert Templates</span>
                            </h3>
                        </div>
                        <div className="p-4 md:p-5 space-y-3 md:space-y-4">
                            <button className="w-full flex items-center justify-between p-2.5 md:p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all text-left group">
                                <div className="flex items-center gap-2.5 md:gap-3">
                                    <ShoppingBag className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-500" />
                                    <span className="text-[11px] md:text-xs font-bold text-gray-700">Shipping Update</span>
                                </div>
                                <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-300 group-hover:text-gray-500" />
                            </button>
                            <button className="w-full flex items-center justify-between p-2.5 md:p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all text-left group">
                                <div className="flex items-center gap-2.5 md:gap-3">
                                    <Tag className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-500" />
                                    <span className="text-[11px] md:text-xs font-bold text-gray-700">Welcome Coupon</span>
                                </div>
                                <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-300 group-hover:text-gray-500" />
                            </button>
                            <p className="text-[9px] md:text-[10px] text-center text-gray-400 font-bold italic">Click to customize automated triggers</p>
                        </div>
                    </div>
                </div>

                {/* Right: History & Feed */}
                <div className="lg:col-span-2 space-y-4 md:space-y-6">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-xs md:text-sm font-bold text-gray-900 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>Launch History</span>
                        </h3>
                        <div className="flex items-center gap-1.5">
                            <Filter className="w-3.5 h-3.5 text-gray-400" />
                            <select className="text-[9px] md:text-[10px] font-bold bg-transparent text-gray-500 border-none focus:outline-none cursor-pointer uppercase tracking-tighter">
                                <option>Recent</option>
                                <option>Offers</option>
                                <option>System</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        {systemNotifications.map(notif => (
                            <div
                                key={notif.id}
                                className={`bg-white rounded-xl md:rounded-2xl border transition-all p-4 md:p-6 ${notif.status === 'Disabled' ? 'border-gray-100 bg-gray-50/30' : 'border-gray-200 shadow-sm hover:shadow-md'}`}
                            >
                                <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                                    <div className="flex gap-3 md:gap-4 shrink-0 w-full md:w-auto">
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 ${notif.type === 'Offer' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                                            {notif.type === 'Offer' ? <Tag className="w-5 h-5 md:w-6 md:h-6" /> : <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />}
                                        </div>
                                        <div className="space-y-1 flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-sm md:text-base font-bold text-gray-900 truncate">{notif.title}</h4>
                                                <span className={`px-1.5 py-0.5 rounded text-[8px] md:text-[9px] font-bold uppercase tracking-widest ${notif.status === 'Enabled' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-gray-100 text-gray-400'}`}>
                                                    {notif.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 font-bold leading-relaxed line-clamp-2 md:line-clamp-none">{notif.message}</p>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2">
                                                <span className="flex items-center gap-1 text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                                                    <Smartphone className="w-3 h-3" /> {notif.target}
                                                </span>
                                                <span className="flex items-center gap-1 text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                                                    <Clock className="w-3 h-3" /> {notif.timestamp}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end w-full md:w-auto gap-1 border-t md:border-t-0 pt-3 md:pt-0">
                                        <button
                                            onClick={() => toggleNotifStatus(notif.id)}
                                            className={`p-2 rounded-lg transition-all ${notif.status === 'Enabled' ? 'text-amber-500 hover:bg-amber-50' : 'text-gray-400 hover:bg-gray-100'}`}
                                        >
                                            {notif.status === 'Enabled' ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
                                        </button>
                                        <button
                                            onClick={() => deleteNotif(notif.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {systemNotifications.length === 0 && (
                        <div className="p-12 md:p-20 text-center bg-white rounded-2xl md:rounded-3xl border border-dashed border-gray-200">
                            <Bell className="w-10 h-10 md:w-12 md:h-12 text-gray-200 mx-auto mb-4" />
                            <h3 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest">No Alerts Created</h3>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-2xl md:rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#3E2723]/5 rounded-xl flex items-center justify-center">
                                    <Bell className="w-4 h-4 md:w-5 md:h-5 text-[#3E2723]" />
                                </div>
                                <h3 className="text-base md:text-lg font-bold text-gray-900">Broadcast Alert</h3>
                            </div>
                            <button onClick={() => setIsCreateModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                                <X className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleCreate} className="p-6 md:p-8 space-y-4 md:space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5 md:space-y-2">
                                    <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Type</label>
                                    <select
                                        className="w-full p-2.5 md:p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs md:text-sm font-bold focus:ring-[#3E2723]/10"
                                        value={newNotif.type}
                                        onChange={(e) => setNewNotif({ ...newNotif, type: e.target.value })}
                                    >
                                        <option>Offer</option>
                                        <option>Order Update</option>
                                        <option>System</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5 md:space-y-2">
                                    <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Target</label>
                                    <select
                                        className="w-full p-2.5 md:p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs md:text-sm font-bold focus:ring-[#3E2723]/10"
                                        value={newNotif.target}
                                        onChange={(e) => setNewNotif({ ...newNotif, target: e.target.value })}
                                    >
                                        <option>All Platforms</option>
                                        <option>Web Only</option>
                                        <option>App Only</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1.5 md:space-y-2">
                                <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Headline</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Flash Sale Live! ⚡"
                                    className="w-full p-2.5 md:p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs md:text-sm font-bold"
                                    value={newNotif.title}
                                    onChange={(e) => setNewNotif({ ...newNotif, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-1.5 md:space-y-2">
                                <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Message</label>
                                <textarea
                                    placeholder="Short message for customers..."
                                    className="w-full p-2.5 md:p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs md:text-sm font-bold h-20 md:h-24 resize-none"
                                    value={newNotif.message}
                                    onChange={(e) => setNewNotif({ ...newNotif, message: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="flex-1 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs md:text-sm font-bold hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 bg-[#3E2723] text-white rounded-xl text-xs md:text-sm font-bold shadow-lg hover:bg-[#5D4037] transition-all flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    Launch Alert
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GlobalNotificationManager;
