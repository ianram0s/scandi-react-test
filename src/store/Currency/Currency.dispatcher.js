import { loadCurrencies, updateActiveCurrency } from './Currency.action';

export class CurrencyDispatcher {
  static async updateCurrenciesData(dispatch, currencies) {
    dispatch(loadCurrencies(currencies));
  }

  static updateActiveCurrency(dispatch, currency) {
    dispatch(updateActiveCurrency(currency));
  }
}

export default new CurrencyDispatcher();
