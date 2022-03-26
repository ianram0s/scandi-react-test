export const UPDATE_ACTIVE_CATEGORY = 'UPDATE_ACTIVE_CATEGORY';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

export const updateActiveCategory = (category) => ({
  type: UPDATE_ACTIVE_CATEGORY,
  category,
});

export const loadCategories = (categories) => ({
  type: LOAD_CATEGORIES,
  categories,
});
