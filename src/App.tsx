import { Route, Routes } from 'react-router';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import CartPage from './pages/CardPage/CartPage';
import { Navigation } from '@mui/icons-material';

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
