import React from 'react';
import { useShop } from '../../../context/ShopContext';
import { Bell, BellOff, ArrowLeft, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Notifications = () => {
    const { notificationsEnabled, userNotifications, toggleNotificationSettings, deleteUserNotification } = useShop();
    const navigate = useNavigate();

    // Compact styles for mobile
    const styles = {
        page: "min-h-screen bg-[#FDFBF7] font-sans pb-12",
        header: "bg-white shadow-sm p-4 sticky top-0 z-20 flex items-center gap-4 border-b border-[#EFEBE9]",
        headerTitle: "text-lg font-bold font-serif text-[#3E2723]",
        container: "max-w-2xl mx-auto px-4 py-8",

        // Empty/Off State
        emptyContainer: "flex flex-col items-center justify-center text-center py-20 px-4",
        iconContainer: "bg-[#EFEBE9] p-6 rounded-full mb-6",
        emptyTitle: "text-xl font-bold text-[#3E2723] mb-2 font-serif",
        emptyText: "text-sm text-[#8D6E63] leading-relaxed max-w-xs mx-auto mb-8",
        actionButton: "bg-[#3E2723] text-white px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#5D4037] transition-all shadow-lg shadow-[#3E2723]/20 active:scale-95",

        // List State
        listContainer: "space-y-4",
        card: "bg-white p-4 rounded-xl border border-[#EFEBE9] shadow-sm flex gap-4 items-start relative group transition-all hover:shadow-md",
        cardIcon: "p-2 rounded-lg bg-[#EFEBE9] text-[#5D4037] flex-shrink-0",
        cardContent: "flex-grow min-w-0 pr-6", // pr-6 for delete button space
        cardTitle: "text-sm font-bold text-[#3E2723] mb-1",
        cardMessage: "text-xs text-[#8D6E63] leading-relaxed mb-2 line-clamp-2",
        cardDate: "text-[10px] text-[#A1887F] font-medium uppercase tracking-wider",
        deleteBtn: "absolute top-4 right-4 text-gray-400 hover:text-red-500 p-1 rounded-md transition-colors",
    };

    // --- RENDER CONTENT ---

    // 1. If Notifications are OFF (or list is empty, effectively "no notifications")
    // The user wants a specific message and "Turn On" button if notifications are "no notification".
    // I will treat "Disabled" OR "Empty" similarly but distinct actions.

    if (!notificationsEnabled) {
        return (
            <div className={styles.page}>
                <div className={styles.header}>
                    <button onClick={() => navigate(-1)} className="text-[#3E2723]">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className={styles.headerTitle}>Notifications</h1>
                </div>
                <div className={styles.container}>
                    <div className={styles.emptyContainer}>
                        <div className={styles.iconContainer}>
                            <BellOff className="w-12 h-12 text-[#8D6E63]" />
                        </div>
                        <h2 className={styles.emptyTitle}>You have no notifications</h2>
                        <p className={styles.emptyText}>
                            Get alerts on order updates, latest offers, and new arrivals.
                        </p>
                        <button onClick={toggleNotificationSettings} className={styles.actionButton}>
                            Turn On Notifications
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // 2. Enabled but Empty
    if (userNotifications.length === 0) {
        return (
            <div className={styles.page}>
                <div className={styles.header}>
                    <button onClick={() => navigate(-1)} className="text-[#3E2723]">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className={styles.headerTitle}>Notifications</h1>
                </div>
                <div className={styles.container}>
                    <div className={styles.emptyContainer}>
                        <div className={styles.iconContainer}>
                            <Bell className="w-12 h-12 text-[#8D6E63]" />
                        </div>
                        <h2 className={styles.emptyTitle}>All caught up!</h2>
                        <p className={styles.emptyText}>
                            You have no new notifications at the moment.
                        </p>
                        <Link to="/shop" className="text-[#3E2723] font-bold text-sm underline mt-4">Continue Shopping</Link>
                    </div>
                </div>
            </div>
        );
    }

    // 3. Enabled and Has Items
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <button onClick={() => navigate(-1)} className="text-[#3E2723]">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className={styles.headerTitle}>Notifications ({userNotifications.length})</h1>
            </div>

            <div className={styles.container}>
                <div className={styles.listContainer}>
                    {userNotifications.map((note) => (
                        <div key={note.id} className={styles.card}>
                            <div className={styles.cardIcon}>
                                <Bell className="w-5 h-5" />
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{note.title}</h3>
                                <p className={styles.cardMessage}>{note.message}</p>
                                <span className={styles.cardDate}>{note.date}</span>
                            </div>
                            <button onClick={() => deleteUserNotification(note.id)} className={styles.deleteBtn}>
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
