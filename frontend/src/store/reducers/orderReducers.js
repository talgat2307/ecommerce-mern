import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST, ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_USER_FAIL,
  ORDER_LIST_USER_REQUEST,
  ORDER_LIST_USER_SUCCESS,
} from '../constants/orderConstants';

const orderCreateState = {
  loading: false,
  success: false,
  error: null,
  order: null,
};

export const orderCreateReducer = (state = orderCreateState, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, loading: true };
    case ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, order: action.order };
    case ORDER_CREATE_FAIL:
      return { ...state, loading: false, error: action.error };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

const orderDetailsState = {
  loading: true,
  error: null,
  order: null,
};

export const orderDetailsReducer = (state = orderDetailsState, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, order: action.order };
    case ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};


const orderListState = {
  loading: true,
  error: null,
  orders: [],
};

export const orderListReducer = (state = orderListState, action) => {
  switch (action.type) {
    case ORDER_LIST_USER_REQUEST:
      return { ...state, loading: true };
    case ORDER_LIST_USER_SUCCESS:
      return { ...state, loading: false, orders: action.orders };
    case ORDER_LIST_USER_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
