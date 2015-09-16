import React from 'react';
import cx from 'classnames';

class ExhibitionItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let feature = this.props.feature,
      classes = this.props.classes,
      img = feature.imgSrc ? <img src={feature.imgSrc} /> : null;

    return (
      <a href={feature.link} className={this.props.className}>
        <div className={'FeatureItem-Image ' + classes}>
          {img}
        </div>
        <div className={'FeatureItem-Content ' + classes}>
          <div className='FeatureItem-Content-Tag'>{feature.category}</div>
          <h3 className='FeatureItem-Content-Title'>{feature.headline}</h3>
          <div className='FeatureItem-Content-Desc'>{feature.description}</div>
        </div>
      </a>
    );
  }
}

ExhibitionItem.defaultProps = {
  lang: 'en',
  className: 'ExhibitionItem'
};

export default ExhibitionItem;
