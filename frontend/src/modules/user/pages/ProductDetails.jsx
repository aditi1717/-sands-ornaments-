import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../assets/data';
import { useShop } from '../../../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { Heart, ShoppingBag, Star, Share2, Plus, Minus, Truck, ShieldCheck, Smile, Gift, ChevronDown, SlidersHorizontal, X, Camera, Check, ArrowLeft } from 'lucide-react';

// ... AccordionItem component ...

// ... AccordionItem component ...
const AccordionItem = ({ title, children, isOpen, onClick }) => (
    <div className="border-b border-[#EBD3EC]/50">
        <button
            className="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
            onClick={onClick}
        >
            <span className={`font-serif text-lg font-bold transition-colors ${isOpen ? 'text-black' : 'text-gray-800 group-hover:text-black'}`}>
                {title}
            </span>
            <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-[#B7A0BA]' : 'text-gray-400 group-hover:text-[#B7A0BA]'}`} />
            </span>
        </button>
        <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
        >
            <div className="text-sm text-gray-500 leading-relaxed font-serif">
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

    const [reviews, setReviews] = useState([
        { name: "Aditi S.", date: "23/12/2025", rating: 5, title: "Cute adorable", comment: "The ring fits perfectly and looks exactly like the pictures! Highly recommend." },
        { name: "Rahul M.", date: "22/12/2025", rating: 5, title: "Excellent", comment: "Premium quality packaging and the product itself is stunning." },
        { name: "Sneha K.", date: "21/12/2025", rating: 4, title: "Good", comment: "Really nice design, just wish the delivery was a bit faster." },
        { name: "Priya R.", date: "20/12/2025", rating: 5, title: "Love it", comment: "Obsessed with this purchase. Will buy again!" }
    ]);
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewComment, setReviewComment] = useState('');

    const handleReviewSubmit = () => {
        if (!reviewTitle.trim() && !reviewComment.trim() && rating === 0) return;

        const newReview = {
            name: "You",
            date: new Date().toLocaleDateString('en-GB'),
            rating: rating || 5, // Fallback to 5 if only text is provided
            title: reviewTitle.trim() || (rating > 0 ? `${rating} Star Rating` : "My Review"),
            comment: reviewComment.trim() || "No comment provided."
        };

        setReviews([newReview, ...reviews]);
        setIsWriteReviewOpen(false);
        setReviewTitle('');
        setReviewComment('');
        setRating(0);
        setReviewStep(1);
    };



    // Image Gallery State
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (product) setSelectedImage(product.image);
    }, [product]);

    // Derived State
    const isWishlisted = wishlist.some(item => item.id === product?.id);
    const discount = product ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    if (!product) return <div>Product not found</div>;

    // ... (rest of the file)

    // State for Size Selection
    const [selectedSize, setSelectedSize] = useState(null);
    const [sizeError, setSizeError] = useState(false);

    // Handlers for Animation
    const handleAddToCart = () => {
        // Validation: Enforce Size Selection
        if (!selectedSize) {
            setSizeError(true);
            // Scroll to size selector if needed (optional, but good UX)
            return;
        }

        // Add to cart with specific size
        setFlyingType('cart');
        setFlying(true);

        // Create a unique ID for this specific size variant so it doesn't merge with other sizes
        // Pass 'selectedSize' so the Cart component can display it
        addToCart({
            ...product,
            id: `${product.id}-${selectedSize}`,
            originalId: product.id,
            selectedSize: selectedSize
        });

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
            setTimeout(() => {
                setFlying(false);
                navigate('/wishlist');
            }, 800);
        } else {
            removeFromWishlist(product.id);
        }
    };

    // State for Size Chart Modal
    const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

    // Size Chart Data (Mock for Rings/Bangles)
    const sizeChartData = [
        { size: '6', diameter: '16.5 mm', circumference: '51.9 mm' },
        { size: '7', diameter: '17.3 mm', circumference: '54.4 mm' },
        { size: '8', diameter: '18.1 mm', circumference: '57.0 mm' },
        { size: '9', diameter: '18.9 mm', circumference: '59.5 mm' },
        { size: '10', diameter: '19.8 mm', circumference: '62.1 mm' },
        { size: '11', diameter: '20.6 mm', circumference: '64.6 mm' },
    ];

    return (
        <div className="bg-white min-h-screen py-8 pb-24 md:pb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both selection:bg-[#B7A0BA] selection:text-white">
            {/* Back Button */}
            <div className="container mx-auto px-4 mb-6 md:mb-10">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-black hover:text-[#B7A0BA] transition-all group font-bold uppercase tracking-widest text-[10px] md:text-xs"
                >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100 group-hover:-translate-x-1 transition-transform">
                        <ArrowLeft className="w-4 h-4 md:w-5 h-5 text-gray-500" />
                    </div>
                    <span>Go Back</span>
                </button>
            </div>
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

            {/* Size Chart Modal */}
            {isSizeChartOpen && (
                <div className="fixed inset-0 bg-black/60 z-[130] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-[#FDFBF7]">
                            <h3 className="font-serif font-bold text-lg text-[#5D4037]">Ring Size Chart</h3>
                            <button onClick={() => setIsSizeChartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-0 overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-[#8D6E63] uppercase bg-[#FDFBF7] font-bold tracking-wider">
                                    <tr>
                                        <th className="px-6 py-3 border-b border-gray-100">US Size</th>
                                        <th className="px-6 py-3 border-b border-gray-100">Diameter</th>
                                        <th className="px-6 py-3 border-b border-gray-100">Circumference</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sizeChartData.map((row, index) => (
                                        <tr key={index} className="bg-white border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-black">{row.size}</td>
                                            <td className="px-6 py-4 text-gray-600">{row.diameter}</td>
                                            <td className="px-6 py-4 text-gray-600">{row.circumference}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 bg-gray-50 text-[10px] text-gray-500 text-center">
                            * Standard US Sizing. Measure your finger for best fit.
                        </div>
                    </div>
                </div>
            )}

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
                    {/* Left: Product Image Gallery */}
                    <div className="relative space-y-4">
                        {/* Main Large Image */}
                        <div className="h-[350px] lg:h-[480px] w-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative group">
                            <img src={selectedImage || product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-zoom-in" />
                            <div className="absolute top-3 right-3 md:top-4 md:right-4 flex flex-col gap-2 z-10">
                                <button className="bg-white/90 p-2 md:p-2.5 rounded-full shadow-md hover:bg-[#B7A0BA] hover:text-white text-black transition-all">
                                    <Share2 className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                                </button>
                                <button
                                    onClick={handleWishlist}
                                    className={`md:hidden p-2 md:p-2.5 rounded-full shadow-md transition-all ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white/90 text-black hover:bg-[#B7A0BA] hover:text-white'}`}
                                >
                                    <Heart className={`w-4 h-4 md:w-5 md:h-5 ${isWishlisted ? 'fill-current' : ''}`} strokeWidth={1.5} />
                                </button>
                            </div>
                        </div>

                        {/* Thumbnails Row */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 px-1 scrollbar-hide">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={`relative shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all shadow-sm ${selectedImage === img ? 'border-[#B7A0BA] ring-1 ring-[#B7A0BA]' : 'border-transparent hover:border-gray-200'}`}
                                    >
                                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                        {selectedImage === img && <div className="absolute inset-0 bg-black/10" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info */}
                    <div className="space-y-6 pt-2">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-display font-bold text-black mb-2 md:mb-4 leading-tight">{product.name}</h1>
                            <div className="flex items-center gap-4 text-sm px-1">
                                <div className="flex items-center text-[#B7A0BA]">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(product.rating) ? 'fill-current' : 'text-gray-300'} `} />
                                    ))}
                                    <span className="ml-2 text-gray-500 font-medium">({product.reviews} Reviews)</span>
                                </div>
                                <span className="text-gray-300">|</span>
                                <span className="text-gray-500 font-mono text-xs">SKU: SO-{product.id}00SIL</span>
                            </div>
                        </div>

                        <div className="border-b border-gray-100 pb-6">
                            <div className="flex items-baseline gap-3 mb-1">
                                <span className="text-2xl md:text-3xl font-bold md:font-semibold text-black">₹{product.price.toLocaleString()}</span>
                                {product.originalPrice > product.price && (
                                    <>
                                        <span className="text-base md:text-lg text-gray-400 line-through font-medium">₹{product.originalPrice.toLocaleString()}</span>
                                        <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded-sm tracking-wider">SAVE {discount}%</span>
                                    </>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 font-medium">Inclusive of all taxes</p>
                        </div>

                        <div className="space-y-4 pb-2 md:pb-6">
                            {/* Size Selector */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-bold text-black uppercase tracking-wide">
                                        Select Size
                                    </label>
                                    <button
                                        onClick={() => setIsSizeChartOpen(true)}
                                        className="text-xs text-[#B7A0BA] underline hover:text-black font-bold"
                                    >
                                        Size Chart
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {(() => {
                                        // Determine sizes based on product type
                                        let sizes = ['One Size'];
                                        const name = product.name.toLowerCase();
                                        if (name.includes('ring') || name.includes('band')) sizes = ['6', '7', '8', '9', '10', '11'];
                                        else if (name.includes('chain') || name.includes('necklace')) sizes = ['16"', '18"', '20"', '22"'];
                                        else if (name.includes('bangle') || name.includes('bracelet')) sizes = ['2.4', '2.5', '2.6', '2.8'];
                                        else sizes = ['S', 'M', 'L']; // Default Fallback

                                        return sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => { setSelectedSize(size); setSizeError(false); }}
                                                className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center text-sm font-medium transition-all
                                                        ${selectedSize === size
                                                        ? 'border-black bg-black text-white shadow-md scale-105'
                                                        : 'border-gray-200 text-gray-700 hover:border-[#B7A0BA] hover:text-black bg-white'
                                                    }
                                                    `}
                                            >
                                                {size}
                                            </button>
                                        ));
                                    })()}
                                </div>
                                {sizeError && (
                                    <p className="text-red-500 text-xs mt-2 font-medium animate-pulse flex items-center gap-1">
                                        <X className="w-3 h-3" /> Please select a size to proceed
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-2 text-emerald-700 text-sm font-medium">
                                <ShieldCheck className="w-4 h-4" />
                                <span>In stock - ready to ship</span>
                            </div>

                            {/* Desktop Actions (Inline) */}
                            <div className="hidden md:flex flex-col gap-3">
                                <div className="flex gap-3 h-12">
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 font-medium text-sm tracking-wide transition-all duration-200 transform hover:scale-95 flex items-center justify-center gap-2 uppercase bg-black text-white hover:bg-[#B7A0BA] hover:shadow-lg"
                                    >
                                        <ShoppingBag className="w-4 h-4" /> Add to Bag
                                    </button>
                                    <button
                                        onClick={handleWishlist}
                                        className={`w-12 border flex items-center justify-center transition-colors bg-white ${isWishlisted ? 'border-red-500 text-red-500' : 'border-gray-300 text-black hover:border-[#B7A0BA] hover:text-[#B7A0BA]'}`}
                                    >
                                        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} strokeWidth={1.5} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => {
                                        if (!selectedSize) {
                                            setSizeError(true);
                                            return;
                                        }
                                        // Handle Buy Now Logic (Direct Cart + Navigate)
                                        handleAddToCart();
                                    }}
                                    className="w-full h-12 bg-[#EBD3EC] text-black font-bold text-sm tracking-wide hover:bg-[#B7A0BA] hover:text-white transition-colors uppercase shadow-sm"
                                >
                                    Buy It Now
                                </button>
                            </div>

                            {/* Mobile Sticky Action Bar (Fixed Overlay) */}
                            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 z-[110] md:hidden flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] pb-safe">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-black text-white rounded-xl h-12 font-bold uppercase tracking-wide text-[10px] flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-[#B7A0BA]"
                                >
                                    <ShoppingBag className="w-4 h-4" /> Add to Bag
                                </button>
                                <button
                                    onClick={() => {
                                        if (!selectedSize) {
                                            setSizeError(true);
                                            return;
                                        }
                                        handleAddToCart();
                                    }}
                                    className="flex-1 bg-[#EBD3EC] text-black hover:bg-[#B7A0BA] hover:text-white rounded-xl h-12 font-bold uppercase tracking-wide text-[10px] active:scale-95 transition-transform"
                                >
                                    Buy Now
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

                        <div className="grid grid-cols-3 gap-2 md:gap-4 bg-[#FCF2FB] p-4 md:p-6 rounded-2xl mt-2 border border-[#EBD3EC]/50">
                            <div className="flex flex-col items-center text-center gap-2">
                                <ShieldCheck className="w-6 h-6 text-[#B7A0BA]" strokeWidth={1.5} />
                                <span className="text-[10px] uppercase font-bold tracking-wide text-black">Lifetime Warranty</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <Smile className="w-6 h-6 text-[#B7A0BA]" strokeWidth={1.5} />
                                <span className="text-[10px] uppercase font-bold tracking-wide text-black">Skin Safe Jewellery</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <Gift className="w-6 h-6 text-[#B7A0BA]" strokeWidth={1.5} />
                                <span className="text-[10px] uppercase font-bold tracking-wide text-black">18k Gold Tone Plated</span>
                            </div>
                        </div>

                        <div className="mt-2">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-bold text-black font-display">Estimated Delivery Date</span>
                                <button
                                    onClick={() => setOpenSection('pincode')}
                                    className="text-xs font-bold text-[#B7A0BA] hover:text-black uppercase tracking-wider border-b border-[#B7A0BA] pb-0.5"
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

                <div className="mt-4 md:mt-8">
                    <div className="flex gap-10 border-b border-gray-100 mb-6">
                        <button
                            className={`pb-4 text-sm md:text-base font-bold uppercase tracking-[0.15em] transition-all relative ${activeTab === 'related' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
                            onClick={() => setActiveTab('related')}
                        >
                            Related products
                            {activeTab === 'related' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black animate-in fade-in slide-in-from-left-2 duration-300"></span>}
                        </button>
                        <button
                            className={`pb-4 text-sm md:text-base font-bold uppercase tracking-[0.15em] transition-all relative ${activeTab === 'recent' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
                            onClick={() => setActiveTab('recent')}
                        >
                            Recently viewed
                            {activeTab === 'recent' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black animate-in fade-in slide-in-from-left-2 duration-300"></span>}
                        </button>
                    </div>

                    {(() => {
                        const relatedList = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 8);
                        const recentList = products.filter(p => p.id !== product.id).reverse().slice(0, 8);
                        const displayList = activeTab === 'related' ? relatedList : recentList;

                        if (displayList.length === 0) {
                            return (
                                <div className="flex flex-col items-center justify-center py-12 text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                    <ShoppingBag className="w-8 h-8 mb-2 opacity-50" />
                                    <p className="text-sm font-medium">No {activeTab} products found</p>
                                </div>
                            );
                        }

                        return (
                            <div className="flex overflow-x-auto gap-3 md:gap-6 pb-4 snap-x scrollbar-hide">
                                {displayList.map((product) => (
                                    <div key={product.id} className="min-w-[140px] w-[140px] md:min-w-[280px] md:w-[280px] snap-center">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        );
                    })()}
                </div>

                {/* 2. Reviews Section (Second) - With Filters & Modal */}
                {/* 2. Reviews Section (Second) - With Filters & Modal */}
                <div className="mt-4 border-t border-gray-200 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 relative pb-24 md:pb-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
                        <div className="flex items-center gap-2">
                            <div className="flex text-[#B7A0BA]">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-current" />
                                ))}
                            </div>
                            <span className="text-lg font-medium text-gray-800 flex items-center gap-1">
                                {product.reviews} Reviews
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            </span>
                        </div>
                        <div className="flex gap-3 relative w-full md:w-auto">
                            <button
                                onClick={() => { setIsWriteReviewOpen(true); setReviewStep(1); }}
                                className="flex-1 md:flex-none border border-gray-300 px-4 py-2.5 rounded text-sm font-bold uppercase tracking-widest text-black hover:border-black hover:bg-black hover:text-white transition-colors text-center"
                            >
                                Write a review
                            </button>
                            <button
                                onClick={() => setIsReviewFilterOpen(!isReviewFilterOpen)}
                                className={`border border-gray-300 p-2.5 rounded text-black hover:border-black hover:bg-black hover:text-white transition-colors ${isReviewFilterOpen ? 'bg-black text-white' : ''}`}
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
                                                {sortBy === option && <Check className="w-4 h-4 text-black" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {reviews.map((review, idx) => (
                            <div key={idx} className="bg-white p-4 md:p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-bold text-gray-900">{review.name}</h4>
                                        <span className="text-xs text-gray-400">{review.date}</span>
                                    </div>
                                    <div className="flex text-[#B7A0BA]">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-200'} `} />
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
                <div className="fixed inset-0 bg-black/50 z-[120] flex items-end md:items-center justify-center p-0 md:p-4 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-t-2xl md:rounded-xl w-full max-w-lg overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
                            <h3 className="font-display font-bold text-lg text-black">Write a Review</h3>
                            <button onClick={() => setIsWriteReviewOpen(false)} className="text-gray-400 hover:text-black bg-white rounded-full p-1">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-4 md:p-6">
                            {/* Step Indicators */}
                            <div className="flex justify-center gap-2 mb-6 md:mb-8">
                                {[1, 2, 3].map((step) => (
                                    <div
                                        key={step}
                                        className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${reviewStep >= step ? 'bg-black' : 'bg-gray-200'}`}
                                    />
                                ))}
                            </div>

                            {reviewStep === 1 && (
                                <div className="text-center space-y-6">
                                    <h4 className="text-lg md:text-xl font-medium text-gray-800">How would you rate this product?</h4>
                                    <div className="flex justify-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => setRating(star)}
                                                className="transition-transform hover:scale-110 focus:outline-none"
                                            >
                                                <Star
                                                    className={`w-8 h-8 md:w-10 md:h-10 ${star <= rating ? 'fill-[#B7A0BA] text-[#B7A0BA]' : 'text-gray-300'}`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setReviewStep(2)}
                                        className="w-full bg-black text-white py-3.5 rounded-lg font-bold tracking-widest uppercase text-xs md:text-sm hover:bg-[#B7A0BA] transition-all mt-4 active:scale-95 shadow-lg shadow-black/5"
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

                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 md:p-8 flex flex-col items-center justify-center text-gray-400 hover:border-[#8D6E63] hover:text-[#8D6E63] transition-colors cursor-pointer bg-gray-50">
                                        <Camera className="w-8 h-8 mb-2" />
                                        <span className="text-sm font-medium">Click to upload photos</span>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setReviewStep(1)}
                                            className="flex-1 px-4 py-3.5 border border-gray-300 rounded-lg text-gray-600 font-bold tracking-widest uppercase text-xs transition-all hover:bg-gray-50"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={() => setReviewStep(3)}
                                            className="flex-1 bg-black text-white px-4 py-3.5 rounded-lg font-bold tracking-widest uppercase text-xs md:text-sm hover:bg-[#B7A0BA] transition-all active:scale-95 shadow-lg shadow-black/5"
                                        >
                                            Next
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => setReviewStep(3)}
                                        className="w-full text-center text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:text-[#5D4037] mt-3 transition-colors"
                                    >
                                        Skip this step
                                    </button>
                                </div>
                            )}

                            {reviewStep === 3 && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Review Title</label>
                                        <input
                                            type="text"
                                            value={reviewTitle}
                                            onChange={(e) => setReviewTitle(e.target.value)}
                                            placeholder="Summary of your experience"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm md:text-base focus:ring-[#8D6E63] focus:border-[#8D6E63] transition-all bg-gray-50/30"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Your Review</label>
                                        <textarea
                                            rows="4"
                                            value={reviewComment}
                                            onChange={(e) => setReviewComment(e.target.value)}
                                            placeholder="Tell us what you liked or disliked..."
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm md:text-base focus:ring-[#8D6E63] focus:border-[#8D6E63] resize-none transition-all bg-gray-50/30"
                                        ></textarea>
                                        <p className="text-[10px] text-gray-400 mt-2 italic px-1">* At least one field (Rating, Title, or Comment) must be provided.</p>
                                    </div>
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            onClick={() => setReviewStep(2)}
                                            className="flex-1 px-4 py-3.5 border border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleReviewSubmit}
                                            disabled={!reviewTitle.trim() && !reviewComment.trim() && rating === 0}
                                            className={`flex-1 text-white px-4 py-3.5 rounded-lg transition-all font-bold tracking-widest uppercase text-xs md:text-sm ${(!reviewTitle.trim() && !reviewComment.trim() && rating === 0) ? 'bg-gray-300 cursor-not-allowed shadow-none' : 'bg-black hover:bg-[#B7A0BA] shadow-lg shadow-black/10'}`}
                                        >
                                            Submit
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
