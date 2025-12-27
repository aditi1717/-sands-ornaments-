import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Upload, X, Save, Plus, ChevronRight } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { FormSection, Input, Select, TextArea } from '../components/common/FormControls';

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
        tags: {
            isNewArrival: false,
            isTrending: false,
            isFeatured: false
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
                tags: {
                    isNewArrival: true,
                    isTrending: true,
                    isFeatured: false
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
                        <FormSection title="Visual Gallery (Max 5)">
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
                                {formData.images.length < 5 && (
                                    <label className="aspect-square rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#3E2723] hover:bg-[#3E2723]/5 transition-all group">
                                        <Upload className="w-5 h-5 text-gray-300 group-hover:text-[#3E2723]" />
                                        <span className="text-[9px] font-bold text-gray-400 mt-1">Add Shot</span>
                                        <input type="file" multiple className="hidden" onChange={handleImageUpload} accept="image/*" />
                                    </label>
                                )}
                            </div>
                        </FormSection>

                        {isProduct && (
                            <>
                                <FormSection title="Discovery & Tags">
                                    <div className="space-y-3">
                                        {[
                                            { key: 'isNewArrival', label: 'New Arrival', color: 'bg-blue-600' },
                                            { key: 'isTrending', label: 'Trending Item', color: 'bg-amber-600' },
                                            { key: 'isFeatured', label: 'Featured Choice', color: 'bg-[#3E2723]' }
                                        ].map(tag => (
                                            <div key={tag.key} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                                                <span className="text-[11px] font-bold text-gray-700">{tag.label}</span>
                                                <button
                                                    onClick={() => setFormData({
                                                        ...formData,
                                                        tags: { ...formData.tags, [tag.key]: !formData.tags[tag.key] }
                                                    })}
                                                    className={`w-9 h-5 rounded-full transition-colors relative ${formData.tags[tag.key] ? tag.color : 'bg-gray-300'}`}
                                                >
                                                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.tags[tag.key] ? 'right-1' : 'left-1'}`} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </FormSection>

                                <FormSection title="Size Availability">
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
                                </FormSection>

                                <FormSection title="Supplier Reference">
                                    <div className="space-y-4">
                                        <Input
                                            label="Vendor / Source"
                                            value={formData.supplierInfo}
                                            onChange={(e) => setFormData({ ...formData, supplierInfo: e.target.value })}
                                            placeholder="Internal reference..."
                                        />
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider px-1">
                                            * PRIVATE DATA
                                        </p>
                                    </div>
                                </FormSection>
                            </>
                        )}
                    </div>

                    {/* Primary Content Column (Spans 8) */}
                    <div className="lg:col-span-8 space-y-6">
                        <FormSection title="Core Information" className="space-y-6">
                            <Input
                                label="Product Title"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. 925 Silver Solitaire Ring"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Select
                                    label="Primary Collection"
                                    value={formData.parentId}
                                    onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                                    options={[
                                        { label: 'Select Category...', value: '' },
                                        ...categories.map(c => ({ label: c.name, value: c.id }))
                                    ]}
                                />
                                {isProduct && (
                                    <Select
                                        label="Select Subtype"
                                        value={formData.subCategoryId}
                                        onChange={(e) => setFormData({ ...formData, subCategoryId: e.target.value })}
                                        options={[
                                            { label: 'Select Subcategory...', value: '' },
                                            ...subcategories.filter(s => s.parentId === formData.parentId).map(s => ({ label: s.name, value: s.id }))
                                        ]}
                                    />
                                )}
                            </div>
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-6">
                                    <Input
                                        label="Metal / Material"
                                        value={formData.material}
                                        onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                                        placeholder="e.g. 925 Silver"
                                    />
                                    <Input
                                        label="Stock Inventory"
                                        type="number"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        placeholder="Quantity"
                                    />
                                </div>
                            </FormSection>
                        )}

                        {isProduct && (
                            <FormSection title="Detailed Specifications">
                                <TextArea
                                    label="Technical Details"
                                    value={formData.specifications}
                                    onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                                    placeholder="e.g. Weight: 4.5g, Purity: 92.5%, Stone: Cubic Zirconia..."
                                    rows={4}
                                />
                            </FormSection>
                        )}

                        <FormSection title="Product Narrative & Description">
                            <TextArea
                                label="Public Story & Features"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Tell the story behind this jewelry piece..."
                                rows={6}
                            />
                        </FormSection>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemEditor;
