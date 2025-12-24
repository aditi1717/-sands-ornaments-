import React, { useState, useEffect } from 'react';
import { useShop } from '../../../context/ShopContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Gem, Gift, Crown } from 'lucide-react';

const Login = () => {
    const { login } = useShop();
    const navigate = useNavigate();
    const location = useLocation();

    // Determine mode based on URL
    const isSignup = location.pathname === '/signup';

    const [phoneNumber, setPhoneNumber] = useState('');
    const [loginStep, setLoginStep] = useState(1);
    const [otp, setOtp] = useState(['', '', '', '']);

    // Additional fields for Signup
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');

    // Reset state when mode changes
    useEffect(() => {
        setLoginStep(1);
        setPhoneNumber('');
        setOtp(['', '', '', '']);
        setFullName('');
        setEmail('');
    }, [isSignup]);

    const handleSendOtp = (e) => {
        e.preventDefault();
        if (phoneNumber.length === 10) {
            setLoginStep(2);
        } else {
            alert("Please enter a valid 10-digit phone number");
        }
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        if (enteredOtp.length === 4) {
            // Mock Login/Signup
            const userData = {
                name: isSignup ? fullName : 'Guest User',
                phone: phoneNumber,
                email: isSignup ? email : 'guest@example.com'
            };

            login(userData);
            // Redirect to Profile page after successful login/signup as requested
            navigate('/profile');
        } else {
            alert("Please enter the 4-digit OTP");
        }
    };

    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return;
        let newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden bg-[#FDFBF7]">
            {/* Background with Blur Effect */}
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center animate-in fade-in duration-1000"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop')", // Rich Gold/diamond texture
                    }}
                />
                {/* Gradient Overlay for depth & warmth */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3E2723]/90 via-[#3E2723]/50 to-black/60 backdrop-blur-[1px]"></div>

                {/* Animated Particles/Orbs for 'Life' */}
                <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#D7CCC8]/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#8D6E63]/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
                <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-black/10 rounded-full blur-[80px]"></div>
            </div>

            {/* Close/Back Button */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 right-6 z-20 text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>

            <div className="w-full max-w-5xl bg-[#EFEBE9] rounded-2xl overflow-hidden shadow-2xl flex flex-col-reverse lg:flex-row relative z-10 min-h-[550px] animate-in slide-in-from-bottom-8 fade-in duration-700">

                {/* Left Side (Desktop) - Form */}
                <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center p-8 lg:p-16 relative">
                    <div className="max-w-md mx-auto w-full">
                        <h2 className="text-3xl font-display text-[#3E2723] mb-2">
                            {isSignup ? 'Join Sands' : 'Explore Sands'}
                        </h2>
                        <p className="text-[#8D6E63] font-serif mb-8">Timeless Elegance, Crafted for You.</p>

                        {loginStep === 1 ? (
                            <form onSubmit={handleSendOtp} className="space-y-6">

                                {/* Signup Fields */}
                                {isSignup && (
                                    <div className="space-y-4 animate-in slide-in-from-top-4 fade-in duration-300">
                                        <div>
                                            <label className="block text-xs font-bold text-[#5D4037] uppercase tracking-widest mb-1.5">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 uppercase tracking-widest mb-2">Mobile Number</label>
                                    <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-[#5D4037] focus-within:border-[#5D4037] transition-all">
                                        <div className="bg-gray-50 px-4 py-3 border-r border-gray-300 flex items-center gap-2 text-gray-600">
                                            <span className="text-lg">🇮🇳</span>
                                            <span className="font-medium font-sans">+91</span>
                                        </div>
                                        <input
                                            type="tel"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                            placeholder="Enter Mobile Number"
                                            className="flex-1 px-4 py-3 outline-none text-gray-800 font-medium tracking-wide placeholder-gray-400"
                                            required
                                        />
                                    </div>
                                </div>



                                <button
                                    type="submit"
                                    className="w-full bg-[#3E2723] text-white py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-[#5D4037] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Get OTP
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleVerifyOtp} className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="text-center">
                                    <p className="text-gray-500 mb-6">Enter the 4-digit code sent to <span className="font-bold text-[#3E2723]">+91 {phoneNumber}</span></p>
                                    <div className="flex justify-center gap-4 mb-6">
                                        {otp.map((data, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                maxLength="1"
                                                value={data}
                                                onChange={(e) => handleOtpChange(e.target, index)}
                                                onFocus={(e) => e.target.select()}
                                                className="w-14 h-14 border-2 border-gray-200 rounded-xl text-center text-2xl font-bold focus:border-[#5D4037] focus:ring-2 focus:ring-[#5D4037]/20 outline-none transition-all text-[#3E2723]"
                                            />
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#3E2723] text-white py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-[#5D4037] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Verify & {isSignup ? 'Sign Up' : 'Login'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setLoginStep(1)}
                                    className="w-full text-center text-sm text-[#8D6E63] hover:text-[#5D4037] underline font-medium"
                                >
                                    Change Phone Number
                                </button>
                            </form>
                        )}

                        <div className="mt-8 text-center pt-6 border-t border-gray-100">
                            <p className="text-sm text-gray-600">
                                {isSignup ? 'Already have an account?' : 'New to Sands Ornaments?'}
                                <Link
                                    to={isSignup ? "/login" : "/signup"}
                                    className="ml-2 font-bold text-[#3E2723] hover:underline"
                                >
                                    {isSignup ? 'Login' : 'Create an account'}
                                </Link>
                            </p>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                                By continuing, you agree to Sands Ornaments's <a href="#" className="underline hover:text-[#5D4037]">Terms of Use</a> and <a href="#" className="underline hover:text-[#5D4037]">Privacy Policy</a>.
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center items-center relative overflow-hidden bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1000&auto=format&fit=crop')" // Elegant Model with Jewellery
                    }}
                >
                    <div className="absolute inset-0 bg-[#3E2723]/30 backdrop-blur-[2px]"></div>

                    <div className="relative z-10 text-center animate-in slide-in-from-right-8 duration-700 delay-150 p-8 glass rounded-2xl border border-white/20 bg-black/20 backdrop-blur-sm">
                        <h3 className="font-serif text-xl text-white/90 mb-2 tracking-wide">Welcome to</h3>
                        <h1 className="font-display text-4xl lg:text-5xl text-white uppercase tracking-widest mb-4 shadow-sm">Sands Ornaments</h1>
                        <p className="font-serif italic text-white/80 text-sm tracking-wider">India's Premium Silver Jewellery Brand</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
