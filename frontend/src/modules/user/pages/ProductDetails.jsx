import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../assets/data';
import { useShop } from '../../../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { Heart, ShoppingBag, Star, Share2, Plus, Minus, Truck, ShieldCheck, Smile, Gift, ChevronDown, SlidersHorizontal, X, Camera, Check } from 'lucide-react';

// ... AccordionItem component ...

// ... AccordionItem component ...
const AccordionItem = ({ title, children, isOpen, onClick }) => (
    <div className="border-b border-gray-200">
        <button
            className="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
            onClick={onClick}
        >
            <span className={`font-serif text-lg font-medium transition-colors ${isOpen ? 'text-[#5D4037]' : 'text-gray-800 group-hover:text-[#5D4037]'}`}>
                {title}
            </span>
            <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-[#5D4037]' : 'text-gray-400 group-hover:text-[#5D4037]'}`} />
            </span>
        </button>
        <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
        >
            <div className="text-sm text-gray-600 leading-relaxed font-light">
                {children}
            </div>
        </div>
    </div>
);

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, removeFromCart, cart, addToWishlist, removeFromWishlist, wishlist } = useShop();
    const product = products.find(p => p.id === parseInt(id));

    // State for Animations
    const [flying, setFlying] = useState(false);
    const [flyingType, setFlyingType] = useState('cart');

    // State for UI Sections
    const [openSection, setOpenSection] = useState('description');
    const [activeTab, setActiveTab] = useState('related');

    // State for Reviews
    const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
    const [reviewStep, setReviewStep] = useState(1);
    const [isReviewFilterOpen, setIsReviewFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState('Featured');
    const [rating, setRating] = useState(0);

    // Derived State
    const isWishlisted = wishlist.some(item => item.id === product?.id);
    const discount = product ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    if (!product) return <div>Product not found</div>;

    // ... (rest of the file)

    // Handlers for Animation
    const handleAddToCart = () => {
        // Always add to cart (or increment quantity), do not remove.
        setFlyingType('cart');
        setFlying(true);
        addToCart(product);
        setTimeout(() => {
            setFlying(false);
            navigate('/cart');
        }, 800);
    };

    const handleWishlist = () => {
        if (!isWishlisted) {
            setFlyingType('heart');
            setFlying(true);
            addToWishlist(product);
            setTimeout(() => setFlying(false), 800);
        } else {
            removeFromWishlist(product.id);
        }
    };

    return (
        <div className="bg-[#FDFBF7] min-h-screen py-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both">
            <style>
                {`
                    @keyframes flyToCart {
                        0% { top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1); opacity: 1; border-radius: 20px; }
                        50% { opacity: 0.8; transform: translate(-50%, -50%) scale(0.4); }
                        100% { top: 30px; left: 92%; transform: translate(-50%, -50%) scale(0.1); opacity: 0; border-radius: 50%; }
                    }
                     @keyframes flyToHeart {
                        0% { top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1); opacity: 1; border-radius: 20px; }
                        50% { opacity: 0.8; transform: translate(-50%, -50%) scale(0.4); }
                        100% { top: 30px; left: 88%; transform: translate(-50%, -50%) scale(0.1); opacity: 0; border-radius: 50%; }
                    }
                    .animate-fly-cart {
                        animation: flyToCart 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                    }
                    .animate-fly-heart {
                        animation: flyToHeart 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                    }
                `}
            </style>

            {/* Flying Image Animation Element */}
            {flying && (
                <img
                    src={product.image}
                    alt=""
                    className={`fixed z-[9999] w-64 h-64 object-cover shadow-2xl pointer-events-none border-4 border-white ${flyingType === 'cart' ? 'animate-fly-cart' : 'animate-fly-heart'}`}
                    style={{ left: '50%', top: '50%' }}
                />
            )}

            <div className="container mx-auto px-4 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left: Product Image */}
                    <div className="relative">
                        <div className="h-[400px] lg:h-[550px] w-full bg-white rounded-sm overflow-hidden sticky top-24">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            <button className="absolute bottom-4 right-4 bg-white/80 p-2 rounded-full shadow-sm hover:bg-white text-gray-600">
                                <Share2 className="w-5 h-5" strokeWidth={1.5} />
                            </button>
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="space-y-6 pt-2">
                        <div>
                            <h1 className="text-3xl font-serif text-[#3E2723] mb-2">{product.name}</h1>
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center text-[#5D4037]">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w - 3.5 h - 3.5 ${i < Math.round(product.rating) ? 'fill-current' : 'text-gray-300'} `} />
                                    ))}
                                    <span className="ml-2 text-gray-500">({product.reviews} Reviews)</span>
                                </div>
                                <span className="text-gray-300">|</span>
                                <span className="text-gray-500">SKU: SO-{product.id}00SIL</span>
                            </div>
                        </div>

                        <div className="border-b border-gray-100 pb-6">
                            <div className="flex items-baseline gap-3 mb-1">
                                <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                                {product.originalPrice > product.price && (
                                    <>
                                        <span className="text-lg text-gray-400 line-through font-light">₹{product.originalPrice.toLocaleString()}</span>
                                        <span className="bg-[#212121] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">SAVE {discount}%</span>
                                    </>
                                )}
                            </div>
                            <p className="text-xs text-gray-500">Inclusive of all taxes</p>
                        </div>

                        <div className="space-y-3 pb-6 border-b border-gray-100 text-sm">
                            <div className="flex items-start gap-2">
                                <Gift className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <p className="text-gray-700"><span className="font-semibold text-green-600">Get a Freebie</span> Worth ₹1,545 on Prepaid Orders Above ₹2,999!</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <Gift className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <p className="text-gray-700"><span className="font-bold text-green-600">Buy 1 Get 1 Free</span> Use Code : <span className="font-bold text-gray-900">B1G1</span> at checkout.</p>
                            </div>
                            <p className="text-xs text-gray-500 pl-6">Note: You need to add minimum 2 products to avail this discount.</p>
                            <button className="text-xs underline text-gray-500 pl-6 hover:text-[#5D4037]">See All Offers</button>
                        </div>

                        <div className="space-y-4 pb-6">
                            <div className="flex items-center gap-2 text-green-700 text-sm font-medium">
                                <ShieldCheck className="w-4 h-4" />
                                <span>In stock - ready to ship</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex gap-3 h-12">
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 font-medium text-sm tracking-wide transition-all duration-200 transform hover:scale-95 flex items-center justify-center gap-2 uppercase bg-[#212121] text-white hover:bg-black"
                                    >
                                        <ShoppingBag className="w-4 h-4" /> Add to Bag
                                    </button>
                                    <button
                                        onClick={handleWishlist}
                                        className={`w-12 border flex items-center justify-center transition-colors bg-white ${isWishlisted ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-700 hover:border-[#5D4037] hover:text-[#5D4037]'}`}
                                    >
                                        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} strokeWidth={1.5} />
                                    </button>
                                </div>
                                <button className="w-full h-12 bg-[#5D4037] text-white font-medium text-sm tracking-wide hover:bg-[#4E342E] transition-colors uppercase shadow-md">
                                    Buy It Now
                                </button>
                            </div>
                        </div>

                        <div className="border-t border-gray-200">
                            <AccordionItem
                                title="Description"
                                isOpen={openSection === 'description'}
                                onClick={() => toggleSection('description')}
                            >
                                <p className="mb-4">Elegance meets craftsmanship in this stunning {product.name}. Handcrafted with precision from 925 Sterling Silver, this piece is designed to be a timeless addition to your collection.</p>
                                <p>Whether you're dressing up for a special occasion or adding a touch of sparkle to your daily look, this piece versatile enough to complement any style.</p>
                            </AccordionItem>

                            <AccordionItem
                                title="Specification"
                                isOpen={openSection === 'specification'}
                                onClick={() => toggleSection('specification')}
                            >
                                <ul className="list-disc pl-5 space-y-1">
                                    <li><strong>Material:</strong> 925 Sterling Silver</li>
                                    <li><strong>Plating:</strong> Rhodium / 18K Gold Polish</li>
                                    <li><strong>Stone:</strong> {product.name.includes("Stone") || product.name.includes("Gem") ? "Semi-precious Gemstone" : "High Quality Box Zircon"}</li>
                                    <li><strong>Water Resistant:</strong> Yes</li>
                                    <li><strong>Anti-Tarnish:</strong> UV Coated for longevity</li>
                                </ul>
                            </AccordionItem>

                            <AccordionItem
                                title="Supplier Information"
                                isOpen={openSection === 'supplier'}
                                onClick={() => toggleSection('supplier')}
                            >
                                <p>Manufactured and Marketed by: <strong>Sands Ornaments Pvt Ltd.</strong></p>
                                <p>Country of Origin: <strong>India</strong></p>
                            </AccordionItem>

                            <AccordionItem
                                title="Returns"
                                isOpen={openSection === 'returns'}
                                onClick={() => toggleSection('returns')}
                            >
                                <p>Easy 30-day returns. If you are not completely satisfied with your purchase, you can return it for a full refund or exchange. Condition applies.</p>
                            </AccordionItem>
                        </div>

                        <div className="grid grid-cols-3 gap-4 bg-[#F5F0EB] p-6 rounded-sm mt-8">
                            <div className="flex flex-col items-center text-center gap-2">
                                <ShieldCheck className="w-6 h-6 text-[#5D4037]" strokeWidth={1.5} />
                                <span className="text-[10px] uppercase font-medium tracking-wide text-[#5D4037]">Lifetime Warranty</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <Smile className="w-6 h-6 text-[#5D4037]" strokeWidth={1.5} />
                                <span className="text-[10px] uppercase font-medium tracking-wide text-[#5D4037]">Skin Safe Jewellery</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <Gift className="w-6 h-6 text-[#5D4037]" strokeWidth={1.5} />
                                <span className="text-[10px] uppercase font-medium tracking-wide text-[#5D4037]">18k Gold Tone Plated</span>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-bold text-gray-800 font-sans">Estimated Delivery Date</span>
                                <button
                                    onClick={() => setOpenSection('pincode')}
                                    className="text-xs font-bold text-[#8D6E63] hover:text-[#5D4037] uppercase tracking-wider border-b border-[#8D6E63] pb-0.5"
                                >
                                    Check Pincode
                                </button>
                            </div>

                            {openSection === 'pincode' && (
                                <div className="flex gap-2 mb-6 animate-in slide-in-from-top-2 duration-300">
                                    <input
                                        type="text"
                                        placeholder="Enter your pincode"
                                        className="flex-1 border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#8D6E63] transition-colors"
                                    />
                                    <button className="bg-[#C19A83] text-white px-8 py-2.5 rounded font-medium text-sm hover:bg-[#A1887F] transition-colors">
                                        Check
                                    </button>
                                </div>
                            )}

                            <div className="grid grid-cols-3 gap-0 border border-gray-200 rounded-sm overflow-hidden">
                                <div className="flex flex-col items-center justify-center p-4 border-r border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                                    <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center mb-2 text-gray-600">
                                        <Truck className="w-4 h-4" strokeWidth={1.5} />
                                    </div>
                                    <span className="text-[11px] text-gray-700 font-medium text-center">2 Days Return</span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-4 border-r border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                                    <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center mb-2 text-gray-600">
                                        <Truck className="w-4 h-4" strokeWidth={1.5} />
                                    </div>
                                    <span className="text-[11px] text-gray-700 font-medium text-center">10 Days Exchange</span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-4 bg-white hover:bg-gray-50 transition-colors">
                                    <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center mb-2 text-gray-600">
                                        <Truck className="w-4 h-4" strokeWidth={1.5} />
                                    </div>
                                    <span className="text-[11px] text-gray-700 font-medium text-center">Cash On Delivery</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ================= REORDERED SECTIONS ================= */}

                {/* 1. Related / Recently Viewed Tabs (First) */}
                <div className="mt-20">
                    <div className="flex gap-8 border-b border-gray-200 mb-8">
                        <button
                            className={`pb - 4 text - lg font - serif font - medium transition - colors relative ${activeTab === 'related' ? 'text-[#5D4037]' : 'text-gray-400 hover:text-gray-600'} `}
                            onClick={() => setActiveTab('related')}
                        >
                            Related products
                            {activeTab === 'related' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5D4037]"></span>}
                        </button>
                        <button
                            className={`pb - 4 text - lg font - serif font - medium transition - colors relative ${activeTab === 'recent' ? 'text-[#5D4037]' : 'text-gray-400 hover:text-gray-600'} `}
                            onClick={() => setActiveTab('recent')}
                        >
                            Recently viewed
                            {activeTab === 'recent' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5D4037]"></span>}
                        </button>
                    </div>

                    <div className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-hide">
                        {(activeTab === 'related'
                            ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 8)
                            : products.filter(p => p.id !== product.id).reverse().slice(0, 8)
                        ).map((product) => (
                            <div key={product.id} className="min-w-[280px] w-[280px] snap-center">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Reviews Section (Second) - With Filters & Modal */}
                <div className="mt-12 border-t border-gray-200 pt-12 animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                            <div className="flex text-[#5D4037]">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-current" />
                                ))}
                            </div>
                            <span className="text-lg font-medium text-gray-800 flex items-center gap-1">
                                {product.reviews} Reviews
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            </span>
                        </div>
                        <div className="flex gap-3 relative">
                            <button
                                onClick={() => { setIsWriteReviewOpen(true); setReviewStep(1); }}
                                className="border border-gray-300 px-4 py-2 rounded text-sm font-medium text-gray-700 hover:border-[#5D4037] hover:text-[#5D4037] transition-colors"
                            >
                                Write a review
                            </button>
                            <button
                                onClick={() => setIsReviewFilterOpen(!isReviewFilterOpen)}
                                className={`border border - gray - 300 p - 2 rounded text - gray - 700 hover: border - [#5D4037] hover: text - [#5D4037] transition - colors ${isReviewFilterOpen ? 'bg-gray-100' : ''} `}
                            >
                                <SlidersHorizontal className="w-5 h-5" />
                            </button>

                            {/* Filter Dropdown */}
                            {isReviewFilterOpen && (
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-30 p-2 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="px-3 py-2 border-b border-gray-100 mb-1">
                                        <span className="font-bold text-gray-900">Sort by</span>
                                    </div>
                                    <div className="space-y-1">
                                        {['Featured', 'Newest', 'Highest Ratings', 'Lowest Ratings'].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => { setSortBy(option); setIsReviewFilterOpen(false); }}
                                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex justify-between items-center"
                                            >
                                                {option}
                                                {sortBy === option && <Check className="w-4 h-4 text-[#5D4037]" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { name: "Aditi S.", date: "23/12/2025", rating: 5, title: "Cute adorable", comment: "The ring fits perfectly and looks exactly like the pictures! Highly recommend." },
                            { name: "Rahul M.", date: "22/12/2025", rating: 5, title: "Excellent", comment: "Premium quality packaging and the product itself is stunning." },
                            { name: "Sneha K.", date: "21/12/2025", rating: 4, title: "Good", comment: "Really nice design, just wish the delivery was a bit faster." },
                            { name: "Priya R.", date: "20/12/2025", rating: 5, title: "Love it", comment: "Obsessed with this purchase. Will buy again!" }
                        ].map((review, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-bold text-gray-900">{review.name}</h4>
                                        <span className="text-xs text-gray-400">{review.date}</span>
                                    </div>
                                    <div className="flex text-[#5D4037]">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w - 3 h - 3 ${i < review.rating ? 'fill-current' : 'text-gray-200'} `} />
                                        ))}
                                    </div>
                                </div>
                                <h5 className="font-medium text-sm text-gray-800 mt-2">{review.title}</h5>
                                <p className="text-gray-600 text-sm mt-1">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Write Review Modal Overlay */}
            {isWriteReviewOpen && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
                            <h3 className="font-serif font-bold text-lg text-[#5D4037]">Write a Review</h3>
                            <button onClick={() => setIsWriteReviewOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {/* Step Indicators */}
                            <div className="flex justify-center gap-2 mb-8">
                                {[1, 2, 3].map((step) => (
                                    <div
                                        key={step}
                                        className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${reviewStep >= step ? 'bg-[#5D4037]' : 'bg-gray-200'}`}
                                    />
                                ))}
                            </div>

                            {reviewStep === 1 && (
                                <div className="text-center space-y-6">
                                    <h4 className="text-xl font-medium text-gray-800">How would you rate this product?</h4>
                                    <div className="flex justify-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => setRating(star)}
                                                className="transition-transform hover:scale-110 focus:outline-none"
                                            >
                                                <Star
                                                    className={`w-10 h-10 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setReviewStep(2)}
                                        className="w-full bg-[#5D4037] text-white py-3 rounded-lg font-medium hover:bg-[#4E342E] transition-colors mt-4"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}

                            {reviewStep === 2 && (
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <h4 className="text-lg font-medium text-gray-800 mb-2">Show us your style!</h4>
                                        <p className="text-sm text-gray-500">Upload photos of the product (Optional)</p>
                                    </div>

                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-400 hover:border-[#8D6E63] hover:text-[#8D6E63] transition-colors cursor-pointer bg-gray-50">
                                        <Camera className="w-8 h-8 mb-2" />
                                        <span className="text-sm font-medium">Click to upload photos</span>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setReviewStep(1)}
                                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={() => setReviewStep(3)}
                                            className="flex-1 bg-[#5D4037] text-white px-4 py-3 rounded-lg hover:bg-[#4E342E] transition-colors"
                                        >
                                            Next
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => setReviewStep(3)}
                                        className="w-full text-center text-gray-400 text-xs font-medium uppercase tracking-wider hover:text-[#5D4037] mt-2 transition-colors"
                                    >
                                        Skip this step
                                    </button>
                                </div>
                            )}

                            {reviewStep === 3 && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Review Title</label>
                                        <input type="text" placeholder="Summary of your experience" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#8D6E63] focus:border-[#8D6E63]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                                        <textarea rows="4" placeholder="Tell us what you liked or disliked..." className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#8D6E63] focus:border-[#8D6E63]"></textarea>
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <button
                                            onClick={() => setReviewStep(2)}
                                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={() => setIsWriteReviewOpen(false)}
                                            className="flex-1 bg-[#5D4037] text-white px-4 py-3 rounded-lg hover:bg-[#4E342E] transition-colors font-bold tracking-wide"
                                        >
                                            Submit Review
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
