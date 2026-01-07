import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Truck, Mail, Phone, MapPin, Heart, ShieldCheck, Star } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/sands-logo.png'; // Using the official logo

const Footer = () => {
    const location = useLocation();
    const isOrderSuccess = location.pathname === '/order-success';

    if (isOrderSuccess) return null;

    const footerLinks = {
        customerCare: [
            { name: "Easy Returns", path: "/returns" },
            { name: "Contact Us", path: "/contact" },
            { name: "FAQs", path: "/help" },
            { name: "Blogs", path: "/blogs" },
        ],
        policies: [
            { name: "Shipping Policy", path: "/shipping-policy" },
            { name: "Privacy Policy", path: "/privacy" },
            { name: "Cancellation Policy", path: "/cancellation-policy" },
            { name: "Terms & Conditions", path: "/terms" },
        ],
        extra: [
            { name: "About Us", path: "/about" },
            { name: "Jewellery Care Guide", path: "/care-guide" },
            { name: "Store Locator", path: "/stores" },
            { name: "Our Craft", path: "/craft" },
        ]
    };

    return (
        <footer className="relative bg-white pt-12 pb-8 overflow-hidden">
            {/* Decorative Top Border - Luxury Gradient */}
            <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-[#722F37] via-[#C9A24D] to-[#722F37]"></div>

            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#FDF8F8] -z-0 skew-x-[-15deg] translate-x-1/2"></div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-12">

                    {/* Brand Identity Section */}
                    <div className="lg:col-span-4 space-y-4">
                        <Link to="/" className="inline-block">
                            <img src={logo} alt="Sands Ornaments" className="h-16 w-auto object-contain brightness-90 hover:brightness-100 transition-all" />
                        </Link>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-display text-[#722F37] leading-tight">
                                Timeless Elegance, <br />
                                <span className="italic font-serif text-[#C9A24D]">Handcrafted for You.</span>
                            </h3>
                            <p className="text-gray-500 font-serif text-sm leading-relaxed max-w-sm">
                                Every piece at Sands tell a story of heritage and modern Grace. Join our community of silver lovers and celebrate life's most precious moments.
                            </p>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex gap-6 pt-2">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-[#FDF8F8] flex items-center justify-center text-[#C9A24D]">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Secure</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-[#FDF8F8] flex items-center justify-center text-[#C9A24D]">
                                    <Star className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">925 Pure</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-[#FDF8F8] flex items-center justify-center text-[#C9A24D]">
                                    <Heart className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Verified</span>
                            </div>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-6">
                        <div className="space-y-4">
                            <h4 className="font-display text-[#722F37] font-bold uppercase tracking-[0.25em] text-[11px] border-b border-[#EBCDD0] pb-2 inline-block">Experience</h4>
                            <ul className="space-y-3">
                                {footerLinks.customerCare.map(link => (
                                    <li key={link.name}>
                                        <Link to={link.path} className="text-sm text-gray-500 hover:text-[#722F37] transition-all hover:pl-2 flex items-center gap-2 group">
                                            <span className="w-1 h-1 bg-[#C9A24D] rounded-full opacity-0 group-hover:opacity-100 transition-all"></span>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-display text-[#722F37] font-bold uppercase tracking-[0.25em] text-[11px] border-b border-[#EBCDD0] pb-2 inline-block">Policies</h4>
                            <ul className="space-y-3">
                                {footerLinks.policies.map(link => (
                                    <li key={link.name}>
                                        <Link to={link.path} className="text-sm text-gray-500 hover:text-[#722F37] transition-all hover:pl-2 flex items-center gap-2 group">
                                            <span className="w-1 h-1 bg-[#C9A24D] rounded-full opacity-0 group-hover:opacity-100 transition-all"></span>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-display text-[#722F37] font-bold uppercase tracking-[0.25em] text-[11px] border-b border-[#EBCDD0] pb-2 inline-block">Our World</h4>
                            <ul className="space-y-3">
                                {footerLinks.extra.map(link => (
                                    <li key={link.name}>
                                        <Link to={link.path} className="text-sm text-gray-500 hover:text-[#722F37] transition-all hover:pl-2 flex items-center gap-2 group">
                                            <span className="w-1 h-1 bg-[#C9A24D] rounded-full opacity-0 group-hover:opacity-100 transition-all"></span>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact & Newsletter */}
                    <div className="lg:col-span-3 space-y-6 bg-white/50 backdrop-blur-md p-6 rounded-[2.5rem] border border-[#EBCDD0]/50 shadow-xl shadow-[#722F37]/5">
                        <div className="space-y-4">
                            <h4 className="font-display text-[#722F37] font-bold uppercase tracking-[0.2em] text-[11px]">Connect Directly</h4>
                            <div className="space-y-3">
                                <a href="mailto:support@sandsornaments.com" className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 bg-[#722F37] text-white rounded-xl flex items-center justify-center group-hover:bg-[#C9A24D] transition-all duration-500">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 hover:text-[#722F37] transition-colors">support@sandsornaments.com</span>
                                </a>
                                <a href="tel:+919876543210" className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 bg-[#722F37] text-white rounded-xl flex items-center justify-center group-hover:bg-[#C9A24D] transition-all duration-500">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 hover:text-[#722F37] transition-colors">+91 98765 43210</span>
                                </a>
                                <div className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 bg-[#722F37] text-white rounded-xl flex items-center justify-center group-hover:bg-[#C9A24D] transition-all duration-500">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-serif italic text-gray-500 leading-tight">123 Silver Arcade, Heritage Marg, Jaipur</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Icons - Premium Style */}
                        <div className="space-y-4 pt-2 border-t border-gray-100">
                            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Social Gallery</p>
                            <div className="flex gap-4">
                                {[
                                    { Icon: Facebook, link: "#" },
                                    { Icon: Twitter, link: "#" },
                                    { Icon: Instagram, link: "#" },
                                    { Icon: Youtube, link: "#" }
                                ].map((social, i) => (
                                    <a key={i} href={social.link} className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:border-[#722F37] hover:bg-[#722F37] hover:text-white hover:-translate-y-1 transition-all duration-500 shadow-sm">
                                        <social.Icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Delivery & Copyright */}
                <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-4 bg-[#722F37]/5 px-6 py-2 rounded-full border border-[#722F37]/10">
                        <Truck className="w-4 h-4 text-[#722F37]" />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#722F37]">Safe & Insured Express Worldwide Delivery</span>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-2">
                        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium">
                            &copy; {new Date().getFullYear()} Sands Ornaments Pvt Ltd. All Rights Reserved.
                        </p>
                        <p className="text-[9px] text-gray-300 font-serif italic">Designed with love for the Modern Muse</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
