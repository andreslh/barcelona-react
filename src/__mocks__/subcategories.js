import {
  ADD_SUBCATEGORY,
  SUBCATEGORIES_PREFIX,
  urlBuilder,
} from '../services/constants';

const getUrl = urlBuilder(SUBCATEGORIES_PREFIX);

export const mockAddSubcategory = (mock, categoryId) =>
  mock
    .onPost(getUrl(ADD_SUBCATEGORY.replace(':categoryId', categoryId)))
    .reply(200);
