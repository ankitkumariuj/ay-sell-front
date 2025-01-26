import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
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

    const upiLink = `upi://pay?pa=nd6566482@oksbi&pn=Ankit%Yadav&am=${totalPrice}&cu=INR`;
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

  const cancel = ()=>{
    setShowCart(true);
  }
  const handleUPIClick = () => {
    const upiLink = `upi://pay?pa=nd6566482@oksbi&am=${totalPrice}&pn=CartPayment`;
    window.location.href = upiLink;
  };

  const handlePhonePeClick = () => {
    const upiLink = `upi://pay?pa=nd6566482@oksbi&pn=AY-Shop&am=${totalPrice}&tn=Payment%20to%20AY-Shop&cu=INR`;
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
        <button onClick={cancel} >Cancel</button>
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
            <QRCode value={qrCode} size={256} />
         <h3> ₹{totalPrice.toFixed(2)}</h3>
        <div className="upi">
        <h3>AY-Shop</h3>
        
        <button className="upi-button" onClick={handleUPIClick}>
    
      Pay with UPI App
      
    </button>
    <button className="upi-button phonepe-button" onClick={handlePhonePeClick}>
    Pay with PhonePe
  </button>
    <div class="upiwc-payment-btn" data-type="gpay">
										<div class="app-logo">
											<img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABm1BMVEX///9ChfQ0qFP7vATqQzX/vQD7ugD8wADqQTM/g/RCg/o6gfQ0qFHqQTb7uABChPcyfvMzqUjpOjbpOyslp1Ufo0bpLhr8wgDpMyH++Pc8kr1CgvzpOCj2+/cmpEr1+f4grFSmw/kzqkT85+U0pV03noLwgnrW4/yqsi1KsWXH5c5uvoKl1bHV7Ns+rVyZuvjt8/6zzPqEhEfMVjqJsPdalPX3wr5Ah+g+jNM1om9wofY6l6T5zsvvdWxNjPXyhB/vbibUtxrweCPrUDDzoZs/id/uZSnIth/3oxDF2PvfuBR8rT7rUkU6la7tYCvi7P02oHj73tyRrzZQqUrxkYr8zmbp9uyCxpKz27yHyJZet3Sd0aqCxZJal02hdEK2Zj7EXDtJnU+RfUXYPyaeeEbM28nWfWnVTzeuaz+AhUc4mpptjkqUnTvxSy70kRntYldhq0X1sq6fsTE9j8c9jsrMrVttkMq0pYLntS9/lbymoJP2mhTBqXDXsUb824n95rD+8dL8y06Omax8lLz82IHUr1H+9+Pfz5f94qIG0wvlAAALOklEQVR4nO2d+3fTRhbHYyu2ZUfIbi0nBjt2HBpC3klDCARIgZJCIDRASAihPPfBbrstKbts2e0uJLs0y5+9kl+RZcn6zsx1LHPm+wOPA+dIn3Pvne+dq5HS0yMlJSUlJSUlJSUlJSUlJSUlJSUlJSXVZg1W1OnbaIu2xh89mBibLmQyGW16bOfB5PhWp2+JUFvbE1omUyholsLlXwsmqjax/UlQbj0aM2HCbtIyhZ3Jbocc38mYoXPlKzNqhczEeKdvUkCTYY/oNUBmxrY7faOc2p7256tm61g3xnFqDOSrME5MdfqGGTX4kIGvwviwq2xyarrAxGepEJ7s9G3jmmQMYC2MXVOOE1yAZcaJbrDHwR32DK2rUHgU+HIcHBMANMNYCAfcHQc51hgHY2YsyM4hGMEa44PglqNIDdpklmOnSTw0QQNohTEcSOeYzBABlhl3gleOU7w+6MUYtEZucJoU0HKOTLAaue+oitDGGKhGboqwCO2MwWnkxohztKZCUMpxuy0hrDAGopEbDLcphJYC0cg9pF9mGhmPohyLo3OlmZmZudHZ5n/borVCF7V9X1WcWwqlUn2mzF8XSk5IsnbNW1pmuo3lOHsmlYrHQzXF+1JLo/Z/H2/bMqNpQ4dqXyNXiveFHOpLnbHFsU1OYdKFH3/55Omz+fn5Z0+fvPgh3J5ynF1IxZ2AFmNfqfY/KDtuO97zF89602m1pnT62PyTx/T7qtHmAFZzNbW8Wv4fg21YZrSh8JcvTbreRqlq/ne//wMxYMgtgFVVyrENTjEUftLbhFeFTOf/eJIQcDbeArBcjkXiTVPYCuCL3rQrXkXp7P3jZIQLHil6yJi8rX1GCzj0+GUrPiuOefUsEeBMygfQLMfE4shnhFE0A6i652cDY/YUSRjX+1rmaJ3x3PlhKkZt6KlPAKvKr1FU45JfjlaVzJ34giaO2vOX/gGshrH/ojDgqn+O1hlDFwoUo1Ic0KpG4WJcQHK0psTKiHCqamEGQKsYBRFLeAgtxXPnzoulqmbMswAKJ+osE5+lZPJEWCRVh/6ELTI2xPRdAcIz4DJjV2LxDr85Dv2ZFdA0/zV+01hny9Gq4onvhzkBtedsKVpR/hI3IeoUTWG8wIk49IyHsLefd7VhcAqHct9zJar2A3uOWlJVvjwtLrM4hSOKd3iWG4PJKGxKn+IiZHSKBiUXWxxl8wT8y4+f8xGqWZ71tOi6rYeDeJs9T7VY9KvPj/EFkWex4XEKO+IXrEE0TkeUAf0yH2M/exBHBXLUUpI5iLsRxVTsxtc8qcpRiUwNqZsWGYf8xpUyoRKL/aSyM6p51o3UnGAIzTQdYVpOjVsVQItRuXqMOVXzPzMSivKZaXqCKU2NgTqhyah/w1qO6is2QGB04af4Cguh8doGaKXqr4zlyJimfA2pQ8sshbihOBSLXWVDzDKlKW9D2qD4eZzQuB5xIioDPzEhMq2mok5RUeIOTrjbDMiKqPYyEAo0pHyExk03QkbEfrz9FncKRkKbUzgQWWoR702LJHymXcB1qMU8CBXla9w08JmUYENaF7yWWg2ph2I38CDmr4GA60SAuB82OYUd8Rs4iOn7ICGJU4QYeho3p+AJImoX/KMLhxIjWJIark5xuNjAlQgSiowuGoXuLTycoh7Er9AggoQio4sGoZt8415LQIY0xQh9nvcyKAmGUIu1BFQUHQQEVxoqp8BD6O0UtSB+CxYi5BY0DampODpr2/ADVAZQv4A2F8Kji5oSI2AIr/gTXgYJkWEUUUNqFuE5ENCrIbVn6VWU0L/zLi4TAYZyYEvq4xSVGIKEyO6JYHRRUfLEMAb42h8QrkPALGapAEMhcBqs+fPhaymwtaBzigtUTmEJ9ENgEkXmFMkV8FF+64a0FkKwpwGmiWROkQNHwYBTKHhf6u+GhE4xjAECTqHAews17ecVRehwFyJ0iNgw5PYO4a9YCP2b0hmyZYbSKfCV1LehoRpdhELL4OtrrUYXHCH0fUJKNbqAzyi0HF3YBFahr1WQhTC5guUo5hTwQpr3rUI6swenwEhDakoHW1Lf0yZk/Vryr1gIQaeIXabyQrLhDNyQeg+57YBoO7PmB0jWztCNLiqEaM/te/6SrCNdBBtS0CnAJ0/AWRoqt08E1CnIkhQeXRy1U5CZIfo0jdgp0r6AVLsK9EmM35C7FkJwxIbMEInsPg42pFosigDSbXx7emgmbLSjCyUGPnLydwrrlCUFYHylQDXkLgOiToE8jSE5HYQPuTGn0EGn6EcOQpE8EqUcciv4GQzs0T1JU5qgdYoboFNgb1pQdDTwkBtzCnTMDZ4voTAL9GAJNOSGnSINHrgkIIQbUswp0GNC6Nlu8REN7ZCb1iloCHPo6AIacis69lqJqqJHZoWzNPm3YQyQ1imy6CEvcUJ4yA2NLhSdbHRRk6hbJG6DISQecuOvjpYECdGzT8RDboaj+YJdW4eG3CyvconNodAh99GPLg4ltntKdmbI3cv0SqUQIPGQG3UKtleAhCwfHXJjj0PphtwNEtg+UY8uyIbcjeJfauLEQ26yx6EO8R/2Ql/AQ51CJRtyO8Tbt3VqyA03pHXxej71kBvcU/ieK2kW50syxEPuAfRxKM8HFDjTFDwG7HuSu5KjlEPuJnGtpsTP0tD3Kjg/R8PxfC25gn1HEO1mqEcXDnGsNbk31zUDAMSsEB5yZ3m/7sUcxOTfI5HYPcOXUcPW0YH2OQVvEHO/mXceuXmrNaIBAsbQPYXA54QYg5hcKd95JHJ9owWjsYEBUg+5XcW4nOZ+qd56JHLasxyNWwoGSD3kdhejJx7eu1c5GhtgN6qQD7ndxfRanrnOHN5e1CpHB6NhaKfBALbfKWpiWWzqSVoNY+Tm6w2jRmn+wdi9DvMxNKSi34FkeKEk9dZx/xET8vS93d2NjY3dW6+vmH+H+dow5PYUPM6Ir7jcaMRS/Tdc+OhC/GulcCkm/8HE4EMIOgX3R9nsmm31SWSbEv+kI2zb6MJd4AGw3L8IY/gjtM6oeSGnONQo9NpF7t9khPq7u6+yACPTkLul1pFEzTmXUn7FzGueXcv7MVIsMzXNLvtnao6KT9HfW9c8fi3f+oOJfN/U81JxydcXE2SE+9WLnrzU3yKMKsk6alPJ73uCZIT6Xv2iF73LUfhbwc0aXW4dRqosjW7ar/pzr3s5ptPin7RuUnGmZRhz4LbPT/pBw1WP3+9vLke1/xXlDwk41PpSC0aitVT/6LzqyVP9DT8OQU1n18gztK7VZU/G3BuaGLpc9e6p3my++hM70tn0pfbxmSqWUh7GkfiFgrDiFE06fvHapbW0aR+v7p9tT37aGc+4hzHxHwLC6L7/DRyBRhfcVtWGLT53CPc6DVfVXMgtjgSAm/7XPirN9DWVI8VSc+B/5SNTs3OIF2KzU3RWznKMLwqHsNNITZprdMeEYJoGZpmxqdhQjn3/FSIMiFM41VCOCaHWNBqkZcau1cNyFFpr9A+dJvHWXKieqgLddywYPzfVXWYj1ycaRI+GNDCqlWPiN07EIHUzHlot/zTE6kNSZkXfdvr+EZUs58hxTr6Duo42qryv4upOg+j17hpdSiWX2dfTaMBXmQathlIrDM9BKxHsJkBTpQQr4l6nb5lVs0ssiHr3AfZY5QjXor4Z5FamhebeIF8QUKJKl5WgTcX/RX0Zo/pmd9igh/b29ZaMUX1/r9P3KKqDTXMd8ao/ZXOv0/dHoYOP+0pzJKN69O3Hrs7PBh2834zpuh6tyvxjbPMTwqvqYO/9uw+bpj68e7/3ydFJSUlJSUlJSUlJSUlJSUlJSUlJSUlJHb3+D8pSAE/NcK7kAAAAAElFTkSuQmCC" alt="google-pay-app-logo" class="logo"/>
											<img  src="data:image/png;base64,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" alt="google-pay-app-logo" class="logo"/>
											<img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAw1BMVEX///8IMXEEue8JMnEAL3AAte4ALW8AJmwAH2kAt+8AHWgAI2sAG2gAK24AIWoAKW0bu+/t+P34/f/a9f0AFWYAGWfX3eb19/oxS39CVYRjc5kAEGS45PjP1eDn6/Gyvc/FzNnh5u6qtMgADWSeqcCDkrCRmrRqfaLIz9y7xNRNY5AVOXYsSYB9jKtYbZaVobpOyPLJ7vujrsQ6VIZzgqQvSX510fTi9v1HXYseP3rE7fsABWKs4/iP2veE1/af3/dcy/OwC/UxAAATDElEQVR4nO1dCXeiyBaWWAHCmmRYjLa4RGPELVG7W9Pp6f7/v+qB1q0qVtGAwJz3nTPpcYP6uLfuVluj8X/8H5lhDyyre4A1GDh22c3JD4N+bzXZzWccrwuypomiqMmCrqJZy528DF+dstv3BdjOdLWdG4YiyYLKI8RxyP/D+f/6//G6LotmR5lPRv36idTpjiZzU5F1/sgpBR5T2VTm7ZFVH5bWyJ0pms6f4hakqUl7d2SV3fYMmG55j91JycXBY6k0F/2yGaTBnm51U7iIHWEpmPq2X1F97W5nX6R3BBLM+aJbNpsI7NFcTKbH86rnKkTJg+L/8R2GyidbIV4QW8PHsjmxsCYdMba9SNVlReL3rd1y+7Lu9aY+er3haDxZPn2f6Z4n0dVYQaqisqiM3ZkuO3GmxROEgZ4mq6k1SOhX9qDbe2lvBEOLFb9gLF+vyyQew5YSkQJCgvK8XwwzubhHx1pv9x1FQBGaurSbFk7gBHpzKcwP6aI2G0/PtIfOdDHTom5GV1qlcpzOzbBf1xVuORxcdjlr7XKSHrqg2tmVZli7bpifKmrt3pdiaWe4FMNaoSvLUmyOPdGCjxsJnc0wB1/tDFudoOVBuja+vu9YKcFWqGIzP+tuLZohQcpqL6+LZ0N3owTV08xFfBT2sGUGVAQZuwt790W3HwefsG64/fzvMnU7AY66vsr/JvHo7uVAJzF2BRmCrmuwHJG4uY4Yx79YC6pKboHGvOsGtEXtjIq7F2Cwk9jHqmz6xd6vv1NYi2Yui86shgKjN0hWhwXfz0NPZzuFMCs2Vl0YzAPVlcVVUlV7ITKqypsFGhxnJ7IKWpSBicJiVRWZ7aLcf3cmMJ1evEKnpxjJTO+QW8XY1KnM6IpyJcNNMNgxMYbOFdEZV0wX5MWrOV+mARL1UqiTfxDH2hh5Xko+050zRvU5707SpjqCzElJ1T57Qh8zUsa5XnupMQpyVRMTxMjgKcVJfte1d1Q99Gap1aHXGbWpSjuvq9obSlDelDwc5jCNkfKSIiNBqfCw8DRcGnZo+UjRJQSRss3lil/ElgY4Yh4UGSOjlOAF47AyCUVz8eWrTUiyhIwSjWgQow7K7amPqR98vkKmlBXrDu05669dySBXkq5c7ErHkObhz18pik9N2gcrJEEfQ6KoSLk8CRiIRN2fv6YLBWBEFJXfX+rC7DmkS8isjJGhWBEFE3YXXqJNHKGUb5SbE8akL0qX+YwVMaNajjFunqAiMC4xg68kU7lYCQpHC8JwJJwfLttksFK9uCMXDmcPyZTeOrs61YaqE69euSJzDiwiB/Hcrkg8KlIq5enDGEJIgsz+WT8cyPBsqmlGKSaQGCB0lp5uwBMKblFNywsbsDbCOZnU2iQPpvIzXAdkkoqSPUB1oP8io/TpLKcxBL99RvS2BDuqfT2/vAKI2dey2owe6Kg6L7RlecGmKpdtrOiRuNHn6s2BjMUUXIa6yfT9FdSy5ErUnbKA6KmZxXk7kFpennZdHQ4HepqlzRN4HlIN7ChgDSFYhkExCzISfXmFluUGCFEQd1KIRKWlCgfcUXShpiGf8hgWFFsz+5aKgEjGOCHEJY7yEF8bM3PEAHqXnB6lWCBspYKlp3SMMcUT6T6IsEaeAkA8RmpPHEj4W1LF6r9ZQITYTBHiAndXvh4BaRA2+EQpuYcRQddRhFSIKfJZ4YoAUq/YrvxgQ0EjOaud46RCq8hI6LmATqYmFXj7kBfKtTOkR1hgKJ8T4rG2njHwqSyW6QzsZ9wLxcqsGTsXfZza8rPYj0e4o+qVLyAmYw/OoB/3KSQg1RrOPg8v2GHocaNlFi5z87Oa2hkfDvQ0PiauAWco1KKCmIQdVsS40ZYn7AyNmhTY4tGTEtUUgm7El9Cu/EDiGjkyTgOWtL7O8Ahw6tFBjCVW4Ixl48oCBj6FsJra2FeieaWWwZ8PByX0tqnyX7CkPlxQ05AyQlh+xhhcRQEGRQzN4sLhTmoFoDg8vn/L7Vpd3N/UYEXbwdNuy4lJP+9vb//J7Wq4I4aKaX1sgeQyct/ftzc3t++5XQ78hRToiFDikEpYauATvMlRhkMxriNCOCdcP+o+ELy5/ZnbBS08Xiqww5/27Ki7GcdQ88SR4M1dfgwbWB/VJ+Y9SzsylF/yu08m/Hw7EsxThrSWwfgF8Penk98zI55H23asQawHevjn/c/fu7sjwZu73/EX+Pnt3x+/Pwn9x49/f/z4PPE0VnI0SwJDkx6U9ia7zffWAd+flmumy07d3ROD3fZosGx3Pt9zsoAm+OXx199d76f/eB6C8PPx9vZ279P8e3//5v///R/vKfy48b50d3vz9nG4gudWji9T3SfIizU1xMCm/K7flHQeAXhV06hK/xJ0XaXQ5c5hqa4lHXbZa3LHlRpdE//Y9B7uD5Yd4L7R+LgFqd43vlER3/7rXeAHfHZz+/aQ3FIHTA1Nk+zWMfvlUwxNr4OaISgkaviFwjB9Q2bJ3PGbR7PWlfAPJY/hWwLDb+T9+9+3zEe3f36yP7m7T+4vYDeZ8MXGu1ilhN22woUJNpsi2ONOhCHyA1/CUI8y/HuS4U3wG6Hv3/1Nlgb2fahJ3gGxpkQ0L3KUYLNp4r4s8BGG/qQIKsNxhGGSln6Lez8Od8kxwgR3umdiKvqnTek8oqMH2eAJj0s9wtAfbLYEzFAeRRj+/jLDH4mNXUUM51o8ZUodLkZJm02YoLM2Igz9rkcYioecrCuCdufB8Ca5J0I5iqaCUEeVE1OngRpHsNnk8RBIS4tjOCAM+wUwvEk0p92ITm6P6W/KlCkijaYuSpoKLzgNS91pm4qkKIokZGX47ns2lo3v6EIMQ98IvU4OgyycztNRQlyFUjeJcicM1Um/P2yDRDmZ6PWg3xt62IIw/UpQmKHGMGz8/Pj4xhrUv7//fPsZZPjt8fGTpfj52Hi/pwwTEy4HuwtajcIjFinpLzDkhINaroQIQ8BOT2YIMtQgnHog7SVRG2V498d//S99fTAtH3enGXp2MUQIPGTyVHDCUD9QAjcQw3ArMAz1ZixDERg+3keaSxneHvrZO3H7d4fI7SGDDBs4gqGpkhiTUMUzbB4ZOkISQ7vJszLMzhC8GxPTHPrMT8rwPeGhRAEufw9v4AGblHI3ZTiIZzgYLSbtpbsTVJTMUEthCGYjzPCBMjw+hCwMl6GgBgZ/U0IaamliGXZdSZIFL/ymnj9OS6/GEAc1iMOm08aT2bTkmTbpDEcGcRKUYZtheJyMS2KawhmSmU/Y/TmYoZg8TyiV4eg5GngHGR4j7zEorVY0QwhhVBzCDIyTYWkaQ0uMxt0hhpz6YlkrEhddjaGOGUJxKqWin8awHVVRzNBpkuBH8MIdIFi8lq6SGPazMmT9oR2no0eG9j42IymeIYxdCIMQwwwyPM4AYGOankJYqZ45ZRk23PiA/Rx/eBFDSJaA4Tn9kF8M+6slvPIZrkUgpbW2W6KyB4ZrMZahFI3aimUItjQLw6auSQKRjJ9bvLCxtm+oGYYNPlZNC2cY7ofneIsQvPyQMNQOzgdeHhn2jQIZJpcxwt4CYhoteWeIBIZobhNK6nE1dZBhYyTxJTAc44QXQcJ7RtQWhK+YQAmvsQkxbPT3itrkrswQxzSIgzdOz4aKZ3go7BCG7ViGjcbQ1STRB381hhCXknLijD+ZPclxDM2XRgaGHhzLw+sOKIpFM8SzFWj2hBPGtAw4huGxrk0Z7pIZHvEaibyLYoiLFrSG7+IqRvJqNYYh4lUecUhX+GGAEjqa5pGYyBAyYE6ArLIoht/5ECGstnwrudYGDDlh77qb/Ww+AedJGbamdsNu60kMHRLhQA2yKIb2PtztsPtAyTNLLSjqCxGPsiIxjWo+m51ATHP8bVvv+DBIha4J92GKLnkydJrHwhOtJq6PxhRJiRVhSM9p4wiGUkzczTC0RD3Uh6kBKIghDGnTEAaGFJOr+oRhVMyv0Yq+D7JIbheJvlVS5CuIISyroKnE6dCblFhiZhfLcQkwggW5XSVihGnsdB7Dn1kZQvJkkGUXMDExOaghDPXoWo2xGMcQBtF70fSCWeWZZmneGiGGj8GfJE/fgDJNh7xj41ltsTPcAwy5mIXEDlKjBHVwRaPIwKPCTPh4S2aIh0Apw5vQQ7lPHJnBg/aIWXWB52ckL/qCqC12h5S+EaHIG3384VALERRZr0tG7QlD+s6fIEMY9CUM35Iaa+P1WyozSgGRqpnM8EgwfnVwt6kEOPIyXd43DWgpL4TKzn9vExjCQP0DlukdKCUwvP1IaqyDN9JjZiqQqWCJxtRuSpqoaO0Ed2KvNh1DwTA7sy3trf1f0jHuliTTUJ/G4Tt8vt3deiCDgY93t3feO3d/8RuPb4cJJrdvkO/+OL6+T55w8mpG893okGIYg/Wwl3rgm9PtYfQDB1jZ+Jiu6bRvxZ/j+PD+/vGN2sWHTw//PLCv/3y+M33u48/n58dDytQlYkqZpwmLR1OyixoBBnwDXQom1OwTf1YjYM/AszP3yHYfJcy+zB1QdgoqJJiaMmbQ5g2YiRFcrm3BLOiar5jxAa5PDoZf2PwEdbeegGUHobUxUNlQK78/2ykMcOoUrljgFPE/sKIETEq4+juINUB1BCxRi+yfvP8PrJH1AbOFUGQ5N+RUZs39BcyzFCJeAbburvvitUmipGDqMJLLaFdugOnOSI9+BhNr662mPVDSGIsJBbeU2n4NAKtJSI2BgY3LqLV2+mRvj9ipsrDoIrz4sk6A4e14tw511MT9a2oA2EMofuePBpwdrtR2VwVYKJqUycP4fmQpe20AHS1pG6gB3jMRmTW1NWRnweek0BOPlNY2D17ANJrEoV6I6TiplhsrOLCTl5EctLRAiLXczozsSJeyBG9NdpKqYQ5lw1kAaWcdkJ2x67gnHd1UME085FvR0eyqw1FBOqlbr8JYKadde1X3lwGGFKnpwhnDLkRKzXzigGyuf6KD2XCWwlmnRVQAZANk9ZSne4EdPusVnfZhA+SU7VkxIE3k9FqlGJBUZNkAeQSb1VbtLLk0jMRzGj2DXfiTF81WDQMBtznb1iXktAihNjvrw+5XWTcM3JHv12QQY2ieKRMLfCLP1UJPbXJMYPLUwxDAY9RET4mOnvYUBOSkmS8eY3oVrMD462cM7/Zx2ZFDWuVPueiSY8nCu+ylYgIVD35W8XTfnsEBauedEGfv4XdyxeNTcvrWuYdTvZLjvc/oviXghR4leu62pGNKscKDUVNyCPkFR47QMz7NylobC6K1i/waifWqe2AJtTLooqpLjx4mW81d2h/J4Y6oc1kyS08UlisZ2yzJccDmpYGJC5aYkyo4WLMltlC7eBKQPePJU6rcUMaW+Ak9eeegk6BHynJKxcqLC5JQqCfKh+l4pefHG5WS4pgQRMLXnBlJLj2KFZpLRCWItP4Xr7UyCEWlMhQnpA8i4+v1sgW5GidWJApfEiuKOnkksNQqc9qmAtGNvSF+ECn5jJG1KUXhe+kx6mBPvDRn5mXg2yS44fRZyZlGn1dJY3I07xNKkTdKzRdHJspfgj5oAOFZr21phQ27TbIBDuWcmo87hKJnb0rqjFZLpq0w8x5WGT1T9VDlUgZt1gLtgvyvfu7XnwokDPc0tX11t+G4TBfUm0UcFtNt6uQOnLy/8phGjxOYu7eK6ScO2w14c3JFMTptiQoQmcvCbk3jQQ8Cd7UD2tY6I0BkFJnIjRSeEaOxu8rRSdYT0wM5HRXbP/p7RlM5VVwUPv7mbE2m/3NS4a7Kc7rM/Ti5WfD8sBdeZgSIOtfIw4ci+0yRxhc3AmePdI3lJ18pKh64CmI5KvthIbbNHjUl9ka8cj3zvdZYMfocV7nf23nZSzx7l+u6YMc1AndHGhrnagGsicD2P8+oPW+vHEb19mKgBUh4furl1AZ7uOkIXODq0tP1J6HZL0KwFZyqzBZfb8djd8srfPDK2qyc+VmDdkcPtoQXlNb4SyS7i7kkBJTD0w5zXFp5yNopIY4cL4uzRf+iHNmebjlJCImPE5RtqbN6Xl0zzBF5kjSXq+5Zz93urnaGEpKez0+elF776rumEG6XnyQb3HLcszLQdKzeYqeashqhx8nathKHhlqTX3JYt3xZ6oIiz54mq2k3Qc0Gr9PVsjXzd7WNskO8KI0rM+vMGc+ksLIem4l4XZYU0xDm7nb8shqN1iMPL9v2bq4apiLJ/hlScT8UxO/VmgRi91wtTpBUIqogyLImipqmybKgq3wcMQxVQtsKTsIevMw7aSSzQhU77roy6hmCNW4qcRYjM5CqKa1RVekd0V098UrEqWUTnqDMlsPSnUMGOL1ty1SY4mYG6LIp7MavFRjayohHpzfedAxJVnkuXWkR0mWlI7qr1L3SqgqrN3ZnvOCfX6Krh135/B2oOX9XPl7VdUGWRAHtl6tpHTQzGbb12htPlu7TfD9ret5R1lFztm89ue2tFwsM6ii5JNi24ziDwcD769j/JWJl43/4PKXbWzX2DQAAAABJRU5ErkJggg==" alt="google-pay-app-logo" class="logo"/>
											<img  src="data:image/png;base64,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" alt="google-pay-app-logo" class="logo"/>
										</div>
									
										
									</div>
        </div>
        </div>
      )}
      
    </div>
    
  );
};

export default Cart;
