export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const UPDATE_ACTIVE_PRODUCT = 'UPDATE_ACTIVE_PRODUCT';
export const UPDATE_SELECTED_ATTRIBUTES = 'UPDATE_SELECTED_ATTRIBUTES';
export const RESET_SELECTED_ATTRIBUTES = 'RESET_SELECTED_ATTRIBUTES';

export const loadProducts = (products) => ({
  type: LOAD_PRODUCTS,
  products,
});

export const updateActiveProduct = (product) => ({
  type: UPDATE_ACTIVE_PRODUCT,
  product,
});

export const updateSelectedAttributes = (attribute) => ({
  type: UPDATE_SELECTED_ATTRIBUTES,
  attribute,
});
export const resetSelectedAttributes = () => ({
  type: RESET_SELECTED_ATTRIBUTES,
});
