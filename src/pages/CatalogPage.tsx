import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, State } from '../store';
import { useEffect } from 'react';
import { fetchProducts } from '../api/fetchProducts';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Button,
} from '@mui/material';

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
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return <p>{error}</p>;
  }

  const handleAddToCart = (productId: number) => {
    console.log(productId);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Product Catalog
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(product.id)}
                  sx={{ marginTop: '10px' }}
                >
                  Add to Cart (ID: {product.id})
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CatalogPage;
