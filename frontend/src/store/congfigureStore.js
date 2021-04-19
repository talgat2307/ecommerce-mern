import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import {
  userDetailsReducer, userListReducer,
  userLoginReducer, userProfileReducer,
  userRegisterReducer,
  userUpdateProfileReducer, userUpdateReducer,
} from './reducers/userReducers';
import {
  productCreateReducer,
  productDetailsReducer,
  productListReducer, productReviewReducer,
  productUpdateReducer,
} from './reducers/productReducers';
import { cartReducers } from './reducers/cartReducers';
import {
  orderCreateReducer, orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderListUserReducer,
} from './reducers/orderReducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReview: productReviewReducer,
  cart: cartReducers,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderListUser: orderListUserReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
  router: connectRouter(history),
});

const userInfoFromStorage = localStorage.getItem('userInfo') ?
  JSON.parse(localStorage.getItem('userInfo')) : null;
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
  JSON.parse(localStorage.getItem('cartItems')) : [];
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
  JSON.parse(localStorage.getItem('shippingAddress')) : {};

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
};

const middleware = [
  thunkMiddleware,
  routerMiddleware(history),
];

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware)),
);

export default store;



