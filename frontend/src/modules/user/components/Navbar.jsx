import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Store, Menu, X } from 'lucide-react';
import { useShop } from '../../../context/ShopContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cart, wishlist, user } = useShop();

    // Links matching the "Home, About Us, Collections, Pages, Contact Us" from screenshot roughly
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Collections", path: "/shop" },
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" },
    ];

    return (
        <nav className="bg-[#FDFBF7] sticky top-0 z-50 transition-all duration-300 border-b border-[#EFEBE9]">
            {/* Top Bar - Asymmetric padding: Top 6, Bottom 3 */}
            <div className="container mx-auto px-6 pt-6 pb-3 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-10 h-10 bg-[#5D4037] rounded-full flex items-center justify-center text-white font-serif font-bold text-xl">S</div>
                    <span className="text-2xl font-serif text-[#5D4037] font-bold tracking-wide hidden sm:block">
                        Sands Ornaments
                    </span>
                </Link>

                {/* Search Bar - Prominent and Centered */}
                <div className="hidden md:flex flex-1 max-w-xl mx-auto relative group">
                    <input
                        type="text"
                        placeholder="Search for silver jewellery..."
                        className="w-full bg-white border border-[#EFEBE9] rounded-full py-3 px-6 pl-12 text-sm focus:outline-none focus:border-[#8D6E63] focus:ring-1 focus:ring-[#8D6E63] transition-all shadow-sm group-hover:shadow-md"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#8D6E63] transition-colors" />
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-6 text-[#5D4037] flex-shrink-0">

                    <Link to="/wishlist" className="hover:opacity-70 relative">
                        <Heart className="w-6 h-6" />
                        {wishlist?.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#8D6E63] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{wishlist.length}</span>
                        )}
                    </Link>

                    <Link to="/cart" className="hover:opacity-70 relative">
                        <ShoppingBag className="w-6 h-6" />
                        {cart?.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#8D6E63] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{cart.length}</span>
                        )}
                    </Link>

                    <Link to={user ? "/profile/profile" : "/login"} className="hover:opacity-70">
                        <User className="w-6 h-6" />
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>
            {/* Mobile Search - Visible only on mobile */}
            <div className="md:hidden px-6 pb-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-white border border-[#EFEBE9] rounded-full py-2.5 px-4 pl-10 text-sm focus:outline-none focus:border-[#8D6E63]"
                    />
                    <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
            </div>


            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-[#FDFBF7] border-t border-gray-200 absolute w-full left-0 top-full shadow-xl h-screen z-50 px-6 py-8">
                    <div className="flex flex-col space-y-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-2xl font-serif text-[#5D4037]"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
