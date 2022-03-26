import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { CurrencyDispatcher } from '../../store/Currency/Currency.dispatcher';
import CurrencySwitcher from './CurrencySwitcher.component';

export const mapStateToProps = (state) => ({
  activeCurrency: state.CurrencyReducer.activeCurrency,
  availableCurrencies: state.CurrencyReducer.currencies,
});

export const mapDispatchToProps = (dispatch) => ({
  updateActiveCurrency: (currency) => CurrencyDispatcher.updateActiveCurrency(dispatch, currency),
});

class CurrencySwitcherContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isMenuOpen: false };
    this.setMenuVisible = this.setMenuVisible.bind(this);
  }

  setMenuVisible(state) {
    this.setState({ isMenuOpen: state });
  }

  render() {
    const { isMenuOpen } = this.state;
    const { activeCurrency, availableCurrencies, updateActiveCurrency } = this.props;
    return (
      <CurrencySwitcher
        availableCurrencies={availableCurrencies}
        activeCurrency={activeCurrency}
        isMenuOpen={isMenuOpen}
        setMenuVisible={this.setMenuVisible}
        updateActiveCurrency={updateActiveCurrency}
      />

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcherContainer);
