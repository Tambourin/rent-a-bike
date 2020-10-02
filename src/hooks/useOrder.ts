import { ReactiveVar } from "@apollo/client";
import { initialOrder } from "../cache";
import { Order } from "../types/types";

const useOrder = (order: ReactiveVar<Order>) => {
  const setStartDate = (startDate: Date) => {
    order({
      ...order(),
      startDate: startDate
    });
  }

  const setHours = (hours: number) => {
    order({
      ...order(),
      hours: hours
    });
  }

  const setCustomerName = (name: string) => {
    order({
      ...order(),
      customerName: name
    });
  }

  const clearOrder = () => {
    order(initialOrder);
  }

  return { setStartDate, setHours, setCustomerName, clearOrder };
}

export default useOrder;