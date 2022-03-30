import { client, Query, Field } from '@tilework/opus';

const queryCurrienciesList = () => new Query('currencies', true)
  .addField(new Field('label', true))
  .addField(new Field('symbol', true));

const getCurrenciesList = async () => {
  client.setEndpoint(process.env.REACT_APP_GRAPHQL_ENDPOINT);

  const fetchedData = await client.post(queryCurrienciesList());
  console.log(fetchedData);
  return fetchedData.currencies;
};

export default getCurrenciesList;
