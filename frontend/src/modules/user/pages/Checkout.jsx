import React, { useState } from 'react';
import { useShop } from '../../../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { Truck, CreditCard, Banknote, ShieldCheck, Lock, Plus, Check, MapPin } from 'lucide-react';

const Checkout = () => {
    const { cart, placeOrder, user, login, addresses, addAddress, defaultAddressId } = useShop();
    const navigate = useNavigate();

    // Login State
    const [loginStep, setLoginStep] = useState(1); // 1: Phone, 2: OTP
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']); // 4 digit OTP

    // Checkout Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        flatNo: '',
        area: '',
        city: '',
        district: '',
        state: '',
        pincode: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('online');
    const [loading, setLoading] = useState(false);
    const [addressSelection, setAddressSelection] = useState(addresses.length > 0 ? 'saved' : 'new');
    const [saveNewAddress, setSaveNewAddress] = useState(false);

    // Calculate totals
    const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    const shipping = subtotal > 499 ? 0 : 50;
    const total = subtotal + shipping;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // --- Login Handlers ---
    const handleSendOtp = (e) => {
        e.preventDefault();
        if (phoneNumber.length === 10) {
            setLoginStep(2);
        } else {
            alert("Please enter a valid 10-digit phone number");
        }
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        if (enteredOtp.length === 4) {
            // Mock Login Success
            login({ names: 'Guest User', phone: phoneNumber });
            // Pre-fill phone in checkout form
            setFormData(prev => ({ ...prev, phone: phoneNumber }));
        } else {
            alert("Please enter the 4-digit OTP");
        }
    };

    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return;

        let newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Focus next input
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    // --- Checkout Handler ---
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // If new address and "Save Address" is checked
        if ((addressSelection === 'new' || addresses.length === 0) && saveNewAddress) {
            addAddress({
                name: `${formData.firstName} ${formData.lastName}`,
                phone: formData.phone,
                flatNo: formData.flatNo,
                area: formData.area,
                city: formData.city,
                district: formData.district,
                state: formData.state,
                pincode: formData.pincode,
                type: 'Home'
            });
        }

        // Simulate API call
        if (paymentMethod === 'online') {
            setTimeout(() => {
                setLoading(false);
                placeOrder({ shippingAddress: formData, paymentMethod: 'razorpay', amount: total });
                navigate('/order-success');
            }, 3000);
            return;
        }

        setTimeout(() => {
            setLoading(false);
            placeOrder({ shippingAddress: formData, paymentMethod: 'cod', amount: total });
            navigate('/order-success');
        }, 2000);
    };

    // Pre-fill default address if it exists
    React.useEffect(() => {
        if (user && addresses.length > 0 && defaultAddressId) {
            const defaultAddr = addresses.find(a => a.id === defaultAddressId);
            if (defaultAddr) {
                setFormData({
                    firstName: defaultAddr.name.split(' ')[0] || '',
                    lastName: defaultAddr.name.split(' ').slice(1).join(' ') || '',
                    email: user.email || '',
                    phone: defaultAddr.phone,
                    flatNo: defaultAddr.flatNo || '',
                    area: defaultAddr.area || '',
                    city: defaultAddr.city,
                    district: defaultAddr.district || '',
                    state: defaultAddr.state || '',
                    pincode: defaultAddr.pincode
                });
                setAddressSelection('saved');
            }
        }
    }, [user, addresses, defaultAddressId]);

    React.useEffect(() => {
        if (cart.length === 0) {
            navigate('/cart');
        }
    }, [cart, navigate]);

    if (cart.length === 0) {
        return null;
    }

    // --- 1. Login View (If not logged in) ---
    if (!user) {
        return (
            <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center max-w-md w-full">
                    <div className="w-16 h-16 bg-[#FDFBF7] rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-[#5D4037]" strokeWidth={1.5} />
                    </div>

                    <h2 className="text-2xl font-serif font-bold text-[#3E2723] mb-2">
                        {loginStep === 1 ? 'Login to Checkout' : 'Verify Phone Number'}
                    </h2>
                    <p className="text-gray-500 mb-8 text-sm">
                        {loginStep === 1
                            ? 'Please enter your phone number to proceed'
                            : `Enter the 4-digit code sent to +91 ${phoneNumber}`
                        }
                    </p>

                    {loginStep === 1 ? (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-500 font-medium">+91</span>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:ring-[#8D6E63] focus:border-[#8D6E63] tracking-widest text-lg outline-none"
                                    placeholder="Enter Phone Number"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#5D4037] text-white py-3.5 rounded-lg font-medium hover:bg-[#4E342E] transition-all shadow-md"
                            >
                                Send OTP
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div className="flex justify-center gap-4">
                                {otp.map((data, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        value={data}
                                        onChange={(e) => handleOtpChange(e.target, index)}
                                        onFocus={(e) => e.target.select()}
                                        className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl font-bold focus:ring-[#8D6E63] focus:border-[#8D6E63] outline-none"
                                    />
                                ))}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#5D4037] text-white py-3.5 rounded-lg font-medium hover:bg-[#4E342E] transition-all shadow-md"
                            >
                                Verify & Proceed
                            </button>
                            <button
                                type="button"
                                onClick={() => setLoginStep(1)}
                                className="text-xs text-gray-500 hover:text-[#5D4037] underline block mx-auto mt-4"
                            >
                                Change Phone Number
                            </button>
                        </form>
                    )}
                </div>
            </div>
        );
    }

    // --- 2. Checkout View (If logged in) ---
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-3xl font-serif font-bold text-[#3E2723] mb-8 text-center">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Form */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Shipping Address */}
                    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-medium text-gray-800 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-[#5D4037] text-white flex items-center justify-center text-sm">1</span>
                                Shipping Details
                            </h2>
                        </div>

                        {/* Saved Addresses List */}
                        {addresses.length > 0 && (
                            <div className="mb-8">
                                <p className="text-sm font-bold text-[#8D6E63] uppercase tracking-widest mb-4">Saved Addresses</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {addresses.map((addr) => (
                                        <div
                                            key={addr.id}
                                            onClick={() => {
                                                setFormData({
                                                    firstName: addr.name.split(' ')[0] || '',
                                                    lastName: addr.name.split(' ').slice(1).join(' ') || '',
                                                    email: user.email || '',
                                                    phone: addr.phone,
                                                    flatNo: addr.flatNo || '',
                                                    area: addr.area || '',
                                                    city: addr.city,
                                                    district: addr.district || '',
                                                    state: addr.state || '',
                                                    pincode: addr.pincode
                                                });
                                                setAddressSelection('saved');
                                            }}
                                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.flatNo === addr.flatNo && formData.area === addr.area ? 'border-[#5D4037] bg-stone-50' : 'border-[#EFEBE9] hover:border-[#D7CCC8]'}`}
                                        >
                                            <div className="flex justify-between mb-2">
                                                <div className="flex gap-2">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-[#EFEBE9] text-[#5D4037] rounded-full">{addr.type}</span>
                                                    {defaultAddressId === addr.id && (
                                                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-[#3E2723] text-white rounded-full">Default</span>
                                                    )}
                                                </div>
                                                {(formData.flatNo === addr.flatNo && formData.area === addr.area) && <Check className="w-4 h-4 text-[#5D4037]" />}
                                            </div>
                                            <p className="font-bold text-[#3E2723] text-sm">{addr.name}</p>
                                            <p className="text-xs text-[#8D6E63] mt-1 line-clamp-2">{addr.flatNo}, {addr.area}, {addr.city}</p>
                                            <p className="text-xs text-[#8D6E63]">{addr.pincode}</p>
                                        </div>
                                    ))}
                                    <div
                                        onClick={() => {
                                            setFormData({
                                                firstName: '',
                                                lastName: '',
                                                email: user.email || '',
                                                phone: '',
                                                flatNo: '',
                                                area: '',
                                                city: '',
                                                district: '',
                                                state: '',
                                                pincode: ''
                                            });
                                            setAddressSelection('new');
                                        }}
                                        className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-stone-50 ${addressSelection === 'new' ? 'border-[#5D4037] bg-stone-50' : 'border-[#EFEBE9] text-[#8D6E63]'}`}
                                    >
                                        <Plus className="w-5 h-5 mb-1" />
                                        <span className="text-xs font-bold uppercase tracking-widest">New Address</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <p className="text-sm font-bold text-[#8D6E63] uppercase tracking-widest mb-2">
                                    {addressSelection === 'new' || addresses.length === 0 ? 'Delivery Address' : 'Selected Address Details'}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    required
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    required
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none transition-colors"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none transition-colors"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Flat / House / Building</label>
                                <input
                                    required
                                    type="text"
                                    name="flatNo"
                                    value={formData.flatNo}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Area / Street / Sector</label>
                                <input
                                    required
                                    type="text"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none transition-colors"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">City</label>
                                <input
                                    required
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">District</label>
                                <input
                                    required
                                    type="text"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">State</label>
                                <input
                                    required
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Pincode</label>
                                <input
                                    required
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none transition-colors"
                                />
                            </div>
                            {(addressSelection === 'new' || addresses.length === 0) && (
                                <div className="md:col-span-2 flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="save-address"
                                        checked={saveNewAddress}
                                        onChange={(e) => setSaveNewAddress(e.target.checked)}
                                        className="w-4 h-4 text-[#5D4037] focus:ring-[#5D4037] border-gray-300 rounded cursor-pointer"
                                    />
                                    <label htmlFor="save-address" className="text-sm text-gray-600 cursor-pointer">Save this address to my profile</label>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-medium text-gray-800 mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-[#5D4037] text-white flex items-center justify-center text-sm">2</span>
                            Payment Method
                        </h2>

                        <div className="space-y-4">
                            <label className={`flex items-center gap-4 border p-4 rounded-lg cursor-pointer transition-all ${paymentMethod === 'online' ? 'border-[#5D4037] bg-stone-50' : 'border-gray-200 hover:border-stone-300'}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="online"
                                    checked={paymentMethod === 'online'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-4 h-4 text-[#5D4037] focus:ring-[#5D4037]"
                                />
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                                        <CreditCard size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Credit/Debit Card / UPI / NetBanking</p>
                                        <p className="text-sm text-gray-500">Fast and secure online payment</p>
                                    </div>
                                </div>
                            </label>

                            <label className={`flex items-center gap-4 border p-4 rounded-lg cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#5D4037] bg-stone-50' : 'border-gray-200 hover:border-stone-300'}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-4 h-4 text-[#5D4037] focus:ring-[#5D4037]"
                                />
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-50 p-2 rounded-full text-green-600">
                                        <Banknote size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Cash on Delivery</p>
                                        <p className="text-sm text-gray-500">Pay when you receive your order</p>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-24 shadow-sm">
                        <h2 className="font-serif font-bold text-xl text-gray-900 mb-6">Order Summary</h2>

                        {/* Mini Cart in Summary */}
                        <div className="max-h-60 overflow-y-auto mb-6 pr-2 space-y-4 custom-scrollbar">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-3">
                                    <div className="w-16 h-16 bg-gray-50 rounded overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</p>
                                        <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity || 1}</p>
                                        <p className="text-sm font-bold text-gray-800 mt-1">₹{(item.price * (item.quantity || 1)).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 text-sm text-gray-600 mb-6 py-6 border-t border-gray-100">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? <span className="text-green-600">Free</span> : `₹${shipping}`}</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-lg text-gray-900">Total</span>
                                <span className="font-bold text-xl text-[#5D4037]">₹{total.toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
                        </div>

                        <div className="bg-gray-50 p-3 rounded text-xs text-gray-500 mb-6 flex gap-2">
                            <ShieldCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
                        </div>

                        <button
                            form="checkout-form"
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-[#5D4037] text-white py-3.5 rounded-md font-medium hover:bg-[#4E342E] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    {paymentMethod === 'online' ? 'Redirecting to Razorpay...' : 'Processing...'}
                                </span>
                            ) : (
                                <span>{paymentMethod === 'online' ? 'Pay Now & Place Order' : 'Place Order (COD)'}</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
