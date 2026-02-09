import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Printer,
    Download,
    CheckCircle2,
    Clock,
    Truck,
    Package,
    MapPin,
    User,
    CreditCard,
    MessageCircle,
    AlertCircle,
    XCircle,
    X,
    FileText,
    Image as ImageIcon
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const ReturnDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [returnRequest, setReturnRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    // Approval Workflow State
    const [showRejectInput, setShowRejectInput] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [internalComment, setInternalComment] = useState('');

    useEffect(() => {
        // Simulate Fetching Data
        setLoading(true);
        setTimeout(() => {
            setReturnRequest({
                id: id || 'RTN-101',
                orderId: '#5001',
                status: 'Pending', // Default to Pending for demo
                amount: 1200,
                items: [
                    {
                        name: 'Organic Cashew Nuts (W320) 250g',
                        sku: 'PRO-CAS-250',
                        qty: 1,
                        price: 1200,
                        reason: 'Damaged',
                        condition: 'Opened',
                        image: 'https://via.placeholder.com/50'
                    }
                ],
                customer: {
                    name: 'Rahul Sharma',
                    phone: '+91 98765 00001',
                    email: 'rahul.s@example.com'
                },
                evidence: {
                    comment: "The packet was torn on arrival.",
                    images: ['https://via.placeholder.com/100']
                },
                address: {
                    line1: 'A-12, Green Park',
                    city: 'New Delhi',
                    state: 'Delhi',
                    pincode: '110016'
                },
                refund: {
                    method: 'N/A',
                    transactionId: 'Pending',
                    total: 0 // Initially 0 until approved/refunded
                },
                timeline: [
                    { status: 'Return Requested', date: '2025-02-06', completed: true }
                ]
            });
            setLoading(false);
        }, 500);
    }, [id]);

    const handleApprove = () => {
        setReturnRequest(prev => ({
            ...prev,
            status: 'Approved',
            refund: { ...prev.refund, total: prev.amount, method: 'Original Payment Source' },
            pickup: {
                partner: 'Delhivery Surface',
                trackingId: 'TRACK-99887766',
                scheduledDate: 'Tomorrow, 10 AM - 2 PM'
            }
        }));
    };

    const confirmReject = () => {
        if (!rejectionReason.trim()) return;

        setReturnRequest(prev => ({
            ...prev,
            status: 'Rejected',
            rejection: {
                reason: rejectionReason,
                by: 'Admin',
                date: new Date().toISOString()
            }
        }));
        setShowRejectInput(false);
        setRejectionReason('');
    };

    if (loading) return <div className="p-10 text-center text-gray-400 font-bold uppercase tracking-widest">Loading Return Details...</div>;
    if (!returnRequest) return <div className="p-10 text-center text-red-400 font-bold uppercase tracking-widest">Request not found</div>;

    const statusStyle = (status) => {
        switch (status) {
            case 'Approved': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Rejected': return 'bg-red-50 text-red-600 border-red-100';
            case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    const getTimeline = () => {
        const steps = [...returnRequest.timeline];
        if (returnRequest.status === 'Rejected') {
            steps.push({ status: 'Admin Rejected', date: 'Today', completed: true, isError: true });
        } else if (returnRequest.status === 'Approved') {
            steps.push({ status: 'Admin Approved', date: 'Today', completed: true });
            steps.push({ status: 'Pickup Scheduled', date: 'Today', completed: true });
            steps.push({ status: 'Item Picked Up', date: 'Pending', completed: false });
            steps.push({ status: 'Refund Initiated', date: 'Pending', completed: false });
        } else {
            steps.push({ status: 'Admin Approval', date: 'Pending', completed: false });
        }
        return steps;
    };

    return (
        <div className="space-y-6 font-sans text-left pb-20 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <button
                    onClick={() => navigate('/admin/returns')}
                    className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 uppercase tracking-widest transition-colors"
                >
                    <ArrowLeft size={16} /> Back to Requests
                </button>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
                        <Printer size={14} /> Print Slip
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95">
                        <Download size={14} /> Download
                    </button>
                </div>
            </div>

            {/* Info Strip */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Return ID</p>
                    <p className="text-xl font-black text-gray-900">#{returnRequest.id}</p>
                </div>
                <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                    <p className="text-sm font-bold text-emerald-600">{returnRequest.orderId}</p>
                </div>
                <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusStyle(returnRequest.status)}`}>
                        {returnRequest.status}
                    </span>
                </div>
                <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Amount</p>
                    <p className="text-2xl font-black text-gray-900">₹{returnRequest.amount?.toLocaleString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Return Items */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex items-center gap-2">
                            <Package size={16} className="text-gray-400" />
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Return Items ({returnRequest.items.length})</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 border-b border-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Item Details</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">SKU</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Qty</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Price</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Reason</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Condition</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {returnRequest.items.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-gray-50 rounded-lg p-1 border border-gray-100 flex-shrink-0">
                                                        <img src={item.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                                                    </div>
                                                    <p className="text-xs font-bold text-gray-900">{item.name}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center text-[10px] font-bold text-gray-500">{item.sku}</td>
                                            <td className="px-6 py-4 text-center text-xs font-bold text-gray-900">{item.qty}</td>
                                            <td className="px-6 py-4 text-right text-xs font-black text-gray-900">₹{item.price.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest">
                                                    {item.reason}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-xs font-medium text-gray-500">{item.condition}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Customer Evidence */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <FileText size={16} className="text-gray-400" />
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Customer Evidence</h3>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Customer Comment</p>
                            <p className="text-xs font-bold text-gray-600 italic">"{returnRequest.evidence.comment}"</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Proof Uploads</p>
                            <div className="flex gap-4">
                                {returnRequest.evidence.images.map((img, i) => (
                                    <div key={i} className="w-20 h-20 bg-gray-50 rounded-lg border border-gray-100 p-1">
                                        <img src={img} alt="Proof" className="w-full h-full object-cover rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Refund Details */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <CreditCard size={16} className="text-gray-400" />
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Refund Details</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs font-bold text-gray-500">
                                <span>Refund Method</span>
                                <span className="text-gray-900">{returnRequest.refund.method}</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-gray-500">
                                <span>Transaction ID</span>
                                <span className="text-gray-900">{returnRequest.refund.transactionId}</span>
                            </div>
                            <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                                <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Total Refund Amount</span>
                                <span className="text-xl font-black text-emerald-600">₹{returnRequest.refund.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Admin Actions */}
                    {returnRequest.status === 'Pending' && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <AlertCircle size={16} className="text-amber-500" />
                                <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Admin Actions</h3>
                            </div>

                            {!showRejectInput ? (
                                <>
                                    <textarea
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-medium text-gray-900 focus:outline-none focus:border-gray-300 resize-none mb-4"
                                        rows="3"
                                        placeholder="Add internal comment..."
                                        value={internalComment}
                                        onChange={(e) => setInternalComment(e.target.value)}
                                    />
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={handleApprove}
                                            className="flex flex-col items-center justify-center gap-2 py-3 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200"
                                        >
                                            <CheckCircle2 size={18} /> Approve
                                        </button>
                                        <button
                                            onClick={() => setShowRejectInput(true)}
                                            className="flex flex-col items-center justify-center gap-2 py-3 bg-white border border-red-100 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-red-500 hover:bg-red-50 transition-all"
                                        >
                                            <XCircle size={18} /> Reject
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-3 animate-in fade-in">
                                    <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                                        <label className="text-[9px] font-black text-red-400 uppercase tracking-widest block mb-1">Reason for Rejection</label>
                                        <textarea
                                            value={rejectionReason}
                                            onChange={(e) => setRejectionReason(e.target.value)}
                                            placeholder="Reason..."
                                            className="w-full bg-white border border-red-200 rounded-lg p-2 text-xs font-bold text-gray-900 h-20 resize-none focus:outline-none focus:border-red-400"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => setShowRejectInput(false)}
                                            className="py-2.5 bg-gray-100 text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={confirmReject}
                                            className="py-2.5 bg-red-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-200"
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Rejected Details */}
                    {returnRequest.status === 'Rejected' && returnRequest.rejection && (
                        <div className="bg-red-50 rounded-2xl border border-red-100 p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <XCircle size={16} className="text-red-500" />
                                <h3 className="text-xs font-black text-red-900 uppercase tracking-widest">Return Rejected</h3>
                            </div>
                            <p className="text-xs font-bold text-red-800">{returnRequest.rejection.reason}</p>
                            <p className="text-[10px] text-red-400 mt-2">By {returnRequest.rejection.by} • {new Date(returnRequest.rejection.date).toLocaleDateString()}</p>
                        </div>
                    )}

                    {/* Pickup Details (Equivalent to Shipment Details) - Conditional on Approval */}
                    {returnRequest.status === 'Approved' && returnRequest.pickup && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-in fade-in">
                            <div className="flex items-center gap-2 mb-4">
                                <Truck size={16} className="text-gray-400" />
                                <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Pickup Scheduling</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-gray-400">Logistics Partner</span>
                                    <span className="font-black text-gray-900">{returnRequest.pickup.partner}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-gray-400">Tracking ID</span>
                                    <span className="font-black text-gray-900">{returnRequest.pickup.trackingId}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-gray-400">Scheduled Date</span>
                                    <span className="font-black text-emerald-600">{returnRequest.pickup.scheduledDate}</span>
                                </div>
                                <div className="pt-2">
                                    <button className="w-full py-2 border border-blue-100 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-100">
                                        Track Pickup Status
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Customer Info */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <User size={16} className="text-gray-400" />
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Customer</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">
                                {returnRequest.customer.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-xs font-black text-gray-900">{returnRequest.customer.name}</p>
                                <p className="text-[10px] font-bold text-gray-400">{returnRequest.customer.phone}</p>
                                <p className="text-[10px] font-bold text-gray-400">{returnRequest.customer.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Pickup Address */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin size={16} className="text-gray-400" />
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Pickup Address</h3>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <p className="text-xs font-bold text-gray-800 leading-relaxed mb-3">
                                {returnRequest.address.line1}<br />
                                {returnRequest.address.city}, {returnRequest.address.state} - {returnRequest.address.pincode}
                            </p>
                            <span className="inline-flex items-center gap-1 text-[9px] font-black text-blue-500 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                                <Truck size={8} /> Shiprocket API Integration
                            </span>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Clock size={16} className="text-gray-400" />
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Return Timeline</h3>
                        </div>
                        <div className="space-y-6 relative pl-2">
                            {getTimeline().map((step, i, arr) => (
                                <div key={i} className="relative flex items-start gap-4 z-10">
                                    {i !== arr.length - 1 && (
                                        <div className={`absolute left-[9px] top-6 bottom-[-24px] w-[2px] ${step.completed ? 'bg-emerald-100' : 'bg-gray-100'} -z-10`}></div>
                                    )}

                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 shrink-0 ${step.isError
                                            ? 'bg-red-500 border-red-500 text-white'
                                            : step.completed
                                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                                : 'bg-white border-gray-200 text-gray-300'
                                        }`}>
                                        {step.isError ? <X size={10} strokeWidth={4} /> : step.completed && <CheckCircle2 size={10} strokeWidth={4} />}
                                    </div>
                                    <div>
                                        <p className={`text-[10px] font-black uppercase tracking-widest ${step.isError ? 'text-red-600' : 'text-gray-900'}`}>{step.status}</p>
                                        <p className="text-[9px] font-bold text-gray-400 mt-0.5 uppercase tracking-widest">{step.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ReturnDetailPage;
