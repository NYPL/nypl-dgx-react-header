import React from 'react';
import _ from 'underscore';
import MegaMenuFeatureItem from './MegaMenuFeatureItem.jsx';

class MegaMenuFeatures extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }
  
  render() {
    let items = _.map(this.props.features, function(m, i) {
      return (
        <MegaMenuFeatureItem key={i} feature={m} />
      );
    }, this);

    return (
      <div className='MegaMenu-Features'>
        {items}
      </div>
    );
  }
}

export default MegaMenuFeatures;