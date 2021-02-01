import {
  ADD_PRODUCTS,
  COMPLETE_TABLE,
  DELETE_TABLE,
  GET_TABLES,
} from '../../../app/routes';
import activeTable from './activeTable.json';
import tables from './tables.json';

export const mockTables = (mock) => mock.onGet(GET_TABLES).reply(200, tables);

export const mockActiveTable = (mock, id) =>
  mock.onGet(`${GET_TABLES}/${id}`).reply(200, { ...activeTable, id });

export const mockAddProducts = (mock) =>
  mock.onPut(ADD_PRODUCTS.replace(':id', 1)).reply(200);

export const mockCompleteTable = (mock) =>
  mock.onPut(COMPLETE_TABLE.replace(':id', 1)).reply(200);

export const mockDeleteTable = (mock) =>
  mock.onDelete(DELETE_TABLE.replace(':id', 1)).reply(200);
