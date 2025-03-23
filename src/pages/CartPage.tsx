import { Button, Typography, Grid, Box, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { Product } from '../store/products/types';

const CartPage = () => {
  const { products } = useSelector((state: any) => state.products);
  const { selectedProductsIds } = useSelector((state: any) => state.products);

  const selectedProducts = products.filter((product: Product) =>
    selectedProductsIds.includes(product.id)
  );

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {selectedProducts.length === 0 ? (
        <Typography>No items in cart</Typography>
      ) : (
        <Grid container spacing={2}>
          {selectedProducts.map((product: Product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Box
                sx={{
                  border: '1px solid #ddd',
                  padding: '15px',
                  borderRadius: '8px',
                }}
              >
                <Typography variant="h6">{product.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  ${product.price}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '10px',
                  }}
                >
                  <IconButton
                    onClick={() =>
                      handleQuantityChange(product.id, product.quantity - 1)
                    }
                    color="primary"
                    size="small"
                  >
                    <Remove />
                  </IconButton>
                  <Typography variant="body1" sx={{ margin: '0 10px' }}>
                    {product.quantity}
                  </Typography>
                  <IconButton
                    onClick={() =>
                      handleQuantityChange(product.id, product.quantity + 1)
                    }
                    color="primary"
                    size="small"
                  >
                    <Add />
                  </IconButton>
                </Box>
                <Box sx={{ marginTop: '10px' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    Remove from Cart
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
      <Box sx={{ marginTop: '20px' }}>
        <Typography variant="h6">
          Total Price: ${calculateTotalPrice().toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default CartPage;
