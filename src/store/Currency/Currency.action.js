export const UPDATE_ACTIVE_CURRENCY = 'UPDATE_ACTIVE_CURRENCY';
export const LOAD_CURRENCIES = 'LOAD_CURRENCIES';

export const loadCurrencies = (currencies) => ({
  type: LOAD_CURRENCIES,
  currencies,
});

export const updateActiveCurrency = (currency) => ({
  type: UPDATE_ACTIVE_CURRENCY,
  currency,
});
