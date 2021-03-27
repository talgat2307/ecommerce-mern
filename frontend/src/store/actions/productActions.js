import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';
import axiosApi from '../../axiosApi';

const productListRequest = () => ({ type: PRODUCT_LIST_REQUEST });
const productListSuccess = products => ({ type: PRODUCT_LIST_SUCCESS, products, });
const productListFail = error => ({ type: PRODUCT_LIST_FAIL, error });

const productDetailsRequest = () => ({ type: PRODUCT_DETAILS_REQUEST });
const productDetailsSuccess = product => ({ type: PRODUCT_DETAILS_SUCCESS, product, });
const productDetailsFail = error => ({ type: PRODUCT_DETAILS_FAIL, error });



export const getProductList = () => {
  return async dispatch => {
    dispatch(productListRequest());
    try {
      const response = await axiosApi('/products');
      dispatch(productListSuccess(response.data));
    } catch (e) {
      dispatch(productListFail(e.response && e.response.data.error
        ? e.response.data.error
        : e.message));
    }
  };
};

export const getProductDetails = (productId) => {
  return async dispatch => {
    dispatch(productDetailsRequest());
    try {
      const response = await axiosApi(`/products/${productId}`);
      dispatch(productDetailsSuccess(response.data));
    } catch (e) {
      dispatch(productDetailsFail(e.response && e.response.data.error
        ? e.response.data.error
        : e.message));
    }
  };
};
