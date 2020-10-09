import { gql, useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const PROFILE_QUERY = gql`
  query CurrentUserForLayout {
    currentUser {
      login
      avatar_url
    }
  }
`;

const LogoutButton = () => {
  const { client } = useQuery(
    PROFILE_QUERY,
    { fetchPolicy: "network-only" }
  );
  const { logout, isAuthenticated } = useAuth0();

  if(!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    window.sessionStorage.clear();
    window.localStorage.clear();
    client.clearStore();
    logout({ returnTo: window.location.origin });
  }

  return (
    <button onClick={handleLogout}>Logout</button>
  )
}

export default LogoutButton;