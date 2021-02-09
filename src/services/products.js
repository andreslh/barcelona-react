import request from '../app/request';
import { GET_PRODUCTS, PRODUCTS_PREFIX, urlBuilder } from './constants';

const getUrl = urlBuilder(PRODUCTS_PREFIX);

function getList() {
  return request({
    url: getUrl(GET_PRODUCTS),
    method: 'GET',
  });
}

const ProductsService = {
  getList,
};

export default ProductsService;
