import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, ApolloProvider } from '@apollo/client'
import { cache } from './cache'
import { BrowserRouter } from 'react-router-dom'

const client = new ApolloClient({
  uri: "https://eager-parakeet-69.hasura.app/v1/graphql",
  cache: cache
});



ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
