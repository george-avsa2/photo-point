import { Link, Route, Routes } from 'react-router';
import CatalogPage from './pages/CatalogPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Catalog</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
