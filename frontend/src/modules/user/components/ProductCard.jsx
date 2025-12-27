import React, { useState } from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useShop } from '../../../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, isWishlistPage = false }) => {
    const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useShop();
    const [flying, setFlying] = useState(false);
    const [flyingType, setFlyingType] = useState('cart'); // 'cart' or 'heart'

    const isWishlisted = wishlist.some(item => item.id === product.id);

    // Calculate discount percentage if original price exists
    const discount = product.originalPrice > product.price
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setFlyingType('cart');
        setFlying(true);
        addToCart(product);
        setTimeout(() => setFlying(false), 800);
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isWishlisted) {
            setFlyingType('heart');
            setFlying(true);
            addToWishlist(product);
            setTimeout(() => setFlying(false), 800);
        } else {
            removeFromWishlist(product.id);
        }
    };

    return (
        <>
            <style>
                {`
                    @keyframes flyToCart {
                        0% { top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1); opacity: 1; border-radius: 20px; }
                        50% { opacity: 0.8; transform: translate(-50%, -50%) scale(0.4); }
                        100% { top: 30px; left: 92%; transform: translate(-50%, -50%) scale(0.1); opacity: 0; border-radius: 50%; }
                    }
                     @keyframes flyToHeart {
                        0% { top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1); opacity: 1; border-radius: 20px; }
                        50% { opacity: 0.8; transform: translate(-50%, -50%) scale(0.4); }
                        100% { top: 30px; left: 88%; transform: translate(-50%, -50%) scale(0.1); opacity: 0; border-radius: 50%; }
                    }
                    .animate-fly-cart {
                        animation: flyToCart 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                    }
                    .animate-fly-heart {
                        animation: flyToHeart 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                    }
                `}
            </style>

            {/* Flying Image Animation Element */}
            {flying && (
                <img
                    src={product.image}
                    alt=""
                    className={`fixed z-[9999] w-48 h-48 object-cover shadow-2xl pointer-events-none border-4 border-white ${flyingType === 'cart' ? 'animate-fly-cart' : 'animate-fly-heart'}`}
                    style={{ left: '50%', top: '50%' }}
                />
            )}

            <Link to={`/product/${product.id}`} className="group relative w-full h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-[#F5F5F5] shrink-0">
                    <div className="block w-full h-full">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                        />
                    </div>

                    {/* Dynamic Badges */}
                    {product.isNew ? (
                        <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-[#5D4037] text-white text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2.5 md:py-1 rounded shadow-sm tracking-wider z-10">
                            NEW
                        </span>
                    ) : product.rating >= 4.5 ? (
                        <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-[#8D6E63] text-white text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2.5 md:py-1 rounded shadow-sm tracking-wider z-10">
                            TRENDING
                        </span>
                    ) : null}

                    {/* Wishlist Heart - Bottom Left */}
                    <button
                        onClick={handleWishlist}
                        className={`absolute top-2 right-2 md:bottom-3 md:left-3 md:top-auto md:right-auto bg-white/90 backdrop-blur-sm p-1.5 md:p-2 rounded-full shadow-sm transition-all duration-300 z-20 ${isWishlisted ? 'text-red-500' : 'text-gray-400 md:text-gray-800 hover:bg-[#5D4037] hover:text-white'} opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 translate-y-0`}
                        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                        <Heart className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isWishlisted ? 'fill-current' : ''}`} strokeWidth={2} />
                    </button>

                    {/* Add to Bag - Desktop Only */}
                    <button
                        onClick={handleAddToCart}
                        className="hidden md:flex absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-bold px-4 py-2.5 rounded-full shadow-sm hover:bg-[#5D4037] hover:text-white transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 z-20 uppercase tracking-wide items-center gap-2"
                        title="Add to Cart"
                    >
                        Add to Bag
                    </button>
                </div>

                <div className={`${isWishlistPage ? 'p-1.5 md:p-4' : 'p-2 md:p-4'} text-left flex flex-col flex-1`}>
                    <h3 className={`text-[#5D4037] font-serif ${isWishlistPage ? 'text-[12px] md:text-xl mb-1 mt-0.5' : 'text-sm md:text-xl mb-1.5'} font-extrabold leading-tight hover:text-[#8D6E63] transition-colors line-clamp-1 md:line-clamp-2 tracking-wide`}>
                        {product.name}
                    </h3>

                    <div className="flex items-center gap-1 mb-1 text-[9px] md:text-base hidden md:flex">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-2.5 h-2.5 md:w-3 md:h-3 ${i < (Math.round(product.rating || 4)) ? 'fill-current' : 'text-gray-200'}`} />
                            ))}
                        </div>
                        <span className="text-gray-400 ml-1">({product.reviews || 42})</span>
                    </div>

                    <div className="flex flex-wrap items-baseline gap-1.5 md:gap-2 mt-auto">
                        <span className={`text-gray-900 font-semibold ${isWishlistPage ? 'text-xs md:text-lg' : 'text-sm md:text-lg'}`}>₹{product.price.toLocaleString()}</span>
                        {product.originalPrice > product.price && (
                            <>
                                <span className="text-gray-400 line-through text-[9px] md:text-xs font-medium">₹{product.originalPrice.toLocaleString()}</span>
                                <span className="text-emerald-600 text-[9px] md:text-xs font-bold bg-emerald-50 px-1 py-0.5 rounded ml-auto md:ml-0">
                                    {discount}% OFF
                                </span>
                            </>
                        )}
                    </div>

                    {/* Mobile Add to Bag Button - Only show on Wishlist Page */}
                    {isWishlistPage && (
                        <button
                            onClick={handleAddToCart}
                            className="md:hidden mt-2 w-full bg-[#3E2723] text-white py-2 rounded-xl text-[9px] font-bold uppercase tracking-[0.1em] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md shadow-brown-900/10"
                        >
                            <ShoppingBag className="w-3 h-3" /> Add to Bag
                        </button>
                    )}
                </div>
            </Link>
        </>
    );
};

export default ProductCard;
