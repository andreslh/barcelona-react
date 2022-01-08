import {
  GET_WAITERS,
  WAITERS_PREFIX,
  urlBuilder,
  GET_WAITERS_WITH_TABLES,
} from '../services/constants';
import waiters from './waiters.json';
import waitersWithTables from './waitersWithTables.json';

const getUrl = urlBuilder(WAITERS_PREFIX);

export const mockWaiters = (mock) =>
  mock.onGet(getUrl(GET_WAITERS)).reply(200, waiters);

export const mockWaitersWithTables = (mock) =>
  mock.onGet(getUrl(GET_WAITERS_WITH_TABLES)).reply(200, waitersWithTables);
