
import React, { useState , useEffect } from "react";
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import logo from '../Assets/logos.png'
import cart from '../Assets/cart_icon.png'


const Navbar=()=>{
    const [icon, setIcon] = useState('fa-bars');
    const [cartCount, setCartCount] = useState(0);
    const { isAuthenticated, user, logout } = useAuth0();
    const [showAlert, setShowAlert] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

  useEffect(() => {
    // Initialize cart count from local storage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setShowAlert(true);
      // Auto-hide the alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Update cart count when storage changes
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(updatedCart.length);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);


const show =()=>{
    
    const x = document.getElementById('dis');
    if (x) {
      if (x.style.display === 'block') {
        x.style.display = 'none';
        setIcon('fa-bars');
      } else {
        x.style.display = 'block';
        setIcon('fa-times');
      }
    }
}
const dont = ()=>{
    document.getElementById('dis').style.display= 'none';
    setIcon('fa-bars');
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    navigate('/');
  };

  return (<>
  <div className="Nav">
    
<div className="img">
<img src={logo} alt="" />


<div className="center">
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/men">Men</Link></li>
        <li><Link to="/women">Women</Link></li>
        <li><Link to="/kids">Kids</Link></li>
        <li><Link to="/electronics">Electronics</Link></li>
    </ul>
</div>
<div className="list">
    <button><Link to="/contact">Contact</Link></button>
    {isAuthenticated ? (
              <div className="user-profile" onClick={toggleDropdown} key={user?.email}>
                <img
                  src={user?.picture || '/default-profile.png'}
                  alt="User"
                  className="user-image"
                />
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <button onClick={handleLogout} className="logout-button">
                      <i className="fa fa-sign-out"></i> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button><Link to="/login">Login</Link></button>
            )}
</div>
<div className="carts">
<Link to='/cart'> 
    <img src={cart} alt="" />
    </Link>
  </div>
    <div className="count"><p>{cartCount}</p></div>
</div>
</div>
<div className="navbar">
    <div className="logos">
    <img src={logo} alt="" />
    </div>
    <div className="btn">
    {isAuthenticated ? (
              <div className="user-profile" onClick={toggleDropdown} key={user?.email}>
                <img
                  src={user?.picture || '/default-profile.png'}
                  alt="User"
                  className="user-image"
                />
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <button onClick={handleLogout} className="logout-button">
                      <i className="fa fa-sign-out"></i> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button><Link to="/login">Login</Link></button>
            )}
   
    </div>
   <div>
    < i className={`fa ${icon}`} id='icon' onClick={show}></i>
   </div> 
    </div>
    <div className="menu">
<ul id="dis">
        <li onClick={dont}><Link to="/">Home</Link></li>
        <li onClick={dont}><Link to="/men">Men</Link></li>
        <li onClick={dont}><Link to="/women">Women</Link></li>
        <li onClick={dont}><Link to="/kids">Kids</Link></li>
        <li onClick={dont}><Link to="/electronics">Electronics</Link></li>
        <li onClick={dont}><Link to="/contact">Contact</Link></li>
        
<li onClick={dont}>
<Link to='/cart'> 
    <img src={cart} alt="" />
    </Link>
 
    <div className="count"><p>{cartCount}</p></div>
    </li>
    </ul>
    </div>
    {showAlert && (
         <div className="popup-alert">
          Login successful! Welcome, {user?.name || "User"}.
        </div>
      )}
</>
    );
};

export default Navbar;
