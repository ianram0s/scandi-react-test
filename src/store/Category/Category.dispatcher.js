import { loadCategories, updateActiveCategory } from './Category.action';

export class CategoryDispatcher {
  static async updateCategoryData(dispatch, categories) {
    dispatch(loadCategories(categories));
  }

  static updateActiveCategory(dispatch, category) {
    dispatch(updateActiveCategory(category));
  }
}

export default new CategoryDispatcher();
