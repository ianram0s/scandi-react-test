import { client, CombinedField } from '@tilework/opus';
import { CategoryDispatcher } from '../store/Category/Category.dispatcher';
import { CurrencyDispatcher } from '../store/Currency/Currency.dispatcher';
import { ProductDispatcher } from '../store/Product/Product.dispatcher';
import { categoriesListQuery } from './Category.query';
import { currencyQuery } from './Currency.query';
import { getProductsListQuery, productQuery } from './Products.query';

export class QueryDispatcher {
  constructor() {
    client.setEndpoint(process.env.REACT_APP_GRAPHQL_ENDPOINT);
  }

  static async fetchInitialData(dispatch) {
    const queryList = [currencyQuery, categoriesListQuery];

    const data = await this.fetchData(queryList);
    if (!data.categories || !data.currencies) {
      return false;
    }
    CurrencyDispatcher.updateCurrenciesData(dispatch, data.currencies);
    CategoryDispatcher.updateCategoryData(dispatch, data.categories);
    return data;
  }

  static async fetchProductData(dispatch, productID) {
    const queryList = [productQuery(productID)];

    const data = await this.fetchData(queryList);
    if (!data.product) {
      return false;
    }
    ProductDispatcher.setActiveProduct(dispatch, data.product);
    return data;
  }

  static async fetchProductListData(dispatch, categoryID) {
    if (!categoryID) return false;
    const queryList = [getProductsListQuery(categoryID.toLowerCase())];
    const data = await this.fetchData(queryList);
    if (data.category.products) {
      ProductDispatcher.updateProductsData(dispatch, data.category.products);
    }
    return data.category.products;
  }

  static async fetchData(queryList) {
    let combinedField = new CombinedField();
    queryList.forEach((query) => {
      combinedField = combinedField.add(query);
    });
    const data = await client.post(combinedField);
    return data;
  }
}
export default new QueryDispatcher();
