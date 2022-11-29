import React from 'react';
import { Route, Routes } from 'react-router-dom';

import App from '../root/App';
import NotFound from '../pages/404';
import AuthRoutes from './authRoutes';
import GalleryRoutes from './galleryRoutes';
import DrawRoutes from './drawRoutes';

export default (
  <Routes>
    <Route path="/" element={<App />} />
    {AuthRoutes()}
    {GalleryRoutes()}
    {DrawRoutes()}
    <Route path="*" element={<NotFound />} />
  </Routes>
);
