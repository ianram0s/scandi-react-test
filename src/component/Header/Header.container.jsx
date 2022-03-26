import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { CategoryDispatcher } from '../../store/Category/Category.dispatcher';
import { CurrencyDispatcher } from '../../store/Currency/Currency.dispatcher';
import { ProductDispatcher } from '../../store/Product/Product.dispatcher';
import Header from './Header.component';

export const mapStateToProps = (state) => ({
  activeCategory: state.CategoryReducer.activeCategory,
  productsList: state.ProductReducer.productsList,
});

export const mapDispatchToProps = (dispatch) => ({
  changeActiveCategory: (category) => CategoryDispatcher.updateActiveCategory(dispatch, category),
  updateCategoryData: () => CategoryDispatcher.updateCategoryData(dispatch),
  updateProductsData: () => ProductDispatcher.updateProductsData(dispatch),
  updateCurrenciesData: () => CurrencyDispatcher.updateCurrenciesData(dispatch),
});

class CategoriesContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  async componentDidMount() {
    const { updateCategoryData, updateProductsData, updateCurrenciesData } = this.props;
    await updateCategoryData();
    await updateProductsData();
    await updateCurrenciesData();
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
