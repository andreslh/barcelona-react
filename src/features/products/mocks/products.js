import { GET_PRODUCTS } from '../../../app/routes';
import products from './products.json';

export const mockProducts = (mock) =>
  mock.onGet(GET_PRODUCTS).reply(200, products);
