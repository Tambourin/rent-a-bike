import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://eager-parakeet-69.hasura.app/v1/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');  
  if(token) {
    return {    
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : null,
      }
    }
  }  
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;