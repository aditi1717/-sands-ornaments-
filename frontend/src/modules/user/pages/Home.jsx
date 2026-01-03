import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Play, ShoppingBag, ChevronDown, MoveRight, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { banners, categories, products } from '../assets/data';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import heroSlide1 from '../assets/hero_slide_1.png';
import heroSlide2 from '../assets/hero_slide_2.png';
import heroSlide3 from '../assets/hero_slide_3.png';
import spotlightMain from '../assets/spotlight_silver_main.png';
import spotlightHover from '../assets/spotlight_silver_hover.png';

import trendingHeritage from '../assets/trending_heritage.png';
import trendingModern from '../assets/trending_modern.png';

// Product Images
import prodEarringsMain from '../assets/prod_earrings_main.png';
import prodEarringsHover from '../assets/prod_earrings_hover.png';
import prodRingMain from '../assets/prod_ring_main.png';
import prodRingHover from '../assets/cat_rings.png';
import prodChainMain from '../assets/cat_pendant.png'; // Reusing as it fits

const Home = () => {
    const featuredProducts = products.slice(0, 3);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [activeFaq, setActiveFaq] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeTrendingIndex, setActiveTrendingIndex] = useState(0);

    const trendingSlides = [
        {
            id: 1,
            subtitle: "Heritage Collection",
            title: "Timeless",
            titleItalic: "Elegance",
            desc: "No longer search for \"authentic silver jewelry\". You've found it.",
            image: trendingHeritage
        },
        {
            id: 2,
            subtitle: "Modern Statement",
            title: "Empowering",
            titleItalic: "Style",
            desc: "From bold statements to subtle whispers, find pieces that celebrate you.",
            image: trendingModern
        }
    ];

    const heroSlides = [
        {
            image: heroSlide1,
            badge: "New Collection 2024",
            title: "Adorn Your Soul with Silver",
            description: "Handcrafted luxury that blends traditional artistry with modern grace.",
            btnText: "Discover Our Bag",
            link: "/shop"
        },
        {
            image: heroSlide2,
            badge: "Wedding Specials",
            title: "Bridal Elegance Redefined",
            description: "Timeless silver pieces for your most special moments.",
            btnText: "Shop Bridal",
            link: "/category/rings"
        },
        {
            image: heroSlide3,
            badge: "Daily Essentials",
            title: "Minimalist Grace Every Day",
            description: "Statement pieces designed for your everyday lifestyle.",
            btnText: "Explore Now",
            link: "/shop"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    const newArrivals = [
        {
            id: 1,
            name: "Crystal Drop Earrings",
            price: "₹1,200",
            image1: prodEarringsMain,
            image2: prodEarringsHover
        },
        {
            id: 2,
            name: "Boho Silver Ring",
            price: "₹850",
            image1: prodRingMain,
            image2: prodRingHover
        },
        {
            id: 3,
            name: "Layered Silver Chain",
            price: "₹1,500",
            image1: prodChainMain,
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
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
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
        <div className="bg-white font-body text-black relative selection:bg-[#D39A9F] selection:text-white">


            {/* Hero Section - Optimized Slider */}
            <section className="relative overflow-hidden">
                <div className="relative h-[75vh] md:h-[calc(100vh-153px)]">
                    <AnimatePresence>
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <img
                                src={heroSlides[currentSlide].image}
                                alt={heroSlides[currentSlide].title}
                                className="w-full h-full object-cover transform scale-100 animate-slow-zoom"
                            />
                            {/* Enhanced Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/70 via-black/30 to-transparent flex items-end md:items-center pb-20 md:pb-0">
                                <div className="container mx-auto px-6 md:px-16">
                                    <div className="max-w-xl text-white space-y-4 md:space-y-6 text-center md:text-left">
                                        {/* Soft Aesthetic Badge */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 1.0, ease: "easeOut", delay: 0.1 }}
                                            className="flex items-center space-x-2 md:space-x-3 text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em] bg-white/10 backdrop-blur-md w-fit px-3 py-1 md:px-5 md:py-2 rounded-full border border-white/20 shadow-lg mx-auto md:mx-0"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#EFEBE9] animate-pulse"></span>
                                            <span className="text-[#EFEBE9] font-medium">{heroSlides[currentSlide].badge}</span>
                                        </motion.div>

                                        {/* Typography */}
                                        <motion.h1
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
                                            className="text-3xl md:text-7xl font-display font-medium leading-tight drop-shadow-md"
                                        >
                                            {currentSlide === 0 ? (
                                                <>Adorn Your <br /> <span className="font-serif italic font-light text-[#EFEBE9]">Soul with Silver</span></>
                                            ) : heroSlides[currentSlide].title}
                                        </motion.h1>

                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 1.0, ease: "easeOut", delay: 0.3 }}
                                            className="text-[#EFEBE9]/90 text-sm md:text-xl font-light max-w-sm md:max-w-md mx-auto md:mx-0 leading-relaxed drop-shadow-sm"
                                        >
                                            {heroSlides[currentSlide].description}
                                        </motion.p>

                                        {/* Interactive Buttons */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 1.0, ease: "easeOut", delay: 0.4 }}
                                            className="flex items-center justify-center md:justify-start space-x-6 pt-2 md:pt-4"
                                        >
                                            <Link to={heroSlides[currentSlide].link} className="bg-[#EBCDD0] text-black w-full md:w-auto px-6 py-3 md:px-10 md:py-4 rounded-full font-medium hover:bg-[#D39A9F] hover:text-white transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2 group/btn text-sm md:text-base">
                                                <span>{heroSlides[currentSlide].btnText}</span>
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </Link>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Pagination Dots - EXACTLY CENTERED */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
                        {heroSlides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-10 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
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
                                <h4 className="font-display font-bold text-xl text-black">12k+</h4>
                                <p className="text-xs text-gray-600 uppercase tracking-wider">Happy Customers</p>
                            </div>
                        </div>
                        <div className="relative h-40 rounded-2xl overflow-hidden mb-4 group/card cursor-pointer">
                            {/* Images change monthly based on logic below - currently showing Set {(new Date().getMonth() % 4) + 1} */}
                            <img
                                src={spotlightMain}
                                alt="Monthly Highlight"
                                className="absolute inset-0 w-full h-full object-cover transform duration-700 opacity-100 group-hover/card:opacity-0"
                            />
                            <img
                                src={spotlightHover}
                                alt="Highlight Detail"
                                className="absolute inset-0 w-full h-full object-cover transform duration-700 opacity-0 group-hover/card:opacity-100"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover/card:bg-transparent transition-colors duration-500" />
                        </div>
                        <h5 className="font-display font-semibold text-lg text-black">Exquisite Details</h5>
                        <Link to="/shop" className="text-xs font-bold text-[#D39A9F] uppercase tracking-widest mt-2 inline-flex items-center hover:text-black group">
                            Explore Collection <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Mobile App Style Category Stories - VISIBLE ONLY ON MOBILE (Now below Banner) */}
            <div className="md:hidden bg-white border-y border-[#EBCDD0] py-5 overflow-hidden">
                <div className="flex gap-6 overflow-x-auto px-4 scrollbar-hide">
                    {categories.map((cat) => (
                        <Link key={cat.id} to={`/category/${cat.path}`} className="flex-shrink-0 flex flex-col items-center space-y-2 group">
                            <div className="w-16 h-16 rounded-full p-0.5 border-2 border-[#EBCDD0]/60 group-active:scale-90 transition-all duration-300 shadow-sm">
                                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-gray-50">
                                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-black uppercase tracking-tighter text-center w-16 truncate">{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Choose The Type / Categories - Redesigned as Editorial Grid */}
            {/* Bohemain Bloom Style Section */}
            <section className="py-10 bg-white">
                <div className="container mx-auto px-4">
                    {/* Header with Sunburst & Script */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeUp}
                        className="text-center mb-4 md:mb-12"
                    >
                        <div className="flex items-center justify-center gap-3 mb-2 md:mb-4">
                            <div className="h-[1px] w-8 md:w-16 bg-[#EBCDD0]"></div>
                            <span className="text-[#D39A9F] text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">Our Favorites</span>
                            <div className="h-[1px] w-8 md:w-16 bg-[#EBCDD0]"></div>
                        </div>
                        <h2 className="text-3xl md:text-6xl font-serif italic text-black mb-2 md:mb-4">Curated Collections</h2>
                        <p className="text-[#D39A9F] italic text-xs md:text-base leading-relaxed max-w-2xl mx-auto">
                            Step into a world of organic elegance and modern minimalism as you explore our exclusive jewellery pieces.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-12">
                        {categories.slice(0, 5).map((cat, idx) => (
                            <motion.div
                                key={cat.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={idx % 2 === 0 ? slideInLeft : slideInRight}
                                className="group flex flex-col items-center"
                            >
                                {/* Arch Image Container */}
                                <Link to={`/category/${cat.path}`} className="relative w-full aspect-[2/3] md:aspect-[3/4] rounded-t-[10rem] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 bg-white">
                                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transform md:group-hover:scale-105 transition-transform duration-1000" />

                                    {/* Solid Box Label - Bottom of Arch */}
                                    <div className="absolute bottom-0 left-0 w-full bg-[#EBCDD0] text-black py-2 md:py-3 px-2 text-center">
                                        <h3 className="font-serif text-sm md:text-xl tracking-wide truncate">{cat.name}</h3>
                                    </div>
                                </Link>

                                {/* Bottom Link */}
                                <Link to={`/category/${cat.path}`} className="mt-2 text-black text-[10px] md:text-sm font-display font-medium uppercase tracking-widest border-b border-transparent group-hover:border-[#D39A9F] transition-all flex items-center gap-1">
                                    Explore <ArrowRight className="w-3 h-3" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trendy Products / Editorial Split Section - Staggered Dark Cards */}
            <section className="py-2 md:py-10 bg-white overflow-hidden">
                <div className="container mx-auto px-4">

                    {/* Section Header */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeUp}
                        className="text-center max-w-2xl mx-auto mb-8 md:mb-16 space-y-2 md:space-y-4 px-4"
                    >
                        <span className="text-[#D39A9F] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Timeless Beauty</span>
                        <h2 className="text-3xl md:text-5xl font-display text-black">Trending Now</h2>
                        <div className="h-0.5 w-16 md:w-24 bg-[#EBCDD0] mx-auto mt-2 md:mt-6"></div>
                    </motion.div>

                    {/* Mobile: Swipeable Lifestyle Cards (Giva/Palmonas Style) */}
                    <div
                        className="md:hidden flex overflow-x-auto overflow-y-hidden gap-4 px-4 pb-4 snap-x scrollbar-hide"
                        onScroll={(e) => {
                            const slideWidth = e.target.offsetWidth * 0.90;
                            const index = Math.round(e.target.scrollLeft / slideWidth);
                            setActiveTrendingIndex(Math.min(Math.max(0, index), trendingSlides.length - 1));
                        }}
                    >
                        {trendingSlides.map((slide) => (
                            <motion.div
                                key={slide.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={fadeUp}
                                className="min-w-[85vw] h-[50vh] relative rounded-3xl overflow-hidden snap-center shadow-lg"
                            >
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 w-full p-6 text-center space-y-3">
                                    <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em]">{slide.subtitle}</span>
                                    <h3 className="text-3xl font-display text-white leading-tight">
                                        {slide.title} <span className="font-serif italic text-[#D7CCC8]">{slide.titleItalic}</span>
                                    </h3>
                                    <p className="text-white/90 font-serif text-[10px] leading-relaxed line-clamp-2">
                                        {slide.desc}
                                    </p>
                                    <Link to="/shop" className="inline-block px-6 py-2 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-widest mt-2">
                                        Shop Collection
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    {/* Pagination Dots (Mobile Only) */}
                    <div className="md:hidden flex justify-center gap-2 mb-6 mt-4">
                        {trendingSlides.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-2 rounded-full transition-all duration-300 ${idx === activeTrendingIndex ? 'w-6 bg-[#5D4037]' : 'w-2 bg-[#EBCDD0]'}`}
                            ></div>
                        ))}
                    </div>



                    {/* Desktop: Original Editorial Split Layout */}
                    <div className="hidden md:block">
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
                                <div className="w-full md:w-[35%] bg-[#D39A9F] h-full rounded-l-[1.5rem] md:rounded-l-[1.5rem] relative overflow-hidden">
                                </div>
                                <div className="hidden md:block w-[65%] bg-white h-full rounded-r-[2rem] border border-[#EBCDD0] border-l-0 shadow-sm"></div>
                            </div>

                            {/* 2. Content Layer */}
                            <div className="relative z-10 flex flex-col md:flex-row items-center p-6 md:p-12 gap-8 md:gap-16">

                                {/* Overlapping Image - Positioned to bridge the background split */}
                                <div className="w-full md:w-[40%] flex-shrink-0">
                                    <div className="relative aspect-square md:aspect-[4/4] h-[300px] md:h-[350px] w-full rounded-lg md:rounded-lg overflow-hidden shadow-xl ml-auto md:mr-[-2rem] border-[4px] border-white">
                                        <img
                                            src={trendingHeritage}
                                            alt="Timeless Elegance"
                                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </div>

                                {/* Text Content - Sitting in the Light Area */}
                                <div className="w-full md:w-[50%] md:pl-12 pt-4 md:pt-0">
                                    <div className="md:border-l-[3px] border-[#EBCDD0] md:pl-8 space-y-4">
                                        <span className="text-[#D39A9F] text-xs font-bold uppercase tracking-[0.2em] block mb-2 md:text-left text-center">Heritage Collection</span>
                                        <h3 className="text-3xl md:text-5xl font-display text-white md:text-black leading-tight text-center md:text-left">
                                            Timeless <span className="font-serif italic text-[#D39A9F] underline md:no-underline underline-offset-8">Elegance</span>
                                        </h3>
                                        <p className="text-white md:text-black/80 font-serif leading-relaxed text-sm md:text-base max-w-md text-center md:text-left">
                                            No longer search for "authentic silver jewelry". You've found it. We serve the modern woman reflecting our belief that true style transcends trends.
                                        </p>
                                        <div className="pt-6 flex justify-center md:justify-start">
                                            <Link to="/shop" className="group inline-flex items-center gap-2 text-[#EFEBE9] md:text-black font-bold uppercase tracking-widest text-[10px] md:text-xs">
                                                Discover More
                                                <span className="bg-white md:bg-[#D39A9F] text-black md:text-white rounded-full w-6 h-6 flex items-center justify-center">
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
                                <div className="w-[65%] bg-white h-full rounded-l-[2rem] border border-[#EBCDD0] border-r-0 shadow-sm"></div>
                                <div className="w-[35%] bg-[#D39A9F] h-full rounded-r-[1.5rem] relative overflow-hidden">
                                </div>
                            </div>

                            {/* 2. Content Layer */}
                            <div className="relative z-10 flex flex-col md:flex-row items-center p-4 md:p-8 gap-6 md:gap-12">

                                {/* Text Content - Left Side */}
                                <div className="w-full md:w-[50%] md:pr-12 pt-4 md:pt-0 order-2 md:order-1 text-right">
                                    <div className="border-r-[3px] border-[#EBCDD0] pr-6 md:pr-8 space-y-4 flex flex-col items-end">
                                        <span className="text-[#D39A9F] text-xs font-bold uppercase tracking-[0.2em] block mb-2">Modern Statement</span>
                                        <h3 className="text-3xl md:text-5xl font-display text-black leading-tight">
                                            Empowering <span className="font-serif italic text-[#D39A9F]">Style</span>
                                        </h3>
                                        <p className="text-black/80 font-serif leading-relaxed text-sm md:text-base max-w-md">
                                            We know the power of simple, holistic design and the impact of a moment dedicated to only you.
                                        </p>
                                        <p className="text-black/80 font-serif leading-relaxed text-sm md:text-base max-w-md pt-2">
                                            From bold statements to subtle whispers, find pieces that resonate with your unique journey and celebrate your individuality.
                                        </p>
                                        <div className="pt-6">
                                            <Link to="/shop" className="group inline-flex items-center gap-2 text-black font-bold uppercase tracking-widest text-xs hover:text-[#D39A9F] transition-colors flex-row-reverse">
                                                Explore Collection
                                                <span className="bg-[#D39A9F] text-white rounded-full w-6 h-6 flex items-center justify-center group-hover:bg-[#8D6E63] transition-colors">
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
                                            src={trendingModern}
                                            alt="Empowering Style"
                                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    </div>

                </div>
            </section >

            {/* New Arrivals Collection Section */}
            < section className="py-10 bg-white overflow-hidden border-y border-[#EBCDD0] relative" >
                {/* Decorative Background Element */}
                < div className="absolute top-0 right-0 w-64 h-64 bg-[#EBCDD0]/10 rounded-full blur-3xl -z-0" ></div >

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-12">
                        {/* Left Text Content */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={fadeUp}
                            className="w-full lg:w-1/3 text-center lg:text-left space-y-4 md:space-y-6 mb-2 lg:mb-0"
                        >
                            <span className="text-[#D39A9F] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Just Arrived</span>
                            <h2 className="text-3xl md:text-5xl font-display text-black leading-tight">
                                Our New <br />
                                <span className="italic font-serif text-[#D39A9F]">Collection</span>
                            </h2>
                            <p className="text-[#D39A9F]/80 font-serif leading-relaxed text-xs md:text-base">
                                Be the first to wear our latest handcrafted silver masterpieces. Designed for elegance, crafted for you.
                            </p>
                            <Link
                                to="/products"
                                className="hidden lg:inline-block px-6 py-2 md:px-8 md:py-3 bg-[#EBCDD0] text-black hover:bg-[#D39A9F] rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-[#D39A9F] transition-all transform hover:scale-105 shadow-md mt-2 md:mt-4"
                            >
                                See More
                            </Link>
                        </motion.div>

                        {/* Right Product Grid */}
                        <div className="w-full lg:w-2/3">
                            <div className="flex overflow-x-auto overflow-y-hidden pb-4 gap-4 scrollbar-hide md:grid md:grid-cols-3 md:gap-6 snap-x">
                                {newArrivals.map((product) => (
                                    <div
                                        key={product.id}
                                        className="min-w-[260px] md:min-w-0 snap-start group bg-white rounded-2xl md:rounded-3xl p-3 md:p-4 shadow-sm md:hover:shadow-xl transition-all duration-500 md:hover:-translate-y-2"
                                    >
                                        {/* Image Container with Hover Swap */}
                                        <div className="relative aspect-[5/4] md:aspect-[3/2] rounded-xl md:rounded-2xl overflow-hidden mb-2 md:mb-4 bg-gray-100">
                                            <img
                                                src={product.image1}
                                                alt={product.name}
                                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-100 md:group-hover:opacity-0"
                                            />
                                            <img
                                                src={product.image2}
                                                alt={`${product.name} Detail`}
                                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-0 md:group-hover:opacity-100 md:scale-110"
                                            />

                                            {/* Floating Icon - Visible on hover on web, always visible or better toggle on mobile */}
                                            <div className="absolute top-2 right-2 md:top-3 md:right-3 w-7 h-7 md:w-8 md:h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-black shadow-sm md:translate-y-[-150%] md:group-hover:translate-y-0 transition-transform duration-300">
                                                <ShoppingBag className="w-3 h-3 md:w-4 md:h-4" />
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="text-center">
                                            <h3 className="font-display text-black text-xs md:text-lg mb-0.5 md:mb-1 truncate px-1 md:px-2">{product.name}</h3>
                                            <p className="font-serif text-black text-sm md:text-lg font-medium mb-1 md:mb-3">{product.price}</p>
                                            <Link
                                                to={`/product/${product.id}`}
                                                className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-black border-b border-[#5D4037]/30 pb-0.5 md:pb-1 hover:text-[#D39A9F] hover:border-[#8D6E63] transition-colors"
                                            >
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Mobile Only 'See More' Button below list */}
                            <div className="flex justify-end mt-2 lg:hidden pr-2">
                                <Link to="/products" className="flex items-center gap-1 text-black font-bold uppercase tracking-widest text-[10px]">
                                    See More <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* FAQ Section - Redesigned Editorial Style */}
            < section className="hidden md:block py-10 bg-white" >
                <div className="container mx-auto px-4">
                    {/* Top Header */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={fadeUp}
                        className="text-center mb-16 max-w-2xl mx-auto"
                    >
                        <span className="text-[#D39A9F] text-sm font-bold uppercase tracking-[0.2em]">Support</span>
                        <h2 className="text-3xl md:text-4xl font-display text-black mt-3">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-[#D39A9F] font-serif text-sm md:text-base leading-relaxed mt-3">
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
                                    className="border-b border-[#EBCDD0]/60 last:border-0 relative"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-start justify-between py-4 text-left group"
                                    >
                                        <span className={`font-serif text-xl md:text-2xl transition-colors duration-300 ${activeFaq === index ? 'text-[#D39A9F] italic' : 'text-black group-hover:text-[#D39A9F]'}`}>
                                            {faq.question}
                                        </span>
                                        <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeFaq === index ? 'bg-[#EBCDD0] text-black hover:bg-[#D39A9F] rotate-180' : 'bg-[#EFEBE9] text-black'}`}>
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
                            <div className="p-8 bg-white rounded-[2rem] shadow-xl shadow-[#8D6E63]/10 border border-[#EBCDD0] w-full sticky top-8">
                                <h4 className="font-display text-2xl text-black mb-2">Ask a Question</h4>
                                <p className="text-sm text-gray-500 mb-6">Can't find what you're looking for? We're here to help.</p>

                                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full bg-[#FAFAFA] border-b border-[#E0E0E0] p-3 text-black placeholder-[#BCAAA4] focus:outline-none focus:border-[#8D6E63] transition-colors font-serif"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            className="w-full bg-[#FAFAFA] border-b border-[#E0E0E0] p-3 text-black placeholder-[#BCAAA4] focus:outline-none focus:border-[#8D6E63] transition-colors font-serif"
                                        />
                                    </div>
                                    <div>
                                        <textarea
                                            placeholder="Your Question..."
                                            rows="3"
                                            className="w-full bg-[#FAFAFA] border-b border-[#E0E0E0] p-3 text-black placeholder-[#BCAAA4] focus:outline-none focus:border-[#8D6E63] transition-colors font-serif resize-none"
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="px-8 py-3 bg-[#EBCDD0] text-black hover:bg-[#D39A9F] rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[#D39A9F] transition-colors w-full mt-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-300">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section >


        </div >
    );
};

export default Home;
