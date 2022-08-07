import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LayoutComponent } from '../components/Layout/Layout.component';
import { LoginPage } from '../components/loginPage';
import { RegistrationPage } from '../components/RegistrationPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={'/'} element={<LayoutComponent />}>
        <Route index element={<LoginPage />} />
        <Route path={'registration'} element={<RegistrationPage />} />
      </Route>
    </Routes>
  )
}