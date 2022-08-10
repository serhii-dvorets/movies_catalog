import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  HeaderContainer,
  Header,
  HeaderTitle,
  ButtonsContainer,
  HeaderSubTitle
} from './Header.styles';
import jwt_decode from "jwt-decode";
import { userData } from './Header.types';

export function HeaderComponent() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const userData: userData = jwt_decode(token)
      setUserName(userData.name)
    }
  }, [navigate])

  return (
    <HeaderContainer>
      <Header>
        <HeaderTitle>movies catalog</HeaderTitle>

        <ButtonsContainer>
          {!userName ? (
            <>
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
            </>
          ) : (
              <HeaderSubTitle>Hi, {userName}!</HeaderSubTitle>
          )}
        </ButtonsContainer>

      </Header>
    </HeaderContainer>
  );
};
