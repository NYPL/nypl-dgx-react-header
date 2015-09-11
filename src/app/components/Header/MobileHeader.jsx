import React from 'react';
import Radium from 'radium';
import cx from 'classnames';

// ALT FLUX
import HeaderStore from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

class MobileHeader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeMobileButton: HeaderStore.getState().activeMobileButton
    };

    this._handleMenuBtnClick = this._handleMenuBtnClick.bind(this);
    this._handleSearchBtnClick = this._handleSearchBtnClick.bind(this);
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
      locatorUrl = this.props.locatorUrl || '#',
      mobileSearchClass = cx({'active icon-solo-x': activeButton === 'mobileSearch', 'icon-magnifier2': activeButton !== 'mobileSearch'}),
      mobileMenuClass = cx({'active icon-solo-x': activeButton === 'mobileMenu', 'icon-burgernav': activeButton !== 'mobileMenu'});

    return (
      <div className={this.props.className} style={styles.base}>
        <span 
          style={styles.logoIcon}
          className={`${this.props.className}-Logo icon-nypl-logo-mark`}>
        </span>

        <a 
          style={styles.locatorIcon} 
          href={locatorUrl} 
          className={`${this.props.className}-Locator icon-locatorsmall`}>
        </a>

        <span
          style={[
            styles.searchIcon,
            activeButton === 'mobileSearch' ? styles.activeSearchIcon : ''
          ]}
          className={`${this.props.className}-SearchButton ${mobileSearchClass}`}
          ref='MobileSearchButton'
          onClick={this._handleSearchBtnClick}>
        </span>

        <span 
          style={[
            styles.menuIcon,
            activeButton === 'mobileMenu' ? styles.activeMenuIcon : ''
          ]}
          className={`${this.props.className}-MenuButton ${mobileMenuClass}`}
          ref='MobileMenuButton'
          onClick={this._handleMenuBtnClick}>
        </span>
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
    } else {
      Actions.setMobileMenuButtonValue('');
    }
  }

  /**
   * _handleSearchBtnClick() 
   * Calls _toggleMobileMenu()
   * with the 'mobileSearch' as a param
   */
  _handleSearchBtnClick() {
    this._toggleMobileMenu('mobileSearch');
  }

  /**
   * _handleMenuBtnClick() 
   * Calls _toggleMobileMenu()
   * with the 'mobileMenu' as a param
   */
  _handleMenuBtnClick() {
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
    textAlign: 'right'
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
