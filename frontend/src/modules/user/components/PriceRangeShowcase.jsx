import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import images
import price999 from '../assets/price_under_999.png';
import price1999 from '../assets/price_under_1999.png';
import price2999 from '../assets/price_under_2999.png';
import price3999 from '../assets/price_under_3999.png';

const priceRanges = [
    { id: 'under-999', label: "Under ₹999", image: price999, path: "/shop?price_max=999" },
    { id: 'under-1999', label: "Under ₹1999", image: price1999, path: "/shop?price_max=1999" },
    { id: 'under-2999', label: "Under ₹2999", image: price2999, path: "/shop?price_max=2999" },
    { id: 'under-3999', label: "Under ₹3999", image: price3999, path: "/shop?price_max=3999" }
];

const PriceRangeShowcase = () => {
    return (
        <section className="pt-6 pb-16 md:pt-10 md:pb-24 bg-white">
            <div className="container mx-auto px-2 md:px-4">
                <div className="text-center mb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-display font-medium text-black mb-4"
                    >
                        Luxury in Range
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-1 bg-[#C9A24D] mx-auto rounded-full"
                    ></motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {priceRanges.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link
                                to={item.path}
                                className="group relative block w-full aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                            >
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 z-10" />

                                <img
                                    src={item.image}
                                    alt={item.label}
                                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                />

                                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
                                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white text-center drop-shadow-md">
                                        <span className="text-sm md:text-base font-light block mb-1 opacity-90">Shop</span>
                                        {item.label}
                                    </h3>
                                    <div className="h-0.5 w-0 group-hover:w-1/2 bg-[#C9A24D] mx-auto mt-2 transition-all duration-500 rounded-full" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PriceRangeShowcase;
