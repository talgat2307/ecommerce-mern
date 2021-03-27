import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5),
  },
}));

const CheckoutSteps = ({ signIn, shipping, payment, placeOrder }) => {

  const classes = useStyles();
  return (
    <Breadcrumbs aria-label="breadcrumb" className={classes.root}>
      {signIn ?
        <Button component={Link} to={'/login'}>
          Sign In
        </Button>
        :
        <Button disabled>Sign In</Button>}
      {shipping ?
        <Button component={Link} to={'/shipping'}>
          Shipping
        </Button>
        :
        <Button disabled>Shipping</Button>}
      {payment ?
        <Button component={Link} to={'/payment'}>
          Payment
        </Button>
        :
        <Button disabled>Payment</Button>}
      {placeOrder ?
        <Button component={Link} to={'/place-order'}>
          Place Order
        </Button>
        :
        <Button disabled>Place order</Button>}
    </Breadcrumbs>
  );
};

export default CheckoutSteps;
