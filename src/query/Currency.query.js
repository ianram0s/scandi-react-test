import { client, Query, Field } from '@tilework/opus';

const getCurrenciesList = async () => {
  client.setEndpoint(process.env.REACT_APP_GRAPHQL_ENDPOINT);

  const queryCurrienciesList = new Query('currencies', true)
    .addField(new Field('label', true))
    .addField(new Field('symbol', true));

  const fetchedData = await client.post(queryCurrienciesList);
  return fetchedData.currencies;
};

export default getCurrenciesList;
