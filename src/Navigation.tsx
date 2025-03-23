import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { State } from './store';

export const Navigation: FC = () => {
  const selectedProducts = useSelector(
    (state: State) => state.products?.selectedProductsIds
  );

  const cardTotalLength = selectedProducts.reduce((totalLength, product) => {
    return totalLength + product.quantity;
  }, 0);

  return (
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
  );
};
