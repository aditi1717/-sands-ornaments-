import React, { useState } from 'react';
import {
    Search, AlertCircle, CheckCircle2, Clock,
    Inbox, Trash2, Mail, User
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { useShop } from '../../../context/ShopContext';

const SupportManagement = () => {
    const { supportTickets, updateTicketStatus, deleteTicket } = useShop();
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    // Process supportTickets
    const processedTickets = supportTickets.map(t => ({
        ...t,
        priority: t.priority || 'Medium',
        time: new Date(t.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        displayDate: new Date(t.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
    }));

    const handleStatusChange = (id, newStatus) => {
        updateTicketStatus(id, newStatus);
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this support ticket safely?')) {
            deleteTicket(id);
        }
    };

    const filteredTickets = processedTickets.filter(t => {
        const matchesStatus = filterStatus === 'All' || t.status === filterStatus;
        const matchesSearch = (t.userName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (t.subject?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (t.id?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const priorityColors = {
        'Urgent': 'text-red-700 bg-red-50 border-red-100',
        'High': 'text-orange-700 bg-orange-50 border-orange-100',
        'Medium': 'text-blue-700 bg-blue-50 border-blue-100',
        'Low': 'text-gray-700 bg-gray-50 border-gray-100'
    };

    const statusIcons = {
        'Open': <AlertCircle className="w-3.5 h-3.5 text-red-500" />,
        'In Progress': <Clock className="w-3.5 h-3.5 text-blue-500" />,
        'Resolved': <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
    };

    return (
        <div className="max-w-[1400px] mx-auto w-full flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-100px)] animate-in fade-in duration-500 pb-10">
            <PageHeader
                title="Support Inbox"
                subtitle="Manage customer queries and tickets"
            />

            <div className="mt-6 flex flex-col h-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-50/50">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, subject, or ID..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3E2723]/10 font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide">
                        {['All', 'Open', 'In Progress', 'Resolved'].map(s => (
                            <button
                                key={s}
                                onClick={() => setFilterStatus(s)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${filterStatus === s
                                        ? 'bg-[#3E2723] text-white shadow-md'
                                        : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    <div className="col-span-1">Date</div>
                    <div className="col-span-2">Customer</div>
                    <div className="col-span-2">Subject</div>
                    <div className="col-span-4">Message</div>
                    <div className="col-span-1 text-center">Priority</div>
                    <div className="col-span-1 text-center">Status</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>

                {/* Table Body */}
                <div className="flex-1 overflow-y-auto">
                    {filteredTickets.map(ticket => (
                        <div key={ticket.id} className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 items-start hover:bg-gray-50/50 transition-colors group">
                            {/* Date */}
                            <div className="col-span-1 space-y-1">
                                <p className="text-xs font-bold text-gray-900">{ticket.displayDate}</p>
                                <p className="text-[10px] text-gray-400 font-medium">{ticket.time}</p>
                            </div>

                            {/* Customer */}
                            <div className="col-span-2 space-y-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-[#3E2723]/10 flex items-center justify-center text-[#3E2723] text-xs font-bold">
                                        {(ticket.userName || 'U').charAt(0)}
                                    </div>
                                    <p className="text-xs font-bold text-gray-900 truncate">{ticket.userName || 'Guest'}</p>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-500">
                                    <Mail className="w-3 h-3" />
                                    <p className="text-[10px] truncate max-w-[120px]">{ticket.userEmail || 'No Email'}</p>
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="col-span-2">
                                <p className="text-xs font-bold text-gray-800 line-clamp-2">{ticket.subject}</p>
                                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-bold">{ticket.category}</p>
                            </div>

                            {/* Message (Details) */}
                            <div className="col-span-4">
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-xs text-gray-600 leading-relaxed font-medium">
                                    {ticket.message}
                                </div>
                                {ticket.orderId && (
                                    <span className="inline-block mt-2 px-2 py-0.5 bg-blue-50 text-blue-700 text-[9px] font-bold rounded border border-blue-100 uppercase tracking-widest">
                                        #{ticket.orderId}
                                    </span>
                                )}
                            </div>

                            {/* Priority */}
                            <div className="col-span-1 flex justify-center">
                                <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest border ${priorityColors[ticket.priority]}`}>
                                    {ticket.priority}
                                </span>
                            </div>

                            {/* Status */}
                            <div className="col-span-1 flex justify-center">
                                <select
                                    value={ticket.status}
                                    onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                                    className={`text-[9px] font-bold uppercase tracking-wide bg-transparent border-none focus:ring-0 cursor-pointer ${ticket.status === 'Open' ? 'text-red-600' :
                                            ticket.status === 'In Progress' ? 'text-blue-600' :
                                                'text-green-600'
                                        }`}
                                >
                                    <option value="Open">Open</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                </select>
                            </div>

                            {/* Actions */}
                            <div className="col-span-1 flex justify-end">
                                <button
                                    onClick={() => handleDelete(ticket.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                    title="Delete Ticket"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {filteredTickets.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 opacity-50">
                            <Inbox className="w-12 h-12 text-gray-300 mb-4" />
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No tickets found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SupportManagement;
