/* eslint-disable prefer-destructuring */
import { UPDATE_ACTIVE_CATEGORY, LOAD_CATEGORIES } from './Category.action';

const initialState = { activeCategory: '', categories: [] };

const validateCategory = (newCategory, allCategories) => {
  if (!newCategory) return true;
  const normalizedCategory = newCategory.toLowerCase();
  return allCategories.includes(normalizedCategory);
};

// eslint-disable-next-line default-param-last
const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ACTIVE_CATEGORY: {
      let newCategory = action.category;
      const validCategory = validateCategory(newCategory, state.categories);
      if (newCategory === undefined) {
        newCategory = state.categories[0];
      }
      if (validCategory) {
        return {
          ...state,
          activeCategory: newCategory,
        };
      }
      return {
        ...state,
        activeCategory: false,
      };
    }
    case LOAD_CATEGORIES:
      return {
        ...state,
        categories: action.categories.map((category) => category.name),
      };
    default:
      return state;
  }
};

export default CategoryReducer;
