import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const Electronics = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://ay-sell-back.onrender.com/api/women");
       
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
       
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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
      <center><h1 style={{marginTop: "56px"}}>Women's Products</h1></center>
      {products.length === 0 ? (
        <center><h4 style={{ marginTop: "20px" }}>No items found</h4></center>
      ) : (
      <div className="popular" onClick={scrolltop}>
        {products.map((product) => (
          <div
            key={product._id}
            className="popular-item"
            onClick={() => handleProductClick(product)}
            style={{ cursor: 'pointer' }}
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleProductClick(product)}
          >
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>₹ {product.price}</p>
           
          </div>
        ))}
      </div>
          )}
    </>
  );
};

export default Electronics;
