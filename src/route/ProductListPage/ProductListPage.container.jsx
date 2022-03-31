import { PureComponent } from 'react';
import { connect } from 'react-redux';
import ProductListPage from './ProductListPage.component';
import { CategoryDispatcher } from '../../store/Category/Category.dispatcher';
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
  updateProductsData: (category) => ProductDispatcher.updateProductsData(dispatch, category),
  updateActiveCategory: (category) => CategoryDispatcher
    .updateActiveCategory(dispatch, category),
});

class ProductListPageContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { loadingState: true, loadingError: false };
  }

  async componentDidMount() {
    const {
      categoryFromURL, updateProductsData,
      updateActiveCategory, activeCategory,
    } = this.props;
    await updateProductsData(activeCategory || 'all')
      .catch(() => { this.setState({ loadingError: true }); });
    updateActiveCategory(categoryFromURL);
    this.setState({ loadingState: false, loadingError: false });
  }

  render() {
    const {
      products, activeCategory,
    } = this.props;
    const { loadingState, loadingError } = this.state;
    if ((activeCategory === false && activeCategory !== undefined) || loadingError) {
      return (
        <ErrorPage />
      );
    }
    const CapitalizeFirstLetter = ((str) => str.charAt(0).toUpperCase() + str.slice(1));
    return (
      <ProductListPage
        productsList={products}
        category={CapitalizeFirstLetter(activeCategory)}
        loadingState={loadingState}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPageContainer);
