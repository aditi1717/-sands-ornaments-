import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Package, ShoppingCart, Users, Image as ImageIcon,
    Bell, ChevronRight, Star, HelpCircle, LogOut, Menu, X, ListTree,
    FileText, MessageSquare
} from 'lucide-react';
import logo from '../assets/sands-logo.png';
import logoName from '../assets/sands-logoname.png';

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
        { name: 'Categories', icon: ImageIcon, path: '/admin/categories' },
        { name: 'Subcategories', icon: ListTree, path: '/admin/subcategories' },
        { name: 'Products', icon: Package, path: '/admin/products' },
        { name: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
        { name: 'Users', icon: Users, path: '/admin/users' },
        { name: 'Reviews', icon: Star, path: '/admin/reviews' },
        { name: 'Banners', icon: ImageIcon, path: '/admin/banners' },
        { name: 'Notifications', icon: Bell, path: '/admin/notifications' },
        { name: 'Support', icon: HelpCircle, path: '/admin/support' },
        { name: 'FAQ', icon: MessageSquare, path: '/admin/faq' },
        { name: 'Page Content', icon: FileText, path: '/admin/content' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        navigate('/admin/login');
    };

    const handleMenuClick = (path) => {
        if (window.innerWidth <= 1024) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row font-sans text-gray-900 overflow-x-hidden">
            {/* Sidebar Backdrop (Mobile only) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[90] lg:hidden backdrop-blur-sm animate-in fade-in duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar / Mobile Menu Drawer */}
            <aside
                className={`
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    fixed top-0 left-0 bottom-0 z-[100] bg-[#3E2723] text-white transition-all duration-500 flex flex-col
                    w-[280px] lg:static lg:h-screen lg:z-50 lg:block
                    ${isSidebarOpen ? 'lg:w-72' : 'lg:w-20'}
                `}
            >
                {/* Header Section */}
                <div className="h-16 flex items-center justify-center px-4 border-b border-white/10 shrink-0 relative">
                    {isSidebarOpen ? (
                        <img src={logoName} alt="Sands" className="h-13 lg:h-15 brightness-0 invert object-contain" />
                    ) : (
                        <img src={logo} alt="S" className="h-13 w-13 mx-auto brightness-0 invert object-contain" />
                    )}
                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors absolute right-2"
                    >
                        <X className="w-6 h-6 text-gray-400" />
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-grow py-6 lg:py-4 overflow-y-auto px-4 lg:px-0 space-y-1 lg:space-y-0">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => handleMenuClick(item.path)}
                                className={`flex items-center gap-4 px-6 py-4 lg:py-3 rounded-xl lg:rounded-none transition-all ${isActive
                                    ? 'bg-[#8D6E63] text-white shadow-lg lg:scale-100 scale-[1.02]'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <item.icon className="w-6 h-6 lg:w-5 lg:h-5 flex-shrink-0" />
                                {(isSidebarOpen || window.innerWidth <= 1024) && (
                                    <span className="text-base lg:text-sm font-semibold lg:font-medium">{item.name}</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-6 lg:p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors w-full px-2 py-3 lg:py-2"
                    >
                        <LogOut className="w-6 h-6 lg:w-5 lg:h-5" />
                        {(isSidebarOpen || window.innerWidth <= 1024) && <span className="text-base lg:text-sm font-semibold lg:font-medium">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow flex flex-col h-screen overflow-hidden">
                {/* Topbar */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40 shrink-0 shadow-sm">
                    <div className="flex items-center gap-3 lg:gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2.5 hover:bg-gray-50 rounded-xl transition-all border border-gray-100 lg:border-none shadow-sm lg:shadow-none"
                        >
                            {isSidebarOpen && window.innerWidth > 1024 ? <Menu className="w-5 h-5 text-gray-500" /> : <Menu className="w-5 h-5 text-gray-500" />}
                        </button>
                        <h2 className="text-sm lg:text-lg font-bold text-gray-800 tracking-tight line-clamp-1">
                            {menuItems.find(i => i.path === location.pathname)?.name || 'Admin Panel'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 lg:gap-3">
                        <div className="text-right hidden sm:block font-medium">
                            <p className="text-[11px] lg:text-sm text-gray-900 font-bold">Admin User</p>
                            <p className="text-[9px] lg:text-xs text-gray-500 font-bold uppercase tracking-wider">Super Admin</p>
                        </div>
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#FDFBF7] rounded-xl lg:rounded-full border border-gray-200 flex items-center justify-center text-[#5D4037] font-bold shadow-sm">
                            A
                        </div>
                    </div>
                </header>

                {/* Scrollable Page Content */}
                <div className="flex-grow overflow-y-auto bg-gray-50 p-4 lg:p-8 space-y-6">
                    <div className="max-w-[1600px] mx-auto animate-in fade-in duration-500">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
