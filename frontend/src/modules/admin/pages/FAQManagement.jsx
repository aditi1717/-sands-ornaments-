import React, { useState } from 'react';
import {
    HelpCircle, Plus, Search, Filter,
    Edit3, Trash2, ChevronDown, ChevronUp,
    Save, X, GripVertical, CheckCircle2
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const FAQManagement = () => {
    const [faqs, setFaqs] = useState([
        {
            id: 1,
            category: 'Orders',
            question: 'How can I track my order?',
            answer: 'You can track your order by visiting the "My Orders" section in your profile or by using the tracking link sent to your email.',
            status: 'Active'
        },
        {
            id: 2,
            category: 'Returns',
            question: 'What is your return policy?',
            answer: 'We offer a 7-day easy return policy for most items. The product must be unused and in its original packaging.',
            status: 'Active'
        },
        {
            id: 3,
            category: 'Payments',
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit/debit cards, UPI, Wallets, and Net Banking. Cash on Delivery is also available for selected locations.',
            status: 'Active'
        },
        {
            id: 4,
            category: 'Shopping',
            question: 'Are your silver ornaments hallmarked?',
            answer: 'Yes, all our 925 Silver ornaments are hallmarked and come with an authenticity certificate.',
            status: 'Active'
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState(null);
    const [formData, setFormData] = useState({
        category: 'Orders',
        question: '',
        answer: '',
        status: 'Active'
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['Orders', 'Returns', 'Payments', 'Shopping', 'General'];

    const handleOpenModal = (faq = null) => {
        if (faq) {
            setEditingFaq(faq);
            setFormData(faq);
        } else {
            setEditingFaq(null);
            setFormData({
                category: 'Orders',
                question: '',
                answer: '',
                status: 'Active'
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (editingFaq) {
            setFaqs(faqs.map(f => f.id === editingFaq.id ? { ...formData, id: f.id } : f));
        } else {
            setFaqs([...faqs, { ...formData, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this FAQ?')) {
            setFaqs(faqs.filter(f => f.id !== id));
        }
    };

    const filteredFaqs = faqs.filter(f => {
        const matchesSearch = f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.answer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="max-w-[1200px] mx-auto space-y-4 md:space-y-6 animate-in fade-in duration-500 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-1">
                <PageHeader
                    title="FAQ Management"
                    subtitle="Manage Help Center Q&As"
                />
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#3E2723] text-white rounded-xl text-xs md:text-sm font-bold hover:bg-[#5D4037] transition-all shadow-sm active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    Add FAQ
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-3 md:gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search questions..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs md:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#3E2723]/10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 md:pb-0">
                    {['All', ...categories].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[9px] md:text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeCategory === cat
                                ? 'bg-[#3E2723] text-white shadow-sm'
                                : 'bg-gray-100 text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* FAQ List */}
            <div className="space-y-3 md:space-y-4">
                {filteredFaqs.map((faq, index) => (
                    <div key={faq.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all group">
                        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex gap-4 items-start">
                                <div className="p-2 bg-gray-50 rounded-xl text-gray-400 group-hover:bg-[#3E2723]/5 group-hover:text-[#3E2723] transition-colors">
                                    <GripVertical className="w-4 h-4" />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-100 rounded text-[9px] font-bold uppercase tracking-widest">
                                            {faq.category}
                                        </span>
                                        {faq.status === 'Active' ? (
                                            <span className="flex items-center gap-1 text-[9px] text-green-500 font-bold uppercase">
                                                <CheckCircle2 className="w-3 h-3" /> Active
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-[9px] text-gray-400 font-bold uppercase">
                                                <X className="w-3 h-3" /> Inactive
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-sm font-bold text-gray-900">{faq.question}</h3>
                                    <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-3xl">{faq.answer}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 self-end md:self-center">
                                <button
                                    onClick={() => handleOpenModal(faq)}
                                    className="p-2 text-gray-400 hover:text-[#3E2723] hover:bg-gray-50 rounded-lg transition-all"
                                >
                                    <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(faq.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredFaqs.length === 0 && (
                    <div className="p-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                        <HelpCircle className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-gray-400 font-bold">No FAQs found</h3>
                        <p className="text-xs text-gray-300 font-medium mt-1">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>

            {/* FAQ Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">
                                {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Category</label>
                                    <select
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-[#3E2723]/10"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Visibility</label>
                                    <select
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-[#3E2723]/10"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="Active">Active (Visible)</option>
                                        <option value="Inactive">Inactive (Hidden)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase">Question</label>
                                <input
                                    type="text"
                                    placeholder="Enter the FAQ question..."
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold"
                                    value={formData.question}
                                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase">Answer Content</label>
                                <textarea
                                    placeholder="Detailed explanation for the customer..."
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold h-40 resize-none"
                                    value={formData.answer}
                                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-3.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3.5 bg-[#3E2723] text-white rounded-xl text-sm font-bold shadow-lg hover:bg-[#5D4037] transition-all flex items-center justify-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FAQManagement;
