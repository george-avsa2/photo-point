import { FC } from 'react';
import { Button, Typography, Grid, Box, IconButton } from '@mui/material';
import { CardProduct } from '../../store/products/types';
import { Add, Remove } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { changeQuantity, removeFromSelected } from '../../store/products';

interface ICardItemProps {
  product: CardProduct;
}

export const CardItem: FC<ICardItemProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity) {
      dispatch(changeQuantity({ id, quantity }));
    } else {
      dispatch(removeFromSelected(id));
    }
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromSelected(id));
  };

  return (
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
  );
};
