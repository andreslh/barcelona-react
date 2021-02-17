import request from '../app/request';
import {
  CATEGORIES_PREFIX,
  ADD_CATEGORY,
  urlBuilder,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORY,
} from './constants';

const getUrl = urlBuilder(CATEGORIES_PREFIX);

function getById(id) {
  return request({
    url: getUrl(GET_CATEGORY.replace(':id', id)),
    method: 'GET',
  });
}

function create(data) {
  return request({
    url: getUrl(ADD_CATEGORY),
    method: 'POST',
    data,
  });
}

function update(data) {
  return request({
    url: getUrl(UPDATE_CATEGORY.replace(':id', data.id)),
    method: 'PUT',
    data,
  });
}

function remove(id) {
  return request({
    url: getUrl(DELETE_CATEGORY.replace(':id', id)),
    method: 'DELETE',
  });
}

const CategoriesService = {
  getById,
  create,
  update,
  remove,
};

export default CategoriesService;
