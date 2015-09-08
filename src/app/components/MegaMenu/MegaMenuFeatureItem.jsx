import React from 'react';
import cx from 'classnames';
import BlogItem from '../ContentBox/BlogItem.jsx';
import EventProgramItem from '../ContentBox/EventProgramItem.jsx';
import ExhibitionItem from '../ContentBox/ExhibitionItem.jsx';

class MegaMenuFeatureItem extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }
  
	render() {
    if (!this.props.feature) {
      return <div className={this.props.className}>Featured Item not Found</div>;
    }

    let feature = this.props.feature ? this.props.feature : undefined,
			classes = cx({'with-image': feature && feature.images, 'without-image': !feature || !feature.images}),
      // should have a fallback
      contentObj = {
        title: feature.headline.en.text,
        category: feature.category ? feature.category.en.text : title,
        img: feature.images ? <img src={feature.images[0].uri} /> : '',
        desc: feature.description.en.text.substring(0, '150'),
        link: feature.link.en.text
      },
      featuredItem = (<a href={contentObj.link} className={this.props.className}>
          <div className={'FeatureItem-Image ' + classes}>
            {contentObj.img}
          </div>
          <div className={'FeatureItem-Content ' + classes}>
            <div className='FeatureItem-Content-Tag'>{contentObj.category}</div>
            <h3 className='FeatureItem-Content-Title'>{contentObj.title}</h3>
            <div className='FeatureItem-Content-Desc'>{contentObj.desc}</div>
          </div>
        </a>
      );

    if (feature.content) {
      switch (feature.content.type) {
        case 'blog':
          contentObj.fullName = feature.content.authors[0].fullName;
          contentObj.authorTitle = feature.content.authors[0].title;
          featuredItem = <BlogItem feature={contentObj} classes={classes} className={this.props.className} />;
          break;
        case 'event-program':
          console.log(feature);
          contentObj.dates = {
            start: feature.content.dates.start,
            end: feature.content.dates.end
          };
          contentObj.location = {
            fullName: feature.content.location.fullName
          };
          featuredItem = <EventProgramItem feature={contentObj} className={this.props.className} classes={classes} />;
          break;
        case 'exhibition':
          // This case is needed for "Ongoing" or "Now through ..." messages.
        case 'node':
          // No extra attributes/data in a simple node object.
        default:
          break;
      }
    }

		return featuredItem;
	}
}

MegaMenuFeatureItem.defaultProps = {
	lang: 'en',
	className: 'MegaMenu-FeatureItem'
};

export default MegaMenuFeatureItem;