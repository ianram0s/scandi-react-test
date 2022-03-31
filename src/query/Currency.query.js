import { Query, Field } from '@tilework/opus';

export const currencyQuery = new Query('currencies', true)
  .addField(new Field('label', true))
  .addField(new Field('symbol', true));

export default currencyQuery;
