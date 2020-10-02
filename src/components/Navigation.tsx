import React from 'react';
import { Cart } from '../types/types';
import styled from 'styled-components'
import { Button } from './styledBasicComponents';
import { Link } from 'react-router-dom';

const Box = styled.div`  
  background: lightgrey;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const CartImage = styled.img` 
  height: 20px;
  padding-right: 10px;
`
interface Props {
  cart: Cart | undefined;
}

function Navigation({ cart }: Props) {  
  if (!cart) {
    return null;
  }
  
  return(
    <Box>   
      <Link to="/"><p>Select date</p> </Link>  
      <Link to="/bikes"><p>Select Bike</p> </Link>  
      <Link to="/checkout">
        <Button>        
          <CartImage src="https://image.flaticon.com/icons/png/512/126/126083.png" /> 
          Checkout
        </Button>
      </Link>      
    </Box> 
  );

}

export default Navigation;