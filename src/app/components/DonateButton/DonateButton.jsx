import React from 'react';
import Radium from 'radium';

import ga from 'react-ga';

class DonateButton extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);

    this._trackEvent.bind(this);
  }

  render () {
    return (
      <a id={this.props.id} 
      className={this.props.className}
      href={this.props.target}
      lang={this.props.lang}
      onClick={this._trackEvent(this.props.gaLabel)}
      style={[
        styles.base,
        this.props.style //allows for parent-to-child css styling
      ]}>
        {this.props.label}
      </a>
    );
  }

  /**
   * _trackEvent(gaLabel)
   * Track a GA click event.
   *
   * @param {gaLabel} String Label for GA event.
   */
  _trackEvent(gaLabel) {
    // ga.event({
    //   category: 'NYPL Header',
    //   action: 'Click',
    //   label: gaLabel
    // });
  }
};

DonateButton.defaultProps = {
  label: 'Donate',
  lang: 'en',
  id: 'DonateButton',
  className: 'DonateButton',
  target: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&JServSessionIdr003=dwcz55yj27.app304a&s_src=FRQ14ZZ_SWBN'
};

const styles = {
  base: {
    backgroundColor: '#E43534',
    color: 'white',
    padding: '1em',
    margin: '0'
  }
};

export default Radium(DonateButton);
