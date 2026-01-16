import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';

// Import images
import newEarrings from '../assets/new_launch_earrings.png';
import newChains from '../assets/new_launch_chains.png';
import newStuds from '../assets/new_launch_studs.png';
import newBracelets from '../assets/new_launch_bracelets.png';
import newAnklets from '../assets/new_launch_anklets.png';

const newLaunches = [
    { id: 'earrings', name: "Earrings", image: newEarrings, path: "/category/earrings" },
    { id: 'chains', name: "Chains", image: newChains, path: "/category/chains" },
    { id: 'studs', name: "Studs", image: newStuds, path: "/category/studs" },
    { id: 'bracelets', name: "Bracelets", image: newBracelets, path: "/category/bracelets" },
    { id: 'anklets', name: "Anklets", image: newAnklets, path: "/category/anklets" }
];

const NewLaunchSection = () => {
    return (
        <section className="py-16 md:py-24 bg-[#FFF0F0] relative overflow-hidden">

            <div className="container mx-auto px-2 md:px-4 relative z-10">

                {/* Header Area */}
                {/* Header Area - Center Heading, Right Button */}
                <div className="relative flex flex-col md:block items-center justify-center mb-10">

                    {/* Centered Content */}
                    <div className="flex flex-col items-center justify-center gap-3 text-center md:w-full">
                        {/* Simple Wine Badge */}
                        <div className="inline-block bg-[#722F37] text-white px-4 py-1 font-display tracking-wider text-xs uppercase rounded-sm shadow-sm opacity-90">
                            New Launch
                        </div>

                        {/* Classy & Sweet Heading - Straight */}
                        <h3 className="font-display text-[#1F1F1F] text-3xl md:text-4xl font-medium tracking-wider uppercase">
                            Limited Edition
                        </h3>
                    </div>

                    {/* Right Aligned Button (Absolute on Desktop) */}
                    <div className="mt-6 md:mt-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2">
                        <Link
                            to="/shop?new=true"
                            className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#722F37] transition-all shadow-md group border border-[#C9A24D]/30"
                        >
                            Explore Collection
                            <ChevronRight className="w-4 h-4 text-[#C9A24D] group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Cards Row */}
                <div className="flex flex-wrap md:flex-nowrap justify-center gap-6 md:gap-8">
                    {newLaunches.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="w-[45%] md:w-48 lg:w-56"
                        >
                            <Link to={item.path} className="group block text-center">
                                {/* Card Image Container */}
                                <div className="relative rounded-[2.5rem] overflow-hidden aspect-square mb-6 bg-white border-2 border-gray-100 shadow-[0_8px_0_#F3F4F6,0_15px_30px_rgba(0,0,0,0.1)] group-hover:shadow-[0_16px_0_#E5E7EB,0_30px_60px_rgba(0,0,0,0.15)] transform transition-all duration-300 ease-out group-hover:-translate-y-2">

                                    {/* 'New' Tag - Gold Background, Wine Text */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#C9A24D] text-[#722F37] text-[10px] md:text-xs font-bold px-3 py-1 rounded-b-lg shadow-sm z-20 flex items-center gap-1">
                                        <Sparkles className="w-2 md:w-3 h-2 md:h-3" /> New
                                    </div>

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transform duration-500 group-hover:scale-110"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300"></div>
                                </div>

                                {/* Label */}
                                <h4 className="font-display font-medium text-lg text-gray-800 group-hover:text-[#722F37] transition-colors">
                                    {item.name}
                                </h4>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default NewLaunchSection;
