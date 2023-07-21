import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Home } from '../components/pagecomponents/Home';
import { IncomeAddForm } from '../components/pagecomponents/IncomeAddForm';
import { Login } from '../components/pagecomponents/Login';
import { Report } from '../components/pagecomponents/Report';
import { SpendAddForm } from '../components/pagecomponents/SpendAddForm';

export const Router = () => {
  const { user = {} } = useSelector((state) => state.login) || {};
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={user.id ? <Home /> : <Navigate to="/" />} />
      <Route path="/report" element={user ? <Report /> : <Navigate to="/" />} />
      <Route
        path="/addincome"
        element={user ? <IncomeAddForm /> : <Navigate to="/" />}
      />
      <Route
        path="/addspend"
        element={user ? <SpendAddForm /> : <Navigate to="/" />}
      />
      <Route path="/*" element={<Login />} />
    </Routes>
  );
};
