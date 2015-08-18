import React from 'react';

// Add-on Modules to generate FindUs Widget
import LocationFinder from './LocationFinder.jsx';
import FeaturedLocation from './FeaturedLocation.jsx';


class FindUsWidget extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className={this.props.className}>
        <LocationFinder 
        className={this.props.className + '-LocationFinder'} />
        <div className={this.props.className + '-SeparationBar'}></div>
        <FeaturedLocation 
        className={this.props.className + '-FeaturedLocation'}
        tag={'Location Spotlight'}
        title={'George Bruce Library Celebrates 100 Years'}
        image={'http://fpoimg.com/88x88'}
        desc={'The original George Bruce Library was located on 42nd Street.'} />
      </div>
    );
  }
}

FindUsWidget.defaultProps = {
  lang: 'en',
  className: 'FindUsWidget'
};

export default FindUsWidget;