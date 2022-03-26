import {
  LOAD_PRODUCTS, UPDATE_ACTIVE_PRODUCT, UPDATE_SELECTED_ATTRIBUTES,
  RESET_SELECTED_ATTRIBUTES,
} from './Product.action';

const initialState = { products: [], activeProduct: { } };

// eslint-disable-next-line default-param-last
const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    case UPDATE_ACTIVE_PRODUCT: {
      const productToActivate = action.product;
      return {
        ...state,
        activeProduct: {
          ...productToActivate,
          attributes: productToActivate.attributes.map((attribute) => ({
            ...attribute,
            items: attribute.items.map((option) => ({
              ...option,
              isSelected: false,
            })),

          })),
        },
      };
    }
    case UPDATE_SELECTED_ATTRIBUTES:
      return {
        ...state,
        activeProduct: {
          ...state.activeProduct,
          attributes: state.activeProduct.attributes.map((attribute) => {
            if (attribute.name !== action.attribute.name) {
              return ({ ...attribute });
            }
            return ({
              ...attribute,
              items: attribute.items.map((item) => {
                if (item.value !== action.attribute.item.value) {
                  return ({ ...item, isSelected: false });
                }
                return ({ ...item, isSelected: true });
              }),
            });
          }),
        },

      };
    case RESET_SELECTED_ATTRIBUTES:
      return {
        ...state,
        selectedAttributes: [],
      };
    default:
      return state;
  }
};

export default ProductReducer;
