import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from './CheckoutSteps';
import Grid from '@material-ui/core/Grid';
import {
  Box,
  Card,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { createOrder } from '../store/actions/orderActions';
import { ORDER_CREATE_RESET } from '../store/constants/orderConstants';
import { USER_DETAILS_RESET } from '../store/constants/userConstants';
import { resetCartItems } from '../store/actions/cartActions';
import { imageUrl } from '../constants';

const useStyles = makeStyles((theme) => ({
  gridCon: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1, 0, 1, 0),
    borderBottom: '1px solid #cccccc',
  },
  title: {
    marginBottom: '20px',
  },
  orderList: {
    width: '100%',
    margin: 0,
    padding: 0,
  },
  orderListItems: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '85%',
    marginBottom: '20px',
    paddingBottom: '20px',
  },
  img: {
    borderRadius: 5,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: '#054fda',
    },
  },
  summaryCard: {
    border: '1px solid #cccccc',
    borderRadius: '5px',
    marginTop: theme.spacing(3),
  },
  summaryTitle: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
  },
  summaryLists: {
    display: 'flex',
    padding: theme.spacing(1, 7),
    justifyContent: 'space-between',
  },
  orderBtn: {
    marginTop: theme.spacing(3)
  }
}));

const PlaceOrder = ({ history }) => {

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  if (!cart.shippingAddress.address) {
    history.push('/shipping');
  } else if (!cart.paymentMethod) {
    history.push('/payment');
  }

  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

  const { order, success } = useSelector(state => state.orderCreate);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }

    if (cart.cartItems.length === 0) {
      history.push('/');
    }

    // eslint-disable-next-line
  }, [dispatch, history, success]);

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.totalPrice,
    }));

    setTimeout(() => dispatch(resetCartItems()), 3000);
  };

  const classes = useStyles();
  return (
    <>
      <Box className={classes.box}>
        <CheckoutSteps signIn shipping payment placeOrder/>
      </Box>
      <Grid container className={classes.gridCon}>
        <Grid item md={7}>
          <List>
            <ListItem className={classes.listItem}>
              <Typography className={classes.title} variant='h5'>Shipping</Typography>
              <Typography>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.postalCode}
              </Typography>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Typography className={classes.title} variant='h5'>Payment</Typography>
              <Typography><strong>Method: </strong>{cart.paymentMethod}</Typography>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Typography className={classes.title} variant='h5'>Order Items</Typography>
              <List className={classes.orderList}>
                {cart.cartItems.map((item, index) => (
                  <ListItem key={index} className={classes.orderListItems}>
                    <div>
                      <img
                        className={classes.img}
                        src={item.image.includes('image') ? item.image : imageUrl + item.image}
                        alt={item.name}
                        width={50}
                      />
                    </div>
                    <div>
                      <Typography
                        component={Link}
                        to={`/product/${item.id}`}
                        className={classes.link}
                      >
                        {item.name}
                      </Typography>
                    </div>
                    <div>
                      <Typography>{item.qty} * ${item.price} = ${item.qty * item.price}</Typography>
                    </div>
                  </ListItem>
                ))}
              </List>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={4}>
          <Card elevation={0} className={classes.summaryCard}>
            <List>
              <ListItem className={classes.summaryTitle}>
                <Typography variant={'h5'}>Order Summary</Typography>
              </ListItem>
              <ListItem className={classes.summaryLists}>
                <Typography>Items</Typography>
                <Typography>${cart.itemsPrice.toFixed(2)}</Typography>
              </ListItem>
              <ListItem className={classes.summaryLists}>
                <Typography>Shipping</Typography>
                <Typography>${cart.shippingPrice.toFixed(2)}</Typography>
              </ListItem>
              <ListItem className={classes.summaryLists}>
                <Typography>Total</Typography>
                <Typography>${cart.totalPrice.toFixed(2)}</Typography>
              </ListItem>
              <ListItem className={classes.summaryLists}>
                <Button
                  className={classes.orderBtn}
                  disabled={cart.cartItems === 0}
                  variant={'contained'}
                  elevation={0}
                  color={'primary'}
                  fullWidth={true}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PlaceOrder;