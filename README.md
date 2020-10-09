![Screenshot](https://github.com/Tambourin/rent-a-bike/blob/main/Screenshot2.png?raw=true)

A mock Rent a Bike reservation app. This is an excercise project for Helsinki University database course. Jusy playing around with GraphQl, Typescript and Hasura cloud. 

Data is kept in Postgres SQL database and accessed using Hasura cloud, which provides automatic GraphQl interface. User authentication is handled with Auth0 authentication service. User's authentication data is preserved at Auth0's database, but linked to own database. Each time a new user is created, a new user is also added to own Postgres database. This is done to connect user data with reservation data.

Authorization header with JWT is attached to gql requests. Any visitor has access to selecting Bike, Model and Reservationdate data but only authorized users have permission to insert data, thus logging in is required to make reservations. Selecting reservation data for logged in user is restricted to their own data.

I tried to manage local state completely with Apollo and it worked, but became too complicated for the purpose and seemed to cause more problems than it solved.


