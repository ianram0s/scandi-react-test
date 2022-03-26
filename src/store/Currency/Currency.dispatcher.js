import getCurrenciesList from '../../query/Currency.query';
import { loadCurrencies, updateActiveCurrency } from './Currency.action';

export class CurrencyDispatcher {
  static async updateCurrenciesData(dispatch) {
    const currencies = await getCurrenciesList();
    dispatch(loadCurrencies(currencies));
  }

  static updateActiveCurrency(dispatch, currency) {
    dispatch(updateActiveCurrency(currency));
  }
}

export default new CurrencyDispatcher();
