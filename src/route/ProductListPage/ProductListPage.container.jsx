import { PureComponent } from 'react';
import { connect } from 'react-redux';
import ProductListPage from './ProductListPage.component';
import { CategoryDispatcher } from '../../store/Category/Category.dispatcher';
import ErrorPage from '../ErrorPage';
import { QueryDispatcher } from '../../query/QueryDispatcher';

export const mapStateToProps = (state) => ({
  activeCategory: state.CategoryReducer.activeCategory,
  categories: state.CategoryReducer.categories,
  activeCurrency: state.CurrencyReducer.activeCurrency,
  currencies: state.CurrencyReducer.currencies,
  products: state.ProductReducer.products,
});

export const mapDispatchToProps = (dispatch) => ({
  fetchProductListData: (category) => QueryDispatcher.fetchProductListData(dispatch, category),
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
      categoryFromURL, fetchProductListData,
      updateActiveCategory,
    } = this.props;
    await fetchProductListData(categoryFromURL || 'all')
      .catch(() => { this.setState({ loadingError: true }); })
      .finally(() => { updateActiveCategory(categoryFromURL); });
    this.setState({ loadingState: false, loadingError: false });
  }

  render() {
    const {
      products, activeCategory,
    } = this.props;
    const { loadingState, loadingError } = this.state;
    if (loadingError || activeCategory === false) {
      return (
        <ErrorPage />
      );
    }
    const CapitalizeFirstLetter = ((str) => str.charAt(0).toUpperCase() + str.slice(1));
    const category = activeCategory ? CapitalizeFirstLetter(activeCategory) : activeCategory;
    return (
      <ProductListPage
        productsList={products}
        category={category}
        loadingState={loadingState}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPageContainer);
