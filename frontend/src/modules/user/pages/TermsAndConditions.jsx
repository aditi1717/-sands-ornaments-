import React, { useEffect } from 'react';
import { FileText, ShieldCheck, Scale, AlertCircle } from 'lucide-react';

const TermsAndConditions = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            title: "1. Acceptance of Terms",
            icon: <ShieldCheck className="w-6 h-6" />,
            content: "By accessing and using Sands Ornaments, you agree to be bound by these Terms and Conditions. Our services are provided to you subject to your compliance with these terms."
        },
        {
            title: "2. Product Information",
            icon: <FileText className="w-6 h-6" />,
            content: "We strive to display products as accurately as possible. However, due to the nature of jewelry (lighting, screen resolution), actual colors and sizes may vary slightly. All gold and silver items are hallmarked as per regulatory standards."
        },
        {
            title: "3. Pricing & Payments",
            icon: <Scale className="w-6 h-6" />,
            content: "Prices are subject to change based on daily market gold/silver rates. Payments are processed securely via Razorpay. We reserve the right to cancel orders in case of pricing errors."
        },
        {
            title: "4. Shipping & Returns",
            icon: <AlertCircle className="w-6 h-6" />,
            content: "We offer secure shipping across India. Returns are accepted within 7 days of delivery for unworn items with original tags. Custom-made or personalized jewelry is non-returnable."
        }
    ];

    return (
        <div className="bg-[#FAF9F6] min-h-screen py-16">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#3E2723] mb-4">Terms & Conditions</h1>
                    <div className="w-24 h-1 bg-[#3E2723] mx-auto mb-6"></div>
                    <p className="text-[#8D6E63]">Last Updated: December 2025</p>
                </div>

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#EFEBE9]">
                    <p className="text-[#5D4037] mb-12 leading-relaxed">
                        Welcome to Sands Ornaments. Before you proceed with your purchase, please read these terms carefully. They outline our commitment to you and your responsibilities as a customer.
                    </p>

                    <div className="space-y-12">
                        {sections.map((section, idx) => (
                            <div key={idx} className="flex gap-6 group">
                                <div className="bg-[#EFEBE9] p-4 rounded-2xl h-fit text-[#5D4037] group-hover:bg-[#3E2723] group-hover:text-white transition-all duration-300">
                                    {section.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-serif font-bold text-[#3E2723] mb-3">{section.title}</h3>
                                    <p className="text--[#8D6E63] leading-relaxed italic">{section.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 p-8 bg-[#FDFBF7] rounded-2xl border border-[#EFEBE9]">
                        <h4 className="font-bold text-[#3E2723] mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            Need clarification?
                        </h4>
                        <p className="text-sm text-[#8D6E63]">
                            If you have any questions regarding our terms, please reach out to our support team at <span className="font-bold text-[#3E2723]">support@sandsornaments.com</span> or visit our help center.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
