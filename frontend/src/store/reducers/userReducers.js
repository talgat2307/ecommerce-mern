import {
  USER_DELETE_FAIL,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS,
} from '../constants/userConstants';

const userLoginState = {
  loading: false,
  error: null,
  userInfo: {},
};

export const userLoginReducer = (state = userLoginState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.user };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.error };
    case USER_LOGOUT:
      return { ...state, userInfo: null, error: null };
    default:
      return state;
  }
};

const userRegisterState = {
  loading: false,
  error: null,
};

export const userRegisterReducer = (state = userRegisterState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false };
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

const userProfileState = {
  loading: false,
  error: null,
  user: {},
};

export const userProfileReducer = (state = userProfileState, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { ...state, loading: true };
    case USER_PROFILE_SUCCESS:
      return { ...state, loading: false, user: action.user };
    case USER_PROFILE_FAIL:
      return { ...state, error: action.error };
    default:
      return state;
  }
}



const userUpdateProfileState = {
  loading: false,
  error: null,
  success: false,
  userInfo: {},
};

export const userUpdateProfileReducer = (state = userUpdateProfileState, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, success: true, userInfo: action.updatedUser };
    case USER_UPDATE_PROFILE_FAIL:
      return { ...state, loading: false, error: action.error };
    case USER_UPDATE_PROFILE_RESET:
      return { ...state, success: false, userInfo: {} };
    default:
      return state;
  }
};

const userListState = {
  loading: false,
  error: null,
  deleteError: null,
  success: false,
  users: [],
};

export const userListReducer = (state = userListState, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { ...state, loading: true };
    case USER_LIST_SUCCESS:
      return { ...state, loading: false, users: action.users };
    case USER_LIST_FAIL:
      return { ...state, loading: false, error: action.error };
    case USER_DELETE_SUCCESS:
      return { ...state, users: state.users.filter(user => user._id !== action.user) };
    case USER_DELETE_FAIL:
      return { ...state, deleteError: action.error };
    default:
      return state;
  }
};

const userDetailsState = {
  loading: false,
  error: null,
  user: {},
};

export const userDetailsReducer = (state = userDetailsState, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, user: action.user };
    case USER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.error };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

const userUpdateState = {
  loading: false,
  error: null,
  success: false,
  user: {},
};

export const userUpdateReducer = (state = userUpdateState, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true, user: action.updatedUser };
    case USER_UPDATE_FAIL:
      return { ...state, loading: false, error: action.error };
    case USER_UPDATE_RESET:
      return { user: {} };
    default:
      return state;
  }
};





