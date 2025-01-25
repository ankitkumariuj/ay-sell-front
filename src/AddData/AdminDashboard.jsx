import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

  const [username, setUserName] = useState('');
  const navigate = useNavigate();
  const [icon, setIcon] = useState('fa-bars');


  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      window.location.href = '/admin-login'; // Redirect to login if no token
    }
  }, []);


  useEffect(() => {
   
    const storedUserName = localStorage.getItem('userName');
    setUserName(storedUserName);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userName')
  
    // Update state to reflect logged-out status
    navigate('/admin-login'); // Redirect user to the login page after logging out
  };

  const show =()=>{
    
    const x = document.getElementById('sd');
    if (x) {
      if (x.style.display === 'none') {
        x.style.display = 'block';
        setIcon('fa-times');
      } else {
        x.style.display = 'none';
        setIcon('fa-bars');
      }
    }
}
  return (
    <>
    <div>
       <div className="screen">
        <ul>
          <li><Link to='/adminmen'>Men</Link></li>
          <li><Link to='/adminwomen'>Women</Link></li>
          <li><Link to=''>Kids</Link></li>
          <li><Link to='/adminelec'>Electonics</Link></li>
          <li>{username}</li>
          <li><button onClick={handleLogout} className='btn-logout-btn'>Logout</button></li>

        </ul>
     
      </div>
      <div className="ham">
      <div className='xs' >
    < i className={`fa ${icon}`} id='icons' onClick={show} ></i>
   </div> 
        <ul id='sd' style={{display: 'none'}} >
          <li><Link to='/adminmen'>Men</Link></li>
          <li><Link to='/adminwomen'>Women</Link></li>
          <li><Link to=''>Kids</Link></li>
          <li><Link >Electonics</Link></li>
          <li>{username}</li>
          <li><button onClick={handleLogout} className='btn-logout-btn'>Logout</button></li>

        </ul>
     
      </div>
    </div>
    </>
  )
}

export default AdminDashboard
