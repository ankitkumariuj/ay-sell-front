import React, { useEffect, useState } from "react";

import './App.css';

const Cart = () => {
  const [cartItems, setcartItems] = useState([1]);
  const [notification, setNotification] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const [totalPrice, setTotalPrice] = useState(4);
  const [showScanner, setShowScanner] = useState(false);
  const [showCart, setShowCart] = useState(true);
  const [timer, setTimer] = useState(3000);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setcartItems(storedCart);

    const initialTotal = storedCart.reduce(
      (sum, item) => sum + (item.totalPrice || item.price),
      0
    );
    setTotalPrice(initialTotal);
  }, []);

  useEffect(() => {
    const upiLink = `https://api.qrserver.com/v1/create-qr-code/?data=upi://pay?pa=nd6566482@oksbi&am=${totalPrice}&pn=CartPayment`;
    setQrCode(upiLink);
  }, [totalPrice]);

  useEffect(() => {
    let countdown;
    if (showScanner) {
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev > 0) return prev - 1;
          clearInterval(countdown);
          setShowScanner(false);
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [showScanner]);

  
  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setcartItems(updatedCart);

    const updatedTotal = updatedCart.reduce(
      (sum, item) => sum + (item.totalPrice || item.price),
      0
    );
    setTotalPrice(updatedTotal);

    setNotification({
      type: "success",
      message: "Item has been removed from the cart!",
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === productId) {
        const newQuantity = (item.quantity || 1) + 1;
        return { ...item, quantity: newQuantity, totalPrice: item.price * newQuantity };
      }
      return item;
    });

    setcartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const updatedTotal = updatedCart.reduce(
      (sum, item) => sum + (item.totalPrice || item.price),
      0
    );
    setTotalPrice(updatedTotal);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item._id === productId) {
          const newQuantity = (item.quantity || 1) - 1;
          if (newQuantity > 0) {
            return { ...item, quantity: newQuantity, totalPrice: item.price * newQuantity };
          }
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setcartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const updatedTotal = updatedCart.reduce(
      (sum, item) => sum + (item.totalPrice || item.price),
      0
    );
    setTotalPrice(updatedTotal);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowScanner(true);

    // Start a 5-minute timer
    const timeout = setTimeout(() => {
      setShowScanner(false);
    }, 5 * 60 * 1000);

    setTimer(timeout);
  };

  const closeScanner = () => {
    setShowScanner(false);
    clearTimeout(timer);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-wrapper">
        <h1 style={{ marginTop: "56px" }}>Your cart is empty!</h1>
      </div>
    );
  }

  const handleCheckout = () => {
    setShowCart(false);
  };
  const handleUPIClick = () => {
    const upiLink = `upi://pay?pa=nd6566482@oksbi&am=${totalPrice}&pn=CartPayment`;
    window.location.href = upiLink;
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  return (
    <div className="cart-wrapper">
      {notification && (
        <div className="popup-alert" role="alert">
          <div className="msg">{notification.message}</div>
        </div>
      )}
      {showCart ? (
      <div className="cart">
        <h1>Your Cart</h1>
       
        {cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div>
              <h2>{item.title}</h2>
              <p>Price: ₹{item.price}</p>
              <div className="quantity-controls">
                <button
                  className="quantity-btn decrease"
                  onClick={() => decreaseQuantity(item._id)}
                >
                  -
                </button>
                <span className="quantity">{item.quantity || 1}</span>
                <button
                  className="quantity-btn increase"
                  onClick={() => increaseQuantity(item._id)}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item._id)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="cart-total">
          <h4>Total Price: ₹{totalPrice.toFixed(2)}</h4>
          <button className="checkout" onClick={handleCheckout}>
              Proceed to Delivery Details
            </button>
        </div>
      </div>
   ) : (
      <form onSubmit={handleFormSubmit} className="delivery-form" >
        <h2>Delivery Details</h2>
        <input type="text" placeholder="Enter Your Name" required />
        <input type="text" placeholder="Enter Your Phone Number" required />
        <input type="text" placeholder="Enter Your Address" required />
        <input type="email" placeholder="Enter Your Email" required />
        <button type="submit">Proceed to Pay</button>
      </form>
     )}
      {showScanner && (
        <div className="scanner">
          <div className="one">
          <h3>AY-Shop</h3>
          
           <button onClick={closeScanner} className="close-btn">
            X
          </button>
          </div>
            <div className="timer">{formatTime(timer)}</div>
          <img src={qrCode} alt="QR Code for Payment" id="qr"/>
         <h3> ₹{totalPrice.toFixed(2)}</h3>
        <div className="upi">
        <h3>AY-Shop</h3>
        <button className="upi-button" onClick={handleUPIClick}>
    
      Pay with UPI App
      
    </button>
    <div class="upiwc-payment-btn" data-type="gpay">
										<div class="app-logo">
											<img  src="http://ay-sell.local/wp-content/plugins/upi-qr-code-payment-for-woocommerce/includes/icon/googlepay.svg" alt="google-pay-app-logo" class="logo"/>
											<img  src="http://ay-sell.local/wp-content/plugins/upi-qr-code-payment-for-woocommerce/includes/icon/phonepe.svg" alt="google-pay-app-logo" class="logo"/>
											<img  src="http://ay-sell.local/wp-content/plugins/upi-qr-code-payment-for-woocommerce/includes/icon/paytm.svg" alt="google-pay-app-logo" class="logo"/>
											<img  src="http://ay-sell.local/wp-content/plugins/upi-qr-code-payment-for-woocommerce/includes/icon/bhim.svg" alt="google-pay-app-logo" class="logo"/>
										</div>
									
										
									</div>
        </div>
        </div>
      )}
      
    </div>
    
  );
};

export default Cart;
