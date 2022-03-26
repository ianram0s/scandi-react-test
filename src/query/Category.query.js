import { client, Query, Field } from '@tilework/opus';

const getCategoriesList = async () => {
  client.setEndpoint(process.env.REACT_APP_GRAPHQL_ENDPOINT);

  const queryCategoriesList = new Query('categories', true)
    .addField(new Field('name', true));

  const fetchedData = await client.post(queryCategoriesList);
  return fetchedData.categories;
};

export default getCategoriesList;
