import { Cart, Bike } from "../types/types";
import { ReactiveVar } from "@apollo/client"
import { initialCart } from "../cache";

const useCart = (cart: ReactiveVar<Cart>) => {
  const addItem = (newItem: Bike) => {
    cart({            
      items: [
        ...cart().items,
          newItem
        ]
    })
  }

  const removeItem = (bikeId: string) => {
    cart({
      items: [
        ...cart().items.filter(item => item.id !== bikeId)
      ]
    })
  }

  const clearCart = () => {
    cart(initialCart)
  } 

  return { addItem, removeItem, clearCart }
}

export default useCart;
