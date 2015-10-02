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
    this.setState({searchButtonAction: HeaderStore.getState().searchButtonAction});
  }

  render () {
    let activeButton = this.state.activeMobileButton,
      searchButtonAction = this.state.searchButtonAction,
      locatorUrl = this.props.locatorUrl || '//www.nypl.org/locations/map?nearme=true',
      mobileSearchClass = cx({
        'active nypl-icon-solo-x': searchButtonAction === 'clickSearch',
        'nypl-icon-magnifier-thin': searchButtonAction !== 'clickSearch'
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
  _toggleMobileMenu(action) {
    console.log(action);
    if (action === 'clickSearch') {
      if (HeaderStore._getSearchButtonActionValue() !== action) {
        Actions.searchButtonActionValue(action);
        Actions.setMobileMenuButtonValue('');
        gaUtils._trackEvent('Click', `Mobile ${action}`);
      } else {
        Actions.searchButtonActionValue('');
      }
    } else if (action === 'mobileMenu') {
      if (HeaderStore._getMobileMenuBtnValue() !== action) {
        Actions.setMobileMenuButtonValue(action);
        Actions.searchButtonActionValue('');
        gaUtils._trackEvent('Click', `Mobile ${action}`);
      } else {
        Actions.setMobileMenuButtonValue('');
      }
    }
  }

  /**
   * _toggleSearchMenu(actionValue)
   * Verifies that the actionValue does not
   * match the HeaderStore's current search action value
   * and set's it as the param activeButton.
   * If it matches, it clears the HeaderStore's
   * current value.
   *
   * @param {String} actionValue
   */
  _toggleSearchMenu(actionValue) {
    if (HeaderStore._getSearchButtonActionValue() !== actionValue) {
      Actions.searchButtonActionValue(actionValue);
      Actions.setMobileMenuButtonValue('');
      gaUtils._trackEvent('Click', `Mobile ${actionValue}`);
    } else {
      Actions.searchButtonActionValue('');
      Actions.setMobileMenuButtonValue('');
    }
  }

  /**
   * _handleSearchBtnPress() 
   * Calls _toggleMobileMenu()
   * with the 'mobileSearch' as a param
   */
  _handleSearchBtnPress() {
    this._toggleSearchMenu('clickSearch');
  }

  /**
   * _handleMenuBtnPress() 
   * Calls _toggleMobileMenu()
   * with the 'mobileMenu' as a param
   */
  _handleMenuBtnPress(action) {
    this._toggleMobileMenu(action);
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