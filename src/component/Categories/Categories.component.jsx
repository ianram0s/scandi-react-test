import { PureComponent } from 'react';
import './Categories.style.scss';
import { Link } from 'react-router-dom';

class Categories extends PureComponent {
  render() {
    const { activeCategory, availableCategories, changeActiveCategory } = this.props;

    return (
      <div className="Categories">
        {availableCategories.map((obj) => {
          let isActive = '';
          const currentCategory = activeCategory;
          if (currentCategory && obj.toUpperCase() === currentCategory.toUpperCase()) {
            isActive = ' CategoryName_isSelected';
          }
          return (
            <Link
              key={obj}
              id={obj}
              onClick={(e) => {
                const clickedCategory = e.target.getAttribute('id');
                window.scrollTo(0, 0);
                changeActiveCategory(clickedCategory);
              }}
              to={`../${obj}`}
              className={`CategoryName${isActive}`}
            >
              {obj.toUpperCase()}
            </Link>
          );
        })}
      </div>
    );
  }
}

export default Categories;
