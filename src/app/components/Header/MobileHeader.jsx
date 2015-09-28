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
      activeMobileButton: HeaderStore.getState().activeMobileButton
    };

    this._handleMenuBtnPress = this._handleMenuBtnPress.bind(this);
    this._handleSearchBtnPress = this._handleSearchBtnPress.bind(this);
  }

  componentDidMount() {
    HeaderStore.listen(this._onChange.bind(this));
  }

  componentWillUnmount() {
    HeaderStore.unlisten(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({activeMobileButton: HeaderStore.getState().activeMobileButton});
  }

  render () {
    let activeButton = this.state.activeMobileButton,

      locatorUrl = this.props.locatorUrl || '//www.nypl.org/locations/map?nearme=true',
      mobileSearchClass = cx({
        'active nypl-icon-solo-x': activeButton === 'clickSearch',
        'nypl-icon-magnifier-thin': activeButton !== 'clickSearch'
      }),
      mobileMenuClass = cx({
        'active nypl-icon-solo-x': activeButton === 'mobileMenu', 
        'nypl-icon-burger-nav': activeButton !== 'mobileMenu'
      });

    return (
      <div className={this.props.className} style={styles.base}>
        <span 
          style={styles.logoIcon}
          className={`${this.props.className}-Logo nypl-icon-logo-mark`}>
        </span>

        <a 
          style={styles.locatorIcon} 
          href={locatorUrl} 
          className={`${this.props.className}-Locator nypl-icon-locator-large`}>
        </a>

        <ReactTappable onTap={this._handleSearchBtnPress}>
          <span
            style={[
              styles.searchIcon,
              activeButton === 'clickSearch' ? styles.activeSearchIcon : ''
            ]}
            className={`${this.props.className}-SearchButton ${mobileSearchClass}`}
            ref='MobileSearchButton'>
          </span>
        </ReactTappable>

        <ReactTappable onTap={this._handleMenuBtnPress}>
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
    if (HeaderStore._getMobileMenuBtnValue() !== activeButton) {
      Actions.setMobileMenuButtonValue(activeButton);
      gaUtils._trackEvent('Click', `Mobile ${activeButton}`);
    } else {
      Actions.setMobileMenuButtonValue('');
    }
  }

  /**
   * _handleSearchBtnPress() 
   * Calls _toggleMobileMenu()
   * with the 'mobileSearch' as a param
   */
  _handleSearchBtnPress() {
    this._toggleMobileMenu('clickSearch');
  }

  /**
   * _handleMenuBtnPress() 
   * Calls _toggleMobileMenu()
   * with the 'mobileMenu' as a param
   */
  _handleMenuBtnPress() {
    this._toggleMobileMenu('mobileMenu');
  }
}

MobileHeader.defaultProps = {
  lang: 'en',
  className: 'MobileHeader'
};

const styles = {
  base: {
    position: 'relative',
    height: '58px',
    textAlign: 'right',
    borderBottom: '1px solid #979797'
  },
  logoIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    fontSize: '58px'
  },
  locatorIcon: {
    fontSize: '30px',
    margin: 0,
    padding: '14px',
    display: 'inline-block',
    color: '#000'
  },
  searchIcon: {
    fontSize: '30px',
    margin: 0,
    padding: '14px',
    display: 'inline-block',
    color: '#000'
  },
  menuIcon: {
    fontSize: '30px',
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
