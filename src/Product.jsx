import React , { useState , useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

const ProductDetails = () => {
  const [popupMessage, setPopupMessage] = useState(""); 
  const [currentImage, setCurrentImage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  useEffect(() => {
    if (product) {
      setCurrentImage(product.image);
    }
  }, [product]);

  if (!product) {
    return <h1>Product not found!</h1>;
  }

  const handleAddToCart = () => {
    // Fetch cart from local storage or initialize as empty array
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Add the current product to the cart
    const updatedCart = [...existingCart, product];
    
    // Save updated cart back to local storage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    setPopupMessage(`${product.title} has been added to the cart!`);
    setTimeout(() => setPopupMessage(""), 30000000);
  };

  return (
    <>
    
    <div className="product-details-container">
    <div className="product-image-container">
      <img src={product.image} alt="" className="product-image"  onClick={() => setCurrentImage(product.image)} />
      <img src={product.image3} alt=""   className="product-image" onClick={() => setCurrentImage(product.image3)} />
      <img src={product.image2} alt=""   className="product-image" onClick={() => setCurrentImage(product.image2)} />
    </div>
    <div className="product-info">
      <h1 className="product-title">{product.title}</h1>
      <p className="product-description">{product.description}</p>
      <p className="product-category">
        <strong>Category:</strong> {product.category}
      </p>
      
      <p className="product-price">
        <strong>Price:</strong> ₹ {product.price}
      </p>  
      <img src={currentImage} alt=""  style={{ height: '295px', width: '253px' }}/>
      <div className="product-buttons">
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="go-back-btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  </div>
  {popupMessage && (
        <div className="popup-alert">
          <p>{popupMessage}</p>
        </div>
      )}
  </>
  );
};

export default ProductDetails;
