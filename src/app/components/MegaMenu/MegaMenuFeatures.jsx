import React from 'react';
import MegaMenuFeatureItem from './MegaMenuFeatureItem.jsx';

import FindUsWidget from '../FindUsWidget/FindUsWidget.jsx';
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
    } else if (this.props.navId === 'abb58f55-20e0-0d34-d1ae-45687cc4799d') {
      currentFeatureItem = <FindUsWidget navId={this.props.navId} features={this.props.features} />;
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

MegaMenuFeatures.defaultProps = {
  lang: 'en'
};

export default MegaMenuFeatures;