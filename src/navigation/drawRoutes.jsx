import React from 'react';
import { Route } from 'react-router-dom';
import Draw from '../pages/Draw';

export default function drawRoutes() {
  return (
    <>
      <Route path="draw" element={<Draw />} />
      <Route path="draw:id" element={<Draw />} />
    </>
  );
}
