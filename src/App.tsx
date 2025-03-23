import { Route, Routes } from 'react-router';
import { Navigation } from '@mui/icons-material';
import React from 'react';

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
