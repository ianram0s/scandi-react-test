/* eslint-disable react/no-danger */
import { PureComponent } from 'react';
import './ProductDescriptionPage.style.scss';
import { sanitize } from 'dompurify';
import ImageGalleryContainer from '../../component/ImageGallery';
import ProductAttributesContainer from '../../component/ProductAttributes';

class ProductDescriptionPage extends PureComponent {
  render() {
    const {
      activeProduct, activeCurrency, addToCartHandle,
    } = this.props;
    const availableImages = activeProduct.gallery;
    const { attributes } = activeProduct;
    const filteredPrice = activeProduct.prices.filter(
      (price) => price.currency.label === activeCurrency.label,
    )[0];
    return (
      <div className="DescriptionPageContainer">
        <ImageGalleryContainer availableImages={availableImages} inStock={activeProduct.inStock} />
        <div className="ProductInfoContainer">
          <h1 className="ProductName_Big">{activeProduct.name}</h1>
          <h1 className="ProductBrand">{activeProduct.brand}</h1>
          <ProductAttributesContainer
            attributes={attributes}
            allowSelect
            size="Big"
          />
          <h2 className="PropertyLabel">Price: </h2>
          <h2 className="PropertyValue">
            {filteredPrice.currency.symbol}
            {filteredPrice.amount}
          </h2>
          <div className="AddToCartButtonContainer">
            <button
              type="button"
              onClick={() => {
                addToCartHandle();
              }}
              className="AddToCartButton"
            >
              Add to cart!

            </button>
          </div>
          <div className="DescriptionText" dangerouslySetInnerHTML={{ __html: sanitize(activeProduct.description) }} />
        </div>
      </div>
    );
  }
}

export default ProductDescriptionPage;
