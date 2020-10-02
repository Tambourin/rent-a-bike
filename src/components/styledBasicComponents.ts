import styled from 'styled-components';

export const Header = styled.h1`
  background-color: #4CAF50;
  color: white;
  padding: 8px;
  background-repeat: no-repeat;
  font-size: 10vh;
  font-family: 'Squada One', cursive;
  margin: 0;
`

export const Header2 = styled.h2`
  background-color: grey;  
  padding: 8px;
  background-repeat: no-repeat;
  font-size: 6vh;
  font-family: 'Squada One', cursive;
  margin: 0;
`

export const Header3 = styled.h3`
  background-color: whitesmoke;  
  padding: 18px;  
  font-size: 1rem;  
`
export const HeaderImage = styled.img` 
  width: 100%;
  height: 500px;
  object-fit: cover;
`

export const EmptySpace = styled.div` 
  color: white;
  padding: 15%;
`

export const Button = styled.button`
  background-color: #4CAF50; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;

  &:hover {
    background-color: #113718;
  }
`;

export const Input = styled.input`
  padding: 1rem;
  font-size: large;
  margin: 2rem;
`

export const Container = styled.div`
  background-color: whitesmoke;
  padding: 2rem;
`