import React from 'react';

class DonateBox extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    let donateLinks;

    return (
      <div className={this.props.className}>
        <div className={this.props.className + '-Wrapper'}>
          <div className={this.props.className + '-Tag'}>{this.props.tag}</div>
          <h3 className={this.props.className + '-Title'}>{this.props.title}</h3>
          <div className={this.props.className + '-Desc'}>{this.props.desc}</div>
          <ul className={this.props.className + '-DonationLinks'}>
            <li><a href='#'>$19</a></li>
            <li><a href='#'>$35</a></li>
            <li><a href='#'>$70</a></li>
            <li><a href='#'>Other</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

DonateBox.defaultProps = {
  lang: 'en',
  className: 'DonateBox'
};

export default DonateBox;