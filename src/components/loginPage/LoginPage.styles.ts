import styled from 'styled-components';

export const LoginPageContainer = styled.div`
  background: var(--main-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`
export const PageTitle = styled.h1`
font-size: 28px;
color: gold;
margin-bottom: 50px;
`;

export const PageSubtitle = styled.h2`
color: white;
margin-bottom: 30px;
`;

export const LoginButton = styled.button` display: block;
width: 100%;
padding: 5px;
border: none;
color: white;
font-weight: 600;
box-shadow: 0 2px 3px black;
background-color: green;

&:active {
  transition-duration: 0.2s;
  box-shadow: none;
}

`;
