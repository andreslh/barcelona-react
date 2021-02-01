const activeExists = (tables, active) =>
  active && tables.find((table) => table.id.toString() === active);

const isNew = (newActive, currentActive) =>
  newActive !== currentActive?.id?.toString();

const isEmpty = (param, activeTable) => !param && !activeTable?.id;

export const isActiveParamValid = (activeParam, activeTable, tables) =>
  (activeExists(tables, activeParam) && isNew(activeParam, activeTable)) ||
  isEmpty(activeParam, activeTable);
