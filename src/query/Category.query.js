import { Query } from '@tilework/opus';

export const categoriesListQuery = new Query('categories', true)
  .addField('name');

export default categoriesListQuery;
