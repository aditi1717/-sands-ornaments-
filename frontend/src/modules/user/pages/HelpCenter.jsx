import React, { useState } from 'react';
import { Search, HelpCircle, ShoppingBag, Truck, CreditCard, RefreshCw, MessageCircle, ChevronRight, Phone, Mail, Clock, Send, Ticket, ArrowLeft, History } from 'lucide-react';
import { useShop } from '../../../context/ShopContext';
import { Link } from 'react-router-dom';

const SupportForm = ({ onCancel, initialOrder = '' }) => {
    const { createTicket, user } = useShop();
    const [formData, setFormData] = useState({
        subject: '',
        orderId: initialOrder,
        category: 'General',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createTicket({
            ...formData,
            userEmail: user?.email,
            userName: user?.name
        });
        onCancel(); // Return to FAQ/Main view
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#EFEBE9] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-serif font-bold text-[#3E2723] mb-6">Create Support Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-[#5D4037] uppercase tracking-widest mb-2">Subject</label>
                        <input
                            required
                            type="text"
                            placeholder="Brief description of issue"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full border border-gray-100 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037]"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-[#5D4037] uppercase tracking-widest mb-2">Order ID (Optional)</label>
                        <input
                            type="text"
                            placeholder="e.g. 1735123456"
                            value={formData.orderId}
                            onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                            className="w-full border border-gray-100 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037]"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-[#5D4037] uppercase tracking-widest mb-2">Category</label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full border border-gray-100 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037]"
                    >
                        <option>General Enquiry</option>
                        <option>Order Tracking</option>
                        <option>Payment Issue</option>
                        <option>Returns & Refunds</option>
                        <option>Product Feedback</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-[#5D4037] uppercase tracking-widest mb-2">Detailed Message</label>
                    <textarea
                        required
                        rows="4"
                        placeholder="Please describe your problem in detail..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full border border-gray-100 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] resize-none"
                    ></textarea>
                </div>
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="flex-grow bg-[#3E2723] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#5D4037] transition-all shadow-lg shadow-[#3E2723]/20"
                    >
                        <Send className="w-4 h-4" />
                        Submit Request
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-8 py-4 rounded-xl border border-[#EFEBE9] font-bold text-[#8D6E63] hover:bg-[#FDFBF7] transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

const TicketHistory = ({ tickets, onBack }) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center justify-between mb-8">
                <button onClick={onBack} className="flex items-center gap-2 text-[#8D6E63] hover:text-[#3E2723] transition-colors font-bold uppercase tracking-widest text-xs">
                    <ArrowLeft className="w-4 h-4" /> Back to FAQ
                </button>
                <h2 className="text-2xl font-serif font-bold text-[#3E2723]">My Support Tickets</h2>
            </div>

            {tickets.length === 0 ? (
                <div className="bg-white p-20 rounded-3xl border border-dashed border-[#EFEBE9] text-center">
                    <Ticket className="w-12 h-12 text-[#EFEBE9] mx-auto mb-4" />
                    <p className="text-[#8D6E63]">You haven't created any support tickets yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {tickets.map((t) => (
                        <div key={t.id} className="bg-white p-6 rounded-2xl border border-[#EFEBE9] shadow-sm hover:shadow-md transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#8D6E63] block mb-1">{t.id}</span>
                                    <h3 className="text-lg font-bold text-[#3E2723]">{t.subject}</h3>
                                </div>
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${t.status === 'Open' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                    {t.status}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-[#5D4037] mb-4">
                                <div>
                                    <p className="text-[10px] text-[#8D6E63] uppercase font-bold mb-0.5">Category</p>
                                    <p className="font-medium">{t.category}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#8D6E63] uppercase font-bold mb-0.5">Date</p>
                                    <p className="font-medium">{new Date(t.date).toLocaleDateString()}</p>
                                </div>
                                {t.orderId && (
                                    <div>
                                        <p className="text-[10px] text-[#8D6E63] uppercase font-bold mb-0.5">Order ID</p>
                                        <p className="font-medium">#{t.orderId}</p>
                                    </div>
                                )}
                            </div>
                            <div className="bg-[#FDFBF7] p-4 rounded-xl text-sm text-[#5D4037] border border-[#EFEBE9]">
                                {t.message}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const HelpCenter = () => {
    const { user, orders, supportTickets, showNotification } = useShop();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [view, setView] = useState('home'); // home, contact, history
    const [prefilledOrder, setPrefilledOrder] = useState('');

    const categories = [
        { id: 'orders', icon: <ShoppingBag className="w-6 h-6" />, title: 'Orders', description: 'Tracking, shipping, and delivery details' },
        { id: 'payments', icon: <CreditCard className="w-6 h-6" />, title: 'Payments', description: 'Pricing, billing, and payment methods' },
        { id: 'returns', icon: <RefreshCw className="w-6 h-6" />, title: 'Returns & Refunds', description: 'Policies and process for returns' },
        { id: 'shopping', icon: <Truck className="w-6 h-6" />, title: 'Shopping', description: 'Product info, stock, and sizing' },
    ];

    const faqs = [
        {
            category: 'orders',
            question: 'How can I track my order?',
            answer: 'You can track your order by visiting the "My Orders" section in your profile or by using the tracking link sent to your email.'
        },
        {
            category: 'returns',
            question: 'What is your return policy?',
            answer: 'We offer a 7-day easy return policy for most items. The product must be unused and in its original packaging.'
        },
        {
            category: 'payments',
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit/debit cards, UPI, Wallets, and Net Banking. Cash on Delivery is also available for selected locations.'
        },
        {
            category: 'shopping',
            question: 'Are your silver ornaments hallmarked?',
            answer: 'Yes, all our 925 Silver ornaments are hallmarked and come with an authenticity certificate.'
        }
    ];

    const filteredFaqs = searchQuery
        ? faqs.filter(f => f.question.toLowerCase().includes(searchQuery.toLowerCase()))
        : activeCategory === 'all'
            ? faqs
            : faqs.filter(f => f.category === activeCategory);

    const handleNeedHelpWithOrder = (orderId) => {
        if (!user) {
            showNotification("Please login to create a support ticket.");
            return;
        }
        setPrefilledOrder(orderId.split('-')[1]);
        setView('contact');
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans pb-20">
            {/* Hero Section */}
            <div className="bg-[#3E2723] text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">How can we help you?</h1>
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for topics, questions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white text-gray-900 rounded-full py-4 px-14 text-lg focus:outline-none focus:ring-4 focus:ring-[#8D6E63]/20 shadow-xl"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
                {/* Category Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => {
                                setActiveCategory(cat.id);
                                setView('home');
                            }}
                            className={`bg-white p-8 rounded-2xl shadow-sm border transition-all text-left group hover:shadow-md hover:-translate-y-1 ${activeCategory === cat.id && view === 'home' ? 'border-[#3E2723] ring-1 ring-[#3E2723]' : 'border-[#EFEBE9]'}`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${activeCategory === cat.id && view === 'home' ? 'bg-[#3E2723] text-white' : 'bg-[#F5F5F5] text-[#8D6E63] group-hover:bg-[#3E2723] group-hover:text-white'}`}>
                                {cat.icon}
                            </div>
                            <h3 className="text-lg font-bold text-[#3E2723] mb-2">{cat.title}</h3>
                            <p className="text-sm text-[#8D6E63] leading-relaxed">{cat.description}</p>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2">
                        {view === 'home' ? (
                            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-serif font-bold text-[#3E2723]">Frequently Asked Questions</h2>
                                    {activeCategory !== 'all' && (
                                        <button onClick={() => setActiveCategory('all')} className="text-[#8D6E63] text-sm font-bold uppercase tracking-widest hover:text-[#3E2723]">Clear Filter</button>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    {filteredFaqs.length > 0 ? (
                                        filteredFaqs.map((faq, idx) => (
                                            <div key={idx} className="bg-white rounded-2xl border border-[#EFEBE9] overflow-hidden transition-all hover:shadow-sm">
                                                <details className="group">
                                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                                        <h4 className="font-bold text-[#3E2723] pr-4">{faq.question}</h4>
                                                        <ChevronRight className="w-5 h-5 text-[#8D6E63] transition-transform group-open:rotate-90" />
                                                    </summary>
                                                    <div className="px-6 pb-6 text-[#5D4037] leading-relaxed animate-in fade-in slide-in-from-top-2">
                                                        {faq.answer}
                                                    </div>
                                                </details>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-[#EFEBE9]">
                                            <HelpCircle className="w-12 h-12 text-[#EFEBE9] mx-auto mb-4" />
                                            <p className="text-[#8D6E63]">No results found for your search.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : view === 'contact' ? (
                            <SupportForm
                                onCancel={() => {
                                    setView('home');
                                    setPrefilledOrder('');
                                }}
                                initialOrder={prefilledOrder}
                            />
                        ) : (
                            <TicketHistory tickets={supportTickets} onBack={() => setView('home')} />
                        )}
                    </div>

                    {/* Support Sidebar */}
                    <div className="space-y-8">
                        {/* Contact Card */}
                        <div className="bg-[#3E2723] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-serif font-bold mb-4">Still need help?</h3>
                                <p className="text-white/80 mb-8 text-sm leading-relaxed">Our support team is available from 10 AM to 7 PM to help you.</p>

                                <div className="space-y-6">
                                    <button
                                        onClick={() => {
                                            if (!user) return showNotification("Please login to contact support.");
                                            setView('contact');
                                        }}
                                        className="w-full bg-white text-[#3E2723] py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#FDFBF7] transition-all shadow-lg active:scale-95"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        Contact Support
                                    </button>

                                    {user && supportTickets.length > 0 && (
                                        <button
                                            onClick={() => setView('history')}
                                            className="w-full bg-white/10 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-white/20 transition-all border border-white/20"
                                        >
                                            <History className="w-5 h-5" />
                                            Ticket History
                                        </button>
                                    )}

                                    <div className="pt-4 space-y-4">
                                        <div className="flex items-center gap-4 text-sm font-medium">
                                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-white/60 text-xs uppercase tracking-widest font-bold">Call us</p>
                                                <p>+91 90083 81564</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm font-medium">
                                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-white/60 text-xs uppercase tracking-widest font-bold">Email us</p>
                                                <p>support@sandsornaments.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                        </div>

                        {/* Order Help Card */}
                        {user && orders.length > 0 && (
                            <div className="bg-white p-8 rounded-3xl border border-[#EFEBE9] shadow-sm">
                                <h3 className="text-lg font-bold text-[#3E2723] mb-6 flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    Recent Orders
                                </h3>
                                <div className="space-y-4">
                                    {orders.slice(0, 2).map((order) => (
                                        <div
                                            key={order.id}
                                            onClick={() => handleNeedHelpWithOrder(order.id)}
                                            className="p-4 rounded-xl bg-[#FDFBF7] border border-[#EFEBE9] group cursor-pointer hover:border-[#3E2723] transition-colors"
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="text-xs font-bold text-[#3E2723]">#{order.id.split('-')[1]}</span>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8D6E63]">{new Date(order.date).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-xs text-[#5D4037] line-clamp-1 mb-3">{order.items[0].name}</p>
                                            <button className="text-[10px] font-bold uppercase tracking-widest text-[#3E2723] group-hover:underline">Need help?</button>
                                        </div>
                                    ))}
                                </div>
                                <Link to="/profile/orders" className="text-xs font-bold text-[#8D6E63] uppercase tracking-widest mt-6 block text-center hover:text-[#3E2723]">View all orders</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpCenter;
