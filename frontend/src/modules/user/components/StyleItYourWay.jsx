import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Importing assets for Banners (using available hero/trending assets)
import bannerDaily from '../assets/banner_daily.png';
import bannerOffice from '../assets/banner_office.png';
import bannerParty from '../assets/banner_party.png';
import bannerCasual from '../assets/trending_heritage.png';

// Importing assets for Thumbnails (using available product assets)
import prodChain from '../assets/silver_chain_product.png';
import prodBracelet from '../assets/silver_bracelet_product.png';
import prodEarring from '../assets/silver_earrings_product.png';
import prodPendant from '../assets/cat_pendant.png';
import prodRing from '../assets/cat_ring_wine.png';
import prodAnklet from '../assets/cat_anklets.png'; // Premium Asset
import prodGift from '../assets/gift_friends_silver.png';
import prodSis from '../assets/gift_sister_silver.png';
import prodWineEar from '../assets/cat_earrings_wine.png';
import prodWineRing from '../assets/cat_ring_wine.png';

const StyleItYourWay = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 350; // Card width + gap
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    const collections = [
        {
            id: 1,
            title: "Daily Wear",
            subtitle: "Effortless Everyday",
            image: bannerDaily,
            thumbnails: [prodPendant, prodWineEar, prodAnklet], // Swapped for premium Cat images
            bgColor: "bg-[#FDF0F0]"
        },
        {
            id: 2,
            title: "Office Wear",
            subtitle: "Professional Chic",
            image: bannerOffice,
            thumbnails: [prodEarring, prodPendant, prodRing],
            bgColor: "bg-[#F0F4FD]"
        },
        {
            id: 3,
            title: "Party Wear",
            subtitle: "Glamour & Shine",
            image: bannerParty,
            thumbnails: [prodWineEar, prodWineRing, prodAnklet],
            bgColor: "bg-[#FDFDF0]"
        },
        {
            id: 4,
            title: "Casual Wear",
            subtitle: "Relaxed Vibes",
            image: bannerCasual,
            thumbnails: [prodAnklet, prodBracelet, prodSis],
            bgColor: "bg-[#F0FDF4]"
        }
    ];

    return (
        <section className="pt-16 pb-2 md:pt-24 md:pb-4 bg-white relative">
            <div className="container mx-auto px-4 md:px-8">

                {/* Header */}
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-[#C9A24D] text-sm font-bold tracking-[0.2em] uppercase mb-2 block">Curated For You</span>
                        <h2 className="font-display text-4xl md:text-5xl text-[#722F37]">Style It Your Way</h2>
                    </div>

                    {/* Navigation Buttons for Desktop */}
                    <div className="hidden md:flex gap-3">
                        <button
                            onClick={() => scroll('left')}
                            className="p-3 rounded-full border border-[#722F37]/20 hover:bg-[#722F37] hover:text-white text-[#722F37] transition-all duration-300"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-3 rounded-full border border-[#722F37]/20 hover:bg-[#722F37] hover:text-white text-[#722F37] transition-all duration-300"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Carousel Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {collections.map((detail) => (
                        <div
                            key={detail.id}
                            className={`min-w-[90vw] md:min-w-[850px] h-[480px] rounded-[2.5rem] relative flex-shrink-0 snap-center group overflow-hidden cursor-pointer shadow-2xl hover:shadow-[0_20px_50px_rgba(114,47,55,0.3)] transition-all duration-500 isolate`}
                        >
                            {/* Full Card Banner Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={detail.image}
                                    alt={detail.title}
                                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                                />
                                {/* Gradient Overlay with Inner Shadow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent opacity-90 shadow-inner" />
                                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>

                            {/* Content Area - Left Aligned */}
                            <div className="absolute inset-0 flex flex-col justify-center items-start p-10 md:p-16 z-20 w-[70%]">
                                <span className="text-[#C9A24D] text-sm font-bold tracking-[0.2em] uppercase mb-3 drop-shadow-md bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/20">
                                    {detail.subtitle}
                                </span>
                                <h3 className="font-display text-5xl md:text-6xl text-white mb-6 leading-tight drop-shadow-lg">
                                    {detail.title}
                                </h3>
                                <div className="h-[2px] w-16 bg-white/50 group-hover:w-32 transition-all duration-500" />
                            </div>

                            {/* Floating Product Thumbnails - Bottom Right/Center */}
                            <div className="absolute bottom-8 right-8 flex gap-4 z-30">
                                {detail.thumbnails.map((thumb, idx) => (
                                    <div
                                        key={idx}
                                        className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl shadow-[0_10px_40px_rgb(0,0,0,0.2)] flex items-center justify-center transform hover:-translate-y-3 transition-transform duration-500 hover:scale-105 border border-gray-100 overflow-hidden"
                                    >
                                        <img src={thumb} alt="Product" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default StyleItYourWay;
