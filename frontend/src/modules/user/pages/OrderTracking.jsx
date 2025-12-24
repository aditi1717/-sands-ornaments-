import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../../context/ShopContext';
import { ChevronRight, Package, ArrowLeft } from 'lucide-react';

const OrderTracking = () => {
    const { orderId, view } = useParams();
    const { orders } = useShop();
    const navigate = useNavigate();
    const showDetailedTracking = view === 'detail';

    // Normalize IDs for comparison (handle ORD- prefix if present/absent)
    const order = orders.find(o => o.id === orderId || o.id === `ORD-${orderId}` || o.id.replace('ORD-', '') === orderId);

    if (!order) {
        return (
            <div className="min-h-screen pt-32 pb-12 px-4 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-serif text-[#3E2723] mb-4">Order Not Found</h2>
                <p className="text-[#8D6E63] mb-8">We couldn't find the order you're looking for.</p>
                <Link to="/profile" className="text-[#3E2723] underline hover:text-[#5D4037]">Back to Profile</Link>
            </div>
        );
    }

    const formattedDate = new Date(order.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    const fullDate = new Date(order.date).toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    // Simulation State: Initialize from localStorage if available, otherwise 0
    const [currentStepIndex, setCurrentStepIndex] = React.useState(() => {
        const savedStep = localStorage.getItem(`tracking_step_${orderId}`);
        return savedStep ? parseInt(savedStep, 10) : 0;
    });

    // Steps Definition
    const formatDateTime = (dateTimestamp) => {
        return new Date(dateTimestamp).toLocaleString('en-US', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const steps = [
        { status: 'Order Placed', date: formatDateTime(order.date) },
        { status: 'Processing', date: formatDateTime(new Date(order.date).getTime() + 1000 * 60 * 30) }, // + 30 mins
        { status: 'Dispatched', date: formatDateTime(new Date(order.date).getTime() + 1000 * 60 * 60 * 24) }, // + 1 day
        { status: 'In Transit', date: formatDateTime(new Date(order.date).getTime() + 1000 * 60 * 60 * 48) }, // + 2 days
        { status: 'Out For Delivery', date: formatDateTime(new Date(order.date).getTime() + 1000 * 60 * 60 * 72) }, // + 3 days
        { status: 'Delivered', date: formatDateTime(new Date(order.date).getTime() + 1000 * 60 * 60 * 74), isLast: true } // + 3 days 2 hours
    ];

    // Simulation Effect: Advance step every 30 seconds and save to localStorage
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStepIndex(prev => {
                if (prev < steps.length - 1) {
                    const newIndex = prev + 1;
                    localStorage.setItem(`tracking_step_${orderId}`, newIndex);
                    return newIndex;
                }
                return prev;
            });
        }, 30000); // 30 seconds interval

        return () => clearInterval(interval);
    }, [orderId]);

    // Derived State for UI
    const trackingSteps = steps.map((step, index) => ({
        ...step,
        completed: index <= currentStepIndex,
        date: index <= currentStepIndex ? step.date : '' // Hide date for future steps
    }));

    const currentStatusObj = steps[currentStepIndex];

    if (showDetailedTracking) {
        return (
            <div className="min-h-screen pt-12 pb-12 bg-[#FDFBF7] font-sans">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-2">
                        <button
                            onClick={() => navigate(`/order-tracking/${orderId}`)}
                            className="inline-flex items-center text-sm font-medium text-[#8D6E63] hover:text-[#3E2723] transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Summary
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Status Card */}
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#EFEBE9]">
                                <span className="block text-xs text-[#8D6E63] uppercase tracking-widest font-bold mb-2">Current Status</span>
                                <h1 className="text-4xl font-serif font-bold text-[#3E2723]">{currentStatusObj.status}</h1>
                            </div>

                            {/* Timeline Card */}
                            <div className="bg-white p-10 rounded-xl shadow-sm border border-[#EFEBE9] min-h-[400px]">
                                <div className="space-y-0">
                                    {trackingSteps.map((step, index) => (
                                        <div key={index} className="flex gap-6 relative">
                                            {/* Vertical Line */}
                                            {index !== trackingSteps.length - 1 && (
                                                <div className={`absolute left-[11px] top-10 bottom-0 w-0.5 h-full -mb-10 z-0 transition-colors duration-500 ${step.completed && trackingSteps[index + 1]?.completed ? 'bg-[#3E2723]' : 'bg-[#EFEBE9]'}`}></div>
                                            )}

                                            {/* Icon/Dot */}
                                            <div className="relative z-10 flex-shrink-0 mt-1">
                                                {step.isLast ? (
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white transition-all duration-500 ${step.completed ? 'bg-[#3E2723] scale-110 shadow-md' : 'bg-[#D7CCC8]'}`}>
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="20 6 9 17 4 12"></polyline>
                                                        </svg>
                                                    </div>
                                                ) : (
                                                    <div className={`w-6 h-6 rounded-full transition-all duration-500 ${step.completed ? 'bg-[#3E2723] scale-110 shadow-md' : 'bg-[#D7CCC8]'}`}></div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="pb-12 flex-1">
                                                <h4 className={`text-lg font-serif font-bold transition-colors duration-500 ${step.completed ? 'text-[#3E2723]' : 'text-[#BCAAA4]'}`}>
                                                    {step.status}
                                                </h4>
                                                {step.completed && step.date && (
                                                    <p className="text-sm text-[#8D6E63] mt-1 font-medium">{step.date}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Info Panel */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#EFEBE9] sticky top-28">
                                <div className="space-y-6">
                                    <div>
                                        <span className="block text-xs text-[#8D6E63] font-bold uppercase tracking-widest mb-2">Carrier</span>
                                        <p className="text-[#3E2723] font-serif font-bold text-lg">Bluedart</p>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-[#8D6E63] font-bold uppercase tracking-widest mb-2">Tracking ID</span>
                                        <p className="text-[#3E2723] font-mono font-bold text-base">90083815640</p>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-[#8D6E63] font-bold uppercase tracking-widest mb-2">Updated On</span>
                                        <p className="text-[#3E2723] font-medium">{fullDate}</p>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-[#8D6E63] font-bold uppercase tracking-widest mb-2">Order ID</span>
                                        <p className="text-[#3E2723] font-mono font-bold">#{order.id.replace('ORD-', '')}</p>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-[#8D6E63] font-bold uppercase tracking-widest mb-2">Order Date</span>
                                        <p className="text-[#3E2723] font-medium">{formattedDate}</p>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-[#8D6E63] font-bold uppercase tracking-widest mb-2">Order Type</span>
                                        <p className="text-[#3E2723] font-bold uppercase tracking-wider">{order.paymentMethod === 'cod' ? 'COD' : 'PREPAID'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-12 pb-12 bg-[#FDFBF7] font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb / Back */}
                <div className="mb-2">
                    <Link to="/profile" className="inline-flex items-center text-sm font-medium text-[#8D6E63] hover:text-[#3E2723] transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Orders
                    </Link>
                </div>

                {/* Header Section */}
                <div className="bg-white rounded-xl shadow-sm border border-[#EFEBE9] p-8 mb-8 flex flex-wrap gap-8 items-center justify-between">
                    <div>
                        <span className="block text-xs text-[#8D6E63] uppercase tracking-widest font-bold mb-2">Order ID</span>
                        <span className="text-2xl font-serif font-bold text-[#3E2723]">#{order.id.replace('ORD-', '')}</span>
                    </div>
                    <div>
                        <span className="block text-xs text-[#8D6E63] uppercase tracking-widest font-bold mb-2">Total Shipments</span>
                        <span className="text-2xl font-serif font-bold text-[#3E2723]">1</span>
                    </div>
                    <div>
                        <span className="block text-xs text-[#8D6E63] uppercase tracking-widest font-bold mb-2">Order Date</span>
                        <span className="text-2xl font-serif font-bold text-[#3E2723]">{formattedDate}</span>
                    </div>
                    <div>
                        <span className="block text-xs text-[#8D6E63] uppercase tracking-widest font-bold mb-2">
                            {currentStatusObj.status === 'Delivered' ? 'Delivered On' : 'Estimated Delivery'}
                        </span>
                        <span className={`text-lg font-bold font-serif ${currentStatusObj.status === 'Delivered' ? 'text-[#3E2723]' : 'text-emerald-700'}`}>
                            {currentStatusObj.status === 'Delivered'
                                ? currentStatusObj.date
                                : `Arriving by ${steps[steps.length - 1].date.split(',')[0]}`
                            }
                        </span>
                    </div>
                </div>

                {/* Tracking Lists - Full Width now */}
                <div className="space-y-8">

                    {/* Track Deliveries Section */}
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-[#3E2723] mb-6 flex items-center gap-3">
                            <Package className="w-6 h-6" />
                            Track your Deliveries
                        </h3>

                        {/* Delivery Card */}
                        <div className="bg-white border border-[#EFEBE9] rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
                            <div className="p-6 border-b border-[#EFEBE9] flex flex-wrap justify-between items-center gap-4 bg-[#FAFAFA]">
                                <div>
                                    <span className="block text-xs text-[#8D6E63] uppercase tracking-wider font-bold mb-2">Tracking ID</span>
                                    <div className="flex items-center gap-3">
                                        <span className={`w-2.5 h-2.5 rounded-full ${currentStatusObj.status === 'Delivered' ? 'bg-[#3E2723]' : 'bg-green-500 animate-pulse'}`}></span>
                                        <span className="font-serif text-xl font-bold text-[#3E2723]">{currentStatusObj.status}</span>
                                        <span className="text-[#8D6E63] text-sm font-medium">on {currentStatusObj.date.split(',')[0]}</span>
                                    </div>
                                    <span className="text-sm font-mono text-[#5D4037] mt-1 block">{90083815640}</span>
                                </div>
                                <button
                                    onClick={() => navigate(`/order-tracking/${orderId}/detail`)}
                                    className="bg-[#3E2723] text-white px-8 py-3 text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-[#5D4037] hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                                >
                                    Track Order in Detail
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-8 bg-white">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex items-center gap-6 mb-6 last:mb-0 group">
                                        <div className="w-24 h-24 flex-shrink-0 bg-[#F9F9F9] border border-[#EFEBE9] rounded-lg overflow-hidden">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-serif text-lg font-bold text-[#3E2723] mb-1">{item.name}</h4>
                                            <p className="text-sm text-[#8D6E63] font-medium mb-1">Quantity: {item.quantity}</p>
                                            <p className="text-base font-bold text-[#3E2723]">₹{item.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OrderTracking;
