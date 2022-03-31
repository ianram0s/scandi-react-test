import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { QueryDispatcher } from '../../query/QueryDispatcher';
// import { CategoryDispatcher } from '../../store/Category/Category.dispatcher';
// import { CurrencyDispatcher } from '../../store/Currency/Currency.dispatcher';
import Header from './Header.component';

export const mapStateToProps = (state) => ({
  activeCategory: state.CategoryReducer.activeCategory,
  productsList: state.ProductReducer.productsList,
});

export const mapDispatchToProps = (dispatch) => ({
  fetchInitialData: () => QueryDispatcher.fetchInitialData(dispatch),
// changeActiveCategory: (category) => CategoryDispatcher.updateActiveCategory(dispatch, category),
  // updateCategoryData: () => CategoryDispatcher.updateCategoryData(dispatch),
  // updateCurrenciesData: () => CurrencyDispatcher.updateCurrenciesData(dispatch),
});

class CategoriesContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  async componentDidMount() {
    const { fetchInitialData } = this.props;
    await fetchInitialData();
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading } = this.state;
    return (!isLoading
      && <Header />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer);
