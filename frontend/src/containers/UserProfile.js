import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import { getProfile, updateProfile } from '../store/actions/userActions';
import Loader from '../components/Loader';
import { USER_UPDATE_PROFILE_RESET } from '../store/constants/userConstants';
import { getUserOrders } from '../store/actions/orderActions';
import {
  Box,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  gridCon: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  paper: {
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
  alert: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  gridTable: {
    marginTop: theme.spacing(2),
  },
  tableCon: {
    marginTop: theme.spacing(4),
    border: '1px solid #b8b8b8',
    borderRadius: '5px',
  },
  table: {
    minWidth: 650,
    border: '1px solid #00000',
  },
}));

const Profile = ({ history }) => {

  const [updateUser, setUpdateUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [updated, setUpdated] = useState(null);

  const dispatch = useDispatch();

  const { loading, error, user } = useSelector(state => state.userProfile);
  const { success } = useSelector(state => state.userUpdateProfile);
  const { orders, loading: loadingOrders, error: errorOrders } = useSelector(state => state.orderList);

  useEffect(() => {
    if (!user || !user.name || success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(getProfile());
    } else {
      setUpdateUser(prevState => {
        return {
          ...prevState,
          name: user.name,
          email: user.email,
        };
      });
    }
  }, [dispatch, history, user, success]);

  useEffect(() => {
    dispatch(getUserOrders('/profile'));
  }, [dispatch]);

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUpdateUser(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (updateUser.password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateProfile(updateUser));
      setMessage(null);
      setUpdated(true);
      setTimeout(() => {
        setUpdated(false);
        setUpdateUser(prevState => ({ ...prevState, password: '' }));
        setConfirmPassword('')}, 3000);
    }
  };

  const classes = useStyles();
  return (
    <Grid container className={classes.gridCon}>
      <Grid item xs={3}>
        <Typography component="h1" variant="h4">
          User Profile
        </Typography>
        <div className={classes.paper}>
          {message && <Alert className={classes.alert} severity={'error'}>{message}</Alert>}
          {error && <Alert className={classes.alert} severity={'error'}>{error.message}</Alert>}
          {updated && <Alert className={classes.alert} severity={'success'}>User Updated</Alert>}
          {loading ? <Loader open={loading}/>
            :
            <form className={classes.form} onSubmit={(e) => formSubmitHandler(e)}>
              <TextField
                value={updateUser.name}
                onChange={inputChangeHandler}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Name"
                name="name"
                autoComplete="name"
              />
              <TextField
                value={updateUser.email}
                onChange={inputChangeHandler}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                value={updateUser.password}
                onChange={inputChangeHandler}
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="New password"
                type="password"
                autoComplete="current-password"
              />
              <TextField
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="Confirm new password"
                type="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Update
              </Button>
            </form>
          }
        </div>
      </Grid>
      <Grid item xs={8}>
        <Typography component="h1" variant="h4">
          My Orders
        </Typography>
        {loadingOrders ? <Loader open={loadingOrders}/> : errorOrders ? <Alert severity={'error'}>{errorOrders}</Alert>
          :
          <>
            <TableContainer component={Box} className={classes.tableCon}>
              {orders && orders.length === 0 ? <Alert severity={'info'}>No orders</Alert>
                :
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="right">DATE</TableCell>
                      <TableCell align="right">TOTAL</TableCell>
                      <TableCell align="right">PAID</TableCell>
                      <TableCell align="right">DELIVERED</TableCell>
                      <TableCell align="right"/>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders && orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell component="th" scope="row">{order._id}</TableCell>
                        <TableCell align="right">{order.createdAt.substring(0, 10)}</TableCell>
                        <TableCell align="right">${order.totalPrice}</TableCell>
                        <TableCell align="right">
                          {order.isPaid ? order.paidAt.substring(0, 10) : <CloseIcon/>}
                        </TableCell>
                        <TableCell align="right">
                          {order.isDelivered ? order.isDelivered.substring(0, 10) : <CloseIcon/>}
                        </TableCell>
                        <TableCell align='right'>
                          <Button
                            variant={'outlined'} component={Link}
                            to={`/order/${order._id}`}
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>}
            </TableContainer>
          </>}
      </Grid>
    </Grid>
  );
};

export default Profile;