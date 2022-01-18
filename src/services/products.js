import request from '../app/request';
import {
  GET_PRODUCTS,
  PRODUCTS_PREFIX,
  ADD_PRODUCT,
  urlBuilder,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  UPDATE_PRODUCTS,
  DELETE_PRODUCT,
} from './constants';

const getUrl = urlBuilder(PRODUCTS_PREFIX);

function getList() {
  return request({
    url: getUrl(GET_PRODUCTS),
    method: 'GET',
  });
}

function getById(id) {
  return request({
    url: getUrl(GET_PRODUCT.replace(':id', id)),
    method: 'GET',
  });
}

function create(data) {
  return request({
    url: getUrl(ADD_PRODUCT),
    method: 'POST',
    data,
  });
}

function update(data) {
  return request({
    url: getUrl(UPDATE_PRODUCT.replace(':id', data.id)),
    method: 'PUT',
    data,
  });
}

function updateAll(data) {
  return request({
    url: getUrl(UPDATE_PRODUCTS),
    method: 'PUT',
    data,
  });
}

function remove(id) {
  return request({
    url: getUrl(DELETE_PRODUCT.replace(':id', id)),
    method: 'DELETE',
  });
}

const ProductsService = {
  getList,
  getById,
  create,
  update,
  updateAll,
  remove,
};

export default ProductsService;
