/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { PureComponent } from 'react';
import { ReactComponent as SelectedIcon } from '../../style/assets/selected-icon.svg';
import { ReactComponent as SelectedIconWhite } from '../../style/assets/selected-icon_white.svg';
import './ProductAttributes.style.scss';

class ProductAttributes extends PureComponent {
  constructor(props) {
    super(props);
    this.renderLabel = this.renderLabel.bind(this);
  }

  renderLabel(label) {
    const { noHeaders } = this.props;
    return (
      (noHeaders === false || noHeaders === undefined)
        && (
        <h2 className="PropertyLabel">
          {label}
          :
        </h2>
        ));
  }

  renderTextAttribute(itemObject) {
    const { onSelectAttributeHandler, size, allowSelect } = this.props;
    return (
      <div key={itemObject.name}>
        {this.renderLabel(itemObject.name)}
        <div className={`TextAttributeContainer ${size}`}>
          {itemObject.items.map((item) => {
            let backgroundColor = '#FFFFFF';
            let textColor = '#292929';
            let cursor = 'default';
            if (item.isSelected) {
              backgroundColor = '#1D1F22';
              textColor = '#FFFFFF';
            }
            if (allowSelect) {
              cursor = 'pointer';
            }
            return (
              <span
                key={item.id}
                onClick={() => {
                  onSelectAttributeHandler({ name: itemObject.name, item });
                }}
                style={{ backgroundColor, color: textColor, cursor }}
                className={size}
              >
                {item.value}
              </span>
            );
          })}
        </div>
      </div>
    );
  }

  renderSwatchAttribute(itemObject) {
    const { onSelectAttributeHandler, size, allowSelect } = this.props;
    let cursor = 'default';
    if (allowSelect) {
      cursor = 'pointer';
    }
    return (
      <div key={itemObject.name}>
        {this.renderLabel(itemObject.name)}
        <div className={`SwatchAttributeContainer ${size}`}>
          {itemObject.items.map((item) => (
            <span
              key={item.id}
              style={{ backgroundColor: item.value, cursor }}
              onClick={() => {
                onSelectAttributeHandler({ name: itemObject.name, item });
              }}
              className={size}
            >
              {
                item.isSelected
                && ((item.value === '#000000') ? <SelectedIconWhite className={`SelectedIcon ${size}`} /> : <SelectedIcon className={`SelectedIcon ${size}`} />)
              }
            </span>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { attributes } = this.props;
    return (
      <div className="ProductAttributesContainer">
        { attributes.map((item) => {
          if (item.type === 'text') return this.renderTextAttribute(item);
          if (item.type === 'swatch') return this.renderSwatchAttribute(item);

          return <p />;
        }) }
      </div>
    );
  }
}

export default ProductAttributes;
