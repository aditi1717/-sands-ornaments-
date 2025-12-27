import React, { useState } from 'react';
import {
    Bell, ShoppingBag, UserPlus, Star,
    AlertTriangle, Check, Trash2,
    Filter, MoreVertical, Clock, Package,
    CheckCircle2
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const AdminNotifications = () => {
    // Mock Admin Notifications Data
    const [notifications, setNotifications] = useState([
        {
            id: 'NOT-001',
            type: 'Order',
            title: 'New Order Received',
            message: 'Order #ORD-82745 has been placed by Aditi Singh.',
            time: '2 mins ago',
            isRead: false,
            priority: 'High'
        },
        {
            id: 'NOT-002',
            type: 'Inventory',
            title: 'Low Stock Alert',
            message: 'Classic Solitaire Ring is down to 2 units in stock.',
            time: '45 mins ago',
            isRead: false,
            priority: 'Urgent'
        },
        {
            id: 'NOT-003',
            type: 'Review',
            title: 'New Review Submitted',
            message: 'Sneha Kapoor left a 5-star review for Infinity Bracelet.',
            time: '2 hours ago',
            isRead: true,
            priority: 'Medium'
        },
        {
            id: 'NOT-004',
            type: 'User',
            title: 'New User Registered',
            message: 'Rahul Verma has just created an account.',
            time: '5 hours ago',
            isRead: true,
            priority: 'Low'
        }
    ]);

    const [filter, setFilter] = useState('All');

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, isRead: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const filteredNotifications = notifications.filter(n =>
        filter === 'All' || n.type === filter
    );

    const typeIcons = {
        'Order': <ShoppingBag className="w-5 h-5 text-blue-500" />,
        'Inventory': <AlertTriangle className="w-5 h-5 text-red-500" />,
        'Review': <Star className="w-5 h-5 text-amber-500" />,
        'User': <UserPlus className="w-5 h-5 text-green-500" />
    };

    const priorityStyles = {
        'Urgent': 'bg-red-50 text-red-600 border-red-100',
        'High': 'bg-orange-50 text-orange-600 border-orange-100',
        'Medium': 'bg-blue-50 text-blue-600 border-blue-100',
        'Low': 'bg-gray-50 text-gray-500 border-gray-100'
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">
            <div className="max-w-[1000px] mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <PageHeader
                        title="Admin Notifications"
                        subtitle="Stay updated with store activities and system alerts"
                    />
                    <div className="flex gap-3">
                        <button
                            onClick={markAllAsRead}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all shadow-sm"
                        >
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            Mark all as read
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {['All', 'Order', 'Inventory', 'Review', 'User'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all ${filter === f
                                    ? 'bg-[#3E2723] text-white border-[#3E2723]'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Notifications List */}
                <div className="space-y-3">
                    {filteredNotifications.map((notif) => (
                        <div
                            key={notif.id}
                            className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${notif.isRead
                                    ? 'bg-white/60 border-gray-100 opacity-75'
                                    : 'bg-white border-gray-200 shadow-sm ring-1 ring-[#3E2723]/5'
                                }`}
                        >
                            <div className={`p-3 rounded-xl ${notif.isRead ? 'bg-gray-50' : 'bg-white border border-gray-50 shadow-sm'}`}>
                                {typeIcons[notif.type]}
                            </div>

                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        <h4 className={`text-sm font-semibold ${notif.isRead ? 'text-gray-600' : 'text-gray-900'}`}>
                                            {notif.title}
                                        </h4>
                                        {!notif.isRead && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                                        )}
                                    </div>
                                    <span className="text-[11px] font-medium text-gray-400 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {notif.time}
                                    </span>
                                </div>
                                <p className={`text-sm ${notif.isRead ? 'text-gray-400' : 'text-gray-600'} font-medium leading-relaxed`}>
                                    {notif.message}
                                </p>
                                <div className="flex items-center gap-3 pt-1">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${priorityStyles[notif.priority]}`}>
                                        {notif.priority}
                                    </span>
                                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-tighter">
                                        {notif.type}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                {!notif.isRead && (
                                    <button
                                        onClick={() => markAsRead(notif.id)}
                                        className="p-2 hover:bg-blue-50 text-gray-300 hover:text-blue-600 rounded-lg transition-all"
                                        title="Mark as read"
                                    >
                                        <Check className="w-5 h-5" />
                                    </button>
                                )}
                                <button
                                    onClick={() => deleteNotification(notif.id)}
                                    className="p-2 hover:bg-red-50 text-gray-300 hover:text-red-500 rounded-lg transition-all"
                                    title="Delete notification"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {filteredNotifications.length === 0 && (
                        <div className="p-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                            <Bell className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                            <h3 className="text-gray-400 font-semibold">No notifications in {filter}</h3>
                            <p className="text-sm text-gray-300">You're all caught up!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminNotifications;
