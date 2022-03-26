import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { CartDispatcher } from '../../store/Cart/Cart.dispatcher';
import CartItem from './CartItem.component';

export const mapStateToProps = (state) => ({
  activeCurrency: state.CurrencyReducer.activeCurrency,
});

export const mapDispatchToProps = (dispatch) => ({
  updateProductAmount:
    (product, amount) => CartDispatcher.updateProductAmount(dispatch, product, amount),
});

class CartItemContainer extends PureComponent {
  render() {
    const {
      product, size, activeCurrency, updateProductAmount, toggleOverlay,
    } = this.props;
    return (
      <CartItem
        product={product}
        size={size}
        updateProductAmount={updateProductAmount}
        activeCurrency={activeCurrency}
        toggleCartOverlay={toggleOverlay}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItemContainer);
