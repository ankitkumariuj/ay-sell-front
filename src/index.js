// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // Import your main App component
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <Router> {/* Wrap App with Router here */}
   <Auth0Provider
    domain="dev-fb75osi8axa0p0zw.us.auth0.com"
    clientId="pTyPLTC2IoLLtsGLhInflC1gjJBa7mOo"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
  </Router>,
  document.getElementById('root')
);
