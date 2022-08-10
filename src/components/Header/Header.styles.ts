import styled from 'styled-components';

export const HeaderContainer = styled.div`
background-color: var(--main-color);
height: 100px;
`

export const Header = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
background-color: var(--main-color);
margin: 0 40px;
height: 100px;
border-bottom: 1px solid white;
`

export const HeaderTitle = styled.h1`
padding: 0;
margin: 0;
color: white;
font-size: 36px;
`

export const HeaderSubTitle = styled.div`
padding: 0;
margin: 0;
color: white;
font-size: 28px;
font-style: italic;
`

export const ButtonsContainer = styled.h1`
padding: 0;
margin: 0;
display: flex;
gap: 10px;
`