import React, { useState } from 'react';
import { useShop } from '../../../context/ShopContext';
import { User, Package, LogOut, ShoppingBag, ChevronRight, Edit2, Check, MapPin, Plus, Trash2, Heart, HelpCircle, CreditCard, Banknote, ShieldCheck, Bell, BellOff, FileText, Shield, AlertTriangle } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const OrderCard = ({ order, isExpanded, onToggle }) => {
    const [localShow, setLocalShow] = useState(false);
    const showDetails = isExpanded !== undefined ? isExpanded : localShow;
    const setShowDetails = onToggle || setLocalShow;

    const subtotal = order.items.reduce((acc, i) => acc + (i.price * i.quantity), 0);
    const shipping = order.total - subtotal;
    const tax = order.total * 0.03;

    return (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden font-sans">
            {/* Header Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 md:px-6 bg-[#FAFAFA] text-sm">
                <div className="flex gap-8 text-[#3E2723]">
                    <div>
                        <span className="font-bold block text-gray-900">{new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div>
                        <span className="text-gray-500 mr-1">Order no.:</span>
                        <span className="font-bold text-gray-900">#{order.id.replace('ORD-', '')}</span>
                    </div>
                    <div>
                        <span className="text-gray-500 mr-1">Total items:</span>
                        <span className="font-bold text-gray-900">{order.items.length}</span>
                    </div>
                    <div>
                        <span className="text-gray-500 mr-1">Payment method:</span>
                        <span className="font-bold text-gray-900">
                            {(() => {
                                const isSimulatedDelivered = localStorage.getItem(`tracking_step_${order.id}`) === '5';
                                const isDelivered = order.status === 'Delivered' || isSimulatedDelivered;
                                if (order.paymentMethod === 'cod') {
                                    return isDelivered ? 'Paid (COD)' : 'Unpaid (COD)';
                                }
                                return 'Paid (Online)';
                            })()}
                        </span>
                    </div>
                </div>
                <div
                    className="flex items-center gap-2 cursor-pointer text-[#3E2723] hover:underline"
                    onClick={() => setShowDetails(!showDetails)}
                >
                    <span>{showDetails ? 'Hide details' : 'View details'}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${showDetails ? 'rotate-90' : ''}`} />
                </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex justify-end gap-3 p-4 bg-white">
                <button className="bg-[#3E2723] text-white px-6 py-2 text-sm font-medium hover:bg-[#5D4037] transition-colors rounded-sm">Return Order</button>
                <button className="bg-[#3E2723] text-white px-6 py-2 text-sm font-medium hover:bg-[#5D4037] transition-colors rounded-sm">Exchange Order</button>
                <Link to={`/order-tracking/${order.id}`} className="bg-[#3E2723] text-white px-6 py-2 text-sm font-medium hover:bg-[#5D4037] transition-colors flex items-center justify-center rounded-sm">Track Order</Link>
            </div>

            {/* Collapsible Section */}
            {showDetails && (
                <div className="bg-[#FAFAFA] border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Products Reel */}
                    <div className="flex gap-8 overflow-x-auto p-6 scrollbar-hide">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex-shrink-0 w-48 text-center group">
                                <div className="relative mb-3 inline-block">
                                    <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden border border-gray-200 bg-white">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <span className="absolute -top-2 -right-2 bg-[#3E2723] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                                        {item.quantity}
                                    </span>
                                </div>
                                <h4 className="text-xs text-[#3E2723] font-medium leading-relaxed line-clamp-2 px-2 h-8 font-serif">{item.name}</h4>
                                <p className="text-sm font-bold text-[#5D4037] mt-1">₹{item.price.toLocaleString()}.00</p>
                            </div>
                        ))}
                    </div>

                    {/* Total Breakdown Table */}
                    <div className="border-t border-gray-200 mx-6">
                        <div className="py-4 space-y-3 text-sm">
                            <div className="flex justify-between text-[#8D6E63]">
                                <span>Sub total</span>
                                <span>₹{subtotal.toLocaleString()}.00</span>
                            </div>
                            <div className="flex justify-between text-[#8D6E63]">
                                <span>Shipping cost</span>
                                <span>₹{shipping.toLocaleString()}.00</span>
                            </div>
                            <div className="flex justify-between text-[#8D6E63]">
                                <span>IGST 3.0%</span>
                                <span>₹{tax.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Grand Total Bar */}
            <div className="bg-[#3E2723] text-white p-4 md:px-6 flex justify-between items-center text-lg font-bold rounded-b-lg">
                <span>Grand total</span>
                <span>₹{order.total.toLocaleString()}.00</span>
            </div>
        </div>
    );
};

const Profile = () => {
    const { user, login, logout, orders, wishlist, addresses, addAddress, removeAddress, setDefaultAddress, defaultAddressId, deleteAccount } = useShop();
    const { activeTab: tabParam, subId } = useParams();
    const activeTab = tabParam || 'profile';
    const navigate = useNavigate();

    // State Synced with params
    const isEditing = subId === 'edit';
    const showAddressForm = subId === 'add';

    const [newAddress, setNewAddress] = useState({
        name: '', phone: '', flatNo: '', area: '', city: '', district: '', state: '', pincode: '', type: 'Home', isDefault: false
    });

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: ''
    });

    const [notifications, setNotifications] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    React.useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.name ? user.name.split(' ')[0] : '',
                lastName: user.name ? user.name.split(' ').slice(1).join(' ') : '',
                email: user.email || '',
                phone: user.phone || ''
            });
        }
    }, [user]);

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <h2 className="text-2xl font-serif text-[#3E2723] mb-4">Please Login to View Profile</h2>
                <Link to="/login" className="inline-block bg-[#3E2723] text-white px-8 py-3 rounded-full hover:bg-[#5D4037] transition-colors">Login Now</Link>
            </div>
        );
    }

    const handleLogout = () => { logout(); navigate('/'); };

    const handleSave = () => {
        const updatedUser = { ...user, name: `${formData.firstName} ${formData.lastName}`.trim(), email: formData.email, phone: formData.phone };
        login(updatedUser);
        navigate('/profile/profile');
    };

    const handleAddAddress = (e) => {
        e.preventDefault();
        addAddress(newAddress);
        navigate('/profile/addresses');
        setNewAddress({ name: '', phone: '', flatNo: '', area: '', city: '', district: '', state: '', pincode: '', type: 'Home', isDefault: false });
    };

    return (
        <div className="container mx-auto px-4 py-12 min-h-[60vh]">
            <h1 className="text-3xl font-serif font-bold text-[#3E2723] mb-8">My Account</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar */}
                <div className="bg-white p-6 rounded-2xl shadow-sm h-fit">
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="bg-[#EFEBE9] p-4 rounded-full">
                            <User className="w-8 h-8 text-[#5D4037]" />
                        </div>
                        <div>
                            <h3 className="font-bold text-[#3E2723] text-lg">{user.name}</h3>
                            <p className="text-sm text-[#8D6E63]">{user.phone || user.email}</p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        <button onClick={() => navigate('/profile/profile')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-[#3E2723] text-white shadow-md' : 'text-gray-600 hover:bg-[#EFEBE9]'}`}>
                            <User className="w-5 h-5" />
                            <span className="font-medium">Profile Details</span>
                        </button>
                        <button onClick={() => navigate('/profile/orders')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-[#3E2723] text-white shadow-md' : 'text-gray-600 hover:bg-[#EFEBE9]'}`}>
                            <Package className="w-5 h-5" />
                            <span className="font-medium">My Orders</span>
                            {orders.length > 0 && <span className={`ml-auto text-xs py-0.5 px-2 rounded-full ${activeTab === 'orders' ? 'bg-white/20' : 'bg-[#EFEBE9]'}`}>{orders.length}</span>}
                        </button>
                        <button onClick={() => navigate('/profile/addresses')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'addresses' ? 'bg-[#3E2723] text-white shadow-md' : 'text-gray-600 hover:bg-[#EFEBE9]'}`}>
                            <MapPin className="w-5 h-5" />
                            <span className="font-medium">My Addresses</span>
                            {addresses.length > 0 && <span className={`ml-auto text-xs py-0.5 px-2 rounded-full ${activeTab === 'addresses' ? 'bg-white/20' : 'bg-[#EFEBE9]'}`}>{addresses.length}</span>}
                        </button>
                        <button onClick={() => navigate('/wishlist')} className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-[#EFEBE9] rounded-xl transition-all">
                            <Heart className="w-5 h-5 text-red-500" />
                            <span className="font-medium">My Wishlist</span>
                            {wishlist.length > 0 && <span className="ml-auto text-xs py-0.5 px-2 rounded-full bg-[#EFEBE9]">{wishlist.length}</span>}
                        </button>
                        <button onClick={() => navigate('/profile/payments')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'payments' ? 'bg-[#3E2723] text-white shadow-md' : 'text-gray-600 hover:bg-[#EFEBE9]'}`}>
                            <CreditCard className="w-5 h-5" />
                            <span className="font-medium">Payments</span>
                        </button>
                        <button onClick={() => navigate('/help')} className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-[#EFEBE9] rounded-xl transition-all">
                            <HelpCircle className="w-5 h-5 text-[#8D6E63]" />
                            <span className="font-medium">Help Center</span>
                        </button>

                        <hr className="my-4 border-[#EFEBE9]" />

                        <div className="px-4 py-2 text-[10px] font-bold text-[#8D6E63] uppercase tracking-widest">Preferences</div>
                        <div className="px-4 py-3">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3 text-gray-600">
                                    {notifications ? <Bell className="w-5 h-5 text-amber-500" /> : <BellOff className="w-5 h-5" />}
                                    <span className="font-medium text-sm">Notifications</span>
                                </div>
                                <button onClick={() => setNotifications(!notifications)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${notifications ? 'bg-[#3E2723]' : 'bg-gray-200'}`}>
                                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${notifications ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                </button>
                            </div>
                            <p className="text-[10px] text-[#8D6E63] leading-relaxed italic pr-2">
                                Don't miss any opportunity to grab your favorite ornaments as soon as they drop!
                            </p>
                        </div>

                        <div className="px-4 py-2 text-[10px] font-bold text-[#8D6E63] uppercase tracking-widest">Legal</div>
                        <button onClick={() => navigate('/terms')} className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-[#EFEBE9] rounded-xl transition-all">
                            <FileText className="w-5 h-5" />
                            <span className="font-medium text-sm">Terms & Conditions</span>
                        </button>
                        <button onClick={() => navigate('/privacy')} className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-[#EFEBE9] rounded-xl transition-all">
                            <Shield className="w-5 h-5" />
                            <span className="font-medium text-sm">Privacy Policy</span>
                        </button>

                        <hr className="my-4 border-[#EFEBE9]" />
                        <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                        <button onClick={() => setShowDeleteModal(true)} className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors mt-2">
                            <Trash2 className="w-5 h-5" />
                            <span className="font-medium text-sm">Delete Account</span>
                        </button>
                    </nav>
                </div>

                {/* Content Area */}
                <div className="md:col-span-2">
                    {activeTab === 'profile' ? (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="bg-white p-8 rounded-2xl shadow-sm relative">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-serif text-[#3E2723]">Personal Information</h2>
                                    <button
                                        onClick={() => isEditing ? handleSave() : navigate('/profile/profile/edit')}
                                        className={`p-2 rounded-full transition-all duration-300 ${isEditing ? 'bg-[#3E2723] text-white' : 'bg-[#EFEBE9] text-[#5D4037]'}`}
                                    >
                                        {isEditing ? <Check className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
                                    </button>
                                </div>

                                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-[#5D4037] uppercase tracking-widest mb-2">First Name</label>
                                        {isEditing ? <input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full border border-gray-100 rounded-lg px-4 py-3" /> : <div className="w-full bg-[#FAFAFA] rounded-lg px-4 py-3">{user.name ? user.name.split(' ')[0] : ''}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#5D4037] uppercase tracking-widest mb-2">Last Name</label>
                                        {isEditing ? <input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full border border-gray-100 rounded-lg px-4 py-3" /> : <div className="w-full bg-[#FAFAFA] rounded-lg px-4 py-3">{user.name ? user.name.split(' ').slice(1).join(' ') : ''}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#5D4037] uppercase tracking-widest mb-2">Email</label>
                                        {isEditing ? <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border border-gray-100 rounded-lg px-4 py-3" /> : <div className="w-full bg-[#FAFAFA] rounded-lg px-4 py-3">{user.email || 'Not provided'}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#5D4037] uppercase tracking-widest mb-2">Phone</label>
                                        {isEditing ? <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border border-gray-100 rounded-lg px-4 py-3" /> : <div className="w-full bg-[#FAFAFA] rounded-lg px-4 py-3">+91 {user.phone}</div>}
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : activeTab === 'orders' ? (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-2xl font-serif text-[#3E2723]">My Orders</h2>
                            {orders.length === 0 ? (
                                <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
                                    <ShoppingBag className="w-12 h-12 text-[#EFEBE9] mx-auto mb-4" />
                                    <p className="text-[#8D6E63] mb-6">No orders yet.</p>
                                    <Link to="/shop" className="bg-[#3E2723] text-white px-8 py-3 rounded-full hover:bg-[#5D4037]">Start Shopping</Link>
                                </div>
                            ) : orders.map(order => <OrderCard key={order.id} order={order} isExpanded={subId === order.id} onToggle={() => navigate(subId === order.id ? '/profile/orders' : `/profile/orders/${order.id}`)} />)}
                        </div>
                    ) : activeTab === 'payments' ? (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-2xl font-serif text-[#3E2723]">Payment Methods</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-2xl border border-[#EFEBE9]">
                                    <div className="flex items-center gap-3 mb-4"><div className="bg-blue-50 p-2 rounded-lg text-blue-600"><CreditCard className="w-5 h-5" /></div><h3 className="font-bold">Razorpay Secure</h3></div>
                                    <p className="text-xs text-[#8D6E63] mb-4">Cards, UPI, NetBanking. 100% Secure.</p>
                                    <div className="flex gap-2 opacity-50"><CreditCard className="w-4 h-4" /><ShieldCheck className="w-4 h-4" /></div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-[#EFEBE9]">
                                    <div className="flex items-center gap-3 mb-4"><div className="bg-green-50 p-2 rounded-lg text-green-600"><Banknote className="w-5 h-5" /></div><h3 className="font-bold">Cash on Delivery</h3></div>
                                    <p className="text-xs text-[#8D6E63] mb-4">Pay in cash on delivery.</p>
                                    <div className="flex gap-2 opacity-50"><ShieldCheck className="w-4 h-4" /></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-serif text-[#3E2723]">My Addresses</h2>
                                <button onClick={() => showAddressForm ? navigate('/profile/addresses') : navigate('/profile/addresses/add')} className="bg-[#3E2723] text-white px-4 py-2 rounded-lg text-sm">{showAddressForm ? 'Cancel' : 'Add New'}</button>
                            </div>
                            {showAddressForm && (
                                <form onSubmit={handleAddAddress} className="bg-white p-8 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input placeholder="Name" value={newAddress.name} onChange={e => setNewAddress({ ...newAddress, name: e.target.value })} className="w-full border p-3 rounded-lg" required />
                                    <input placeholder="Phone" value={newAddress.phone} onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })} className="w-full border p-3 rounded-lg" required />
                                    <input placeholder="Flat / Building" value={newAddress.flatNo} onChange={e => setNewAddress({ ...newAddress, flatNo: e.target.value })} className="md:col-span-2 w-full border p-3 rounded-lg" required />
                                    <input placeholder="City" value={newAddress.city} onChange={e => setNewAddress({ ...newAddress, city: e.target.value })} className="w-full border p-3 rounded-lg" required />
                                    <input placeholder="Pincode" value={newAddress.pincode} onChange={e => setNewAddress({ ...newAddress, pincode: e.target.value })} className="w-full border p-3 rounded-lg" required />
                                    <button type="submit" className="md:col-span-2 bg-[#3E2723] text-white py-3 rounded-lg">Save Address</button>
                                </form>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {addresses.map(addr => (
                                    <div key={addr.id} className="bg-white p-6 rounded-2xl shadow-sm relative">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-[10px] font-bold uppercase py-1 px-2 bg-gray-100 rounded">{addr.type}</span>
                                            <button onClick={() => removeAddress(addr.id)} className="text-red-400"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                        <h4 className="font-bold">{addr.name}</h4>
                                        <p className="text-sm text-[#8D6E63]">{addr.flatNo}, {addr.city} - {addr.pincode}</p>
                                        {defaultAddressId !== addr.id && <button onClick={() => setDefaultAddress(addr.id)} className="text-xs underline mt-4">Set Default</button>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Account Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                        <div className="bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center text-red-500 mb-6 mx-auto">
                            <AlertTriangle className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-[#3E2723] text-center mb-4">Delete Account?</h3>
                        <p className="text-[#8D6E63] text-center mb-8 leading-relaxed">
                            This action is permanent and cannot be undone. All your orders, addresses, and wishlist will be wiped forever.
                        </p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => {
                                    deleteAccount();
                                    navigate('/');
                                }}
                                className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg text-sm uppercase tracking-widest"
                            >
                                Yes, Delete My Account
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="w-full bg-[#EFEBE9] text-[#5D4037] py-4 rounded-xl font-bold hover:bg-[#D7CCC8] transition-all text-sm uppercase tracking-widest"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
