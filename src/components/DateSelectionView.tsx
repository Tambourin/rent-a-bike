import React from 'react';
import styled from 'styled-components';
import { Button, Header2, Input } from './styledBasicComponents';
import { Link } from 'react-router-dom';
import useOrder from '../hooks/useOrder';
import { orderVariable } from '../cache';
import { useQuery } from '@apollo/client';
import { GET_ORDER } from '../queries/queries';
import { OrderData } from '../types/types';

const DateSelectionContainer = styled.div`  
  padding-bottom: 10vh;   
  background-color: whitesmoke;
`
const DateSelectionView = () => {
  const { data: orderData } = useQuery<OrderData>(GET_ORDER);
  const { setHours, setStartDate } = useOrder(orderVariable);

  const handleChange = (value: string) => {
    setStartDate(new Date(value))    
  }
  
  return (
    <DateSelectionContainer>
      <Header2>Select date:</Header2>
      <Input type="date"        
        onChange={(event) => handleChange(event.target.value)}
        value={orderData?.Order.startDate.toISOString().split('T')[0]}
      />
      <h3>How many hours?</h3>
      <Input 
        type="number"
        onChange={(event) => setHours(Number(event.target.value))} 
        min="0" 
        max="8"
        value={orderData?.Order.hours}
      ></Input>
      <br />
      <Link to="/bikes"><Button>Continue to bike selection</Button></Link>
    </DateSelectionContainer>
  )
}

export default DateSelectionView;