import React from 'react';
import { motion } from 'framer-motion';
import { Gem, RotateCcw, Truck, FileText, X } from 'lucide-react'; // Using Lucide icons

const BrandPromises = () => {
    const promises = [
        {
            id: 1,
            icon: Gem,
            title: "Pure 925 Silver",
            desc: "Certified Authenticity"
        },
        {
            id: 2,
            icon: RotateCcw,
            title: "30-Day Easy Return",
            desc: "Hassle-free Refund"
        },
        {
            id: 3,
            icon: Truck,
            title: "Free Delivery",
            desc: "On all orders above ₹999"
        },
        {
            id: 4,
            icon: FileText,
            title: "T&C Apply",
            desc: "Secure Shopping"
        }
    ];

    return (
        <section className="pt-16 pb-16 md:pb-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-2 md:px-4">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-[#C9A24D] text-sm font-bold tracking-[0.2em] uppercase mb-2 block">Our Commitments</span>
                    <h2 className="font-display text-4xl md:text-5xl text-[#4A1015]">Why Choose Us</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-8 pt-10">
                    {promises.map((item, index) => (
                        <div
                            key={item.id}
                            className="relative group flex flex-col items-center"
                        >
                            {/* Diamond Box */}
                            <div className="w-40 h-40 md:w-52 md:h-52 bg-[#4A1015] rotate-45 rounded-[2rem] flex items-center justify-center shadow-[0_20px_40px_rgba(74,16,21,0.25)] relative z-10 border-4 border-white cursor-pointer transition-colors duration-300 hover:bg-[#5C242B]">
                                {/* Content (Rotated back for upright position) */}
                                <div className="-rotate-45 flex flex-col items-center justify-center text-white p-4 text-center">
                                    <item.icon strokeWidth={1.2} className="w-8 h-8 md:w-10 md:h-10 mb-3 text-[#EBCDD0]" />
                                    <h3 className="font-display text-sm md:text-[15px] font-bold text-white mb-1 leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-[#EBCDD0]/70 text-[9px] md:text-[10px] tracking-widest uppercase font-medium leading-relaxed max-w-[120px]">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Glow effect */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#4A1015]/10 blur-3xl rounded-full -z-10 group-hover:bg-[#4A1015]/20 transition-all duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandPromises;
