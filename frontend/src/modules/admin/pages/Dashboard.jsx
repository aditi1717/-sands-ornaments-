import React from 'react';
import {
    ShoppingBag, Users, Package, TrendingUp,
    Clock, CheckCircle, AlertCircle, ArrowUpRight,
    Search, Filter, Download, Image as ImageIcon
} from 'lucide-react';

const AdminDashboard = () => {
    const stats = [
        { label: 'Total Revenue', value: '₹4,82,500', trend: '+18%', icon: TrendingUp },
        { label: 'Orders Today', value: '154', trend: '+12%', icon: ShoppingBag },
        { label: 'Active Users', value: '1,202', trend: '+5%', icon: Users },
        { label: 'Low Stock Items', value: '12', trend: '-2%', icon: AlertCircle },
    ];

    const recentOrders = [
        { id: '#ORD-7742', customer: 'Aditi Sharma', total: '₹2,400', status: 'Pending', time: '2 mins ago' },
        { id: '#ORD-7741', customer: 'Rahul Mehta', total: '₹1,200', status: 'Shipped', time: '1 hour ago' },
        { id: '#ORD-7740', customer: 'Sneha Kapoor', total: '₹4,500', status: 'Delivered', time: '3 hours ago' },
        { id: '#ORD-7739', customer: 'Priya Rai', total: '₹850', status: 'Pending', time: '5 hours ago' },
    ];

    return (
        <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <h1 className="text-lg md:text-xl font-bold text-gray-800">Dashboard Overview</h1>
                <button className="bg-[#3E2723] text-white px-4 py-2 rounded-lg text-xs md:text-sm font-bold hover:bg-[#2D1B18] transition-all shadow-sm active:scale-95">
                    Generate Report
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-3 md:p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-1 md:mb-2">
                            <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-[#8D6E63]" />
                            <span className={`text-[10px] md:text-xs font-bold ${stat.trend.includes('+') ? 'text-green-600' : 'text-red-500'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-[10px] md:text-sm text-gray-400 font-bold uppercase tracking-wider">{stat.label}</p>
                        <h3 className="text-base md:text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Recent Orders Table */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-3 md:p-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="text-sm md:text-base font-bold text-gray-800 tracking-tight">Recent Transactions</h3>
                        <button className="text-xs md:text-sm text-[#8D6E63] font-bold hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">
                                <tr>
                                    <th className="px-4 py-3">Order ID</th>
                                    <th className="px-4 py-3">Customer</th>
                                    <th className="px-4 py-3">Total</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 hidden md:table-cell">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-[10px] md:text-sm">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-4 py-3 md:py-4 font-bold text-gray-800">{order.id}</td>
                                        <td className="px-4 py-3 md:py-4 text-gray-600 font-medium">{order.customer}</td>
                                        <td className="px-4 py-3 md:py-4 font-bold text-gray-900 tracking-tight">{order.total}</td>
                                        <td className="px-4 py-3 md:py-4">
                                            <span className={`text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded-full uppercase tracking-wider ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-amber-100 text-amber-700'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 md:py-4 text-[9px] md:text-xs text-gray-400 font-medium hidden md:table-cell">{order.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Alerts */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm h-fit">
                    <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2 tracking-tight">
                        <AlertCircle className="w-4 h-4 text-[#8D6E63]" />
                        System Alerts
                    </h3>
                    <div className="space-y-2 md:space-y-3">
                        <div className="p-2.5 bg-red-50 text-red-700 rounded-lg text-[10px] md:text-xs border border-red-100 font-medium">
                            <strong className="font-bold">Inventory:</strong> Crystal Drop Earrings are out of stock.
                        </div>
                        <div className="p-2.5 bg-blue-50 text-blue-700 rounded-lg text-[10px] md:text-xs border border-blue-100 font-medium">
                            <strong className="font-bold">Update:</strong> 4 new reviews pending.
                        </div>
                        <div className="p-2.5 bg-gray-50 text-gray-600 rounded-lg text-[10px] md:text-xs border border-gray-100 font-medium">
                            <strong className="font-bold">System:</strong> Backup completed.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
