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
        <MegaMenuSubNav label={this.props.label} items={this.props.items} lang={this.props.lang} />
        <MegaMenuFeatures features={this.props.features} />
      </div>
    );
  }
});

module.exports = MegaMenu;