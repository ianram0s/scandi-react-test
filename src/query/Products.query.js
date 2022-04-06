import { Query, Field } from '@tilework/opus';

export const getProductsListQuery = (category) => {
  const queryProductsList = new Query('category', true)
    .addArgument('input', 'CategoryInput!', { title: category })
    .addField('name')
    .addField(new Field('products', true)
      .addFieldList(['id', 'name', 'brand', 'category', 'inStock'])
      .addField(new Field('attributes', true)
        .addFieldList(['name', 'type'])
        .addField(new Field('items', true)
          .addFieldList(['id', 'value'])))
      .addField(new Field('gallery', true))
      .addField(new Field('prices', true)
        .addField('amount')
        .addField(new Field('currency', true)
          .addFieldList(['label', 'symbol']))));
  return queryProductsList;
};

export const productQuery = (productid) => new Query('product', true)
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
