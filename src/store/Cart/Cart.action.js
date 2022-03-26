export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT_AMOUNT = 'UPDATE_PRODUCT_AMOUNT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export const addProductToCart = (product) => ({
  type: ADD_PRODUCT,
  product,
});

export const removeProduct = (product) => ({
  type: REMOVE_PRODUCT,
  product,
});

export const updateProductAmount = (product, amount) => ({
  type: UPDATE_PRODUCT_AMOUNT,
  product,
  amount,
});
