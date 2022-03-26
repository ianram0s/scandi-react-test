import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { CategoryDispatcher } from '../../store/Category/Category.dispatcher';
import Categories from './Categories.component';

export const mapStateToProps = (state) => ({
  activeCategory: state.CategoryReducer.activeCategory,
  availableCategories: state.CategoryReducer.categories,
});

export const mapDispatchToProps = (dispatch) => ({
  changeActiveCategory: (category) => CategoryDispatcher.updateActiveCategory(dispatch, category),
});

class CategoriesContainer extends PureComponent {
  render() {
    const { activeCategory, changeActiveCategory, availableCategories } = this.props;
    return (
      (
        <Categories
          activeCategory={activeCategory}
          changeActiveCategory={changeActiveCategory}
          availableCategories={availableCategories}
        />
      )
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer);
