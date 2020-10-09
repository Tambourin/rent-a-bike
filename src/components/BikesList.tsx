import React from 'react';
import { Bike, Cart } from '../types/types';
import styled from 'styled-components';
import ListItem from './ListItem'

const ListContainer = styled.div` 
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  background: whitesmoke;
  padding: 40px;
`

interface Props {
  bikes: Bike[] | undefined; 
  cartValue: Cart, 
  removeItem: Function, 
  addItem: Function
}

function BikesList({ bikes, cartValue, removeItem, addItem }: Props) {
  return (
    <ListContainer >
      {bikes?.map(bike => {
          return(
            <ListItem key={bike.id} bike={bike} cartValue={cartValue} removeItem={removeItem} addItem={addItem} />    
          )
        })}
    </ListContainer>
  )
}

export default BikesList