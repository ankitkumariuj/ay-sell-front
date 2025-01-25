import React from 'react'
import { Link} from 'react-router-dom';
import logo from '../Assets/logos.png'
import { useAuth0 } from "@auth0/auth0-react";

import './Login.css'
const Login = () => {

  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <div className='login-form'>
      <div className="continar">
      <center><img src={logo} alt="" /></center> <hr />
      <center><h1 style={{color: 'darkslateblue'}}>Login</h1></center>
      <div className="from">
        <form action="">
            <input type="email" name="" id="" placeholder='Enter Email' required/><br />
            <input type="password" name="" id="" placeholder='Enter Password'  required/><br/>
           <button className='log-btn'>Login</button><br />
           {!isAuthenticated ? (
        <div className="auth-container">
          <button
            onClick={() =>
              loginWithRedirect({
                connection: "google",
              })
            }
            className="auth0-login-button"
          >
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAzFBMVEVHcEz////////+/v77+/vx8fL9/f309fX+/v739/f////09PXOz8/5+vr8/P3////////29vf///////84qlf8wAdGiPX8/PzsUUTqQjQsqFLrSj3S3/w6g/TqPCs0gPQgpUf85+bv9P+63sL62Nb+8ef4ycbw+PJkunkeePP81HXwgGv0jhzc5/3o9efX7N5Fr19Uj/WQy562zPr2trL94KDzoJrzoJv80Gjyl5H94qgyh9v7xzihsSp+wYV1sE5ZtXBmmvUynoWKrvzKDGT6AAAAE3RSTlMAW+TTeBLcHLMt1WsKzfUznkBIxSDAuAAAAUZJREFUKJFtktligkAMRUFZxKVuDMOAggpu1apVu+/t//9TkxBU1PsySQ4hlyGadpTd0fWOrV2R3eqyWhe80j1RpYCc7pmcI2tyaZimQw6bOTMplU9hpKIofJSUmgwtTCYq9EFhqKIJ5lbGdGIRAGhUQLNX6wRLOA2Y8vdpuvfVOJtaOjhdhL56yYrjU8cGFsRSLc4/x+DPfxBiSZN6LMlXUYXzVghBT8/7pPkdxFX28yzEO8HYI8U9dlQudMZx3AeInWWe+SrExxrhCLTre3E+M3P7FXznLn887z53a2PwGbjBLLvUP2jcYUC/FYdOA9d1g22SbN1fbizT9bUxXA+QguB4G2GlfbIFqw1i0GCzKmzDDQ1LZgPQLKHk5rAJpmSj0ykH0jxArW4V79yqF1bMkEckjYvFrTWIy0btApFsx7m68Ff1D4OdMHbngtKsAAAAAElFTkSuQmCC"
              alt=""
            />
            Continue with Google
          </button>
        </div>
      ) : (
        <div className="auth0-user-info">
          <p>Welcome, {user.name}</p>
          <img src={user.picture} alt="User Profile" className="user-picture" />
          <p>Email: {user.email}</p>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className="auth0-logout-button"
          >
            Logout
          </button>
        </div>
      )}
   
           <div className='check'>
           <input type="checkbox" name="" id="check" /> <span>Remebar me</span></div>
            <p>Create Account <Link to='/signup'>Signup</Link></p>
        </form>
        </div>
      </div>
      </div>
  
  )
}

export default Login
