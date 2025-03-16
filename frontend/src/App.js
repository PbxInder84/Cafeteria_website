import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import ReportsScreen from './screens/ReportsScreen';
import InventoryScreen from './screens/InventoryScreen';
import BlogScreen from './screens/BlogScreen';
import SingleBlogScreen from './screens/SingleBlogScreen';
import CustomCoffee from './screens/CustomCoffee';  // Import the service screen
import FreshBakes from './screens/FreshBakes';  // Import the service screen
import WifiCoworking from './screens/WifiCoworking';  // Import the service screen
import ScrollToTop from './components/layout/ScrollToTop';
import NotFoundScreen from './screens/NotFoundScreen';
import styled from 'styled-components';
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import BackToTop from './components/layout/BackToTop';
import CookieConsent from './components/layout/CookieConsent';
import ScrollProgress from './components/layout/ScrollProgress';
import { useLocation } from 'react-router-dom';
import PendingOrdersScreen from './screens/PendingOrdersScreen';
import MenuScreen from './screens/MenuScreen';

const MainContent = styled.main`
  padding-top: ${props => props.isHomePage ? '0' : '80px'};
  min-height: calc(100vh - 300px);
  
  &.py-3 {
    padding-top: ${props => props.isHomePage ? '0' : '80px'} !important;
    padding-bottom: 1rem !important;
  }
`;

const App = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <ScrollToTop />
      <Header />
      <ScrollProgress />
      <AppContent />
      <Footer />
      <BackToTop />
      <CookieConsent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <MainContent className="py-3" isHomePage={isHomePage}>
      <Routes>
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/blog" element={<BlogScreen />} />
        <Route path="/blog/:slug" element={<SingleBlogScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/cart/:id?" element={<CartScreen />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboardScreen />} />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/reports" element={<ReportsScreen />} />
        <Route path="/admin/inventory" element={<InventoryScreen />} />
        <Route path="/admin/orders/pending" element={<PendingOrdersScreen />} />
        
        <Route path="/search/:keyword" element={<HomeScreen />} />
        <Route path="/page/:pageNumber" element={<HomeScreen />} />
        <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
        <Route path="/" element={<HomeScreen />} />

        {/* Service Routes */}
        <Route path="/services/custom-coffee" element={<CustomCoffee />} />
        <Route path="/services/fresh-bakes" element={<FreshBakes />} />
        <Route path="/services/wifi-coworking" element={<WifiCoworking />} />

        <Route path="/about-us" element={<AboutScreen />} />
        <Route path="/contact" element={<ContactScreen />} />

        <Route path="/menu" element={<MenuScreen />} />
        <Route path="/menu/:category" element={<MenuScreen />} />

        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </MainContent>
  );
};

export default App;
