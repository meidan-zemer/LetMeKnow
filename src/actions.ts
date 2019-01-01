export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS)';
export const LOAD_PRODUCTS_FAILED = 'LOAD_PRODUCTS_FAILED';

export function loadProducts() {
  return {
    types: [LOAD_PRODUCTS, LOAD_PRODUCTS_SUCCESS, LOAD_PRODUCTS_FAILED],
    payload: {
      request: {
        url: '/products'
      },
    },
  };
}
