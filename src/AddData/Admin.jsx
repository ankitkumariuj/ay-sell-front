// components/Registration.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';
function Registration() {
  const [title, settitle] = useState('');
  const [price, setprice] = useState('');
  const [description, setdescription] = useState('');
  const [image, setimage] = useState('');
  const [category, setcategory] = useState('');
  const [message, setMessage] = useState('');
 

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      window.location.href = '/admin-login'; // Redirect to login if no token
    }
  }, []);


  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('adminToken');
    try {
      const response = await axios.post('http://localhost:5000/api/product', {
        title,
        price,
        description,
        category,
        image,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in headers
        },
      });

      if (response.status === 201) {
        setMessage('Product registered successfully!');
        
      }
    } catch (error) {
      console.error('Error during registration:', error.response ? error.response.data : error.message);
      setMessage('Error registering product. Please try again.');
    }

  };
   

  return (
    <div className="container mt-41">
    
     
        <AdminDashboard />
       <div className='login-form'>
      <div className="continarer">
      <form onSubmit={handleSubmit}>
        <div className="from">
        <center> <h3>Add New Product</h3></center> <hr />
          <label htmlFor="title" className="form-label">Title</label><br />
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            required
          />
        </div>
        <div className="from">
          <label htmlFor="price" className="form-label">Price</label><br />
          <input
            type="text"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
            required
          />
        </div>
        <div className="from">
          <label htmlFor="description" className="form-label">Description</label><br />
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            required
          />
        </div>
        <div className="from">
          <label htmlFor="category" className="form-label">Category</label><br />
          <input
            type="text"
            className="form-control"
            id="category"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            required
          />
        </div>
        <div className="from">
          <label htmlFor="image" className="form-label">Image URL</label><br />
          <input
            type="text"
            className="form-control"
            id="image"
            value={image}
            onChange={(e) => setimage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
    </div>
    </div>
  );
}

export default Registration;
