import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Store, Menu, X, Bell } from 'lucide-react';
import { useShop } from '../../../context/ShopContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cart, wishlist, user, userNotifications } = useShop();
    const location = useLocation();
    const isHome = location.pathname === '/';

    // Links matching the "Home, About Us, Collections, Pages, Contact Us" from screenshot roughly
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Collections", path: "/shop" },
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" },
    ];

    return (
        <>
            <nav className={`z-50 transition-all duration-300 border-b ${isHome ? 'fixed top-0 left-0 right-0 w-full border-transparent bg-white/20 backdrop-blur-md shadow-sm md:bg-[#FDFBF7] md:sticky md:border-[#EFEBE9]' : 'sticky top-0 border-[#EFEBE9] bg-[#FDFBF7]'}`}>
                {/* Top Bar - Asymmetric padding: Top 6, Bottom 3 */}
                <div className="container mx-auto px-4 md:px-6 pt-4 md:pt-6 pb-2 md:pb-3 flex items-center justify-between gap-4">
                    {/* Logo - Centered on mobile, Left on desktop */}
                    <div className="flex-1 md:flex-none flex md:block justify-start md:justify-start">
                        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                            <div className="hidden md:flex w-10 h-10 bg-[#5D4037] rounded-full items-center justify-center text-white font-serif font-bold text-xl">S</div>
                            <span className={`text-lg md:text-2xl font-serif font-bold tracking-tighter md:tracking-wide uppercase ${isHome ? 'text-white md:text-[#5D4037]' : 'text-[#5D4037]'}`}>
                                Sands Ornaments
                            </span>
                        </Link>
                    </div>

                    {/* Search Bar - Prominent and Centered (Desktop Only) */}
                    <div className="hidden md:flex flex-1 max-w-xl mx-auto relative group">
                        <input
                            type="text"
                            placeholder="Search for silver jewellery..."
                            className="w-full bg-white border border-[#EFEBE9] rounded-full py-3 px-6 pl-12 text-sm focus:outline-none focus:border-[#8D6E63] focus:ring-1 focus:ring-[#8D6E63] transition-all shadow-sm group-hover:shadow-md"
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#8D6E63] transition-colors" />
                    </div>

                    {/* Icons - Simplified on mobile */}
                    <div className={`flex items-center space-x-4 md:space-x-6 flex-shrink-0 ${isHome ? 'text-white md:text-[#5D4037]' : 'text-[#5D4037]'}`}>
                        <Link to="/shop" className="md:hidden hover:opacity-70">
                            <Search className="w-5 h-5 md:w-6 md:h-6" />
                        </Link>

                        <button className="hover:opacity-70 relative group">
                            <Link to="/notifications">
                                <Bell className="w-5 h-5 md:w-6 md:h-6" />
                                {userNotifications?.length > 0 && (
                                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-[#FDFBF7] rounded-full animate-pulse"></span>
                                )}
                            </Link>
                        </button>

                        <Link to="/cart" className="hover:opacity-70 relative">
                            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
                            {cart?.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#8D6E63] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-[#FDFBF7]">{cart.length}</span>
                            )}
                        </Link>

                        {/* Desktop Only Icons */}
                        <Link to="/wishlist" className="hidden md:block hover:opacity-70 relative">
                            <Heart className="w-6 h-6" />
                            {wishlist?.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#8D6E63] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-[#FDFBF7]">{wishlist.length}</span>
                            )}
                        </Link>

                        <Link to={user ? "/profile" : "/login"} className="hidden md:block hover:opacity-70">
                            <User className="w-6 h-6" />
                        </Link>

                        {/* Mobile Menu Toggle */}

                    </div>
                </div>
            </nav>

            {/* Floating Bottom Navigation - Mobile Only */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#EFEBE9] px-6 py-3 flex items-center justify-between z-[100] shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                <Link to="/" className="flex flex-col items-center gap-1 text-[#5D4037] group">
                    <Store className="w-5 h-5 md:w-6 md:h-6 group-active:scale-90 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
                </Link>
                <Link to="/shop" className="flex flex-col items-center gap-1 text-[#5D4037] group">
                    <Menu className="w-5 h-5 md:w-6 md:h-6 group-active:scale-90 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Shop</span>
                </Link>
                <Link to="/wishlist" className="flex flex-col items-center gap-1 text-[#5D4037] group relative">
                    <Heart className="w-5 h-5 md:w-6 md:h-6 group-active:scale-90 transition-transform" />
                    {wishlist?.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#8D6E63] text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full">{wishlist.length}</span>
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Wishlist</span>
                </Link>
                <Link to={user ? "/profile" : "/login"} className="flex flex-col items-center gap-1 text-[#5D4037] group">
                    <User className="w-5 h-5 md:w-6 md:h-6 group-active:scale-90 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Account</span>
                </Link>
            </div>
        </>
    );
};

export default Navbar;
