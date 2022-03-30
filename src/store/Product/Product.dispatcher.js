import { getProductInfo, getProductsList } from '../../query/Products.query';
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

  static async setActiveProduct(dispatch, productid) {
    const product = await getProductInfo(productid);
    if (product) {
      dispatch(updateActiveProduct(product));
      return product;
    }
    return false;
  }

  static updateSelectedAttributes(dispatch, attribute) {
    dispatch(updateSelectedAttributes(attribute));
  }

  static resetSelectedAttributes(dispatch) {
    dispatch(resetSelectedAttributes());
  }
}

export default new ProductDispatcher();
