import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom';

const footer = () => {

  const scrolltop = () => {
    if (window.scrollY > 100) { // Check if the scroll position is greater than 100
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional: smooth scroll to the top
      });
    }
  };
  

  return (
    <div className='footer'>
      <h1>AY-shop</h1>
      <hr />
      <center><h3>Start Shopping Today!</h3></center>
      <p style={{fontSize: "23px"}}>Explore our latest collections, take advantage of our incredible deals, and experience the joy of online shopping like never before. Sign up now to receive exclusive updates and rewards.

Your satisfaction is our priority. Happy shopping at AY-Shop! </p>

<div className="menuz">
<ul id="dis">
        <li onClick={scrolltop}><Link to="/">Home</Link></li>
        <li onClick={scrolltop}><Link to="/men">Men</Link></li>
        <li onClick={scrolltop}><Link to="/women">Women</Link></li>
        <li onClick={scrolltop}><Link to="/kids">Kids</Link></li>
        <li onClick={scrolltop}><Link to="/electronics">Electronics</Link></li>
        <li onClick={scrolltop}><Link to="/contact">Contact</Link></li>
        <li onClick={scrolltop}><Link to="/admin-login">ANkIt</Link></li>
        
        </ul>
</div>
<div className="subscribe">
    <div className="social">
<h3>Follow </h3><br />
<a href="https://www.facebook.com/profile.php?id=100026285240677"> <i className='fa fa-facebook-f'></i></a>
                       <a href="https://github.com/ankitkumariuj/"><i className='fa fa-github'></i></a>
                       <a href="https://www.instagram.com/ankit_yadav_1204/"><i className='fa fa-instagram'></i></a>
                       <a href="https://www.linkedin.com/in/ankit-kumar-889aa6288/"><i className='fa fa-linkedin'></i></a>
</div>
<div className="sub">
<input type="text" name="" id=""  placeholder='Enter Email to Subscribe'/>
<button> SUBSCRIBE</button>
</div>


</div>
    </div>
  )
}

export default footer
