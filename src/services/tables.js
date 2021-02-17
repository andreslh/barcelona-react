import request from '../app/request';
import {
  ADD_PRODUCTS,
  ADD_TABLE,
  COMPLETE_TABLE,
  DELETE_TABLE,
  DELETE_TABLE_PRODUCT,
  GET_TABLE,
  GET_TABLES,
  UPDATE_TABLE,
  TABLES_PREFIX,
  urlBuilder,
} from './constants';

const getUrl = urlBuilder(TABLES_PREFIX);

function getOpen() {
  return request({
    url: getUrl(GET_TABLES),
    method: 'GET',
  });
}

function getById(id) {
  return request({
    url: getUrl(GET_TABLE.replace(':id', id)),
    method: 'GET',
  });
}

function remove(id) {
  return request({
    url: getUrl(DELETE_TABLE.replace(':id', id)),
    method: 'DELETE',
  });
}

function removeProduct({ tableId, productId }) {
  return request({
    url: getUrl(
      DELETE_TABLE_PRODUCT.replace(':id', tableId).replace(
        ':productId',
        productId
      )
    ),
    method: 'DELETE',
  });
}

function complete(id) {
  return request({
    url: getUrl(COMPLETE_TABLE.replace(':id', id)),
    method: 'PUT',
  });
}

function create(data) {
  return request({
    url: getUrl(ADD_TABLE),
    method: 'POST',
    data,
  });
}

function update(data) {
  return request({
    url: getUrl(UPDATE_TABLE.replace(':id', data.id)),
    method: 'PUT',
    data,
  });
}

function addProducts({ id, products }) {
  return request({
    url: getUrl(ADD_PRODUCTS.replace(':id', id)),
    method: 'POST',
    data: products,
  });
}

const TablesService = {
  getOpen,
  getById,
  remove,
  removeProduct,
  complete,
  create,
  update,
  addProducts,
};

export default TablesService;
