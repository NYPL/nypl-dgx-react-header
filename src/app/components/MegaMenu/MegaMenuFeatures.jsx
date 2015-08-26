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
    if (this.props.navId === '1d9ea0ec-6ca3-4577-9dd1-e8de1f2a8bb1') {
      currentFeatureItem = <DonateWidget navId={this.props.navId} features={this.props.features} />;
    } else if (this.props.navId === 'df621833-4dd1-4223-83e5-6ad7f98ad26a') {
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