import React from 'react';
import cx from 'classnames';

class MegaMenuFeatureItem extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }
  
	render() {
    let feature = this.props.feature ? this.props.feature : undefined,
			classes = cx({'with-image': feature && feature.images, 'without-image': !feature || !feature.images}),
      category = '',
      img = '',
      title = '',
      desc = '',
      link = '#',
      blogAuthor = null,
      eventTime = null,
      date = null,
      location = null;

    if (feature.content) {
      switch (feature.content.type) {
        case 'blog': 
          // Does not contain title
          blogAuthor = (<p>{feature.content.authors[0].fullName}</p>);
          break;
        case 'event-program':
          let startDate = new Date(feature.dates.start),
            endDate = new Date(feature.dates.end);

          date = (<p>{startDate.getHours()} | {startDate.getFullYear()}</p>);
          location = (<p>{feature.content.location.fullName}</p>);
          break;
        case 'exhibition':
          // This case is needed for "Ongoing" or "Now through ..." messages.
          break;
        case 'node':
          // No extra attributes/data in a simple node object.
          break;
        default:
          break;
      }
    }

    if (feature) {
      title = feature.headline.en.text;
      category = feature.category ? feature.category.en.text : title;
      img = feature.images ? <img src={feature.images[0].uri} /> : '';
      desc = feature.description.en.text.substring(0, '150');
      link = feature.link.en.text;
    }

    // Don't believe that there's a description in the mock up.
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
          {date}
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