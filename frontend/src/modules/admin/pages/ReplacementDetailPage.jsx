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
    AlertCircle,
    XCircle,
    Replace,
    Box,
    X,
    Image as ImageIcon
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const ReplacementDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    // Approval/Processing State
    const [condition, setCondition] = useState('Good Condition'); // Good Condition, Damaged
    const [action, setAction] = useState('Restock'); // Restock, Discard
    const [showRejectInput, setShowRejectInput] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');

    useEffect(() => {
        // Simulate Fetching Data
        setLoading(true);
        setTimeout(() => {
            setRequest({
                id: id || 'RPL-203',
                orderId: 'ORD-6003',
                requestDate: '06/02/2025',
                status: 'Pending', // Default status
                originalItem: {
                    name: 'Premium Almond Jumbo Size (500g)',
                    sku: 'PRO-ALM-500',
                    qty: 1,
                    price: 1200,
                    image: 'https://via.placeholder.com/50'
                },
                replacementItem: {
                    name: 'Premium Almond Jumbo Size (500g)',
                    sku: 'PRO-ALM-500',
                    qty: 1,
                    price: 1200,
                    image: 'https://via.placeholder.com/50'
                },
                reason: 'Damaged',
                comment: "Packet was torn and moisture entered.",
                evidence: ['https://via.placeholder.com/100'],
                customer: {
                    name: 'Rahul Roy',
                    phone: '+91 77777 88888',
                    email: 'rahul.roy@example.com'
                },
                address: {
                    line1: 'B-45, 2nd Lane',
                    city: 'Kolkata',
                    state: 'West Bengal',
                    pincode: '700001'
                },
                pickup: null, // Will be populated on approval
                newShipment: null, // Will be populated on approval
                timeline: [
                    { status: 'Replacement Requested', date: '06/02/2025', completed: true },
                    { status: 'Admin Approval', date: 'Pending', completed: false },
                    { status: 'Return Pickup', date: 'Pending', completed: false },
                    { status: 'New Item Shipped', date: 'Pending', completed: false }
                ]
            });
            setLoading(false);
        }, 500);
    }, [id]);

    const handleProcess = () => {
        setRequest(prev => ({
            ...prev,
            status: 'Approved',
            pickup: {
                partner: 'Delhivery Surface',
                trackingId: 'RET-99887766',
                scheduledDate: 'Tomorrow, 10 AM - 2 PM',
                status: 'Scheduled'
            },
            newShipment: {
                partner: 'BlueDart Express',
                awb: 'A-123456789',
                estimatedDelivery: '3 Days'
            }
        }));
    };

    const confirmReject = () => {
        if (!rejectionReason.trim()) return;
        setRequest(prev => ({
            ...prev,
            status: 'Rejected',
            rejection: {
                reason: rejectionReason,
                by: 'Admin',
                date: new Date().toISOString()
            }
        }));
        setShowRejectInput(false);
    };

    if (loading) return <div className="p-10 text-center text-gray-400 font-bold uppercase tracking-widest">Loading Details...</div>;
    if (!request) return <div className="p-10 text-center text-red-400 font-bold uppercase tracking-widest">Request not found</div>;

    const statusStyle = (status) => {
        switch (status) {
            case 'Approved': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'Shipped': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Rejected': return 'bg-red-50 text-red-600 border-red-100';
            case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    const getTimeline = () => {
        const steps = [...request.timeline];
        if (request.status === 'Approved' || request.status === 'Shipped') {
            steps[1] = { status: 'Admin Approved', date: 'Today', completed: true };
            steps[2] = { status: 'Return Pickup Scheduled', date: 'Today', completed: true };
            steps[3] = { status: 'New Item Shipped', date: 'Today', completed: true };
        } else if (request.status === 'Rejected') {
            steps[1] = { status: 'Admin Rejected', date: 'Today', completed: true, isError: true };
        }
        return steps;
    };

    return (
        <div className="space-y-6 font-sans text-left pb-20 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <button
                    onClick={() => navigate('/admin/replacements')}
                    className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 uppercase tracking-widest transition-colors"
                >
                    <ArrowLeft size={16} /> Back to Replacements
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
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Replacement ID</p>
                    <p className="text-xl font-black text-gray-900">#{request.id}</p>
                </div>
                <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                    <p className="text-sm font-bold text-blue-600">{request.orderId}</p>
                </div>
                <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Request Date</p>
                    <p className="text-sm font-bold text-gray-900">{request.requestDate}</p>
                </div>
                <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusStyle(request.status)}`}>
                        {request.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column (Items & Evidence) */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Original Item (Return) */}
                    <div className="bg-red-50/50 rounded-2xl border border-red-100 overflow-hidden">
                        <div className="px-6 py-4 flex items-center gap-2 border-b border-red-100">
                            <Box size={16} className="text-red-400" />
                            <h3 className="text-xs font-black text-red-900 uppercase tracking-widest">Original Item (To Return)</h3>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-lg border border-red-100 p-1">
                                    <img src={request.originalItem.image} className="w-full h-full object-contain mix-blend-multiply" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-900">{request.originalItem.name}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">SKU: {request.originalItem.sku}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-gray-900">Qty: {request.originalItem.qty}</p>
                                    <p className="text-xs font-bold text-gray-500">₹{request.originalItem.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Replacement Item (New) */}
                    <div className="bg-emerald-50/50 rounded-2xl border border-emerald-100 overflow-hidden">
                        <div className="px-6 py-4 flex items-center gap-2 border-b border-emerald-100">
                            <Replace size={16} className="text-emerald-500" />
                            <h3 className="text-xs font-black text-emerald-900 uppercase tracking-widest">Replacement Item (New Request)</h3>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-lg border border-emerald-100 p-1">
                                    <img src={request.replacementItem.image} className="w-full h-full object-contain mix-blend-multiply" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-900">{request.replacementItem.name}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">SKU: {request.replacementItem.sku}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-gray-900">Qty: {request.replacementItem.qty}</p>
                                    <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[9px] font-black uppercase tracking-widest">Price Matched</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reason & Evidence */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertCircle size={16} className="text-gray-400" />
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Reason & Evidence</h3>
                        </div>
                        <div className="flex gap-4 items-start mb-6">
                            <div className="px-3 py-1 bg-gray-100 rounded text-[10px] font-black uppercase tracking-widest text-gray-600">
                                Reason: {request.reason}
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Customer Comment</p>
                            <p className="text-xs font-bold text-gray-600 italic">"{request.comment}"</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Proof Uploads</p>
                            <div className="flex gap-3">
                                {request.evidence.map((img, i) => (
                                    <div key={i} className="w-24 h-24 bg-gray-50 rounded-xl border border-gray-100 p-1">
                                        <img src={img} className="w-full h-full object-cover rounded-lg" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* New Shipment Details (Conditional) */}
                    {request.newShipment && (
                        <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-6 animate-in slide-in-from-bottom-2">
                            <div className="flex items-center gap-2 mb-4">
                                <Truck size={16} className="text-emerald-600" />
                                <h3 className="text-xs font-black text-emerald-900 uppercase tracking-widest">New Order Shipment Details</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Partner</p>
                                    <p className="text-xs font-bold text-emerald-900">{request.newShipment.partner}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">AWB Number</p>
                                    <p className="text-xs font-bold text-emerald-900">{request.newShipment.awb}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Estimated Delivery</p>
                                    <p className="text-xs font-bold text-emerald-900">{request.newShipment.estimatedDelivery}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column (Actions & Info) */}
                <div className="space-y-6">

                    {/* Admin Actions (Pending Only) */}
                    {request.status === 'Pending' && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden relative">
                            {/* Header Background Accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-400"></div>

                            <div className="flex items-center gap-2 mb-6 mt-2">
                                <AlertCircle size={16} className="text-amber-500" />
                                <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Set Verification</h3>
                            </div>

                            {!showRejectInput ? (
                                <div className="space-y-6">
                                    {/* Condition Check */}
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Item Condition</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                onClick={() => setCondition('Good Condition')}
                                                className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${condition === 'Good Condition' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100'}`}
                                            >
                                                Good Condition
                                            </button>
                                            <button
                                                onClick={() => setCondition('Damaged')}
                                                className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${condition === 'Damaged' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100'}`}
                                            >
                                                Damaged
                                            </button>
                                        </div>
                                    </div>

                                    {/* Request Action */}
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Inventory Action</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                onClick={() => setAction('Restock')}
                                                className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${action === 'Restock' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100'}`}
                                            >
                                                Restock
                                            </button>
                                            <button
                                                onClick={() => setAction('Discard')}
                                                className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${action === 'Discard' ? 'bg-gray-100 border-gray-300 text-gray-600' : 'bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100'}`}
                                            >
                                                Discard
                                            </button>
                                        </div>
                                    </div>

                                    {/* Main Buttons */}
                                    <div className="pt-2 space-y-3">
                                        <button
                                            onClick={handleProcess}
                                            className="w-full py-4 bg-[#0f172a] hover:bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Replace size={16} /> Process & Ship New Item
                                        </button>
                                        <button
                                            onClick={() => setShowRejectInput(true)}
                                            className="w-full py-2 bg-white border border-red-100 text-red-500 rounded-lg text-[10px] font-black uppercase tracking-widest hover:border-red-500 hover:bg-red-50 transition-all"
                                        >
                                            Reject Request
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="animate-in fade-in">
                                    <textarea
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                        placeholder="Reason for rejection..."
                                        className="w-full bg-red-50 border border-red-100 rounded-lg p-3 text-xs font-bold text-gray-900 min-h-[100px] mb-3 focus:outline-none focus:border-red-300"
                                        autoFocus
                                    />
                                    <div className="grid grid-cols-2 gap-3">
                                        <button onClick={() => setShowRejectInput(false)} className="py-2 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-black uppercase tracking-widest">Cancel</button>
                                        <button onClick={confirmReject} className="py-2 bg-red-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">Confirm Reject</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Rejected State */}
                    {request.status === 'Rejected' && (
                        <div className="bg-red-50 rounded-2xl border border-red-100 p-6">
                            <h3 className="text-xs font-black text-red-900 uppercase tracking-widest mb-2">Request Rejected</h3>
                            <p className="text-xs font-bold text-red-800">{request.rejection?.reason}</p>
                        </div>
                    )}

                    {/* Approved: Return Pickup Details */}
                    {request.pickup && (
                        <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6 animate-in slide-in-from-top-4">
                            <div className="flex items-center gap-2 mb-4">
                                <Truck size={16} className="text-blue-600" />
                                <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest">Return Pickup Details</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-blue-400">Logistics Partner</span>
                                    <span className="font-black text-blue-900">{request.pickup.partner}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-blue-400">Tracking ID</span>
                                    <span className="font-black text-blue-900">{request.pickup.trackingId}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-blue-400">Pickup Status</span>
                                    <span className="font-black text-emerald-600">{request.pickup.status}</span>
                                </div>
                                <button className="w-full mt-2 py-2 bg-white border border-blue-100 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-blue-50">
                                    Track Status
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Customer */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <User size={16} className="text-gray-400" />
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Customer</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">
                                {request.customer.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-xs font-black text-gray-900">{request.customer.name}</p>
                                <p className="text-[10px] font-bold text-gray-400">{request.customer.phone}</p>
                                <p className="text-[10px] font-bold text-gray-400">{request.customer.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin size={16} className="text-gray-400" />
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Pickup Address</h3>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <p className="text-xs font-bold text-gray-800 leading-relaxed mb-3">
                                {request.address.line1}<br />
                                {request.address.city}, {request.address.state} - {request.address.pincode}
                            </p>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Clock size={16} className="text-gray-400" />
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Status Timeline</h3>
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

export default ReplacementDetailPage;
