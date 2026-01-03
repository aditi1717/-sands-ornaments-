import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Store, Menu, X, Bell } from 'lucide-react';
import { useShop } from '../../../context/ShopContext';
import logo from '../../user/assets/SANDS JEWELS PINK (1).png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cart, wishlist, user, userNotifications } = useShop();
    const location = useLocation();
    const isHome = location.pathname === '/';

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Collections", path: "/shop" },
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" },
    ]; return (
        <>
            <nav className={`z-50 transition-all duration-300 border-b ${isHome ? 'fixed top-0 left-0 right-0 w-full border-transparent bg-white/95 backdrop-blur-md shadow-sm md:bg-white/95 md:backdrop-blur-sm md:sticky md:border-[#EBCDD0]' : 'sticky top-0 border-[#EBCDD0] bg-white/95 backdrop-blur-sm shadow-sm'}`}>
                {/* Top Bar - Asymmetric padding: Top 6, Bottom 3 */}
                <div className="container mx-auto px-4 md:px-6 pt-4 md:pt-6 pb-2 md:pb-3 flex items-center justify-between gap-4">
                    {/* Logo - Centered on mobile, Left on desktop */}
                    <div className="flex-1 md:flex-none flex md:block justify-start md:justify-start">
                        <Link to="/" className="relative h-10 w-10 md:h-14 md:w-14 flex items-center justify-center flex-shrink-0 group z-50">
                            {/* Logo Image - Overhanging */}
                            <img
                                src={logo}
                                alt="Sands Jewels"
                                className="absolute top-1/2 left-0 -translate-y-1/2 h-28 w-28 md:h-40 md:w-40 max-w-none object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium uppercase tracking-widest transition-colors hover:text-[#D39A9F] ${location.pathname === link.path ? 'text-[#D39A9F]' : 'text-black'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Search Bar - Prominent and Centered (Desktop Only) */}
                    <div className="hidden md:flex flex-1 max-w-xl mx-auto relative group">
                        <input
                            type="text"
                            placeholder="Search for silver jewellery..."
                            className="w-full bg-white border border-[#EBCDD0] rounded-full py-3.5 px-6 pl-12 text-sm focus:outline-none focus:border-[#D39A9F] focus:ring-1 focus:ring-[#D39A9F] transition-all shadow-sm group-hover:shadow-md text-black placeholder-gray-400"
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#D39A9F] transition-colors" />
                    </div>

                    {/* Icons - Simplified on mobile */}
                    <div className="flex items-center space-x-4 md:space-x-6 flex-shrink-0 text-black">
                        <Link to="/shop" className="md:hidden hover:opacity-70">
                            <Search className="w-5 h-5 md:w-6 md:h-6" />
                        </Link>

                        <button className="hover:opacity-70 relative group">
                            <Link to="/notifications">
                                <Bell className="w-5 h-5 md:w-6 md:h-6" />
                                {userNotifications?.length > 0 && (
                                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
                                )}
                            </Link>
                        </button>

                        <Link to="/cart" className="hover:opacity-70 relative">
                            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
                            {cart?.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#D39A9F] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">{cart.length}</span>
                            )}
                        </Link>

                        {/* Desktop Only Icons */}
                        <Link to="/wishlist" className="hidden md:block hover:opacity-70 relative">
                            <Heart className="w-6 h-6" />
                            {wishlist?.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#D39A9F] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">{wishlist.length}</span>
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
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#EBCDD0] px-6 py-3 flex items-center justify-between z-[100] shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                <Link to="/" className="flex flex-col items-center gap-1 text-gray-500 hover:text-black group">
                    <Store className="w-5 h-5 md:w-6 md:h-6 group-active:scale-90 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
                </Link>
                <Link to="/shop" className="flex flex-col items-center gap-1 text-gray-500 hover:text-black group">
                    <Menu className="w-5 h-5 md:w-6 md:h-6 group-active:scale-90 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Shop</span>
                </Link>
                <Link to="/wishlist" className="flex flex-col items-center gap-1 text-gray-500 hover:text-black group relative">
                    <Heart className="w-5 h-5 md:w-6 md:h-6 group-active:scale-90 transition-transform" />
                    {wishlist?.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#D39A9F] text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full">{wishlist.length}</span>
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Wishlist</span>
                </Link>
                <Link to={user ? "/profile" : "/login"} className="flex flex-col items-center gap-1 text-gray-500 hover:text-black group">
                    <User className="w-5 h-5 md:w-6 md:h-6 group-active:scale-90 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Account</span>
                </Link>
            </div>
        </>
    );
};

export default Navbar;
