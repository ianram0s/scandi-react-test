import React, { PureComponent } from 'react';
import './CurrencySwitcher.style.scss';
import { ReactComponent as ArrowUpIcon } from '../../style/assets/arrow-up.svg';
import { ReactComponent as ArrowDownIcon } from '../../style/assets/arrow-down.svg';

class CurrencySwitcher extends PureComponent {
  constructor(props) {
    super(props);

    this.menuRef = React.createRef();
    this.buttonRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    const { setMenuVisible } = this.props;
    if (this.menuRef.current && this.buttonRef.current) {
      if (!this.menuRef.current.contains(event.target)
      && !this.buttonRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    }
  }

  renderCurrencyMenu() {
    const { availableCurrencies, updateActiveCurrency, setMenuVisible } = this.props;
    const renderCurrencyMenuItem = (currency) => (
      <button
        type="button"
        onClick={() => {
          updateActiveCurrency(currency);
          setMenuVisible(false);
        }}
        className="CurrencyMenuItem"
        key={currency.label}
      >
        {currency.symbol}
        {' '}
        {currency.label}
      </button>
    );
    return (
      <div className="CurrencyMenu" ref={this.menuRef}>
        {availableCurrencies.map((currency) => (

          renderCurrencyMenuItem(currency)

        ))}
      </div>
    );
  }

  renderCurrencyButton() {
    const { activeCurrency, isMenuOpen } = this.props;
    return (
      <div>
        {activeCurrency.symbol}

        {isMenuOpen && <ArrowUpIcon className="CurrencyArrowIcon" /> }
        {!isMenuOpen && <ArrowDownIcon className="CurrencyArrowIcon" /> }
      </div>
    );
  }

  render() {
    const { isMenuOpen, setMenuVisible } = this.props;
    return (
      <div>
        <button
          type="button"
          className="CurrencySymbolButton"
          ref={this.buttonRef}
          onClick={() => {
            setMenuVisible(!isMenuOpen);
          }}
        >
          {this.renderCurrencyButton()}
        </button>

        {isMenuOpen && this.renderCurrencyMenu()}

      </div>

    );
  }
}
export default CurrencySwitcher;
