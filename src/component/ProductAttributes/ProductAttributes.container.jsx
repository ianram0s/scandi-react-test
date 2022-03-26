import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ProductDispatcher } from '../../store/Product/Product.dispatcher';
import ProductAttributes from './ProductAttributes.component';

export const mapStateToProps = (state) => ({
  activeProduct: state.ProductReducer.activeProduct,
});

export const mapDispatchToProps = (dispatch) => ({
  updateSelectedAttributes: (attribute) => ProductDispatcher
    .updateSelectedAttributes(dispatch, attribute),
});

class ProductAttributesContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.onSelectAttributeHandler = this.onSelectAttributeHandler.bind(this);
  }

  onSelectAttributeHandler(attribute) {
    const { updateSelectedAttributes, allowSelect } = this.props;
    if (allowSelect) {
      updateSelectedAttributes(attribute);
    }
  }

  render() {
    const {
      attributes, size, noHeaders, allowSelect,
    } = this.props;
    return (
      <ProductAttributes
        attributes={attributes}
        onSelectAttributeHandler={this.onSelectAttributeHandler}
        noHeaders={noHeaders}
        allowSelect={allowSelect}
        size={size}
      />

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductAttributesContainer);
