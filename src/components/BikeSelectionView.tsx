import React from 'react'
import { cartVarible } from '../cache';
import useCart from '../hooks/useCart';
import { Container, Header2, Header3 } from './styledBasicComponents';
import BikesList from './BikesList';
import { useQuery } from '@apollo/client';
import { GET_BIKES, GET_ORDER } from '../queries/queries';
import { Bike, OrderData } from '../types/types';
import { Link } from 'react-router-dom';
import { BikesData, BikesVar } from '../types/types';

const BikeSelectionView = () => {
  const { data: orderData } = useQuery<OrderData>(GET_ORDER);
  const { loading, error, data } = 
    useQuery<BikesData, BikesVar>(
      GET_BIKES, 
      {
        variables:{ 
          desiredDates: orderData ? orderData.Order.startDate : new Date()
        }
      }
    );
  const { addItem } = useCart(cartVarible)
  
  if(loading) {
    return <img src="https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif" />;
  }
  if(error || !data) {
    return <p>Error</p>
  }
  if (data.Bike.length === 0) {
    return (
      <Container>
        No bikes available on selected date
        <Link to="/"> Select different day</Link>
      </Container>
    )
  }

  const availableBikes: Bike[] = data?.Bike;

  return (
    <>
      <Header2>Choose the bikes you want to rent</Header2>
      <Header3>Bikes available on 
        {" " + orderData?.Order.startDate.toDateString()} 
        <Link to="/"> Change date</Link>      
      </Header3>
      <BikesList bikes={availableBikes} addItem={addItem} />
    </>
  )
}

export default BikeSelectionView;