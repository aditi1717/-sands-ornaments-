import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoveRight, ArrowRight } from 'lucide-react';
import { categories } from '../assets/data';
import { motion, AnimatePresence } from 'framer-motion';

const CategoryNav = () => {
    const [hoveredCategory, setHoveredCategory] = useState(null);

    // Create a new "All Jewellery" category structure purely for the mega menu
    const allJewelleryItem = {
        id: 'all',
        name: 'All Jewellery',
        path: 'shop',
        subcategories: categories // It contains all other categories as its children
    };

    // Custom Menu Items
    const homeItem = { id: 'home', name: 'Home', path: '/', subcategories: [] };
    const newArrivalsItem = { id: 'new-arrivals', name: 'New Arrivals', path: 'new-arrivals', subcategories: [] };
    const trendingItem = { id: 'trending', name: 'Trending', path: 'trending', subcategories: [] };
    const aboutUsItem = { id: 'about', name: 'About Us', path: 'about', subcategories: [] };

    // Filter categories to remove: Toe Rings, Earrings, Bracelets
    const unwantedCategories = ['Toe Rings', 'Earrings', 'Bracelets'];
    const filteredCategories = categories.filter(cat => !unwantedCategories.includes(cat.name));

    // Combine for rendering: Home + All Jewellery + Filtered Categories + New Items
    const navItems = [homeItem, allJewelleryItem, ...filteredCategories.slice(0, 4), newArrivalsItem, trendingItem, aboutUsItem];

    return (
        <div className="bg-[#FCF2FB] border-b border-[#EBD3EC] hidden md:block sticky top-[77px] z-40 shadow-sm font-sans">
            <div className="container mx-auto px-4">
                <ul className="flex justify-center items-center h-16 space-x-12">
                    {navItems.slice(0, 11).map((cat) => (
                        <li
                            key={cat.id}
                            className="h-full flex items-center"
                            onMouseEnter={() => {
                                if (cat.subcategories && cat.subcategories.length > 0) {
                                    setHoveredCategory(cat.id);
                                }
                            }}
                            onMouseLeave={() => setHoveredCategory(null)}
                        >
                            <Link
                                to={cat.id === 'home' ? '/' : ['about', 'new-arrivals', 'trending'].includes(cat.id) ? `/${cat.path}` : cat.id === 'all' ? '/shop' : `/category/${cat.path}`}
                                onClick={() => setHoveredCategory(null)}
                                className={`font-display text-sm tracking-[0.15em] font-semibold flex items-center gap-1 transition-all duration-300 relative py-2
                                    ${hoveredCategory === cat.id ? 'text-[#B7A0BA]' : 'text-black'}
                                `}
                            >
                                {cat.name}
                                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#B7A0BA] transform transition-transform duration-300 ${hoveredCategory === cat.id ? 'scale-x-100' : 'scale-x-0'}`}></span>
                            </Link>

                            {/* Mega Menu Dropdown */}
                            <AnimatePresence>
                                {hoveredCategory === cat.id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute left-0 top-full w-full bg-white shadow-2xl border-t border-[#EBD3EC] py-12 min-h-[400px]"
                                    >
                                        <div className="container mx-auto px-8">
                                            {/* Special Layout for "All Jewellery" */}
                                            {cat.id === 'all' ? (
                                                <div className="grid grid-cols-5 gap-8">
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -50 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                                        className="col-span-1 pr-6 border-r border-gray-100"
                                                    >
                                                        <h3 className="font-display text-3xl text-black mb-4">Complete Collection</h3>
                                                        <p className="text-gray-500 font-serif italic mb-6 leading-relaxed">
                                                            Browse our entire catalogue of handcrafted silver pieces, from everyday essentials to statement luxury.
                                                        </p>
                                                        <Link to="/shop" onClick={() => setHoveredCategory(null)} className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#B7A0BA] hover:text-black transition-colors group">
                                                            View All Products <MoveRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                        </Link>
                                                    </motion.div>

                                                    {/* Grid of Categories inside All Jewellery */}
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 50 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                                                        className="col-span-4 grid grid-cols-4 gap-x-6 gap-y-10"
                                                    >
                                                        {cat.subcategories.map((subCat) => (
                                                            <div key={subCat.id} className="flex items-center gap-4 group">
                                                                {/* Left: Small Thumbnail */}
                                                                <Link to={`/category/${subCat.path}`} onClick={() => setHoveredCategory(null)} className="flex-shrink-0">
                                                                    <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-100 shadow-sm transition-shadow group-hover:shadow-md">
                                                                        <img src={subCat.image} alt={subCat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                                    </div>
                                                                </Link>

                                                                {/* Right: Title Only */}
                                                                <div className="flex flex-col justify-center">
                                                                    <Link to={`/category/${subCat.path}`} onClick={() => setHoveredCategory(null)}>
                                                                        <h4 className="font-display font-bold text-black text-lg group-hover:text-[#B7A0BA] transition-colors">{subCat.name}</h4>
                                                                    </Link>
                                                                    <Link to={`/category/${subCat.path}`} onClick={() => setHoveredCategory(null)} className="text-[10px] font-bold text-[#B7A0BA] uppercase tracking-wider mt-1 hover:underline opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-1 group-hover:translate-y-0">
                                                                        View Collection
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                </div>
                                            ) : (
                                                /* Standard Mega Menu Layout for Single Categories */
                                                <div className="flex gap-12">
                                                    {/* Left: Category Info & Subcategories List */}
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -30 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                                        className="w-1/4 space-y-8 border-r border-gray-100 pr-8"
                                                    >
                                                        <div>
                                                            <h3 className="font-display text-3xl text-black mb-2">{cat.name}</h3>
                                                            <p className="text-gray-500 font-serif italic mb-6">Explore our exclusive collection of {cat.name.toLowerCase()}.</p>
                                                            <Link to={`/category/${cat.path}`} onClick={() => setHoveredCategory(null)} className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#B7A0BA] hover:text-black transition-colors group">
                                                                View All Products <MoveRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                            </Link>
                                                        </div>

                                                        <ul className="space-y-3">
                                                            {cat.subcategories?.map((sub, idx) => (
                                                                <li key={idx}>
                                                                    <Link to={`/category/${cat.path}/${sub.name.toLowerCase()}`} onClick={() => setHoveredCategory(null)} className="text-gray-600 hover:text-[#B7A0BA] hover:tracking-wide transition-all duration-300 font-medium flex items-center justify-between group">
                                                                        {sub.name}
                                                                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </motion.div>

                                                    {/* Right: Visual Grid of Subcategories */}
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 30 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                                                        className="w-3/4"
                                                    >
                                                        <div className="grid grid-cols-4 gap-6">
                                                            {cat.subcategories?.slice(0, 4).map((sub, index) => (
                                                                <Link key={index} to={`/category/${cat.path}/${sub.name.toLowerCase()}`} onClick={() => setHoveredCategory(null)} className="group block relative overflow-hidden rounded-lg">
                                                                    <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                                                                        <div className="absolute inset-0 bg-[#B7A0BA]/0 group-hover:bg-[#B7A0BA]/10 z-10 transition-colors duration-500" />
                                                                        <img
                                                                            src={sub.image}
                                                                            alt={sub.name}
                                                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                                                                        />

                                                                        {/* Overlay Text */}
                                                                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                                            <h4 className="text-white font-display text-lg tracking-wide text-center">{sub.name}</h4>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoryNav;
