import React from 'react';
import { Facebook, Twitter, Youtube, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import WhyChooseUs from './WhyChooseUs';

const Footer = () => {
    const location = useLocation();
    const isOrderSuccess = location.pathname === '/order-success';

    // Dummy images for Instagram feed
    const instaImages = [
        "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1599643477877-5313557d7d89?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=300"
    ];

    if (isOrderSuccess) return null;

    return (
        <div className="bg-white hidden md:block">
            <WhyChooseUs />

            {/* Main Footer */}
            <footer className="bg-[#FDF5F6] text-black rounded-t-[4rem] pt-24 pb-12 shadow-2xl relative overflow-hidden border-t border-[#EBCDD0]">
                {/* Decorative Element */}
                <div className="absolute top-0 left-0 w-full h-2 bg-[#D39A9F]/30"></div>

                <div className="container mx-auto px-8 md:px-16 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20 mb-16">
                        {/* About Us */}
                        <div className="space-y-6">
                            <h3 className="text-3xl font-display text-black">About Us</h3>
                            <p className="text-sm leading-relaxed text-gray-600 font-serif tracking-wide">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras maximus, dolor nec placerat scelerisque, urna libero lacinia nisi.
                            </p>
                            <div className="w-36 h-12 bg-[#EBCDD0] rounded-full flex items-center justify-center backdrop-blur-sm border border-[#D39A9F]/20 hover:bg-[#D39A9F] transition-colors cursor-pointer group">
                                <span className="text-black group-hover:text-white font-medium flex items-center gap-2 text-xs uppercase tracking-widest">
                                    Visit site <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </span>
                            </div>
                        </div>

                        {/* Help */}
                        <div>
                            <h4 className="text-black font-display mb-8 text-xl tracking-wide">Help</h4>
                            <ul className="space-y-4 text-sm text-gray-600 font-medium tracking-wider">
                                <li><Link to="/terms" className="hover:text-[#D39A9F] transition-colors hover:pl-2 duration-300 block">Terms and Conditions</Link></li>
                                <li><Link to="/privacy" className="hover:text-[#D39A9F] transition-colors hover:pl-2 duration-300 block">Privacy Policies</Link></li>
                                <li><Link to="/help" className="hover:text-[#D39A9F] transition-colors hover:pl-2 duration-300 block">FAQ & Help</Link></li>
                            </ul>
                        </div>

                        {/* Shop */}
                        <div>
                            <h4 className="text-black font-display mb-8 text-xl tracking-wide">Shop</h4>
                            <ul className="space-y-4 text-sm text-gray-600 font-medium tracking-wider">
                                <li><Link to="#" className="hover:text-[#D39A9F] transition-colors hover:pl-2 duration-300 block">New Arrival</Link></li>
                                <li><Link to="#" className="hover:text-[#D39A9F] transition-colors hover:pl-2 duration-300 block">Bestselling</Link></li>
                                <li><Link to="#" className="hover:text-[#D39A9F] transition-colors hover:pl-2 duration-300 block">Sands Choice</Link></li>
                                <li><Link to="#" className="hover:text-[#D39A9F] transition-colors hover:pl-2 duration-300 block">Summer Collection</Link></li>
                            </ul>
                        </div>

                        {/* Connect With Us */}
                        <div>
                            <h4 className="text-black font-display mb-8 text-xl tracking-wide">Connect With Us</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="w-12 h-12 bg-[#EBCDD0] rounded-full flex items-center justify-center text-black hover:bg-[#D39A9F] hover:text-white hover:scale-110 transition-all duration-300 shadow-lg">
                                    <Facebook className="w-5 h-5 fill-current" />
                                </a>
                                <a href="#" className="w-12 h-12 bg-[#EBCDD0] rounded-full flex items-center justify-center text-black hover:bg-[#D39A9F] hover:text-white hover:scale-110 transition-all duration-300 shadow-lg">
                                    <Twitter className="w-5 h-5 fill-current" />
                                </a>
                                <a href="#" className="w-12 h-12 bg-[#EBCDD0] rounded-full flex items-center justify-center text-black hover:bg-[#D39A9F] hover:text-white hover:scale-110 transition-all duration-300 shadow-lg">
                                    <Youtube className="w-5 h-5 fill-current" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-[#EBCDD0] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 uppercase tracking-widest">
                        <p>&copy; {new Date().getFullYear()} Sands Ornaments. All Rights Reserved.</p>
                        <div className="flex space-x-8 mt-4 md:mt-0 font-medium">
                            <Link to="/privacy" className="hover:text-[#D39A9F] transition-colors">Privacy</Link>
                            <Link to="/terms" className="hover:text-[#D39A9F] transition-colors">Terms</Link>
                            <Link to="#" className="hover:text-[#D39A9F] transition-colors">Sitemap</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
