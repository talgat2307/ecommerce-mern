import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS,
  ORDER_LIST_USER_FAIL,
  ORDER_LIST_USER_REQUEST,
  ORDER_LIST_USER_SUCCESS,
} from '../constants/orderConstants';
import axiosApi from '../../axiosApi';

const orderListUserRequest = () => ({ type: ORDER_LIST_USER_REQUEST });
const orderListUserSuccess = orders => ({ type: ORDER_LIST_USER_SUCCESS, orders });
const orderListUserFail = error => ({ type: ORDER_LIST_USER_FAIL, error });

const orderListRequest = () => ({ type: ORDER_LIST_REQUEST });
const orderListSuccess = orders => ({ type: ORDER_LIST_SUCCESS, orders });
const orderListFail = error => ({ type: ORDER_LIST_FAIL, error });

const orderCreateRequest = () => ({ type: ORDER_CREATE_REQUEST });
const orderCreateSuccess = order => ({ type: ORDER_CREATE_SUCCESS, order });
const orderCreateFail = error => ({ type: ORDER_CREATE_FAIL, error });

const orderDetailsRequest = () => ({ type: ORDER_DETAILS_REQUEST });
const orderDetailsSuccess = order => ({ type: ORDER_DETAILS_SUCCESS, order });
const orderDetailsFail = error => ({ type: ORDER_DETAILS_FAIL, error });

const orderDeliverRequest = () => ({ type: ORDER_DELIVER_REQUEST });
const orderDeliverSuccess = order => ({ type: ORDER_DELIVER_SUCCESS, order });
const orderDeliverFail = error => ({ type: ORDER_DETAILS_FAIL, error });

export const getUserOrders = () => {
  return async dispatch => {

    dispatch(orderListUserRequest());
    try {
      const response = await axiosApi(`/orders`);
      dispatch(orderListUserSuccess(response.data));
    } catch (e) {
      dispatch(orderListUserFail(e.response && e.response.data
        ? e.response.data
        : e.message));
    }
  };
};

export const getOrderList = () => {
  return async dispatch => {
    dispatch(orderListRequest());
    try {
      const response = await axiosApi('/orders/list');
      dispatch(orderListSuccess(response.data));
    } catch (e) {
      dispatch(orderListFail(e.response && e.response.data
        ? e.response.data
        : e.message));
    }
  };
};

export const createOrder = (order) => {
  return async dispatch => {
    dispatch(orderCreateRequest());
    try {
      const response = await axiosApi.post('/orders', order);
      dispatch(orderCreateSuccess(response.data));
    } catch (e) {
      dispatch(orderCreateFail(e.response && e.response.data
        ? e.response.data
        : e.message));
    }
  };
};

export const getOrderDetails = (id) => {
  return async dispatch => {

    dispatch(orderDetailsRequest());
    try {
      const response = await axiosApi(`/orders/${id}`);
      dispatch(orderDetailsSuccess(response.data));
    } catch (e) {
      dispatch(orderDetailsFail(e.response && e.response.data
        ? e.response.data
        : e.message));
    }
  };
};

export const deliverOrder = (orderId) => {
  return async dispatch => {
    dispatch(orderDeliverRequest());
    try {
      const response = await axiosApi.put(`orders/${orderId}/delivered`);
      dispatch(orderDeliverSuccess(response.data));
    } catch (e) {
      dispatch(orderDeliverFail(e.response && e.response.data
        ? e.response.data
        : e.message));
    }
  };
};







