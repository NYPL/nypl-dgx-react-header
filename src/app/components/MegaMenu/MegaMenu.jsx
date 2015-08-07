import React from 'react';
import MegaMenuSubNav from './MegaMenuSubNav.jsx';
import MegaMenuFeatures from './MegaMenuFeatures.jsx';

let MegaMenu = React.createClass({
  getDefaultProps: function () {
    return {
      lang: "en"
    };
  },
  render: function () {
    let divStyle = {display: "none"},
      classes = "MegaMenu";

    if (this.props.isActive) {
      divStyle = {};
      classes = "MegaMenu--active";
    }

    return (
      <div style={divStyle} className={classes}>
        <div className='MegaMenu-LeftBgWrapper'>
        </div>
        <div className='MegaMenu-Wrapper'>
          <div className='MegaMenu-SubNavWrapper'>
            <MegaMenuSubNav 
            label={this.props.label} 
            items={this.props.items} 
            lang={this.props.lang} />
          </div>
          <div className='MegaMenu-FeaturesWrapper'>
            <MegaMenuFeatures features={this.props.features} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MegaMenu;