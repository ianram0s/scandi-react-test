import getCategoriesList from '../../query/Category.query';
import { loadCategories, updateActiveCategory } from './Category.action';

export class CategoryDispatcher {
  static async updateCategoryData(dispatch) {
    const categories = await getCategoriesList();
    dispatch(loadCategories(categories));
  }

  static updateActiveCategory(dispatch, category) {
    dispatch(updateActiveCategory(category));
  }
}

export default new CategoryDispatcher();
