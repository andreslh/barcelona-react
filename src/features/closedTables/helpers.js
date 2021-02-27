import {
  ORDER_TYPE_MAX,
  TABLE_TYPES,
  TABLE_TYPES_TITLES,
} from '../../app/constants';

export const TYPES = {
  tables: 'tables',
  orders: 'orders',
};

export const isOrder = (type) => type === TYPES.orders;

export const getOrderTypeTitle = (waiterId) =>
  waiterId === TABLE_TYPES.delivery
    ? TABLE_TYPES_TITLES.delivery
    : TABLE_TYPES_TITLES.takeAway;

export const getWaiterId = (filter) => (filter in TYPES ? null : filter);

export const getTotal = (tables) =>
  tables.reduce((total, table) => (total += table.total), 0);

const typesList = [
  <option key={TYPES.tables} value={TYPES.tables} data-type={TYPES.tables}>
    Mesas
  </option>,
  <option key={TYPES.orders} value={TYPES.orders} data-type={TYPES.orders}>
    Pedidos
  </option>,
];
export const getFiltersList = (waiters) => {
  const waitersList = [...typesList];
  waiters?.map((waiter) => {
    return waitersList.push(
      <option
        key={waiter.id}
        value={waiter.id}
        data-type={waiter.id > ORDER_TYPE_MAX ? TYPES.tables : TYPES.orders}
      >
        {waiter.name}
      </option>
    );
  });

  return waitersList;
};
