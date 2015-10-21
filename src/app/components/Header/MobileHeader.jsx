import React from 'react';
import Radium from 'radium';
import cx from 'classnames';
import ReactTappable from 'react-tappable';

// ALT FLUX
import HeaderStore from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

import gaUtils from '../../utils/gaUtils.js';

class MobileHeader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeMobileButton: HeaderStore.getState().activeMobileButton,
      searchButtonAction: HeaderStore.getState().searchButtonAction
    };

    this._handleMenuBtnPress = this._handleMenuBtnPress.bind(this);
  }

  componentDidMount() {
    HeaderStore.listen(this._onChange.bind(this));
  }

  componentWillUnmount() {
    HeaderStore.unlisten(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({
      activeMobileButton: HeaderStore.getState().activeMobileButton,
      searchButtonAction: HeaderStore.getState().searchButtonAction
    });
  }

  render () {
    let activeButton = this.state.activeMobileButton,
      searchButtonAction = this.state.searchButtonAction,
      locatorUrl = this.props.locatorUrl || '//www.nypl.org/locations/map?nearme=true',
      mobileSearchClass = (searchButtonAction === 'clickSearch') ?
        'active nypl-icon-solo-x': 'nypl-icon-magnifier-thin',
      mobileMenuClass = (activeButton === 'mobileMenu') ?
        'active nypl-icon-solo-x': 'nypl-icon-burger-nav';

    return (
      <div className={this.props.className} style={styles.base}>
        <a
          style={styles.mobileLogo} 
          href='//www.nypl.org'>
          <span 
            style={styles.logoIcon}
            className={`${this.props.className}-Logo nypl-icon-logo-mark`}>
          </span>
        </a>

        <a 
          style={styles.locatorIcon} 
          href={locatorUrl} 
          className={`${this.props.className}-Locator nypl-icon-locator-large`}>
        </a>

        <ReactTappable onTap={this._handleMenuBtnPress.bind(this, 'clickSearch')}>
          <span
            style={[
              styles.searchIcon,
              searchButtonAction === 'clickSearch' ? styles.activeSearchIcon : ''
            ]}
            className={`${this.props.className}-SearchButton ${mobileSearchClass}`}
            ref='MobileSearchButton'>
          </span>
        </ReactTappable>

        <ReactTappable onTap={this._handleMenuBtnPress.bind(this, 'mobileMenu')}>
          <span
            style={[
              styles.menuIcon,
              activeButton === 'mobileMenu' ? styles.activeMenuIcon : ''
            ]}
            className={`${this.props.className}-MenuButton ${mobileMenuClass}`}
            ref='MobileMenuButton'>
          </span>
        </ReactTappable>
      </div>
    );
  }

  /**
   * _toggleMobileMenu(activeButton) 
   * Verifies that the activeButton does not
   * match the HeaderStore's current value
   * and set's it as the param activeButton.
   * If it matches, it clears the HeaderStore's
   * current value.
   *
   * @param {String} activeButton
   */
  _toggleMobileMenu(activeButton) {
    if (activeButton === 'clickSearch') {
      if (HeaderStore._getSearchButtonActionValue() !== activeButton) {
        Actions.searchButtonActionValue(activeButton);
        Actions.setMobileMenuButtonValue('');
      } else {
        Actions.searchButtonActionValue('');
      }
    } else if (activeButton === 'mobileMenu') {
      if (HeaderStore._getMobileMenuBtnValue() !== activeButton) {
        Actions.setMobileMenuButtonValue(activeButton);
        Actions.searchButtonActionValue('');
      } else {
        Actions.setMobileMenuButtonValue('');
      }
    }
    gaUtils._trackEvent('Click', `Mobile ${activeButton}`);
  }

  /**
   * _handleMenuBtnPress() 
   * Calls _toggleMobileMenu()
   * with the 'mobileMenu' as a param
   */
  _handleMenuBtnPress(activeButton) {
    this._toggleMobileMenu(activeButton);
  }
}

MobileHeader.defaultProps = {
  lang: 'en',
  className: 'MobileHeader'
};

const styles = {
  base: {
    position: 'relative',
    height: '59px',
    textAlign: 'right',
    borderBottom: '1px solid #979797'
  },
  mobileLogo: {
    color: '#000',
    textDecoration: 'none',
    ':hover': {
      color: '#000'
    },
    ':visited': {
      color: '#000'
    }
  },
  logoIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    fontSize: '59px'
  },
  locatorIcon: {
    fontSize: '31px',
    margin: 0,
    padding: '14px',
    display: 'inline-block',
    color: '#000'
  },
  searchIcon: {
    fontSize: '31px',
    margin: 0,
    padding: '14px',
    display: 'inline-block',
    color: '#000'
  },
  menuIcon: {
    fontSize: '31px',
    margin: 0,
    padding: '14px',
    display: 'inline-block',
    color: '#000'
  },
  activeSearchIcon: {
    color: '#FFF',
    backgroundColor: '#29A1D2'
  },
  activeMenuIcon: {
    color: '#FFF',
    backgroundColor: '#2B2B2B'
  }
}

export default Radium(MobileHeader);