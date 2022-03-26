import { client, Query, Field } from '@tilework/opus';

export const getProductsList = async () => {
  client.setEndpoint(process.env.REACT_APP_GRAPHQL_ENDPOINT);
  const queryProductsList = new Query('categories', true)
    .addField('name')
    .addField(new Field('products', true)
      .addFieldList(['id', 'name', 'category', 'inStock'])
      .addField(new Field('gallery', true))
      .addField(new Field('prices', true)
        .addField('amount')
        .addField(new Field('currency', true)
          .addFieldList(['label', 'symbol']))));

  const fetchedData = await client.post(queryProductsList);
  return fetchedData.categories;
};

export const getProductInfo = async (productid) => {
  client.setEndpoint(process.env.REACT_APP_GRAPHQL_ENDPOINT);
  const queryProduct = new Query('product', true)
    .addFieldList(['id', 'name', 'category', 'inStock', 'brand', 'description'])
    .addField(new Field('gallery', true))
    .addField(new Field('attributes', true)
      .addFieldList(['name', 'type'])
      .addField(new Field('items', true)
        .addFieldList(['id', 'value'])))
    .addField(new Field('prices', true)
      .addField('amount')
      .addField(new Field('currency', true)
        .addFieldList(['label', 'symbol'])))

    .addArgument('id', 'String!', productid);
  const fetchedData = await client.post(queryProduct);
  return fetchedData.product;
};
