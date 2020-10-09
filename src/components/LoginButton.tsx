import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import Loader from './Loader';
import { Button } from './styledBasicComponents';

const LoginButton = () => {
  const { loginWithRedirect, isLoading } = useAuth0();
      
  const handleLogin = () => {   
    loginWithRedirect({redirectUri: window.location.href});    
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Button onClick={handleLogin}>Login / Signup</Button>      
    </div>
  )

}

export default LoginButton;
