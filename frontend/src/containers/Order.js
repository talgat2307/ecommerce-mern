import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {
  Box, Button,
  Card, Divider,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { deliverOrder, getOrderDetails } from '../store/actions/orderActions';
import { ORDER_DELIVER_RESET } from '../store/constants/orderConstants';

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
    padding: theme.spacing(2, 0, 2, 0),
  },
  title: {
    marginBottom: '10px',
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
  payBtn: {
    marginTop: theme.spacing(3),
  },
}));

const Order = ({ match }) => {

  const dispatch = useDispatch();
  const orderId = match.params.id;

  const { userInfo } = useSelector(state => state.userLogin);
  const { order, loading, error } = useSelector(state => state.orderDetails);
  const { success } = useSelector(state => state.orderDeliver);

  if (order) {
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  }

  useEffect(() => {
    if (success) {
      dispatch({ type: ORDER_DELIVER_RESET });
    } else {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, success]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  const classes = useStyles();
  return (
    <>
      {loading ? <Loader open={loading}/> : error ? <Alert severity={'error'}>{error.error}</Alert> :
        <>
          <Typography variant="h4">Order {order._id}</Typography>
          <Grid container className={classes.gridCon}>
            <Grid item md={7}>
              <List>
                <ListItem className={classes.listItem}>
                  <Typography className={classes.title} variant="h5">Shipping</Typography>
                  <Typography variant="subtitle1">
                    <strong>Name: </strong> {order.user.name}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                  </Typography>
                  <Typography variant="body1">
                    <strong>Address: </strong>
                    {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                    {order.shippingAddress.postalCode},{' '} {order.shippingAddress.country}
                  </Typography>
                </ListItem>
                <Box mb={2}>
                  {order.isDelivered ? <Alert severity={'success'}>Delivered on {order.deliveredAt}</Alert> :
                    <Alert severity={'info'}>Not delivered</Alert>}
                </Box>
                <Divider variant="fullWidth" component="li"/>
                <ListItem className={classes.listItem}>
                  <Typography className={classes.title} variant="h5">Payment</Typography>
                  <Typography>
                    <strong>Method: </strong>{order.paymentMethod}
                  </Typography>
                </ListItem>
                <Box mb={2}>
                  {order.isPaid ? <Alert severity={'success'}>Paid on {order.paidAt}</Alert> :
                    <Alert severity={'info'}>Not Paid</Alert>}
                </Box>
                <Divider variant="fullWidth" component="li"/>
                <ListItem className={classes.listItem}>
                  <Typography className={classes.title} variant="h5">Order Items</Typography>
                  <List className={classes.orderList}>
                    {order.orderItems.map((item, index) => (
                      <ListItem key={index} className={classes.orderListItems}>
                        <div>
                          <img
                            className={classes.img}
                            src={item.image}
                            alt={item.name} width={50}/>
                        </div>
                        <div>
                          <Typography
                            component={Link}
                            to={`/product/${item.product}`}
                            className={classes.link}
                          >
                            {item.name}
                          </Typography>
                        </div>
                        <div>
                          <Typography>
                            {item.qty} * ${item.price} = ${item.qty * item.price}
                          </Typography>
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
                    <Typography>${order.itemsPrice.toFixed(2)}</Typography>
                  </ListItem>
                  <ListItem className={classes.summaryLists}>
                    <Typography>Shipping</Typography>
                    <Typography>${order.shippingPrice.toFixed(2)}</Typography>
                  </ListItem>
                  <ListItem className={classes.summaryLists}>
                    <Typography>Total</Typography>
                    <Typography>${order.totalPrice.toFixed(2)}</Typography>
                  </ListItem>
                  {userInfo && userInfo.role === 'admin' &&
                  <ListItem>
                    <Button
                      variant={'contained'}
                      color={'primary'}
                      onClick={deliverHandler}
                      fullWidth
                      disabled={order.isDelivered}
                    >
                      Mark as Delivered and Paid
                    </Button>
                  </ListItem>}
                </List>
              </Card>
            </Grid>
          </Grid>
        </>}
    </>
  );
};

export default Order;