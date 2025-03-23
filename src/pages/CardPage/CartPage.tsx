import { Typography, Grid, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { CardProduct } from '../../store/products/types';
import { CardItem } from './CardItem';

const CartPage = () => {
  const { selectedProductsIds: selectedProducts } = useSelector(
    (state: any) => state.products
  );

  const calculateTotalPrice = () => {
    return selectedProducts.reduce((total: number, product: CardProduct) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {!selectedProducts.length && <Typography>No items in cart</Typography>}
      {selectedProducts.length && (
        <Grid container spacing={2}>
          {selectedProducts.map((product: CardProduct) => (
            <CardItem product={product} />
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
