import { getProductsList, getProductInfo } from '../../query/Products.query';
import {
  loadProducts, updateActiveProduct, updateSelectedAttributes, resetSelectedAttributes,
} from './Product.action';

export class ProductDispatcher {
  static async updateProductsData(dispatch) {
    const products = await getProductsList();
    dispatch(loadProducts(products));
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
