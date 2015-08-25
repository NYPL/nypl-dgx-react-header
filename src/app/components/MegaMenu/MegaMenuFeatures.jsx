import React from 'react';
import MegaMenuFeatureItem from './MegaMenuFeatureItem.jsx';
import DonateWidget from '../DonateWidget/DonateWidget.jsx';

class MegaMenuFeatures extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render() {
    let currentFeatureItem;

    // Donate Widget
    if (this.props.navId === '7638d892-1846-1484-2961-ad180e4194bf') {
      currentFeatureItem = <DonateWidget navId={this.props.navId} features={this.props.features} />;
    } else {
      currentFeatureItem = this.props.features.map((m, i) => {
        return (
          <MegaMenuFeatureItem key={i} feature={m} />
        );
      });
    }

    return (
      <div className='MegaMenu-Features'>
        {currentFeatureItem}
      </div>
    );
  }
}

export default MegaMenuFeatures;