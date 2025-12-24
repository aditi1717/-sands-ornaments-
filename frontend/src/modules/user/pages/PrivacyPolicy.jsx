import React, { useEffect } from 'react';
import { Shield, Eye, Lock, RefreshCw, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const policies = [
        {
            title: "Data We Collect",
            icon: <Eye className="w-6 h-6" />,
            content: "We collect personal information such as name, email, phone number, and shipping address to process your orders and provide a personalized luxury experience."
        },
        {
            title: "Secure Payments",
            icon: <Lock className="w-6 h-6" />,
            content: "Your payment details are encrypted and processed by Razorpay. Sands Ornaments does not store your credit card or bank credentials on our servers."
        },
        {
            title: "Cookies & Tracking",
            icon: <RefreshCw className="w-6 h-6" />,
            content: "We use essential cookies to maintain your shopping bag and analytics cookies to understand how you interact with our collection, helping us improve our service."
        },
        {
            title: "Your Rights",
            icon: <UserCheck className="w-6 h-6" />,
            content: "You have the right to access, update, or delete your personal data at any time through your account dashboard or by contacting our data protection officer."
        }
    ];

    return (
        <div className="bg-[#FAF9F6] min-h-screen py-16">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#3E2723] mb-4">Privacy Policy</h1>
                    <div className="w-24 h-1 bg-[#3E2723] mx-auto mb-6"></div>
                    <p className="text-[#8D6E63]">Your trust is our most valuable asset.</p>
                </div>

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#EFEBE9]">
                    <div className="flex items-center gap-4 mb-8 p-6 bg-green-50 rounded-2xl text-green-800">
                        <Shield className="w-8 h-8 flex-shrink-0" />
                        <p className="text-sm font-medium">Sands Ornaments is committed to ensuring that your privacy is protected and your data is used only to enhance your shopping experience.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {policies.map((policy, idx) => (
                            <div key={idx} className="p-6 rounded-2xl border border-[#EFEBE9] hover:shadow-md transition-shadow">
                                <div className="text-[#3E2723] mb-4">
                                    {policy.icon}
                                </div>
                                <h3 className="text-lg font-serif font-bold text-[#3E2723] mb-3">{policy.title}</h3>
                                <p className="text-sm text-[#8D6E63] leading-relaxed italic">{policy.content}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 border-t border-[#EFEBE9] pt-12">
                        <h4 className="font-serif font-bold text-[#3E2723] mb-6">Third Party Disclosure</h4>
                        <p className="text-[#8D6E63] leading-relaxed mb-8">
                            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website (like shipping partners), so long as those parties agree to keep this information confidential.
                        </p>
                        <div className="bg-[#FAFAFA] p-6 rounded-xl border-l-4 border-[#3E2723]">
                            <p className="text-sm text-[#5D4037] font-medium italic">
                                "We treat your data with the same care and precision we apply to our handcrafted jewelry."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
