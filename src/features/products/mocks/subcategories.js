import {
  ADD_SUBCATEGORY,
  SUBCATEGORIES_PREFIX,
  urlBuilder,
} from '../../../services/constants';
import products from './products.json';

const getUrl = urlBuilder(SUBCATEGORIES_PREFIX);

export const mockAddSubcategory = (mock, categoryId) =>
  mock
    .onPost(getUrl(ADD_SUBCATEGORY.replace(':categoryId', categoryId)))
    .reply(200);
