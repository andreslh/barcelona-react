import { GET_TABLES } from '../../../app/routes';

export const mockTables = (mock) =>
  mock.onGet(GET_TABLES).reply(200, [
    {
      id: 1,
      name: 'Andres',
    },
    {
      id: 2,
      name: 'Andres',
    },
    {
      id: 3,
      name: 'Andres',
    },
  ]);
