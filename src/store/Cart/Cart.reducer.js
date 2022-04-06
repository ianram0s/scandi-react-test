import { ADD_PRODUCT, UPDATE_PRODUCT_AMOUNT, REMOVE_PRODUCT } from './Cart.action';

const initialState = { productsList: [] };

// A cart ItemID is designed to indicate a
// unique product type based on every possible combination of attributes.
const GenerateCartItemID = (product) => {
  let cartItemID = `${product.id}`;
  product.attributes.forEach(
    (attribute) => {
      attribute.items.forEach((item) => {
        if (item.isSelected) {
          cartItemID = `${cartItemID}-${attribute.name}-${item.value}`.toLowerCase();
        }
      });
    },
  );
  return cartItemID;
};

// Makes sure that all product attributtes has one selected item.
const SanitizeProduct = (product) => {
  const allAttributesSelected = product.attributes.every((attribute) => {
    const hasSelection = attribute.items.find((item) => item.isSelected);
    return hasSelection;
  });

  if (allAttributesSelected) return product;

  return {
    ...product,
    attributes: product.attributes.map((attribute) => ({
      ...attribute,
      items: attribute.items.map((item, index) => {
        if (index === 0) return ({ ...item, isSelected: true });
        return ({ ...item, isSelected: false });
      }),
    })),

  };
};

// eslint-disable-next-line default-param-last
const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT: {
      if (!action.product.inStock) return { ...state };
      const sanitizedProduct = SanitizeProduct(action.product);
      // Make sure all attributes have one item selected.
      const cartItemID = GenerateCartItemID(sanitizedProduct);
      let mutatedProductsList = state.productsList;

      const existingProductFound = mutatedProductsList.find(
        (product) => product.cartItemID === cartItemID,
      );
      if (existingProductFound) {
        mutatedProductsList = state.productsList.map((product) => {
          if (product.cartItemID !== cartItemID) {
            return product;
          }
          return {
            ...product,
            cartItemID,
            amount: product.amount + 1,
          };
        });
      } else {
        mutatedProductsList = [...mutatedProductsList, {
          ...sanitizedProduct, cartItemID, amount: 1,
        }];
      }
      return {
        ...state,
        productsList: mutatedProductsList,
      };
    }
    case UPDATE_PRODUCT_AMOUNT:
      return {
        ...state,
        productsList: state.productsList.map(
          (product) => {
            if (product.cartItemID !== action.product.cartItemID) {
              return product;
            }
            return {
              ...product,
              amount: action.amount,
            };
          },
        ),
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        productsList: state.productsList.filter(
          (product) => product.cartItemID !== action.product.cartItemID,
        ),
      };
    default:
      return state;
  }
};

export default CartReducer;
