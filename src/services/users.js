import request from '../app/request';
import {
  USERS_PREFIX,
  LOGIN,
  TOKEN,
  urlBuilder,
  CHANGE_PASSWORD,
  LOGOUT,
  RESET_PASSWORD,
  GET_BY_ROLE,
} from './constants';

const getUrl = urlBuilder(USERS_PREFIX);

function login(data) {
  return request({
    url: getUrl(LOGIN),
    method: 'POST',
    data,
  });
}

function token(data) {
  return request({
    url: getUrl(TOKEN),
    method: 'POST',
    data,
  });
}

function logout(data) {
  return request({
    url: getUrl(LOGOUT),
    method: 'POST',
    data,
  });
}

function changePassword(data) {
  return request({
    url: getUrl(CHANGE_PASSWORD),
    method: 'PUT',
    data,
  });
}

function getByRole(role) {
  return request({
    url: getUrl(GET_BY_ROLE.replace(':role', role)),
    method: 'GET',
  });
}

function resetPassword(data) {
  return request({
    url: getUrl(RESET_PASSWORD),
    method: 'PUT',
    data,
  });
}

const UsersService = {
  login,
  token,
  logout,
  changePassword,
  getByRole,
  resetPassword,
};

export default UsersService;
