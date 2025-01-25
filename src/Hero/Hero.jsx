import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import heroimage from '../Assets/banner_kids.png';
import image2 from '../Assets/banner_mens.png';
import image3 from '../Assets/banner_women.png';
import axios from 'axios';
import h from './image.png';
import hand from '../Assets/hand_icon.png';
import arrow from '../Assets/arrow.png';
import ab from './search.png'

import './Hero.css';

const Hero = () => {
  const images = [heroimage, image2, image3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); 
  const[icon, setIcon] = useState('fa-plus')
      const[icons, setIcons] = useState('fa-plus')
      const[icones, setIcones] = useState('fa-plus')
      const[iconses, setIconses] = useState('fa-plus')
    
        const sd=()=>{
            const x = document.getElementById('show');
           
            if (x.style.display === 'block') {
              x.style.display = 'none';
             setIcon('fa-plus');
              
            } else {
              x.style.display = 'block';
              setIcon('fa-minus');
             
            }
          }
        
          const sdy=()=>{
            const y = document.getElementById('showtwo');
            if (y.style.display === 'block') {
            
              y.style.display = 'none'; 
              setIcons('fa-plus');
            } else {
              y.style.display = 'block';
              setIcons('fa-minus');
            }
          }
        
          const sdz=()=>{
            const z = document.getElementById('showthree');
            if (z.style.display === 'block') {
            
              z.style.display = 'none'; 
              setIcones('fa-plus');
            } else {
              z.style.display = 'block';
              setIcones('fa-minus');
            }
          }
        
          const sdw=()=>{
            const w = document.getElementById('showfour');
            if (w.style.display === 'block') {
            
              w.style.display = 'none'; 
              setIconses('fa-plus');
            } else {
              w.style.display = 'block';
              setIconses('fa-minus');
            }
          }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [images.length]);

  useEffect(() => {
    axios
      .get('https://ay-sell-back.onrender.com/api/product')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products', error));
  }, []);

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  const scrolltop = () => {
    if (window.scrollY > 100) { // Check if the scroll position is greater than 100
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional: smooth scroll to the top
      });
    }
  };

  return (
    <>
    <div>
      <div className="banner">
        <h1 className="hand">
          Hey, <img src={hand} alt="" />
        </h1>
        <h2>
          New <br /> Collections for You
        </h2>
        <button className="arrow">
          Explore Collections <img src={arrow} alt="" />
        </button>
        <div className="photo">
          <img src={h} alt="" />
        </div>
      </div>

      <div className="hero-image" id="slider" style={{ position: 'relative' }}>
        <img src={images[currentIndex]} alt="Hero" style={{ width: '100%' }} />
        <h1
          className="slider-arrow"
          style={{
            position: 'absolute',
            top: '50%',
            right: '20px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            width: '50px',
            fontWeight: '800',
          }}
          onClick={handleNextImage}
        >
          &rarr;
        </h1>
      </div>

      <div>
        <h1>Product List</h1>
        <div className="product-container" onClick={scrolltop} >
          {products.map((product) => (
            <div
              key={product._id}
              className="product-card"
              onClick={() => handleProductClick(product)} // Navigate to details page
              style={{ cursor: 'pointer' }}
            >
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <p>{product.title}</p>
             
              <p>Price: ₹ {product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

        <div>
           <section id="faqs"   className="faq_wrapper mb-5">
          <div   className="container">
          <div   className="row4">
            <div   className="col-12 text-center mb-5">
              <p   className="faq_subtitle">We're here to help</p>
              <h2   className="faq_title">Frequently asked questions</h2>
              </div>
              </div>
              <div   className="row2">
                <div   className="col-sm-12 col-lg-7 mb-5 mb-lg-0">
         
                    <div   className="accordion-item"><h2   className="accordion-header" id="headingTwo">
                      <button   className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">1.What is AY-Shop?<i   className={`fa ${icon}`} onClick={sd} ></i></button></h2>
                      <div id="collapseTwo"   className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div   className="accordion-body" id='show'>AY-Shop is an online e-commerce platform offering a wide variety of products, including fashion, electronics, home essentials, and much more. We aim to provide a seamless shopping experience with high-quality products at competitive prices.
                       </div></div></div>
                       <div   className="accordion-item"><h2   className="accordion-header" id="headingThree"><button   className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">2. How do I place an order? <i   className={`fa ${icons}`} onClick={sdy}></i></button></h2>
                       <div id="collapseThree"   className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div   className="accordion-body" id='showtwo'>Placing an order is simple:

Browse through our categories or use the search bar to find your desired product.
Select the product, choose quantity or size (if applicable), and click "Add to Cart."
Proceed to checkout, provide shipping details, and complete payment.
You’ll receive an order confirmation email shortly.                                     
                           </div></div></div><div   className="accordion-item"><h2   className="accordion-header" id="headingFour">
                            <button   className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">3. How can I contact AY-Shop customer support? <i   className={`fa ${icones}`} onClick={sdz}></i></button></h2>
                            <div id="collapseFour"   className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                              <div   className="accordion-body" id='showthree'>You can reach our customer support team via:

Email: support@ay-shop.com
Phone: +[Support Number]
Live Chat: Available on our website during business hours..</div></div></div>
                              <div   className="accordion-item"><h2   className="accordion-header" id="headingFive"><button   className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">4. Does AY-Shop offer discounts or promotions?<i   className={`fa ${iconses}`} onClick={sdw}></i></button></h2>
                              <div id="collapseFive"   className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                <div   className="accordion-body" id='showfour'>Yes! Keep an eye on our website and subscribe to our newsletter for exclusive deals, promotions, and seasonal sales.
                                  </div>
                                  </div>
                                  </div>
                                  </div>
                             <center> <img src={ab} className="imges-one" /> </center> 
                                  </div>
                              <div   className="col-sm-12 col-lg-4">
                              </div>
                              </div>
                              
        </section>
        </div>
        </>
  
  );
};

export default Hero;
