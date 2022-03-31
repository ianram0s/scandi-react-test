import { getProductsList } from '../../query/Products.query';
import {
  loadProducts, updateActiveProduct, updateSelectedAttributes, resetSelectedAttributes,
} from './Product.action';

export class ProductDispatcher {
  // eslint-disable-next-line no-unused-vars
  static async updateProductsData(dispatch, category) {
    const products = await getProductsList(category);
    if (products !== null && products !== undefined) {
      dispatch(loadProducts(products));
    }
    return products;
  }

  static setActiveProduct(dispatch, product) {
    dispatch(updateActiveProduct(product));
  }

  static updateSelectedAttributes(dispatch, attribute) {
    dispatch(updateSelectedAttributes(attribute));
  }

  static resetSelectedAttributes(dispatch) {
    dispatch(resetSelectedAttributes());
  }
}

export default new ProductDispatcher();
