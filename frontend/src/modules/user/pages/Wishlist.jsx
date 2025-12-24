import React from 'react';
import ProductCard from '../components/ProductCard';
import { useShop } from '../../../context/ShopContext';
import { Link } from 'react-router-dom';
import { X, Heart } from 'lucide-react';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useShop();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-serif font-bold text-[#5D4037] mb-8 text-center md:text-left">My Wishlist</h1>

            {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in duration-500">
                    <div className="mb-6">
                        <Heart className="w-24 h-24 text-gray-300" strokeWidth={1} />
                    </div>
                    <h2 className="text-3xl font-serif font-medium text-[#3E2723] mb-4">Wishlist is empty.</h2>
                    <p className="text-gray-500 mb-8 max-w-md leading-relaxed">
                        You don't have any products in the wishlist yet.<br />
                        You will find a lot of interesting products on our "Shop" page.
                    </p>
                    <Link
                        to="/shop"
                        className="bg-[#3E2723] text-white px-10 py-3.5 rounded-sm hover:bg-[#5D4037] transition-all duration-300 font-medium uppercase tracking-wider text-sm shadow-md hover:shadow-lg"
                    >
                        Return to Shop
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {wishlist.map((product) => (
                        <div key={product.id} className="relative group">
                            <ProductCard product={product} />
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    removeFromWishlist(product.id);
                                }}
                                className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all z-30 opacity-0 group-hover:opacity-100"
                                title="Remove from Wishlist"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
