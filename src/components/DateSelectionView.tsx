import React from 'react';
import styled from 'styled-components';
import { Button, Header2, Input } from './styledBasicComponents';
import { Link } from 'react-router-dom';
import { Order } from '../types/types';

const DateSelectionContainer = styled.div`  
  padding-bottom: 10vh;   
  background-color: whitesmoke;
`
interface Props {
  orderValue: Order,
  setHours: Function,
  setStartDate: Function
}

const DateSelectionView = ({ orderValue, setHours, setStartDate }: Props) => {
  
  const handleChange = (value: string) => {
    setStartDate(new Date(value))    
  }
  
  return (
    <DateSelectionContainer>
      <Header2>Select date:</Header2>
      <Input type="date"        
        onChange={(event) => handleChange(event.target.value)}
        value={orderValue.startDate.toISOString().split('T')[0]}
      />
      <h3>How many hours?</h3>
      <Input 
        type="number"
        onChange={(event) => setHours(Number(event.target.value))} 
        min="1" 
        max="8"
        value={orderValue.hours}
      ></Input>
      <br />
      <Link to="/bikes"><Button>Continue to bike selection</Button></Link>
    </DateSelectionContainer>
  )
}

export default DateSelectionView;