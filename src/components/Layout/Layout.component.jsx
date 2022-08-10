import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { HeaderComponent } from '../Header/Header.component';
import { AppContainer, OutletContainer } from './Layout.styles';

const LayoutComponent = () => {
  return (
    <AppContainer>
      <Layout>
        <HeaderComponent />
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </Layout>
    </AppContainer>
  );
};

export { LayoutComponent };
