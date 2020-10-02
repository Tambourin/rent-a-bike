import React from 'react';
import { CartData, OrderData } from '../types/types';
import styled from 'styled-components';
import { Button } from './styledBasicComponents';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CART, GET_ORDER } from '../queries/queries';

const Box = styled.div`  
  padding: 45px;  
  background-color: grey;
`

function CartBox() {  
  const { data: orderData } = useQuery<OrderData>(GET_ORDER);
  const { data: cartData } = useQuery<CartData>(GET_CART);

  if (!cartData || !orderData) {
    return null;
  }

  const cartItems = cartData.Cart.items;

  return(
    <Box>              
      { cartItems.length > 0 ? 
      <div>
        <p>Selected {cartItems.length} bikes</p>
        <p>
          Sum for {orderData.Order.hours} hours: {cartItems.reduce(
            (a, item) => a + item.Model.price * orderData.Order.hours, 0
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