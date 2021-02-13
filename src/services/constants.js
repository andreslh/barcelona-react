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
export const GET_PRODUCT = ':id';
export const ADD_PRODUCT = '';
export const UPDATE_PRODUCT = ':id';
export const DELETE_PRODUCT = ':id';

export const SUBCATEGORIES_PREFIX = 'subcategories/';
export const GET_SUBCATEGORY = ':id';
export const ADD_SUBCATEGORY = '';
export const UPDATE_SUBCATEGORY = ':id';
export const DELETE_SUBCATEGORY = ':id';

export const urlBuilder = (prefix) => (url) => `${prefix}${url}`;
