import React from 'react';
import ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

const container = document.getElementById('root');

const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Auth0Provider
        domain="dev-zkjdgx6e.us.auth0.com"
        clientId="Y0r7UoJBiCZadqPY8ZlxiCk5oZ2xkabj"
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>,
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
