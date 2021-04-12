import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/actions/cartActions';
import { FormControl, Grid, List, ListItem, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import { imageUrl } from '../constants';

const useStyles = makeStyles((theme) => ({
  mainGridCon: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  alert: {
    marginTop: theme.spacing(4),
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    marginBottom: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid #e9ecef',
  },
  img: {
    borderRadius: 5,
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  formControl: {
    width: '60px',
  },
  checkoutBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  subtotal: {
    marginBottom: theme.spacing(2),
  },
  checkoutBtn: {
    marginTop: theme.spacing(2),
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: '#054fda',
    },
  },
  backBtn: {
    marginTop: theme.spacing(4),
  },
}));

const Cart = ({ match, location, history }) => {

  const productId = match.params.id;
  const queryString = location.search;

  const params = new URLSearchParams(queryString);
  const qty = parseInt(params.get('qty'));

  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  const classes = useStyles();
  return (
    <Grid container className={classes.mainGridCon}>
      <Grid item md={7}>
        <Typography variant={'h4'}>Shopping Cart</Typography>
        {cartItems.length === 0 ?
          <>
            <Alert className={classes.alert} severity={'info'}>Your cart is empty</Alert>
            <Button
              className={classes.backBtn}
              variant="outlined"
              color={'primary'}
              component={Link}
              to={'/'}
            >
              Go Back
            </Button>
          </>
          :
          <>
            <List className={classes.list}>
              {cartItems.map(product => (
                <ListItem key={product.id} className={classes.listItem}>
                  <Grid container>
                    <Grid item md={2} className={classes.gridItem}>
                      <img className={classes.img}
                           src={product.image.includes('image') ? product.image : imageUrl + product.image}
                           alt={product.name} width={80}/>
                    </Grid>
                    <Grid item md={3} className={classes.gridItem}>
                      <Typography variant={'body1'}>
                        <Link className={classes.link} to={`/product/${product.id}`}>{product.name}</Link>
                      </Typography>
                    </Grid>
                    <Grid item md={2} className={classes.gridItem}>
                      <Typography>
                        ${product.price}
                      </Typography>
                    </Grid>
                    <Grid item md={2} className={classes.gridItem}>
                      <FormControl className={classes.formControl}>
                        <Select
                          value={product.qty}
                          onChange={(e) => dispatch(addToCart(product.id, e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map(x => (
                            <MenuItem
                              key={x + 1}
                              value={x + 1}
                            >
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item md={2}>
                      <Button
                        color={'secondary'}
                        onClick={() => removeFromCartHandler(product.id)}>
                        <DeleteIcon/>
                      </Button>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </>
        }
      </Grid>
      <Grid item md={3}>
        <Paper elevation={0} variant={'outlined'}>
          <List>
            <ListItem className={classes.checkoutBox}>
              <Typography variant={'h5'} className={classes.subtotal}>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </Typography>
              <Typography variant={'h6'}>
                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </Typography>
            </ListItem>
            <ListItem className={classes.checkoutBtn}>
              <Button
                fullWidth={true}
                variant={'contained'}
                color={'primary'}
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                <Typography variant={'subtitle2'}>Proceed to checkout</Typography>
              </Button>
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Cart;