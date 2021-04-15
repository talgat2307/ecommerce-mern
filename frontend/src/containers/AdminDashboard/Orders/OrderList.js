import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import Loader from '../../../components/Loader';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { getOrderList } from '../../../store/actions/orderActions';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
  tableCon: {
    marginTop: theme.spacing(4),
  },
  table: {
    minWidth: 650,
    border: '1px solid #00000',
  },
  alert: {
    marginTop: theme.spacing(2),
  },
}));

const OrderList = () => {

  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector(state => state.orderList);

  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'user', headerName: 'USER', width: 130 },
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
    user: order.user.name,
    date: order.createdAt.substring(0, 10),
    total: '$' + order.totalPrice,
    paid: order.isPaid ? order.paidAt.substring(0, 10) : 'X',
    delivered: order.isDelivered ? order.deliveredAt.substring(0, 10) : 'X',
  }));

  const classes = useStyles();
  return (
    <Container>
      <Typography variant="h5">
        Order list
      </Typography>
      {loading ? <Loader open={loading}/> :
        error ? <Alert className={classes.alert} severity={'error'}>{error.error}</Alert> :
          (orders && orders.length === 0) ?
            <Alert className={classes.alert} severity={'info'}>No orders added yet</Alert>
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
    </Container>
  );
};

export default OrderList;