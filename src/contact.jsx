import React from 'react'
import './App.css'
import image from './contact.png'

const contact = () => {
  return (
    <div className='login-form'>
      <center><h1 style={{color: 'darkslateblue'}}>Contact Us</h1></center>
     
      <div className="continaras">
      <div className="contact">
        <form action="">
            <input type="email" name="" id="" placeholder='Enter Your Name' required/><br />
            <input type="password" name="" id="" placeholder='Enter Your Email'  required/><br/>
          <textarea  placeholder='Message'></textarea>
          <button>Send</button>

        </form>
        <div className="images">
          <img src={image} alt="" />
        </div>
      </div>
    </div>
        </div>
  )
}

export default contact
