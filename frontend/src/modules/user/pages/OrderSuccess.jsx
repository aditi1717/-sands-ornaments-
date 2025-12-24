import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useShop } from '../../../context/ShopContext';

const OrderSuccess = () => {
    // We might want to clear the cart here, but typically that should happen upon successful order placement logic.
    // For now, let's just assume the cart clearing happens elsewhere or let the user do it manually if it's a mock.

    // Confetti effect removed due to installation issues.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-[#FDFBF7]">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-4xl font-serif font-bold text-[#3E2723] mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-8 max-w-lg text-lg">
                Thank you for your purchase. Your order has been received and is being processed. You will receive an email confirmation shortly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop" className="bg-[#5D4037] text-white px-8 py-3.5 rounded-md hover:bg-[#4E342E] transition-colors font-medium flex items-center justify-center gap-2 shadow-lg">
                    Continue Shopping <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/profile/orders" className="bg-white border border-[#5D4037] text-[#5D4037] px-8 py-3.5 rounded-md hover:bg-[#FDFBF7] transition-colors font-medium">
                    View My Orders
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccess;
