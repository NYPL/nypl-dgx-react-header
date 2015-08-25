import React from 'react';
import cx from 'classnames';

class MegaMenuFeatureItem extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }
  
	render() {
    let feature = this.props.feature['current-mega-menu-item'] ? this.props.feature['current-mega-menu-item'] : undefined;
		let img = '',
			classes = cx({'with-image': feature && feature.images, 'without-image': !feature || !feature.images});

    let headline = '',
      title = '',
      desc = '',
      link = '#';

    if (feature) {
      title = feature.attributes.headline.en.text;
      headline = feature.attributes.category ? feature.attributes.category.en.text : title;
      desc = feature.attributes.description.en.text.substring(0, '150');
      link = feature.attributes.link.en.text;
      img = (feature.images) ? <img src={feature.images[0].attributes.uri['full-uri']} /> : '';
    }

		return (
	    <a href={link} className='MegaMenu-FeatureItem'>
		    <div className={'FeatureItem-Image ' + classes}>
		    	{img}
		    </div>
		    <div className={'FeatureItem-Content ' + classes}>
	        <div className='FeatureItem-Content-Tag'>{headline}</div>
	        <h3 className='FeatureItem-Content-Title'>{title}</h3>
	        <div className='FeatureItem-Content-Desc'>{desc}</div>
		    </div>
      </a>
	  );
	}
}

export default MegaMenuFeatureItem;