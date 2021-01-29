import { GET_TABLES } from '../../../app/routes';
import activeTable from './activeTable.json';
import tables from './tables.json';

export const mockTables = (mock) => mock.onGet(GET_TABLES).reply(200, tables);

export const mockActiveTable = (mock, id) =>
  mock.onGet(`${GET_TABLES}/${id}`).reply(200, { ...activeTable, id });
