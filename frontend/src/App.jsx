import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <ShopProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-[#FDFBF7]">
          <Navbar />
          <CategoryNav />
          <main className="flex-grow">
            <Routes>
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
              <Route path="/admin" element={<AdminDashboard />} />

              {/* New Pages requested */}
              <Route path="/about" element={<AboutUs />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/new-arrivals" element={<Shop />} />
              <Route path="/trending" element={<Shop />} />

              {/* Category routes can map to Shop with params or separate page */}
              <Route path="/category/:category" element={<Shop />} />

              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ShopProvider>
  );
}

export default App;
