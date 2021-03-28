import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  FormControl,
  Grid,
  List,
  ListItem, MenuItem, Select,
  Typography,
} from '@material-ui/core';
import Ratings from '../components/Ratings';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { getProductDetails } from '../store/actions/productActions';

const useStyles = makeStyles((theme) => ({
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit',
    },
  },
  gridCon: {
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'space-between',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    margin: theme.spacing(0, 3),
  },
  li: {
    borderBottom: '1px solid #e9ecef',
    marginBottom: '10px',
    padding: theme.spacing(1, 0)
  },
  cartBox: {
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    marginBottom: '25px',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '60px',
    textAlign: 'center',
  },
  select: {
    display: 'flex',
    justifyContent: 'center',
  },
  media: {
    borderRadius: '7px',
  },
}));

const ProductDetails = ({ match, history }) => {

  const [qty, setQty] = useState(1);
  const productId = match.params.id;

  const dispatch = useDispatch();
  const { loading, product } = useSelector(state => state.productDetails);

  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  const classes = useStyles();
  return (
    <>
      <Button variant='outlined' component={Link} to={'/'}>
        Go Back
      </Button>
      {loading ?
        <Loader open={loading}/>
        :
        <Grid container className={classes.gridCon}>
          <Grid item md={5}>
            <Box>
              <img className={classes.media} src={product.image} alt={product.name} width={'100%'}/>
            </Box>
          </Grid>
          <Grid item md={4}>
            <List className={classes.list}>
              <ListItem className={classes.li}>
                <Typography variant={'h4'}>{product.name}</Typography>
              </ListItem>
              <ListItem className={classes.li}>
                <Ratings value={product.rating} text={`${product.numReviews} reviews`}/>
              </ListItem>
              <ListItem className={classes.li}>
                <Typography variant={'body1'}>Price: ${product.price}</Typography>
              </ListItem>
              <ListItem className={classes.li}>
                <Typography variant={'body1'}>{product.description}</Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={3} lg={2}>
            <List>
              <Box className={classes.cartBox}>
                <ListItem className={classes.listItem}>
                  <Typography variant={'h6'}>Price:</Typography>
                  <Typography>${product.price}</Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Typography variant={'h6'}>Status:</Typography>
                  <Typography>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Typography>
                </ListItem>
                {product.countInStock > 0 && (
                  <ListItem className={classes.listItem}>
                    <Typography variant={'h6'}>Quantity:</Typography>
                    <FormControl className={classes.formControl}>
                      <Select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map(x => (
                          <MenuItem className={classes.select} key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </ListItem>
                )}
              </Box>
              <ListItem className={classes.listItem}>
                <Button
                  disabled={product.countInStock === 0}
                  variant={'contained'}
                  fullWidth={true}
                  onClick={addToCartHandler}
                  color={'primary'}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      }
    </>
  );
};

export default ProductDetails;