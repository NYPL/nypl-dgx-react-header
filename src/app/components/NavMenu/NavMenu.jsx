import Radium from 'radium';
import React from 'react';
import cx from 'classnames';
import appConfig from '../../../../appConfig.js';

// Header Store
import HeaderStore from '../../stores/Store.js';

// Dependent Components
import SearchButton from '../SearchButton/SearchButton.jsx';
import NavMenuItem from '../NavMenuItem/NavMenuItem.jsx';
import NavMenuBottomButtons from '../NavMenuBottomButtons/NavMenuBottomButtons.jsx';
import DonateButton from '../DonateButton/DonateButton.jsx';

class NavMenu extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {

    let navItems = (this.props.items && this.props.items.length) ? 
        this.props.items : appConfig.navTopLinks,
      mobileActiveClass = cx({
        'mobileActive': HeaderStore._getMobileMenuBtnValue() === 'mobileMenu'
      }),
      donateButton = HeaderStore._getIsStickyValue() ?
        <li className='NavMenuItem DonateButtonItem'>
          <DonateButton style={styles.donateButton} gaLabel={'Mobile Donate'}/>
        </li> : null,
      navMenu = navItems.map((item, index) => {
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
          <ul className={`${this.props.className}-List`} id='NavMenu-List'>
            {navMenu}
            {donateButton}
          </ul>
          <SearchButton className={`${this.props.className}`} />
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
    margin: '0px 7px 0px 6px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    fontSize: '12.5px',
    letterSpacing: '.04em'
  }
};

export default Radium(NavMenu);
