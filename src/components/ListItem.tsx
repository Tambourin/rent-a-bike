import React, { useState } from 'react';
import { Bike, Cart } from '../types/types';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { cartVarible } from '../cache';
import useCart from '../hooks/useCart';
import { useQuery } from '@apollo/client';
import { GET_CART } from '../queries/queries';

interface Props {
  bike: Bike;
  addItem: Function;
}
interface CartData {
  Cart: Cart;
}

interface ButtonProps {
  red: boolean;
}

const ItemWrapper = styled.div`
  position: relative;
  max-width: 400px;
  user-select: none;      
  background-color: #f1f3f5;
  border: solid 1px #dee2e6;
  margin: 10px;
  cursor: default;  
  display: flex;  
  
`
const Item = styled(animated.div)` 
  display: flex;  
  position: relative;
  flex-direction: column;   
  width: 100%; 
`
const ListItemHeader = styled.h4`  
  margin: 0;
`
const ListItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;  
  padding: 1rem;
`
const ListImage = styled.img`    
  width: 100%;
  height: 70%;
  object-fit: cover;
`
const ListButton = styled.button<ButtonProps>`
position: absolute;
  top: 40%;
  width: 100%;
  background-color: ${props => props.red ? "#fe5246" : "#4CAF50"}; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none; 
  font-size: 2rem;
`
const SelectedLabel = styled.p`
  position: absolute;
  width: 100%;
  top: 35%;
  background-color: #4CAF50;
  color: white;
  font-size: 2rem;
`

const BikeNumber = styled.p`
  position: absolute;
  background-color: whitesmoke;
  margin: 0;
  top: 1;
  left: 1;
`

const ListItem = ({ bike, addItem }: Props) => {
  const [ showButton, setShowButton ] = useState(false);
  const { data: cartData } = useQuery<CartData>(GET_CART);
  const { removeItem } = useCart(cartVarible)

  const selected = cartData?.Cart.items.find(item => item.id === bike.id) ? true : false
  const props = useSpring({opacity: selected ? 0.4 : 1})

  const toggleSelected = () => {    
    if(selected === true) {
      removeItem(bike.id)
    } else {
      addItem(bike)
    }
    setShowButton(false)
  } 

  return (    
    <ItemWrapper 
      onClick={toggleSelected} 
      onMouseEnter={() => setShowButton(true)} 
      onMouseLeave={() => setShowButton(false)}
    >
      <Item style={props} >    
        <BikeNumber>Bike No: {bike.number}</BikeNumber>
        <ListImage alt="kuva pyörästä" src={bike.Model.img_url} />   
        <ListItemInfo>
          <ListItemHeader>{bike.Model.name}</ListItemHeader>
          <p>{bike.Model.price} € / h</p>        
        </ListItemInfo>        
            
      </Item>
  {selected ? <SelectedLabel>Selected</SelectedLabel> : null }
  {showButton ? <ListButton red={selected}>{selected ? "Remove": "Select this bike"}</ListButton> : null}
    </ItemWrapper>
  )
}

export default ListItem;