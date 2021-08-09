export const TABLES_PREFIX = 'tables/';
export const GET_TABLES = 'open';
export const GET_CLOSED_TABLES = 'closed';
export const GET_TABLE = ':id';
export const ADD_PRODUCTS = ':id/products';
export const DELETE_TABLE = ':id';
export const COMPLETE_TABLE = ':id/complete';
export const DELETE_TABLE_PRODUCT = ':id/products/:productId';
export const ADD_TABLE = '';
export const UPDATE_TABLE = ':id';

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

export const CATEGORIES_PREFIX = 'categories/';
export const GET_CATEGORY = ':id';
export const ADD_CATEGORY = '';
export const UPDATE_CATEGORY = ':id';
export const DELETE_CATEGORY = ':id';

export const WAITERS_PREFIX = 'waiters/';
export const GET_WAITERS = '';
export const GET_WAITERS_WITH_TABLES = 'tables';
export const GET_WAITER = ':id';
export const ADD_WAITER = '';
export const UPDATE_WAITER = ':id';
export const DELETE_WAITER = ':id';

export const USERS_PREFIX = 'users/';
export const LOGIN = 'login';
export const SIGUNUP = 'signup';
export const TOKEN = 'token';
export const LOGOUT = 'logout';
export const GET_BY_ROLE = 'manage/list/:role';
export const RESET_PASSWORD = 'manage/reset-password';
export const CHANGE_PASSWORD = 'change-password';

export const urlBuilder = (prefix) => (url) => `${prefix}${url}`;
