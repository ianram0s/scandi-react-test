import { PureComponent } from 'react';
import { connect } from 'react-redux';
import ProductDescriptionPage from './ProductDescriptionPage.component';
import { ProductDispatcher } from '../../store/Product/Product.dispatcher';
import { CartDispatcher } from '../../store/Cart/Cart.dispatcher';
import { ReactComponent as LoadingIcon } from '../../style/assets/loading.svg';
import { QueryDispatcher } from '../../query/QueryDispatcher';
import ErrorPage from '../ErrorPage';

export const mapStateToProps = (state) => ({
  activeProduct: state.ProductReducer.activeProduct,
  activeCurrency: state.CurrencyReducer.activeCurrency,
});

export const mapDispatchToProps = (dispatch) => ({
  resetSelectedAttributes: () => ProductDispatcher.resetSelectedAttributes(dispatch),
  addProductToCart: (product) => CartDispatcher.addProductToCart(dispatch, product),
  fetchProductData: (productid) => QueryDispatcher.fetchProductData(dispatch, productid),
});
class ProductDescriptionPageContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { loadingState: true, loadingError: false };
    this.addToCartHandle = this.addToCartHandle.bind(this);
  }

  async componentDidMount() {
    const {
      productidFromURL,
      resetSelectedAttributes,
      fetchProductData,
    } = this.props;
    resetSelectedAttributes();
    const validProduct = await fetchProductData(productidFromURL);

    if (validProduct) {
      this.setState({ loadingError: false, loadingState: false });
    } else { this.setState({ loadingError: true, loadingState: false }); }
  }

  addToCartHandle() {
    const { addProductToCart, activeProduct } = this.props;
    addProductToCart(activeProduct);
  }

  render() {
    const { loadingState, loadingError } = this.state;
    const { activeProduct, activeCurrency } = this.props;
    if (loadingError) {
      return <ErrorPage />;
    }
    if (loadingState) {
      return <LoadingIcon className="LoadingIcon" />;
    }
    return (
      <div>
        {!loadingState && (
        <ProductDescriptionPage
          activeProduct={activeProduct}
          activeCurrency={activeCurrency}
          addToCartHandle={this.addToCartHandle}
        />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescriptionPageContainer);
