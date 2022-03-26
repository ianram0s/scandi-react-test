import { PureComponent } from 'react';
import './Header.style.scss';
import CategoriesContainer from '../Categories';
import { ReactComponent as LogoImg } from '../../style/assets/logo.svg';
import CurrencySwitcherContainer from '../CurrencySwitcher';
import CartIconContainer from '../CartIcon';

class Header extends PureComponent {
  render() {
    return (
      <header className="HeaderContainer">
        <CategoriesContainer />
        <div className="LogoWrapper">
          <LogoImg className="Logo" />
        </div>
        <div className="CurrencyAndCartWrapper">
          <CurrencySwitcherContainer classname="CurrencySwitcherWrapper" />
          <CartIconContainer />
        </div>
      </header>
    );
  }
}

export default Header;
