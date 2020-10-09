import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import client from './configureApollo'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
      domain="taukopaikat.eu.auth0.com"
      clientId="j8tAjDsCvaMJLRefXMDie4YZhCZa2bTg"
      redirectUri={window.location.href}
      audience="hasura"
      >
        <ApolloProvider client={client} >
          <App />        
        </ApolloProvider>
      </Auth0Provider>
      </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
