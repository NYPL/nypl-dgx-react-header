import React from 'react';
import MegaMenuFeatureItem from '../MegaMenu/MegaMenuFeatureItem.jsx';
import DonateBox from './DonateBox.jsx';

class DonateWidget extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    // Extract the second element since the mocked
    // data's first element is the Donate Widget.
    // This needs to be properly determined by the
    // back-end team.
    let featureItem = this.props.features[1];

    return (
      <div className={this.props.className}>
        <DonateBox 
        className={this.props.className + '-DonateBox'}
        tag={'Donate'}
        title={'Donate Now!'}
        donationAmounts={[10, 19, 17, 50, 45]}
        desc={"Support NYPL in it's mission to inspire lifelong learning, advance knowledge, and strengthen our communities."} />
        <MegaMenuFeatureItem 
        className={this.props.className + '-FeatureItem'}
        feature={featureItem} />
      </div>
    );
  }
}

DonateWidget.defaultProps = {
  lang: 'en',
  className: 'DonateWidget'
};

export default DonateWidget;