import React from 'react';
import cx from 'classnames';

class MegaMenuFeatureItem extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }
  
	render() {
    let feature = this.props.feature ? this.props.feature : undefined,
      img = '',
			classes = cx({'with-image': feature && feature.images, 'without-image': !feature || !feature.images});

    let category = '',
      title = '',
      desc = '',
      link = '#';

    let blogAuthor = null,
      eventTime = null,
      date = null,
      location = null;

    if (feature.content) {
      switch (feature.content.type) {
        case 'blog': 
          // Does not contain title
          blogAuthor = (<p>{feature.content.authors[0].attributes['full-name']}</p>);
          break;
        case 'event-program':
          location = (<p>{feature.content.location.attributes['full-name']}</p>);
          break;
        case 'node':
          break;
        default:
          break;
      }
    } else {
      // all content in the object itself
    }

    if (feature) {
      title = feature.headline.en.text;
      category = feature.category ? feature.category.en.text : title;
      desc = feature.description.en.text.substring(0, '150');
      link = feature.link.en.text;
      img = (feature.images) ? <img src={feature.images[0].uri['full-uri']} /> : '';
    }

		return (
	    <a href={link} className={this.props.className}>
		    <div className={'FeatureItem-Image ' + classes}>
		    	{img}
		    </div>
		    <div className={'FeatureItem-Content ' + classes}>
	        <div className='FeatureItem-Content-Tag'>{category}</div>
	        <h3 className='FeatureItem-Content-Title'>{title}</h3>
	        <div className='FeatureItem-Content-Desc'>{desc}</div>
          {blogAuthor}
          {location}
		    </div>
      </a>
	  );
	}
}

MegaMenuFeatureItem.defaultProps = {
	lang: 'en',
	className: 'MegaMenu-FeatureItem'
};

export default MegaMenuFeatureItem;