import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../store/actions/cartActions';
import CheckoutSteps from './CheckoutSteps';
import { Box } from '@material-ui/core';

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
  }
}));

const Shipping = ({ history }) => {

  const dispatch = useDispatch();
  const { shippingAddress } = useSelector(state => state.cart);

  const [shippingData, setShippingData] = useState({
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
  });

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setShippingData(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(shippingData));
    history.push('/payment');
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <Box className={classes.box}>
        <CheckoutSteps signIn shipping/>
      </Box>
      <Typography className={classes.title} component="h1" variant="h4">
        Shipping
      </Typography>
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={(e) => formSubmitHandler(e)}>
          <TextField
            onChange={inputChangeHandler}
            value={shippingData.address}
            variant="outlined"
            margin="normal"
            fullWidth
            required
            label="Address"
            name="address"
            autoComplete="address"
            autoFocus
          />
          <TextField
            onChange={inputChangeHandler}
            value={shippingData.city}
            variant="outlined"
            margin="normal"
            fullWidth
            required
            label="City"
            name="city"
            autoComplete="city"
          />
          <TextField
            onChange={inputChangeHandler}
            value={shippingData.postalCode}
            variant="outlined"
            margin="normal"
            fullWidth
            required
            name="postalCode"
            label="Postal Code"
            autoComplete="postalCode"
          />
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

export default Shipping;