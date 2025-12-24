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
        return saved ? JSON.parse(saved) : [];
    });
    const [defaultAddressId, setDefaultAddressId] = useState(() => {
        return localStorage.getItem('defaultAddressId') || null;
    });

    const [notification, setNotification] = useState(null);

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
        showNotification(`Added ${product.name} to bag`);
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
            showNotification("Already in wishlist");
            return;
        }
        setWishlist((prev) => [...prev, product]);
        showNotification(`Added ${product.name} to wishlist`);
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter(item => item.id !== productId));
        showNotification("Item removed from bag");
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prev) => prev.filter(item => item.id !== productId));
        showNotification("Item removed from wishlist");
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
            id: 'TKT-' + Date.now(),
            date: new Date().toISOString(),
            status: 'Open',
            ...ticketData
        };
        setSupportTickets(prev => [newTicket, ...prev]);
        showNotification("Support ticket created. We will get back to you soon!");
        return newTicket.id;
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

    return (
        <ShopContext.Provider value={{
            cart, wishlist, user, orders, addresses, supportTickets,
            login, logout, placeOrder, addToCart, addToWishlist,
            removeFromCart, removeFromWishlist, updateQuantity, clearCart,
            addAddress, removeAddress, updateAddress, setDefaultAddress,
            defaultAddressId, createTicket, showNotification, deleteAccount
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
