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
                <div className="relative aspect-[5/4] overflow-hidden bg-[#F5F5F5] shrink-0">
                    <div className="block w-full h-full">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                        />
                    </div>

                    {/* Dynamic Badges */}
                    {product.isNew ? (
                        <span className="absolute top-4 right-0 bg-[#B7A0BA] text-white text-[10px] font-bold px-3 py-1 shadow-sm tracking-widest z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 12px 50%)', paddingLeft: '16px' }}>
                            NEW
                        </span>
                    ) : product.rating >= 4.5 ? (
                        <span className="absolute top-4 right-0 bg-[#B7A0BA] text-white text-[10px] font-bold px-3 py-1 shadow-sm tracking-widest z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 12px 50%)', paddingLeft: '16px' }}>
                            TRENDING
                        </span>
                    ) : null}

                    {/* Wishlist Heart - Top Left */}
                    <button
                        onClick={handleWishlist}
                        className={`absolute top-2 left-2 z-20 p-2 transition-all duration-300 hover:scale-110 rounded-full ${isWishlisted ? 'bg-transparent text-[#EBD3EC] fill-[#EBD3EC]' : 'bg-transparent text-[#EBD3EC]'}`}
                        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} strokeWidth={2} />
                    </button>

                    {/* Add to Bag - Desktop Only */}
                    {/* Rating Badge - Bottom Left (Image Overlay) */}
                    <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm z-10">
                        <span className="text-[10px] font-bold text-black">{product.rating || 4.8}</span>
                        <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-[10px] text-gray-500 border-l border-gray-300 pl-1 ml-0.5">{product.reviews || 133}</span>
                    </div>
                </div>

                <div className={`${isWishlistPage ? 'p-1.5 md:p-3' : 'p-2 md:p-3'} text-left flex flex-col flex-1 pb-2`}>

                    {/* Price Section first */}
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className={`text-black font-bold ${isWishlistPage ? 'text-sm' : 'text-base'}`}>₹{product.price.toLocaleString()}</span>
                        {product.originalPrice > product.price && (
                            <span className="text-gray-400 line-through text-xs">₹{product.originalPrice.toLocaleString()}</span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className={`text-black font-serif ${isWishlistPage ? 'text-sm' : 'text-lg'} font-medium leading-tight mb-1 line-clamp-2`}>
                        {product.name}
                    </h3>
                </div>

                {/* Add to Cart Button - Full Width Flush Bottom */}
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-[#EBD3EC] text-black py-3 text-sm font-bold hover:bg-[#B7A0BA] hover:text-white transition-colors uppercase tracking-widest mt-auto mb-0 rounded-none border-t border-transparent"
                >
                    Add to Cart
                </button>
            </Link>
        </>
    );
};

export default ProductCard;
