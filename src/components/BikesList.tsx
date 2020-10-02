import React from 'react';
import { Bike } from '../types/types';
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
  addItem: Function;
}

function BikesList({ bikes, addItem }: Props) {
  return (
    <ListContainer >
      {bikes?.map(bike => {
          return(
            <ListItem key={bike.id} bike={bike} addItem={addItem} />    
          )
        })}
    </ListContainer>
  )
}

export default BikesList