import React from 'react';
import _ from 'underscore';
import MegaMenuFeatureItem from './MegaMenuFeatureItem.jsx';
import DonateWidget from '../DonateWidget/DonateWidget.jsx';

class MegaMenuFeatures extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render() {
    let currentFeatureItem,
      donateWidget = <DonateWidget navId={this.props.navId} features={this.props.features} />,
      featureItems = _.map(this.props.features, function(m, i) {
      return (
        <MegaMenuFeatureItem key={i} feature={m} />
      );
    }, this);

    // Donate Widget
    if (this.props.navId === '7638d892-1846-1484-2961-ad180e4194bf') {
      currentFeatureItem = donateWidget;
    } else {
      currentFeatureItem = featureItems;
    }

    return (
      <div className='MegaMenu-Features'>
        {currentFeatureItem}
      </div>
    );
  }
}

export default MegaMenuFeatures;