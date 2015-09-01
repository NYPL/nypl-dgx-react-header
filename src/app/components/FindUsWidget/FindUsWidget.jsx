import React from 'react';
// Add-on Modules to generate FindUs Widget
import LocationFinder from './LocationFinder.jsx';
import FeaturedLocation from './FeaturedLocation.jsx';

class FindUsWidget extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    // This is pending removal once we establish the Data from API.
    let mockedFeaturedLocation = {
      title: 'George Bruce Library Celebrates 100 Years',
      category: 'Mocked Location Spotlight',
      image: 'http://fpoimg.com/88x88',
      desc: 'The original George Bruce Library was located on 42nd Street.'
    };

    let feature = this.props.featuredItem || mockedFeaturedLocation,
      title, category, desc, link, img;

    if (feature) {
      title = feature.headline.en.text;
      category = feature.category ? feature.category.en.text : title;
      desc = feature.description.en.text.substring(0, '150');
      link = feature.link.en.text;
      img = (feature.images) ? feature.images[0].uri : '';
    }

    return (
      <div className={this.props.className}>
        <LocationFinder className={this.props.className + '-LocationFinder'} />
        <div className={this.props.className + '-SeparationBar'}></div>
        <a href={link}>
          <FeaturedLocation 
            className={this.props.className + '-FeaturedLocation'}
            category={category}
            title={title}
            image={img}
            desc={desc} />
        </a>
      </div>
    );
  }
}

FindUsWidget.defaultProps = {
  lang: 'en',
  className: 'FindUsWidget'
};

export default FindUsWidget;