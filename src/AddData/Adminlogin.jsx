// Login.js (Frontend React Component)
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../Assets/logos.png'
import './Admin.css'
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/adminregister/login', { email, password });
      localStorage.setItem('adminToken', response.data.token);
     
        // Store token in localStorage
      setSuccessMessage('Login successful');
      setErrorMessage('');
      navigate('/admin'); 
      if (response.status === 200) {
        const { username} = response.data;
        console.log(response.data.username);
        localStorage.setItem('userName', username );
    }
   } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Server error');
      setSuccessMessage('');
    }
  };
 
  return (
    <div className='login-form'>
      <div className="continar">
       <center><img src={logo} alt="" /></center> <hr />
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit} className='from'>
        <div>
          <label>Email: </label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{marginLeft: '0px', width: '100%'}}>Login</button>
      </form>

      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
    </div>
  );
}

export default Login;
