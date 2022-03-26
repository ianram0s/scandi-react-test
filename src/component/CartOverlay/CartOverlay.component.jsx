import { PureComponent } from 'react';
import './CartOverlay.style.scss';
import { Link } from 'react-router-dom';
import CartItemContainer from '../CartIItem';

class CartOverlay extends PureComponent {
  render() {
    const {
      isVisible, productsList, toggleOverlay, activeCurrency, setOverLayRef,
    } = this.props;
    return (
      isVisible && (
      <div>
        <div className="CartOverlayContainer" ref={setOverLayRef}>
          <h3>
            <b>My bag, </b>
            {productsList.length || 0}
            {' '}
            item(s)
          </h3>
          <div className="ProductsContainer">
            {productsList.map((product) => (
              <CartItemContainer
                key={product.cartItemID}
                product={product}
                size="Small"
                toggleOverlay={toggleOverlay}
              />
            ))}
          </div>
          <div className="TotalContainer">
            <h3>Total:</h3>
            <h4>
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
            </h4>
          </div>
          <div className="OverlayButtons">
            <Link to="../cart" onClick={() => { toggleOverlay(false); }} className="ViewbagButton">VIEW BAG</Link>
            <button type="button" onClick={() => { toggleOverlay(false); }} className="CheckoutButton">CHECKOUT</button>
          </div>

        </div>

        <div className="OverlayShadow" />

      </div>
      )
    );
  }
}

export default CartOverlay;
