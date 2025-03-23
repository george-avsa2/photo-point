import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, State } from '../../store';
import { useEffect } from 'react';
import { fetchProducts } from '../../api/fetchProducts';
import { Typography, Grid } from '@mui/material';
import { CatalogItem } from './CatalogItem';
import { CatalogLoading } from './CatalogLoading';

const CatalogPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { products, status, error } = useSelector(
    (state: State) => state.products
  );

  useEffect(() => {
    if (!error && !products.length) {
      dispatch(fetchProducts());
    }
  }, [status]);

  if (status === 'loading') {
    return <CatalogLoading />;
  }

  if (status === 'failed') {
    return <p>{error}</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Product Catalog
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <CatalogItem product={product} />
        ))}
      </Grid>
    </div>
  );
};

export default CatalogPage;
