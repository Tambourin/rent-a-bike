import { InMemoryCache, makeVar } from "@apollo/client"
import { Cart, Order } from "./types/types"

export const initialCart = {
  items: []
}

export const initialOrder = {
  startDate: new Date(),
  hours: 1,
  customerName: ""
}
  
export const cartVarible = makeVar<Cart>(initialCart)

export const orderVariable = makeVar<Order>(initialOrder)

export const bikeIsSelected = makeVar(false)

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
        fields: {
          Cart: {          
            read() {
              return cartVarible();
            }
          },        
          Order: {
            read() {
              return orderVariable();
            }
          }
        }}    
    }
  });
