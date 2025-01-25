import React from 'react'
import { Link} from 'react-router-dom';
import './Signup.css'
import logo from '../Assets/logos.png'


const Signup = () => {
  return (
    <div className='Signup-form'>
      <div className="continar1">
      <center><img src={logo} alt="" /></center> <hr />

      <center><h1 style={{color: 'darkslateblue'}}>Signup</h1></center>
      <div className="froms">
        <form action="">
        <input type="text" name="" id=""  placeholder='Enter Your Name'/> <br />
            <input type="email" name="" id="" placeholder='Enter Email' required/><br />
            <input type="password" name="" id="" placeholder='Enter Password'  required/><br/>
           <button>Signup</button><br />
            <p>Already Account to <Link to='/login'>Login</Link></p>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
