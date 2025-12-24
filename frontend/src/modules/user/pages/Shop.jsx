import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../assets/data'; // Import categories to map paths
import { Filter, ChevronDown } from 'lucide-react';
import { useLocation, useParams } from 'react-router-dom';

const Shop = () => {
    const location = useLocation();
    const { category } = useParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false); // State for Sidebar
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedSubCategory, setSelectedSubCategory] = useState(null); // New State for Subcategory
    const [priceRange, setPriceRange] = useState(10000); // Mock max price
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [pageTitle, setPageTitle] = useState('All Jewellery');

    // Effect to handle URL-based Logic + Local Category Filter
    useEffect(() => {
        const path = location.pathname;
        let baseProducts = products;
        let title = 'All Jewellery';

        // 1. Determine Base Products & Title from URL
        if (path === '/new-arrivals') {
            title = 'New Arrivals';
            baseProducts = products.filter(p => p.isNew);
        } else if (path === '/trending') {
            title = 'Trending Now';
            baseProducts = products.filter(p => p.rating >= 4.5);
        } else if (category) {
            const currentCat = categories.find(c => c.path === category);
            title = currentCat ? currentCat.name : category.charAt(0).toUpperCase() + category.slice(1);
            baseProducts = products.filter(p => p.category.toLowerCase() === category.toLowerCase() || (currentCat && p.category === currentCat.name));
        }

        setPageTitle(title);

        let result = baseProducts;

        // 2. Apply Local Category Filter (if selected)
        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);

            // 2.1 Apply Subcategory Filter
            if (selectedSubCategory) {
                // Assuming product names or descriptions usually contain the subcategory type for matching 
                // OR in a real app, products would have a 'subcategory' field.
                // For this demo, we'll try to match exact string if possible, or fuzzy match if product has that property.
                // Since data.js products don't specifically have 'subcategory' field, we might match name string roughly?
                // Wait, looking at data.js, products don't have subcategory field.
                // However, `data.js` structure has subcategories with specific names.
                // Let's assume for now we filter by checking if product NAME contains the subcategory name (e.g. "Solitaire").
                result = result.filter(p => p.name.includes(selectedSubCategory));
            }
        }

        // 3. Apply Price Filter
        result = result.filter(p => p.price <= priceRange);

        setFilteredProducts(result);

    }, [location, category, selectedCategory, selectedSubCategory, priceRange]);

    // Handle Category Change to reset subcategory
    const handleCategoryChange = (val) => {
        setSelectedCategory(val);
        setSelectedSubCategory(null);
    };

    return (
        <div className="bg-[#FDFBF7] min-h-screen relative">
            <div className="container mx-auto px-4 py-8">
                {/* Header Section - Single Row: Title Left, Filter Button Right */}
                <div className="sticky top-[77px] md:top-[141px] z-30 bg-[#FDFBF7] pt-4 flex flex-col md:flex-row justify-between items-end mb-10 pb-6 border-b border-[#EFEBE9] gap-4 transition-all duration-300">
                    <div className="text-left">
                        <h1 className="text-4xl font-serif font-medium text-[#5D4037]">{pageTitle}</h1>
                        <p className="text-gray-500 mt-2 font-serif text-sm italic">{filteredProducts.length} Products Found</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <select
                                className="appearance-none bg-transparent border-b border-[#D7CCC8] py-2 pr-8 pl-2 text-[#5D4037] text-sm font-medium focus:outline-none cursor-pointer hover:border-[#8D6E63] transition-colors"
                            >
                                <option>Sort by: Newest</option>
                                <option>Price: High to Low</option>
                                <option>Price: Low to High</option>
                                <option>Best Selling</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-[#8D6E63] absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        </div>

                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="flex items-center gap-2 border border-[#D7CCC8] px-6 py-2.5 rounded-full hover:bg-[#8D6E63] hover:text-white hover:border-[#8D6E63] hover:shadow-md transition-all text-[#5D4037] text-sm font-medium bg-white/50"
                        >
                            <Filter className="w-4 h-4" />
                            <span>Filter</span>
                        </button>
                    </div>
                </div>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <h3 className="text-2xl font-serif text-[#5D4037] mb-2">No products found</h3>
                        <p className="text-[#8D6E63]">Try adjusting your filters.</p>
                        <button onClick={() => { setSelectedCategory('All'); setSelectedSubCategory(null); setPriceRange(10000); }} className="mt-4 underline text-gray-500 hover:text-[#5D4037]">Clear all filters</button>
                    </div>
                )}
            </div>

            {/* Filter Sidebar Drawer */}
            {/* Overlay */}
            {isFilterOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm transition-opacity"
                    onClick={() => setIsFilterOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-[320px] bg-[#FDFBF7] z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-[#EFEBE9] ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-6 border-b border-[#EFEBE9]">
                        <h3 className="text-xl font-serif text-[#5D4037]">Filters</h3>
                        <button onClick={() => setIsFilterOpen(false)} className="text-gray-400 hover:text-[#5D4037]">
                            <ChevronDown className="w-6 h-6 rotate-90" /> {/* Using Chevron as Close Icon approximation or could import X */}
                        </button>
                    </div>

                    {/* Sidebar Content */}
                    <div className="p-6 flex-1 overflow-y-auto space-y-8">

                        {/* 1. Category Filter */}
                        <div>
                            <h4 className="font-bold text-[#8D6E63] text-sm uppercase tracking-wider mb-4">Category</h4>
                            <div className="space-y-3">
                                <label className="flex items-center space-x-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="category"
                                        value="All"
                                        checked={selectedCategory === 'All'}
                                        onChange={(e) => handleCategoryChange(e.target.value)}
                                        className="form-radio text-[#8D6E63] focus:ring-[#8D6E63] h-4 w-4 border-gray-300"
                                    />
                                    <span className={`text-sm group-hover:text-[#5D4037] transition-colors ${selectedCategory === 'All' ? 'text-[#5D4037] font-medium' : 'text-gray-600'}`}>All Categories</span>
                                </label>
                                {categories.map(cat => (
                                    <div key={cat.id}>
                                        <label className="flex items-center space-x-3 cursor-pointer group mb-2">
                                            <input
                                                type="radio"
                                                name="category"
                                                value={cat.name}
                                                checked={selectedCategory === cat.name}
                                                onChange={(e) => handleCategoryChange(e.target.value)}
                                                className="form-radio text-[#8D6E63] focus:ring-[#8D6E63] h-4 w-4 border-gray-300"
                                            />
                                            <span className={`text-sm group-hover:text-[#5D4037] transition-colors ${selectedCategory === cat.name ? 'text-[#5D4037] font-medium' : 'text-gray-600'}`}>{cat.name}</span>
                                        </label>

                                        {/* Show Subcategories if Selected */}
                                        {selectedCategory === cat.name && cat.subcategories && (
                                            <div className="ml-7 space-y-2 border-l-2 border-[#EFEBE9] pl-3 animate-in slide-in-from-left-2 duration-300">
                                                {cat.subcategories.map(sub => (
                                                    <button
                                                        key={sub.name}
                                                        onClick={() => setSelectedSubCategory(sub.name === selectedSubCategory ? null : sub.name)}
                                                        className={`block text-xs text-left w-full hover:text-[#8D6E63] transition-colors ${selectedSubCategory === sub.name ? 'text-[#8D6E63] font-bold' : 'text-gray-500'}`}
                                                    >
                                                        {sub.name}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 2. Price Filter */}
                        <div>
                            <h4 className="font-bold text-[#8D6E63] text-sm uppercase tracking-wider mb-4">Max Price: ₹{priceRange.toLocaleString()}</h4>
                            <input
                                type="range"
                                min="500"
                                max="10000"
                                step="500"
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8D6E63]"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>₹500</span>
                                <span>₹10,000+</span>
                            </div>
                        </div>

                        {/* 3. Availability (Mock) */}
                        <div>
                            <h4 className="font-bold text-[#8D6E63] text-sm uppercase tracking-wider mb-4">Availability</h4>
                            <div className="space-y-3">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="checkbox" className="rounded border-gray-300 text-[#8D6E63] focus:ring-[#8D6E63]" defaultChecked />
                                    <span className="text-sm text-gray-600">In Stock</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="checkbox" className="rounded border-gray-300 text-[#8D6E63] focus:ring-[#8D6E63]" />
                                    <span className="text-sm text-gray-600">Out of Stock</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Footer */}
                    <div className="p-6 border-t border-[#EFEBE9] bg-[#FAFAFA]">
                        <button
                            onClick={() => { setSelectedCategory('All'); setPriceRange(10000); }}
                            className="w-full py-3 border border-[#D7CCC8] text-[#5D4037] font-medium rounded-lg hover:bg-white hover:shadow-sm transition-all text-sm mb-3"
                        >
                            Reset Filters
                        </button>
                        <button
                            onClick={() => setIsFilterOpen(false)}
                            className="w-full py-3 bg-[#5D4037] text-white font-medium rounded-lg hover:bg-[#4E342E] shadow-lg hover:shadow-xl transition-all text-sm"
                        >
                            View Results
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
