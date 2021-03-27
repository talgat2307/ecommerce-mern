import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';

const productListState = {
  loading: false,
  error: null,
  products: [],
};

export const productListReducer = (state = productListState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: action.products };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

const productDetailsState = {
  loading: false,
  error: null,
  product: {
    reviews: [],
  },
};

export const productDetailsReducer = (state = productDetailsState, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
      case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.product };
    case PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
;