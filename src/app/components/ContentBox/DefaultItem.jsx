import React from 'react';

class DefaultItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let defaultFeature = {
        category: 'NYPL',
        headline: 'Find more about NYPL',
        desc: 'NYPL Rocks!',
        link: 'http://nypl.org',
        img: null
      },
      feature = this.props.feature || defaultFeature,
      classes = this.props.classes || 'without-image',
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

DefaultItem.defaultProps = {
  lang: 'en',
  className: 'FeatureItem'
};

export default DefaultItem;
