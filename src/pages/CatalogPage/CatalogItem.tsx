import { FC } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import { Product } from '../../store/products/types';
import { addToSelected } from '../../store/products';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';

interface ICatalogItemProps {
  product: Product;
}

export const CatalogItem: FC<ICatalogItemProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (productId: number) => {
    console.log(productId);
    dispatch(addToSelected(productId));
  };

  return (
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
  );
};
