import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getProductList, getTopRatedProducts } from '../store/actions/productActions';
import Loader from '../components/Loader';
import Product from '../components/Product';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  gridCon: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  gridItem: {
    display: 'flex',
    width: '20%',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(8),
  },
}));

const Products = ({ history, match, location }) => {

  const [page, setPage] = useState(1);
  const limit = 8;

  const keyword = match.params.keyword;

  const dispatch = useDispatch();
  const { loading, products, ratedProducts, pages } = useSelector(state => state.productList);

  useEffect(() => {
    dispatch(getProductList(keyword, page, limit));
    dispatch(getTopRatedProducts());
  }, [dispatch, keyword, page]);

  const clickHandler = (id) => {
    history.push(`product/${id}`);
  };

  const pageHandler = (e, value) => {
    setPage(value);
  };

  const searchLocation = location.pathname.includes('/search');
  let topRatedProducts;

  const classes = useStyles();
  if (!searchLocation) {
    topRatedProducts = (
      <>
        <Typography variant="h4">
          Top Rated Products
        </Typography>
        {loading ?
          <Loader open={loading}/>
          : <Grid container className={classes.gridCon}>
            {ratedProducts.map(product => {
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
          </Grid>}
      </>
    );
  }

  return (
    <>
      {topRatedProducts}
      <Typography variant="h4">
        {searchLocation ? 'Search Results' : 'All Products' }
      </Typography>
      {loading ?
        <Loader open={loading}/>
        :
        <>
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
          {pages > 1 && <Pagination
            className={classes.pagination}
            count={pages}
            page={page}
            onChange={pageHandler}
            defaultPage={1}
            showFirstButton
            showLastButton
          />}
        </>}
    </>
  );
};

export default Products;