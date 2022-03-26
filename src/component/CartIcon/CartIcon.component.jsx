import { PureComponent } from 'react';
import './CartIcon.style.scss';
import { ReactComponent as Icon } from '../../style/assets/cart-icon.svg';

class CartIcon extends PureComponent {
  render() {
    const {
      showBadge, badgeText, onClick, setButtonRef,
    } = this.props;
    return (
      <button type="button" onClick={onClick} ref={setButtonRef}>
        { showBadge && (
        <div className="badge">
          <div className="text">{badgeText}</div>
        </div>
        )}
        <div className="ShopCartIcon">
          <Icon />
        </div>
      </button>
    );
  }
}

export default CartIcon;
