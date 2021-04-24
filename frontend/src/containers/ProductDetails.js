import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  FormControl,
  Grid, IconButton, InputLabel,
  List,
  ListItem, MenuItem, Select, Snackbar, TextField,
  Typography,
} from '@material-ui/core';
import Ratings from '../components/Ratings';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { addProductReview, deleteReview, getProductDetails } from '../store/actions/productActions';
import { imageUrl } from '../constants';
import { Alert } from '@material-ui/lab';
import { PRODUCT_ADD_REVIEW_RESET } from '../store/constants/productConstants';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit',
    },
  },
  gridCon: {
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'space-between',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    margin: theme.spacing(0, 3),
  },
  li: {
    borderBottom: '1px solid #e9ecef',
    marginBottom: '10px',
    padding: theme.spacing(1, 0),
  },
  cartBox: {
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    marginBottom: '25px',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '60px',
    textAlign: 'center',
  },
  select: {
    display: 'flex',
    justifyContent: 'center',
  },
  media: {
    borderRadius: '7px',
  },
  reviewCon: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
  },
  reviewList: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;',
    borderRadius: '5px',
    position: 'relative'
  },
  reviewListHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  reviewForm: {
    marginTop: theme.spacing(4),
  },
  comment: {
    marginTop: theme.spacing(1),
  },
  alert: {
    margin: theme.spacing(2, 0),
  },
  btn: {
    marginTop: theme.spacing(1),
  },
  selectRating: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  reviewError: {
    marginBottom: theme.spacing(2),
  },
  deleteReview: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
  },
}));

const ProductDetails = ({ match, history }) => {

  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState(false);

  const [review, setReview] = useState({
    rating: '',
    comment: '',
  });

  const productId = match.params.id;

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);
  const { product, loading, success } = useSelector(state => state.productDetails);
  const { success: successReview, error } = useSelector(state => state.productReview);

  useEffect(() => {
    if (successReview) {
      dispatch({ type: PRODUCT_ADD_REVIEW_RESET });
      setReview({
        rating: '',
        comment: '',
      });
    }
    dispatch(getProductDetails(productId));
  }, [dispatch, productId, successReview, success]);

  useEffect(() => {
    dispatch({ type: PRODUCT_ADD_REVIEW_RESET });
  }, [dispatch]);

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  const reviewDeleteHandler = (id, reviewId) => {
    if (userInfo) {
      dispatch(deleteReview(id, reviewId));
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setReview(prevState => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = (e) => {
    e.preventDefault(e);
    dispatch(addProductReview(review, productId));
  };

  let localImages;
  if (product.image) {
    localImages = product.image.includes('image');
  }

  const classes = useStyles();
  return (
    <>
      <Button variant="outlined" component={Link} to={'/'}>
        Go back to Main
      </Button>
      {loading ?
        <Loader open={loading}/>
        :
        <>
          <Grid container className={classes.gridCon}>
            <Grid item md={5}>
              <Box>
                <img className={classes.media}
                     src={localImages === false ? imageUrl + product.image : product.image}
                     alt={product.name}
                     width={'100%'}/>
              </Box>
            </Grid>
            <Grid item md={4}>
              <List className={classes.list}>
                <ListItem className={classes.li}>
                  <Typography variant={'h4'}>{product.name}</Typography>
                </ListItem>
                <ListItem className={classes.li}>
                  <Ratings value={product.rating} text={`${product.numReviews} reviews`}/>
                </ListItem>
                <ListItem className={classes.li}>
                  <Typography variant={'body1'}>Price: ${product.price}</Typography>
                </ListItem>
                <ListItem className={classes.li}>
                  <Typography variant={'body1'}>{product.description}</Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={3} lg={2}>
              <List>
                <Box className={classes.cartBox}>
                  <ListItem className={classes.listItem}>
                    <Typography variant={'h6'}>Price:</Typography>
                    <Typography>${product.price}</Typography>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Typography variant={'h6'}>Status:</Typography>
                    <Typography>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Typography>
                  </ListItem>
                  {product.countInStock > 0 && (
                    <ListItem className={classes.listItem}>
                      <Typography variant={'h6'}>Quantity:</Typography>
                      <FormControl className={classes.formControl}>
                        <Select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map(x => (
                            <MenuItem className={classes.select} key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </ListItem>
                  )}
                </Box>
                <ListItem className={classes.listItem}>
                  <Button
                    disabled={product.countInStock === 0}
                    variant={'contained'}
                    fullWidth={true}
                    onClick={addToCartHandler}
                    color={'primary'}
                  >
                    Add to cart
                  </Button>
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Grid container className={classes.reviewCon}>
            <div>
              <Typography variant={'h5'}>
                Reviews
              </Typography>
              {product.reviews.length === 0 ? <Alert className={classes.alert} severity={'info'}>
                  No review added yet
                </Alert>
                :
                product.reviews.map(review => (
                  <List key={review._id} className={classes.reviewList}>
                    <div className={classes.reviewListHead}>
                      <Typography variant={'h6'}>{review.name}</Typography>
                      <Typography variant={'body2'}>{review.createdAt.substring(0, 10)}</Typography>
                    </div>
                    <Ratings value={review.rating}/>
                    <Typography className={classes.comment} variant={'subtitle1'}>{review.comment}</Typography>
                    {userInfo && userInfo.role === 'user' && userInfo._id === review.user &&
                    <Button
                      onClick={() => reviewDeleteHandler(product._id, review._id)}
                      className={classes.deleteReview}
                      variant={'outlined'}
                      color={'secondary'}
                    >
                      <DeleteIcon/>
                    </Button>}
                    {userInfo && userInfo.role === 'admin' &&
                    <Button
                      onClick={() => reviewDeleteHandler(product._id, review._id)}
                      className={classes.deleteReview}
                      variant={'outlined'}
                      color={'secondary'}
                    >
                      <DeleteIcon/>
                    </Button>}
                  </List>
                ))}
              {error && <Alert className={classes.reviewError} severity={'info'}>{error}</Alert>}
            </div>
            <div className={classes.reviewForm}>
              <Typography variant={'h5'}>
                Write a customer review
              </Typography>
              {!userInfo ? <Alert className={classes.alert} severity={'info'}>
                  <Link to={'/login'}>Sign in</Link> to write a review
                </Alert>
                :
                <form onSubmit={submitFormHandler}>
                  <FormControl variant={'outlined'} className={classes.selectRating}>
                    <InputLabel id="rating-select">Rate</InputLabel>
                    <Select
                      labelId="rating-select"
                      id="rating-select"
                      value={review.rating}
                      name="rating"
                      label="Rate"
                      onChange={inputChangeHandler}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    onChange={inputChangeHandler}
                    value={review.comment}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    rows={5}
                    id="comment"
                    label="Comment"
                    name="comment"
                  />
                  <Button
                    type="submit"
                    variant={'contained'}
                    color={'primary'}
                    className={classes.btn}
                  >
                    Submit
                  </Button>
                </form>}
            </div>
          </Grid>
        </>
      }
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Review has been deleted"
        action={
          <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  );
};

export default ProductDetails;