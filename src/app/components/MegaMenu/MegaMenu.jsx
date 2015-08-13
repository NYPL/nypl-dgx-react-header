import React from 'react';
import Radium from 'radium';
import cx from 'classnames';

import MegaMenuSubNav from './MegaMenuSubNav.jsx';
import MegaMenuFeatures from './MegaMenuFeatures.jsx';

class MegaMenu extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render() {
    // Dynamic class assignment based on boolean flag
    let classes = cx({'--active': this.props.isActive});
    
    return (
      <div id='MegaMenu' className={'MegaMenu'+classes} 
      style={this.props.isActive ? styles.show : styles.hide}>
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
}

MegaMenu.defaultProps = {
  lang: 'en'
};

const styles = {
  base: {

  },
  show: {
    display: 'block'
  },
  hide: {
    display: 'none'
  }
};

module.exports = Radium(MegaMenu);