import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from '../store/actions/productActions';
import Loader from '../components/Loader';
import Product from '../components/Product';

const useStyles = makeStyles((theme) => ({
  gridCon: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  gridItem: {
    display: 'flex',
    width: '20%',
  },
}));

const Products = ({ history }) => {

  const dispatch = useDispatch();
  const { loading, products} = useSelector(state => state.productList);

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  const clickHandler = (id) => {
    history.push(`product/${id}`);
  };

  const classes = useStyles();
  return (
    <>
      <Typography variant='h4'>
        Latest Products
      </Typography>
      {loading ?
        <Loader open={loading}/>
        :
        <Grid container className={classes.gridCon}>
          {products.map(product => {
            return (
              <Grid
                key={product._id}
                item xs={12} sm={6} md={4} lg={3}
                className={classes.gridItem}>
                <Product
                  onClick={() => clickHandler(product._id)}
                  onClickName={() => clickHandler(product._id)}
                  product={product}/>
              </Grid>
            );
          })}
        </Grid>
      }
    </>
  );
};

export default Products;