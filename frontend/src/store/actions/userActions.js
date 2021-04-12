import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL,
} from '../constants/userConstants';
import axiosApi from '../../axiosApi';

const userLoginRequest = () => ({ type: USER_LOGIN_REQUEST });
const userLoginSuccess = user => ({ type: USER_LOGIN_SUCCESS, user });
const userLoginFail = error => ({ type: USER_LOGIN_FAIL, error });

const userRegisterRequest = () => ({ type: USER_REGISTER_REQUEST });
const userRegisterSuccess = user => ({ type: USER_REGISTER_SUCCESS, user });
const userRegisterFail = error => ({ type: USER_REGISTER_FAIL, error });

const userProfileRequest = () => ({ type: USER_PROFILE_REQUEST });
const userProfileSuccess = user => ({ type: USER_PROFILE_SUCCESS, user });
const userProfileFail = error => ({ type: USER_PROFILE_FAIL, error });

const userUpdateProfileRequest = () => ({ type: USER_UPDATE_PROFILE_REQUEST });
const userUpdateProfileSuccess = updatedUser => ({ type: USER_UPDATE_PROFILE_SUCCESS, updatedUser });
const userUpdateProfileFail = error => ({ type: USER_UPDATE_PROFILE_FAIL, error });

const userListRequest = () => ({ type: USER_LIST_REQUEST });
const userListSuccess = users => ({ type: USER_LIST_SUCCESS, users });
const userListFail = error => ({ type: USER_LIST_FAIL, error });

const userDeleteRequest = () => ({ type: USER_DELETE_REQUEST });
const userDeleteSuccess = user => ({ type: USER_DELETE_SUCCESS, user });
const userDeleteFail = error => ({ type: USER_DELETE_FAIL, error });

const userDetailsRequest = () => ({ type: USER_DETAILS_REQUEST });
const userDetailsSuccess = user => ({ type: USER_DETAILS_SUCCESS, user });
const userDetailsFail = error => ({ type: USER_DETAILS_FAIL, error });

const userUpdateRequest = () => ({ type: USER_UPDATE_REQUEST });
const userUpdateSuccess = updatedUser => ({ type: USER_UPDATE_SUCCESS, updatedUser });
const userUpdateFail = error => ({ type: USER_UPDATE_FAIL, error });

export const register = (user) => {
  return async dispatch => {
    dispatch(userRegisterRequest());
    try {
      const response = await axiosApi.post('/users', user);
      dispatch(userRegisterSuccess());
      dispatch(userLoginSuccess(response.data));
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    } catch (e) {
      dispatch(userRegisterFail(e.response && e.response.data
        ? e.response.data
        : e.message));
    }
  };
};

export const login = (user) => {
  return async dispatch => {
    dispatch(userLoginRequest());
    try {
      const response = await axiosApi.post('/users/login', user);
      dispatch(userLoginSuccess(response.data));

      localStorage.setItem('userInfo', JSON.stringify(response.data));
    } catch (e) {
      dispatch(userLoginFail(e.response && e.response.data
        ? e.response.data
        : e.message));
    }
  };
};

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
  };
};

export const getProfile = () => {
  return async dispatch => {
    dispatch(userProfileRequest());
    try {
      const response = await axiosApi('/users/profile');
      dispatch(userProfileSuccess(response.data));
    } catch (e) {
      dispatch(userProfileFail(e.response && e.response.data
        ? e.response.data
        : e.message));
    }
  };
};

export const updateProfile = (user) => {
  return async dispatch => {
    dispatch(userUpdateProfileRequest());
    try {
      const response = await axiosApi.put('/users/profile', user);
      dispatch(userUpdateProfileSuccess(response.data));
      dispatch(userLoginSuccess(response.data));

      localStorage.setItem('userInfo', JSON.stringify(response.data));
    } catch (e) {
      dispatch(userUpdateProfileFail(e.response && e.response.data
        ? e.response.data
        : e.message));
    }
  };
};

export const getUserList = () => {
  return async dispatch => {
    dispatch(userListRequest());
    try {
      const response = await axiosApi('/users');
      dispatch(userListSuccess(response.data));
    } catch (e) {
      dispatch(userListFail(e.response && e.response.data
        ? e.response.data
        : e.message));
    }
  };
};

export const deleteUser = (id) => {
  return async dispatch => {
    dispatch(userDeleteRequest());
    try {
      await axiosApi.delete(`/users/${id}`);
      dispatch(userDeleteSuccess(id));
    } catch (e) {
      dispatch(userDeleteFail(e.response && e.response.data
        ? e.response.data
        : e.message));
    }
  };
};

export const getUserDetails = (id) => {
  return async dispatch => {
    dispatch(userDetailsRequest());
    try {
      const response = await axiosApi(`users/${id}`);
      dispatch(userDetailsSuccess(response.data));
    } catch (e) {
      dispatch(userDetailsFail(e.response && e.response.data
        ? e.response.data
        : e.message));
    }
  };
};

export const updateUser = (user, id) => {
  return async dispatch => {
    dispatch(userUpdateRequest());
    try {
      const { data } = await axiosApi.put(`/users/${id}`, user);
      dispatch(userUpdateSuccess(data));
    } catch (e) {
      dispatch(userUpdateFail(e.response && e.response.data
        ? e.response.data
        : e.message));
    }
  };
};



