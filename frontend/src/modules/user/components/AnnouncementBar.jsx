import React from 'react';
import { Truck, ShieldCheck, RefreshCcw, Headset } from 'lucide-react';

const AnnouncementBar = () => {
    const announcements = [
        { icon: Truck, text: "Free Shipping" },
        { icon: ShieldCheck, text: "Secure Payments" },
        { icon: RefreshCcw, text: "Easy Returns & Refunds" },
        { icon: Headset, text: "Dedicated Support Team" }
    ];

    return (
        <div className="bg-[#1F1F1F] text-[#F7F2EF] overflow-hidden py-2 relative z-[60]">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center mx-20 gap-32">
                        {announcements.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <item.icon className="w-4 h-4 text-[#C9A24D]" />
                                <span className="text-xs font-medium uppercase tracking-widest">{item.text}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(0%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default AnnouncementBar;
