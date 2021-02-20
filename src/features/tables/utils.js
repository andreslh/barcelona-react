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
