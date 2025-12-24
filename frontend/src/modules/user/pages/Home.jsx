import React, { useState } from 'react';
import { ArrowRight, Play, ShoppingBag, ChevronDown, MoveRight, Plus, Minus } from 'lucide-react';
import { banners, categories, products } from '../assets/data';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    const featuredProducts = products.slice(0, 3);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [activeFaq, setActiveFaq] = useState(null);

    const newArrivals = [
        {
            id: 1,
            name: "Crystal Drop Earrings",
            price: "₹1,200",
            image1: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
            image2: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 2,
            name: "Boho Silver Ring",
            price: "₹850",
            image1: "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&w=600&q=80",
            image2: "https://images.unsplash.com/photo-1605100804763-ebea466dd263?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 3,
            name: "Layered Silver Chain",
            price: "₹1,500",
            image1: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=600&q=80",
            image2: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=600&q=80"
        }
    ];

    const faqs = [
        {
            question: "Is your jewellery made of real silver?",
            answer: "Yes, all our jewellery is crafted from high-quality 925 Sterling Silver. Each piece comes with a hallmark stamp of authenticity so you can shop with confidence."
        },
        {
            question: "How do I take care of my silver jewellery?",
            answer: "To keep your silver shining, store it in the provided zip-lock bag when not in use. Avoid direct contact with perfumes, lotions, and harsh chemicals. You can gently clean it with a soft cloth."
        },
        {
            question: "Do you offer a warranty on the plating?",
            answer: "Absolutely! We offer a 6-month warranty on the gold and rose gold plating of our silver jewellery. If you face any issues, just reach out to us."
        },
        {
            question: "What is your return and exchange policy?",
            answer: "We offer a hassle-free 7-day return and exchange policy. If you are not completely satisfied with your purchase, you can return it in its original condition within 7 days."
        }
    ];

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    // Animation Variants
    const fadeUp = {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const slideInLeft = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const slideInRight = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    // Monthly Spotlight Feature: images change based on current month
    const monthIndex = new Date().getMonth();
    const spotlightImages = [
        { // Set 1 (Jan, May, Sep)
            main: "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&q=80&w=400", // Silver Solitaire
            hover: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&q=80&w=400"  // Silver Minimal Chain (Confirmed)
        },
        { // Set 2 (Feb, Jun, Oct)
            main: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=400", // Silver Cuff
            hover: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=400"  // Silver Chain Bracelet (Confirmed)
        },
        { // Set 3 (Mar, Jul, Nov)
            main: "https://images.unsplash.com/photo-1602752250015-6cb3442359ef?auto=format&fit=crop&q=80&w=400", // Silver Pendant
            hover: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&q=80&w=400"  // Silver Bangle (Confirmed)
        },
        { // Set 4 (Apr, Aug, Dec)
            main: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?auto=format&fit=crop&q=80&w=400", // Silver Jhumkas
            hover: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=400"  // Silver Rings Collection (Hero Image - 100% Works)
        }
    ];

    return (
        <div className="bg-[#FDFBF7] font-body text-[#5D4037] relative selection:bg-[#8D6E63] selection:text-white">

            {/* Hero Section - Exact Viewport Fit (Micro-adjusted) */}
            <section className="relative">
                <div className="relative h-[calc(100vh-153px)] overflow-hidden shadow-2xl group">
                    <img
                        src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=1600"
                        alt="Luxury Collection"
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[2000ms]"
                    />
                    {/* Enhanced Gradient Overlay for Text Clarity */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2c1d18]/80 via-[#5D4037]/50 to-transparent flex items-center">
                        <div className="container mx-auto px-8 md:px-16">
                            <div className="max-w-xl text-white space-y-8">
                                {/* Soft Aesthetic Badge */}
                                <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.2em] bg-white/10 backdrop-blur-md w-fit px-6 py-2 rounded-full border border-white/20 shadow-lg animate-fade-in-up opacity-0" style={{ animationFillMode: 'forwards' }}>
                                    <span className="w-2 h-2 rounded-full bg-[#EFEBE9] animate-pulse"></span>
                                    <span className="text-[#EFEBE9] font-medium">New Collection 2024</span>
                                </div>

                                {/* Pyaara Typography */}
                                <h1 className="text-5xl md:text-7xl font-display font-medium leading-tight drop-shadow-md animate-fade-in-up delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
                                    Adorn Your <br />
                                    <span className="font-serif italic font-light text-[#EFEBE9]">Soul with Silver</span>
                                </h1>

                                <p className="text-[#EFEBE9] text-lg md:text-xl font-light max-w-md leading-relaxed drop-shadow-sm animate-fade-in-up delay-400 opacity-0" style={{ animationFillMode: 'forwards' }}>
                                    Discover handcrafted pieces that blend traditional artistry with modern grace. Perfect for the woman who shines from within.
                                </p>

                                {/* Interactive Buttons */}
                                <div className="flex items-center space-x-6 pt-6 animate-scale-in delay-600 opacity-0" style={{ animationFillMode: 'forwards' }}>
                                    <Link to="/shop" className="bg-white text-[#5D4037] px-10 py-4 rounded-full font-medium hover:bg-[#FDFBF7] transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 group/btn">
                                        <span>Shop Now</span>
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Card Overlay */}
                    <div
                        className="hidden md:block absolute bottom-12 right-12 bg-white/95 backdrop-blur-xl p-8 rounded-3xl max-w-xs shadow-[0_20px_50px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom-10 duration-1000 delay-300"
                        onMouseEnter={(e) => e.nativeEvent.stopImmediatePropagation()}
                        onMouseLeave={(e) => e.nativeEvent.stopImmediatePropagation()}
                    >
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="flex -space-x-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-300 overflow-hidden relative">
                                        <img src={`https://randomuser.me/api/portraits/women/${i + 20}.jpg`} alt="User" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                                <div className="w-12 h-12 rounded-full border-2 border-white bg-[#5D4037] text-white flex items-center justify-center text-sm font-medium">+</div>
                            </div>
                            <div>
                                <h4 className="font-display font-bold text-xl text-[#5D4037]">12k+</h4>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Happy Customers</p>
                            </div>
                        </div>
                        <div className="relative h-40 rounded-2xl overflow-hidden mb-4 group/card cursor-pointer">
                            {/* Images change monthly based on logic below - currently showing Set {(new Date().getMonth() % 4) + 1} */}
                            <img
                                src={spotlightImages[monthIndex % 4].main}
                                alt="Monthly Highlight"
                                className="absolute inset-0 w-full h-full object-cover transform duration-700 opacity-100 group-hover/card:opacity-0"
                            />
                            <img
                                src={spotlightImages[monthIndex % 4].hover}
                                alt="Highlight Detail"
                                className="absolute inset-0 w-full h-full object-cover transform duration-700 opacity-0 group-hover/card:opacity-100"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover/card:bg-transparent transition-colors duration-500" />
                        </div>
                        <h5 className="font-display font-semibold text-lg text-[#5D4037]">Exquisite Details</h5>
                        <Link to="/shop" className="text-xs font-bold text-[#8D6E63] uppercase tracking-widest mt-2 inline-flex items-center hover:text-[#5D4037] group">
                            Explore Collection <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Choose The Type / Categories - Redesigned as Editorial Grid */}
            {/* Bohemain Bloom Style Section */}
            <section className="py-10 bg-[#FFF8F0]">
                <div className="container mx-auto px-4">
                    {/* Header with Sunburst & Script */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={fadeUp}
                        className="text-center mb-16 space-y-4"
                    >
                        <div className="flex justify-center mb-6">
                            {/* Simple Sunburst SVG */}
                            <svg className="w-12 h-12 text-[#D7CCC8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="4" />
                                <path d="M12 2v2" /><path d="M12 20v2" /><path d="M4.93 4.93l1.41 1.41" /><path d="M17.66 17.66l1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="M6.34 17.66l-1.41 1.41" /><path d="M19.07 4.93l-1.41 1.41" />
                            </svg>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif italic text-[#5D4037]">Curated Collections</h2>
                        <p className="text-[#8D6E63] italic max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                            Step into a world of organic elegance and modern minimalism as you explore our exclusive jewellery pieces.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                        className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12"
                    >
                        {categories.slice(0, 5).map((cat, idx) => (
                            <motion.div
                                key={cat.id}
                                variants={fadeUp}
                                className="group flex flex-col items-center"
                            >
                                {/* Arch Image Container */}
                                <Link to={`/category/${cat.path}`} className="relative w-full aspect-[3/4] rounded-t-[10rem] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 bg-white">
                                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />

                                    {/* Solid Box Label - Bottom of Arch */}
                                    <div className="absolute bottom-0 left-0 w-full bg-[#5D4037] text-[#EFEBE9] py-3 px-2 text-center">
                                        <h3 className="font-serif text-lg tracking-wide">{cat.name}</h3>
                                    </div>
                                </Link>

                                {/* Bottom Link */}
                                <Link to={`/category/${cat.path}`} className="mt-4 text-[#5D4037] text-xs font-bold uppercase tracking-widest border-b border-transparent group-hover:border-[#5D4037] transition-all flex items-center gap-2">
                                    {cat.name} <ArrowRight className="w-3 h-3" />
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Trendy Products / Editorial Split Section - Staggered Dark Cards */}
            <section className="py-10 bg-[#FFF8F0] overflow-hidden">
                <div className="container mx-auto px-4">

                    {/* Section Header */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={fadeUp}
                        className="text-center mb-16 relative"
                    >
                        <span className="text-[#8D6E63] text-sm font-bold uppercase tracking-[0.3em] pl-1">MOST POPULAR</span>
                        <h2 className="text-4xl md:text-5xl font-display text-[#5D4037] mt-3 mb-4 uppercase">TRENDING NOW</h2>
                        <div className="flex justify-center items-center gap-2 text-[#D7CCC8]/60">
                            <div className="h-[1px] w-12 bg-current"></div>
                            <div className="w-2 h-2 rounded-full bg-current"></div>
                            <div className="h-[1px] w-12 bg-current"></div>
                        </div>
                    </motion.div>

                    {/* Card 1: Timeless Elegance - Overlapping Editorial Layout (Dark Left) */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={slideInLeft}
                        className="relative w-full mb-16 md:mb-20"
                    >
                        {/* 1. Background Split Layer */}
                        <div className="absolute inset-0 flex pointer-events-none">
                            <div className="w-[35%] bg-[#3E2723] h-full rounded-l-[1.5rem] relative overflow-hidden">
                            </div>
                            <div className="w-[65%] bg-white h-full rounded-r-[2rem] border border-[#EFEBE9] border-l-0 shadow-sm"></div>
                        </div>

                        {/* 2. Content Layer */}
                        <div className="relative z-10 flex flex-col md:flex-row items-center p-6 md:p-12 gap-8 md:gap-16">

                            {/* Overlapping Image - Positioned to bridge the background split */}
                            <div className="w-full md:w-[40%] flex-shrink-0">
                                <div className="relative aspect-square md:aspect-[4/4] h-[300px] md:h-[350px] w-full rounded-lg overflow-hidden shadow-xl ml-auto md:mr-[-2rem] border-[4px] border-white">
                                    <img
                                        src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80"
                                        alt="Timeless Elegance"
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </div>

                            {/* Text Content - Sitting in the Light Area */}
                            <div className="w-full md:w-[50%] md:pl-12 pt-4 md:pt-0">
                                <div className="border-l-[3px] border-[#D7CCC8] pl-6 md:pl-8 space-y-4">
                                    <span className="text-[#8D6E63] text-xs font-bold uppercase tracking-[0.2em] block mb-2">Heritage Collection</span>
                                    <h3 className="text-3xl md:text-5xl font-display text-[#3E2723] leading-tight">
                                        Timeless <span className="font-serif italic text-[#8D6E63]">Elegance</span>
                                    </h3>
                                    <p className="text-[#5D4037]/80 font-serif leading-relaxed text-sm md:text-base max-w-md">
                                        No longer search for "authentic silver jewelry". You've found it. We serve the modern woman reflecting our belief that true style transcends trends.
                                    </p>
                                    <p className="text-[#5D4037]/80 font-serif leading-relaxed text-sm md:text-base max-w-md pt-2">
                                        Our journey is fueled by a lifelong passion and dedicated to enhancing the natural glow of every individual who wears our pieces.
                                    </p>
                                    <div className="pt-6">
                                        <Link to="/shop" className="group inline-flex items-center gap-2 text-[#3E2723] font-bold uppercase tracking-widest text-xs hover:text-[#8D6E63] transition-colors">
                                            Discover More
                                            <span className="bg-[#3E2723] text-white rounded-full w-6 h-6 flex items-center justify-center group-hover:bg-[#8D6E63] transition-colors">
                                                <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: Empowering Style - Overlapping Editorial Layout (Dark Right - Mirrored) */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={slideInRight}
                        className="relative w-full mb-8"
                    >
                        {/* 1. Background Split Layer */}
                        <div className="absolute inset-0 flex pointer-events-none">
                            <div className="w-[65%] bg-white h-full rounded-l-[2rem] border border-[#EFEBE9] border-r-0 shadow-sm"></div>
                            <div className="w-[35%] bg-[#3E2723] h-full rounded-r-[1.5rem] relative overflow-hidden">
                            </div>
                        </div>

                        {/* 2. Content Layer */}
                        <div className="relative z-10 flex flex-col md:flex-row items-center p-4 md:p-8 gap-6 md:gap-12">

                            {/* Text Content - Left Side */}
                            <div className="w-full md:w-[50%] md:pr-12 pt-4 md:pt-0 order-2 md:order-1 text-right">
                                <div className="border-r-[3px] border-[#D7CCC8] pr-6 md:pr-8 space-y-4 flex flex-col items-end">
                                    <span className="text-[#8D6E63] text-xs font-bold uppercase tracking-[0.2em] block mb-2">Modern Statement</span>
                                    <h3 className="text-3xl md:text-5xl font-display text-[#3E2723] leading-tight">
                                        Empowering <span className="font-serif italic text-[#8D6E63]">Style</span>
                                    </h3>
                                    <p className="text-[#5D4037]/80 font-serif leading-relaxed text-sm md:text-base max-w-md">
                                        We know the power of simple, holistic design and the impact of a moment dedicated to only you.
                                    </p>
                                    <p className="text-[#5D4037]/80 font-serif leading-relaxed text-sm md:text-base max-w-md pt-2">
                                        From bold statements to subtle whispers, find pieces that resonate with your unique journey and celebrate your individuality.
                                    </p>
                                    <div className="pt-6">
                                        <Link to="/shop" className="group inline-flex items-center gap-2 text-[#3E2723] font-bold uppercase tracking-widest text-xs hover:text-[#8D6E63] transition-colors flex-row-reverse">
                                            Explore Collection
                                            <span className="bg-[#3E2723] text-white rounded-full w-6 h-6 flex items-center justify-center group-hover:bg-[#8D6E63] transition-colors">
                                                <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Overlapping Image - Right Side */}
                            <div className="w-full md:w-[40%] flex-shrink-0 order-1 md:order-2">
                                <div className="relative aspect-square md:aspect-[4/4] h-[300px] md:h-[350px] w-full rounded-lg overflow-hidden shadow-xl mr-auto md:ml-[-2rem] border-[4px] border-white">
                                    <img
                                        src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80"
                                        alt="Empowering Style"
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </div>

                        </div>
                    </motion.div>

                </div>
            </section>

            {/* New Arrivals Collection Section */}
            <section className="py-10 bg-[#FAF7F5] overflow-hidden border-y border-[#EFEBE9] relative">
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D7CCC8]/10 rounded-full blur-3xl -z-0"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left Text Content */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={fadeUp}
                            className="w-full lg:w-1/3 text-center lg:text-left space-y-6"
                        >
                            <span className="text-[#8D6E63] text-xs font-bold uppercase tracking-[0.2em]">Just Arrived</span>
                            <h2 className="text-4xl md:text-5xl font-display text-[#5D4037] leading-tight">
                                Our New <br />
                                <span className="italic font-serif text-[#8D6E63]">Collection</span>
                            </h2>
                            <p className="text-[#8D6E63]/80 font-serif leading-relaxed text-sm md:text-base">
                                Be the first to wear our latest handcrafted silver masterpieces. Designed for elegance, crafted for you.
                            </p>
                            <Link
                                to="/products"
                                className="inline-block px-8 py-3 bg-[#5D4037] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3E2723] transition-all transform hover:scale-105 shadow-md mt-4"
                            >
                                See More
                            </Link>
                        </motion.div>

                        {/* Right Product Grid */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={staggerContainer}
                            className="w-full lg:w-2/3"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {newArrivals.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        variants={fadeUp}
                                        className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                                    >
                                        {/* Image Container with Hover Swap */}
                                        <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                                            <img
                                                src={product.image1}
                                                alt={product.name}
                                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0"
                                            />
                                            <img
                                                src={product.image2}
                                                alt={`${product.name} Detail`}
                                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100 scale-110"
                                            />

                                            {/* Floating Icon */}
                                            <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[#5D4037] shadow-sm translate-y-[-150%] group-hover:translate-y-0 transition-transform duration-300">
                                                <ShoppingBag className="w-4 h-4" />
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="text-center">
                                            <h3 className="font-display text-[#5D4037] text-lg mb-1">{product.name}</h3>
                                            <p className="font-serif text-[#8D6E63] text-sm italic mb-3">{product.price}</p>
                                            <Link
                                                to={`/product/${product.id}`}
                                                className="text-[10px] font-bold uppercase tracking-widest text-[#5D4037] border-b border-[#5D4037]/30 pb-1 hover:text-[#8D6E63] hover:border-[#8D6E63] transition-colors"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section - Redesigned Editorial Style */}
            <section className="py-10 bg-[#FFF8F0]">
                <div className="container mx-auto px-4">
                    {/* Top Header */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={fadeUp}
                        className="text-center mb-16 max-w-2xl mx-auto"
                    >
                        <span className="text-[#8D6E63] text-sm font-bold uppercase tracking-[0.2em]">Support</span>
                        <h2 className="text-3xl md:text-4xl font-display text-[#5D4037] mt-3">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-[#8D6E63] font-serif text-sm md:text-base leading-relaxed mt-3">
                            Everything you need to know about our silver jewellery, care instructions, and policies.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                        {/* Left Side: Minimal Accordion - FAQ List */}
                        <div className="lg:col-span-6">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.1 }}
                                    variants={fadeUp}
                                    transition={{ delay: index * 0.1 }}
                                    className="border-b border-[#D7CCC8]/60 last:border-0 relative"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-start justify-between py-4 text-left group"
                                    >
                                        <span className={`font-serif text-xl md:text-2xl transition-colors duration-300 ${activeFaq === index ? 'text-[#8D6E63] italic' : 'text-[#5D4037] group-hover:text-[#8D6E63]'}`}>
                                            {faq.question}
                                        </span>
                                        <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeFaq === index ? 'bg-[#5D4037] text-white rotate-180' : 'bg-[#EFEBE9] text-[#5D4037]'}`}>
                                            <ChevronDown className="w-5 h-5" />
                                        </div>
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-500 ease-in-out ${activeFaq === index ? 'max-h-48 opacity-100 mb-4' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <p className="text-gray-500 leading-relaxed font-body text-base md:text-lg pr-8">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Right Side: Ask a Question Form */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={fadeUp}
                            className="lg:col-span-6 space-y-8"
                        >
                            <div className="p-8 bg-white rounded-[2rem] shadow-xl shadow-[#8D6E63]/10 border border-[#EFEBE9] w-full sticky top-8">
                                <h4 className="font-display text-2xl text-[#5D4037] mb-2">Ask a Question</h4>
                                <p className="text-sm text-gray-500 mb-6">Can't find what you're looking for? We're here to help.</p>

                                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full bg-[#FAFAFA] border-b border-[#E0E0E0] p-3 text-[#5D4037] placeholder-[#BCAAA4] focus:outline-none focus:border-[#8D6E63] transition-colors font-serif"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            className="w-full bg-[#FAFAFA] border-b border-[#E0E0E0] p-3 text-[#5D4037] placeholder-[#BCAAA4] focus:outline-none focus:border-[#8D6E63] transition-colors font-serif"
                                        />
                                    </div>
                                    <div>
                                        <textarea
                                            placeholder="Your Question..."
                                            rows="3"
                                            className="w-full bg-[#FAFAFA] border-b border-[#E0E0E0] p-3 text-[#5D4037] placeholder-[#BCAAA4] focus:outline-none focus:border-[#8D6E63] transition-colors font-serif resize-none"
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="px-8 py-3 bg-[#5D4037] text-white rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[#3E2723] transition-colors w-full mt-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-300">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


        </div >
    );
};

export default Home;
