import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Loader from '../../../components/Loader';
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { deleteUser, getUserList } from '../../../store/actions/userActions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { DataGrid } from '@material-ui/data-grid';
import { IconButton, Snackbar, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  tableCon: {
    marginTop: theme.spacing(4),
  },
  table: {
    minWidth: 650,
    border: '1px solid #00000',
  },
}));

const UserList = () => {

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const userList = useSelector(state => state.userList);
  const { loading, error, deleteError, users } = userList;

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const userDeleteHandler = (id) => {
    dispatch(deleteUser(id));
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };


  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: 'name', headerName: 'NAME', width: 200 },
    {
      field: 'email',
      headerName: 'EMAIL',
      width: 200,
      renderCell: (params) => (
        <a href={`mailto:${params.row.email}`}>{params.row.email}</a>
      ),
    },
    { field: 'role', headerName: 'ROLE', width: 140 },
    {
      field: 'CONTROLLERS',
      width: 220,
      renderCell: (params) => (
        <>
          <Button
            color={'primary'}
            component={Link}
            to={`admin/user/${params.row.userId}/edit`}
          >
            <EditIcon/>
          </Button>
          <Button
            color={'secondary'}
            disabled={params.row.role === 'admin'}
            onClick={() => userDeleteHandler(params.row.userId)}
          >
            <DeleteIcon/>
          </Button>
        </>
      ),
    },
  ];

  const rows = users.map((user, i) => ({
    id: i + 1,
    userId: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  }));

  const classes = useStyles();
  return (
    <Container>
      <Typography className={classes.title} variant={'h5'}>User List</Typography>
      {loading ? <Loader open={loading}/> : error || deleteError ?
        <Alert severity={'error'}>{error || deleteError}</Alert> : (
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
      )}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="User has been deleted"
        action={
          <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </Container>
  );
};

export default UserList;