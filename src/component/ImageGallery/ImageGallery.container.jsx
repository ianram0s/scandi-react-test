import { PureComponent } from 'react';
import ImageGallery from './ImageGallery.component';

class ImageGalleryContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { selectedImage: null };
    this.setActiveImage = this.setActiveImage.bind(this);
  }

  componentDidMount() {
    const { selectedImage, availableImages } = this.state;
    if (selectedImage === '') {
      this.setState({ selectedImage: availableImages[0] });
    }
  }

  setActiveImage(newImage) {
    this.setState({ selectedImage: newImage });
  }

  render() {
    const { selectedImage } = this.state;
    const { availableImages } = this.props;
    return (
      <ImageGallery
        selectedImage={selectedImage || availableImages[0]}
        gallery={availableImages}
        setActiveImage={this.setActiveImage}
      />
    );
  }
}

export default ImageGalleryContainer;
