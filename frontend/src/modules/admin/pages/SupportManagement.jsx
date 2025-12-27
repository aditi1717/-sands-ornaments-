import React, { useState, useEffect } from 'react';
import {
    Mail, Search, Filter, MessageSquare,
    CheckCircle2, Clock, AlertCircle, Send,
    User, ArrowUpRight, Archive, Inbox,
    MoreVertical, Trash2
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { useShop } from '../../../context/ShopContext';

const SupportManagement = () => {
    const { supportTickets, addTicketReply, updateTicketStatus, deleteTicket } = useShop();

    const [selectedTicket, setSelectedTicket] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    // Process supportTickets from context to add derived properties for display
    const processedTickets = supportTickets.map(t => ({
        ...t,
        priority: t.priority || 'Medium', // Default if missing
        replies: t.replies || [],
        time: new Date(t.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        displayDate: new Date(t.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
    }));

    // Update selectedTicket if the underlying data in supportTickets changes
    useEffect(() => {
        if (selectedTicket) {
            const updatedSelected = processedTickets.find(t => t.id === selectedTicket.id);
            if (updatedSelected) {
                setSelectedTicket(updatedSelected);
            } else {
                // If the selected ticket was deleted
                setSelectedTicket(null);
            }
        }
    }, [processedTickets]); // Depend on processedTickets to catch any changes

    const handleSendReply = () => {
        if (!replyText.trim() || !selectedTicket) return;

        addTicketReply(selectedTicket.id, {
            from: 'admin',
            text: replyText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Add time here for immediate display
        });

        setReplyText('');
    };

    const handleStatusChange = (id, newStatus) => {
        updateTicketStatus(id, newStatus);
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this support ticket safely?')) {
            deleteTicket(id);
            if (selectedTicket?.id === id) setSelectedTicket(null);
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
        'Urgent': 'text-red-600 bg-red-50 border-red-100',
        'High': 'text-orange-600 bg-orange-50 border-orange-100',
        'Medium': 'text-blue-600 bg-blue-50 border-blue-100',
        'Low': 'text-gray-600 bg-gray-50 border-gray-100'
    };

    const statusIcons = {
        'Open': <AlertCircle className="w-4 h-4 text-red-500" />,
        'In Progress': <Clock className="w-4 h-4 text-blue-500" />,
        'Resolved': <CheckCircle2 className="w-4 h-4 text-green-500" />
    };

    return (
        <div className="max-w-[1400px] mx-auto w-full flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-100px)] animate-in fade-in duration-500 overflow-hidden">
            <div className="flex flex-col h-full gap-4 md:gap-6 overflow-hidden">
                <PageHeader
                    title="Support Inbox"
                    subtitle="Real-time customer tickets"
                />

                <div className="flex flex-1 gap-6 min-h-0 overflow-hidden">
                    {/* Left: Tickets Sidebar */}
                    <div className={`${selectedTicket ? 'hidden md:flex' : 'flex'} w-full md:w-[350px] lg:w-[400px] flex-col bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-0`}>
                        <div className="p-3 md:p-4 border-b border-gray-100 space-y-3 md:space-y-4 bg-white sticky top-0 z-10">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search tickets..."
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#3E2723]/10 transition-all font-bold"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-1 bg-gray-50 p-1 rounded-lg border border-gray-100 overflow-x-auto scrollbar-hide">
                                {['All', 'Open', 'In Progress', 'Resolved'].map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setFilterStatus(s)}
                                        className={`flex-1 px-2.5 py-1.5 text-[9px] md:text-[10px] uppercase tracking-wider font-bold rounded-md whitespace-nowrap transition-all ${filterStatus === s
                                            ? 'bg-white text-[#3E2723] shadow-sm border border-gray-200'
                                            : 'text-gray-400 hover:text-gray-600'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                            {filteredTickets.map(ticket => (
                                <button
                                    key={ticket.id}
                                    onClick={() => setSelectedTicket(ticket)}
                                    className={`w-full p-4 md:p-5 text-left transition-all hover:bg-gray-50/50 flex gap-4 border-l-4 ${selectedTicket?.id === ticket.id ? 'bg-[#FDFBF7] border-[#3E2723]' : 'border-transparent'
                                        }`}
                                >
                                    <div className="flex-1 min-w-0 space-y-1.5 md:space-y-2">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{ticket.id}</span>
                                            <span className="text-[9px] md:text-[10px] font-bold text-gray-400">{ticket.displayDate}</span>
                                        </div>
                                        <div className="space-y-0.5">
                                            <h4 className={`text-xs md:text-sm font-bold truncate ${selectedTicket?.id === ticket.id ? 'text-[#3E2723]' : 'text-gray-900'}`}>
                                                {ticket.subject}
                                            </h4>
                                            <p className="text-[10px] md:text-xs text-[#8D6E63] font-bold">{ticket.userName || 'Anonymous User'}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-1.5 md:px-2 py-0.5 rounded text-[8px] md:text-[9px] font-bold uppercase tracking-widest border ${priorityColors[ticket.priority]}`}>
                                                {ticket.priority}
                                            </span>
                                            <span className={`flex items-center gap-1 text-[8px] md:text-[9px] font-bold uppercase tracking-widest ${ticket.status === 'Open' ? 'text-red-500' :
                                                ticket.status === 'In Progress' ? 'text-blue-500' : 'text-green-500'
                                                }`}>
                                                {statusIcons[ticket.status]}
                                                {ticket.status}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            ))}

                            {filteredTickets.length === 0 && (
                                <div className="p-12 text-center opacity-50">
                                    <Inbox className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 text-gray-300" />
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">No matching tickets</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Ticket Detail Content */}
                    <div className={`${selectedTicket ? 'flex' : 'hidden md:flex'} flex-1 bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex-col min-h-0`}>
                        {selectedTicket ? (
                            <>
                                <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <button
                                            onClick={() => setSelectedTicket(null)}
                                            className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg text-gray-400"
                                        >
                                            <Archive className="w-5 h-5 rotate-90" />
                                        </button>
                                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-[#3E2723] flex items-center justify-center text-white font-bold text-sm md:text-xl shadow-lg shadow-[#3E2723]/10 shrink-0">
                                            {(selectedTicket.userName || 'U').charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-sm md:text-base font-bold text-gray-900 truncate">{selectedTicket.userName || 'Guest User'}</h3>
                                            <p className="text-[9px] md:text-[11px] text-[#8D6E63] font-bold uppercase tracking-wider truncate">{selectedTicket.userEmail || 'No Email'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <div className="hidden lg:flex bg-gray-50 p-1 rounded-xl border border-gray-100 gap-1">
                                            {['Open', 'In Progress', 'Resolved'].map(s => (
                                                <button
                                                    key={s}
                                                    onClick={() => handleStatusChange(selectedTicket.id, s)}
                                                    className={`px-3 py-1.5 text-[9px] md:text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${selectedTicket.status === s
                                                        ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                                                        : 'text-gray-400 hover:text-gray-600'
                                                        }`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => handleDelete(selectedTicket.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg md:rounded-xl transition-all"
                                        >
                                            <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8 bg-gray-50/20">
                                    {/* Subtitle/Category & Order Info */}
                                    <div className="flex flex-wrap gap-2 md:gap-4 mb-2">
                                        <div className="bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-lg">
                                            <p className="text-[8px] md:text-[10px] font-bold text-amber-700 uppercase">Category</p>
                                            <p className="text-[10px] md:text-xs font-bold text-[#3E2723]">{selectedTicket.category}</p>
                                        </div>
                                        {selectedTicket.orderId && (
                                            <div className="bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg">
                                                <p className="text-[8px] md:text-[10px] font-bold text-blue-700 uppercase">Order</p>
                                                <p className="text-[10px] md:text-xs font-bold text-[#3E2723]">#{selectedTicket.orderId}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Customer Message */}
                                    <div className="max-w-[90%] md:max-w-[85%] space-y-2 md:space-y-3">
                                        <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl rounded-tl-none border border-gray-100 shadow-sm relative">
                                            <div className="absolute -left-2 top-0 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-[-45deg] hidden md:block"></div>
                                            <h4 className="text-[10px] md:text-xs font-bold text-[#3E2723] mb-3 md:mb-4 border-b border-gray-50 pb-2 flex items-center gap-2">
                                                <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
                                                {selectedTicket.subject}
                                            </h4>
                                            <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-bold">{selectedTicket.message}</p>
                                        </div>
                                        <p className="text-[9px] md:text-[11px] text-gray-400 font-bold ml-1 uppercase">{selectedTicket.time} • {selectedTicket.displayDate}</p>
                                    </div>

                                    {/* Admin Replies */}
                                    {selectedTicket.replies.map((reply, idx) => (
                                        <div key={idx} className={`flex flex-col ${reply.from === 'admin' ? 'items-end' : 'items-start'} space-y-1.5 md:space-y-2 animate-in slide-in-from-bottom-2`}>
                                            <div className={`p-4 md:p-5 rounded-2xl md:rounded-3xl max-w-[90%] md:max-w-[80%] text-xs md:text-sm font-bold shadow-sm ${reply.from === 'admin'
                                                ? 'bg-[#3E2723] text-white rounded-tr-none'
                                                : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                                                }`}>
                                                {reply.text}
                                            </div>
                                            <p className="text-[9px] md:text-[11px] text-gray-400 font-bold px-1 uppercase tracking-widest">{reply.time}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 md:p-6 border-t border-gray-100 bg-white">
                                    <div className="relative flex items-end gap-2 md:gap-3 max-w-4xl mx-auto">
                                        <textarea
                                            placeholder={`Reply...`}
                                            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl md:rounded-2xl p-3 md:p-5 text-xs md:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#3E2723]/10 transition-all resize-none min-h-[80px] md:min-h-[120px] shadow-inner"
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                        />
                                        <button
                                            onClick={handleSendReply}
                                            disabled={!replyText.trim()}
                                            className="bg-[#3E2723] text-white p-3 md:p-5 rounded-xl md:rounded-2xl shadow-xl hover:bg-[#5D4037] transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shrink-0"
                                        >
                                            <Send className="w-5 h-5 md:w-6 md:h-6" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-10 md:p-20">
                                <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 md:mb-8 border border-gray-100">
                                    <Inbox className="w-8 h-8 md:w-10 md:h-10 text-gray-200" />
                                </div>
                                <h3 className="text-lg md:text-xl font-serif font-bold text-gray-900 mb-2">Support Dashboard</h3>
                                <p className="text-[10px] md:text-sm text-gray-400 font-bold uppercase tracking-widest max-w-xs">Select a customer ticket from the inbox to start resolving.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportManagement;
