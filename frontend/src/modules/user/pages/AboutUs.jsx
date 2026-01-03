import React from 'react';
import { Truck, ThumbsUp, Lock, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutUs = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-white min-h-screen text-black font-body pb-20 selection:bg-[#B7A0BA] selection:text-white">
            {/* Back Button */}
            <div className="container mx-auto px-4 pt-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-black hover:text-[#B7A0BA] transition-all group font-bold uppercase tracking-widest text-[10px]"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back
                </button>
            </div>
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-12 md:py-20">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full lg:w-1/2 space-y-6 flex flex-col items-start text-left"
                    >
                        <span className="text-[#B7A0BA] text-xs font-bold uppercase tracking-[0.2em]">Our Story</span>
                        <h1 className="text-4xl md:text-6xl font-display text-black leading-tight">
                            Crafting Elegance, <br />
                            <span className="italic font-serif text-[#B7A0BA]">Adorning Souls.</span>
                        </h1>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg font-serif">
                            Welcome to <strong>Sands Ornaments</strong>, where modern artistry meets timeless tradition. We are more than just a jewellery brand; we are curators of silver masterpieces designed to celebrate your unique radiance.
                        </p>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg font-serif">
                            Our journey began with a passion for bringing high-quality, handcrafted 925 Sterling Silver pieces to the contemporary woman. Every necklace, ring, and bracelet in our collection tells a story of skilled craftsmanship and meticulous attention to detail. We believe that luxury should be an everyday experience.
                        </p>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md font-serif border-l-2 border-[#EBD3EC] pl-4">
                            "At Sands Ornaments, we are committed to sustainability and ethical sourcing, ensuring that beauty does not come at a cost to our planet."
                        </p>
                    </motion.div>

                    {/* Right: Collage Image - Redesigned to match new theme */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="w-full lg:w-1/2 relative h-[400px] md:h-[500px]"
                    >
                        {/* Main Top Left Image - Landscape */}
                        <div className="absolute top-0 left-0 w-64 h-40 md:w-80 md:h-56 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-10 border border-white/50">
                            <img src="https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?auto=format&fit=crop&q=80&w=600" alt="Landscape Jewellery" className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" />
                        </div>

                        {/* Center Bottom Circle Image - Bracelet */}
                        <div className="absolute top-24 left-16 md:top-32 md:left-28 w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden shadow-2xl z-30 border-[6px] border-white">
                            <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600" alt="Silver Bracelet" className="w-full h-full object-cover" />
                        </div>

                        {/* Top Right Image - Wearing Necklace */}
                        <div className="absolute -top-4 right-4 md:-top-10 md:right-10 w-48 h-48 md:w-60 md:h-60 rounded-tr-[3rem] rounded-bl-[3rem] overflow-hidden shadow-xl z-20 border border-white/50">
                            <img src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=600" alt="Wearing Necklace" className="w-full h-full object-cover grayscale-[30%]" />
                        </div>

                        {/* Decorative Element */}
                        <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-24 h-24 border-2 border-[#EBD3EC] rounded-full z-0 opacity-60"></div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-center items-start gap-12 md:gap-24 text-center">
                        {/* Feature 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col items-center max-w-xs group"
                        >
                            <div className="w-16 h-16 rounded-full bg-white border border-[#EBD3EC] text-black flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#EBD3EC] transition-colors duration-300">
                                <Truck className="w-8 h-8 text-[#B7A0BA] group-hover:text-black transition-colors" />
                            </div>
                            <h3 className="font-display text-xl text-black mb-3">Free Shipping</h3>
                            <p className="text-gray-500 text-xs leading-relaxed font-serif">
                                Enjoy free and fast delivery on all orders above ₹2000. We ensure your precious pieces reach you safely and on time.
                            </p>
                        </motion.div>

                        {/* Feature 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col items-center max-w-xs group"
                        >
                            <div className="w-16 h-16 rounded-full bg-white border border-[#EBD3EC] text-black flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#EBD3EC] transition-colors duration-300">
                                <ThumbsUp className="w-8 h-8 text-[#B7A0BA] group-hover:text-black transition-colors" />
                            </div>
                            <h3 className="font-display text-xl text-black mb-3">Premium Quality</h3>
                            <p className="text-gray-500 text-xs leading-relaxed font-serif">
                                Crafted with 100% authentic 925 Sterling Silver. Each piece undergoes varying quality checks to ensure lasting shine.
                            </p>
                        </motion.div>

                        {/* Feature 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col items-center max-w-xs group"
                        >
                            <div className="w-16 h-16 rounded-full bg-white border border-[#EBD3EC] text-black flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#EBD3EC] transition-colors duration-300">
                                <Lock className="w-8 h-8 text-[#B7A0BA] group-hover:text-black transition-colors" />
                            </div>
                            <h3 className="font-display text-xl text-black mb-3">100% Secure Checkout</h3>
                            <p className="text-gray-500 text-xs leading-relaxed font-serif">
                                Shop with confidence using our encrypted payment gateways. Your privacy is our top priority.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Bottom Instagram Section Peek */}
            <section className="container mx-auto px-4 pt-16">
                <div className="text-center mb-10">
                    <span className="text-[#B7A0BA] text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">Social Media</span>
                    <h2 className="font-display text-3xl text-black">Follow Our Instagram</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-70 hover:opacity-100 transition-opacity duration-500">
                    <div className="h-64 bg-gray-100 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0" alt="Insta 1" />
                    </div>
                    <div className="h-64 bg-gray-100 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0" alt="Insta 2" />
                    </div>
                    <div className="h-64 bg-gray-100 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0" alt="Insta 3" />
                    </div>
                    <div className="h-64 bg-gray-100 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0" alt="Insta 4" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
