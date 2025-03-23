import { Link, Route, Routes } from 'react-router';
import CatalogPage from './pages/CatalogPage';
import CartPage from './pages/CartPage';
import { useSelector } from 'react-redux';
import { State } from './store';

function App() {
  const selectedProducts = useSelector(
    (state: State) => state.products?.selectedProductsIds
  );

  const cardTotalLength = selectedProducts.reduce((totalLength, product) => {
    return totalLength + product.quantity;
  }, 0);

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Catalog</Link>
          </li>
          <li>
            <Link to="/cart">Cart ({cardTotalLength})</Link>
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
