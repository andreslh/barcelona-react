import { TABLE_TYPES } from '../../app/constants';

const activeExists = (waitersWithTables, active) =>
  waitersWithTables.find((waiter) =>
    waiter.Tables.some((table) => table.id.toString() === active?.toString())
  );

const isNew = (newActive, currentActive) =>
  newActive !== currentActive?.id?.toString();

const isEmpty = (param, activeTable) => !param && !activeTable?.id;

export const isActiveParamValid = (
  activeParam,
  activeTable,
  waitersWithTables
) =>
  (activeExists(waitersWithTables, activeParam) &&
    isNew(activeParam, activeTable)) ||
  isEmpty(activeParam, activeTable);

export const getFirstTable = (waitersWithTables) =>
  waitersWithTables.find((waiter) => waiter.Tables.length).Tables[0];

export const getWaiterName = (waiters, waiterId) =>
  waiters?.find((waiter) => waiter.id === waiterId).name;

const isNormalTable = (id) =>
  id !== TABLE_TYPES.delivery && id !== TABLE_TYPES.takeAway;

export const getTableTypeTitle = (table) =>
  isNormalTable(table.waiterId) ? 'Mesa' : 'Pedido';

export const getActiveTableTitle = (table, waiters) => {
  let title = `${getTableTypeTitle(table)}: ${table.name} `;
  if (isNormalTable(table.waiterId)) {
    title += ` - Atendida por: ${getWaiterName(waiters, table.waiterId)}`;
  } else {
    title += ` - ${getWaiterName(waiters, table.waiterId)}`;
  }
  return title;
};
