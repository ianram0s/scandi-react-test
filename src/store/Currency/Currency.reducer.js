import { LOAD_CURRENCIES, UPDATE_ACTIVE_CURRENCY } from './Currency.action';

const initialState = { activeCurrency: { label: 'USD', symbol: '$' }, currencies: [] };

// eslint-disable-next-line default-param-last
const CurrencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ACTIVE_CURRENCY:
      return {
        ...state,
        activeCurrency: action.currency,
      };
    case LOAD_CURRENCIES:
      return {
        ...state,
        currencies: action.currencies,
      };
    default:
      return state;
  }
};

export default CurrencyReducer;
