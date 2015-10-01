import React from 'react';
import cx from 'classnames';

import MegaMenuSubNav from './MegaMenuSubNav.jsx';
import MegaMenuFeatures from './MegaMenuFeatures.jsx';

class MegaMenu extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render() {
    // Dynamic class assignment based on activeItem property matching current index.
    let classes = cx('MegaMenu', {
      'active animateMenuHoverEnter fadeIn': this.props.index === this.props.currentActiveItem
    });

    return (
      <div id={(this.props.navId) ? 'MegaMenu-' + this.props.navId : 'MegaMenu'}
        className={classes}>
          <div className='MegaMenu-LeftBgWrapper'></div>
          <div className='MegaMenu-Wrapper'>
            <div className='MegaMenu-SubNavWrapper'>
              <MegaMenuSubNav
                label={this.props.label} 
                items={this.props.items} 
                lang={this.props.lang}
                navId={this.props.navId} />
            </div>
            <div className='MegaMenu-FeaturesWrapper'>
              <MegaMenuFeatures navId={this.props.navId} features={this.props.features} />
            </div>
          </div>
      </div>
    );
  }
}

MegaMenu.defaultProps = {
  lang: 'en'
};

module.exports = MegaMenu;