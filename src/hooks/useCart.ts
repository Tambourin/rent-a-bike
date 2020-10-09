import { useState } from 'react';
import { Bike, Cart } from '../types/types';

const emptyCart: Cart = { items: [] };
const key = 'cart';

const useCart = () => {
  const [ cartValue, setCartValue ] = useState<Cart>(() => {
    const item = window.sessionStorage.getItem(key);
    console.log(item);
    return item ? JSON.parse(item) : emptyCart;
  });

  const setValues = (newCart: Cart) => {
    setCartValue(newCart);    
    window.sessionStorage.setItem(key, JSON.stringify(newCart));
  }

  const addItem = (newItem: Bike) => {
    const newCart: Cart = {          
      ...cartValue,  
      items: [
        ...cartValue.items,
          newItem
        ]
    }
    setValues(newCart);
  }

  const removeItem = (bikeId: string) => {
    const newCart: Cart = {
      ...cartValue,
      items: [
        ...cartValue.items.filter((item: Bike) => item.id !== bikeId)
      ]
    }
    setValues(newCart);
  }

  const clearCart = () => {
    setValues(emptyCart);
  } 

  return { cartValue, addItem, removeItem, clearCart }; 

}

export default useCart;