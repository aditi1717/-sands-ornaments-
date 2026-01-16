import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { products } from '../assets/data';
import ProductCard from './ProductCard';

const AllJewellery = () => {
    // Show 4 rows of 4 products (16 total)
    const displayProducts = products.slice(0, 16);

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-2 md:px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="space-y-2">
                        <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#C9A24D] font-bold">Our Collection</h2>
                        <h3 className="text-3xl md:text-5xl font-display text-[#722F37]">All Jewellery</h3>
                    </div>
                </div>

                {/* Grid - Using the standard ProductCard component */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {displayProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Subtle View All Link at Bottom */}
                <div className="mt-16 flex justify-center">
                    <Link
                        to="/shop"
                        className="group flex items-center gap-3 text-sm font-medium text-[#722F37] transition-all"
                    >
                        <span className="border-b border-[#722F37] pb-0.5 group-hover:text-[#C9A24D] group-hover:border-[#C9A24D] transition-all">
                            View Full Collection
                        </span>
                        <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AllJewellery;
