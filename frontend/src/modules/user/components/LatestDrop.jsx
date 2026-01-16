import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

// Import images
import latestRing from '../assets/latest_drop_ring.png';
import latestNecklace from '../assets/latest_drop_necklace.png';
import latestEarrings from '../assets/latest_drop_earrings.png';
import latestBracelet from '../assets/latest_drop_bracelet.png';

const latestItems = [
    { id: 1, name: "Midnight Silver Ring", price: "₹2,499", image: latestRing, path: "/product/midnight-ring" },
    { id: 2, name: "Lunar Pendant", price: "₹4,999", image: latestNecklace, path: "/product/lunar-pendant" },
    { id: 3, name: "Noir Drop Earrings", price: "₹3,299", image: latestEarrings, path: "/product/noir-earrings" },
    { id: 4, name: "Obsidian Chain", price: "₹5,999", image: latestBracelet, path: "/product/obsidian-chain" }
];

const LatestDrop = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-2 md:px-4">

                {/* Header */}
                {/* Header - Centered Layout */}
                <div className="relative flex flex-col md:block items-center justify-center mb-12">
                    <div className="flex flex-col items-center justify-center text-center md:w-full">
                        <span className="text-[#722F37] font-display tracking-[0.2em] font-bold text-sm uppercase mb-2 block">
                            Fresh Arrivals
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl text-[#1F1F1F]">
                            Latest Drop
                        </h2>
                    </div>

                    <div className="mt-6 md:mt-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2">
                        <Link
                            to="/shop?sort=newest"
                            className="group flex items-center gap-2 text-[#1F1F1F] font-medium border-b border-black pb-1 hover:text-[#722F37] hover:border-[#722F37] transition-all"
                        >
                            Explore Collection
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {latestItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <Link to={item.path}>
                                {/* Card Styled Container - Dark Wine Theme from User Reference */}
                                <div className="bg-[#58252F] rounded-[1.5rem] border border-[#6D303C] shadow-[0_5px_15px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_40px_rgba(88,37,47,0.4)] transition-all duration-500 hover:-translate-y-1 group overflow-hidden">

                                    {/* Image Container - Full Width */}
                                    <div className="relative overflow-hidden aspect-[4/3] bg-[#3A181F]">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                        />

                                        {/* Overlay on Hover */}
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-300"></div>


                                    </div>

                                    {/* Info - Added padding since parent padding is removed */}
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-1 gap-2">
                                            <h3 className="font-display text-base md:text-lg text-white group-hover:text-[#C9A24D] transition-colors line-clamp-1 tracking-wide">
                                                {item.name}
                                            </h3>
                                            <div className="flex text-[#C9A24D] shrink-0 pt-1">
                                                <Star className="w-3 h-3 fill-current" />
                                                <Star className="w-3 h-3 fill-current" />
                                                <Star className="w-3 h-3 fill-current" />
                                                <Star className="w-3 h-3 fill-current" />
                                                <Star className="w-3 h-3 fill-current" />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="font-serif text-lg text-gray-300 leading-none tracking-wide">{item.price}</p>
                                            <span className="text-[10px] text-white/40 uppercase tracking-widest hidden group-hover:block transition-all duration-300">View</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default LatestDrop;
