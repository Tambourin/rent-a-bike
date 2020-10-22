import { gql } from '@apollo/client'

export const GET_BIKES = gql`
  query GetBikes($desiredDates: [date!]) {
    Bike(where: {_not: {Reservation_Bikes: {Reservation: {start_date: {_in: $desiredDates}}}}}) {
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

export const ADD_RESERVATION = gql`
  mutation AddReservation(
    $startDate: date!, 
    $customerName: String!,
    $userId: String, 
    $hours: numeric!, 
    $bikes: [Reservation_Bike_insert_input!]!) {
      insert_Reservation(
        objects: {
          start_date: $startDate, 
          customerName: $customerName, 
          userId: $userId,
          hours: $hours, 
          Reservation_Bikes: {
            data: $bikes
          }
        }) 
      {
        returning {
          id
        }
      }
  }
`

export const GET_RESERVATIONS = gql`
  query getReservations($userId: String) {
    Reservation(where: {userId: {_eq: $userId}}) {
      start_date
      id
      hours
      Reservation_Bikes {
        Bike {
          id
          Model {
            name
          }
        }
      }
    }
  }
`