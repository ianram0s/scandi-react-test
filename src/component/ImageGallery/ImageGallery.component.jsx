/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { PureComponent } from 'react';
import './ImageGallery.style.scss';

class ImageGallery extends PureComponent {
  renderGallery() {
    const { gallery, setActiveImage } = this.props;
    return (
      <div className="GalleryContainer">
        <div className="GalleryItems">
          {gallery.map((item) => (
            <img
              key={item}
              onClick={() => { setActiveImage(item); }}
              onKeyDown={this.handleKeyDown}
              className="GalleryItem"
              alt=""
              src={item}
            />
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { selectedImage, inStock } = this.props;
    const stockStyle = (inStock) ? { opacity: '100%' } : { opacity: '50%' };
    return (
      <div className="ImageAndGalleryWrapper">
        <div className="GalleryContainer">
          {this.renderGallery()}
        </div>
        <div className="BigImageContainer" style={stockStyle}>
          <img className="BigImage" src={selectedImage} alt="" />
          {!inStock && <h2>OUT OF STOCK</h2>}
        </div>
      </div>
    );
  }
}

export default ImageGallery;
