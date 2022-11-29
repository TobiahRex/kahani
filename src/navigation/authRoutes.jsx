import React from 'react';
import { Route } from 'react-router-dom';
import Register from '../pages/Register';

export default function authRoutes() {
  return (
    <Route path="register" element={<Register />} />
  );
}
