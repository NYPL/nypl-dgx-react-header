import React from 'react';

class BlogItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let defaultFeature = {
        category: 'NYPL',
        title: 'Find more about NYPL',
        desc: 'NYPL Rocks!',
        link: 'http://nypl.org',
        img: null
      },
      feature = this.props.feature || defaultFeature,
      classes = this.props.classes || 'without-image';

    return (
      <a href={feature.link} className={this.props.className}>
        <div className={'FeatureItem-Image ' + classes}>
          {feature.img}
        </div>
        <div className={'FeatureItem-Content ' + classes}>
          <div className='FeatureItem-Content-Tag'>{feature.category}</div>
          <h3 className='FeatureItem-Content-Title'>{feature.title}</h3>
          <div className='FeatureItem-Content-Desc'>{feature.desc}</div>
        </div>
      </a>
    );
  }
}

BlogItem.defaultProps = {
  lang: 'en',
  className: 'DefaultItem'
};

export default BlogItem;
