import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../store/actions/cartActions';
import {
  Box,
  FormControlLabel,
  FormLabel,
  Radio, RadioGroup,
} from '@material-ui/core';
import CheckoutSteps from './CheckoutSteps';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  box: {
    display: 'flex',
    justifyContent: 'center'
  },
  select: {
    marginBottom: '10px'
  }
}));

const Payment = ({ history }) => {

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const formSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    history.push('/place-order');
  };


  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <Box className={classes.box}>
        <CheckoutSteps signIn shipping payment/>
      </Box>
      <Typography className={classes.title} component="h1" variant="h4">
        Payment
      </Typography>
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={(e) => formSubmitHandler(e)}>
          <FormLabel component="legend" className={classes.select}>Select Method</FormLabel>
          <RadioGroup
            name="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel
              name='paymentMethod'
              value='Credit Card'
              control={<Radio />}
              label="Credit Card"
            />
            <FormControlLabel
              name='paymentMethod'
              value='Elsom'
              control={<Radio />}
              label="Elsom"
            />
            <FormControlLabel
              name='paymentMethod'
              value='Cash'
              control={<Radio />}
              label="Cash"
            />
          </RadioGroup>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Continue
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Payment;