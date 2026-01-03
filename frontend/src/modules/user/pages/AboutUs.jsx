import React, { useEffect, useRef } from 'react';
import { Truck, ThumbsUp, Lock, ArrowLeft, Gem, PenTool, HeartHandshake } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import aboutCraft1 from '../assets/about_craft_1.png';
import aboutCraft2 from '../assets/about_craft_2.png';
import aboutCraft3 from '../assets/about_craft_3.png';

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);

    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // GSAP Animations
        const ctx = gsap.context(() => {
            // Text Hero Reveal
            gsap.from(".hero-text", {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                stagger: 0.2
            });

            // Image Parallax Effect
            gsap.utils.toArray(".parallax-image").forEach((img) => {
                gsap.to(img, {
                    yPercent: -20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

            // Horizontal Scroll Section for Values
            const sections = gsap.utils.toArray(".value-card");
            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: ".values-container",
                    pin: true,
                    scrub: 1,
                    snap: 1 / (sections.length - 1),
                    end: "+=3000", // Scrolling duration
                }
            });

            // Fade in sections
            gsap.utils.toArray(".fade-in-section").forEach((elem) => {
                gsap.from(elem, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 80%",
                    }
                });
            });

        }, containerRef);

        return () => {
            lenis.destroy();
            ctx.revert();
        };
    }, []);

    return (
        <div ref={containerRef} className="bg-white min-h-screen text-black font-body selection:bg-[#D39A9F] selection:text-white overflow-hidden">

            {/* Navigation & Header */}
            <div className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference text-white pointer-events-none">
                <div className="container mx-auto flex justify-between items-center pointer-events-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 hover:text-[#D39A9F] transition-all group font-bold uppercase tracking-widest text-xs"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                        Back
                    </button>
                    <span className="font-display text-xl tracking-widest uppercase">Sands Ornaments</span>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10" />
                    <div className="w-full h-full bg-[#f8f5f2] relative overflow-hidden">
                        <motion.div
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="absolute -right-20 -top-20 w-[60vw] h-[60vw] rounded-full bg-[#EBCDD0]/20 blur-[100px]"
                        />
                        <motion.div
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                            className="absolute -left-20 bottom-0 w-[40vw] h-[40vw] rounded-full bg-[#D39A9F]/10 blur-[80px]"
                        />
                    </div>
                </div>

                <div className="container mx-auto px-4 relative z-20 text-center">
                    <span className="hero-text block text-[#D39A9F] text-sm md:text-base font-bold uppercase tracking-[0.4em] mb-6">
                        Est. 2024
                    </span>
                    <h1 className="hero-text font-display text-5xl md:text-8xl lg:text-9xl leading-none text-black mb-8">
                        The Art of <br />
                        <span className="font-serif italic text-[#8D6E63]">Reflection</span>
                    </h1>
                    <p className="hero-text max-w-xl mx-auto text-gray-600 font-serif text-lg leading-relaxed">
                        We don't just craft jewelry. We forge manifestations of your inner light,
                        casting silver into stories that last forever.
                    </p>
                </div>
            </section>

            {/* Collage Parallax Section */}
            <section className="py-20 md:py-32 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        {/* Text Content */}
                        <div className="w-full lg:w-1/2 fade-in-section">
                            <h2 className="text-4xl md:text-6xl font-display text-black mb-8 leading-tight">
                                Curating <br /><span className="italic font-serif text-[#D39A9F]">Timelessness</span>
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6 font-serif">
                                At Sands Ornaments, we believe that true luxury lies in the details.
                                Our artisans spend hours perfecting every curve, ensuring that each piece of
                                925 Sterling Silver isn't just an accessory, but a masterpiece.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed font-serif pl-6 border-l-2 border-[#D39A9F]">
                                "Silver is the mirror of the soul. We ensure yours shines the brightest."
                            </p>
                        </div>

                        {/* Parallax Images */}
                        <div className="w-full lg:w-1/2 relative h-[600px]">
                            <div className="absolute top-0 right-0 w-3/4 h-3/4 overflow-hidden rounded-[2rem]">
                                <img src={aboutCraft1} alt="Craftsmanship" className="parallax-image w-full h-[120%] object-cover" />
                            </div>
                            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 overflow-hidden rounded-full border-8 border-white shadow-2xl">
                                <img src={aboutCraft3} alt="Detail" className="parallax-image w-full h-[120%] object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Horizontal Scroll Values Section */}
            <section className="values-container bg-black text-white relative py-20 overflow-hidden">
                <div className="container mx-auto px-4 h-full flex flex-col justify-center">
                    <div className="mb-12">
                        <span className="text-[#D39A9F] text-sm font-bold uppercase tracking-[0.2em]">Our Core</span>
                        <h2 className="text-5xl md:text-7xl font-display mt-4">Values</h2>
                    </div>

                    {/* The scrolling wrapper */}
                    <div className="flex gap-10 md:gap-20 w-[300%] md:w-[200%]">
                        {/* Card 1 */}
                        <div className="value-card w-[80vw] md:w-[40vw] flex-shrink-0">
                            <div className="border-t border-white/20 pt-8">
                                <Gem className="w-12 h-12 text-[#D39A9F] mb-6" />
                                <h3 className="text-4xl font-display mb-4">Authenticity</h3>
                                <p className="text-gray-400 font-serif text-lg leading-relaxed">
                                    100% Hallmarked 925 Sterling Silver. No compromises. We believe in the purity of material and the honesty of design.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="value-card w-[80vw] md:w-[40vw] flex-shrink-0">
                            <div className="border-t border-white/20 pt-8">
                                <PenTool className="w-12 h-12 text-[#D39A9F] mb-6" />
                                <h3 className="text-4xl font-display mb-4">Artistry</h3>
                                <p className="text-gray-400 font-serif text-lg leading-relaxed">
                                    Handcrafted by master artisans who have inherited generations of knowledge. Every scratch, every polish tells a story.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="value-card w-[80vw] md:w-[40vw] flex-shrink-0">
                            <div className="border-t border-white/20 pt-8">
                                <HeartHandshake className="w-12 h-12 text-[#D39A9F] mb-6" />
                                <h3 className="text-4xl font-display mb-4">Integrity</h3>
                                <p className="text-gray-400 font-serif text-lg leading-relaxed">
                                    Sustainable sourcing and fair trade practices. We care about the hands that make our jewelry as much as the hands that wear it.
                                </p>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="value-card w-[80vw] md:w-[40vw] flex-shrink-0 pr-20">
                            <div className="border-t border-white/20 pt-8">
                                <Truck className="w-12 h-12 text-[#D39A9F] mb-6" />
                                <h3 className="text-4xl font-display mb-4">Experience</h3>
                                <p className="text-gray-400 font-serif text-lg leading-relaxed">
                                    From seamless browsing to unboxing, we craft an experience of delight. Fast shipping, secure packaging, and minimal hassle.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final Call to Action */}
            <section className="py-32 container mx-auto px-4 text-center fade-in-section">
                <div className="relative inline-block">
                    <img src={aboutCraft2} alt="CTA" className="absolute -z-10 w-full h-full object-cover opacity-10 blur-xl scale-125" />
                    <h2 className="text-5xl md:text-8xl font-display text-black mb-8 mix-blend-multiply">
                        Ready to Shine?
                    </h2>
                </div>

                <p className="text-gray-600 font-serif text-xl mb-12 max-w-2xl mx-auto">
                    Explore our latest collection and find the piece that speaks to your soul.
                </p>
                <Link to="/shop" className="inline-block px-12 py-4 bg-black text-white hover:bg-[#D39A9F] rounded-full text-sm font-bold uppercase tracking-widest transition-all transform hover:scale-105">
                    View Collections
                </Link>
            </section>

        </div>
    );
};

export default AboutUs;
