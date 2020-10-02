import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { ADD_RESERVATION, GET_CART, GET_ORDER } from '../queries/queries';
import { Button, Header2, Header3, Input } from './styledBasicComponents';
import { CartData, OrderData, ReservationVar } from '../types/types'
import styled from 'styled-components';
import useOrder from '../hooks/useOrder';
import { cartVarible, orderVariable } from '../cache';
import useCart from '../hooks/useCart';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  background-color: whitesmoke;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
`

const CheckoutView = () => {
  const history = useHistory();
  const { setCustomerName,clearOrder } = useOrder(orderVariable)
  const { clearCart } = useCart(cartVarible);
  const { data } = useQuery<CartData>(GET_CART);
  const { data: orderData } = useQuery<OrderData>(GET_ORDER);
  const [ addReservation ] = useMutation<{id: string}, ReservationVar>(ADD_RESERVATION);
  
  if(!orderData || !data) {
    return <p>Nothing selected</p>;
  }
 
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();   
    addReservation(
      {
      variables: { 
        startDate: orderData.Order.startDate,
        hours: orderData.Order.hours,
        customerName: orderData.Order.customerName,
        bikes: data.Cart.items.map(bike => {
          return ({ bikeId: bike.id })
        })      
      },
      refetchQueries: ["GetBikes"]      
    });
    clearCart();
    clearOrder();
    history.push("/confirmed");
  }

  return (
    <Container>
      <Header2>Checkout:</Header2>
      <Header3>Selected bikes</Header3>
      {
        data?.Cart.items.map(item => (
          <div key={item.id}>
            {item.Model.name}
          </div>
        ))
      }
      <Header3>Date</Header3>
      <p>{orderData?.Order.startDate.toDateString()}</p>
      <Header3>Sum</Header3>
      {data?.Cart.items.reduce((a, item) => a + item.Model.price*orderData?.Order.hours, 0)} €
      <form onSubmit={handleSubmit}>
        <label htmlFor="customer_name">Customer name:</label>
        <Input value={orderData.Order.customerName} onChange={(event) => setCustomerName(event.target.value)} name="customer_name" />
        <br></br>
        <Button>Make reservation</Button>
      </form>
      
    </Container>
  )
}

export default CheckoutView;