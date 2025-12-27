import React, { createContext, useContext, useState, useEffect } from 'react';
import { Check } from 'lucide-react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    // Initialize from LocalStorage if available
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    });
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });
    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('orders');
        return saved ? JSON.parse(saved) : [];
    });
    const [addresses, setAddresses] = useState(() => {
        const saved = localStorage.getItem('addresses');
        return saved ? JSON.parse(saved) : [];
    });
    const [supportTickets, setSupportTickets] = useState(() => {
        const saved = localStorage.getItem('supportTickets');
        if (saved) return JSON.parse(saved);

        // Initial Dummy Data to show the flow
        return [
            {
                id: 'TKT-827415',
                userName: 'Aditi Singh',
                userEmail: 'aditi.s@gmail.com',
                subject: 'Polishing issue with Silver Necklace',
                category: 'Product Feedback',
                orderId: '1735921',
                message: 'The necklace I bought last week seems to be losing its shine already. Is this normal or can I get it polished?',
                date: new Date(Date.now() - 86400000).toISOString(),
                status: 'In Progress',
                replies: [
                    {
                        from: 'admin',
                        text: 'Hello Aditi! We are sorry to hear that. 925 Silver can sometimes tarnish due to humidity, but it shouldn\'t happen so soon. Please bring it to our store or ship it back, and we will polish it for free!',
                        date: new Date(Date.now() - 43200000).toISOString()
                    }
                ]
            },
            {
                id: 'TKT-192837',
                userName: 'Rahul Verma',
                userEmail: 'rahul.v@yahoo.com',
                subject: 'Tracking showing "Returned to Origin"',
                category: 'Order Tracking',
                orderId: '1735123',
                message: 'My order tracking says the package is being sent back to the warehouse. I was at home all day!',
                date: new Date(Date.now() - 172800000).toISOString(),
                status: 'Open',
                replies: []
            }
        ];
    });
    const [defaultAddressId, setDefaultAddressId] = useState(() => {
        return localStorage.getItem('defaultAddressId') || null;
    });

    const [notification, setNotification] = useState(null);

    // Notification Preferences & List
    const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
        return localStorage.getItem('notificationsEnabled') === 'true';
    });

    const [userNotifications, setUserNotifications] = useState(() => {
        const saved = localStorage.getItem('userNotifications');
        return saved ? JSON.parse(saved) : [];
    });

    const toggleNotificationSettings = () => {
        setNotificationsEnabled(prev => !prev);
    };

    const deleteUserNotification = (id) => {
        setUserNotifications(prev => prev.filter(n => n.id !== id));
    };

    // Auto-hide notification after 3 seconds
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    // Persist Cart
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Persist Wishlist
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    // Persist Orders
    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    // Persist Support Tickets
    useEffect(() => {
        localStorage.setItem('supportTickets', JSON.stringify(supportTickets));
    }, [supportTickets]);

    useEffect(() => {
        if (defaultAddressId) {
            localStorage.setItem('defaultAddressId', defaultAddressId);
        } else {
            localStorage.removeItem('defaultAddressId');
        }
    }, [defaultAddressId]);

    const showNotification = (message) => {
        setNotification(message);
    };

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        showNotification(`Welcome back, ${userData.name || 'User'}!`);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        // localStorage.removeItem('cart'); // Optional choice
        // localStorage.removeItem('wishlist'); 
        // localStorage.removeItem('orders'); // Usually keep orders history
        setCart([]);
        setWishlist([]);
        showNotification("Logged out successfully");
    };

    const placeOrder = (orderDetails) => {
        const newOrder = {
            id: 'ORD-' + Date.now(),
            date: new Date().toISOString(),
            items: cart,
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            status: 'Processing',
            ...orderDetails
        };
        setOrders(prev => [newOrder, ...prev]);
        setCart([]); // Clear cart after order
        showNotification("Order placed successfully!");
        return newOrder.id;
    };

    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId, amount) => {
        setCart((prev) => prev.map((item) => {
            if (item.id === productId) {
                const newQuantity = Math.max(1, (item.quantity || 1) + amount);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const addToWishlist = (product) => {
        if (wishlist.find(item => item.id === product.id)) {
            return;
        }
        setWishlist((prev) => [...prev, product]);
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter(item => item.id !== productId));
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prev) => prev.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const addAddress = (address) => {
        const newAddress = { ...address, id: Date.now().toString() };
        setAddresses(prev => [newAddress, ...prev]);
        if (addresses.length === 0 || address.isDefault) {
            setDefaultAddressId(newAddress.id);
        }
        showNotification("Address added successfully");
    };

    const setDefaultAddress = (addressId) => {
        setDefaultAddressId(addressId);
        showNotification("Marked as default address");
    };

    const removeAddress = (addressId) => {
        setAddresses(prev => prev.filter(a => a.id !== addressId));
        showNotification("Address removed");
    };

    const updateAddress = (updatedAddress) => {
        setAddresses(prev => prev.map(a => a.id === updatedAddress.id ? updatedAddress : a));
        showNotification("Address updated");
    };

    const createTicket = (ticketData) => {
        const newTicket = {
            id: 'TKT-' + Date.now().toString().slice(-6),
            date: new Date().toISOString(),
            status: 'Open',
            replies: [],
            ...ticketData
        };
        setSupportTickets(prev => [newTicket, ...prev]);
        showNotification("Support ticket created. We will get back to you soon!");
        return newTicket.id;
    };

    const updateTicketStatus = (ticketId, newStatus) => {
        setSupportTickets(prev => prev.map(t =>
            t.id === ticketId ? { ...t, status: newStatus } : t
        ));
    };

    const addTicketReply = (ticketId, reply) => {
        setSupportTickets(prev => prev.map(t => {
            if (t.id === ticketId) {
                return {
                    ...t,
                    status: reply.from === 'admin' ? 'In Progress' : t.status,
                    replies: [...(t.replies || []), {
                        ...reply,
                        date: new Date().toISOString()
                    }]
                };
            }
            return t;
        }));
    };

    const deleteTicket = (ticketId) => {
        setSupportTickets(prev => prev.filter(t => t.id !== ticketId));
        showNotification("Ticket removed successfully.");
    };

    const deleteAccount = () => {
        setUser(null);
        setOrders([]);
        setAddresses([]);
        setCart([]);
        setWishlist([]);
        setSupportTickets([]);
        setDefaultAddressId(null);
        localStorage.clear();
        showNotification("Account deleted successfully.");
    };

    // Persist Notifications
    useEffect(() => {
        localStorage.setItem('notificationsEnabled', notificationsEnabled);
    }, [notificationsEnabled]);

    useEffect(() => {
        localStorage.setItem('userNotifications', JSON.stringify(userNotifications));
    }, [userNotifications]);

    return (
        <ShopContext.Provider value={{
            cart, wishlist, user, orders, addresses, supportTickets,
            login, logout, placeOrder, addToCart, addToWishlist,
            removeFromCart, removeFromWishlist, updateQuantity, clearCart,
            addAddress, removeAddress, updateAddress, setDefaultAddress,
            defaultAddressId, createTicket, updateTicketStatus, addTicketReply, deleteTicket,
            showNotification, deleteAccount,
            notificationsEnabled, userNotifications, toggleNotificationSettings, deleteUserNotification
        }}>
            {children}

            {/* Custom Toast Notification */}
            {notification && (
                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-5 duration-300">
                    <div className="bg-[#3E2723] text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 min-w-[300px] justify-center">
                        <div className="bg-white/20 p-1 rounded-full">
                            <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-sm tracking-wide">{notification}</span>
                    </div>
                </div>
            )}
        </ShopContext.Provider>
    );
};

export const useShop = () => useContext(ShopContext);
