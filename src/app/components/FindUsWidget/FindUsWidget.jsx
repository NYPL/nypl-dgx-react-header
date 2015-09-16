import React from 'react';
// Add-on Modules to generate FindUs Widget
import LocationFinder from './LocationFinder.jsx';
import MegaMenuFeatureItem from '../MegaMenu/MegaMenuFeatureItem.jsx';

class FindUsWidget extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    let feature = this.props.featuredItem;

    return (
      <div className={this.props.className}>
        <LocationFinder className={this.props.className + '-LocationFinder'} />
        <div className={this.props.className + '-SeparationBar'}></div>
        <MegaMenuFeatureItem feature={feature} />
      </div>
    );
  }
}

FindUsWidget.defaultProps = {
  lang: 'en',
  className: 'FindUsWidget'
};

export default FindUsWidget;