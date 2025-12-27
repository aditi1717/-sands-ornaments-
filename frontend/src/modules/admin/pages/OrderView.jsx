import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Package, Truck, CheckCircle2,
    Clock, Box, User, CreditCard,
    Printer, ArrowLeft, Calendar, Mail, Phone, MapPin,
    Receipt, Tag, ShoppingBag
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const OrderView = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState({
        id: id || 'ORD-82741',
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
        paymentMethod: 'Online Payment',
        date: 'December 26, 2025',
        status: 'Ordered',
        tracking: [
            { status: 'Ordered', time: '10:30 AM', desc: 'Order placed successfully', done: true },
            { status: 'Packed', time: null, desc: 'Processing in warehouse', done: false },
            { status: 'Shipped', time: null, desc: 'Waiting for courier pickup', done: false },
            { status: 'Delivered', time: null, desc: 'Package delivery', done: false }
        ]
    });

    const statusColors = {
        'Ordered': 'bg-blue-50 text-blue-600 border-blue-100',
        'Packed': 'bg-amber-50 text-amber-600 border-amber-100',
        'Shipped': 'bg-purple-50 text-purple-600 border-purple-100',
        'Delivered': 'bg-green-50 text-green-600 border-green-100'
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="max-w-[1400px] mx-auto w-full p-6 md:p-8 space-y-8 animate-in fade-in duration-500 pb-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <button
                            onClick={() => navigate('/admin/orders')}
                            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors text-sm font-medium mb-4"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Orders
                        </button>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-900">{order.id}</h1>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[order.status]}`}>
                                {order.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500">Placed on {order.date} via {order.paymentMethod}</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all shadow-sm">
                            <Printer className="w-4 h-4" />
                            Print Invoice
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Primary Content: Customer & Products */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* Customer Summary */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <User className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase tracking-wider">Customer Contact</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{order.customer.name}</h3>
                                        <div className="mt-2 space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                {order.customer.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                {order.customer.phone}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <MapPin className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase tracking-wider">Shipping Address</span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                        {order.customer.address}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Order Items Table */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2 bg-gray-50/30">
                                <ShoppingBag className="w-4 h-4 text-[#8D6E63]" />
                                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Order Summary</h3>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {order.items.map((item) => (
                                    <div key={item.id} className="p-6 flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-gray-900 truncate">{item.name}</h4>
                                            <p className="text-xs text-gray-500 mt-0.5">Size: <span className="font-semibold">{item.size}</span></p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-sm font-bold text-gray-900">₹{item.price.toLocaleString()}</p>
                                            <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-8 bg-gray-50/30 border-t border-gray-100 flex flex-col items-end space-y-2">
                                <div className="w-full max-w-xs space-y-2">
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Subtotal</span>
                                        <span className="font-semibold text-gray-900">₹{order.total.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Shipping</span>
                                        <span className="font-semibold text-green-600">Free</span>
                                    </div>
                                    <div className="pt-4 mt-2 border-t border-gray-200 flex justify-between">
                                        <span className="text-base font-bold text-gray-900">Paid Amount</span>
                                        <span className="text-xl font-bold text-[#3E2723]">₹{order.total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Column: Tracking & Payment */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Status Timeline */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
                            <div className="flex items-center gap-2 mb-8">
                                <Truck className="w-4 h-4 text-[#8D6E63]" />
                                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Order Progress</h3>
                            </div>
                            <div className="space-y-10 relative">
                                <div className="absolute left-[11px] top-1 bottom-1 w-[2px] bg-gray-100" />
                                {order.tracking.map((step, idx) => (
                                    <div key={idx} className="relative flex gap-4 pl-8 items-start">
                                        <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 bg-white flex items-center justify-center z-10 transition-all duration-500 ${step.done ? 'border-green-500 bg-green-500' : 'border-gray-200'
                                            }`}>
                                            {step.done ? (
                                                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                            ) : (
                                                <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                                            )}
                                        </div>
                                        <div className="flex-1 pt-0.5">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className={`text-sm font-bold ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>
                                                    {step.status}
                                                </p>
                                                {step.time && <span className="text-[10px] font-bold text-gray-400">{step.time}</span>}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Receipt className="w-4 h-4 text-[#8D6E63]" />
                                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Payment Ledger</h3>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-semibold text-gray-500">Method</span>
                                    <span className="text-xs font-bold text-gray-900">{order.paymentMethod}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-gray-500">Status</span>
                                    <span className="text-[10px] font-bold text-green-600 px-2 py-0.5 bg-green-50 rounded border border-green-100 uppercase">Paid</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderView;
