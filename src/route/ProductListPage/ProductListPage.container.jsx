import { PureComponent } from 'react';
import { connect } from 'react-redux';
import ProductListPage from './ProductListPage.component';
import { CategoryDispatcher } from '../../store/Category/Category.dispatcher';
import { CurrencyDispatcher } from '../../store/Currency/Currency.dispatcher';
import { ProductDispatcher } from '../../store/Product/Product.dispatcher';
import ErrorPage from '../ErrorPage';

export const mapStateToProps = (state) => ({
  activeCategory: state.CategoryReducer.activeCategory,
  categories: state.CategoryReducer.categories,
  activeCurrency: state.CurrencyReducer.activeCurrency,
  currencies: state.CurrencyReducer.currencies,
  products: state.ProductReducer.products,
});

export const mapDispatchToProps = (dispatch) => ({
  updateCategoryData: () => CategoryDispatcher.updateCategoryData(dispatch),
  updateProductsData: () => ProductDispatcher.updateProductsData(dispatch),
  updateActiveCategory: (category) => CategoryDispatcher
    .updateActiveCategory(dispatch, category),
  updateCurrenciesData: () => CurrencyDispatcher.updateCurrenciesData(dispatch),
  updateActiveProduct: (productid) => ProductDispatcher.updateActiveProduct(dispatch, productid),
});

class ProductListPageContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { loadingState: true };
  }

  async componentDidMount() {
    const {
      categoryFromURL, updateCategoryData,
      updateProductsData, updateCurrenciesData, updateActiveCategory,
    } = this.props;
    await updateCategoryData();
    await updateProductsData();
    await updateCurrenciesData();
    updateActiveCategory(categoryFromURL);
    this.setState({ loadingState: false });
  }

  render() {
    const { products, activeCategory } = this.props;
    const { loadingState } = this.state;
    if (activeCategory === false && activeCategory !== undefined) {
      return (
        <ErrorPage />
      );
    }

    const filteredProducts = products.filter((category) => category.name === activeCategory);
    const CapitalizeFirstLetter = ((str) => str.charAt(0).toUpperCase() + str.slice(1));

    return (
      <ProductListPage
        productsList={filteredProducts}
        category={CapitalizeFirstLetter(activeCategory)}
        loadingState={loadingState}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPageContainer);
