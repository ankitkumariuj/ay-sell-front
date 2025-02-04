import React, { useState , useEffect} from 'react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';

function Registration() {
  const [title, settitle] = useState('');
  const [price, setprice] = useState('');
  const [description, setdescription] = useState('');
  const [image1, setimage1] = useState(''); 
  const [image2, setimage2] = useState('');
  const [image3, setimage3] = useState('');
  const [image, setimage] = useState('');
  const [category, setcategory] = useState('');
  



  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin-login'; // Redirect to login if no token
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('https://ay-sell-back.onrender.com/api/men', {
          title,
          price,
          description,
          category,
          image,
          image1,
          image2,
          image3,
        });
      
        if (response.status === 201) {
          alert('Product registered successfully!');
        }
      } catch (error) {
        console.error('Error during registration:', error.response ? error.response.data : error.message);
        alert('Error registering product. Please try again.');
      }
    }      
  return (
    <div className="container mt-41">
       <AdminDashboard />
      <div className='login-form'>
      <div className="continarer">
   
      <form onSubmit={handleSubmit}>
        <div className="from">
        <center><h3>Add New Product for men</h3></center>
        <hr />
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
            onChange={(e) => setimage(e.target.value)} // Use text input for image URL
            required
          />
        </div>
        <div className="from">
          <label htmlFor="image" className="form-label">Image URL1</label><br />
          <input
            type="text"
            className="form-control"
            id="image"
            value={image1}
            onChange={(e) => setimage1(e.target.value)} // Use text input for image URL
            required
          />
        </div>
        <div className="from">
          <label htmlFor="image" className="form-label">Image URL2</label><br />
          <input
            type="text"
            className="form-control"
            id="image"
            value={image2}
            onChange={(e) => setimage2(e.target.value)} // Use text input for image URL
            required
          />
        </div>
        <div className="from">
          <label htmlFor="image" className="form-label">Image URL3</label><br />
          <input
            type="text"
            className="form-control"
            id="image"
            value={image3}
            onChange={(e) => setimage3(e.target.value)} // Use text input for image URL
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
     
    </div>
    </div>
    </div>
  );
}

export default Registration;
