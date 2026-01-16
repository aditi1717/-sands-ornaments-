import React from 'react';
import { Link } from 'react-router-dom';
import haldiImg from '../assets/haldi.png';
import sangeetImg from '../assets/sangeet.png';
import receptionImg from '../assets/reception.png';
import bridalImg from '../assets/bridal.png';
import bridesmaidImg from '../assets/hero_slide_3.png';

const OccasionalSpecial = () => {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <h2 className="font-display text-4xl md:text-5xl text-[#2F0A0F] mb-4">Curated For You</h2>
                    <div className="h-1 w-24 bg-[#C9A24D] mx-auto rounded-full mb-4"></div>
                    <p className="font-serif italic text-gray-600 text-xl">Occasional Specials</p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">

                    {/* Column 1 - Stacked */}
                    <div className="flex flex-col gap-6 h-full md:row-span-2">
                        <Link to="/category/haldi" className="relative group overflow-hidden rounded-2xl flex-1 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
                            <img src={haldiImg} alt="Haldi" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2F0A0F]/80 via-transparent to-transparent"></div>
                            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-display text-2xl tracking-wide w-full text-center">Haldi</span>
                        </Link>
                        <Link to="/category/sangeet" className="relative group overflow-hidden rounded-2xl flex-1 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
                            <img src={sangeetImg} alt="Sangeet" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2F0A0F]/80 via-transparent to-transparent"></div>
                            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-display text-2xl tracking-wide w-full text-center">Sangeet</span>
                        </Link>
                    </div>

                    {/* Column 2 - Tall Centerpiece */}
                    <Link to="/category/reception" className="relative group overflow-hidden rounded-2xl md:row-span-2 shadow-lg hover:shadow-2xl transition-all duration-300">
                        <img src={receptionImg} alt="Reception" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2F0A0F]/80 via-transparent to-transparent"></div>
                        <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white font-display text-4xl tracking-wide w-full text-center drop-shadow-md">Reception</span>
                    </Link>

                    {/* Column 3 - Stacked */}
                    <div className="flex flex-col gap-6 h-full md:row-span-2">
                        <Link to="/category/bridal" className="relative group overflow-hidden rounded-2xl flex-[1.3] cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
                            <img src={bridalImg} alt="Gift for Bride" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2F0A0F]/80 via-transparent to-transparent"></div>
                            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-display text-2xl tracking-wide whitespace-nowrap drop-shadow-sm">Gift for Bride</span>
                        </Link>
                        <Link to="/category/bridesmaids" className="relative group overflow-hidden rounded-2xl flex-[0.7] cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
                            <img src={bridesmaidImg} alt="Gift for Bridesmaid" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2F0A0F]/80 via-transparent to-transparent"></div>
                            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-display text-2xl tracking-wide whitespace-nowrap drop-shadow-sm">Gift for Bridesmaid</span>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default OccasionalSpecial;
