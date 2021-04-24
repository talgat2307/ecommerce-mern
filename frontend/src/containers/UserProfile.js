import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { getProfile, updateProfile } from '../store/actions/userActions';
import Loader from '../components/Loader';
import { USER_UPDATE_PROFILE_RESET } from '../store/constants/userConstants';
import { getUserOrders } from '../store/actions/orderActions';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';

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
  const { orders, loading: loadingOrders, error: errorOrders } = useSelector(state => state.orderListUser);

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
    dispatch(getUserOrders());
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
        setConfirmPassword('');
      }, 3000);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'date', headerName: 'DATE', width: 130 },
    { field: 'total', headerName: 'TOTAL', width: 130 },
    { field: 'paid', headerName: 'PAID', width: 130 },
    { field: 'delivered', headerName: 'DELIVERED', width: 130 },
    {
      field: 'details',
      headerName: 'DETAILS',
      width: 130,
      renderCell: (params) => (
        <>
          <Button
            variant={'outlined'} component={Link}
            to={`/order/${params.row.orderId}`}
          >
            Details
          </Button>
        </>
      ),
    },
  ];

  const rows = orders.map((order, i) => ({
    id: i + 1,
    orderId: order._id,
    date: order.createdAt.substring(0, 10),
    total: '$' + order.totalPrice,
    paid: order.isPaid ? order.paidAt.substring(0, 10) : 'X',
    delivered: order.isDelivered ? order.deliveredAt.substring(0, 10) : 'X',
  }));

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
        {loadingOrders ? <Loader open={loadingOrders}/>
          :
          errorOrders ? <Alert severity={'error'}>{errorOrders}</Alert>
            :
            (orders && orders.length === 0) ? <Alert className={classes.alert} severity={'info'}>No orders added
                yet</Alert>
              :
              <>
                <DataGrid
                  className={classes.tableCon}
                  pageSize={8}
                  autoHeight
                  rows={rows}
                  columns={columns.map(column => ({
                    ...column,
                    disableClickEventBubbling: true,
                  }))}
                />
              </>}
      </Grid>
    </Grid>
  );
};

export default Profile;