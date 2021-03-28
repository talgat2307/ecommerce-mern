import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM, CART_RESET_ITEMS, CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';
import { USER_LOGOUT } from '../constants/userConstants';

const initialState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: {},
};

export const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const data = action.productItem;
      const qty = action.qty;
      const product = {
        id: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      };

      const existItem = state.cartItems.find(item => item.id === product.id);

      if (existItem) {
        return { ...state, cartItems: state.cartItems.map(item => (item.id === existItem.id ? product : item))};
      } else {
        return { ...state, cartItems: [...state.cartItems, product]};
      }
    case CART_REMOVE_ITEM:
      return { ...state, cartItems: state.cartItems.filter(item => item.id !== action.id) };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.data };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.data };
    case CART_RESET_ITEMS:
      return { ...state, cartItems: [] };
    case USER_LOGOUT:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};
