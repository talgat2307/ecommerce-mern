import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Loader from '../../../components/Loader';
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { DataGrid } from '@material-ui/data-grid';
import {
  deleteProduct, getProductList,
} from '../../../store/actions/productActions';
import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  tableCon: {
    marginTop: theme.spacing(4),
  },
  table: {
    minWidth: 750,
    border: '1px solid #00000',
  },
  alert: {
    marginTop: theme.spacing(2),
  },
}));

const ProductList = () => {

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.productList);

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  const productDeleteHandler = (id) => {
    dispatch(deleteProduct(id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'NAME', width: 270 },
    { field: 'price', headerName: 'PRICE', width: 120 },
    { field: 'category', headerName: 'CATEGORY', width: 120 },
    { field: 'brand', headerName: 'BRAND', width: 120 },
    {
      field: 'CONTROLLERS',
      width: 170,
      renderCell: (params) => (
        <>
          <Button
            color={'primary'}
            component={Link}
            to={`product/${params.row.productId}/edit`}
          >
            <EditIcon/>
          </Button>
          <Button
            color={'secondary'}
            onClick={() => productDeleteHandler(params.row.productId)}
          >
            <DeleteIcon/>
          </Button>
        </>
      ),
    },
  ];

  const rows = products.map((product, i) => ({
    id: i + 1,
    productId: product._id,
    name: product.name,
    price: '$' + product.price,
    category: product.category,
    brand: product.brand,
  }));

  const classes = useStyles();
  return (
    <Container>
      <div className={classes.header}>
        <Typography variant="h5">
          Product List
        </Typography>
        <Button
          component={Link}
          to={'/admin/product-create'}
          variant={'outlined'}
          color={'primary'}
        >
          + Create Product
        </Button>
      </div>
      {loading ? <Loader open={loading}/>
        :
        error ? <Alert className={classes.alert} severity={'error'}>{error.error}</Alert>
          :
          products && products.length === 0 ? <Alert className={classes.alert} severity={'info'}>No products added yet</Alert>
            :
            (
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
        message="Product has been deleted"
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

export default ProductList;