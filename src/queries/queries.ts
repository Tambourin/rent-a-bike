import { gql } from '@apollo/client'

export const GET_BIKES = gql`
  query GetBikes($desiredDates: [date!]) {
    Bike(where: {_not: {Resrvation_Bikes: {Reservation: {start_date: {_in: $desiredDates}}}}}) {
      id
      number
      Model {
        name
        price
        img_url        
      }
    }
  }
`

export const GET_CART = gql`
  query GetCart {
    Cart @client
  }
`

export const GET_ORDER = gql`
  query GetOrder {
    Order @client
  }
`

export const ADD_RESERVATION = gql`
  mutation AddReservation(
    $startDate: date, 
    $customerName: String, 
    $hours: numeric, 
    $bikes: [Resrvation_Bike_insert_input!]!) {
      insert_Reservation(
        objects: {
          start_date: $startDate, 
          customerName: $customerName, 
          hours: $hours, 
          Resrvation_Bikes: {data: $bikes}}) {
        returning {
          id
        }
      }
  }
`