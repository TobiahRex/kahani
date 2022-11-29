import React from 'react';
import { Route } from 'react-router-dom';
import Gallery from '../pages/Gallery';

export default function galleryRoutes() {
  return (
    <Route path="gallery" element={<Gallery />} />
  );
}
