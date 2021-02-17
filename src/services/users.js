import request from '../app/request';
import { USERS_PREFIX, LOGIN, TOKEN, urlBuilder } from './constants';

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

const UsersService = {
  login,
  token,
};

export default UsersService;
