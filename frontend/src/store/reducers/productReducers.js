import {
  PRODUCT_ADD_REVIEW_FAIL,
  PRODUCT_ADD_REVIEW_REQUEST,
  PRODUCT_ADD_REVIEW_RESET,
  PRODUCT_ADD_REVIEW_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS, RATED_PRODUCT_FAIL,
  RATED_PRODUCT_REQUEST, RATED_PRODUCT_SUCCESS,
  REVIEW_DELETE_SUCCESS,
} from '../constants/productConstants';

const productListState = {
  loading: false,
  error: null,
  products: [],
  ratedProducts: [],
  pages: '',
  page: ''
};

export const productListReducer = (state = productListState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.productData.products,
        pages: action.productData.pages,
        page: action.productData.page
      };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.error };
    case RATED_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case RATED_PRODUCT_SUCCESS:
      return { ...state, loading: false, ratedProducts: action.products };
    case RATED_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.error };
    case PRODUCT_DELETE_SUCCESS:
      return { ...state, products: state.products.filter(product => product._id !== action.productId) };
    case PRODUCT_DELETE_FAIL:
      return { ...state, deleteError: action.error };
    default:
      return state;
  }
};

const productDetailsState = {
  loading: false,
  success: false,
  error: null,
  product: {
    reviews: [],
  },
};

export const productDetailsReducer = (state = productDetailsState, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true, success: false };
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.product };
    case PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.error };
    case REVIEW_DELETE_SUCCESS:
      return { ...state, success: true };
    default:
      return state;
  }
};

const productCreateState = {
  loading: false,
  error: null,
  product: {},
};

export const productCreateReducer = (state = productCreateState, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { ...state, loading: false, product: action.product };
    case PRODUCT_CREATE_FAIL:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

const productUpdateState = {
  loading: false,
  error: null,
  success: false,
};

export const productUpdateReducer = (state = productUpdateState, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true };
    case PRODUCT_UPDATE_FAIL:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

const productReviewState = {
  loading: false,
  error: null,
  success: false,
};

export const productReviewReducer = (state = productReviewState, action) => {
  switch (action.type) {
    case PRODUCT_ADD_REVIEW_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_ADD_REVIEW_SUCCESS:
      return { ...state, loading: false, success: true };
    case PRODUCT_ADD_REVIEW_FAIL:
      return { ...state, loading: false, error: action.error };
    case PRODUCT_ADD_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};