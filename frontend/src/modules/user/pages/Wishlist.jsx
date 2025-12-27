import React from 'react';
import ProductCard from '../components/ProductCard';
import { useShop } from '../../../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Wishlist = () => {
    const { wishlist } = useShop();
    const navigate = useNavigate();

    return (
        <div className="bg-[#FDFBF7] min-h-screen">
            {/* Back Button */}
            <div className="container mx-auto px-4 pt-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-[#8D6E63] hover:text-[#3E2723] transition-all group font-bold uppercase tracking-widest text-[10px]"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back
                </button>
            </div>
            {/* Page Header - Only show if wishlist has items */}
            {wishlist.length > 0 && (
                <div className="bg-white border-b border-gray-100">
                    <div className="container mx-auto px-4 py-12 md:py-16">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center space-y-4"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F5F5] text-[#5D4037] text-[10px] font-bold uppercase tracking-widest mb-2">
                                <Sparkles className="w-3 h-3" />
                                Your Collection
                            </div>
                            <h1 className="text-3xl md:text-5xl font-serif font-extrabold text-[#5D4037]">My Wishlist</h1>
                            <p className="text-[#8D6E63] text-sm md:text-base max-w-md mx-auto leading-relaxed">
                                A curated collection of your most loved pieces. Ready to make them yours?
                            </p>
                            <div className="pt-2">
                                <span className="inline-block px-4 py-1.5 bg-[#5D4037] text-white text-xs font-bold rounded-full shadow-sm">
                                    {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'} Saved
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 py-12">
                {wishlist.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm"
                    >
                        <div className="w-24 h-24 bg-[#FDFBF7] rounded-full flex items-center justify-center mb-8 shadow-inner border border-gray-50">
                            <Heart className="w-10 h-10 text-[#D7CCC8]" fill="none" strokeWidth={1.5} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#5D4037] mb-4">Your Boutique is Empty</h2>
                        <p className="text-[#8D6E63] mb-10 max-w-sm leading-relaxed text-sm md:text-base">
                            Explore our exquisite collection and tap the heart icon to save your favorite ornaments here.
                        </p>
                        <Link
                            to="/shop"
                            className="bg-[#3E2723] text-white px-10 py-4 rounded-full hover:bg-[#5D4037] transition-all duration-300 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs shadow-lg shadow-black/10 flex items-center gap-3 hover:-translate-y-1 active:scale-95"
                        >
                            <ArrowLeft className="w-4 h-4" /> Start Shopping
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10">
                        <AnimatePresence mode="popLayout">
                            {wishlist.map((product, idx) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                    transition={{
                                        type: "spring",
                                        damping: 25,
                                        stiffness: 200,
                                        delay: idx * 0.05
                                    }}
                                    className="relative flex justify-center"
                                >
                                    <ProductCard product={product} isWishlistPage={true} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Aesthetic Footer Note */}
            {wishlist.length > 0 && (
                <div className="container mx-auto px-4 pb-20">
                    <div className="text-center pt-12 border-t border-gray-100">
                        <p className="text-[#8D6E63] text-xs font-semibold uppercase tracking-widest opacity-60">
                            Sands & Ornaments • Handcrafted Elegance
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
