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

export const ActorInputContainer = styled.div`
display: flex;
gap: 10px;
`

export const FileInputContainer = styled.div`
display: flex;
gap: 10px;
max-width: 265px;
`

export const MainContainer = styled.div`
padding-top: 70px;
display: flex;
justify-content: space-around;
gap: 40px;
`

export const MovieFormContainer = styled.div`
display: flex;
flex-direction: column;
`

export const MovieListItem = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding-left: 10px;
`

export const MovieListHeader = styled.div`
text-align: center;
font-size: 28px;
color: white;
`

export const MovieTitle = styled.div`
font-size: 18px;
font-weight: 500;
color: yellow;
`

export const MovieButtonsContainer = styled.div`
display: flex;
gap: 10px;
width: 100px;
`

export const MovieInfoContainer = styled.div`
padding: 30px;
max-height: 400px;
background-color: #fff;
color: green;
display: flex;
flex-direction: column;
justify-content: space-around;
gap: 10px;
width: 400px;
`

export const MovieInfoTitle = styled.div`
`

export const MovieInfoData = styled.div`
display: flex;
font-style: italic;
max-width: 200px;
font-size: 18px;
`

export const MovieInfoItem = styled.div`
display: flex;
justify-content: space-between;
`

export const SearchButtonsContainer = styled.div`
display: flex;
align-items: center;
flex-direction: column;
`
