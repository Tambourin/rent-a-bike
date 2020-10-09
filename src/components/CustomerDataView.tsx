import { useLazyQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect } from 'react'
import { GET_RESERVATIONS } from '../queries/queries'
import { ReservationData } from '../types/types'
import Loader from './Loader'
import LoginButton from './LoginButton'
import { Container, Header2, Header3 } from './styledBasicComponents'

const CustomerDataView = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [ getReservations, { data, loading } ] = useLazyQuery<ReservationData>(GET_RESERVATIONS)

  useEffect(() => {
    if(isAuthenticated && user) {
      getReservations({ variables:{ userId: user.sub }});
    }
  }, [isAuthenticated, data, getReservations, user]);

  if(loading || isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Header2>Your order history</Header2>
      <Header3>Orders</Header3>
      {
        data ?
          data.Reservation.map(reservation => {return(
            <div key={reservation.id}>
              <p>{reservation.start_date}</p>
              <p>{reservation.id}</p>
                {reservation.Resrvation_Bikes.map(
                  bike => <span key={bike.Bike.id}>{bike.Bike.Model.name}, </span>
                )}
              <hr />
            </div>
          )})
        :
          <LoginButton />
      }
    </Container>
  )
}

export default CustomerDataView;