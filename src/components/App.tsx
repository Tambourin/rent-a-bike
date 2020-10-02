import React from 'react';
import { useQuery } from '@apollo/client';
import { Switch, Route } from 'react-router-dom'
import CartBox from './CartBox'
import { CartData } from '../types/types'
import { GET_CART } from '../queries/queries'
import Navigation from './Navigation';
import { Header, HeaderImage, EmptySpace } from './styledBasicComponents';
import BikeSelectionView from './BikeSelectionView';
import DateSelectionView from './DateSelectionView';
import CheckoutView from './CheckoutView';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
`

function App() {  
  const { data: cartData } = useQuery<CartData>(GET_CART);

  return (
    <Container> 
      <Navigation cart={cartData?.Cart}/>   
      <HeaderImage src="https://images.unsplash.com/photo-1519119012096-c145def61801?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />   
      <Switch>
        <Route exact path="/" >     
        <Header>RENT A BIKE</Header>     
          <DateSelectionView />
        </Route>
        <Route path="/bikes">
          <div>  
            <Header>RENT A BIKE</Header>
            <BikeSelectionView />      
            <CartBox />
            <EmptySpace>
              <h2>Photos</h2>
              <p>Photos: Eerik Sandstrom</p>
              <a href="https://unsplash.com/@mountainmofo">https://unsplash.com/@mountainmofo</a>
            </EmptySpace>
          </div>
        </Route>
        <Route path="/checkout">
          <CheckoutView />
        </Route>
        <Route path="/confirmed">
          <Header>Reservation succesfull</Header>
        </Route>
      </Switch>
      
      
    </Container>
  );
}

export default App;
