import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../components/homePage/HomePage.component';
import { LayoutComponent } from '../components/Layout/Layout.component';
import { LoginPage } from '../components/LoginPage';
import { RegistrationPage } from '../components/RegistrationPage';
import { UpdatePage } from '../components/UpdatePage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={'/'} element={<LayoutComponent />}>
        <Route index element={<LoginPage />} />
        <Route path={'registration'} element={<RegistrationPage />} />
        <Route path={'home'} element={<HomePage />} />
        <Route path={'update/:id'} element={<UpdatePage />} />
      </Route>
    </Routes>
  )
}