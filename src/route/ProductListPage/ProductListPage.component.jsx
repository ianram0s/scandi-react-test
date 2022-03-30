import { PureComponent } from 'react';
import './ProductListPage.style.scss';
import ProductCardContainer from '../../component/ProductCard/ProductCard.container';
import { ReactComponent as LoadingIcon } from '../../style/assets/loading.svg';

class ProductListPage extends PureComponent {
  render() {
    const { productsList, category, loadingState } = this.props;
    const products = productsList.map((product) => (
      <ProductCardContainer key={product.name} product={product} />
    ));
    return (

      <div className="ProductListPageContainer">
        <h2>{category}</h2>
        {!loadingState ? (
          <div className="ProductsContainer">
            {products}
          </div>
        ) : <LoadingIcon className="LoadingIcon" />}

      </div>
    );
  }
}

export default ProductListPage;
