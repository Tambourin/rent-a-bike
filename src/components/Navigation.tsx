import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Box = styled.div`  
  background: lightgrey;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

function Navigation() {  
  

  return(
    <Box>   
      <Link to="/"><p>Rent</p> </Link>  
      <Link to="/customer"><p>Your order history</p> </Link>  
      <LogoutButton />
    </Box> 
  );

}

export default Navigation;