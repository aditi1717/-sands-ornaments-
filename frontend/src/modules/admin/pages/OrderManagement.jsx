import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Package, Search, Filter, Calendar,
    MoreHorizontal, Eye, Truck, CheckCircle2,
    Clock, Box, User, CreditCard, X, ChevronRight,
    ArrowUpRight, Download, Printer
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const OrderManagement = () => {
    const navigate = useNavigate();

    // Mock Orders Data
    const [orders] = useState([
        {
            id: 'ORD-82741',
            customer: {
                name: 'Aditi Singh',
                email: 'aditi.s@gmail.com',
                phone: '+91 98123 45678',
                address: 'B-402, Sunshine Heights, Andheri West, Mumbai - 400053'
            },
            items: [
                { id: 101, name: 'Classic Solitaire Ring', size: '7', price: 3999, quantity: 1, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200' },
                { id: 102, name: '925 Silver Chain', size: '18"', price: 1545, quantity: 1, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200' }
            ],
            total: 5544,
            paymentMethod: 'Online',
            date: '2025-12-26',
            status: 'Ordered',
        },
        {
            id: 'ORD-82742',
            customer: {
                name: 'Rahul Verma',
                email: 'rahul.v@yahoo.com',
                phone: '+91 77654 32109',
                address: 'H-12, Green Park Main, Delhi - 110016'
            },
            items: [
                { id: 103, name: 'Minimalist Bangle', size: '2.4', price: 2800, quantity: 1, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200' }
            ],
            total: 2800,
            paymentMethod: 'COD',
            date: '2025-12-25',
            status: 'Shipped',
        }
    ]);

    const [filterStatus, setFilterStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const statusColors = {
        'Ordered': 'bg-blue-50 text-blue-600 border-blue-100',
        'Packed': 'bg-amber-50 text-amber-600 border-amber-100',
        'Shipped': 'bg-purple-50 text-purple-600 border-purple-100',
        'Delivered': 'bg-green-50 text-green-600 border-green-100'
    };

    const filteredOrders = orders.filter(order => {
        const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="max-w-[1400px] mx-auto space-y-4 md:space-y-8 animate-in fade-in duration-500 pb-20">
            <PageHeader
                title="Order Management"
                subtitle="Track sales, manage fulfillments, and update statuses"
            />

            {/* Filters Row */}
            <div className="bg-white p-3 md:p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col lg:flex-row gap-3 md:gap-4 items-center justify-between">
                <div className="flex flex-col md:flex-row flex-1 gap-3 w-full">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Order or Customer..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#3E2723]/10 focus:border-[#3E2723] transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100 overflow-x-auto scrollbar-hide shrink-0">
                        {['All', 'Ordered', 'Packed', 'Shipped', 'Delivered'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-bold rounded-md transition-all whitespace-nowrap ${filterStatus === status
                                    ? 'bg-white text-[#3E2723] shadow-sm border border-gray-100'
                                    : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
                <button className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 py-2.5 md:py-2 bg-[#3E2723] text-white rounded-lg text-xs md:text-sm font-bold shadow-sm hover:bg-[#5D4037] transition-all active:scale-95">
                    <Download className="w-4 h-4" />
                    <span>Export Sheet</span>
                </button>
            </div>

            {/* Orders List Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 uppercase tracking-widest text-[9px] md:text-[11px] font-bold border-b border-gray-100">
                                <th className="px-4 md:px-6 py-3 md:py-4">Order Details</th>
                                <th className="px-4 md:px-6 py-3 md:py-4">Customer</th>
                                <th className="px-4 md:px-6 py-3 md:py-4">Total Amount</th>
                                <th className="px-4 md:px-6 py-3 md:py-4">Payment</th>
                                <th className="px-4 md:px-6 py-3 md:py-4">Status</th>
                                <th className="px-4 md:px-6 py-3 md:py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 uppercase tracking-tighter text-[10px] md:text-sm">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-4 md:px-6 py-3 md:py-4">
                                        <div className="space-y-0.5">
                                            <p className="font-bold text-gray-900">{order.id}</p>
                                            <div className="flex items-center gap-1.5 text-[9px] md:text-[11px] font-bold text-gray-400">
                                                <Calendar className="w-3 h-3" />
                                                <span>{order.date}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 md:px-6 py-3 md:py-4">
                                        <div className="space-y-0.5">
                                            <p className="font-bold text-gray-800">{order.customer.name}</p>
                                            <p className="text-[9px] md:text-[11px] text-gray-400 font-bold">{order.customer.phone}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 md:px-6 py-3 md:py-4">
                                        <p className="font-bold text-gray-900">₹{order.total.toLocaleString()}</p>
                                        <p className="text-[9px] md:text-[11px] text-gray-400 font-bold">{order.items.length} Items</p>
                                    </td>
                                    <td className="px-4 md:px-6 py-3 md:py-4">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                            <span className="font-bold text-gray-700">{order.paymentMethod}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 md:px-6 py-3 md:py-4">
                                        <span className={`px-2.5 md:px-3 py-1 rounded-full text-[9px] md:text-[11px] font-bold border ${statusColors[order.status]}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-4 md:px-6 py-3 md:py-4 text-right">
                                        <button
                                            onClick={() => navigate(`/admin/orders/view/${order.id}`)}
                                            className="inline-flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 bg-gray-50 hover:bg-[#3E2723] text-gray-600 hover:text-white rounded-lg text-[10px] md:text-xs font-bold transition-all border border-gray-100 hover:border-[#3E2723] shadow-sm uppercase tracking-wider"
                                        >
                                            Details
                                            <ChevronRight className="w-3 md:w-3.5 h-3 md:h-3.5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderManagement;
