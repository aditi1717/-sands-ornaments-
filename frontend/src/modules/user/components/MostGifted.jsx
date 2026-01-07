import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import Pink Premium Images
import braceletImg from '../assets/pink_bracelets_1767775488371.png';
import earringsImg from '../assets/pink_earrings_1767775466166.png';
import chainImg from '../assets/pink_chains_1767775516641.png';
import ankletImg from '../assets/pink_anklets_1767775536388.png';
import bannerModel from '../assets/gift_wife_silver.png';

const categories = [
    { id: 1, name: "Earrings", image: earringsImg, path: "/shop?category=earrings" },
    { id: 2, name: "Bracelets", image: braceletImg, path: "/shop?category=bracelets" },
    { id: 3, name: "Chains", image: chainImg, path: "/shop?category=chains" },
    { id: 4, name: "Anklets", image: ankletImg, path: "/shop?category=anklets" },
];

const MostGifted = () => {
    return (
        <section className="py-16 md:py-24 bg-[#FFF0F0] relative overflow-hidden">
            {/* Custom Animation for Reverse/Yoyo Effect */}
            <style>{`
                @keyframes shine-alt {
                    0% { transform: translateX(0) rotate(45deg); }
                    100% { transform: translateX(1200%) rotate(45deg); }
                }
            `}</style>
            <div className="container mx-auto px-4 md:px-8">

                <div className="flex flex-col lg:flex-row gap-4 md:gap-6 h-auto lg:h-[450px]">

                    {/* Feature Banner - Glow in Motion */}
                    <div className="w-full lg:w-[45%] relative rounded-[2rem] overflow-hidden group shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition-all duration-500 cursor-pointer">
                        <img
                            src={bannerModel}
                            alt="Glow in Motion Collection"
                            className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-[1500ms]"
                        />

                        {/* Shine Effect */}
                        <div className="absolute top-[-200%] left-[-200%] w-[40%] h-[500%] bg-gradient-to-r from-transparent via-white/40 to-transparent transform rotate(45 group-hover:translate-x-[800%] transition-transform duration-1000 z-20 pointer-events-none" />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent z-10" />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-center p-10 md:p-14 z-30">
                            <span className="text-[#C9A24D] text-sm font-bold tracking-[0.2em] uppercase mb-4 drop-shadow-md">Collection Focus</span>
                            <h2 className="font-display text-4xl md:text-5xl text-white mb-8 leading-tight drop-shadow-lg">
                                Most Gifted <br />
                                <span className="text-[#C9A24D] italic">Items</span>
                            </h2>

                            {/* CTA Button */}
                            <Link
                                to="/shop"
                                className="mt-8 inline-flex items-center gap-3 bg-white/20 border border-white/30 text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#722F37] transition-all duration-500 w-fit group/btn backdrop-blur-md"
                            >
                                <span className="uppercase tracking-widest text-xs font-bold">Explore Full Collection</span>
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Category Cards - Vertical & Dark */}
                    <div className="w-full lg:w-[55%] grid grid-cols-2 md:grid-cols-4 gap-4">
                        {categories.map((cat, index) => (
                            <Link
                                to={cat.path}
                                key={cat.id}
                                className="relative rounded-[2rem] overflow-hidden group h-[280px] lg:h-full bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer isolate"
                            >
                                {/* Product Image */}
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2000ms] opacity-90 group-hover:opacity-100"
                                />

                                {/* Shine Effect */}
                                <div className="absolute top-[-200%] left-[-200%] w-[100%] h-[500%] bg-gradient-to-r from-transparent via-white/40 to-transparent transform rotate(45 group-hover:translate-x-[2000%] transition-all duration-[2500ms] z-20 pointer-events-none opacity-0 group-hover:opacity-100 blur-[2px]" />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#722F37]/90 via-transparent to-transparent opacity-100 z-10" />

                                {/* Subtle Inner Border */}
                                <div className="absolute inset-0 border border-white/20 rounded-[2rem] group-hover:border-[#C9A24D]/30 transition-colors duration-500 z-10 pointer-events-none" />

                                {/* Text Content */}
                                <div className="absolute bottom-6 left-0 right-0 text-center z-30 px-2 transition-transform duration-500 group-hover:-translate-y-2">
                                    <h3 className="font-display text-lg tracking-[0.15em] text-white uppercase font-bold group-hover:text-[#C9A24D] transition-colors duration-300 drop-shadow-md">
                                        {cat.name}
                                    </h3>
                                    <div className="h-[1px] w-0 bg-[#C9A24D] mx-auto mt-2 transition-all duration-500 group-hover:w-8" />
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MostGifted;
