import {
  GET_PRODUCTS,
  PRODUCTS_PREFIX,
  urlBuilder,
} from '../../../services/constants';
import products from './products.json';

const getUrl = urlBuilder(PRODUCTS_PREFIX);

export const mockProducts = (mock) =>
  mock.onGet(getUrl(GET_PRODUCTS)).reply(200, products);
