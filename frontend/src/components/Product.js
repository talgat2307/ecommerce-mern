import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from '@material-ui/core';
import Ratings from './Ratings';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
    paddingBottom: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;',
    borderRadius: '8px',
    '&:hover': {
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;'
    }
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  media: {
    paddingBottom: theme.spacing(2),
    height: '230px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  name: {
    cursor: 'pointer',
    flexGrow: 1,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: '#054fda',
    },
  },
}));

const Product = ({ product, onClick }) => {

  const classes = useStyles();
  return (
    <>
      <Card
        className={classes.card}
        elevation={0}
      >
        <CardContent className={classes.cardContent}>
          <CardMedia
            component="img"
            onClick={onClick}
            className={classes.media}
            image={product.image}
          />
          <Typography className={classes.name} variant='subtitle1' component="h2">
            <Link className={classes.link} to={`/product/${product._id}`}>
              {product.name}
            </Link>
          </Typography>
          <Typography className={classes.rating} variant='subtitle1' component="h2">
            <Ratings value={product.rating} text={`${product.numReviews} reviews`}/>
          </Typography>
          <Typography className={classes.price} variant='h5' component='h2'>
            ${product.price}
          </Typography>
        </CardContent>
        <CardActions>
          {product.countInStock === 0 ?
            <Button disabled variant={'outlined'}>Out of stock</Button>
            :
            <Button component={Link} to={`/cart/${product._id}?qty=${1}`} variant={'outlined'}>
              <AddShoppingCartIcon/>
            </Button>
          }
        </CardActions>
      </Card>
    </>
  );
};

export default Product;