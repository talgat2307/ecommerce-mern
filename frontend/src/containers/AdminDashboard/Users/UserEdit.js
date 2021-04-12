import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
import {
  getUserDetails,
  updateUser,
} from '../../../store/actions/userActions';
import Loader from '../../../components/Loader';
import { USER_UPDATE_RESET } from '../../../store/constants/userConstants';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '70%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    fontSize: theme.spacing(2),
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: '#2196f3',
    },
  },
  alert: {
    width: '94%',
    marginTop: theme.spacing(2),
  },
}));

const UserEdit = ({ match }) => {

  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    email: '',
    role: '',
  });

  const userId = match.params.id;

  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.userDetails);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector(state => state.userUpdate);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setUpdatedUser(prevState => {
          return {
            ...prevState,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        });
      }
    }
  }, [dispatch, userId, user, successUpdate]);

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUpdatedUser(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(updatedUser, userId));
    dispatch(getUserDetails(userId));
  };

  const classes = useStyles();
  return (
    <Container>
      <Typography variant="h5">
        Edit User
      </Typography>
      {errorUpdate && <Alert className={classes.alert} severity={'error'}>{errorUpdate}</Alert>}
      {loading || loadingUpdate ? <Loader open={loading || loadingUpdate}/>
        :
        <form className={classes.form} onSubmit={(e) => formSubmitHandler(e)}>
          <TextField
            value={updatedUser.name}
            onChange={inputChangeHandler}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            value={updatedUser.email}
            onChange={inputChangeHandler}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            value={updatedUser.role}
            onChange={inputChangeHandler}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="role"
            label="Role"
            name="role"
            autoComplete="role"
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
    </Container>
  );
};

export default UserEdit;