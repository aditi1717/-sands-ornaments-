import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Upload, X, Save, Plus, ChevronRight } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { FormSection, Input, Select, TextArea } from '../components/common/FormControls';

const CATEGORY_HIERARCHY = {
    'necklaces': ['Kundan', 'Oxidized', 'Gold Chain', 'Temple', 'Diamond', 'Choker', 'Pendant', 'Mangalsutra'],
    'rings': ['Solitaire', 'Gold Band', 'Diamond Ring', 'Engagement', 'Cocktail', 'Couple Rings'],
    'earrings': ['Studs', 'Jhumkas', 'Drops', 'Hoops', 'Sui Dhaga', 'Chandbali'],
    'bangles': ['Temple Jewellery', 'Gold Bangles', 'Bracelets', 'Kada', 'Cuff'],
    'anklets': ['Silver Anklets', 'Gold Anklets', 'Chain Anklets'],
    'sets': ['Bridal Sets', 'Party Wear', 'Minimal Sets'],
    'combos-packs': ['Office Wear', 'Gift Sets', 'Daily Wear'],
    'nose-pins': ['Gold', 'Diamond', 'Silver']
};

const ItemEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Determine context
    const isCategory = location.pathname.includes('/categories');
    const isSubcategory = location.pathname.includes('/subcategories');
    const isProduct = location.pathname.includes('/products');

    const resourceType = isCategory ? 'Category' : (isSubcategory ? 'Subcategory' : 'Product');
    const backPath = isCategory ? '/admin/categories' : (isSubcategory ? '/admin/subcategories' : '/admin/products');

    const isEditMode = Boolean(id);

    // Mock initial data for lists
    const [categories] = useState([
        { id: '1', name: 'Rings' },
        { id: '2', name: 'Earrings' },
        { id: '3', name: 'Necklaces' }
    ]);
    const [subcategories] = useState([
        { id: '1', name: 'Solitaire', parentId: '1' },
        { id: '2', name: 'Band', parentId: '1' },
        { id: '3', name: 'Hoops', parentId: '2' }
    ]);

    const [formData, setFormData] = useState({
        name: '',
        parentId: '',
        subCategoryId: '',
        description: '',
        showInCollection: true,
        showInNavbar: true,
        // Product Display Labels
        cardLabel: '',
        cardBadge: '',
        // Product Specific Fields
        material: '925 Silver',
        specifications: '', // New field
        supplierInfo: '',  // New field
        originalPrice: '',
        sellingPrice: '',
        discount: 0,
        stock: '',
        status: 'Active',
        images: [], // Multiple images
        sizes: [], // Selected sizes
        variantStock: {}, // Stock per variant
        categories: [{ id: Date.now(), category: '', subcategory: '' }], // Multiple categories for product
        tags: {
            isNewArrival: false,
            isMostGifted: false,
            isNewLaunch: false
        }
    });

    const sizeOptions = isProduct ? [
        '5', '6', '7', '8', '9', '10', '2.2', '2.4', '2.6', 'Adjustable'
    ] : [];

    // Auto-calculate discount
    useEffect(() => {
        if (isProduct && formData.originalPrice && formData.sellingPrice) {
            const original = parseFloat(formData.originalPrice);
            const selling = parseFloat(formData.sellingPrice);
            if (original > selling) {
                const disc = Math.round(((original - selling) / original) * 100);
                setFormData(prev => ({ ...prev, discount: disc }));
            } else {
                setFormData(prev => ({ ...prev, discount: 0 }));
            }
        }
    }, [formData.originalPrice, formData.sellingPrice, isProduct]);

    useEffect(() => {
        if (isEditMode) {
            // Mock fetching existing data
            setFormData({
                name: isCategory ? 'Earrings' : (isSubcategory ? 'Solitaire' : 'Classic Diamond Solitaire'),
                parentId: '1',
                subCategoryId: isProduct ? '1' : '',
                description: 'A masterpiece created with precision and care, representing timeless beauty.',
                cardLabel: '9 TO 5 SILVER JEWELLERY',
                cardBadge: 'NEW',
                material: '925 Sterling Silver',
                specifications: 'Weight: 4.5g, Purity: 92.5%, Stone: Cubic Zirconia',
                supplierInfo: 'Everlast Jewelry Wholesalers',
                originalPrice: '5000',
                sellingPrice: '3999',
                discount: 20,
                stock: '25',
                status: 'Active',
                images: [
                    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop'
                ],
                sizes: ['7', '8', 'Adjustable'],
                variantStock: { '7': 10, '8': 15, 'Adjustable': 5 },
                tags: {
                    isNewArrival: true,
                    isMostGifted: true,
                    isNewLaunch: false
                }
            });
        }
    }, [id, isEditMode, isCategory, isSubcategory, isProduct]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...newImages].slice(0, 5) // Limit to 5
        }));
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const toggleSize = (size) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }));
    };

    // Category Management for Products
    const addCategory = () => {
        setFormData(prev => ({
            ...prev,
            categories: [...prev.categories, { id: Date.now(), category: '', subcategory: '' }]
        }));
    };

    const removeCategory = (id) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.filter(c => c.id !== id)
        }));
    };

    const handleCategoryChange = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.map(c => {
                if (c.id === id) {
                    if (field === 'category') {
                        return { ...c, category: value, subcategory: '' }; // Reset subcategory on category change
                    }
                    return { ...c, [field]: value };
                }
                return c;
            })
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`${resourceType} saved successfully!`);
        navigate(backPath);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="max-w-[1400px] mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 p-6 md:p-8">
                <PageHeader
                    title={isEditMode ? `Edit ${resourceType}` : `Create New ${resourceType}`}
                    subtitle={isEditMode ? `ID: ${id || 'N/A'}` : `Setup your new ${resourceType.toLowerCase()} details`}
                    backPath={backPath}
                    action={{
                        label: isEditMode ? 'Save Changes' : `Publish ${resourceType}`,
                        onClick: handleSubmit
                    }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Side/Utility Column (Spans 4) */}
                    <div className="lg:col-span-4 space-y-6">
                        <FormSection title={isProduct ? "Visual Gallery (Max 5)" : "Cover Image"}>
                            <div className="grid grid-cols-2 gap-3">
                                {formData.images.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-gray-100 shadow-sm">
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                                {formData.images.length < (isProduct ? 5 : 1) && (
                                    <label className="aspect-square rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#3E2723] hover:bg-[#3E2723]/5 transition-all group">
                                        <Upload className="w-5 h-5 text-gray-300 group-hover:text-[#3E2723]" />
                                        <span className="text-[9px] font-bold text-gray-400 mt-1">Add Shot</span>
                                        <input type="file" multiple={isProduct} className="hidden" onChange={handleImageUpload} accept="image/*" />
                                    </label>
                                )}
                            </div>
                        </FormSection>

                        {isProduct && (
                            <>
                                <FormSection title="Card Display Labels">
                                    <div className="space-y-4">
                                        <Input
                                            label="Top Label (Left)"
                                            value={formData.cardLabel}
                                            onChange={(e) => setFormData({ ...formData, cardLabel: e.target.value })}
                                            placeholder="e.g. 9 TO 5 SILVER JEWELLERY"
                                        />
                                        <Input
                                            label="Corner Badge (Right)"
                                            value={formData.cardBadge}
                                            onChange={(e) => setFormData({ ...formData, cardBadge: e.target.value })}
                                            placeholder="e.g. NEW"
                                        />
                                    </div>
                                </FormSection>



                                <FormSection title="Size Availability">
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap gap-2">
                                            {sizeOptions.map(size => (
                                                <button
                                                    key={size}
                                                    onClick={() => toggleSize(size)}
                                                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border ${formData.sizes.includes(size)
                                                        ? 'bg-[#3E2723] text-white border-[#3E2723] shadow-md'
                                                        : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>

                                        {formData.sizes.length > 0 && (
                                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 animate-in fade-in slide-in-from-top-2">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-1 h-4 bg-[#3E2723] rounded-full"></div>
                                                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Variant Stock Allocation</h4>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {formData.sizes.map(size => (
                                                        <div key={size} className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-md bg-[#3E2723]/10 text-[#3E2723] flex items-center justify-center text-xs font-bold shrink-0">
                                                                {size}
                                                            </div>
                                                            <div className="flex-1">
                                                                <label className="text-[9px] font-bold text-gray-400 block mb-0.5 uppercase">Quantity</label>
                                                                <input
                                                                    type="number"
                                                                    placeholder="0"
                                                                    className="w-full text-sm font-semibold text-gray-800 outline-none placeholder-gray-300"
                                                                    value={formData.variantStock[size] || ''}
                                                                    onChange={(e) => setFormData(prev => ({
                                                                        ...prev,
                                                                        variantStock: {
                                                                            ...prev.variantStock,
                                                                            [size]: e.target.value
                                                                        }
                                                                    }))}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </FormSection>


                            </>
                        )}
                    </div>

                    {/* Primary Content Column (Spans 8) */}
                    <div className="lg:col-span-8 space-y-6">
                        <FormSection title="Core Information" className="space-y-6">
                            <Input
                                label={isCategory ? "Category Name" : (isSubcategory ? "Subcategory Name" : "Product Title")}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder={isCategory ? "e.g. Rings" : (isSubcategory ? "e.g. Solitaire" : "e.g. 925 Silver Solitaire Ring")}
                            />

                            {isCategory && (
                                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                    <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all flex-1 ${formData.showInCollection
                                        ? 'border-[#8D6E63] bg-[#8D6E63]/5 ring-1 ring-[#8D6E63]/20'
                                        : 'border-gray-200 hover:border-[#8D6E63]/30 hover:bg-gray-50'
                                        }`}>
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.showInCollection
                                            ? 'bg-[#8D6E63] border-[#8D6E63]'
                                            : 'bg-white border-gray-300'
                                            }`}>
                                            {formData.showInCollection && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={formData.showInCollection}
                                            onChange={(e) => setFormData({ ...formData, showInCollection: e.target.checked })}
                                            className="hidden"
                                        />
                                        <span className={`text-sm font-medium ${formData.showInCollection ? 'text-[#3E2723]' : 'text-gray-700'}`}>Show in Collection</span>
                                    </label>

                                    <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all flex-1 ${formData.showInNavbar
                                        ? 'border-[#8D6E63] bg-[#8D6E63]/5 ring-1 ring-[#8D6E63]/20'
                                        : 'border-gray-200 hover:border-[#8D6E63]/30 hover:bg-gray-50'
                                        }`}>
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.showInNavbar
                                            ? 'bg-[#8D6E63] border-[#8D6E63]'
                                            : 'bg-white border-gray-300'
                                            }`}>
                                            {formData.showInNavbar && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={formData.showInNavbar}
                                            onChange={(e) => setFormData({ ...formData, showInNavbar: e.target.checked })}
                                            className="hidden"
                                        />
                                        <span className={`text-sm font-medium ${formData.showInNavbar ? 'text-[#3E2723]' : 'text-gray-700'}`}>Show in Navbar</span>
                                    </label>
                                </div>
                            )}

                            {isSubcategory && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Select
                                        label="Parent Category"
                                        value={formData.parentId}
                                        onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                                        options={[
                                            { label: 'Select Category...', value: '' },
                                            ...categories.map(c => ({ label: c.name, value: c.id }))
                                        ]}
                                    />
                                </div>
                            )}

                            {isProduct && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="block ml-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Product Categories</label>
                                        <button
                                            type="button"
                                            onClick={addCategory}
                                            className="text-[10px] font-bold text-[#3E2723] uppercase tracking-wider flex items-center gap-1 hover:underline"
                                        >
                                            <Plus size={14} /> Add Category
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {formData.categories.map((cat, index) => (
                                            <div key={cat.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200 relative group animate-in fade-in slide-in-from-top-2">
                                                <div className="flex gap-4">
                                                    <div className="flex-1 space-y-1.5">
                                                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Parent Category</label>
                                                        <select
                                                            value={cat.category}
                                                            onChange={(e) => handleCategoryChange(cat.id, 'category', e.target.value)}
                                                            className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm font-medium outline-none focus:border-[#3E2723] focus:ring-1 focus:ring-[#3E2723]/20 transition-all"
                                                        >
                                                            <option value="">Select Category...</option>
                                                            {Object.keys(CATEGORY_HIERARCHY).map(key => (
                                                                <option key={key} value={key}>
                                                                    {key.charAt(0).toUpperCase() + key.slice(1).replace('-', ' ')}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="flex-1 space-y-1.5">
                                                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Sub-Category</label>
                                                        <select
                                                            value={cat.subcategory}
                                                            onChange={(e) => handleCategoryChange(cat.id, 'subcategory', e.target.value)}
                                                            disabled={!cat.category}
                                                            className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm font-medium outline-none focus:border-[#3E2723] focus:ring-1 focus:ring-[#3E2723]/20 transition-all disabled:bg-gray-100 disabled:text-gray-400"
                                                        >
                                                            <option value="">Select Sub-Category...</option>
                                                            {cat.category && CATEGORY_HIERARCHY[cat.category]?.map(sub => (
                                                                <option key={sub} value={sub}>{sub}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                {formData.categories.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeCategory(cat.id)}
                                                        className="absolute -top-2 -right-2 p-1.5 bg-white text-gray-400 hover:text-red-500 border border-gray-200 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </FormSection>

                        {isProduct && (
                            <FormSection title="Specifications & Pricing" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Input
                                        label="Original Price (₹)"
                                        type="number"
                                        value={formData.originalPrice}
                                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                                        placeholder="5000"
                                    />
                                    <Input
                                        label="Offer Price (₹)"
                                        type="number"
                                        value={formData.sellingPrice}
                                        onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
                                        placeholder="3999"
                                    />
                                    <div className="space-y-1.5">
                                        <label className="block ml-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Computed Discount</label>
                                        <div className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-4 text-sm font-bold text-[#3E2723] flex items-center justify-between shadow-sm">
                                            <span className="text-[10px] text-gray-400">OFFER:</span>
                                            <span>{formData.discount}% OFF</span>
                                        </div>
                                    </div>
                                </div>


                            </FormSection>
                        )}



                        {isProduct && (
                            <FormSection title="Product Narrative & Description">
                                <TextArea
                                    label="Public Story & Features"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Tell the story behind this jewelry piece..."
                                    rows={6}
                                />
                            </FormSection>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemEditor;
