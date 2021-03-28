import axios from 'axios';
import store from './store/congfigureStore';

const axiosApi = axios.create({
  baseURL: 'http://localhost:8000',
});

axiosApi.interceptors.request.use(config => {
  try {
    config.headers['Authorization'] = `Bearer ${store.getState().userLogin.userInfo.token}`;
  } catch (e) {}
  return config;
})

export default axiosApi;