import request from '../app/request';
import {
  SUBCATEGORIES_PREFIX,
  ADD_SUBCATEGORY,
  urlBuilder,
  UPDATE_SUBCATEGORY,
  DELETE_SUBCATEGORY,
  GET_SUBCATEGORY,
} from './constants';

const getUrl = urlBuilder(SUBCATEGORIES_PREFIX);

function getById(id) {
  return request({
    url: getUrl(GET_SUBCATEGORY.replace(':id', id)),
    method: 'GET',
  });
}

function create(data) {
  return request({
    url: getUrl(ADD_SUBCATEGORY),
    method: 'POST',
    data,
  });
}

function update(data) {
  return request({
    url: getUrl(UPDATE_SUBCATEGORY.replace(':id', data.id)),
    method: 'PUT',
    data,
  });
}

function remove(id) {
  return request({
    url: getUrl(DELETE_SUBCATEGORY.replace(':id', id)),
    method: 'DELETE',
  });
}

const SubcategoriesService = {
  getById,
  create,
  update,
  remove,
};

export default SubcategoriesService;
