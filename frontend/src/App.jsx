import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Navbar from './modules/user/components/Navbar';
import Footer from './modules/user/components/Footer';
import Home from './modules/user/pages/Home';
import Shop from './modules/user/pages/Shop';
import Cart from './modules/user/pages/Cart';
import ProductDetails from './modules/user/pages/ProductDetails';
import Login from './modules/user/pages/Login';
import Wishlist from './modules/user/pages/Wishlist';
import Profile from './modules/user/pages/Profile';
import AdminDashboard from './modules/admin/pages/Dashboard';
import AboutUs from './modules/user/pages/AboutUs';
import CategoryNav from './modules/user/components/CategoryNav';
import Checkout from './modules/user/pages/Checkout';
import OrderSuccess from './modules/user/pages/OrderSuccess';
import OrderTracking from './modules/user/pages/OrderTracking';
import HelpCenter from './modules/user/pages/HelpCenter';
import TermsAndConditions from './modules/user/pages/TermsAndConditions';
import PrivacyPolicy from './modules/user/pages/PrivacyPolicy';
import Notifications from './modules/user/pages/Notifications';
import AnnouncementBar from './modules/user/components/AnnouncementBar';

// Admin Imports
import AdminLogin from './modules/admin/pages/Login';
import AdminLayout from './modules/admin/components/AdminLayout';
import AdminProtectedRoute from './modules/admin/components/AdminProtectedRoute';
import CategoryManagement from './modules/admin/pages/CategoryManagement';
import SubcategoryManagement from './modules/admin/pages/SubcategoryManagement';
import ProductManagement from './modules/admin/pages/ProductManagement';
import ProductView from './modules/admin/pages/ProductView';
import ItemEditor from './modules/admin/pages/ItemEditor';
import OrderManagement from './modules/admin/pages/OrderManagement';
import OrderView from './modules/admin/pages/OrderView';
import UserManagement from './modules/admin/pages/UserManagement';
import UserView from './modules/admin/pages/UserView';
import ReviewModeration from './modules/admin/pages/ReviewModeration';
import SupportManagement from './modules/admin/pages/SupportManagement';
import BannerManagement from './modules/admin/pages/BannerManagement';
import GlobalNotificationManager from './modules/admin/pages/GlobalNotificationManager';
import FAQManagement from './modules/admin/pages/FAQManagement';
import ContentManagement from './modules/admin/pages/ContentManagement';

const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-[#FDF5F6]">
      {!isAdminPath && <AnnouncementBar />}
      {!isAdminPath && <Navbar />}
      {!isAdminPath && <CategoryNav />}
      <main className={`flex-grow ${!isAdminPath ? 'pb-16 md:pb-0' : ''}`}>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/order-tracking/:orderId/:view?" element={<OrderTracking />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile/:activeTab?/:subId?" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/return-policy" element={<TermsAndConditions />} />
          <Route path="/replacement-policy" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/new-arrivals" element={<Shop />} />
          <Route path="/trending" element={<Shop />} />
          <Route path="/category/:category" element={<Shop />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={
            <AdminProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/categories" element={<CategoryManagement />} />
                  <Route path="/categories/new" element={<ItemEditor />} />
                  <Route path="/categories/edit/:id" element={<ItemEditor />} />
                  <Route path="/subcategories" element={<SubcategoryManagement />} />
                  <Route path="/subcategories/new" element={<ItemEditor />} />
                  <Route path="/subcategories/edit/:id" element={<ItemEditor />} />
                  <Route path="/products" element={<ProductManagement />} />
                  <Route path="/products/view/:id" element={<ProductView />} />
                  <Route path="/products/new" element={<ItemEditor />} />
                  <Route path="/products/edit/:id" element={<ItemEditor />} />
                  <Route path="/orders" element={<OrderManagement />} />
                  <Route path="/orders/view/:id" element={<OrderView />} />
                  <Route path="/users" element={<UserManagement />} />
                  <Route path="/users/view/:id" element={<UserView />} />
                  <Route path="/reviews" element={<ReviewModeration />} />
                  <Route path="/support" element={<SupportManagement />} />
                  <Route path="/banners" element={<BannerManagement />} />
                  <Route path="/notifications" element={<GlobalNotificationManager />} />
                  <Route path="/faq" element={<FAQManagement />} />
                  <Route path="/content" element={<ContentManagement />} />
                </Routes>
              </AdminLayout>
            </AdminProtectedRoute>
          } />

          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isAdminPath && <Footer />}
    </div>
  );
};

function App() {
  return (
    <ShopProvider>
      <Router>
        <AppContent />
      </Router>
    </ShopProvider>
  );
}

export default App;
