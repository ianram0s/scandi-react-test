import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { CartDispatcher } from '../../store/Cart/Cart.dispatcher';
import ProductCard from './ProductCard.component';

export const mapStateToProps = (state) => ({
  activeCurrency: state.CurrencyReducer.activeCurrency,
});

export const mapDispatchToProps = (dispatch) => ({
  addProductToCart: (product) => CartDispatcher.addProductToCart(dispatch, product),
});

class ProductCardContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  async handleAddToCart(product) {
    const { addProductToCart } = this.props;
    addProductToCart(product);
  }

  render() {
    const { product, activeCurrency } = this.props;
    return (
      <ProductCard
        productInfo={product}
        activeCurrency={activeCurrency}
        handleAddToCart={this.handleAddToCart}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardContainer);
