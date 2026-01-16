import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import bannerImg from '../assets/proposal_banner.png';

const ProposalBanner = () => {
    return (
        <section className="w-full bg-[#1B0305] relative overflow-hidden">
            {/* Background Gradient Mesh */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2A0505] via-[#4A1015] to-[#2A0505] opacity-90"></div>

            <div className="container mx-auto px-2 md:px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between py-12 md:py-16 gap-8">

                    {/* Visual Section - Left Side */}
                    <div className="w-full md:w-1/2 relative group">
                        <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#4A1015]/30">
                            <img
                                src={bannerImg}
                                alt="Proposal Ring"
                                className="w-full h-[300px] md:h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                            />
                            {/* Inner Glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#3B181C]/60 to-transparent pointer-events-none"></div>
                        </div>
                        {/* Decorative Circle */}
                        <div className="absolute -z-10 top-0 -left-12 w-64 h-64 bg-[#722F37] opacity-20 blur-[100px] rounded-full"></div>
                    </div>

                    {/* Content Section - Right Side */}
                    <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                        <div className="inline-block px-4 py-1.5 bg-[#722F37]/20 border border-[#722F37]/50 rounded-full mb-2 backdrop-blur-sm">
                            <span className="text-[#D4AF37] text-xs md:text-sm font-serif tracking-[0.2em] uppercase">The Forever Collection</span>
                        </div>

                        <h2 className="font-display text-4xl md:text-6xl text-white leading-tight">
                            Proposal Rings <br />
                            <span className="italic font-serif font-light text-[#E5E5E5] text-3xl md:text-5xl">For Her</span>
                        </h2>

                        <p className="text-gray-300 font-serif text-lg md:text-xl max-w-lg mx-auto md:mx-0 leading-relaxed">
                            Every love story deserves a perfect beginning. Discover our exquisite collection of silver proposal rings, crafted to shine as bright as your promise.
                        </p>

                        <div className="pt-4">
                            <Link
                                to="/category/rings"
                                className="inline-flex items-center gap-3 bg-white text-[#4A1015] px-8 py-4 rounded-full font-medium hover:bg-[#F0F0F0] transition-all transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(0,0,0,0.2)] group"
                            >
                                <span className="tracking-wide">Explore Collection</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProposalBanner;
