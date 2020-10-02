export interface Bike {
  id: string;
  number: number;
  Model: {
    name: string;
    img_url: string;
    price: number;
  };
}

export interface Cart {
    items: Bike[];
}

export interface Order {
    startDate: Date;
    hours: number;
    customerName: string;
}

export interface ReservationVar extends Order {
  bikes: { bikeId: string }[];
}

export interface CartData {
  Cart: Cart;
}

export interface OrderData {
  Order: Order;
}

export interface BikesData {
  Bike: Bike[];
}

export interface BikesVar {
  desiredDates: Date;
}

