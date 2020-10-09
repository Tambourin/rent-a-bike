import { useMutation } from '@apollo/client';
import React from 'react';
import { ADD_RESERVATION, GET_RESERVATIONS } from '../queries/queries';
import { Button, Header2, Header3 } from './styledBasicComponents';
import { Cart, Order, ReservationVar } from '../types/types'
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import Loader from './Loader';

const Container = styled.div`
  background-color: whitesmoke;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
`

interface Props {
  cartValue: Cart,
  clearCart: Function,
  orderValue: Order,
  clearOrder: Function
}

const CheckoutView = ({ cartValue, clearCart, orderValue, clearOrder }: Props) => {
  const history = useHistory();
  const [ addReservation ] = useMutation<{id: string}, ReservationVar>(ADD_RESERVATION);
  const { user, isLoading, isAuthenticated } = useAuth0();
  
  if(isLoading) {
    return (
      <Loader />
    )
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();   
    addReservation(
      {
      variables: { 
        startDate: orderValue.startDate,
        hours: orderValue.hours,
        customerName: orderValue.customerName,
        userId: user.sub,
        bikes: cartValue.items.map(bike => {
          return ({ bikeId: bike.id })
        })      
      },
      refetchQueries: ["GetBikes", {query: GET_RESERVATIONS, variables: { userId: user.sub }}],       
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
        cartValue.items.map(item => (
          <div key={item.id}>
            {item.Model.name}
          </div>
        ))
      }
      <Header3>Date</Header3>
    <p>{orderValue.startDate.toDateString()}, {orderValue.hours} hours</p>
      <Header3>Sum</Header3>
      {cartValue.items.reduce((a, item) => a + item.Model.price*orderValue.hours, 0)} €
      {isAuthenticated && user ? 
        <p>Logged in as {user.name}</p> 
      : 
        <div>Login or create an account to place an order<LoginButton /></div> 
      } 
      {user && cartValue.items.length > 0 ?
        <Button onClick={handleSubmit}>Make reservation</Button>
      : 
        <Button disabled>Required fields missing</Button>
      }
    </Container>
  )
}

export default CheckoutView;