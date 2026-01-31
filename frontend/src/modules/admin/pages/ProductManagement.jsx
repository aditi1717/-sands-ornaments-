import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Edit2, Trash2, Eye, Package, TrendingUp, Check } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import { useShop } from '../../../context/ShopContext';
import BulkUpdateModal from '../components/BulkUpdateModal';

const ProductManagement = () => {
    const navigate = useNavigate();
    const { products, deleteProduct, bulkUpdatePrices } = useShop();
    const [searchParams] = useSearchParams();
    const isSelectMode = searchParams.get('selectMode') === 'true';
    const returnUrl = searchParams.get('returnUrl') || '/admin/products';

    const [searchTerm, setSearchTerm] = useState('');
    const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedIds, setSelectedIds] = useState([]);

    const toggleSelection = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
        );
    };

    const handleConfirmSelection = () => {
        const selectedProducts = products.filter(p => selectedIds.includes(p.id));
        localStorage.setItem('temp_selected_products', JSON.stringify(selectedProducts));
        navigate(returnUrl);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            // Logic placeholder
        }
    };

    const columns = [
        ...(isSelectMode ? [{
            header: '',
            render: (item) => (
                <div onClick={(e) => { e.stopPropagation(); toggleSelection(item.id); }} className="cursor-pointer">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${selectedIds.includes(item.id) ? 'bg-[#3E2723] border-[#3E2723] text-white' : 'border-gray-300 bg-white'}`}>
                        {selectedIds.includes(item.id) && <Check size={12} strokeWidth={3} />}
                    </div>
                </div>
            )
        }] : []),
        {
            header: 'Product',
            render: (item) => {
                // Support both old format (category/subcategory) and new format (categories array)
                const categories = item.categories || (item.category ? [{ category: item.category, subcategory: item.subcategory }] : []);

                return (
                    <div className="flex items-center gap-2 md:gap-4 text-gray-700">
                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden shrink-0 shadow-sm">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                            <p className="font-bold text-gray-800 tracking-tight text-[10px] md:text-sm truncate">{item.name}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {categories.map((cat, idx) => (
                                    <span key={idx} className="text-[7px] md:text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-none bg-gray-50 px-1.5 py-0.5 rounded">
                                        {cat.category}{cat.subcategory ? ` › ${cat.subcategory}` : ''}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }
        },
        {
            header: 'Price',
            render: (item) => {
                const firstVariant = item.variants && item.variants[0];
                return (
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-800">₹{firstVariant?.price || '0'}</span>
                        {item.variants?.length > 1 && (
                            <span className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter">
                                +{item.variants.length - 1} more variants
                            </span>
                        )}
                    </div>
                );
            }
        },
        {
            header: 'Inventory',
            render: (item) => {
                const totalStock = (item.variants || []).reduce((sum, v) => sum + (v.stock || 0), 0);
                const totalSold = (item.variants || []).reduce((sum, v) => sum + (v.sold || 0), 0);

                return (
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${totalStock === 0 ? 'bg-gray-100 text-gray-500 border-gray-200' :
                                totalStock < 10 ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                    'bg-emerald-50 text-emerald-700 border-emerald-100'
                                }`}>
                                Left: {totalStock}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                                Sold: {totalSold}
                            </span>
                        </div>
                    </div>
                );
            }
        },
        {
            header: 'Status',
            render: (item) => {
                const isActive = item.active !== false;
                return (
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isActive
                        ? 'bg-green-50 text-green-700 border border-green-100'
                        : 'bg-red-50 text-red-700 border border-red-100'
                        }`}>
                        {isActive ? 'Active' : 'Hidden'}
                    </span>
                );
            }
        },
        ...(!isSelectMode ? [{
            header: 'Actions',
            align: 'right',
            render: (item) => (
                <div className="flex items-center justify-end gap-1 md:gap-2">
                    <button
                        onClick={() => navigate(`/admin/products/view/${item.id}`)}
                        className="p-1.1 md:p-2 text-gray-400 hover:text-[#8D6E63] hover:bg-[#8D6E63]/5 rounded-lg transition-all"
                        title="View Details"
                    >
                        <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                    <button
                        onClick={() => navigate(`/admin/products/edit/${item.id}`)}
                        className="p-1.5 md:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit"
                    >
                        <Edit2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                    <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 md:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete"
                    >
                        <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                </div>
            )
        }] : [])
    ];

    const filters = [
        {
            options: [
                { label: 'All Categories', value: 'all' },
                { label: 'Necklaces', value: 'necklaces' },
                { label: 'Rings', value: 'rings' },
                { label: 'Earrings', value: 'earrings' },
                { label: 'Bangles', value: 'bangles' }
            ],
            onChange: (val) => setSelectedCategory(val)
        }
    ];

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());

        // Support both old format (category) and new format (categories array)
        const categories = p.categories || (p.category ? [{ category: p.category, subcategory: p.subcategory }] : []);
        const matchesCategory = selectedCategory === 'all' || categories.some(cat => cat.category === selectedCategory);

        return matchesSearch && matchesCategory;
    });

    const handleBulkApply = (config) => {
        // config already contains productIds selected in the modal
        bulkUpdatePrices({
            category: selectedCategory,
            ...config
        });
    };

    return (
        <div className="max-w-[1400px] mx-auto space-y-4 md:space-y-6 pb-20 animate-in fade-in duration-500 relative">
            <PageHeader
                title={isSelectMode ? "Select Products" : "Products"}
                subtitle={isSelectMode ? `Select products to add to showcase (${selectedIds.length} selected)` : "Manage your inventory, pricing, and product details."}
                action={!isSelectMode ? {
                    label: "Add New Product",
                    onClick: () => navigate('/admin/products/new')
                } : undefined}
            />

            <DataTable
                columns={columns}
                data={filteredProducts}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchPlaceholder="Search products by name..."
                filters={filters}
            >
                {!isSelectMode && (
                    <button
                        onClick={() => setIsBulkModalOpen(true)}
                        className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold text-gray-600 hover:bg-[#3E2723] hover:text-white hover:border-[#3E2723] transition-all flex items-center gap-2 shrink-0"
                        title="Bulk Update Prices"
                    >
                        <TrendingUp size={14} />
                        <span className="hidden md:inline">Bulk Actions</span>
                        <span className="md:hidden">Bulk</span>
                    </button>
                )}
            </DataTable>

            {isSelectMode && selectedIds.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#3E2723] text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-4 z-50 animate-in slide-in-from-bottom-5">
                    <span className="font-bold text-sm">{selectedIds.length} Products Selected</span>
                    <button
                        onClick={handleConfirmSelection}
                        className="bg-white text-[#3E2723] px-4 py-1.5 rounded-full text-xs font-bold hover:bg-gray-100 transition-colors"
                    >
                        Confirm Selection
                    </button>
                </div>
            )}

            <BulkUpdateModal
                isOpen={isBulkModalOpen}
                onClose={() => setIsBulkModalOpen(false)}
                onApply={handleBulkApply}
                products={filteredProducts}
            />
        </div>
    );
};

export default ProductManagement;
