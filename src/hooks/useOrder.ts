import { useState } from "react";
import { Order } from "../types/types";

const emptyOrder: Order = {
  startDate: new Date(),
  hours: 1,
  customerName: ""
}
const key = 'order';

const useOrder = () => {
  const [ orderValue, setOrderValue ] = useState<Order>(() => {
    const item = window.sessionStorage.getItem(key);     
    if (item) {
      const parsed = JSON.parse(item)  ;
      parsed.startDate = new Date(parsed.startDate);
      return parsed;
    } else {
      return emptyOrder;
    }
  });

  const setValues = (newOrder: Order) => {
    setOrderValue(newOrder);    
    window.sessionStorage.setItem(key, JSON.stringify(newOrder));
  }

  const setStartDate = (startDate: Date) => {
    const newOrder: Order = ({
      ...orderValue,
      startDate: startDate
    });
    setValues(newOrder);
  }

  const setHours = (hours: number) => {
    const newOrder: Order =({
      ...orderValue,
      hours: hours
    });
    setValues(newOrder);
  }

  const clearOrder = () => {
    setValues(emptyOrder);
  }

  return { orderValue, setStartDate, setHours, clearOrder }; 

}

export default useOrder;