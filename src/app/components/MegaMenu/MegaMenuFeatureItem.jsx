import React from 'react';
import cx from 'classnames';
import BlogItem from '../ContentBox/BlogItem.jsx';
import DefaultItem from '../ContentBox/DefaultItem.jsx';
import EventProgramItem from '../ContentBox/EventProgramItem.jsx';
import ExhibitionItem from '../ContentBox/ExhibitionItem.jsx';

class MegaMenuFeatureItem extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }
  
	render() {
    if (!this.props.feature) {
      return <DefaultItem className={this.props.className} />;
    }

    let feature = this.props.feature ? this.props.feature : undefined,
			classes = cx({'with-image': feature && feature.images, 'without-image': !feature || !feature.images}),
      // should have a fallback
      contentObj = {
        title: feature.headline[this.props.lang].text,
        category: feature.category ? feature.category[this.props.lang].text : title,
        img: feature.images ? <img src={feature.images[0].uri} /> : '',
        desc: feature.description[this.props.lang].text.substring(0, '150'),
        link: feature.link[this.props.lang].text
      },
      featuredItem = <DefaultItem feature={contentObj} className={this.props.className} />;

    if (feature.content) {
      switch (feature.content.type) {
        case 'blog':
          contentObj.fullName = feature.content.authors[0].fullName;
          contentObj.authorTitle = feature.content.authors[0].title;
          featuredItem = <BlogItem feature={contentObj} className={this.props.className} classes={classes} />;
          break;
        case 'event-program':
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