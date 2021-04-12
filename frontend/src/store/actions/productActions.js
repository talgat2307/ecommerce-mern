import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants';
import axiosApi from '../../axiosApi';
import { push } from 'connected-react-router';

const productListRequest = () => ({ type: PRODUCT_LIST_REQUEST });
const productListSuccess = products => ({ type: PRODUCT_LIST_SUCCESS, products });
const productListFail = error => ({ type: PRODUCT_LIST_FAIL, error });

const productDetailsRequest = () => ({ type: PRODUCT_DETAILS_REQUEST });
const productDetailsSuccess = product => ({ type: PRODUCT_DETAILS_SUCCESS, product });
const productDetailsFail = error => ({ type: PRODUCT_DETAILS_FAIL, error });

const productDeleteRequest = () => ({ type: PRODUCT_DELETE_REQUEST });
const productDeleteSuccess = productId => ({ type: PRODUCT_DELETE_SUCCESS, productId });
const productDeleteFail = error => ({ type: PRODUCT_DELETE_FAIL, error });

const productCreateRequest = () => ({ type: PRODUCT_CREATE_REQUEST });
const productCreateSuccess = product => ({ type: PRODUCT_CREATE_SUCCESS, product });
const productCreateFail = error => ({ type: PRODUCT_CREATE_FAIL, error });

const productUpdateRequest = () => ({ type: PRODUCT_UPDATE_REQUEST });
const productUpdateSuccess = product => ({ type: PRODUCT_UPDATE_SUCCESS, product });
const productUpdateFail = error => ({ type: PRODUCT_UPDATE_FAIL, error });

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

export const deleteProduct = (id) => {
  return async dispatch => {
    dispatch(productDeleteRequest());
    try {
      await axiosApi.delete(`/products/${id}`);
      dispatch(productDeleteSuccess(id));
    } catch (e) {
      dispatch(productDeleteFail(e.response && e.response.data.error
        ? e.response.data.error
        : e.message));
    }
  };
};

export const createProduct = (product) => {
  return async dispatch => {
    dispatch(productCreateRequest());
    try {
      const response = await axiosApi.post('/products', product);
      dispatch(productCreateSuccess(response.data));
      dispatch(push('/admin/product-list'));
    } catch (e) {
      dispatch(productCreateFail(e.response && e.response.data.error
        ? e.response.data.error
        : e.message));
    }
  };
};

export const updateProduct = (product, id) => {
  return async dispatch => {
    dispatch(productUpdateRequest());
    try {
      const response = await axiosApi.put(`/products/${id}`, product);
      dispatch(productUpdateSuccess(response.data));
    } catch (e) {
      dispatch(productUpdateFail(e.response && e.response.data.error
        ? e.response.data.error
        : e.message));
    }
  };
};