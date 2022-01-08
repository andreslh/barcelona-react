/**
 * Axios Request Wrapper
 * ---------------------
 *
 * @author  Sheharyar Naseer (@sheharyarn)
 * @license MIT
 *
 */

import axios from 'axios';
import { forceLogin, updateAccessToken } from '../features/users/usersSlice';
import {
  ACCESS_TOKEN,
  API_URL,
  REFRESH_TOKEN,
  TOKEN_EXPIRED_ERROR,
} from './constants';
import store from './store';

export const client = axios.create({
  baseURL: API_URL,
});

client.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = 'Bearer ' + accessToken;
  }

  return config;
});

const request = function (options) {
  const onSuccess = (response) => response.data;

  const onError = function (error) {
    if (error.response?.data?.message === TOKEN_EXPIRED_ERROR) {
      return refreshTokenAndRetry(options);
    }

    alert(
      error.response?.data?.message || 'Hubo un error al realizar la acción'
    );
    console.error('Request Failed:', error.config);

    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else {
      console.error('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

const refreshTokenAndRetry = (options) => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  return client({
    method: 'POST',
    url: '/users/token',
    data: { token: refreshToken },
  })
    .then((response) => {
      store.dispatch(updateAccessToken(response.data.accessToken));
      return request(options);
    })
    .catch(() => {
      store.dispatch(forceLogin());
      return Promise.reject();
    });
};

export default request;
