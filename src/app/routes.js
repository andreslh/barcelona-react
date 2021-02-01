export const API_URL = 'http://localhost:3001/';

export const GET_TABLES = `${API_URL}tables`;
export const GET_PRODUCTS = `${API_URL}products`;
export const ADD_PRODUCTS = `${API_URL}tables/:id/products`;
export const DELETE_TABLE = `${API_URL}tables/:id`;
export const COMPLETE_TABLE = `${API_URL}tables/:id/complete`;
export const DELETE_TABLE_PRODUCT = `${API_URL}tables/:id/products/:productId`;
export const ADD_TABLE = `${API_URL}tables`;
