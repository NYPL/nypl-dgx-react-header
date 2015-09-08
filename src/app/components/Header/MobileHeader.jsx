import React from 'react';
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
      mobileSearchClass = cx({'icon-solo-x': activeButton === 'mobileSearch', 'icon-magnifier2': activeButton !== 'mobileSearch'}),
      mobileMenuClass = cx({'icon-solo-x': activeButton === 'mobileMenu', 'icon-burgernav': activeButton !== 'mobileMenu'});

    console.log(activeButton);

    return (
      <div className={this.props.className}>
        <span className={`${this.props.className}-Logo icon-nypl-logo-mark`}></span>
        <span 
          className={`${this.props.className}-SearchButton ${mobileSearchClass}`}
          ref='MobileSearchButton'
          onClick={this._handleSearchBtnClick}>
        </span>
        <span 
        className={`${this.props.className}-MenuButton ${mobileMenuClass}`}
          ref='MobileMenuButton'
          onClick={this._handleMenuBtnClick}>
        </span>
      </div>
    );
  }

  _toggleMobileMenu(activeButton) {
    if (HeaderStore._getMobileMenuBtnValue() !== activeButton) {
      Actions.setMobileMenuButtonValue(activeButton);
    } else {
      Actions.setMobileMenuButtonValue('');
    }
  }

  _handleSearchBtnClick() {
    this._toggleMobileMenu('mobileSearch');
  }

  _handleMenuBtnClick() {
    this._toggleMobileMenu('mobileMenu');
  }
}

MobileHeader.defaultProps = {
  lang: 'en',
  className: 'MobileHeader'
};

export default MobileHeader;
