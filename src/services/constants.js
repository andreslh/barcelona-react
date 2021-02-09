export const TABLES_PREFIX = 'tables/';
export const GET_TABLES = 'open';
export const GET_TABLE = ':id';
export const ADD_PRODUCTS = ':id/products';
export const DELETE_TABLE = ':id';
export const COMPLETE_TABLE = ':id/complete';
export const DELETE_TABLE_PRODUCT = ':id/products/:productId';
export const ADD_TABLE = '';

export const PRODUCTS_PREFIX = 'products/';
export const GET_PRODUCTS = 'list';

export const urlBuilder = (prefix) => (url) => `${prefix}${url}`;
