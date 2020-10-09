import React from 'react'
import { Container, Header2, Header3 } from './styledBasicComponents';
import BikesList from './BikesList';
import { useQuery } from '@apollo/client';
import { GET_BIKES } from '../queries/queries';
import { Bike, Cart, Order } from '../types/types';
import { Link } from 'react-router-dom';
import { BikesData, BikesVar } from '../types/types';
import Loader from './Loader';

interface Props {
  cartValue: Cart, 
  removeItem: Function, 
  addItem: Function,
  orderValue: Order
}

const BikeSelectionView = ({ cartValue, removeItem, addItem, orderValue }: Props) => {
  const { loading, error, data } = 
    useQuery<BikesData, BikesVar>(
      GET_BIKES, 
      {
        variables:{ 
          desiredDates: orderValue ? orderValue.startDate : new Date()
        }
      }
    );

  if(loading) {
    return <Loader />;
  }
  if(error || !data) {
    return <p>Error</p>;
  }
  if (data.Bike.length === 0) {
    return (
      <Container>
        No bikes available on selected date
        <Link to="/"> Select different day</Link>
      </Container>
    );
  }

  const availableBikes: Bike[] = data?.Bike;

  return (
    <>
      <Header2>Choose the bikes you want to rent</Header2>
      <Header3>Bikes available on 
        {" " + orderValue.startDate.toDateString()} 
        <Link to="/"> Change date</Link>      
      </Header3>
      <BikesList bikes={availableBikes} cartValue={cartValue} removeItem={removeItem} addItem={addItem} />
    </>
  )
}

export default BikeSelectionView;