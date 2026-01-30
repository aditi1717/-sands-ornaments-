import React, { useState, useMemo } from 'react';
import {
    Plus,
    Ticket,
    Calendar,
    Users,
    Activity,
    Clock,
    Percent,
    Edit2,
    Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../../../context/ShopContext';
import Pagination from '../components/Pagination';
import DataTable from '../components/common/DataTable';

const CouponListPage = () => {
    const navigate = useNavigate();
    const { coupons, deleteCoupon } = useShop();

    // No local state for coupons, reading from Context directly


    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const filteredCoupons = useMemo(() => {
        return (coupons || [])
            .filter(c => {
                const desc = c.description || c.desc || '';
                return (
                    c.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    desc.toLowerCase().includes(searchTerm.toLowerCase())
                );
            })
            .sort((a, b) => b.id?.localeCompare(a.id) || 0);
    }, [coupons, searchTerm]);

    const paginatedCoupons = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredCoupons.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredCoupons, currentPage]);

    const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this coupon?')) {
            deleteCoupon(id);
        }
    };

    const getCouponStatus = (coupon) => {
        const now = new Date();
        if (!coupon.active) return { label: 'Inactive', color: 'bg-gray-100 text-gray-400 border-gray-200' };
        if (coupon.validUntil && new Date(coupon.validUntil) < now) return { label: 'Expired', color: 'bg-red-50 text-red-600 border-red-100' };
        if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) return { label: 'Limit Reached', color: 'bg-amber-50 text-amber-600 border-amber-100' };
        return { label: 'Active', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' };
    };

    const columns = [
        {
            header: 'Coupon Details',
            render: (coupon) => {
                const desc = coupon.desc || coupon.description;
                return (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/5 text-primary rounded-lg flex items-center justify-center font-medium border border-primary/10 shrink-0">
                            <Ticket size={14} strokeWidth={2} />
                        </div>
                        <div>
                            <p className="font-bold text-gray-800 text-xs tracking-wide">{coupon.code}</p>
                            <p className="text-[9px] text-gray-400 mt-0.5 max-w-[150px] truncate">{desc}</p>
                        </div>
                    </div>
                );
            }
        },
        {
            header: 'Discount',
            render: (coupon) => {
                const amount = coupon.amount !== undefined ? coupon.amount : coupon.value;
                const minOrder = coupon.minOrder !== undefined ? coupon.minOrder : coupon.minOrderValue;
                return (
                    <div>
                        <div className="flex items-center gap-1.5 font-bold text-gray-800 text-xs">
                            <Percent size={10} className="text-emerald-500" />
                            {coupon.type === 'percentage' ? `${amount}%` : `₹${amount}`} OFF
                        </div>
                        <p className="text-[9px] text-gray-400 mt-0.5">Min Order: ₹{minOrder}</p>
                    </div>
                );
            }
        },
        {
            header: 'Validity',
            render: (coupon) => (
                <div>
                    <p className="text-[10px] font-medium text-gray-700">Ends {new Date(coupon.validUntil).toLocaleDateString()}</p>
                    <p className="text-[9px] text-gray-400 mt-0.5">Starts {new Date(coupon.validFrom).toLocaleDateString()}</p>
                </div>
            )
        },
        {
            header: 'Status',
            render: (coupon) => {
                const status = getCouponStatus(coupon);
                return (
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${status.color}`}>
                        {status.label}
                    </span>
                );
            }
        },
        {
            header: 'Actions',
            align: 'right',
            render: (coupon) => (
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => navigate(`/admin/coupons/edit/${coupon.id}`)}
                        className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                    >
                        <Edit2 size={14} />
                    </button>
                    <button
                        onClick={() => handleDelete(coupon.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6 text-left pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-black text-[#3E2723] uppercase tracking-tight">Marketing</h1>
                    <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-[0.2em]">Manage discount codes</p>
                </div>
                <button
                    onClick={() => navigate('/admin/coupons/add')}
                    className="bg-[#3E2723] text-white px-5 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-[#5D4037] transition-all shadow-lg shadow-[#3E2723]/20"
                >
                    <Plus size={16} strokeWidth={3} /> Create Coupon
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Coupons', value: (coupons || []).length, icon: Ticket },
                    { label: 'Active Now', value: (coupons || []).filter(c => c.active).length, icon: Activity },
                    { label: 'Redemptions', value: (coupons || []).reduce((acc, c) => acc + (c.usageCount || 0), 0), icon: Users },
                    {
                        label: 'Expiring Soon', value: (coupons || []).filter(c => {
                            if (!c.validUntil) return false;
                            const daysLeft = (new Date(c.validUntil) - new Date()) / (1000 * 60 * 60 * 24);
                            return daysLeft > 0 && daysLeft < 7;
                        }).length, icon: Clock
                    },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                                <stat.icon size={16} />
                            </div>
                            <span className="text-xl font-black text-footerBg">{stat.value}</span>
                        </div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                    </div>
                ))}
            </div>

            <DataTable
                columns={columns}
                data={paginatedCoupons}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchPlaceholder="Search by code or description..."
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                totalItems={filteredCoupons.length}
                itemsPerPage={itemsPerPage}
            />
        </div>
    );
};

export default CouponListPage;
