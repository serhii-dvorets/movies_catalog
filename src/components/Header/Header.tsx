import { Button } from 'antd';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HeaderContainer,
  Header,
  HeaderTitle,
  ButtonsContainer
} from './Header.styles';

export const HeaderComponent = () => {

  return (
    <HeaderContainer>
      <Header>
        <HeaderTitle>movies catalog</HeaderTitle>
        <ButtonsContainer>
          <NavLink
            style={{
              display: 'inline-block',
              padding: '5px 20px',
              backgroundColor: 'white',
              color: 'var(--main-color)'
            }}
            to={'/'}
          >
            Login
          </NavLink>
          <NavLink
            style={{
              padding: '5px 20px',
              backgroundColor: 'white',
              color: 'var(--main-color)',
            }}
            to={'/registration'}
          >
            Registration
          </NavLink>
        </ButtonsContainer>
      </Header>
    </HeaderContainer>
  );
};
