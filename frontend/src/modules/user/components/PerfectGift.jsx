import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Import images
import giftMother from '../assets/gift_mother_silver.png';
import giftFriends from '../assets/gift_friends_silver.png';
import giftWife from '../assets/gift_wife_silver.png';
import giftSister from '../assets/gift_sister_silver.png';

const recipients = [
    { id: 'mother', name: "Mother", image: giftMother, path: "/shop?recipient=mother" },
    { id: 'friends', name: "Friends", image: giftFriends, path: "/shop?recipient=friends" },
    { id: 'wife', name: "Wife", image: giftWife, path: "/shop?recipient=wife" },
    { id: 'sister', name: "Sister", image: giftSister, path: "/shop?recipient=sister" }
];

const PerfectGift = () => {
    return (
        <section className="py-8 md:py-12 bg-gradient-to-b from-[#58252F] to-[#2F0A0F] text-white"> {/* Adjusted symmetric padding */}
            <div className="container mx-auto px-2 md:px-4">
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-display font-medium text-white mb-4"
                    >
                        Find the Perfect Gift For
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 96 }} // 24 * 4 = 96px
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-1 bg-[#C9A24D] mx-auto rounded-full"
                    ></motion.div>
                </div>

                {/* V-Shape Row Layout */}
                <div className="flex flex-wrap md:flex-nowrap justify-center gap-6 md:gap-10 px-4 mb-24">
                    {recipients.map((item, index) => {
                        // V-Shape Logic:
                        // 0 & 5: Top (No margin)
                        // 1 & 4: Middle (mt-12)
                        // 2 & 3: Bottom (mt-24)
                        const marginTopClass =
                            (index === 0 || index === 3) ? 'mt-0' :
                                'mt-24'; // Simplified deep V for 4 items

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className={`w-[42%] md:w-56 lg:w-72 ${marginTopClass}`}
                            >
                                <Link
                                    to={item.path}
                                    className="group relative rounded-[2rem] overflow-hidden w-full h-full aspect-[3/4] shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_rgba(114,47,55,0.3)] transition-all duration-700 block border border-black/5 hover:border-[#C9A24D]"
                                >
                                    {/* Image */}
                                    <img
                                        src={item.image}
                                        alt={`Gift for ${item.name}`}
                                        className="w-full h-full object-cover transform duration-1000 group-hover:scale-110"
                                    />

                                    {/* Gradients */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/70 opacity-70 group-hover:opacity-50 transition-opacity duration-700" />
                                    <div className="absolute inset-0 bg-[#722F37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />

                                    {/* Content */}
                                    <div className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center px-4">
                                        <div className="text-center transform transition-all duration-500 group-hover:-translate-y-3">
                                            <span className="font-display font-bold text-white text-base md:text-lg tracking-[0.2em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                                                For {item.name}
                                            </span>
                                            <div className="h-[1.5px] w-0 group-hover:w-full bg-[#C9A24D] mx-auto mt-2 transition-all duration-700 rounded-full shadow-[0_0_15px_rgba(201,162,77,0.8)]"></div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PerfectGift;
