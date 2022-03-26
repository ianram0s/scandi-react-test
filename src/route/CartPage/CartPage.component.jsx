import { PureComponent } from 'react';
import { connect } from 'react-redux';
import CartItemContainer from '../../component/CartIItem/CartItem.container';
import { CartDispatcher } from '../../store/Cart/Cart.dispatcher';
import './CartPage.style.scss';

export const mapStateToProps = (state) => ({
  productsList: state.CartReducer.productsList,
  activeCurrency: state.CurrencyReducer.activeCurrency,
});

export const mapDispatchToProps = (dispatch) => ({
  addProductToCart: (product) => CartDispatcher.addProductToCart(dispatch, product),
});

class CartPage extends PureComponent {
  renderProducts() {
    const { productsList, activeCurrency } = this.props;
    return (
      <div>
        {productsList.map((product) => (
          <CartItemContainer
            key={product.cartItemID}
            product={product}
            size="Big"
          />
        ))}
        <div className="TotalPriceContainer">
          <h2>
            Total:
          </h2>
          <h2>
            {activeCurrency.symbol}
            {
            productsList
              .reduce((accumulator, item) => {
                const filteredPrice = item.prices.filter(
                  (price) => price.currency.label === activeCurrency.label,
                )[0];
                return (accumulator + item.amount * filteredPrice.amount);
              }, 0).toFixed(2)

           }
          </h2>
        </div>
      </div>
    );
  }

  render() {
    const { productsList } = this.props;
    return (
      <div className="CartPageContainer">
        <h2>CART</h2>
        {
          (productsList === undefined || productsList.length <= 0)
            ? <p>Cart is empty.</p>
            : this.renderProducts()
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
