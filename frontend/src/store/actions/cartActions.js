import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM, CART_RESET_ITEMS, CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';
import axiosApi from '../../axiosApi';

const cartAddItem = (productItem, qty) => ({ type: CART_ADD_ITEM, productItem, qty });
const cartRemoveItem = id => ({ type: CART_REMOVE_ITEM, id });
const cartResetItems = () => ({ type: CART_RESET_ITEMS });
const cartSaveShippingAddress = data => ({ type: CART_SAVE_SHIPPING_ADDRESS, data });
const cartSavePaymentMethod = data => ({ type: CART_SAVE_PAYMENT_METHOD, data });

export const addToCart = (id, qty) => {
  return async (dispatch, getState) => {
    const response = await axiosApi(`/products/${id}`);
    dispatch(cartAddItem(response.data, qty));
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  };
};

export const removeFromCart = (id) => {
  return (dispatch, getState) => {
    dispatch(cartRemoveItem(id));
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  };
};


export const resetCartItems = () => {
  return (dispatch, getState) => {
    dispatch(cartResetItems());
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  };
};

export const saveShippingAddress = (data) => {
  return dispatch => {
    dispatch(cartSaveShippingAddress(data));
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };
};

export const savePaymentMethod = (data) => {
  return dispatch => {
    dispatch(cartSavePaymentMethod(data));
    localStorage.setItem('paymentMethod', JSON.stringify(data));
  };
};




