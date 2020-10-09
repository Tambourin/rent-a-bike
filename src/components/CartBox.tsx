import React from 'react';
import { Cart, Order } from '../types/types';
import styled from 'styled-components';
import { Button } from './styledBasicComponents';
import { Link } from 'react-router-dom';

const Box = styled.div`  
  padding: 45px;  
  background-color: grey;
`

interface Props {
  cartValue: Cart;
  orderValue: Order;
}

const CartBox = ({ cartValue, orderValue }: Props) => {    
  const cartItems = cartValue.items;

  return(
    <Box>              
      { cartItems.length > 0 ? 
      <div>
        <p>Selected {cartItems.length} bikes</p>
        <p>
          Sum for {orderValue.hours} hours: {cartItems.reduce(
            (a, item) => a + item.Model.price * orderValue.hours, 0
          )} €
        </p>
        <Link to="/checkout">
          <Button>Continue to checkout</Button>
        </Link>
      </div>
      : <p>No items selected yet.</p> }
      
    </Box> 
  );
}

export default CartBox;