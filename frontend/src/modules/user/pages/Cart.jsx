import React, { useMemo } from 'react';
import { useShop } from '../../../context/ShopContext';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useShop();

    const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    const shipping = subtotal > 499 ? 0 : 50; // Mock logic
    const total = subtotal + shipping;

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBagIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-3xl font-serif font-medium text-[#3E2723] mb-4">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8 max-w-md leading-relaxed">
                    Looks like you haven't added anything to your cart yet. Explore our collection to find something you love.
                </p>
                <Link
                    to="/shop"
                    className="bg-[#3E2723] text-white px-10 py-3.5 rounded-sm hover:bg-[#5D4037] transition-all duration-300 font-medium tracking-wide shadow-md hover:shadow-lg"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-serif font-bold text-[#3E2723] mb-8 text-center md:text-left">Shopping Cart ({cart.length})</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items List */}
                <div className="flex-grow space-y-6">
                    {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 md:gap-6 border border-gray-100 p-4 rounded-lg bg-white shadow-sm">
                            <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-grow flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-serif font-medium text-lg text-gray-900 line-clamp-1">{item.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                                    </div>
                                    <p className="font-bold text-gray-900">₹{(item.price * (item.quantity || 1)).toLocaleString()}</p>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center border border-gray-300 rounded">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="px-2 py-1 hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="px-2 text-sm font-medium">{item.quantity || 1}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                                    >
                                        <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">Remove</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-[380px] flex-shrink-0">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-24">
                        <h2 className="font-serif font-bold text-xl text-gray-900 mb-6">Order Summary</h2>

                        <div className="space-y-3 text-sm text-gray-600 mb-6">
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

                        <Link to="/checkout" className="w-full bg-[#5D4037] text-white py-3.5 rounded-md font-medium hover:bg-[#4E342E] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                            Proceed to Checkout <ArrowRight className="w-4 h-4" />
                        </Link>

                        <div className="mt-6 text-center">
                            <Link to="/shop" className="text-sm text-gray-500 hover:text-[#5D4037] underline">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Icon
const ShoppingBagIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
);

export default Cart;
