import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, ListTree, Eye } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';

const SubcategoryManagement = () => {
    const navigate = useNavigate();
    const [subcategories, setSubcategories] = useState([
        { id: 1, name: 'Solitaire', parentName: 'Rings', count: 42, status: 'Active' },
        { id: 2, name: 'Band', parentName: 'Rings', count: 28, status: 'Active' },
        { id: 3, name: 'Crystal Drop', parentName: 'Earrings', count: 35, status: 'Active' },
        { id: 4, name: 'Hoops', parentName: 'Earrings', count: 18, status: 'Hidden' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this subcategory?')) {
            setSubcategories(subcategories.filter(sub => sub.id !== id));
        }
    };

    const columns = [
        {
            header: 'Subcategory',
            render: (item) => <span className="font-bold text-gray-800">{item.name}</span>
        },
        {
            header: 'Parent Category',
            render: (item) => <span className="text-gray-500 font-medium">{item.parentName}</span>
        },
        {
            header: 'Products',
            render: (item) => <span className="text-gray-400 font-medium">{item.count} Items</span>
        },
        {
            header: 'Status',
            render: (item) => (
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === 'Active'
                    ? 'bg-green-50 text-green-700 border border-green-100'
                    : 'bg-gray-100 text-gray-500 border border-gray-200'
                    }`}>
                    {item.status}
                </span>
            )
        },
        {
            header: 'Actions',
            align: 'right',
            render: (item) => (
                <div className="flex items-center justify-end gap-2 text-gray-700">
                    <button
                        onClick={() => navigate(`/admin/subcategories/edit/${item.id}`)}
                        className="p-2 text-gray-400 hover:text-[#8D6E63] hover:bg-[#8D6E63]/5 rounded-lg transition-all"
                        title="View Linked Products"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => navigate(`/admin/subcategories/edit/${item.id}`)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Subcategory Management"
                subtitle="Manage nested groupings like Styles or Materials under main categories."
                action={{
                    label: "Add Subcategory",
                    onClick: () => navigate('/admin/subcategories/new')
                }}
            />

            <DataTable
                columns={columns}
                data={subcategories.filter(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()))}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchPlaceholder="Search subcategories..."
            />
        </div>
    );
};

export default SubcategoryManagement;
