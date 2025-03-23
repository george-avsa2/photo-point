import { Route, Routes } from 'react-router';
import React from 'react';
import { Navigation } from './Navigation';

const CatalogPage = React.lazy(() => import('./pages/CatalogPage/CatalogPage'));
const CartPage = React.lazy(() => import('./pages/CardPage/CartPage'));

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;
