import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../components/pagecomponents/Home';
import { IncomeAddForm } from '../components/pagecomponents/IncomeAddForm';
import { Report } from '../components/pagecomponents/Report';
import { SpendAddForm } from '../components/pagecomponents/SpendAddForm';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/report" element={<Report />} />
      <Route path="/addincome" element={<IncomeAddForm />} />
      <Route path="/addspend" element={<SpendAddForm />} />
    </Routes>
  );
};
