import React from 'react';
import _ from 'underscore';
import MegaMenuFeatureItem from './MegaMenuFeatureItem.jsx';
import FindUsWidget from '../FindUsWidget/FindUsWidget.jsx';

class MegaMenuFeatures extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }
  
  render() {
    let currentFeatureItem,
      findUsWidget = <FindUsWidget navId={this.props.navId} features={this.props.features} />,
      featureItems = _.map(this.props.features, function(m, i) {
      return (
        <MegaMenuFeatureItem key={i} feature={m} />
      );
    }, this);

    if (this.props.navId === 'abb58f55-20e0-0d34-d1ae-45687cc4799d') {
      currentFeatureItem = findUsWidget;
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

MegaMenuFeatures.defaultProps = {
  lang: 'en'
};

export default MegaMenuFeatures;