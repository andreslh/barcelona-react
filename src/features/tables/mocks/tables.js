import {
  ADD_PRODUCTS,
  ADD_TABLE,
  COMPLETE_TABLE,
  DELETE_TABLE,
  DELETE_TABLE_PRODUCT,
  GET_TABLE,
  GET_TABLES,
} from '../../../app/routes';
import activeTable from './activeTable.json';
import tables from './tables.json';

export const mockTables = (mock) => mock.onGet(GET_TABLES).reply(200, tables);

export const mockActiveTable = (mock, id) =>
  mock
    .onGet(GET_TABLE.replace(':id', id))
    .reply(200, { table: { ...activeTable.table, id } });

export const mockAddProducts = (mock) =>
  mock.onPost(ADD_PRODUCTS.replace(':id', 1)).reply(200);

export const mockCompleteTable = (mock) =>
  mock.onPut(COMPLETE_TABLE.replace(':id', 1)).reply(200);

export const mockDeleteTable = (mock) =>
  mock.onDelete(DELETE_TABLE.replace(':id', 1)).reply(200);

export const mockDeleteTableProduct = (mock) =>
  mock
    .onDelete(DELETE_TABLE_PRODUCT.replace(':id', 1).replace(':productId', 14))
    .reply(200);

export const mockAddTable = (mock) =>
  mock.onPost(ADD_TABLE).reply(200, {
    table: {
      id: 5,
    },
  });
