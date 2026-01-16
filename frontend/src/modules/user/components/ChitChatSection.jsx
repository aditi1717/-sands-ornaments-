import React, { useState } from 'react';
import { Send } from 'lucide-react';
import sandsLogo from '../assets/sands-logo.png';

const ChitChatSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle submission logic here
        console.log("Form submitted:", formData);
        alert("Thanks for chatting with us! We'll get back to you shortly.");
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section className="py-20 bg-[#2F0A0F] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#722F37] rounded-full blur-[120px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C9A24D] rounded-full blur-[100px] opacity-10 -translate-x-1/3 translate-y-1/3"></div>

            <div className="container mx-auto px-2 md:px-4 relative z-10">
                <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                    <div className="flex flex-col md:flex-row">

                        {/* Text Content Side */}
                        <div className="w-full md:w-5/12 p-8 md:p-12 bg-[#2F0A0F]/50 relative flex flex-col justify-center">
                            <div className="mb-6">
                                <img src={sandsLogo} alt="Sands Jewels" className="w-16 h-auto mb-6 opacity-90" />
                                <h2 className="font-display text-4xl text-white mb-4">We're Here for You</h2>
                                <p className="text-gray-300 font-serif text-lg leading-relaxed">
                                    Have a question about a product? Need styling advice? Or just want to say hello?
                                    We'd love to hear from you!
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-white/80">
                                    <div className="w-2 h-2 rounded-full bg-[#34D399]"></div>
                                    <span className="text-sm tracking-wide">Typically replies within 2 hours</span>
                                </div>
                            </div>
                        </div>

                        {/* Form Side */}
                        <div className="w-full md:w-7/12 p-8 md:p-12 bg-white">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-[#2F0A0F] uppercase tracking-wider mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#F5F5F5] border border-transparent rounded-lg focus:bg-white focus:border-[#722F37] focus:ring-0 transition-all outline-none text-[#2F0A0F] placeholder-gray-400"
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-[#2F0A0F] uppercase tracking-wider mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#F5F5F5] border border-transparent rounded-lg focus:bg-white focus:border-[#722F37] focus:ring-0 transition-all outline-none text-[#2F0A0F] placeholder-gray-400"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-bold text-[#2F0A0F] uppercase tracking-wider mb-2">Query</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full px-4 py-3 bg-[#F5F5F5] border border-transparent rounded-lg focus:bg-white focus:border-[#722F37] focus:ring-0 transition-all outline-none text-[#2F0A0F] placeholder-gray-400 resize-none"
                                        placeholder="How can we help you today?"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#2F0A0F] text-white font-bold py-4 rounded-lg hover:bg-[#4A1015] transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2"
                                >
                                    <span>Send Message</span>
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChitChatSection;
