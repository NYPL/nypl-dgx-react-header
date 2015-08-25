import React from 'react';

class DonateBox extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    let target = this.props.donateUrl || '#',
      // Limit to 3 items only, as per design restrictions.
      donationAmounts = this.props.donationAmounts.slice(0, 3),
      donationLinks = donationAmounts.map((amount, index) => {
        return (
          <li key={index}><a href={target}>${amount}</a></li>
        );
      });

    return (
      <div className={this.props.className}>
        <div className={this.props.className + '-Wrapper'}>
          <div className={this.props.className + '-Tag'}>{this.props.tag}</div>
          <h3 className={this.props.className + '-Title'}>{this.props.title}</h3>
          <div className={this.props.className + '-Desc'}>{this.props.desc}</div>
          <ul className={this.props.className + '-DonationLinks'}>
            {donationLinks}
            <li><a href={target}>Other</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

DonateBox.defaultProps = {
  lang: 'en',
  className: 'DonateBox',
  donateUrl: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form',
  donationAmounts: [10, 19, 17]
};

export default DonateBox;