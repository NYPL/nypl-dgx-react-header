import React from 'react';
import cx from 'classnames';

class BlogItem extends React.Component {
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
          <p>{feature.author.fullName}</p>
          <div>{feature.author.title}</div>
        </div>
      </a>
    );
  }
}

BlogItem.defaultProps = {
  lang: 'en',
  className: 'BlogItem'
};

export default BlogItem;
