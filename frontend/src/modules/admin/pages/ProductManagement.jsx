import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, Eye, Package } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';

const ProductManagement = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([
        { id: 1, name: 'Solitaire Diamond Ring', category: 'Rings', subcategory: 'Solitaire', price: '₹45,000', stock: 15, status: 'Active', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100&h=100&fit=crop' },
        { id: 2, name: 'Gold Hoop Earrings', category: 'Earrings', subcategory: 'Hoops', price: '₹12,500', stock: 24, status: 'Active', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100&h=100&fit=crop' },
        { id: 3, name: 'Silver Chain Necklace', category: 'Necklaces', subcategory: 'Chains', price: '₹3,200', stock: 8, status: 'Active', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=100&h=100&fit=crop' },
        { id: 4, name: 'Floral Bangle', category: 'Bracelets', subcategory: 'Bangles', price: '₹8,900', stock: 0, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1520e?w=100&h=100&fit=crop' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const columns = [
        {
            header: 'Product',
            render: (item) => (
                <div className="flex items-center gap-2 md:gap-4 text-gray-700">
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden shrink-0 shadow-sm">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                        <p className="font-bold text-gray-800 tracking-tight text-[10px] md:text-sm truncate">{item.name}</p>
                        <p className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-0.5">{item.category} › {item.subcategory}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Price',
            render: (item) => <span className="font-bold text-gray-800">{item.price}</span>
        },
        {
            header: 'Stock',
            render: (item) => (
                <span className={`font-bold ${item.stock < 10 ? 'text-amber-600' : 'text-gray-500'}`}>
                    {item.stock} Units
                </span>
            )
        },
        {
            header: 'Status',
            render: (item) => (
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === 'Active'
                    ? 'bg-green-50 text-green-700 border border-green-100'
                    : 'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                    {item.status}
                </span>
            )
        },
        {
            header: 'Actions',
            align: 'right',
            render: (item) => (
                <div className="flex items-center justify-end gap-1 md:gap-2">
                    <button
                        onClick={() => navigate(`/admin/products/view/${item.id}`)}
                        className="p-1.5 md:p-2 text-gray-400 hover:text-[#8D6E63] hover:bg-[#8D6E63]/5 rounded-lg transition-all"
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
        }
    ];

    const filters = [
        {
            options: [
                { label: 'All Categories', value: 'all' },
                { label: 'Rings', value: 'rings' },
                { label: 'Earrings', value: 'earrings' }
            ],
            onChange: (val) => console.log('Filter by category:', val)
        },
        {
            options: [
                { label: 'All Status', value: 'all' },
                { label: 'Active', value: 'active' },
                { label: 'Out of Stock', value: 'oos' }
            ],
            onChange: (val) => console.log('Filter by status:', val)
        }
    ];

    return (
        <div className="max-w-[1400px] mx-auto space-y-4 md:space-y-6 pb-20 animate-in fade-in duration-500">
            <PageHeader
                title="Product Management"
                subtitle="Manage your inventory, pricing, and jewelry details."
                action={{
                    label: "Add New Product",
                    onClick: () => navigate('/admin/products/new')
                }}
            />

            <DataTable
                columns={columns}
                data={products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchPlaceholder="Search products by name or SKU..."
                filters={filters}
            />
        </div>
    );
};

export default ProductManagement;
