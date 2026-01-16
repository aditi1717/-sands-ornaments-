import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Import images
import catPendant from '../assets/cat_pendant_wine.png';
import catRing from '../assets/cat_ring_wine.png';
import catEarrings from '../assets/cat_earrings_wine.png';
import catBracelet from '../assets/cat_bracelet_wine.png';
import catAnklet from '../assets/cat_anklet_wine.png';
import catChain from '../assets/cat_chain_wine.png';

const categories = [
    { id: 'pendants', name: "Pendants", image: catPendant, path: "/category/pendants" },
    { id: 'rings', name: "Rings", image: catRing, path: "/category/rings" },
    { id: 'earrings', name: "Earrings", image: catEarrings, path: "/category/earrings" },
    { id: 'bracelets', name: "Bracelets", image: catBracelet, path: "/category/bracelets" },
    { id: 'anklets', name: "Anklets", image: catAnklet, path: "/category/anklets" },
    { id: 'chains', name: "Chains", image: catChain, path: "/category/chains" }
];

const CategoryShowcase = () => {
    return (
        <section className="py-4 bg-white">
            <div className="container mx-auto px-2 md:px-4">
                <div className="flex flex-nowrap overflow-x-auto justify-start gap-4 md:gap-8 p-8 md:p-10 pb-12 scrollbar-hide">
                    {categories.map((cat, index) => (
                        <Link to={cat.path} key={cat.id} className="group flex flex-col items-center flex-shrink-0">
                            {/* Card with Wine Background */}
                            <div className="relative w-36 h-36 md:w-52 md:h-52 bg-[#722F37] rounded-[1.5rem] md:rounded-[2rem] shadow-md border-2 border-[#C9A24D] overflow-hidden transition-transform duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl">

                                {/* Top Tag - Gold/Beige */}
                                <div className="absolute top-0 left-0 right-0 bg-[#F5E6D3] py-0.5 md:py-1 text-center font-bold text-[8px] md:text-xs text-[#722F37] tracking-wider z-10">
                                    UPTO 15% OFF
                                </div>

                                {/* Image */}
                                <div className="absolute inset-0 pt-0 flex items-center justify-center">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Category Name Below */}
                            <div className="mt-2 md:mt-3 flex items-center justify-center gap-1 md:gap-2">
                                <span className="font-display font-medium text-xs md:text-lg text-black group-hover:text-[#722F37] transition-colors">
                                    {cat.name}
                                </span>
                                <ArrowRight className="w-3 h-3 md:w-5 md:h-5 text-[#722F37] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryShowcase;
