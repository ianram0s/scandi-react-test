import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { CartDispatcher } from '../../store/Cart/Cart.dispatcher';
import CartPage from './CartPage.component';

export const mapStateToProps = (state) => ({
  productsList: state.CartReducer.productsList,
  activeCurrency: state.CurrencyReducer.activeCurrency,
});

export const mapDispatchToProps = (dispatch) => ({
  addProductToCart: (product) => CartDispatcher.addProductToCart(dispatch, product),
});

class CartPageContainer extends PureComponent {
  render() {
    const { productsList, activeCurrency } = this.props;
    return (
      <CartPage
        productsList={productsList}
        activeCurrency={activeCurrency}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPageContainer);
