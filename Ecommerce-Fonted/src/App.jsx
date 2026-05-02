import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import ProductListing from './Pages/ProductListing';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import OrderConfirmation from './Pages/OrderConfirmation';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Wishlist from './Pages/Wishlist';
import AdminPanel from './Pages/AdminPanel';
import Profile from './Pages/Profile';
import Contact from './Pages/Contact';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Categories from './Pages/Categories';
import { CartProvider } from './Context/CartContext';
import { AuthProvider, useAuth } from './Context/AuthContext';
import { Navigate } from 'react-router-dom';

// Protected Route for Admin
const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  
  if (loading) return <div className="h-screen flex items-center justify-center font-serif italic text-2xl bg-luxury-gold-light">Verifying...</div>;
  
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};


function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductListing />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;