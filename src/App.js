import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Only import Routes and Route here
import Navbar from './Navbar/Navbar';
import Men from './Mens';
import Women from './Women';
import Kids from './Kids';
import Admin from './AddData/Admin';
import AdminWomen from './AddData/Admiwomen';
import AdminMen from './AddData/Adminmen copy';
import AdminDashboard from './AddData/AdminDashboard';
import AdminLogin from './AddData/Adminlogin';
import Adminelec from './AddData/Adminelec';
import Hero from './Hero/Hero';
import Login from './Login/Login';
import ProtectedRoute from './ProtectedRoute';
import Contact from './contact'
import './App.css'
import ProductDetails from './Product';
import Cart from './Cart'
import Electronics from './Electronics/Electronics';
import Footer from './Footer/Footer';



const ProductList = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path='/Electronics' element={< Electronics/>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/adminwomen" element={<AdminWomen />} />
        <Route path="/adminmen" element={<AdminMen />} />
        <Route path="/adminelec" element={<Adminelec />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<div><Hero /></div>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/welcome"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    
      <Footer/>
    </>
  );
};

export default ProductList;
