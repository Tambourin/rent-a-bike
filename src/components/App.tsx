import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import CartBox from './CartBox'
import Navigation from './Navigation';
import { Header, HeaderImage, EmptySpace } from './styledBasicComponents';
import BikeSelectionView from './BikeSelectionView';
import DateSelectionView from './DateSelectionView';
import CheckoutView from './CheckoutView';
import styled from 'styled-components';
import CustomerDataView from './CustomerDataView';
import { useAuth0 } from '@auth0/auth0-react';
import useCart from '../hooks/useCart';
import useOrder from '../hooks/useOrder';

const Container = styled.div`
  text-align: center;
`

const App = () => {  
  const { getAccessTokenSilently } = useAuth0();
  const { cartValue, addItem, removeItem, clearCart } = useCart();
  const { orderValue, setStartDate, setHours, clearOrder } = useOrder();

  useEffect(() => {
    const getToken = async () => {     
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `hasura`,
          scope: "read:current_user",
        });         
        localStorage.setItem('token', accessToken);
      } catch (e) {
        console.log(e.message);
      }
    };
    getToken();
  }, [getAccessTokenSilently]);

  
  return (
    <Container> 
      <Navigation />   
      <HeaderImage src="https://images.unsplash.com/photo-1519119012096-c145def61801?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />   
      <Switch>
        <Route exact path="/" >     
          <Header>RENT A BIKE</Header>     
          <DateSelectionView orderValue={orderValue} setHours={setHours} setStartDate={setStartDate} />
        </Route>
        <Route path="/bikes">
          <div>  
            <Header>RENT A BIKE</Header>
            <BikeSelectionView cartValue={cartValue} removeItem={removeItem} addItem={addItem} orderValue={orderValue} />      
            <CartBox cartValue={cartValue} orderValue={orderValue} />
            <EmptySpace>
              <h2>Photos</h2>
              <p>Photos: Eerik Sandstrom</p>
              <a href="https://unsplash.com/@mountainmofo">https://unsplash.com/@mountainmofo</a>
            </EmptySpace>
          </div>
        </Route>
        <Route path="/checkout">
          <CheckoutView cartValue={cartValue} clearCart={clearCart} orderValue={orderValue} clearOrder={clearOrder} />
        </Route>
        <Route path="/confirmed">
          <Header>Reservation succesfull</Header>
        </Route>
        <Route path="/customer">
          <CustomerDataView />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
