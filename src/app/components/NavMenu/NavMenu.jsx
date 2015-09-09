import Radium from 'radium';
import React from 'react';
import cx from 'classnames';

// Header Store
import HeaderStore from '../../stores/Store.js';

// Dependent Components
import NavMenuItem from '../NavMenuItem/NavMenuItem.jsx';

class NavMenu extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    let classes = cx('NavMenu-List', {'mobileActive': HeaderStore._getMobileMenuBtnValue() === 'mobileMenu'}),
      navMenu = this.props.items.map((item, index) => {
        return (
          <NavMenuItem 
          label={item.label}
          lang={this.props.lang}
          target={item.target}
          navId={item.id}
          features={item.features}
          subNav={item.subnav}
          key={index}
          index={index} />
        );
      });

    return (
      <nav className={this.props.className}>
        <span className='MobileLogoText icon-nypl-logo-type'></span>
        <ul className={classes}>
          {navMenu}
        </ul>
      </nav>
    );
  }
}

NavMenu.defaultProps = {
  lang: 'en',
  className: 'NavMenu'
};

export default Radium(NavMenu);
