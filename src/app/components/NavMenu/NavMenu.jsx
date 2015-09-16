import Radium from 'radium';
import React from 'react';
import cx from 'classnames';

// Header Store
import HeaderStore from '../../stores/Store.js';

// Dependent Components
import NavMenuItem from '../NavMenuItem/NavMenuItem.jsx';
import NavMenuBottomButtons from '../NavMenuBottomButtons/NavMenuBottomButtons.jsx';
import DonateButton from '../DonateButton/DonateButton.jsx';

class NavMenu extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    let mobileActiveClass = cx({'mobileActive': HeaderStore._getMobileMenuBtnValue() === 'mobileMenu'}),
      donateButton = HeaderStore._getIsStickyValue() ?
        <li><DonateButton style={styles.donateButton} /></li> : null,
      navMenu = this.props.items.map((item, index) => {
        return (
          <NavMenuItem 
            label={item.name}
            lang={this.props.lang}
            target={item.link.en.text}
            navId={item.id}
            features={item.features}
            subNav={item.subnav}
            key={index}
            index={index} />
        );
      });

    return (
      <nav className={this.props.className}>
        <div className={`${this.props.className}-Wrapper ${mobileActiveClass}`}>
          <span className='MobileLogoText nypl-icon-logo-type'></span>
          <ul className='NavMenu-List'>
            {navMenu}
            {donateButton}
          </ul>
          <NavMenuBottomButtons className='MobileBottomButtons' />
        </div>
      </nav>
    );
  }
}

NavMenu.defaultProps = {
  lang: 'en',
  className: 'NavMenu'
};

const styles = {
  donateButton: {
    padding: '8px 15px',
    margin: '0 5px 0 10px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    fontSize: '12.5px',
    letterSpacing: '.04em'
  }
};

export default Radium(NavMenu);
