import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CartIcon from './CartIcon.component';
import CartOverlay from '../CartOverlay';

export const mapStateToProps = (state) => ({
  productsList: state.CartReducer.productsList,
  activeCurrency: state.CurrencyReducer.activeCurrency,
});

class CartIconContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { badgeText: '', showBadge: false, overlayVisible: false };

    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.setOverLayRef = this.setOverLayRef.bind(this);
    this.setButtonRef = this.setButtonRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    this.renderBadge();
  }

  componentDidUpdate() {
    this.renderBadge();
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.cartOverlayRef && this.showCartButtonRef) {
      if (!this.cartOverlayRef.contains(event.target)
      && !this.showCartButtonRef.contains(event.target)) {
        this.toggleOverlay();
      }
    }
  }

  setOverLayRef(input) {
    this.cartOverlayRef = input;
  }

  setButtonRef(input) {
    this.showCartButtonRef = input;
  }

  toggleOverlay(newState) {
    const { overlayVisible } = this.state;
    if (newState !== undefined) {
      this.setState({ overlayVisible: newState });
    } else {
      this.setState({ overlayVisible: !overlayVisible });
    }
  }

  renderBadge() {
    const { productsList } = this.props;
    if (productsList.length > 0) {
      const amount = productsList.map((product) => product.amount)
        .reduce((prev, acc) => prev + acc);
      if (amount > 9) {
        this.setState({ badgeText: '9+' });
      } else {
        this.setState({ badgeText: amount });
      }
      this.setState({ showBadge: true });
    } else {
      this.setState({ showBadge: false });
    }
  }

  render() {
    const {
      badgeText, showBadge, overlayVisible,
    } = this.state;
    const { productsList, activeCurrency } = this.props;
    return (
      <div>
        <CartIcon
          onClick={() => { this.toggleOverlay(!overlayVisible); }}
          badgeText={badgeText}
          showBadge={showBadge}
          setButtonRef={this.setButtonRef}
        />
        <CartOverlay
          isVisible={overlayVisible}
          productsList={productsList}
          toggleOverlay={this.toggleOverlay}
          activeCurrency={activeCurrency}
          setOverLayRef={this.setOverLayRef}
        />
      </div>

    );
  }
}

export default connect(mapStateToProps)(CartIconContainer);
