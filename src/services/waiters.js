import request from '../app/request';
import {
  urlBuilder,
  WAITERS_PREFIX,
  ADD_WAITER,
  UPDATE_WAITER,
  DELETE_WAITER,
  GET_WAITER,
  GET_WAITERS,
  GET_WAITERS_WITH_TABLES,
} from './constants';

const getUrl = urlBuilder(WAITERS_PREFIX);

function get() {
  return request({
    url: getUrl(GET_WAITERS),
    method: 'GET',
  });
}

function getWithTables() {
  return request({
    url: getUrl(GET_WAITERS_WITH_TABLES),
    method: 'GET',
  });
}

function getById(id) {
  return request({
    url: getUrl(GET_WAITER.replace(':id', id)),
    method: 'GET',
  });
}

function create(data) {
  return request({
    url: getUrl(ADD_WAITER),
    method: 'POST',
    data,
  });
}

function update(data) {
  return request({
    url: getUrl(UPDATE_WAITER.replace(':id', data.id)),
    method: 'PUT',
    data,
  });
}

function remove(id) {
  return request({
    url: getUrl(DELETE_WAITER.replace(':id', id)),
    method: 'DELETE',
  });
}

const WaitersService = {
  get,
  getWithTables,
  getById,
  create,
  update,
  remove,
};

export default WaitersService;
