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
      tag: 'Mocked Location Spotlight',
      image: 'http://fpoimg.com/88x88',
      desc: 'The original George Bruce Library was located on 42nd Street.'
    };

    // For now, we will utilize the 2nd item in the response
    // since the first item is the LocationFinder Widget.
    // If that response is empty, use the mocked data.
    let featLocData = this.props.features[1] || mockedFeaturedLocation;

    return (
      <div className={this.props.className}>
        <LocationFinder 
        className={this.props.className + '-LocationFinder'} />
        <div className={this.props.className + '-SeparationBar'}></div>
        <FeaturedLocation 
        className={this.props.className + '-FeaturedLocation'}
        tag={featLocData.tag}
        title={featLocData.title}
        image={featLocData.image}
        desc={featLocData.desc} />
      </div>
    );
  }
}

FindUsWidget.defaultProps = {
  lang: 'en',
  className: 'FindUsWidget'
};

export default FindUsWidget;